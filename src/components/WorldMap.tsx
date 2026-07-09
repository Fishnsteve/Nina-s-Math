import { useState, useEffect } from 'react';
import { ZONES } from '../data/curriculum';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { cn } from '../lib/utils';
import { OrbitingOrbs, KingdomNode, HellNode } from './ZoneNodes';
import { FloatingIsometricNode } from './nodes/FloatingIsometricNode';
import { KingdomNumberSenseNode } from './nodes/KingdomNumberSenseNode';
import { KingdomLogicAlgebraNode } from './nodes/KingdomLogicAlgebraNode';
import { KingdomGeometryMotionNode } from './nodes/KingdomGeometryMotionNode';
import { getIslandColors } from '../utils/getIslandColors';
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
      en: "If Nina completes a quest in 12 minutes, and Sishu takes twice as long, how many minutes did Sishu take?", 
      zh: "如果妮娜在 12 分鐘內完成一項任務，而喜樹花費的時間是她的兩倍，喜樹花了多少分鐘？" 
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

const MagicalFlyingChest = () => {
  return (
    <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_8px_16px_rgba(245,158,11,0.4)] overflow-visible">
      <defs>
        <radialGradient id="chestGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldBright" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="woodTexture" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>

      <ellipse cx="50" cy="85" rx="30" ry="10" fill="url(#chestGlow)" className="animate-pulse" />

      {/* Flapping Left Wing */}
      <motion.g
        animate={{
          rotate: [-15, 25, -15],
          y: [0, -3, 0]
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformOrigin: "35px 50px" }}
      >
        <path d="M 35,50 C 10,40 -5,15 10,10 C 25,5 30,25 35,50 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
        <path d="M 30,45 C 15,38 5,20 18,15 C 28,10 28,25 30,45 Z" fill="#f1f5f9" />
      </motion.g>

      {/* Flapping Right Wing */}
      <motion.g
        animate={{
          rotate: [15, -25, 15],
          y: [0, -3, 0]
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformOrigin: "65px 50px" }}
      >
        <path d="M 65,50 C 90,40 105,15 90,10 C 75,5 70,25 65,50 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
        <path d="M 70,45 C 85,38 95,20 82,15 C 72,10 72,25 70,45 Z" fill="#f1f5f9" />
      </motion.g>

      {/* Sparkles */}
      <g>
        <circle cx="20" cy="30" r="1.5" fill="#fde047">
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="30;10" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="25" r="2" fill="#38bdf8">
          <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="cy" values="25;5" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Chest Body */}
      <g className="cursor-pointer">
        <path d="M 25,52 L 75,52 L 70,80 L 30,80 Z" fill="url(#woodTexture)" stroke="#1e1b4b" strokeWidth="2.5" strokeLinejoin="round" />
        
        <path d="M 25,52 L 35,52 L 30,80 L 25,52 Z" fill="url(#goldBright)" />
        <path d="M 75,52 L 65,52 L 70,80 L 75,52 Z" fill="url(#goldBright)" />
        <path d="M 30,80 L 70,80 L 68,76 L 32,76 Z" fill="url(#goldBright)" stroke="#78350f" strokeWidth="0.5" />

        {/* Chest Lid */}
        <motion.g
          animate={{
            y: [0, -3, 0],
            rotate: [0, -1.5, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "50px 52px" }}
        >
          <path d="M 23,52 C 23,28 77,28 77,52 Z" fill="url(#woodTexture)" stroke="#1e1b4b" strokeWidth="2.5" />
          <path d="M 23,52 C 23,28 33,28 33,52" fill="none" stroke="url(#goldBright)" strokeWidth="4" />
          <path d="M 77,52 C 77,28 67,28 67,52" fill="none" stroke="url(#goldBright)" strokeWidth="4" />
          <path d="M 23,52 L 77,52" stroke="url(#goldBright)" strokeWidth="3" />

          {/* Blink eyes */}
          <motion.g 
            transform="translate(42, 42)"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <ellipse cx="0" cy="0" rx="3.5" ry="5.5" fill="#ffffff" />
            <ellipse cx="-0.5" cy="0.5" rx="2" ry="3" fill="#1e293b" />
            <circle cx="-1" cy="-2" r="1" fill="#ffffff" />
          </motion.g>
          <motion.g 
            transform="translate(58, 42)"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <ellipse cx="0" cy="0" rx="3.5" ry="5.5" fill="#ffffff" />
            <ellipse cx="0.5" cy="0.5" rx="2" ry="3" fill="#1e293b" />
            <circle cx="0" cy="-2" r="1" fill="#ffffff" />
          </motion.g>

          <ellipse cx="37" cy="46" rx="2" ry="1.2" fill="#f43f5e" opacity="0.6" />
          <ellipse cx="63" cy="46" rx="2" ry="1.2" fill="#f43f5e" opacity="0.6" />

          <path d="M 48,46 Q 50,49 52,46" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>

        {/* Lock */}
        <g transform="translate(50, 52)">
          <rect x="-6" y="-6" width="12" height="12" rx="3" fill="url(#goldBright)" stroke="#78350f" strokeWidth="1.5" />
          <circle cx="0" cy="-1" r="2.5" fill="#06b6d4" className="animate-pulse" />
          <path d="M 0,1 L 0,4" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
};

