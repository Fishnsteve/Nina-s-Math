import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { OrbitingOrbs } from '../ZoneNodes';

export const EquationFactoryNode = ({ unlocked, colors, duration = 6 }: any) => {
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
          {/* Base Floating Island Foundation (Metallic / Rock) */}
          <g id="factory-base" transform="translate(100, 520)">
            {/* Dark industrial bottom layers */}
            <polygon points="500,350 150,150 500,-50 850,150" fill="#1e293b" opacity="0.95" />
            <polygon points="150,150 500,350 500,470 150,270" fill="#0f172a" />
            <polygon points="500,350 850,150 850,470 500,590" fill="#1e293b" />
            
            {/* Glowing magma/coolant conduits inside the rock */}
            <polygon points="350,250 480,390 500,430 380,290" fill="#ea580c" />
            <polygon points="650,250 520,390 500,430 620,290" fill="#f97316" />

            {/* Industrial plates top */}
            <polygon points="500,320 180,140 500,-40 820,140" fill="#334155" />
            
            {/* Yellow / Black Hazard Stripes on the platform edge */}
            <polygon points="180,140 250,175 250,190 180,155" fill="#eab308" />
            <polygon points="250,175 320,210 320,225 250,190" fill="#1e293b" />
            <polygon points="320,210 390,245 390,260 320,225" fill="#eab308" />
            <polygon points="390,245 460,280 460,295 390,260" fill="#1e293b" />
            <polygon points="460,280 500,300 500,315 460,295" fill="#eab308" />

            <polygon points="500,300 550,275 550,290 500,315" fill="#1e293b" />
            <polygon points="550,275 620,240 620,255 550,290" fill="#eab308" />
            <polygon points="620,240 690,205 690,220 620,255" fill="#1e293b" />
            <polygon points="690,205 760,170 760,185 690,220" fill="#eab308" />
            <polygon points="760,170 820,140 820,155 760,185" fill="#1e293b" />
          </g>

          {/* Factory Assembly and Machines */}
          <g id="factory-machines" transform="translate(100, 150)">
            
            {/* Main Warehouse block */}
            <g id="warehouse" transform="translate(250, 180)">
              {/* Left Brick Wall */}
              <rect x="0" y="100" width="220" height="240" fill="#b91c1c" />
              {/* Right Brick Wall */}
              <rect x="220" y="100" width="220" height="240" fill="#7f1d1d" />

              {/* Roof sections (Sawtooth profile for industrial look) */}
              <polygon points="0,100 110,30 220,100" fill="#475569" />
              <polygon points="220,100 330,30 440,100" fill="#334155" />
              <polygon points="110,30 220,100 220,100" fill="#1e293b" opacity="0.3" />
              <polygon points="330,30 440,100 440,100" fill="#0f172a" opacity="0.3" />

              {/* Arched Factory Windows with Golden illumination */}
              <rect x="40" y="150" width="45" height="100" rx="22.5" fill="#f59e0b" />
              <rect x="130" y="150" width="45" height="100" rx="22.5" fill="#f59e0b" />
              <rect x="265" y="150" width="45" height="100" rx="22.5" fill="#d97706" />
              <rect x="355" y="150" width="45" height="100" rx="22.5" fill="#d97706" />

              {/* Large steel roller shutter gate */}
              <rect x="180" y="250" width="80" height="90" fill="#94a3b8" />
              {/* Shutter lines */}
              <line x1="180" y1="265" x2="260" y2="265" stroke="#475569" strokeWidth="3" />
              <line x1="180" y1="280" x2="260" y2="280" stroke="#475569" strokeWidth="3" />
              <line x1="180" y1="295" x2="260" y2="295" stroke="#475569" strokeWidth="3" />
              <line x1="180" y1="310" x2="260" y2="310" stroke="#475569" strokeWidth="3" />
              <line x1="180" y1="325" x2="260" y2="325" stroke="#475569" strokeWidth="3" />
            </g>

            {/* Industrial Steam Chimneys / Smokestacks */}
            <g id="chimneys" transform="translate(180, 50)">
              {/* Stack 1 (Tall) */}
              <rect x="0" y="100" width="50" height="250" fill="#475569" />
              <rect x="15" y="90" width="20" height="10" fill="#e11d48" />
              <rect x="0" y="150" width="50" height="15" fill="#eab308" />
              <rect x="0" y="230" width="50" height="15" fill="#eab308" />

              {/* Stack 2 (Short & fat) */}
              <rect x="520" y="160" width="70" height="190" fill="#334155" />
              <rect x="530" y="150" width="50" height="10" fill="#e11d48" />
              <rect x="520" y="220" width="70" height="15" fill="#ef4444" />

              {/* Smoke Puffs (Animations) */}
              <g id="smoke-animation">
                <circle cx="25" cy="40" r="15" fill="#e2e8f0" opacity="0.8">
                  <animate attributeName="cy" values="40;-30;40" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="r" values="15;30;15" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="555" cy="100" r="20" fill="#cbd5e1" opacity="0.6">
                  <animate attributeName="cy" values="100;10;100" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="r" values="20;38;20" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
                </circle>
              </g>
            </g>

            {/* Spinning Golden Gears */}
            <g id="spinning-gears" transform="translate(500, 380)">
              {/* Gear 1 (Big Brass Gear) */}
              <g transform="translate(0, 0)">
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  from="0" to="360" 
                  dur="8s" 
                  repeatCount="indefinite" 
                />
                <circle cx="0" cy="0" r="75" fill="#ca8a04" />
                <circle cx="0" cy="0" r="45" fill="#1e293b" />
                <circle cx="0" cy="0" r="15" fill="#f59e0b" />
                {/* Teeth of Big Gear */}
                <rect x="-15" y="-95" width="30" height="30" rx="5" fill="#ca8a04" />
                <rect x="-15" y="65" width="30" height="30" rx="5" fill="#ca8a04" />
                <rect x="-95" y="-15" width="30" height="30" rx="5" fill="#ca8a04" />
                <rect x="65" y="-15" width="30" height="30" rx="5" fill="#ca8a04" />
                <rect x="-70" y="-70" width="30" height="30" rx="5" fill="#ca8a04" transform="rotate(45)" />
                <rect x="-70" y="-70" width="30" height="30" rx="5" fill="#ca8a04" transform="rotate(-45)" />
                <rect x="-70" y="-70" width="30" height="30" rx="5" fill="#ca8a04" transform="rotate(135)" />
                <rect x="-70" y="-70" width="30" height="30" rx="5" fill="#ca8a04" transform="rotate(-135)" />
              </g>

              {/* Gear 2 (Small copper gear linked) */}
              <g transform="translate(110, -65)">
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  from="360" to="0" 
                  dur="4s" 
                  repeatCount="indefinite" 
                />
                <circle cx="0" cy="0" r="45" fill="#b45309" />
                <circle cx="0" cy="0" r="25" fill="#1e293b" />
                <circle cx="0" cy="0" r="8" fill="#d97706" />
                {/* Teeth of Small Gear */}
                <rect x="-10" y="-55" width="20" height="20" rx="3" fill="#b45309" />
                <rect x="-10" y="35" width="20" height="20" rx="3" fill="#b45309" />
                <rect x="-55" y="-10" width="20" height="20" rx="3" fill="#b45309" />
                <rect x="35" y="-10" width="20" height="20" rx="3" fill="#b45309" />
                <rect x="-40" y="-40" width="20" height="20" rx="3" fill="#b45309" transform="rotate(45)" />
                <rect x="-40" y="-40" width="20" height="20" rx="3" fill="#b45309" transform="rotate(-45)" />
              </g>
            </g>

            {/* Industrial Pipes wrapping around */}
            <g id="pipes">
              {/* Pipe Left */}
              <path d="M 120,400 L 250,400 L 250,300" fill="none" stroke="#64748b" strokeWidth="16" strokeLinecap="round" />
              <path d="M 120,400 L 250,400 L 250,300" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
              {/* Pipe Right */}
              <path d="M 690,400 L 800,400 L 800,280" fill="none" stroke="#64748b" strokeWidth="16" strokeLinecap="round" />
              <path d="M 690,400 L 800,400 L 800,280" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            </g>

          </g>
        </svg>
      </motion.div>
    </div>
  );
};
