import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import * as Icons from 'lucide-react';

export const OrbitingOrbs = ({ color, duration = 8 }: { color: string, duration?: number }) => {
  return (
    <>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-0 flex items-start justify-center"
      >
        <div className={cn("w-3 h-3 sm:w-4 sm:h-4 rounded-full blur-[1px] shadow-[0_0_10px_currentColor]", color)} />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: duration * 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 z-0 flex items-end justify-end"
      >
        <div className={cn("w-2 h-2 sm:w-3 sm:h-3 rounded-full blur-[1px] shadow-[0_0_8px_currentColor]", color)} />
      </motion.div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: duration * 1.8, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-4 z-0 flex items-center justify-start"
      >
        <div className={cn("w-4 h-4 sm:w-5 sm:h-5 rounded-full blur-[2px] opacity-60 shadow-[0_0_12px_currentColor]", color)} />
      </motion.div>
    </>
  )
}

export const TutorialNode = ({ unlocked }: { unlocked: boolean }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {unlocked && <OrbitingOrbs color="bg-cyan-300 text-cyan-300" />}
      <motion.div 
        animate={unlocked ? { y: [-6, 6, -6] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-full h-full"
      >
        <svg viewBox="0 0 100 100" className={cn("w-full h-full transition-all duration-700", unlocked ? "drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]" : "grayscale opacity-50")}>
          <defs>
            <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cffafe" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#164e63" />
            </linearGradient>
            <linearGradient id="crystalLight" x1="0%" y1="0%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="50,5 85,35 50,95 15,35" fill="url(#crystalGrad)" stroke="#a5f3fc" strokeWidth="2" strokeOpacity="0.8" strokeLinejoin="round" />
          <polygon points="50,5 50,95 15,35" fill="url(#crystalLight)" />
          <polygon points="50,5 85,35 50,45 15,35" fill="white" fillOpacity="0.4" />
          {/* Inner details */}
          <polygon points="50,15 75,35 50,80 25,35" fill="transparent" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="50" y1="45" x2="50" y2="95" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
        </svg>
      </motion.div>
    </div>
  )
}

export const KingdomNode = ({ unlocked }: { unlocked: boolean }) => {
  return (
    <div className="relative w-full h-full flex items-end justify-center p-2 pt-6">
      {unlocked && <OrbitingOrbs color="bg-amber-300 text-amber-300" duration={10} />}
      <motion.div 
        animate={unlocked ? { y: [-2, 2, -2] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-[90%] h-[90%]"
      >
        <svg viewBox="0 0 100 100" className={cn("w-full h-full transition-all duration-700", unlocked ? "drop-shadow-[0_10px_25px_rgba(251,191,36,0.6)]" : "grayscale opacity-50")}>
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
            <linearGradient id="goldDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#713f12" />
            </linearGradient>
            <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
          </defs>
          
          {/* Base Platform */}
          <ellipse cx="50" cy="95" rx="45" ry="10" fill="#422006" opacity="0.6" />
          
          {/* Main Building */}
          <rect x="25" y="45" width="50" height="50" fill="url(#goldGrad)" rx="2" stroke="#713f12" strokeWidth="1" />
          <rect x="25" y="45" width="25" height="50" fill="white" fillOpacity="0.15" />
          
          {/* Left Tower */}
          <rect x="12" y="30" width="22" height="65" fill="url(#goldDark)" rx="2" stroke="#422006" strokeWidth="1" />
          <polygon points="8,30 23,5 38,30" fill="url(#roofGrad)" stroke="#7f1d1d" strokeWidth="1" strokeLinejoin="round" />
          
          {/* Right Tower */}
          <rect x="66" y="30" width="22" height="65" fill="url(#goldDark)" rx="2" stroke="#422006" strokeWidth="1" />
          <polygon points="62,30 77,5 92,30" fill="url(#roofGrad)" stroke="#7f1d1d" strokeWidth="1" strokeLinejoin="round" />
          
          {/* Center Dome/Tower */}
          <rect x="35" y="20" width="30" height="25" fill="url(#goldGrad)" stroke="#713f12" strokeWidth="1" />
          <polygon points="30,20 50,0 70,20" fill="url(#roofGrad)" stroke="#7f1d1d" strokeWidth="1" strokeLinejoin="round" />
          
          {/* Door */}
          <path d="M 40 95 L 40 70 A 10 10 0 0 1 60 70 L 60 95 Z" fill="#2dd4bf" stroke="#0f766e" strokeWidth="2" />
          <line x1="50" y1="70" x2="50" y2="95" stroke="#0f766e" strokeWidth="1" />
          
          {/* Windows */}
          <rect x="18" y="50" width="10" height="18" fill="#fef08a" rx="5" />
          <rect x="72" y="50" width="10" height="18" fill="#fef08a" rx="5" />
          <circle cx="50" cy="35" r="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          
          {/* Flags */}
          <polygon points="23,5 23,-5 35,0" fill="#3b82f6" />
          <polygon points="77,5 77,-5 89,0" fill="#3b82f6" />
          <polygon points="50,0 50,-10 65,-5" fill="#f59e0b" />
        </svg>
      </motion.div>
    </div>
  )
}

export const HellNode = ({ unlocked }: { unlocked: boolean }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
      {unlocked && (
        <>
          <OrbitingOrbs color="bg-rose-500 text-rose-500" duration={6} />
          {/* Floating Embers */}
          <motion.div
            animate={{ y: [20, -80], opacity: [0, 1, 0], x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "linear" }}
            className="absolute left-1/4 w-3 h-3 bg-rose-400 rounded-full blur-[2px]"
          />
          <motion.div
            animate={{ y: [10, -60], opacity: [0, 1, 0], x: [0, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1.2, ease: "linear" }}
            className="absolute right-1/3 w-2 h-2 bg-yellow-400 rounded-full blur-[1px]"
          />
        </>
      )}
      <motion.div 
        animate={unlocked ? { y: [-3, 3, -3], rotate: [-1, 1, -1] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-full h-full"
      >
        <svg viewBox="0 0 100 100" className={cn("w-full h-full transition-all duration-700", unlocked ? "drop-shadow-[0_0_30px_rgba(225,29,72,0.8)]" : "grayscale opacity-50")}>
          <defs>
            <linearGradient id="lavaGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#4c0519" />
              <stop offset="40%" stopColor="#be123c" />
              <stop offset="80%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="rockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#52525b" />
              <stop offset="50%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
          </defs>
          
          {/* Base Rock shadow */}
          <ellipse cx="50" cy="90" rx="45" ry="15" fill="#000" opacity="0.8" />
          
          {/* Base Rock Structure */}
          <path d="M 5 85 Q 50 105 95 85 L 85 45 Q 50 40 15 45 Z" fill="url(#rockGrad)" stroke="#3f3f46" strokeWidth="1" strokeLinejoin="round" />
          
          {/* Gateway Portal */}
          <path d="M 25 80 L 25 35 C 25 10 75 10 75 35 L 75 80 Z" fill="#000" stroke="#be123c" strokeWidth="3" />
          
          {/* Portal Swirl (Inner) */}
          {unlocked && (
            <g>
              <ellipse cx="50" cy="50" rx="20" ry="25" fill="url(#lavaGrad)" opacity="0.9">
                <animate attributeName="ry" values="22;28;22" dur="2s" repeatCount="indefinite" />
                <animate attributeName="rx" values="18;22;18" dur="2.3s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="50" cy="50" rx="10" ry="15" fill="#fde047" opacity="0.8">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />
                <animate attributeName="ry" values="12;18;12" dur="1.5s" repeatCount="indefinite" />
              </ellipse>
              
              {/* Eye in the portal */}
              <path d="M 40 50 Q 50 45 60 50 Q 50 55 40 50 Z" fill="#000">
                <animate attributeName="d" values="M 40 50 Q 50 45 60 50 Q 50 55 40 50 Z;M 40 50 Q 50 48 60 50 Q 50 52 40 50 Z;M 40 50 Q 50 45 60 50 Q 50 55 40 50 Z" dur="4s" repeatCount="indefinite" />
              </path>
              <circle cx="50" cy="50" r="3" fill="#ef4444" />
            </g>
          )}

          {/* Front Rocks & Spikes */}
          <path d="M 10 90 L 30 75 L 40 95 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
          <path d="M 90 90 L 70 75 L 60 95 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
          
          {/* Huge Horns / Spikes */}
          <polygon points="12,50 2,-5 28,35" fill="url(#rockGrad)" stroke="#52525b" strokeWidth="1" strokeLinejoin="round" />
          <polygon points="88,50 98,-5 72,35" fill="url(#rockGrad)" stroke="#52525b" strokeWidth="1" strokeLinejoin="round" />
          <polygon points="32,25 22,-15 45,15" fill="url(#rockGrad)" stroke="#52525b" strokeWidth="1" strokeLinejoin="round" />
          <polygon points="68,25 78,-15 55,15" fill="url(#rockGrad)" stroke="#52525b" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  )
}
