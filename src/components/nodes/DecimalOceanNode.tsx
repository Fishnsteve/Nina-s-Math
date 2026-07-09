import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { OrbitingOrbs } from '../ZoneNodes';

export const DecimalOceanNode = ({ unlocked, colors, duration = 6 }: any) => {
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
          {/* Base Floating Water Block / Reef */}
          <g id="ocean-base" transform="translate(100, 520)">
            {/* Dark Deep Water Layers */}
            <polygon points="500,350 150,150 500,-50 850,150" fill="#0369a1" opacity="0.9" />
            <polygon points="150,150 500,350 500,470 150,270" fill="#0c4a6e" />
            <polygon points="500,350 850,150 850,470 500,590" fill="#0284c7" />
            
            {/* Shallow Aqua water on top */}
            <polygon points="500,320 180,140 500,-40 820,140" fill="#06b6d4" />
            
            {/* Wave crest decorations */}
            <path d="M 230,160 Q 250,150 270,165 T 310,170 T 350,160" fill="none" stroke="#e0f7fa" strokeWidth="4" opacity="0.6" />
            <path d="M 600,200 Q 620,190 640,205 T 680,210 T 720,200" fill="none" stroke="#e0f7fa" strokeWidth="4" opacity="0.6" />
            <path d="M 400,260 Q 420,250 440,265 T 480,270 T 520,260" fill="none" stroke="#e0f7fa" strokeWidth="4" opacity="0.7" />
          </g>

          {/* Detailed Floating Ship (Vessel) */}
          {/* We animate the entire ship structure with a gentle bobbing/rocking motion */}
          <g id="vessel-structure" transform="translate(100, 100)">
            <animateTransform 
              attributeName="transform" 
              type="translate" 
              values="100, 100; 100, 115; 100, 100" 
              dur="4s" 
              repeatCount="indefinite" 
            />
            <animateTransform 
              attributeName="transform" 
              type="rotate" 
              values="-2, 500, 400; 2, 500, 400; -2, 500, 400" 
              dur="6s" 
              repeatCount="indefinite" 
              additive="sum"
            />
            
            {/* Wooden Ship Hull */}
            {/* Main Deck base */}
            <path d="M 280,380 L 720,380 Q 770,350 800,280 L 820,220 L 740,220 L 260,220 L 180,280 Q 210,350 280,380 Z" fill="#78350f" />
            {/* Hull plating highlighting */}
            <path d="M 280,380 L 720,380 Q 770,350 800,280 L 810,250 L 730,250 L 250,250 L 190,280 Q 220,350 280,380 Z" fill="#451a03" />
            {/* Golden trim along the top edge of hull */}
            <path d="M 260,220 L 740,220 Q 790,220 820,220 L 810,240 L 730,240 L 250,240 L 180,240 Z" fill="#fbbf24" />

            {/* Masts */}
            {/* Left Mast */}
            <rect x="350" y="50" width="16" height="200" fill="#78350f" />
            {/* Center Main Mast (Very tall) */}
            <rect x="500" y="0" width="20" height="250" fill="#78350f" />
            {/* Right Mast */}
            <rect x="650" y="70" width="14" height="180" fill="#78350f" />

            {/* Crossbeams for sails */}
            <rect x="280" y="70" width="150" height="8" fill="#451a03" />
            <rect x="420" y="30" width="180" height="10" fill="#451a03" />
            <rect x="590" y="90" width="130" height="8" fill="#451a03" />

            {/* Fabric Sails (billowing/curved) */}
            {/* Left Sail */}
            <path d="M 290,78 Q 350,110 350,170 Q 290,160 290,78 Z" fill="#f8fafc" opacity="0.9" />
            <path d="M 366,78 Q 420,110 420,170 Q 366,160 366,78 Z" fill="#e2e8f0" opacity="0.95" />

            {/* Main Center Sail */}
            <path d="M 430,40 Q 500,80 500,190 Q 430,180 430,40 Z" fill="#f8fafc" />
            <path d="M 520,40 Q 590,80 590,190 Q 520,180 520,40 Z" fill="#e2e8f0" />
            {/* Red Cross emblem on Main Sail */}
            <path d="M 465,110 L 465,130 L 445,130 L 445,145 L 465,145 L 465,165 L 480,165 L 480,145 L 500,145 L 500,130 L 480,130 L 480,110 Z" fill="#ef4444" />

            {/* Right Sail */}
            <path d="M 600,98 Q 650,120 650,180 Q 600,170 600,98 Z" fill="#f8fafc" opacity="0.9" />
            <path d="M 664,98 Q 710,120 710,180 Q 664,170 664,98 Z" fill="#e2e8f0" opacity="0.95" />

            {/* Anchor dropping down */}
            <g id="anchor-group" transform="translate(720, 240)">
              {/* Anchor chain */}
              <line x1="0" y1="0" x2="30" y2="180" stroke="#64748b" strokeWidth="8" strokeDasharray="15, 10" />
              
              {/* Iron Anchor */}
              <g transform="translate(30, 180)">
                <circle cx="0" cy="0" r="14" fill="none" stroke="#475569" strokeWidth="8" />
                <line x1="0" y1="14" x2="0" y2="80" stroke="#475569" strokeWidth="8" />
                <line x1="-20" y1="35" x2="20" y2="35" stroke="#475569" strokeWidth="8" />
                {/* Curved bottom hooks */}
                <path d="M -45,65 Q 0,110 45,65" fill="none" stroke="#475569" strokeWidth="10" strokeLinecap="round" />
                <polygon points="-45,65 -55,55 -35,55" fill="#475569" />
                <polygon points="45,65 35,55 55,55" fill="#475569" />
              </g>
            </g>

            {/* Captain's Steering Wheel in ship rear */}
            <g id="steering-wheel" transform="translate(260, 190)">
              <circle cx="0" cy="0" r="18" fill="none" stroke="#b45309" strokeWidth="4" />
              <circle cx="0" cy="0" r="5" fill="#78350f" />
              {/* Spokes */}
              <line x1="0" y1="-28" x2="0" y2="28" stroke="#b45309" strokeWidth="3" />
              <line x1="-28" y1="0" x2="28" y2="0" stroke="#b45309" strokeWidth="3" />
              <line x1="-20" y1="-20" x2="20" y2="20" stroke="#b45309" strokeWidth="3" />
              <line x1="-20" y1="20" x2="20" y2="-20" stroke="#b45309" strokeWidth="3" />
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                values="0; 45; -30; 0" 
                dur="8s" 
                repeatCount="indefinite" 
              />
            </g>
          </g>

          {/* Swimming Sea Creatures around the base */}
          <g id="creatures" transform="translate(100, 480)">
            {/* Dolphin jumping */}
            <path d="M 120,50 Q 150,-10 180,50" fill="none" stroke="#0891b2" strokeWidth="12" strokeLinecap="round">
              <animate attributeName="d" 
                values="M 120,50 Q 150,-10 180,50; M 120,60 Q 150,20 180,60; M 120,50 Q 150,-10 180,50" 
                dur="5s" repeatCount="indefinite" />
            </path>
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
