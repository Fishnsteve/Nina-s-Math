import { useState, useEffect, useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { QUESTIONS, ZONES, generateQuestion } from '../data/curriculum';
import { Question } from '../types/game';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, Zap, Coins, HeartCrack, Heart, Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../lib/utils';
import { translations } from '../i18n';
import { NinaAvatar } from './NinaAvatar';
import { Notepad } from './Notepad';

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

export function GameSession({ zoneId, onExit }: { zoneId: string, onExit: () => void }) {
  const { addXp, addCoins, loseHeart, hearts, incrementStreak, resetStreak, currentStreak, completeLevel, language, equippedBackground } = useGame();
  const t = translations[language];
  
  const zone = ZONES.find(z => z.id === zoneId);
  const isKingdom = zone?.type === 'kingdom';
  const totalQuestions = isKingdom ? 10 : 5;
  
  const zoneQuestions = useMemo(() => {
    if (!zone) return [];
    return Array.from({ length: totalQuestions }).map((_, idx) => {
      const topic = Array.isArray(zone.topic) 
        ? zone.topic[Math.floor(Math.random() * zone.topic.length)] 
        : zone.topic;
        
      let diff: 'Easy' | 'Normal' | 'Hard' | 'Extra' = 'Easy';
      if (isKingdom) {
        if (idx < 3) diff = 'Normal';
        else if (idx < 6) diff = 'Hard';
        else diff = 'Extra';
      } else {
        if (idx < 2) diff = 'Easy';
        else if (idx < 4) diff = 'Normal';
        else diff = 'Hard';
      }
      return generateQuestion(topic, diff);
    });
  }, [zone?.topic, totalQuestions, isKingdom]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  
  const currentQuestion = zoneQuestions[currentIndex];

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

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    
    setIsAnswerChecked(true);
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      handleFireConfetti();
      incrementStreak();
      
      if (zone?.type === 'kingdom') {
        const baseCoins = 15;
        const streakBonus = Math.floor(currentStreak / 3) * 5;
        addCoins(baseCoins + streakBonus);
        addXp(20);
      } else {
        const baseCoins = 2;
        const streakBonus = Math.floor(currentStreak / 3) * 1;
        addCoins(baseCoins + streakBonus);
        addXp(40);
      }
    } else {
      setMistakes(m => m + 1);
      if (isKingdom) {
        loseHeart();
      }
      resetStreak();
    }
  };

  const handleNext = () => {
    if (isKingdom && mistakes >= 3) {
      setIsFailed(true);
      return;
    }
    
    if (currentIndex < zoneQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
      let stars = 3;
      if (mistakes === 1) stars = 2;
      else if (mistakes >= 2) stars = 1;
      
      completeLevel(zoneId, stars);
      handleFireConfetti();
      handleFireConfetti();
    }
  };

  if (isCompleted) {
    const isKingdom = zone?.type === 'kingdom';
    const completionXp = isKingdom ? 50 : 100;
    const completionCoins = isKingdom ? 150 : 10;
    
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
        <h2 className="text-4xl font-black mb-4 drop-shadow-md text-emerald-400">{t.game.zoneCleared}</h2>
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
          className="bg-emerald-500 text-white font-bold text-xl py-4 px-12 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 transition-transform border border-emerald-400 hover:bg-emerald-400"
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
          className="bg-rose-500 text-white font-bold text-xl py-4 px-12 rounded-full shadow-[0_0_20px_rgba(225,29,72,0.4)] active:scale-95 transition-transform border border-rose-400 hover:bg-rose-400"
        >
          {t.game.continue}
        </button>
      </div>
    );
  }

  if ((hearts <= 0 || !currentQuestion) && !isCompleted && !isFailed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-20">
        <HeartCrack className="w-24 h-24 text-rose-500 mb-6 drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]" />
        <h2 className="text-3xl font-black text-white mb-4 drop-shadow-md">{t.game.outOfHearts}</h2>
        <p className="text-rose-200 mb-8 bg-rose-900/30 px-6 py-2 rounded-full border border-rose-500/20 backdrop-blur-sm font-medium">{t.game.takeBreak}</p>
        
        <div className="w-40 h-40 mb-8 grayscale opacity-70">
          <NinaAvatar />
        </div>

        <button 
          onClick={onExit}
          className="bg-white/10 text-white font-bold py-4 px-8 rounded-full shadow-lg border border-white/20 active:scale-95 transition-transform w-full max-w-sm backdrop-blur-md hover:bg-white/20"
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
    <div className={cn("h-[100dvh] flex flex-col relative z-20 overflow-hidden bg-gradient-to-b transition-colors duration-1000", getBackgroundClass(equippedBackground))}>
      
      {/* Floating Particles Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20 blur-[1px]"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Game Header */}
      <div className="p-4 flex items-center justify-between shrink-0 relative z-10">
        <button onClick={onExit} className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 mx-4 bg-black/40 rounded-full h-5 overflow-hidden border border-white/10 shadow-inner p-1">
          <motion.div 
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / zoneQuestions.length) * 100}%` }}
          />
        </div>
        {isKingdom && (
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <Heart 
                key={i} 
                className={cn("w-6 h-6 transition-all duration-300", i < 3 - mistakes ? "fill-rose-500 text-rose-500 scale-100 drop-shadow-md" : "fill-transparent text-white/20 scale-90")} 
              />
            ))}
          </div>
        )}
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
                onClick={() => setSelectedAnswer(idx)}
                className={cn(
                  "w-full flex flex-col items-center justify-center p-3 sm:p-5 rounded-[1.5rem] border-b-[4px] font-black text-lg sm:text-2xl transition-all duration-300 active:translate-y-1 active:border-b-0",
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
        </div>
        
        <Notepad />
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
                isCorrect ? "bg-emerald-900/95 border-emerald-400" : "bg-rose-900/95 border-rose-400"
              )}
            >
              <div className="flex flex-col justify-between max-w-3xl mx-auto w-full gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={cn(
                    "w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0 border-4 shadow-inner",
                    isCorrect ? "bg-emerald-500 border-emerald-300" : "bg-rose-500 border-rose-300"
                  )}>
                    {isCorrect ? <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" /> : <X className="w-8 h-8 sm:w-10 sm:h-10 text-white" />}
                  </div>
                  <div>
                    <h3 className={cn(
                      "text-2xl sm:text-3xl font-black mb-0 sm:mb-1 drop-shadow-md",
                      isCorrect ? "text-emerald-300" : "text-rose-300"
                    )}>
                      {isCorrect ? t.game.awesome : t.game.notQuite}
                    </h3>
                    <p className={cn(
                      "font-bold text-sm sm:text-lg leading-tight flex flex-wrap items-center gap-y-1",
                      isCorrect ? "text-emerald-100" : "text-rose-100"
                    )}>
                      {renderMathText(currentQuestion.explanation[language])}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleNext}
                  className={cn(
                    "w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xl sm:text-2xl text-white shadow-xl border-b-[4px] sm:border-b-[6px] active:translate-y-1 sm:active:translate-y-2 active:border-b-0 transition-all mt-2 sm:mt-0",
                    isCorrect ? "bg-emerald-500 border-emerald-700 hover:bg-emerald-400" : "bg-rose-500 border-rose-700 hover:bg-rose-400"
                  )}
                >
                  {t.game.continue}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isAnswerChecked && (
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 h-full flex items-center">
            <div className="max-w-3xl mx-auto w-full">
              <button
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null}
                className={cn(
                  "w-full py-4 sm:py-5 rounded-[1.5rem] sm:rounded-[2rem] font-black text-xl sm:text-2xl text-white border-b-[6px] sm:border-b-[8px] transition-all duration-300",
                  selectedAnswer !== null 
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
