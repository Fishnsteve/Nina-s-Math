import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { OrbitingOrbs } from '../ZoneNodes';

export const FractionCastleNode = ({ unlocked, colors, duration = 6 }: any) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
      {unlocked && <OrbitingOrbs color={colors.orbColor} duration={duration * 2} />}
      <motion.div 
        animate={unlocked ? { y: [-6, 6, -6] } : {}}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <svg 
          viewBox="-50 -50 1200 1000" 
          className={cn(
            "w-[220%] h-[220%] max-w-none transition-all duration-700", 
            unlocked ? `drop-shadow-[0_15px_30px_${colors.dropShadow}]` : "grayscale opacity-50"
          )}
        >
          {/* Base Floating Island Foundation */}
          <g id="island-base" transform="translate(100, 500)">
            {/* Dirt/Crust bottom layers */}
            <polygon points="500,350 150,150 500,-50 850,150" fill={colors.mountainDark} opacity="0.9" />
            <polygon points="150,150 500,350 500,480 150,280" fill={colors.mountainDark} />
            <polygon points="500,350 850,150 850,280 500,480" fill={colors.mountainMid} />
            
            {/* Crystalline under-shards */}
            <polygon points="300,230 450,420 500,480 350,320" fill={colors.crystalDark} />
            <polygon points="700,230 550,420 500,480 650,320" fill={colors.crystalLight} />
            
            {/* Top Grass/Stone Surface */}
            <polygon points="500,320 180,140 500,-40 820,140" fill={colors.mountainLight} />
            <polygon points="180,140 500,320 500,335 180,155" fill={colors.mountainMid} />
            <polygon points="500,320 820,140 820,155 500,335" fill={colors.mountainDark} />
          </g>

          {/* Castle Structure */}
          <g id="castle-structure" transform="translate(100, 120)">
            
            {/* Left Tower */}
            <g id="left-tower" transform="translate(150, 150)">
              {/* Main Body */}
              <rect x="0" y="100" width="100" height="250" fill={colors.castleLight} />
              <rect x="100" y="100" width="100" height="250" fill={colors.castleDark} />
              
              {/* Battlements / Crenellations */}
              <path d="M 0,100 L 0,60 L 30,60 L 30,80 L 70,80 L 70,60 L 100,60 L 100,100 Z" fill={colors.castleLight} />
              <path d="M 100,100 L 100,60 L 130,60 L 130,80 L 170,80 L 170,60 L 200,60 L 200,100 Z" fill={colors.castleDark} />
              
              {/* Roof Cone of Left Tower Keep (Inner spire) */}
              <polygon points="50,60 100,-40 150,60" fill="#3b82f6" opacity="0.8" />
              <polygon points="100,-40 150,60 100,60" fill="#1d4ed8" opacity="0.9" />

              {/* Glowing Window */}
              <rect x="40" y="150" width="20" height="40" rx="10" fill="#fbbf24" className="animate-pulse" />
              <rect x="140" y="150" width="20" height="40" rx="10" fill="#d97706" />
            </g>

            {/* Right Tower */}
            <g id="right-tower" transform="translate(650, 150)">
              {/* Main Body */}
              <rect x="0" y="100" width="100" height="250" fill={colors.castleLight} />
              <rect x="100" y="100" width="100" height="250" fill={colors.castleDark} />
              
              {/* Battlements / Crenellations */}
              <path d="M 0,100 L 0,60 L 30,60 L 30,80 L 70,80 L 70,60 L 100,60 L 100,100 Z" fill={colors.castleLight} />
              <path d="M 100,100 L 100,60 L 130,60 L 130,80 L 170,80 L 170,60 L 200,60 L 200,100 Z" fill={colors.castleDark} />
              
              {/* Roof Cone of Right Tower Keep (Inner spire) */}
              <polygon points="50,60 100,-40 150,60" fill="#3b82f6" opacity="0.8" />
              <polygon points="100,-40 150,60 100,60" fill="#1d4ed8" opacity="0.9" />

              {/* Glowing Window */}
              <rect x="40" y="150" width="20" height="40" rx="10" fill="#fbbf24" className="animate-pulse" />
              <rect x="140" y="150" width="20" height="40" rx="10" fill="#d97706" />
            </g>

            {/* Center Main Keep */}
            <g id="main-keep" transform="translate(325, 50)">
              {/* Main Wall Base */}
              <rect x="0" y="150" width="175" height="300" fill={colors.castleLight} />
              <rect x="175" y="150" width="175" height="300" fill={colors.castleDark} />

              {/* Tower Roof */}
              <polygon points="0,150 175,-30 350,150" fill="#ef4444" />
              <polygon points="175,-30 350,150 175,150" fill="#b91c1c" />

              {/* Keep Windows */}
              <rect x="60" y="220" width="30" height="50" rx="15" fill="#fbbf24" />
              <rect x="260" y="220" width="30" height="50" rx="15" fill="#d97706" />

              {/* Drawbridge Gate */}
              <path d="M 110,450 C 110,350 240,350 240,450 Z" fill="#4b5563" />
              <path d="M 175,450 C 175,350 240,350 240,450 Z" fill="#1f2937" />
              
              {/* Archway Frame */}
              <path d="M 100,450 C 100,330 250,330 250,450 L 260,450 C 260,320 90,320 90,450 Z" fill="#9ca3af" />
            </g>

            {/* Flag Banners waving */}
            <g id="flags">
              {/* Left Flag */}
              <line x1="250" y1="110" x2="250" y2="20" stroke="#4b5563" strokeWidth="6" />
              <path d="M 250,20 L 320,35 L 250,50 Z" fill="#ef4444">
                <animate transform="translate(0, 0)" attributeName="d" 
                  values="M 250,20 L 320,35 L 250,50 Z; M 250,20 L 310,40 L 250,50 Z; M 250,20 L 320,35 L 250,50 Z" 
                  dur="2s" repeatCount="indefinite" />
              </path>

              {/* Right Flag */}
              <line x1="750" y1="110" x2="750" y2="20" stroke="#4b5563" strokeWidth="6" />
              <path d="M 750,20 L 820,35 L 750,50 Z" fill="#ef4444">
                <animate transform="translate(0, 0)" attributeName="d" 
                  values="M 750,20 L 820,35 L 750,50 Z; M 750,20 L 810,40 L 750,50 Z; M 750,20 L 820,35 L 750,50 Z" 
                  dur="2.2s" repeatCount="indefinite" />
              </path>

              {/* Center Main Flag */}
              <line x1="500" y1="20" x2="500" y2="-50" stroke="#4b5563" strokeWidth="8" />
              <path d="M 500,-50 L 590,-30 L 500,-10 Z" fill="#3b82f6">
                <animate transform="translate(0, 0)" attributeName="d" 
                  values="M 500,-50 L 590,-30 L 500,-10 Z; M 500,-50 L 580,-25 L 500,-10 Z; M 500,-50 L 590,-30 L 500,-10 Z" 
                  dur="1.8s" repeatCount="indefinite" />
              </path>
            </g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
