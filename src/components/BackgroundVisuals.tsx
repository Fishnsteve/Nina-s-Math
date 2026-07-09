import React from 'react';
import { motion } from 'motion/react';

interface BackgroundVisualsProps {
  bgId: string;
  scrollProgress?: number;
}

export function BackgroundVisuals({ bgId, scrollProgress = 0 }: BackgroundVisualsProps) {
  const renderContent = () => {
    switch (bgId) {
    case 'bg_cyber': {
      return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#090514]">
          {/* Cyber Synthwave Grid Floor */}
          <div className="absolute inset-x-0 bottom-0 h-48 opacity-40 bg-[linear-gradient(to_bottom,transparent,rgba(217,70,239,0.3))]">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(6,182,212,0.15) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(217,70,239,0.15) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                transform: 'perspective(200px) rotateX(60deg) translateY(-20px)',
                transformOrigin: 'top center',
              }}
            />
          </div>

          {/* Cyber Neon Sun / Grid lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-b from-fuchsia-500/10 to-transparent blur-3xl pointer-events-none" />
          
          {/* Retrowave Sun */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-b from-fuchsia-500/20 via-pink-500/10 to-transparent opacity-60 flex flex-col justify-between overflow-hidden border border-fuchsia-500/20">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="w-full bg-[#090514]" 
                style={{ height: `${(i + 1) * 3}px` }} 
              />
            ))}
          </div>

          {/* Neon Horizon Lasers */}
          <div className="absolute bottom-48 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-70 blur-[1px]" />
          <div className="absolute bottom-48 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-40 blur-[4px]" />

          {/* Falling Cyber Codes (Matrix style but Cyan/Fuchsia) */}
          {Array.from({ length: 18 }).map((_, i) => {
            const isCyan = i % 2 === 0;
            const size = Math.random() * 12 + 10;
            const duration = Math.random() * 6 + 4;
            const delay = Math.random() * -10;
            const left = (i * 6) + Math.random() * 4 + '%';
            
            return (
              <motion.div
                key={`cyber-code-${i}`}
                className={`absolute font-mono font-black select-none ${
                  isCyan 
                    ? 'text-cyan-400 drop-shadow-[0_0_8px_#06b6d4]' 
                    : 'text-fuchsia-400 drop-shadow-[0_0_8px_#d946ef]'
                }`}
                style={{
                  left,
                  top: '-10%',
                  fontSize: `${size}px`,
                  opacity: Math.random() * 0.4 + 0.3,
                }}
                animate={{
                  y: ['0vh', '115vh'],
                  rotate: [0, 360],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay,
                }}
              >
                {Math.random() > 0.5 ? '0' : '1'}
              </motion.div>
            );
          })}

          {/* Neon Grid Crosshairs / Tech Circles */}
          <div className="absolute top-10 left-10 w-24 h-24 border border-cyan-500/20 rounded-full flex items-center justify-center opacity-30 animate-[spin_20s_linear_infinite]">
            <div className="w-20 h-20 border border-dashed border-fuchsia-500/20 rounded-full" />
            <div className="absolute w-[2px] h-28 bg-cyan-500/10" />
            <div className="absolute h-[2px] w-28 bg-cyan-500/10" />
          </div>

          <div className="absolute bottom-10 right-10 w-32 h-32 border border-fuchsia-500/20 rounded-full flex items-center justify-center opacity-30 animate-[spin_30s_linear_infinite_reverse]">
            <div className="w-28 h-28 border border-dashed border-cyan-500/20 rounded-full" />
            <div className="absolute w-[2px] h-36 bg-fuchsia-500/10" />
            <div className="absolute h-[2px] w-36 bg-fuchsia-500/10" />
          </div>
        </div>
      );
    }

    case 'bg_forest': {
      return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#09150e]">
          {/* Subtle Rays of Sunlight */}
          <div className="absolute top-0 left-0 right-0 h-[60%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent opacity-75 blur-2xl" />
          
          {/* Light Rays */}
          <div className="absolute top-0 inset-x-0 h-[80%] flex justify-around opacity-20">
            <div className="w-16 h-full bg-gradient-to-b from-emerald-300 via-transparent to-transparent rotate-[-15deg] transform origin-top blur-md" />
            <div className="w-24 h-full bg-gradient-to-b from-green-300 via-transparent to-transparent rotate-[10deg] transform origin-top blur-lg" />
            <div className="w-12 h-full bg-gradient-to-b from-teal-300 via-transparent to-transparent rotate-[-5deg] transform origin-top blur-md" />
          </div>

          {/* Enchanting Fireflies */}
          {Array.from({ length: 20 }).map((_, i) => {
            const size = Math.random() * 5 + 3;
            const duration = Math.random() * 6 + 5;
            const delay = Math.random() * -10;
            
            return (
              <motion.div
                key={`firefly-${i}`}
                className="absolute rounded-full bg-amber-300/80 shadow-[0_0_10px_#f59e0b,0_0_20px_#f59e0b]"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 80 + 20 + '%',
                }}
                animate={{
                  y: [0, Math.random() * -120 - 40],
                  x: [0, Math.random() * 40 - 20],
                  opacity: [0, 0.8, 0.8, 0],
                  scale: [1, 1.3, 0.8, 1],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
              />
            );
          })}

          {/* Falling Leaves */}
          {Array.from({ length: 12 }).map((_, i) => {
            const size = Math.random() * 14 + 10;
            const duration = Math.random() * 10 + 8;
            const delay = Math.random() * -12;
            
            return (
              <motion.svg
                key={`leaf-${i}`}
                viewBox="0 0 24 24"
                className="absolute text-emerald-500/30 fill-current"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: Math.random() * 100 + '%',
                  top: '-10%',
                }}
                animate={{
                  y: ['0vh', '110vh'],
                  x: [0, Math.random() * 60 - 30, Math.random() * -60 + 30, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
              >
                <path d="M17,8C8,20 4,21 4,21C4,21 5,17 17,8M17,8c-3.5,1.5 -8.5,1.5 -11.5,-1.5c-3,3 -3,8 0,11c3,3 8,3 11,0C19.5,14.5 19.5,9.5 17,8Z" />
              </motion.svg>
            );
          })}
        </div>
      );
    }

    case 'bg_castle': {
      return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#140c08]">
          {/* Warm Royal Hearth Glow */}
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-80 blur-3xl" />
          <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-amber-500/5 to-transparent blur-2xl" />

          {/* Golden Magical Sparkles */}
          {Array.from({ length: 18 }).map((_, i) => {
            const size = Math.random() * 6 + 3;
            const duration = Math.random() * 5 + 4;
            const delay = Math.random() * -8;
            
            return (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute rounded-full bg-amber-400/75 shadow-[0_0_8px_#fbbf24,0_0_15px_#f59e0b]"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 90 + 10 + '%',
                }}
                animate={{
                  y: [0, Math.random() * -150 - 50],
                  x: [0, Math.random() * 50 - 25],
                  opacity: [0, 0.9, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
              />
            );
          })}

          {/* Floating Royal Crests / Shields Outline Icons */}
          {Array.from({ length: 4 }).map((_, i) => {
            const left = 10 + (i * 25) + Math.random() * 10 + '%';
            const size = Math.random() * 30 + 30;
            const duration = Math.random() * 12 + 10;
            const delay = Math.random() * -15;
            
            return (
              <motion.svg
                key={`crest-${i}`}
                viewBox="0 0 24 24"
                className="absolute text-amber-500/10 fill-none stroke-current"
                strokeWidth="1"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left,
                  top: '110%',
                }}
                animate={{
                  y: ['0vh', '-125vh'],
                  rotate: [0, Math.random() > 0.5 ? 45 : -45],
                  opacity: [0, 0.3, 0.3, 0],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay,
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </motion.svg>
            );
          })}

          {/* Castle Brick Side Pillars Silhouette */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/40 to-transparent border-r border-amber-500/5 flex flex-col justify-around py-12 opacity-50">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 w-4 border-y border-r border-amber-500/10 rounded-r-md" />
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/40 to-transparent border-l border-amber-500/5 flex flex-col justify-around py-12 opacity-50">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 w-4 border-y border-l border-amber-500/10 rounded-l-md self-end" />
            ))}
          </div>
        </div>
      );
    }

    case 'bg_ocean': {
      return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#051119]">
          {/* Deep Sea Light Rays (Caustics) */}
          <div className="absolute top-0 left-0 right-0 h-[70%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent opacity-80 blur-2xl animate-pulse" />
          
          <div className="absolute top-0 inset-x-0 h-full flex justify-around opacity-35">
            <motion.div 
              className="w-20 h-full bg-gradient-to-b from-cyan-400/10 via-transparent to-transparent origin-top blur-xl"
              animate={{ rotate: [-8, 8, -8] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="w-32 h-full bg-gradient-to-b from-blue-400/10 via-transparent to-transparent origin-top blur-2xl"
              animate={{ rotate: [12, -12, 12] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Underwater Rising Bubbles */}
          {Array.from({ length: 22 }).map((_, i) => {
            const size = Math.random() * 12 + 4;
            const duration = Math.random() * 8 + 6;
            const delay = Math.random() * -12;
            
            return (
              <motion.div
                key={`bubble-${i}`}
                className="absolute rounded-full border border-cyan-300/30 bg-gradient-to-tr from-cyan-500/10 to-white/20 shadow-inner"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: Math.random() * 100 + '%',
                  bottom: '-10%',
                }}
                animate={{
                  y: ['0vh', '-115vh'],
                  x: [0, Math.random() * 50 - 25, Math.random() * -50 + 25, 0],
                  scale: [1, 1.2, 0.9, 1.1],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
              />
            );
          })}

          {/* Gentle Sea Waves Overlay */}
          <div className="absolute inset-0 opacity-15">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,50 Q25,45 50,50 T100,50" fill="none" stroke="#22d3ee" strokeWidth="0.2" strokeDasharray="2,3" />
              <path d="M0,70 Q25,75 50,70 T100,70" fill="none" stroke="#3b82f6" strokeWidth="0.2" strokeDasharray="3,4" />
            </svg>
          </div>
        </div>
      );
    }

    default: {
      return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#0a0c16]">
          {/* Cosmic Nebula Cloud */}
          <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-purple-500/5 via-blue-500/5 to-cyan-500/5 blur-3xl pointer-events-none" />

          {/* Cosmic Twinkling Stars */}
          {Array.from({ length: 18 }).map((_, i) => {
            const size = Math.random() * 4 + 2;
            const duration = Math.random() * 4 + 2;
            const delay = Math.random() * -5;
            
            return (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full bg-white/70 shadow-[0_0_8px_#fff]"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                }}
                animate={{
                  opacity: [0.1, 1, 0.1],
                  scale: [0.8, 1.3, 0.8],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
              />
            );
          })}

          {/* Cosmic Shooting Stars */}
          {Array.from({ length: 2 }).map((_, i) => {
            const duration = Math.random() * 4 + 6;
            const delay = Math.random() * 10 + (i * 12);
            
            return (
              <motion.div
                key={`shooting-star-${i}`}
                className="absolute h-[1.5px] bg-gradient-to-r from-white via-cyan-300 to-transparent shadow-[0_0_8px_#fff]"
                style={{
                  width: '80px',
                  left: Math.random() * 30 - 10 + '%',
                  top: Math.random() * 40 + '%',
                  transform: 'rotate(-35deg)',
                  opacity: 0,
                }}
                animate={{
                  x: ['0px', '400px'],
                  y: ['0px', '280px'],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: duration,
                  ease: "easeOut",
                  delay,
                }}
              />
            );
          })}
        </div>
      );
    }
  }
};

  // Calculate specific hue rotation degrees for each theme to shift beautifully to red (0deg)
  const getHueRotationForBg = (id: string): number => {
    switch (id) {
      case 'bg_forest':
        return -140; // Green to Red
      case 'bg_ocean':
        return -200; // Cyan/Blue to Red
      case 'bg_castle':
        return -35;  // Amber/Orange to Red
      case 'bg_cyber':
        return 65;   // Fuchsia/Purple to Red
      default:
        return 135;  // Default Indigo/Blue to Red
    }
  };

  const hueAngle = getHueRotationForBg(bgId) * scrollProgress;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#050303]">
      {/* Background layer: Deep hellish radial gradient that gets more intense and opaque as we scroll down */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-150"
        style={{
          background: 'radial-gradient(circle at bottom, rgba(160, 5, 5, 0.95) 0%, rgba(30, 3, 3, 0.98) 60%, rgba(10, 0, 0, 1) 100%)',
          opacity: scrollProgress,
        }}
      />

      {/* The main theme content, which gets gradually shifted in hue, saturated, darkened, and faded out */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-150"
        style={{
          filter: `hue-rotate(${hueAngle}deg) saturate(${1 + scrollProgress * 3}) brightness(${1 - scrollProgress * 0.4})`,
          opacity: 1 - scrollProgress * 0.85,
        }}
      >
        {renderContent()}
      </div>
      
      {/* Eerie Red Shift Overlay Layer 1: Tint remaining visual details to red smoothly using color blend mode */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-150"
        style={{
          backgroundColor: '#ff1100',
          opacity: scrollProgress * 0.8,
          mixBlendMode: 'color',
        }}
      />

      {/* Eerie Red Shift Overlay Layer 1b: Additional overlay blend to make highlights glow warm red */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-150"
        style={{
          backgroundColor: '#ff3c00',
          opacity: scrollProgress * 0.5,
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Eerie Red Shift Overlay Layer 2: Vivid crimson glowing radial gradient overlay from the bottom */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-150"
        style={{
          background: 'radial-gradient(circle at bottom, rgba(220, 20, 20, 0.4) 0%, rgba(120, 10, 10, 0.1) 50%, rgba(0, 0, 0, 0) 80%)',
          opacity: scrollProgress * 0.9,
        }}
      />

      {/* Burning lava ashes/particles floating up as we reach the infernal */}
      {scrollProgress > 0.05 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: Math.floor(scrollProgress * 25) + 5 }).map((_, i) => {
            const size = Math.random() * 4 + 2;
            const left = Math.random() * 100 + '%';
            const duration = Math.random() * 5 + 3;
            const delay = Math.random() * -5;
            return (
              <motion.div
                key={`ember-${i}`}
                className="absolute rounded-full bg-orange-500/90 shadow-[0_0_8px_#ff5500,0_0_15px_#ff0000]"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left,
                  bottom: '-5%',
                }}
                animate={{
                  y: ['0vh', '-105vh'],
                  x: [0, Math.random() * 60 - 30],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
