import { useState, useEffect } from 'react';
import { ZONES } from '../data/curriculum';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { cn } from '../lib/utils';
import { translations } from '../i18n';
import { audioEngine } from '../utils/audio';

interface SideQuestQuestion {
  id: string;
  question: { en: string; zh: string };
  answer: string;
}

const SIDE_QUESTS: SideQuestQuestion[] = [
  {
    id: 'sq_1',
    question: { 
      en: "If Nina repeats a 4-second dance move 8 times, how many seconds does she dance in total?", 
      zh: "如果妮娜重複一個 4 秒的舞蹈動作 8 次，她總共跳了多少秒？" 
    },
    answer: "32"
  },
  {
    id: 'sq_2',
    question: { 
      en: "What is the least common multiple (LCM) of 4 and 6?", 
      zh: "4 和 6 的最小公倍數（LCM）是多少？" 
    },
    answer: "12"
  },
  {
    id: 'sq_3',
    question: { 
      en: "What is the greatest common divisor (GCD) of 12 and 18?", 
      zh: "12 和 18 的最大公因數（GCD）是多少？" 
    },
    answer: "6"
  },
  {
    id: 'sq_4',
    question: { 
      en: "Solve for x: 3x - 5 = 10.", 
      zh: "求解 x：3x - 5 = 10。" 
    },
    answer: "5"
  },
  {
    id: 'sq_5',
    question: { 
      en: "Nina has 3 performance outfits and 4 hair accessories. How many unique style combinations can she create?", 
      zh: "妮娜有 3 套演出服和 4 個髮飾。她能創造出多少種獨特的造型組合？" 
    },
    answer: "12"
  },
  {
    id: 'sq_6',
    question: { 
      en: "A circular dance floor has a diameter of 10 meters. What is its radius in meters?", 
      zh: "一個圓形舞池的直徑是 10 公尺。它的半徑是多少公尺？" 
    },
    answer: "5"
  },
  {
    id: 'sq_7',
    question: { 
      en: "If Nina practices choreography for 45 minutes every day, how many minutes does she practice in 2 days?", 
      zh: "如果妮娜每天練習編舞 45 分鐘，她在 2 天內共練習了多少分鐘？" 
    },
    answer: "90"
  },
  {
    id: 'sq_8',
    question: { 
      en: "What is 20% of 150 gold coins?", 
      zh: "150 枚金幣的 20% 是多少？" 
    },
    answer: "30"
  },
  {
    id: 'sq_9',
    question: { 
      en: "If Nina completes a quest in 12 minutes, and Sulan takes twice as long, how many minutes did Sulan take?", 
      zh: "如果妮娜在 12 分鐘內完成一項任務，而蘇蘭花費的時間是她的兩倍，蘇蘭花了多少分鐘？" 
    },
    answer: "24"
  },
  {
    id: 'sq_10',
    question: { 
      en: "Solve the puzzle: 2 * (x + 3) = 16. What is x?", 
      zh: "解答謎題：2 * (x + 3) = 16。x 是多少？" 
    },
    answer: "5"
  },
  {
    id: 'sq_11',
    question: { 
      en: "Pi (π) is approximately 3.1415926535... What is the value of Pi rounded to 2 decimal places?", 
      zh: "圓周率 (π) 大約是 3.1415926535... 請問四捨五入到小數點後 2 位的數值是多少？" 
    },
    answer: "3.14"
  },
  {
    id: 'sq_12',
    question: { 
      en: "Pi (π) is approximately 3.1415926535... What is the value of Pi rounded to 3 decimal places?", 
      zh: "圓周率 (π) 大約是 3.1415926535... 請問四捨五入到小數點後 3 位的數值是多少？" 
    },
    answer: "3.142"
  },
  {
    id: 'sq_13',
    question: { 
      en: "Pi (π) is approximately 3.141592653589... What is the value of Pi rounded to 4 decimal places?", 
      zh: "圓周率 (π) 大約是 3.141592653589... 請問四捨五入到小數點後 4 位的數值是多少？" 
    },
    answer: "3.1416"
  },
  {
    id: 'sq_14',
    question: {
      en: "Given Pi (π) ≈ 3.14159..., calculate the area in square meters of a circular stage with a radius of 10 meters, rounded to the nearest integer.",
      zh: "設圓周率 (π) ≈ 3.14159...，計算半徑為 10 公尺的圓形舞台面積（平方米），四捨五入到最接近的整數。"
    },
    answer: "314"
  },
  {
    id: 'sq_15',
    question: {
      en: "Given Pi (π) ≈ 3.14159..., what is the circumference of a circular stage with a diameter of 20 meters, rounded to one decimal place?",
      zh: "設圓周率 (π) ≈ 3.14159...，一個直徑為 20 公尺的圓形舞台周長是多少公尺？（四捨五入到小數點後 1 位）"
    },
    answer: "62.8"
  },
  {
    id: 'sq_16',
    question: {
      en: "If Nina does a dance routine that decreases in beat tempo by 5% every minute, and the starting tempo is 120 BPM, what is the tempo (BPM) after exactly 1 minute?",
      zh: "如果妮娜跳的舞蹈節奏每分鐘減少 5%，初始節奏為 120 BPM，一分鐘後的節奏（BPM）是多少？"
    },
    answer: "114"
  },
  {
    id: 'sq_17',
    question: {
      en: "A dance squad of 8 dancers wants to form pairs for a duet. How many unique duets can be formed from the group?",
      zh: "一個 8 人的舞蹈隊伍想要兩兩組隊進行雙人舞。這群人總共可以組成多少種不同的雙人舞組合？"
    },
    answer: "28"
  },
  {
    id: 'sq_18',
    question: {
      en: "A rectangular dance hall measures 15 meters by 12 meters. What is its area in square meters?",
      zh: "一個長方形舞廳，長 15 公尺、寬 12 公尺。它的面積是多少平方公尺？"
    },
    answer: "180"
  },
  {
    id: 'sq_19',
    question: {
      en: "Solve for x: 5x + 3 = 2x + 18.",
      zh: "求解 x：5x + 3 = 2x + 18。"
    },
    answer: "5"
  },
  {
    id: 'sq_20',
    question: {
      en: "What is the square root of 225?",
      zh: "225 的平方根是多少？"
    },
    answer: "15"
  },
  {
    id: 'sq_21',
    question: {
      en: "A sequence of dance steps follows the pattern: 2, 4, 8, 16, ... What is the next number in the sequence?",
      zh: "一組舞蹈步伐遵循以下規律：2, 4, 8, 16, ... 序列中的下一個數字是多少？"
    },
    answer: "32"
  }
];

