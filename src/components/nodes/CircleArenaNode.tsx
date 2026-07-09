import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { OrbitingOrbs } from '../ZoneNodes';

export const CircleArenaNode = ({ unlocked, colors, duration = 6 }: any) => {
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
          {/* Base Volcanic Floating Island (Obsidian/Lava) */}
          <g id="arena-base" transform="translate(100, 500)">
            {/* Rocky obsidian base */}
            <polygon points="500,350 150,150 500,-50 850,150" fill="#1e1b4b" opacity="0.95" />
            <polygon points="150,150 500,350 500,480 150,280" fill="#0f0c29" />
            <polygon points="500,350 850,150 850,280 500,480" fill="#181435" />
            
            {/* Lava veins inside the island */}
            <polygon points="250,200 480,390 500,420 280,220" fill="#dc2626" />
            <polygon points="750,200 520,390 500,420 720,220" fill="#ea580c" />

            {/* Red Granite Arena Floor */}
            <polygon points="500,320 180,140 500,-40 820,140" fill="#450a0a" />
            
            {/* Mathematical Area Circle Sector Proof Mosaic on the arena ground */}
            <g id="circle-area-mosaic" transform="translate(500, 140)">
              {/* Outer circular perimeter ring */}
              <ellipse cx="0" cy="0" rx="180" ry="90" fill="none" stroke="#dc2626" strokeWidth="8" />
              
              {/* Pie slices showing mathematical segmentation */}
              <ellipse cx="0" cy="0" rx="170" ry="85" fill="#f87171" opacity="0.15" />
              
              {/* Sectors lines */}
              <line x1="0" y1="0" x2="0" y2="85" stroke="#f87171" strokeWidth="3" />
              <line x1="0" y1="0" x2="0" y2="-85" stroke="#f87171" strokeWidth="3" />
              <line x1="0" y1="0" x2="170" y2="0" stroke="#f87171" strokeWidth="3" />
              <line x1="0" y1="0" x2="-170" y2="0" stroke="#f87171" strokeWidth="3" />
              
              {/* Diagonals */}
              <line x1="0" y1="0" x2="120" y2="60" stroke="#f87171" strokeWidth="3" />
              <line x1="0" y1="0" x2="-120" y2="-60" stroke="#f87171" strokeWidth="3" />
              <line x1="0" y1="0" x2="-120" y2="60" stroke="#f87171" strokeWidth="3" />
              <line x1="0" y1="0" x2="120" y2="-60" stroke="#f87171" strokeWidth="3" />

              {/* Central bronze glyph */}
              <ellipse cx="0" cy="0" rx="30" ry="15" fill="#ca8a04" stroke="#eab308" strokeWidth="2" />
            </g>
          </g>

          {/* Colosseum / Arena Wall Structure */}
          <g id="arena-walls" transform="translate(100, 120)">
            
            {/* Circular Coliseum wall sections spanning the back */}
            <path d="M 220,380 C 220,240 780,240 780,380 L 780,430 C 780,290 220,290 220,430 Z" fill="#7f1d1d" />
            
            {/* Stone Brick markings on the wall */}
            <path d="M 280,350 L 320,350 L 320,380 L 280,380 Z" fill="#991b1b" />
            <path d="M 680,350 L 720,350 L 720,380 L 680,380 Z" fill="#991b1b" />
            <path d="M 460,310 L 540,310 L 540,350 L 460,350 Z" fill="#991b1b" opacity="0.8" />

            {/* Ancient Battle Banners waving on the walls */}
            <g id="arena-banners">
              <line x1="280" y1="350" x2="280" y2="220" stroke="#450a0a" strokeWidth="8" />
              <path d="M 280,220 L 350,240 L 280,260 Z" fill="#b91c1c" />
              
              <line x1="720" y1="350" x2="720" y2="220" stroke="#450a0a" strokeWidth="8" />
              <path d="M 720,220 L 790,240 L 720,260 Z" fill="#b91c1c" />
            </g>

            {/* Fire Torches / Pillars (Left and Right) */}
            {/* Left Brazier */}
            <g id="brazier-left" transform="translate(180, 280)">
              <rect x="0" y="80" width="40" height="150" fill="#1e1b4b" rx="5" />
              <ellipse cx="20" cy="80" rx="30" ry="15" fill="#ca8a04" />
              <ellipse cx="20" cy="80" rx="20" ry="10" fill="#ef4444" />
              
              {/* Flame (using vector paths with breathing scale/pulse) */}
              <path d="M 0,80 Q 20,-30 40,80 Z" fill="#f97316" className="animate-pulse">
                <animateTransform attributeName="transform" type="scale" values="1,1; 1,1.1; 1,1" dur="1s" repeatCount="indefinite" />
              </path>
              <path d="M 10,80 Q 20,10 30,80 Z" fill="#facc15" className="animate-pulse" />
            </g>

            {/* Right Brazier */}
            <g id="brazier-right" transform="translate(780, 280)">
              <rect x="0" y="80" width="40" height="150" fill="#1e1b4b" rx="5" />
              <ellipse cx="20" cy="80" rx="30" ry="15" fill="#ca8a04" />
              <ellipse cx="20" cy="80" rx="20" ry="10" fill="#ef4444" />
              
              {/* Flame (using vector paths with breathing scale/pulse) */}
              <path d="M 0,80 Q 20,-30 40,80 Z" fill="#f97316" className="animate-pulse">
                <animateTransform attributeName="transform" type="scale" values="1,1; 1,1.1; 1,1" dur="1.2s" repeatCount="indefinite" />
              </path>
              <path d="M 10,80 Q 20,10 30,80 Z" fill="#facc15" className="animate-pulse" />
            </g>

            {/* Crossed Gladiator Swords in the center of the arena */}
            <g id="swords" transform="translate(500, 360)">
              {/* Bronze Shield */}
              <circle cx="0" cy="30" r="45" fill="#d97706" stroke="#ca8a04" strokeWidth="6" />
              <circle cx="0" cy="30" r="30" fill="#92400e" />
              <polygon points="0,5 20,30 0,55 -20,30" fill="#f59e0b" opacity="0.7" />

              {/* Sword 1 (Pointing Down/Left) */}
              <g transform="rotate(45, 0, 30) translate(0, 30)">
                <rect x="-4" y="-80" width="8" height="120" fill="#94a3b8" />
                <rect x="-4" y="-80" width="4" height="120" fill="#cbd5e1" />
                <polygon points="0,-95 -6,-80 6,-80" fill="#cbd5e1" />
                {/* Guard & Hilt */}
                <rect x="-18" y="40" width="36" height="8" rx="2" fill="#ca8a04" />
                <rect x="-4" y="48" width="8" height="25" fill="#78350f" />
                <circle cx="0" cy="73" r="6" fill="#ca8a04" />
              </g>

              {/* Sword 2 (Pointing Down/Right) */}
              <g transform="rotate(-45, 0, 30) translate(0, 30)">
                <rect x="-4" y="-80" width="8" height="120" fill="#94a3b8" />
                <rect x="-4" y="-80" width="4" height="120" fill="#cbd5e1" />
                <polygon points="0,-95 -6,-80 6,-80" fill="#cbd5e1" />
                {/* Guard & Hilt */}
                <rect x="-18" y="40" width="36" height="8" rx="2" fill="#ca8a04" />
                <rect x="-4" y="48" width="8" height="25" fill="#78350f" />
                <circle cx="0" cy="73" r="6" fill="#ca8a04" />
              </g>
            </g>

          </g>
        </svg>
      </motion.div>
    </div>
  );
};
