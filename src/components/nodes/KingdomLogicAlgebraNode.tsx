import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { OrbitingOrbs } from '../ZoneNodes';

export const KingdomLogicAlgebraNode = ({ unlocked, duration = 6 }: { unlocked: boolean; duration?: number }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
      {unlocked && <OrbitingOrbs color="bg-orange-400 text-orange-400" duration={duration * 2} />}
      <motion.div 
        animate={unlocked ? { y: [-6, 6, -6] } : {}}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <svg 
          viewBox="-50 -50 1200 1000" 
          className={cn(
            "w-[220%] h-[220%] max-w-none transition-all duration-700", 
            unlocked ? "drop-shadow-[0_15px_35px_rgba(249,115,22,0.5)]" : "grayscale opacity-50"
          )}
        >
          {/* Base Floating Island Foundation */}
          <g id="island-base" transform="translate(100, 500)">
            {/* Bronze mechanical plated base */}
            <polygon points="500,350 150,150 500,-50 850,150" fill="#292524" opacity="0.9" />
            <polygon points="150,150 500,350 500,480 150,280" fill="#1c1917" />
            <polygon points="500,350 850,150 850,280 500,480" fill="#44403c" />
            
            {/* Glowing flame/energy leaks */}
            <polygon points="300,220 440,380 500,480 340,290" fill="#ea580c" opacity="0.7" />
            <polygon points="700,220 560,380 500,480 660,290" fill="#f97316" opacity="0.7" />

            {/* Brass-plated metallic surface */}
            <polygon points="500,320 180,140 500,-40 820,140" fill="#78716c" />
            <polygon points="180,140 500,320 500,335 180,155" fill="#57534e" />
            <polygon points="500,320 820,140 820,155 500,335" fill="#44403c" />
          </g>

          {/* Steampunk Scale and Balance Temple */}
          <g id="steampunk-temple" transform="translate(100, 100)">
            
            {/* Mechanical Balance Scale Towering in Background */}
            <g id="giant-scale" transform="translate(500, 180)">
              {/* Vertical Pillar */}
              <rect x="-15" y="-140" width="30" height="300" fill="#a8a29e" />
              <rect x="-5" y="-140" width="10" height="300" fill="#e7e5e4" />
              
              {/* Fulcrum hinge */}
              <circle cx="0" cy="-100" r="25" fill="#d97706" />
              <circle cx="0" cy="-100" r="10" fill="#78350f" />

              {/* Balance Beam (Horizontal Bar rocking slightly) */}
              <g id="scale-beam">
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  values="-10, 0, -100; 10, 0, -100; -10, 0, -100" 
                  dur="6s" 
                  repeatCount="indefinite" 
                />
                
                {/* Horizontal bar */}
                <rect x="-280" y="-108" width="560" height="16" rx="8" fill="#d97706" />
                <rect x="-280" y="-104" width="560" height="4" fill="#fbbf24" />

                {/* Left Scale Pan hanging */}
                <g transform="translate(-250, -100)">
                  <line x1="0" y1="0" x2="-40" y2="120" stroke="#78350f" strokeWidth="4" />
                  <line x1="0" y1="0" x2="40" y2="120" stroke="#78350f" strokeWidth="4" />
                  <ellipse cx="0" cy="120" rx="60" ry="15" fill="#b45309" />
                  
                  {/* Glowing Weight (Logical X Variable!) */}
                  <g transform="translate(0, 100)">
                    <rect x="-15" y="-30" width="30" height="30" rx="5" fill="#ea580c" />
                    <text x="-9" y="-8" fill="#fff" fontSize="24" fontWeight="bold" fontFamily="monospace">X</text>
                  </g>
                </g>

                {/* Right Scale Pan hanging */}
                <g transform="translate(250, -100)">
                  <line x1="0" y1="0" x2="-40" y2="120" stroke="#78350f" strokeWidth="4" />
                  <line x1="0" y1="0" x2="40" y2="120" stroke="#78350f" strokeWidth="4" />
                  <ellipse cx="0" cy="120" rx="60" ry="15" fill="#b45309" />
                  
                  {/* Glowing Weight (Logical Y Variable or Constant Number) */}
                  <g transform="translate(0, 100)">
                    <rect x="-15" y="-30" width="30" height="30" rx="5" fill="#ca8a04" />
                    <text x="-9" y="-8" fill="#fff" fontSize="24" fontWeight="bold" fontFamily="monospace">=</text>
                  </g>
                </g>
              </g>
            </g>

            {/* Central Temple / Entrance Academy */}
            <g id="academy-portal" transform="translate(325, 220)">
              {/* Pillars and facade */}
              <polygon points="175,0 0,80 350,80" fill="#d97706" />
              <polygon points="175,0 175,80 350,80" fill="#b45309" />
              
              {/* Left Pillar */}
              <rect x="30" y="80" width="40" height="180" fill="#a8a29e" />
              <rect x="20" y="260" width="60" height="15" fill="#78716c" />
              
              {/* Right Pillar */}
              <rect x="280" y="80" width="40" height="180" fill="#78716c" />
              <rect x="270" y="260" width="60" height="15" fill="#57534e" />

              {/* Central logic gate */}
              <rect x="105" y="80" width="140" height="180" fill="#44403c" />
              <path d="M 120,260 L 120,150 C 120,110 230,110 230,150 L 230,260 Z" fill="#ea580c" className="animate-pulse" />

              {/* Glowing orange core inside portal */}
              <circle cx="175" cy="160" r="25" fill="#fbbf24" />
              <text x="162" y="171" fill="#78350f" fontSize="32" fontWeight="black" fontFamily="sans-serif">?</text>
            </g>

            {/* Interactive Spinning Gears */}
            <g id="gears-group" transform="translate(200, 320)">
              <g>
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  from="0" to="360" 
                  dur="5s" 
                  repeatCount="indefinite" 
                />
                <circle cx="0" cy="0" r="40" fill="#ca8a04" />
                <circle cx="0" cy="0" r="10" fill="#292524" />
                {/* Teeth */}
                <rect x="-8" y="-48" width="16" height="16" fill="#ca8a04" />
                <rect x="-8" y="32" width="16" height="16" fill="#ca8a04" />
                <rect x="-48" y="-8" width="16" height="16" fill="#ca8a04" />
                <rect x="32" y="-8" width="16" height="16" fill="#ca8a04" />
              </g>
            </g>
            <g id="gears-group-2" transform="translate(800, 320)">
              <g transform="translate(0, 0)">
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  from="360" to="0" 
                  dur="4s" 
                  repeatCount="indefinite" 
                />
                <circle cx="0" cy="0" r="50" fill="#b45309" />
                <circle cx="0" cy="0" r="15" fill="#292524" />
                {/* Teeth */}
                <rect x="-10" y="-58" width="20" height="20" fill="#b45309" />
                <rect x="-10" y="38" width="20" height="20" fill="#b45309" />
                <rect x="-58" y="-10" width="20" height="20" fill="#b45309" />
                <rect x="38" y="-10" width="20" height="20" fill="#b45309" />
              </g>
            </g>

          </g>
        </svg>
      </motion.div>
    </div>
  );
};