export function WorldMap({ onSelectZone }: { onSelectZone: (zoneId: string) => void }) {
  const { unlockedZones, level, completedLevels, language, addCoins } = useGame();
  const t = translations[language];

  const [questActive, setQuestActive] = useState(false);
  const [questTimeLeft, setQuestTimeLeft] = useState(0);
  const [showQuestModal, setShowQuestModal] = useState(false);
  const [currentQuest, setCurrentQuest] = useState<SideQuestQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [questStatus, setQuestStatus] = useState<'unanswered' | 'correct' | 'wrong'>('unanswered');
  const [isShaking, setIsShaking] = useState(false);
  const [isFirstSpawn, setIsFirstSpawn] = useState(true);

  // Countdown Timer for the active quest notification
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (questActive && questTimeLeft > 0 && !showQuestModal) {
      interval = setInterval(() => {
        setQuestTimeLeft(prev => {
          if (prev <= 1) {
            setQuestActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [questActive, questTimeLeft, showQuestModal]);

  // Handle recurrent spawning "once in a while"
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!questActive && !showQuestModal) {
      const delay = isFirstSpawn ? 6000 : 25000;
      timeout = setTimeout(() => {
        // Filter out current quest to avoid duplicate consecutively
        const availableQuests = currentQuest 
          ? SIDE_QUESTS.filter(q => q.id !== currentQuest.id)
          : SIDE_QUESTS;
        const randomIdx = Math.floor(Math.random() * availableQuests.length);
        setCurrentQuest(availableQuests[randomIdx]);
        setQuestActive(true);
        setQuestTimeLeft(15);
        setUserAnswer('');
        setQuestStatus('unanswered');
        setIsFirstSpawn(false);
      }, delay);
    }
    return () => clearTimeout(timeout);
  }, [questActive, showQuestModal, isFirstSpawn, currentQuest]);

  const checkAnswer = () => {
    if (!currentQuest) return;
    const cleanUser = userAnswer.trim().toLowerCase();
    const cleanTarget = currentQuest.answer.trim().toLowerCase();
    
    if (cleanUser === cleanTarget) {
      audioEngine.play('correct');
      addCoins(67);
      setQuestStatus('correct');
      setTimeout(() => {
        setShowQuestModal(false);
        setQuestActive(false);
      }, 1200);
    } else {
      audioEngine.play('wrong');
      setQuestStatus('wrong');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const trainingZones = ZONES.filter(z => z.type === 'training');
  const kingdomZones = ZONES.filter(z => z.type === 'kingdom');

  return (
    <div className="min-h-screen pb-32 pt-6 px-4 flex flex-col items-center overflow-y-auto">
      <div className="w-full max-w-lg mb-8">
        <h1 className="text-3xl font-black text-white drop-shadow-md text-center">{t.map.welcome}</h1>
      </div>
      
      {/* Training Grounds Section */}
      <div className="w-full max-w-lg mb-4 text-center">
        <h2 className="text-xl font-bold text-slate-300 uppercase tracking-widest">{language === 'en' ? 'Training Grounds' : '訓練場'}</h2>
        <p className="text-sm text-slate-400 mb-8">{language === 'en' ? 'Practice concepts to earn XP' : '練習概念以獲得 XP'}</p>
      </div>

      <div className="w-full max-w-lg relative mb-16">
        {/* Background path line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-4 bg-white/5 -translate-x-1/2 rounded-full z-0" />
        
        {trainingZones.map((zone, index) => {
          const isLockedByLevel = level < zone.requiredLevel;
          const isUnlocked = unlockedZones.includes(zone.id) || !isLockedByLevel;
          // Dynamically get the icon component
          const IconComponent = (Icons as any)[zone.icon] || Icons.MapPin;
          
          const isEven = index % 2 === 0;
          const stars = completedLevels[zone.id] || 0;

          return (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative z-10 flex w-full my-8",
                isEven ? "justify-start pr-12" : "justify-end pl-12"
              )}
            >
              {/* Connector dot */}
              <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-slate-800 border-4 border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 z-0 shadow-lg" />
              <button
                onClick={() => {
                  if (isUnlocked) {
                    audioEngine.play('click');
                    onSelectZone(zone.id);
                  }
                }}
                disabled={!isUnlocked}
                className={cn(
                  "w-3/4 rounded-[32px] p-4 transition-transform active:scale-95 relative overflow-hidden backdrop-blur-md shadow-xl border",
                  isUnlocked ? "bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer" : "bg-white/5 border-white/5 opacity-60 cursor-not-allowed grayscale"
                )}
              >
                <div className={cn(
                  "w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(255,255,255,0.2)] border-4 border-white/20 ring-4 ring-white/10 text-white z-10 relative bg-gradient-to-br",
                  isUnlocked ? zone.color : "from-slate-700 to-slate-800 grayscale"
                )}>
                  {isUnlocked && (
                    <motion.div 
                      className="absolute inset-0 z-0"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
                    </motion.div>
                  )}
                  {isLockedByLevel ? (
                    <Icons.Lock className="w-8 h-8" />
                  ) : (
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                      className="relative z-10"
                    >
                      <IconComponent className="w-8 h-8 drop-shadow-md" />
                    </motion.div>
                  )}
                </div>
                
                <h3 className="font-bold text-center text-white text-lg drop-shadow-md relative z-10">{zone.name[language]}</h3>
                
                {isUnlocked ? (
                  <div className="flex justify-center gap-1 mt-2 relative z-10">
                    {[1, 2, 3].map(star => (
                      <Icons.Star 
                        key={star} 
                        className={cn(
                          "w-5 h-5",
                          star <= stars ? "fill-yellow-400 text-yellow-300 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" : "fill-white/10 text-white/20"
                        )} 
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-center text-red-400 font-bold mt-2 relative z-10 drop-shadow-md">
                    {t.map.locked} {zone.requiredLevel}
                  </p>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Starred Kingdoms Section */}
      <div className="w-full max-w-lg mb-4 text-center mt-8">
        <h2 className="text-2xl font-black text-amber-300 uppercase tracking-widest drop-shadow-md flex items-center justify-center gap-2">
          <Icons.Star className="w-6 h-6 fill-amber-300" />
          {language === 'en' ? 'Starred Kingdoms' : '星辰王國'}
          <Icons.Star className="w-6 h-6 fill-amber-300" />
        </h2>
        <p className="text-sm text-amber-200/70 mb-8">{language === 'en' ? 'Complete challenges for coins & gems!' : '完成挑戰獲得金幣與寶石！'}</p>
      </div>

      <div className="w-full max-w-lg relative mb-16">
        {/* Background path line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-4 bg-amber-500/20 -translate-x-1/2 rounded-full z-0" />
        
        {kingdomZones.map((zone, index) => {
          const isLockedByLevel = level < zone.requiredLevel;
          const isUnlocked = unlockedZones.includes(zone.id) || !isLockedByLevel;
          // Dynamically get the icon component
          const IconComponent = (Icons as any)[zone.icon] || Icons.MapPin;
          
          const isEven = index % 2 === 0;
          const stars = completedLevels[zone.id] || 0;

          return (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative z-10 flex w-full my-8",
                isEven ? "justify-start pr-12" : "justify-end pl-12"
              )}
            >
              {/* Connector dot */}
              <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-slate-900 border-4 border-amber-500/50 rounded-full -translate-x-1/2 -translate-y-1/2 z-0 shadow-lg shadow-amber-500/20" />
              <button
                onClick={() => {
                  if (isUnlocked) {
                    audioEngine.play('click');
                    onSelectZone(zone.id);
                  }
                }}
                disabled={!isUnlocked}
                className={cn(
                  "w-3/4 rounded-[32px] p-4 transition-transform active:scale-95 relative overflow-hidden backdrop-blur-md shadow-xl border-2",
                  isUnlocked ? "bg-amber-900/40 border-amber-500/40 hover:bg-amber-900/60 cursor-pointer shadow-[0_0_30px_rgba(245,158,11,0.15)]" : "bg-slate-900/60 border-slate-700/50 opacity-80 cursor-not-allowed"
                )}
              >
                <div className={cn(
                  "w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(255,255,255,0.2)] border-4 border-white/20 ring-4 ring-white/10 text-white z-10 relative bg-gradient-to-br",
                  isUnlocked ? zone.color : "from-slate-700 to-slate-800 grayscale"
                )}>
                  {isUnlocked && (
                    <motion.div 
                      className="absolute inset-0 z-0"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
                    </motion.div>
                  )}
                  {isLockedByLevel ? (
                    <Icons.Lock className="w-8 h-8" />
                  ) : (
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                      className="relative z-10"
                    >
                      <IconComponent className="w-8 h-8 drop-shadow-md" />
                    </motion.div>
                  )}
                </div>
                
                <h3 className="font-bold text-center text-white text-lg drop-shadow-md relative z-10">{zone.name[language]}</h3>
                
                {isUnlocked ? (
                  <div className="flex justify-center gap-1 mt-2 relative z-10">
                    {[1, 2, 3].map(star => (
                      <Icons.Star 
                        key={star} 
                        className={cn(
                          "w-5 h-5",
                          star <= stars ? "fill-yellow-400 text-yellow-300 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" : "fill-white/10 text-white/20"
                        )} 
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-center text-red-400 font-bold mt-2 relative z-10 drop-shadow-md">
                    {t.map.locked} {zone.requiredLevel}
                  </p>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Eye-catching Side Quest Notification */}
      <AnimatePresence>
        {questActive && !showQuestModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0,
              y: [0, -8, 0]
            }}
            exit={{ opacity: 0, scale: 0.8, x: 100 }}
            transition={{
              y: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              },
              default: {
                type: 'spring',
                stiffness: 260,
                damping: 20
              }
            }}
            className="fixed bottom-24 right-4 md:right-8 z-50 cursor-pointer pointer-events-auto"
            onClick={() => {
              audioEngine.play('nav');
              setShowQuestModal(true);
            }}
          >
            <div className="relative group bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 p-[2px] rounded-2xl shadow-[0_10px_30px_rgba(236,72,153,0.3)] hover:shadow-[0_15px_40px_rgba(236,72,153,0.5)] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-300" />
              
              <div className="relative bg-slate-950/95 backdrop-blur-xl rounded-2xl p-3.5 flex items-center gap-3.5 border border-white/10 w-72 max-w-sm">
                
                <div className="relative shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center shadow-lg">
                  <Icons.HelpCircle className="w-7 h-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-yellow-500"></span>
                  </span>
                </div>

                <div className="flex-1">
                  <h4 className="font-black text-xs sm:text-sm text-amber-300 uppercase tracking-wide flex items-center gap-1">
                    <Icons.Sparkles className="w-3.5 h-3.5 fill-amber-300 animate-pulse" />
                    {language === 'en' ? "Secret Side Quest!" : "限時神秘任務！"}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {language === 'en' ? "Tap to answer & win" : "點擊回答贏取"} <span className="text-yellow-400 font-bold">67 🪙</span>!
                  </p>
                  
                  <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-amber-400 to-pink-500"
                      initial={{ width: '100%' }}
                      animate={{ width: `${(questTimeLeft / 15) * 100}%` }}
                      transition={{ duration: 1, ease: 'linear' }}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    audioEngine.play('click');
                    setQuestActive(false);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all shrink-0 cursor-pointer"
                  aria-label="Dismiss quest"
                >
                  <Icons.X className="w-4 h-4" />
                </button>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Quest Modal Dialog */}
      <AnimatePresence>
        {showQuestModal && currentQuest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (questStatus !== 'correct') {
                  audioEngine.play('click');
                  setShowQuestModal(false);
                  setQuestActive(false);
                }
              }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                x: isShaking ? [0, -10, 10, -10, 10, 0] : 0
              }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                x: { duration: 0.4 },
                default: { type: 'spring', damping: 25, stiffness: 350 }
              }}
              className="relative w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-[32px] p-6 shadow-[0_20px_50px_rgba(245,158,11,0.2)] overflow-hidden z-10"
            >
              <div className="absolute -top-16 -left-16 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

              {questStatus !== 'correct' && (
                <button
                  onClick={() => {
                    audioEngine.play('click');
                    setShowQuestModal(false);
                    setQuestActive(false);
                  }}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <Icons.X className="w-5 h-5" />
                </button>
              )}

              <div className="text-center mb-6">
                <div className="inline-flex p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg shadow-amber-500/20 mb-3">
                  <Icons.Scroll className="w-8 h-8 text-slate-950" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-wide">
                  {language === 'en' ? "Sulan's Secret Scroll" : "蘇蘭的神秘捲軸"}
                </h3>
                <p className="text-xs text-amber-400/80 font-bold tracking-widest uppercase mt-1">
                  ✨ {language === 'en' ? "Side Quest Challenge" : "限時支線挑戰"} ✨
                </p>
              </div>

              <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-5 mb-5 text-center">
                <p className="text-base font-bold text-slate-200 leading-relaxed">
                  {currentQuest.question[language]}
                </p>
              </div>

              {questStatus !== 'correct' ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    checkAnswer();
                  }}
                  className="flex flex-col gap-4"
                >
                  <div className="relative">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => {
                        setUserAnswer(e.target.value);
                        if (questStatus === 'wrong') {
                          setQuestStatus('unanswered');
                        }
                      }}
                      placeholder={language === 'en' ? "Type your answer..." : "請輸入你的答案..."}
                      className={cn(
                        "w-full px-5 py-4 bg-slate-950 border rounded-2xl text-center text-lg font-bold text-white focus:outline-none transition-all duration-300",
                        questStatus === 'wrong' 
                          ? "border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.2)] focus:border-red-500" 
                          : "border-white/10 focus:border-amber-400 focus:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                      )}
                      autoFocus
                    />
                  </div>

                  {questStatus === 'wrong' && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-400 font-black text-center flex items-center justify-center gap-1"
                    >
                      <Icons.AlertCircle className="w-4 h-4" />
                      {language === 'en' ? "Incorrect answer. Try again!" : "答案不正確，請再試一次！"}
                    </motion.p>
                  )}

                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        audioEngine.play('click');
                        setShowQuestModal(false);
                        setQuestActive(false);
                      }}
                      className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl active:scale-95 transition-all cursor-pointer text-center text-sm"
                    >
                      {language === 'en' ? "Give Up" : "放棄"}
                    </button>
                    <button
                      type="submit"
                      disabled={!userAnswer.trim()}
                      className={cn(
                        "flex-1 py-3.5 font-bold rounded-2xl active:scale-95 transition-all cursor-pointer text-center text-sm shadow-md",
                        userAnswer.trim() 
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 hover:brightness-110 animate-pulse" 
                          : "bg-slate-800 text-slate-500 cursor-not-allowed"
                      )}
                    >
                      {language === 'en' ? "Submit Answer" : "提交答案"}
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-4 animate-bounce">
                    <Icons.Check className="w-9 h-9 text-emerald-400" />
                  </div>
                  
                  <h4 className="text-2xl font-black text-emerald-400 mb-1">
                    {language === 'en' ? "Correct! 🎉" : "回答正確！🎉"}
                  </h4>
                  <p className="text-sm text-slate-300 mb-4 px-4">
                    {language === 'en' ? "67 Coins added directly to your balance!" : "67 枚金幣已直接存入您的餘額！"}
                  </p>

                  <div className="bg-slate-950/60 border border-emerald-500/20 rounded-2xl p-4 w-full flex items-center justify-center gap-2">
                    <span className="text-slate-400 text-sm font-medium">{language === 'en' ? "Added:" : "已加入："}</span>
                    <span className="text-xl font-black text-yellow-400 flex items-center gap-1 drop-shadow-[0_0_10px_rgba(234,179,8,0.4)] animate-pulse">
                      +67 <Icons.Coins className="w-5 h-5 fill-yellow-400 inline" />
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
