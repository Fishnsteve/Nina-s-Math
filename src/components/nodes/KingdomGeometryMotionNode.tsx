import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { OrbitingOrbs } from '../ZoneNodes';

export const KingdomGeometryMotionNode = ({ unlocked, duration = 6 }: { unlocked: boolean; duration?: number }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
      {unlocked && <OrbitingOrbs color="bg-fuchsia-400 text-fuchsia-400" duration={duration * 2} />}
      <motion.div 
        animate={unlocked ? { y: [-6, 6, -6] } : {}}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <svg 
          viewBox="-50 -50 1200 1000" 
          className={cn(
            "w-[220%] h-[220%] max-w-none transition-all duration-700", 
            unlocked ? "drop-shadow-[0_15px_35px_rgba(240,46,170,0.5)]" : "grayscale opacity-50"
          )}
        >
          {/* Base Floating Island Foundation */}
          <g id="island-base" transform="translate(100, 500)">
            {/* Dark glass obsidian base */}
            <polygon points="500,350 150,150 500,-50 850,150" fill="#1e1b4b" opacity="0.9" />
            <polygon points="150,150 500,350 500,480 150,280" fill="#03001e" />
            <polygon points="500,350 850,150 850,280 500,480" fill="#120015" />
            
            {/* Futuristic purple neon light streaks underneath */}
            <polygon points="260,200 400,360 500,480 320,280" fill="#f43f5e" opacity="0.6" />
            <polygon points="740,200 600,360 500,480 680,280" fill="#ec4899" opacity="0.7" />

            {/* Sleek metallic top surface with circular grid */}
            <polygon points="500,320 180,140 500,-40 820,140" fill="#3b0764" />
            
            {/* Glowing circle concentric grid pattern */}
            <ellipse cx="500" cy="140" rx="200" ry="90" fill="none" stroke="#d946ef" strokeWidth="4" strokeDasharray="15, 10" />
            <ellipse cx="500" cy="140" rx="120" ry="55" fill="none" stroke="#ec4899" strokeWidth="3" />
          </g>

          {/* Futuristic Geometry & Speed Dome Observatory */}
          <g id="futuristic-observatory" transform="translate(100, 100)">
            
            {/* Sleek Aerodynamic Wind Trails / Vector Trails flying past */}
            <g id="speed-vectors" stroke="url(#pinkNeonGrad)" strokeWidth="6" strokeLinecap="round" opacity="0.8">
              <defs>
                <linearGradient id="pinkNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
                  <stop offset="50%" stopColor="#d946ef" stopOpacity="1" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Dynamic light rays */}
              <path d="M 50,220 L 250,220">
                <animate attributeName="d" values="M 50,220 L 250,220; M 150,220 L 350,220; M 50,220 L 250,220" dur="2.5s" repeatCount="indefinite" />
              </path>
              <path d="M 750,250 L 950,250">
                <animate attributeName="d" values="M 750,250 L 950,250; M 650,250 L 850,250; M 750,250 L 950,250" dur="3s" repeatCount="indefinite" />
              </path>
              <path d="M 120,380 L 320,380">
                <animate attributeName="d" values="M 120,380 L 320,380; M 220,380 L 420,380; M 120,380 L 320,380" dur="2.2s" repeatCount="indefinite" />
              </path>
            </g>

            {/* Central Hyperbolic Dome Structure */}
            <g id="geo-dome" transform="translate(350, 140)">
              {/* Spherical Base */}
              <path d="M 50,250 C 50,100 250,100 250,250 Z" fill="#4c0519" stroke="#db2777" strokeWidth="6" />
              <path d="M 150,250 C 150,100 250,100 250,250 Z" fill="#ec4899" opacity="0.2" />

              {/* Geodesic triangular wireframe on the dome */}
              <path d="M 50,250 L 150,100 L 250,250 M 150,100 L 150,250 M 90,180 L 210,180 M 50,250 L 250,250" fill="none" stroke="#f43f5e" strokeWidth="3" opacity="0.8" />
              
              {/* Central laser beam shooting upwards */}
              <line x1="150" y1="120" x2="150" y2="-50" stroke="#f43f5e" strokeWidth="8" className="animate-pulse" />
              <line x1="150" y1="120" x2="150" y2="-50" stroke="#fff" strokeWidth="3" />
              
              {/* Golden circular aperture / ring floating above dome */}
              <ellipse cx="150" cy="-50" rx="60" ry="20" fill="none" stroke="#fbbf24" strokeWidth="5">
                <animate attributeName="ry" values="15;25;15" dur="2s" repeatCount="indefinite" />
              </ellipse>
            </g>

            {/* Outer floating geometric rings rotating around the dome */}
            <g id="concentric-rings" transform="translate(500, 320)">
              <ellipse cx="0" cy="0" rx="350" ry="110" fill="none" stroke="#22d3ee" strokeWidth="6" strokeDasharray="30, 15">
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  from="0" to="-360" 
                  dur="10s" 
                  repeatCount="indefinite" 
                />
              </ellipse>
              <ellipse cx="0" cy="0" rx="280" ry="80" fill="none" stroke="#ec4899" strokeWidth="4" strokeDasharray="50, 10">
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  from="0" to="360" 
                  dur="8s" 
                  repeatCount="indefinite" 
                />
              </ellipse>
            </g>

            {/* Floating Polyhedral crystals near the dome */}
            <g id="crystals" transform="translate(250, 120)">
              {/* Crystal 1 */}
              <polygon points="30,0 50,20 30,40 10,20" fill="#d946ef" opacity="0.9">
                <animate transform="translate(0, 0)" attributeName="points" 
                  values="30,0 50,20 30,40 10,20; 30,-10 50,10 30,30 10,10; 30,0 50,20 30,40 10,20" 
                  dur="3s" repeatCount="indefinite" />
              </polygon>
              {/* Crystal 2 */}
              <polygon points="450,40 470,60 450,80 430,60" fill="#a21caf" opacity="0.9" transform="translate(0, 80)">
                <animate transform="translate(0, 80)" attributeName="points" 
                  values="450,40 470,60 450,80 430,60; 450,50 470,70 450,90 430,70; 450,40 470,60 450,80 430,60" 
                  dur="2.5s" repeatCount="indefinite" />
              </polygon>
            </g>

          </g>
        </svg>
      </motion.div>
    </div>
  );
};
