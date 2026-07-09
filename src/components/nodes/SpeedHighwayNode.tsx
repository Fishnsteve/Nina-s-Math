import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { OrbitingOrbs } from '../ZoneNodes';

export const SpeedHighwayNode = ({ unlocked, colors, duration = 6 }: any) => {
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
          {/* Base Sci-Fi Floating platform (Cyberpunk Slate and Gold/Neon) */}
          <g id="highway-base" transform="translate(100, 500)">
            {/* Dark graphite base slabs */}
            <polygon points="500,350 150,150 500,-50 850,150" fill="#0f172a" opacity="0.95" />
            <polygon points="150,150 500,350 500,480 150,280" fill="#020617" />
            <polygon points="500,350 850,150 850,280 500,480" fill="#0f172a" />
            
            {/* Glowing neon circuitry veins in the floating rock */}
            <polygon points="280,210 490,380 500,410 300,230" fill="#eab308" />
            <polygon points="720,210 510,380 500,410 700,230" fill="#06b6d4" />

            {/* Jet-Black Carbon Asphalt Deck */}
            <polygon points="500,320 180,140 500,-40 820,140" fill="#1e293b" />
            
            {/* Glowing Yellow Center Highway Line (Perspective) */}
            <polygon points="500,320 490,320 500,-40 510,-40" fill="#eab308" opacity="0.8" />
            
            {/* Dashed highway lines animating forward for motion effect */}
            <g opacity="0.9">
              <polygon points="495,200 505,200 503,160 497,160" fill="#ffffff" />
              <polygon points="493,100 507,100 505,70 495,70" fill="#ffffff" />
              <polygon points="490,10 510,10 508,-10 492,-10" fill="#ffffff" />
              <polygon points="496,280 504,280 503,250 497,250" fill="#ffffff" />
            </g>
          </g>

          {/* Elevated Suspended Highway Arches and Flying Car */}
          <g id="highway-structures" transform="translate(100, 80)">
            
            {/* Neon Suspension Arches behind the road */}
            <path d="M 240,420 C 240,150 760,150 760,420" fill="none" stroke="#0891b2" strokeWidth="18" strokeLinecap="round" opacity="0.4" />
            <path d="M 240,420 C 240,150 760,150 760,420" fill="none" stroke="#22d3ee" strokeWidth="6" strokeLinecap="round" />
            
            {/* Vertical suspension cables */}
            <line x1="320" y1="310" x2="320" y2="420" stroke="#0891b2" strokeWidth="3" opacity="0.5" />
            <line x1="410" y1="240" x2="410" y2="420" stroke="#0891b2" strokeWidth="3" opacity="0.5" />
            <line x1="500" y1="210" x2="500" y2="420" stroke="#0891b2" strokeWidth="3" opacity="0.5" />
            <line x1="590" y1="240" x2="590" y2="420" stroke="#0891b2" strokeWidth="3" opacity="0.5" />
            <line x1="680" y1="310" x2="680" y2="420" stroke="#0891b2" strokeWidth="3" opacity="0.5" />

            {/* Glowing speed vector markers on the side of the road */}
            <g id="speed-vectors">
              {/* Left arrow light */}
              <polygon points="260,390 290,405 260,420" fill="#eab308" />
              {/* Right arrow light */}
              <polygon points="740,390 710,405 740,420" fill="#06b6d4" />
            </g>

            {/* High-Tech Futuristic Flying Hovercar */}
            {/* Bobbing and slight vibration to represent speed thrust */}
            <g id="flying-racecar" transform="translate(300, 150)">
              <animateTransform 
                attributeName="transform" 
                type="translate" 
                values="300, 150; 300, 140; 305, 147; 300, 150" 
                dur="1.2s" 
                repeatCount="indefinite" 
              />
              
              {/* Rear thruster engine (Glowing cyan cone and fire particles) */}
              <polygon points="50,155 10,135 10,175" fill="#38bdf8" />
              <polygon points="30,155 -15,145 -15,165" fill="#ffffff" />
              {/* Animated fiery jet exhaust streams */}
              <path d="M 0,155 L -100,140 Q -150,155 -200,155 Q -150,165 -100,170 Z" fill="#f43f5e" opacity="0.8">
                <animate attributeName="d" 
                  values="M 0,155 L -100,140 Q -150,155 -200,155 Q -150,165 -100,170 Z; M 0,155 L -110,130 Q -170,155 -240,155 Q -170,180 -110,180 Z; M 0,155 L -100,140 Q -150,155 -200,155 Q -150,165 -100,170 Z" 
                  dur="0.4s" repeatCount="indefinite" />
              </path>
              <path d="M 10,155 L -60,148 Q -100,155 -130,155 Q -100,162 -60,162 Z" fill="#facc15" />

              {/* Sleek Aerodynamic Car Chassis */}
              <path d="M 50,130 L 220,100 Q 300,100 350,155 L 320,185 Q 260,195 180,185 L 50,170 Z" fill="#0f172a" />
              {/* Golden side panel highlights */}
              <path d="M 100,140 L 210,120 Q 260,120 290,155 L 260,175 Q 200,180 150,175 Z" fill="#eab308" />
              {/* Main cockpit windshield (Glowing Cyan glass) */}
              <path d="M 200,115 L 260,110 Q 300,110 310,140 L 250,145 Z" fill="#22d3ee" opacity="0.8" />
              <path d="M 210,120 L 250,116 Q 280,116 290,135 L 245,138 Z" fill="#fafafa" opacity="0.6" />

              {/* Rear Spoiler/Wing */}
              <polygon points="50,130 30,100 70,100 90,130" fill="#020617" />
              <polygon points="30,100 70,100 130,80 90,80" fill="#eab308" />

              {/* Dynamic Jet Headlights emitting light forward */}
              <polygon points="350,155 580,130 550,220" fill="#eab308" opacity="0.25" />
              <circle cx="340" cy="155" r="10" fill="#fef08a" />
            </g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
