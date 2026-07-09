import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { OrbitingOrbs } from '../ZoneNodes';

export const CircumferenceTempleNode = ({ unlocked, colors, duration = 6 }: any) => {
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
          {/* Base Floating Temple Altar (Pinkish White Marble Block) */}
          <g id="temple-base" transform="translate(100, 500)">
            {/* Rocky base crust with magenta crystals */}
            <polygon points="500,350 150,150 500,-50 850,150" fill="#f43f5e" opacity="0.8" />
            <polygon points="150,150 500,350 500,480 150,280" fill="#881337" />
            <polygon points="500,350 850,150 850,280 500,480" fill="#be123c" />
            
            {/* Pure White Marble Steps */}
            <polygon points="500,320 180,140 500,-40 820,140" fill="#faf5ff" />
            {/* Step 2 */}
            <polygon points="500,300 220,150 500,-10 780,150" fill="#f3e8ff" />
            
            {/* Circular Mosaic Floor representing mathematical Pi/Degrees */}
            <ellipse cx="500" cy="140" rx="200" ry="100" fill="#e9d5ff" stroke="#c084fc" strokeWidth="6" />
            <ellipse cx="500" cy="140" rx="140" ry="70" fill="none" stroke="#a855f7" strokeWidth="4" strokeDasharray="10, 10" />
            <line x1="500" y1="40" x2="500" y2="240" stroke="#a855f7" strokeWidth="4" />
            <line x1="300" y1="140" x2="700" y2="140" stroke="#a855f7" strokeWidth="4" />
          </g>

          {/* Majestic Circular Column Temple */}
          <g id="temple-columns" transform="translate(100, 80)">
            
            {/* Columns of the circular temple (front and back layers for 3D depth) */}
            {/* Back Columns (shaded darker) */}
            <g id="back-columns" opacity="0.6">
              {/* Back Column Left */}
              <rect x="360" y="180" width="30" height="240" fill="#c084fc" />
              <rect x="350" y="170" width="50" height="15" fill="#a855f7" />
              <rect x="350" y="410" width="50" height="15" fill="#a855f7" />

              {/* Back Column Center */}
              <rect x="500" y="170" width="30" height="245" fill="#c084fc" />
              <rect x="490" y="160" width="50" height="15" fill="#a855f7" />
              <rect x="490" y="405" width="50" height="15" fill="#a855f7" />

              {/* Back Column Right */}
              <rect x="640" y="180" width="30" height="240" fill="#a855f7" />
              <rect x="630" y="170" width="50" height="15" fill="#7e22ce" />
              <rect x="630" y="410" width="50" height="15" fill="#7e22ce" />
            </g>

            {/* Sacred Altar with Glowing Pink Gem inside the temple */}
            <g id="sacred-altar" transform="translate(460, 300)">
              <rect x="0" y="50" width="80" height="80" fill="#faf5ff" stroke="#c084fc" strokeWidth="4" />
              <rect x="5" y="40" width="70" height="12" fill="#e9d5ff" />
              
              {/* Glowing Magenta Gem floating above altar */}
              <polygon points="40,0 60,25 40,50 20,25" fill="#f43f5e" className="animate-pulse">
                <animate attributeName="transform" type="translate" values="0, 0; 0, -10; 0, 0" dur="2s" repeatCount="indefinite" />
              </polygon>
            </g>

            {/* Front Columns (fully detailed, blocking the view of the interior) */}
            <g id="front-columns">
              {/* Front Left Column */}
              <rect x="260" y="220" width="36" height="250" fill="#f3e8ff" />
              <rect x="250" y="205" width="56" height="18" fill="#e9d5ff" />
              <rect x="250" y="460" width="56" height="18" fill="#e9d5ff" />
              {/* Pillar fluting lines */}
              <line x1="272" y1="223" x2="272" y2="457" stroke="#d8b4fe" strokeWidth="3" />
              <line x1="284" y1="223" x2="284" y2="457" stroke="#d8b4fe" strokeWidth="3" />

              {/* Front Right Column */}
              <rect x="704" y="220" width="36" height="250" fill="#e9d5ff" />
              <rect x="694" y="205" width="56" height="18" fill="#d8b4fe" />
              <rect x="694" y="460" width="56" height="18" fill="#d8b4fe" />
              {/* Pillar fluting lines */}
              <line x1="716" y1="223" x2="716" y2="457" stroke="#c084fc" strokeWidth="3" />
              <line x1="728" y1="223" x2="728" y2="457" stroke="#c084fc" strokeWidth="3" />
            </g>

            {/* Circular Roof/Architrave (Crowned dome representing continuous circumference) */}
            <g id="temple-dome" transform="translate(200, 40)">
              {/* Architrave ring */}
              <rect x="30" y="110" width="540" height="40" rx="10" fill="#f3e8ff" />
              <rect x="30" y="125" width="540" height="20" rx="5" fill="#e9d5ff" />

              {/* Grand Dome on top */}
              <path d="M 50,110 C 50,-40 550,-40 550,110 Z" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="4" />
              <path d="M 300,110 C 300,-40 550,-40 550,110 Z" fill="#f3e8ff" />

              {/* Gold mathematical band around the dome */}
              <path d="M 120,70 Q 300,105 480,70 Q 300,60 120,70 Z" fill="#fbbf24" opacity="0.9" />
              <circle cx="300" cy="65" r="12" fill="#d97706" />
            </g>

            {/* Floating glowing golden circumference rings spinning */}
            <g id="spinning-rings" transform="translate(500, 260)">
              <ellipse cx="0" cy="0" rx="360" ry="120" fill="none" stroke="#fbbf24" strokeWidth="10" strokeDasharray="50, 20">
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  from="0" to="360" 
                  dur="15s" 
                  repeatCount="indefinite" 
                />
              </ellipse>
              <ellipse cx="0" cy="0" rx="360" ry="120" fill="none" stroke="#fbbf24" strokeWidth="3" opacity="0.6" />
            </g>

          </g>
        </svg>
      </motion.div>
    </div>
  );
};