const MagicalUnfoldedScroll = () => {
  return (
    <svg viewBox="0 0 120 80" className="w-24 h-16 mx-auto drop-shadow-[0_6px_12px_rgba(245,158,11,0.3)] overflow-visible">
      <path d="M 20,15 L 100,15 C 105,15 105,25 100,25 L 20,25 C 15,25 15,15 20,15 Z" fill="#fde047" opacity="0.3" />
      <path d="M 20,20 L 100,20 Q 103,40 100,60 L 20,60 Q 17,40 20,20 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="2" strokeLinejoin="round" />
      
      <path d="M 35,32 L 45,32 M 35,40 L 55,40 M 35,48 L 48,48" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <text x="70" y="48" fill="#ec4899" fontSize="18" fontWeight="bold" fontFamily="sans-serif" opacity="0.8">π</text>
      <text x="85" y="38" fill="#38bdf8" fontSize="16" fontWeight="bold" fontFamily="sans-serif" opacity="0.8">x²</text>

      <g>
        <rect x="13" y="10" width="6" height="60" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="1" />
        <circle cx="16" cy="10" r="4.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
        <circle cx="16" cy="70" r="4.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
        <rect x="18" y="18" width="5" height="44" rx="1.5" fill="#f59e0b" />
      </g>

      <g>
        <rect x="101" y="10" width="6" height="60" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="1" />
        <circle cx="104" cy="10" r="4.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
        <circle cx="104" cy="70" r="4.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
        <rect x="97" y="18" width="5" height="44" rx="1.5" fill="#f59e0b" />
      </g>
    </svg>
  );
};

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
  const hellZones = ZONES.filter(z => z.type === 'hell');

  return (
    <div className="w-full pb-32 pt-6 px-4 flex flex-col items-center">
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl mb-8">
        <h1 className="text-3xl font-black text-white drop-shadow-md text-center">{t.map.welcome}</h1>
      </div>
      
      {/* Training Grounds Section */}
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl mb-4 text-center">
        <h2 className="text-xl font-bold text-slate-300 uppercase tracking-widest">{language === 'en' ? 'Training Grounds' : '訓練場'}</h2>
        <p className="text-sm text-slate-400 mb-8">{language === 'en' ? 'Practice concepts to earn XP' : '練習概念以獲得 XP'}</p>
      </div>

      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl relative mb-16">
        {/* Background path line */}
        <div className="absolute top-16 bottom-16 left-0 right-0 z-0 opacity-40">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <path 
              d={`M 25,6 L 75,18.5 L 25,31 L 75,43.5 L 25,56 L 75,68.5 L 25,81 L 75,93.5`} 
              fill="none" 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth="4" 
              vectorEffect="non-scaling-stroke" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeDasharray="8 8"
            />
          </svg>
        </div>
        
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
                "relative z-10 flex w-full my-6 sm:my-8",
                isEven 
                  ? "justify-start pl-6 sm:pl-12 md:pl-20 lg:pl-36 pr-12" 
                  : "justify-end pr-6 sm:pr-12 md:pr-20 lg:pr-36 pl-12"
              )}
            >
              <div className="relative flex flex-col items-center w-44 sm:w-56 max-w-full overflow-visible">
                {/* Connector line effect */}
                <div className="absolute top-1/2 left-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-1/2 -z-10" />
                
                <button
                  onClick={() => {
                    if (isUnlocked) {
                      audioEngine.play('click');
                      onSelectZone(zone.id);
                    }
                  }}
                  disabled={!isUnlocked}
                  className={cn(
                    "relative group transition-all duration-500 ease-out outline-none",
                    isUnlocked ? "cursor-pointer hover:scale-110 active:scale-95" : "cursor-not-allowed opacity-60 grayscale"
                  )}
                >
                  {/* Outer glowing aura */}
                  {isUnlocked && (
                    <motion.div
                      className={cn(
                        "absolute -inset-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl z-0 bg-gradient-to-br",
                        zone.color
                      )}
                    />
                  )}
                  
                  <div className="w-36 h-36 sm:w-48 sm:h-48 mx-auto relative z-10 flex items-center justify-center overflow-visible">
                    {isLockedByLevel ? (
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-slate-800/80 border-4 border-slate-700 flex items-center justify-center backdrop-blur-sm shadow-xl">
                        <Icons.Lock className="w-12 h-12 sm:w-16 sm:h-16 text-white/50 relative z-10" />
                      </div>
                    ) : (
                      <FloatingIsometricNode unlocked={isUnlocked} colors={getIslandColors(zone.topic)} duration={4 + (index % 3)} topic={zone.topic} />
                    )}
                  </div>
                </button>
                
                {/* Title & Stars below the Orb */}
                <div className="mt-4 flex flex-col items-center relative z-20">
                  <h3 className="font-bold text-center text-white text-base sm:text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2 leading-tight">
                    {zone.name[language]}
                  </h3>
                  
                  {isUnlocked ? (
                    <div className="flex justify-center gap-1 mt-1">
                      {[1, 2, 3].map(star => (
                        <Icons.Star 
                          key={star} 
                          className={cn(
                            "w-4 h-4 sm:w-5 sm:h-5 transition-all",
                            star <= stars ? "fill-yellow-400 text-yellow-300 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] scale-110" : "fill-white/10 text-white/20"
                          )} 
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] sm:text-xs text-center text-red-400 font-bold mt-1 drop-shadow-md bg-black/40 px-3 py-1 rounded-full border border-red-500/30">
                      {t.map.locked} {zone.requiredLevel}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Starred Kingdoms Section */}
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl mb-4 text-center mt-8">
        <h2 className="text-2xl font-black text-amber-300 uppercase tracking-widest drop-shadow-md flex items-center justify-center gap-2">
          <Icons.Star className="w-6 h-6 fill-amber-300" />
          {language === 'en' ? 'Starred Kingdoms' : '星辰王國'}
          <Icons.Star className="w-6 h-6 fill-amber-300" />
        </h2>
        <p className="text-sm text-amber-200/70 mb-8">{language === 'en' ? 'Complete challenges for coins & gems!' : '完成挑戰獲得金幣與寶石！'}</p>
      </div>

      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl relative mb-16">
        {/* Background path line */}
        <div className="absolute top-16 bottom-16 left-0 right-0 z-0 opacity-40">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <path 
              d={`M 25,12.5 L 75,50 L 25,87.5`} 
              fill="none" 
              stroke="rgba(245, 158, 11, 0.3)" 
              strokeWidth="4" 
              vectorEffect="non-scaling-stroke" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeDasharray="8 8"
            />
          </svg>
        </div>
        
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
                "relative z-10 flex w-full my-6 sm:my-8",
                isEven 
                  ? "justify-start pl-6 sm:pl-12 md:pl-20 lg:pl-36 pr-12" 
                  : "justify-end pr-6 sm:pr-12 md:pr-20 lg:pr-36 pl-12"
              )}
            >
              <div className="relative flex flex-col items-center w-44 sm:w-56 max-w-full overflow-visible">
                {/* Connector dot */}
                <div className="absolute top-[40%] left-1/2 w-8 h-8 bg-slate-900 border-4 border-amber-500/50 rounded-full -translate-x-1/2 -translate-y-1/2 z-0 shadow-lg shadow-amber-500/20" />
                
                <button
                  onClick={() => {
                    if (isUnlocked) {
                      audioEngine.play('click');
                      onSelectZone(zone.id);
                    }
                  }}
                  disabled={!isUnlocked}
                  className={cn(
                    "relative group transition-all duration-500 ease-out outline-none mt-4",
                    isUnlocked ? "cursor-pointer hover:scale-110 active:scale-95 hover:-translate-y-2" : "cursor-not-allowed opacity-80"
                  )}
                >
                  {/* Glowing halo behind */}
                  {isUnlocked && (
                    <motion.div
                      className="absolute -inset-8 bg-amber-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}
                  
                  <div className="w-36 h-36 sm:w-48 sm:h-48 mx-auto relative z-10 flex items-center justify-center overflow-visible">
                    {isLockedByLevel ? (
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-slate-900/80 border-4 border-slate-700 flex items-center justify-center backdrop-blur-sm shadow-xl" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                        <Icons.Lock className="w-12 h-12 sm:w-16 sm:h-16 text-white/50 relative z-10" />
                      </div>
                    ) : zone.id === 'kingdom_1' ? (
                      <KingdomNumberSenseNode unlocked={isUnlocked} />
                    ) : zone.id === 'kingdom_2' ? (
                      <KingdomLogicAlgebraNode unlocked={isUnlocked} />
                    ) : (
                      <KingdomGeometryMotionNode unlocked={isUnlocked} />
                    )}
                  </div>
                </button>
                
                {/* Title & Stars below */}
                <div className="mt-6 flex flex-col items-center relative z-20">
                  <h3 className="font-bold text-center text-amber-200 text-lg sm:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2 leading-tight flex items-center justify-center gap-1">
                    <Icons.Crown className="w-4 h-4 fill-amber-300 hidden sm:block text-amber-300" />
                    {zone.name[language]}
                    <Icons.Crown className="w-4 h-4 fill-amber-300 hidden sm:block text-amber-300" />
                  </h3>
                  
                  {isUnlocked ? (
                    <div className="flex justify-center gap-1.5 mt-2">
                      {[1, 2, 3].map(star => (
                        <Icons.Star 
                          key={star} 
                          className={cn(
                            "w-5 h-5 sm:w-6 sm:h-6 transition-all",
                            star <= stars ? "fill-amber-400 text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)] scale-110" : "fill-white/10 text-white/20"
                          )} 
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] sm:text-xs text-center text-amber-500/80 font-bold mt-1 drop-shadow-md bg-black/40 px-3 py-1 rounded-full border border-amber-900/50">
                      {t.map.locked} {zone.requiredLevel}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Infernal Gateways (Hell Stages) Section */}
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl mb-4 text-center mt-12">
        <h2 className="text-2xl font-black text-rose-500 uppercase tracking-widest drop-shadow-md flex items-center justify-center gap-2 animate-pulse">
          <Icons.Flame className="w-6 h-6 fill-rose-500 animate-bounce text-rose-500" />
          {language === 'en' ? 'Infernal Gateways' : '深淵地獄'}
          <Icons.Skull className="w-6 h-6 fill-rose-500 text-rose-500" />
        </h2>
        <p className="text-sm text-rose-300/80 mb-8">
          {language === 'en' ? 'NO MULTIPLE CHOICE • FAIL & LOSE ALL • 1,000 COINS!' : '無單選題 • 失敗即淘汰 • 獎勵 1000 金幣！'}
        </p>
      </div>

      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl relative mb-16">
        {/* Background path line */}
        <div className="absolute top-16 bottom-16 left-0 right-0 z-0 opacity-40">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <path 
              d={`M 50,0 L 50,100`} 
              fill="none" 
              stroke="rgba(225, 29, 72, 0.3)" 
              strokeWidth="4" 
              vectorEffect="non-scaling-stroke" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeDasharray="8 8"
            />
          </svg>
        </div>
        
        {hellZones.map((zone, index) => {
          const isLockedByLevel = level < zone.requiredLevel;
          const isUnlocked = unlockedZones.includes(zone.id) || !isLockedByLevel;
          const IconComponent = (Icons as any)[zone.icon] || Icons.Flame;
          
          const stars = completedLevels[zone.id] || 0;

          return (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 flex w-full my-6 sm:my-8 justify-center"
            >
              <div className="relative flex flex-col items-center w-56 sm:w-72 max-w-full overflow-visible">
                {/* Connector dot */}
                <div className="absolute top-[40%] left-1/2 w-8 h-8 bg-slate-950 border-4 border-rose-600/50 rounded-full -translate-x-1/2 -translate-y-1/2 z-0 shadow-lg shadow-rose-600/20" />
                
                <button
                  onClick={() => {
                    if (isUnlocked) {
                      audioEngine.play('click');
                      onSelectZone(zone.id);
                    }
                  }}
                  disabled={!isUnlocked}
                  className={cn(
                    "relative group transition-all duration-500 ease-out outline-none mt-4",
                    isUnlocked ? "cursor-pointer hover:scale-110 active:scale-95" : "cursor-not-allowed opacity-80 grayscale"
                  )}
                >
                  {/* Fire aura */}
                  {isUnlocked && (
                    <motion.div
                      className="absolute -inset-10 bg-rose-600/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                    />
                  )}
                  
                  <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto relative z-10 flex items-center justify-center overflow-visible">
                    {isLockedByLevel ? (
                      <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-slate-950/80 border-4 border-rose-900 flex items-center justify-center backdrop-blur-sm shadow-[0_0_20px_rgba(225,29,72,0.2)]">
                        <Icons.Lock className="w-14 h-14 sm:w-20 sm:h-20 text-white/50 relative z-10" />
                      </div>
                    ) : (
                      <HellNode unlocked={isUnlocked} />
                    )}
                  </div>
                </button>
                
                {/* Title & Stars */}
                <div className="mt-6 flex flex-col items-center relative z-20">
                  <h3 className="font-black text-center text-rose-200 text-lg sm:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2 leading-tight uppercase tracking-wider">
                    {zone.name[language]}
                  </h3>
                  
                  {isUnlocked ? (
                    <div className="flex justify-center gap-1.5 mt-2">
                      {[1, 2, 3].map(star => (
                        <Icons.Star 
                          key={star} 
                          className={cn(
                            "w-5 h-5 sm:w-6 sm:h-6 transition-all",
                            star <= stars ? "fill-rose-500 text-rose-400 drop-shadow-[0_0_12px_rgba(225,29,72,0.8)] scale-110" : "fill-white/5 text-white/10"
                          )} 
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] sm:text-xs text-center text-rose-500/80 font-bold mt-1 drop-shadow-md bg-black/40 px-3 py-1 rounded-full border border-rose-900/50">
                      {t.map.locked} {zone.requiredLevel}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Eye-catching Side Quest Notification */}
      <AnimatePresence>
        {questActive && !showQuestModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 100 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0,
              y: [0, -6, 0]
            }}
            exit={{ opacity: 0, scale: 0.5, x: 100 }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              default: {
                type: 'spring',
                stiffness: 260,
                damping: 22
              }
            }}
            className="fixed bottom-24 right-4 md:right-8 z-50 cursor-pointer pointer-events-auto flex items-center select-none"
            onClick={() => {
              audioEngine.play('nav');
              setShowQuestModal(true);
            }}
          >
            {/* Playful Game-Style Speech Bubble (Bounces gently on its own) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 15 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                x: 0,
                y: [0, -3, 0]
              }}
              transition={{
                y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                default: { type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }
              }}
              className="relative bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 p-[2.5px] rounded-2xl shadow-[0_8px_20px_rgba(236,72,153,0.3)] hover:shadow-[0_12px_25px_rgba(236,72,153,0.45)] transition-all duration-300 mr-2.5 max-w-[170px]"
            >
              <div className="bg-slate-950 text-white rounded-[13px] px-3 py-1.5 font-black flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-amber-300 tracking-wider uppercase font-black flex items-center gap-1 animate-pulse">
                  ✨ {language === 'en' ? "Magic Quest!" : "神秘任務！"} ✨
                </span>
                <span className="text-[9px] text-slate-300 font-bold mt-0.5 whitespace-nowrap">
                  {language === 'en' ? "Tap me for " : "點擊賺取 "}<span className="text-yellow-400 font-black text-xs inline-flex items-center gap-0.5">67 🪙</span>!
                </span>
              </div>
              {/* Tail pointing right */}
              <div className="absolute right-[-7px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-purple-600 z-0" />
              <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[7px] border-l-slate-950 z-10" />
            </motion.div>

            {/* Glowing circular container wrapping the animated flying chest */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-transparent group">
              
              {/* Circular Cooldown Arc (Spell circle ring) */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90 overflow-visible pointer-events-none">
                <circle
                  cx="50%"
                  cy="50%"
                  r={32}
                  fill="transparent"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth={3}
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r={32}
                  fill="transparent"
                  stroke="url(#questRingGrad)"
                  strokeWidth={3.5}
                  strokeDasharray={201}
                  strokeDashoffset={201 - (questTimeLeft / 15) * 201}
                  strokeLinecap="round"
                  animate={{ strokeDashoffset: 201 - (questTimeLeft / 15) * 201 }}
                  transition={{ duration: 1, ease: 'linear' }}
                />
                <defs>
                  <linearGradient id="questRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Bouncing flying chest mascot */}
              <div className="relative z-10 transform group-hover:scale-110 group-active:scale-95 transition-all duration-300">
                <MagicalFlyingChest />
              </div>

              {/* Little close candy balloon button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  audioEngine.play('click');
                  setQuestActive(false);
                }}
                className="absolute top-0 right-0 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center border-2 border-slate-950 shadow-md cursor-pointer transform hover:scale-110 active:scale-90 transition-all z-20"
                aria-label="Dismiss quest"
              >
                <Icons.X className="w-3.5 h-3.5 stroke-[3]" />
              </button>

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
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                x: isShaking ? [0, -10, 10, -10, 10, 0] : 0
              }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{
                x: { duration: 0.4 },
                default: { type: 'spring', damping: 22, stiffness: 300 }
              }}
              className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 border-4 border-yellow-400 rounded-[36px] p-7 shadow-[0_0_40px_rgba(245,158,11,0.4)] overflow-visible z-10"
            >
              {/* Decorative magic stars floating in corners */}
              <Icons.Sparkles className="absolute -top-3 -left-3 w-8 h-8 fill-yellow-400 text-yellow-300 animate-pulse" />
              <Icons.Sparkles className="absolute -bottom-3 -right-3 w-8 h-8 fill-purple-400 text-purple-300 animate-pulse" style={{ animationDelay: '1s' }} />

              <div className="absolute -top-16 -left-16 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

              {/* Ribbon Banner Header */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500 text-slate-950 font-black text-xs px-6 py-1.5 rounded-full uppercase tracking-wider shadow-lg border-2 border-yellow-300 flex items-center gap-1.5 whitespace-nowrap z-30 select-none">
                <Icons.Sparkles className="w-3.5 h-3.5 fill-slate-950 text-slate-950 animate-spin" style={{ animationDuration: '3s' }} />
                {language === 'en' ? "Sishu's Riddle Challenge" : "喜樹的神秘謎題"}
                <Icons.Sparkles className="w-3.5 h-3.5 fill-slate-950 text-slate-950 animate-spin" style={{ animationDuration: '3s' }} />
              </div>

              {questStatus !== 'correct' && (
                <button
                  onClick={() => {
                    audioEngine.play('click');
                    setShowQuestModal(false);
                    setQuestActive(false);
                  }}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer z-20"
                >
                  <Icons.X className="w-5 h-5" />
                </button>
              )}

              <div className="text-center mt-3 mb-5 select-none relative">
                <MagicalUnfoldedScroll />
                <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 tracking-wide mt-2">
                  {language === 'en' ? "The Secret Scroll Riddle" : "捲軸中的神秘字謎"}
                </h3>
              </div>

              <div className="bg-amber-50/10 border-2 border-amber-400/30 rounded-2xl p-5 mb-5 text-center shadow-inner relative">
                <div className="absolute top-0 left-4 -translate-y-1/2 bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {language === 'en' ? "Read carefully..." : "仔細閱讀..."}
                </div>
                <p className="text-lg font-extrabold text-amber-100 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
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
                      placeholder={language === 'en' ? "Type your magic answer..." : "請輸入你的神奇答案..."}
                      className={cn(
                        "w-full px-5 py-4 bg-slate-950 border-3 rounded-2xl text-center text-xl font-black text-white focus:outline-none transition-all duration-300 shadow-[0_4px_10px_rgba(0,0,0,0.3)]",
                        questStatus === 'wrong' 
                          ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] focus:border-red-400" 
                          : "border-slate-800 focus:border-amber-400 focus:shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                      )}
                      autoFocus
                    />
                  </div>

                  {questStatus === 'wrong' && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-400 font-black text-center flex items-center justify-center gap-1.5 bg-red-950/40 py-1.5 rounded-xl border border-red-500/20"
                    >
                      <Icons.AlertCircle className="w-4 h-4 text-red-400" />
                      {language === 'en' ? "Wrong answer! Try again, adventurer!" : "密語不正確！勇者請再試一次！"}
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
                      className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold rounded-2xl border-b-4 border-slate-950 active:border-b-0 active:translate-y-[4px] active:scale-95 transition-all cursor-pointer text-center text-sm"
                    >
                      {language === 'en' ? "Give Up" : "放棄"}
                    </button>
                    <button
                      type="submit"
                      disabled={!userAnswer.trim()}
                      className={cn(
                        "flex-1 py-4 font-black text-base rounded-2xl active:scale-95 transition-all cursor-pointer text-center shadow-lg border-b-4",
                        userAnswer.trim() 
                          ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 text-slate-950 border-orange-600 hover:brightness-110 active:border-b-0 active:translate-y-[4px] active:scale-95" 
                          : "bg-slate-800 text-slate-500 border-slate-900 cursor-not-allowed"
                      )}
                    >
                      {language === 'en' ? "Cast Spell" : "施放魔咒"}
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 flex flex-col items-center relative overflow-visible"
                >
                  {/* Playful Floating Coins Shower */}
                  {Array.from({ length: 14 }).map((_, idx) => {
                    const coinX = (Math.sin(idx * 45) * 120) + (Math.cos(idx * 15) * 20);
                    const coinY = (Math.cos(idx * 45) * 80) - 100;
                    return (
                      <motion.div
                        key={`coin-${idx}`}
                        initial={{ opacity: 0, x: 0, y: 50, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 1, 0],
                          x: coinX,
                          y: coinY,
                          scale: [0.4, 1.2, 1, 0.5],
                          rotate: [0, 360 * 2]
                        }}
                        transition={{
                          duration: 1.8,
                          delay: idx * 0.12,
                          ease: "easeOut",
                          repeat: Infinity,
                          repeatDelay: 0.6
                        }}
                        className="absolute pointer-events-none z-30"
                      >
                        <Icons.Coins className="w-7 h-7 fill-yellow-400 text-yellow-600 drop-shadow-[0_4px_8px_rgba(234,179,8,0.5)]" />
                      </motion.div>
                    );
                  })}

                  {/* Magical Stars Burst */}
                  {Array.from({ length: 16 }).map((_, idx) => {
                    const starX = (Math.cos(idx * 30) * 150) + (Math.sin(idx * 10) * 30);
                    const starY = (Math.sin(idx * 30) * 110) - 110;
                    const colors = ['text-pink-400', 'text-yellow-300', 'text-cyan-300', 'text-purple-400', 'text-amber-400'];
                    return (
                      <motion.div
                        key={`star-${idx}`}
                        initial={{ opacity: 0, x: 0, y: 50, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          x: starX,
                          y: starY,
                          scale: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: idx * 0.08,
                          ease: "easeOut",
                          repeat: Infinity,
                          repeatDelay: 0.8
                        }}
                        className={`absolute pointer-events-none z-30 ${colors[idx % 5]}`}
                      >
                        <Icons.Sparkles className="w-5 h-5 fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
                      </motion.div>
                    );
                  })}

                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-4 border-emerald-400 flex items-center justify-center mb-5 animate-bounce shadow-[0_0_20px_rgba(16,185,129,0.4)] relative z-10">
                    <Icons.Check className="w-12 h-12 text-emerald-400 stroke-[3]" />
                  </div>
                  
                  <h4 className="text-3xl font-black text-emerald-400 mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] relative z-10">
                    {language === 'en' ? "CORRECT! 🎉" : "回答正確！🎉"}
                  </h4>
                  <p className="text-sm text-slate-200 mb-5 px-4 font-bold relative z-10">
                    {language === 'en' ? "The magic seal has broken!" : "古老的魔法封印已解除！"}
                  </p>

                  <div className="bg-slate-950/80 border-2 border-emerald-500/30 rounded-2xl p-4 w-full flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.4)] relative z-10">
                    <span className="text-slate-300 text-sm font-black">{language === 'en' ? "CLAIMED:" : "已獲得："}</span>
                    <span className="text-2xl font-black text-yellow-400 flex items-center gap-1.5 drop-shadow-[0_0_12px_rgba(234,179,8,0.5)] animate-pulse">
                      +67 <Icons.Coins className="w-6 h-6 fill-yellow-400 inline" />
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      audioEngine.play('click');
                      setShowQuestModal(false);
                      setQuestActive(false);
                    }}
                    className="mt-6 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base rounded-2xl shadow-lg border-b-4 border-emerald-700 active:border-b-0 active:translate-y-[4px] transition-all cursor-pointer relative z-10"
                  >
                    {language === 'en' ? "Awesome!" : "太棒了！"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
