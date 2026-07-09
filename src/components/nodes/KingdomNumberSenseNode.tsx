import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { OrbitingOrbs } from '../ZoneNodes';

export const KingdomNumberSenseNode = ({ unlocked, duration = 6 }: { unlocked: boolean; duration?: number }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
      {unlocked && <OrbitingOrbs color="bg-cyan-400 text-cyan-400" duration={duration * 2} />}
      <motion.div 
        animate={unlocked ? { y: [-6, 6, -6] } : {}}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <svg 
          viewBox="-50 -50 1200 1000" 
          className={cn(
            "w-[220%] h-[220%] max-w-none transition-all duration-700", 
            unlocked ? "drop-shadow-[0_15px_35px_rgba(34,211,238,0.5)]" : "grayscale opacity-50"
          )}
        >
          {/* Base Floating Island Foundation */}
          <g id="island-base" transform="translate(100, 500)">
            {/* Dark magic under-island */}
            <polygon points="500,350 150,150 500,-50 850,150" fill="#1e1b4b" opacity="0.9" />
            <polygon points="150,150 500,350 500,480 150,280" fill="#0f0728" />
            <polygon points="500,350 850,150 850,280 500,480" fill="#1d104a" />
            
            {/* Glowing crystal shards underneath */}
            <polygon points="280,210 420,410 500,480 340,310" fill="#06b6d4" opacity="0.8" />
            <polygon points="720,210 580,410 500,480 660,310" fill="#22d3ee" opacity="0.9" />
            
            {/* Floating minor rocks near the base */}
            <circle cx="100" cy="300" r="15" fill="#1e1b4b">
              <animate attributeName="cy" values="300;280;300" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="900" cy="220" r="10" fill="#1e1b4b">
              <animate attributeName="cy" values="220;240;220" dur="2.5s" repeatCount="indefinite" />
            </circle>

            {/* Top mystical Grass Surface */}
            <polygon points="500,320 180,140 500,-40 820,140" fill="#0891b2" />
            <polygon points="180,140 500,320 500,335 180,155" fill="#0e7490" />
            <polygon points="500,320 820,140 820,155 500,335" fill="#155e75" />
          </g>

          {/* Magical Number Sense Palace */}
          <g id="castle-palace" transform="translate(100, 100)">
            {/* Background Spire (Tallest Center) */}
            <g id="center-tower" transform="translate(425, 0)">
              {/* Pillar body */}
              <rect x="25" y="120" width="100" height="320" fill="#0e7490" />
              <rect x="125" y="120" width="25" height="320" fill="#155e75" />
              
              {/* Golden Cone Roof */}
              <polygon points="0,120 75,-40 150,120" fill="#fbbf24" />
              <polygon points="75,-40 150,120 75,120" fill="#d97706" />

              {/* Glowing High Windows */}
              <rect x="45" y="160" width="25" height="60" rx="12" fill="#22d3ee" className="animate-pulse" />
              <rect x="80" y="160" width="25" height="60" rx="12" fill="#e0f7fa" />
            </g>

            {/* Left Wing Tower */}
            <g id="left-tower" transform="translate(200, 100)">
              <rect x="0" y="100" width="110" height="240" fill="#06b6d4" />
              <rect x="110" y="100" width="40" height="240" fill="#0891b2" />
              
              {/* Battlements */}
              <path d="M 0,100 L 0,60 L 30,60 L 30,80 L 60,80 L 60,60 L 90,60 L 90,80 L 120,80 L 120,60 L 150,60 L 150,100 Z" fill="#22d3ee" />
              
              {/* Top Spire Tip */}
              <polygon points="35,60 75,-20 115,60" fill="#f59e0b" />
              <polygon points="75,-20 115,60 75,60" fill="#b45309" />
              
              {/* Window */}
              <rect x="40" y="150" width="30" height="50" rx="15" fill="#fef08a" />
            </g>

            {/* Right Wing Tower */}
            <g id="right-tower" transform="translate(650, 100)">
              <rect x="0" y="100" width="110" height="240" fill="#06b6d4" />
              <rect x="110" y="100" width="40" height="240" fill="#0891b2" />
              
              {/* Battlements */}
              <path d="M 0,100 L 0,60 L 30,60 L 30,80 L 60,80 L 60,60 L 90,60 L 90,80 L 120,80 L 120,60 L 150,60 L 150,100 Z" fill="#22d3ee" />
              
              {/* Top Spire Tip */}
              <polygon points="35,60 75,-20 115,60" fill="#f59e0b" />
              <polygon points="75,-20 115,60 75,60" fill="#b45309" />

              {/* Window */}
              <rect x="40" y="150" width="30" height="50" rx="15" fill="#fef08a" />
            </g>

            {/* Front Keep and Arch Portal */}
            <g id="front-portal" transform="translate(350, 180)">
              {/* Palace Wall */}
              <rect x="0" y="120" width="150" height="200" fill="#0891b2" />
              <rect x="150" y="120" width="150" height="200" fill="#0e7490" />
              
              {/* Golden Roof */}
              <polygon points="0,120 150,30 300,120" fill="#fde047" />
              <polygon points="150,30 300,120 150,120" fill="#eab308" />

              {/* Main Glowing Entrance Gate */}
              <path d="M 90,320 C 90,200 210,200 210,320 Z" fill="#22d3ee" stroke="#e0f7fa" strokeWidth="6" className="animate-pulse" />
              <path d="M 150,320 C 150,200 210,200 210,320 Z" fill="#06b6d4" opacity="0.6" />
              
              {/* Mathematical symbols floating out of the gate */}
              <g opacity="0.8">
                <text x="70" y="170" fill="#fbbf24" fontSize="60" fontWeight="900" fontFamily="sans-serif">+</text>
                <text x="210" y="180" fill="#fbbf24" fontSize="60" fontWeight="900" fontFamily="sans-serif">÷</text>
                <text x="135" y="110" fill="#22d3ee" fontSize="70" fontWeight="900" fontFamily="sans-serif">%</text>
              </g>
            </g>

            {/* Floating Crystalline Star over the central spire */}
            <g id="floating-star" transform="translate(500, -80)">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="500, -80; 500, -105; 500, -80"
                dur="3s"
                repeatCount="indefinite"
              />
              <polygon points="0,-40 12,-12 40,0 12,12 0,40 -12,12 -40,0 -12,-12" fill="#fbbf24" />
              <polygon points="0,-20 6,-6 20,0 6,6 0,20 -6,6 -20,0 -6,-6" fill="#fff" />
              <circle cx="0" cy="0" r="4" fill="#fbbf24" />
            </g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
