import { useState, useEffect, useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { QUESTIONS, ZONES, generateQuestion } from '../data/curriculum';
import { Question } from '../types/game';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, Zap, Coins, HeartCrack, Heart, Trophy, Sparkles, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../lib/utils';
import { translations } from '../i18n';
import { NinaAvatar } from './NinaAvatar';
import { Notepad } from './Notepad';
import { BackgroundVisuals } from './BackgroundVisuals';
import { audioEngine } from '../utils/audio';

export function renderMathText(text: string): React.ReactNode {
  if (typeof text !== 'string') return text;
  
  const fractionRegex = /(\d+)\/(\d+)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  
  fractionRegex.lastIndex = 0;
  
  while ((match = fractionRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }
    
    const numerator = match[1];
    const denominator = match[2];
    
    parts.push(
      <span key={matchIndex} className="inline-flex flex-col items-center justify-center align-middle mx-1.5 leading-none text-[0.85em] relative -top-[1px]">
        <span className="pb-[2px] font-black">{numerator}</span>
        <span className="w-full h-[2.5px] bg-current rounded-full min-w-[14px]"></span>
        <span className="pt-[2px] font-black">{denominator}</span>
      </span>
    );
    
    lastIndex = fractionRegex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return <>{parts}</>;
}

const STANDARD_UNITS = [
  'km/h', 'm/s', 'km', 'm', 'cm', 'mm', 'm²', 'cm²', 'm2', 'cm2', '公尺', '公分', '公里', '毫米', '平方公尺', '平方公分',
  'kg', 'g', '公斤', '公克', '克', 'l', 'ml', '升', '毫升', '$', '元', 'dollars', '¥'
];

const INFORMAL_UNITS = [
  'laps', 'pieces', 'cups', 'hair-ties', 'bags', 'packages', 'groups', 'bouquets', 'steps', 'minutes', 'seconds', 'days', 'hours', 'miles',
  '圈', '段', '杯', '個髮圈', '袋', '個禮物包', '隊', '束', '步', '分鐘', '秒', '天', '小時', '英里'
];

interface ParsedAnswer {
  number: string;
  unit: string;
}

export function parseAnswer(str: string): ParsedAnswer {
  const clean = str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '')
    .replace(/^(x|y|ans|answer)\s*=\s*/, '');

  let unit = '';
  let number = clean;

  if (clean.startsWith('$')) {
    unit = '$';
    number = clean.slice(1);
  } else if (clean.startsWith('¥')) {
    unit = '¥';
    number = clean.slice(1);
  } else {
    const allKnownUnits = [...STANDARD_UNITS, ...INFORMAL_UNITS]
      .map(u => u.toLowerCase().replace(/\s+/g, ''))
      .sort((a, b) => b.length - a.length);

    for (const ku of allKnownUnits) {
      if (clean.endsWith(ku)) {
        unit = ku;
        number = clean.slice(0, clean.length - ku.length);
        break;
      }
    }
  }

  return { number, unit };
}

export function matchesAnswer(userInput: string, targetValue: string): boolean {
  const user = parseAnswer(userInput);
  const target = parseAnswer(targetValue);

  if (user.number !== target.number) {
    return false;
  }

  const isStandardTargetUnit = STANDARD_UNITS.some(
    u => u.toLowerCase().replace(/\s+/g, '') === target.unit
  );

  if (isStandardTargetUnit) {
    const currencyUnits = ['$', '元', 'dollars'];
    if (currencyUnits.includes(user.unit) && currencyUnits.includes(target.unit)) {
      return true;
    }
    return user.unit === target.unit;
  }

  // For informal or no units, if user typed only the correct number, accept it.
  if (user.unit === '') {
    return true;
  }

  return user.unit === target.unit;
}

export function GameSession({ zoneId, onExit }: { zoneId: string, onExit: () => void }) {
  const { addXp, addCoins, loseHeart, hearts, incrementStreak, resetStreak, currentStreak, completeLevel, language, equippedBackground } = useGame();
  const t = translations[language];
  
  const zone = ZONES.find(z => z.id === zoneId);
  const isKingdom = zone?.type === 'kingdom';
  const isHell = zone?.type === 'hell';
  const totalQuestions = isHell ? 10 : (isKingdom ? 10 : 5);
  
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Easy' | 'Normal' | 'Hard' | 'Extra' | null>(null);
  
  const zoneQuestions = useMemo(() => {
    if (!zone || !selectedDifficulty) return [];
    const questions: Question[] = [];
    const seenTexts = new Set<string>();

    for (let idx = 0; idx < totalQuestions; idx++) {
      const topic = Array.isArray(zone.topic) 
        ? zone.topic[Math.floor(Math.random() * zone.topic.length)] 
        : zone.topic;
        
      const diff = selectedDifficulty;

      let attempts = 0;
      let q = generateQuestion(topic, diff);
      // Deduplicate by question text
      while (seenTexts.has(q.question.en) && attempts < 25) {
        q = generateQuestion(topic, diff);
        attempts++;
      }
      seenTexts.add(q.question.en);
      questions.push(q);
    }
    return questions;
  }, [zone?.topic, totalQuestions, selectedDifficulty]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [isAlmost, setIsAlmost] = useState(false);
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);
  const [completionStats, setCompletionStats] = useState({ xp: 0, coins: 0 });
  
  const currentQuestion = zoneQuestions[currentIndex];

  useEffect(() => {
    if (isCompleted) {
      audioEngine.play('game_win');
    }
  }, [isCompleted]);

  useEffect(() => {
    if (isFailed) {
      audioEngine.play('game_over');
    }
  }, [isFailed]);

  const handleFireConfetti = () => {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 20 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const handleSubtleCelebrate = () => {
    // Elegant, single-shot extremely gentle burst of tiny green & gold sparkles
    // radiating upwards with very low particle count
    confetti({
      particleCount: 8,
      angle: 90,
      spread: 40,
      origin: { x: 0.5, y: 0.7 },
      colors: ['#34D399', '#FBBF24'], // Emerald green and soft gold
      startVelocity: 18,
      gravity: 1.2,
      ticks: 50,
      scalar: 0.5, // tiny, elegant particles
      zIndex: 100,
    });
  };

  const handleCheckAnswer = () => {
    let correct = false;
    let almost = false;

    if (isHell) {
      if (!typedAnswer.trim()) return;
      
      const correctValueEn = currentQuestion.options.en[currentQuestion.correctAnswer];
      const correctValueZh = currentQuestion.options.zh[currentQuestion.correctAnswer];
      
      correct = matchesAnswer(typedAnswer, correctValueEn) || matchesAnswer(typedAnswer, correctValueZh);

      if (!correct) {
        // Benefit of the doubt: check if the number part is correct but units are wrong or missing
        const userParsed = parseAnswer(typedAnswer);
        const targetParsedEn = parseAnswer(correctValueEn);
        const targetParsedZh = parseAnswer(correctValueZh);

        const numberMatches = (userParsed.number && (userParsed.number === targetParsedEn.number || userParsed.number === targetParsedZh.number));
        if (numberMatches) {
          almost = true;
        }
      }
    } else {
      if (selectedAnswer === null) return;
      correct = selectedAnswer === currentQuestion.correctAnswer;
    }
    
    if (almost) {
      audioEngine.play('click');
      setIsAlmost(true);
      setIsAnswerChecked(true);
      setIsCorrect(false);
    } else {
      setIsAlmost(false);
      setIsAnswerChecked(true);
      setIsCorrect(correct);
      
      if (correct) {
        audioEngine.play('correct');
        handleSubtleCelebrate();
        incrementStreak();
        
        const mult = selectedDifficulty === 'Easy' ? 0.8 : selectedDifficulty === 'Normal' ? 1.0 : selectedDifficulty === 'Hard' ? 1.35 : 1.7;
        if (isHell) {
          const baseCoins = 50;
          const streakBonus = Math.floor(currentStreak / 3) * 10;
          addCoins(Math.round((baseCoins + streakBonus) * mult));
          addXp(Math.round(10 * mult));
        } else if (zone?.type === 'kingdom') {
          const baseCoins = 15;
          const streakBonus = Math.floor(currentStreak / 3) * 5;
          addCoins(Math.round((baseCoins + streakBonus) * mult));
          addXp(Math.round(20 * mult));
        } else {
          const baseCoins = 2;
          const streakBonus = Math.floor(currentStreak / 3) * 1;
          addCoins(Math.round((baseCoins + streakBonus) * mult));
          addXp(Math.round(40 * mult));
        }
      } else {
        audioEngine.play('wrong');
        setMistakes(m => m + 1);
        loseHeart();
        resetStreak();
      }
    }
  };

  const handleNext = () => {
    audioEngine.play('click');
    if (mistakes >= 3) {
      setIsFailed(true);
      return;
    }
    
    if (currentIndex < zoneQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTypedAnswer('');
      setIsAnswerChecked(false);
      setIsAlmost(false);
      setIsNotepadOpen(false);
    } else {
      setIsCompleted(true);
      let stars = 3;
      if (mistakes === 1) stars = 2;
      else if (mistakes >= 2) stars = 1;
      
      const mult = selectedDifficulty === 'Easy' ? 0.8 : selectedDifficulty === 'Normal' ? 1.0 : selectedDifficulty === 'Hard' ? 1.35 : 1.7;
      const xpBase = isHell 
        ? Math.floor(Math.random() * (150 - 67 + 1)) + 67 
        : (isKingdom ? 50 : 100);
      const coinsBase = isHell ? 1000 : (isKingdom ? 150 : 10);
      setCompletionStats({ 
        xp: Math.round(xpBase * mult), 
        coins: Math.round(coinsBase * mult) 
      });
      
      completeLevel(zoneId, stars, selectedDifficulty);
      handleFireConfetti();
      handleFireConfetti();
    }
  };

  if (!selectedDifficulty) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-y-auto z-20">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <BackgroundVisuals bgId={equippedBackground} />
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-slate-900/90 border-2 border-white/15 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-2xl text-center space-y-6 relative z-10"
        >
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300">
              {language === 'en' ? 'CHOOSE DIFFICULTY' : '選擇挑戰難度'}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-bold leading-relaxed px-2">
              {language === 'en' 
                ? 'Adjust the complexity of math problems. Higher difficulties grant greater rewards!' 
                : '調整數學問題的複雜度。難度越高，獲得的獎勵越豐厚！'}
            </p>
          </div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                id: 'Easy' as const,
                title: { en: 'Easy Mode', zh: '簡單模式' },
                badge: '80% XP / Coins',
                desc: { en: 'Simple equations. Ideal for a relaxed warmup.', zh: '基礎數學問題。非常適合放鬆熱身。' },
                color: 'from-emerald-500/20 to-teal-500/5 hover:border-emerald-400/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]',
                badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
                stars: '⭐️'
              },
              {
                id: 'Normal' as const,
                title: { en: 'Medium Mode', zh: '中等模式' },
                badge: '100% XP / Coins',
                desc: { en: 'Standard curriculum. A balanced math workout.', zh: '標準學術內容。平衡適中的數理鍛鍊。' },
                color: 'from-blue-500/20 to-indigo-500/5 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]',
                badgeColor: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
                stars: '⭐️⭐️'
              },
              {
                id: 'Hard' as const,
                title: { en: 'Hard Mode', zh: '困難模式' },
                badge: '135% XP / Coins',
                desc: { en: 'Challenging puzzles for skilled math wizards.', zh: '具挑戰性的字謎，適合嫻熟的數學大師。' },
                color: 'from-orange-500/20 to-red-500/5 hover:border-orange-400/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]',
                badgeColor: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
                stars: '⭐️⭐️⭐️'
              },
              {
                id: 'Extra' as const,
                title: { en: 'Extra Mode', zh: '終極極限' },
                badge: '170% XP / Coins',
                desc: { en: 'Extreme problems. Push your logic to the limit!', zh: '極限數理考驗。將你的邏輯思維逼至極限！' },
                color: 'from-pink-500/20 to-fuchsia-500/5 hover:border-pink-400/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]',
                badgeColor: 'bg-pink-500/15 text-pink-400 border border-pink-500/30',
                stars: '⚡️⚡️⚡️⚡️'
              }
            ].map((diff) => (
              <motion.button
                key={diff.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  audioEngine.play('click');
                  setSelectedDifficulty(diff.id);
                }}
                className={cn(
                  "flex flex-col items-center justify-between p-4 bg-gradient-to-b rounded-3xl border border-white/10 text-center cursor-pointer transition-all duration-300",
                  diff.color
                )}
              >
                <div className="flex flex-col items-center gap-1.5 w-full">
                  <span className="text-xl shrink-0">{diff.stars}</span>
                  <h4 className="font-black text-white text-base sm:text-lg tracking-wide">
                    {diff.title[language]}
                  </h4>
                  <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider", diff.badgeColor)}>
                    {diff.badge}
                  </span>
                  <p className="text-xs text-slate-300 font-bold leading-normal mt-2">
                    {diff.desc[language]}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Cancel button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              audioEngine.play('click');
              onExit();
            }}
            className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-black text-sm rounded-2xl border-b-4 border-slate-950 active:border-b-0 active:translate-y-[4px] transition-all cursor-pointer"
          >
            {language === 'en' ? 'Back to Map' : '返回地圖'}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (isCompleted) {
    const { xp: completionXp, coins: completionCoins } = completionStats;
    
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center text-white relative z-20">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: 'spring', bounce: 0.5 }}
          className="bg-emerald-500/20 border border-emerald-500/30 p-8 rounded-full mb-8 shadow-[0_0_30px_rgba(16,185,129,0.3)] backdrop-blur-md"
        >
          <Trophy className="w-32 h-32 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
        </motion.div>
        <h2 className="text-4xl font-black mb-4 drop-shadow-md text-emerald-400">
          {isHell 
            ? (language === 'en' ? 'HELL STAGE CONQUERED!' : '地獄關卡征服成功！') 
            : t.game.zoneCleared}
        </h2>
        <p className="text-emerald-200 text-lg mb-12 font-bold bg-emerald-900/30 px-6 py-2 rounded-full border border-emerald-500/20 backdrop-blur-sm">
          +{completionXp} XP • +{completionCoins} Coins
        </p>
        
        <div className="w-48 h-48 mb-8">
          <NinaAvatar />
        </div>
        
        <button 
          onClick={() => {
            addXp(completionXp);
            addCoins(completionCoins);
            onExit();
          }}
          className="bg-emerald-500 text-white font-bold text-xl py-4 px-12 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 transition-transform border border-emerald-400 hover:bg-emerald-400 cursor-pointer"
        >
          {t.game.continue}
        </button>
      </div>
    );
  }

  if (isFailed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center text-white relative z-20">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: 'spring', bounce: 0.5 }}
          className="bg-rose-500/20 border border-rose-500/30 p-8 rounded-full mb-8 shadow-[0_0_30px_rgba(225,29,72,0.3)] backdrop-blur-md"
        >
          <HeartCrack className="w-32 h-32 text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
        </motion.div>
        <h2 className="text-4xl font-black mb-4 drop-shadow-md text-rose-400">
          {language === 'en' ? 'Challenge Failed' : '挑戰失敗'}
        </h2>
        <p className="text-rose-200 text-lg mb-12 font-bold bg-rose-900/30 px-6 py-2 rounded-full border border-rose-500/20 backdrop-blur-sm">
          {language === 'en' ? 'Too many mistakes! Try again.' : '失誤太多了！再試一次。'}
        </p>
        
        <div className="w-48 h-48 mb-8 grayscale opacity-80">
          <NinaAvatar />
        </div>

        <button 
          onClick={onExit}
          className="bg-rose-500 text-white font-bold text-xl py-4 px-12 rounded-full shadow-[0_0_20px_rgba(225,29,72,0.4)] active:scale-95 transition-transform border border-rose-400 hover:bg-rose-400 cursor-pointer"
        >
          {t.game.continue}
        </button>
      </div>
    );
  }

  if ((mistakes >= 3 || !currentQuestion) && !isCompleted && !isFailed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-20 text-white">
        <HeartCrack className="w-24 h-24 text-rose-500 mb-6 drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]" />
        <h2 className="text-3xl font-black text-white mb-4 drop-shadow-md">{t.game.outOfHearts}</h2>
        <p className="text-rose-200 mb-8 bg-rose-900/30 px-6 py-2 rounded-full border border-rose-500/20 backdrop-blur-sm font-medium">{t.game.takeBreak}</p>
        
        <div className="w-40 h-40 mb-8 grayscale opacity-70">
          <NinaAvatar />
        </div>

        <button 
          onClick={onExit}
          className="bg-white/10 text-white font-bold py-4 px-8 rounded-full shadow-lg border border-white/20 active:scale-95 transition-transform w-full max-w-sm backdrop-blur-md hover:bg-white/20 cursor-pointer"
        >
          {t.game.returnMap}
        </button>
      </div>
    );
  }

  const getBackgroundClass = (bgId: string) => {
    switch (bgId) {
      case 'bg_forest': return 'from-emerald-900/60 to-black/80';
      case 'bg_castle': return 'from-amber-900/40 to-slate-900/80';
      case 'bg_ocean': return 'from-cyan-900/50 to-blue-900/80';
      case 'bg_cyber': return 'from-fuchsia-900/40 to-indigo-900/80';
      default: return 'from-blue-900/20 to-black/60';
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col relative z-20 overflow-hidden transition-colors duration-1000">
      
      {/* Immersive Background Visuals */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BackgroundVisuals bgId={equippedBackground} />
      </div>

      {/* Game Header */}
      <div className="p-4 flex items-center justify-between shrink-0 relative z-10">
        <button onClick={onExit} className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer">
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 mx-4 bg-black/40 rounded-full h-5 overflow-hidden border border-white/10 shadow-inner p-1">
          <motion.div 
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / zoneQuestions.length) * 100}%` }}
          />
        </div>
        {/* Always display the 3 hearts for the stage */}
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <Heart 
              key={i} 
              className={cn("w-6 h-6 transition-all duration-300", i < 3 - mistakes ? "fill-rose-500 text-rose-500 scale-100 drop-shadow-md" : "fill-transparent text-white/20 scale-90")} 
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-2 flex flex-col max-w-3xl mx-auto w-full overflow-hidden">
        
        {currentStreak >= 3 && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="self-center bg-orange-500/20 text-orange-400 font-black px-5 py-2 rounded-full mb-2 flex items-center gap-2 border border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.3)] shrink-0"
          >
            <Zap className="w-5 h-5 fill-orange-400" />
            {t.game.combo}
          </motion.div>
        )}

        <div className="flex-1 flex flex-col justify-center min-h-0 relative">
          
          <div className="flex items-end justify-center mb-4 sm:mb-6">
            <motion.div 
              className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 -ml-4 hidden sm:block"
              animate={{ 
                y: [0, -10, 0],
                rotate: [-2, 2, -2]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
               <NinaAvatar />
            </motion.div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6 rounded-[2rem] rounded-bl-none shadow-2xl relative">
              <Sparkles className="absolute -top-3 -right-3 text-amber-400 w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white drop-shadow-md text-center leading-snug flex flex-wrap justify-center items-center gap-y-1">
                {renderMathText(currentQuestion.question[language])}
              </h2>
            </div>
          </div>

          {isHell ? (
            <div className="flex flex-col items-center max-w-md mx-auto w-full gap-4 relative z-10 px-4 py-2">
              <input
                type="text"
                disabled={isAnswerChecked}
                placeholder={language === 'en' ? "Type your answer..." : "輸入你的答案..."}
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && typedAnswer.trim() && !isAnswerChecked) {
                    handleCheckAnswer();
                  }
                }}
                className={cn(
                  "w-full text-center py-4 px-6 bg-slate-950/80 border-2 rounded-[1.5rem] font-black text-2xl text-white outline-none transition-all backdrop-blur-md shadow-inner",
                  isAnswerChecked 
                    ? (isCorrect ? "border-emerald-500 bg-emerald-950/40 text-emerald-200" : "border-rose-500 bg-rose-950/40 text-rose-200")
                    : "border-white/20 focus:border-red-500 focus:ring-4 focus:ring-red-500/25"
                )}
                autoFocus
              />
              
              {!isAnswerChecked && (
                <div className="flex flex-wrap justify-center gap-2 mt-1">
                  {['²', '³', '°', 'π', '÷', '×', 'cm', 'm'].map(symbol => (
                    <button
                      key={symbol}
                      onClick={() => setTypedAnswer(prev => prev + symbol)}
                      className="h-10 sm:h-12 px-3 min-w-[2.5rem] bg-white/10 hover:bg-white/25 active:bg-white/40 border border-white/20 rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl text-white transition-colors cursor-pointer"
                    >
                      {symbol}
                    </button>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-white/50 text-center font-semibold mt-2">
                {language === 'en' ? "Press Enter or click Check to submit" : "按下 Enter 或點擊檢查以提交"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto w-full">
              {currentQuestion.options[language].map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrectOption = idx === currentQuestion.correctAnswer;
                
                let btnStateClasses = "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-[1.02] backdrop-blur-md shadow-lg";
                if (isAnswerChecked) {
                  if (isCorrectOption) btnStateClasses = "bg-emerald-500 border-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-[1.02] z-10";
                  else if (isSelected) btnStateClasses = "bg-rose-500/50 border-rose-600 text-rose-100 opacity-80 scale-95";
                  else btnStateClasses = "bg-black/20 border-white/5 opacity-40 scale-95";
                } else if (isSelected) {
                  btnStateClasses = "bg-blue-500 border-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] scale-[1.05] z-10";
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerChecked}
                    onClick={() => {
                      audioEngine.play('click');
                      setSelectedAnswer(idx);
                    }}
                    className={cn(
                      "w-full flex flex-col items-center justify-center p-3 sm:p-5 rounded-[1.5rem] border-b-[4px] font-black text-lg sm:text-2xl transition-all duration-300 active:translate-y-1 active:border-b-0 cursor-pointer",
                      btnStateClasses
                    )}
                  >
                    <span className="text-center leading-tight flex items-center justify-center flex-wrap gap-y-1">
                      {renderMathText(option)}
                    </span>
                    {isAnswerChecked && isCorrectOption && <Check className="w-6 h-6 sm:w-8 sm:h-8 mt-1 opacity-90 text-white drop-shadow-md shrink-0" />}
                    {isAnswerChecked && isSelected && !isCorrectOption && <X className="w-6 h-6 sm:w-8 sm:h-8 mt-1 opacity-90 text-white drop-shadow-md shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        
        <Notepad 
          key={currentIndex} 
          isOpen={isNotepadOpen} 
          onOpen={() => setIsNotepadOpen(true)} 
          onClose={() => setIsNotepadOpen(false)} 
        />
      </div>

      {/* Footer Area */}
      <div className="h-32 sm:h-44 shrink-0 w-full relative pb-safe">
        <AnimatePresence>
          {isAnswerChecked && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0.2 }}
              className={cn(
                "absolute bottom-0 left-0 right-0 h-auto min-h-full p-4 sm:p-6 pb-6 sm:pb-8 flex flex-col justify-between rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl border-t-2 z-30",
                isAlmost 
                  ? "bg-amber-950/95 border-amber-400"
                  : (isCorrect ? "bg-emerald-900/95 border-emerald-400" : "bg-rose-900/95 border-rose-400")
              )}
            >
              <div className="flex flex-col justify-between max-w-3xl mx-auto w-full gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={cn(
                    "w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0 border-4 shadow-inner",
                    isAlmost
                      ? "bg-amber-500 border-amber-300"
                      : (isCorrect ? "bg-emerald-500 border-emerald-300" : "bg-rose-500 border-rose-300")
                  )}>
                    {isAlmost ? (
                      <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    ) : (
                      isCorrect ? <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" /> : <X className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className={cn(
                      "text-2xl sm:text-3xl font-black mb-0 sm:mb-1 drop-shadow-md",
                      isAlmost ? "text-amber-300" : (isCorrect ? "text-emerald-300" : "text-rose-300")
                    )}>
                      {isAlmost 
                        ? (language === 'en' ? "Check Your Units!" : "注意單位！")
                        : (isCorrect ? t.game.awesome : t.game.notQuite)}
                    </h3>
                    <p className={cn(
                      "font-bold text-sm sm:text-lg leading-tight flex flex-wrap items-center gap-y-1",
                      isAlmost ? "text-amber-100" : (isCorrect ? "text-emerald-100" : "text-rose-100")
                    )}>
                      {isAlmost 
                        ? (language === 'en' 
                            ? "Almost! Your number is correct, but remember to include the correct units (like m, cm, m², laps, etc.)." 
                            : "差一點點！你的數字正確，但記得加上正確的單位（例如：公尺、公分、m²、圈等）。")
                        : renderMathText(currentQuestion.explanation[language])}
                    </p>
                  </div>
                </div>
                
                {isAlmost ? (
                  <button
                    onClick={() => {
                      audioEngine.play('click');
                      setIsAnswerChecked(false);
                      setIsAlmost(false);
                    }}
                    className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xl sm:text-2xl text-white shadow-xl border-b-[4px] sm:border-b-[6px] active:translate-y-1 sm:active:translate-y-2 active:border-b-0 transition-all mt-2 sm:mt-0 cursor-pointer bg-amber-500 border-amber-700 hover:bg-amber-400"
                  >
                    {language === 'en' ? "TRY AGAIN" : "再試一次"}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className={cn(
                      "w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xl sm:text-2xl text-white shadow-xl border-b-[4px] sm:border-b-[6px] active:translate-y-1 sm:active:translate-y-2 active:border-b-0 transition-all mt-2 sm:mt-0 cursor-pointer",
                      isCorrect ? "bg-emerald-500 border-emerald-700 hover:bg-emerald-400" : "bg-rose-500 border-rose-700 hover:bg-rose-400"
                    )}
                  >
                    {t.game.continue}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isAnswerChecked && (
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 h-full flex items-center">
            <div className="max-w-3xl mx-auto w-full">
              <button
                onClick={handleCheckAnswer}
                disabled={isHell ? !typedAnswer.trim() : selectedAnswer === null}
                className={cn(
                  "w-full py-4 sm:py-5 rounded-[1.5rem] sm:rounded-[2rem] font-black text-xl sm:text-2xl text-white border-b-[6px] sm:border-b-[8px] transition-all duration-300 cursor-pointer",
                  (isHell ? typedAnswer.trim() : selectedAnswer !== null) 
                    ? "bg-pink-500 border-pink-700 hover:bg-pink-400 active:translate-y-1 sm:active:translate-y-2 active:border-b-0 shadow-[0_10px_30px_rgba(236,72,153,0.5)] scale-100" 
                    : "bg-white/10 border-white/5 text-slate-500 cursor-not-allowed scale-95"
                )}
              >
                {t.game.check}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
