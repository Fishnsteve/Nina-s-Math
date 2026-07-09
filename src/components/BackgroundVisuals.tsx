import React from 'react';
import { motion } from 'motion/react';

const EMBER_PARTICLES = Array.from({ length: 30 }).map((_, i) => {
  // Use a simple seeded pseudo-random approach based on index to ensure stable styling
  const size = ((i * 17) % 4) + 2; // 2 to 5 px
  const left = `${(i * 31) % 100}%`;
  const duration = 3.5 + ((i * 7) % 3); // 3.5 to 5.5 seconds
  const delay = -(((i * 13) % 100) / 20); // 0 to -5 seconds
  const swayX = ((i * 23) % 60) - 30; // -30 to 30
  return { id: i, size, left, duration, delay, swayX };
});

const CYBER_CODES = Array.from({ length: 18 }).map((_, i) => {
  const isCyan = i % 2 === 0;
  const size = 10 + ((i * 7) % 13); // 10 to 22 px
  const duration = 4 + ((i * 3) % 7); // 4 to 10 seconds
  const delay = -(((i * 11) % 100) / 10); // -0 to -10 seconds
  const left = `${(i * 5.5) + ((i * i) % 4)}%`;
  const opacity = 0.3 + ((i * 13) % 4) * 0.1; // 0.3 to 0.6
  const char = i % 2 === 0 ? '0' : '1';
  return { id: i, isCyan, size, duration, delay, left, opacity, char };
});

const FIREFLIES = Array.from({ length: 20 }).map((_, i) => {
  const size = 3 + ((i * 13) % 6); // 3 to 8 px
  const duration = 5 + ((i * 7) % 7); // 5 to 11 seconds
  const delay = -(((i * 17) % 100) / 10); // -0 to -10 seconds
  const left = `${(i * 19) % 100}%`;
  const top = `${20 + ((i * 23) % 60)}%`;
  const targetY = -40 - ((i * 11) % 120); // -40 to -160
  const targetX = ((i * 17) % 40) - 20; // -20 to 20
  return { id: i, size, duration, delay, left, top, targetY, targetX };
});

const LEAVES = Array.from({ length: 12 }).map((_, i) => {
  const size = 10 + ((i * 11) % 15); // 10 to 24 px
  const duration = 8 + ((i * 5) % 11); // 8 to 18 seconds
  const delay = -(((i * 13) % 100) / 8); // -0 to -12.5 seconds
  const left = `${(i * 29) % 100}%`;
  const swayX = ((i * 19) % 60) - 30; // -30 to 30
  return { id: i, size, duration, delay, left, swayX };
});

const CASTLE_SPARKLES = Array.from({ length: 18 }).map((_, i) => {
  const size = 3 + ((i * 17) % 7); // 3 to 9 px
  const duration = 4 + ((i * 9) % 6); // 4 to 9 seconds
  const delay = -(((i * 23) % 100) / 12); // -0 to -8.3 seconds
  const left = `${(i * 37) % 100}%`;
  const top = `${10 + ((i * 13) % 80)}%`;
  const targetY = -50 - ((i * 23) % 150); // -50 to -200
  const targetX = ((i * 19) % 50) - 25; // -25 to 25
  return { id: i, size, duration, delay, left, top, targetY, targetX };
});

const CASTLE_CRESTS = Array.from({ length: 4 }).map((_, i) => {
  const left = `${10 + i * 25 + ((i * 17) % 10)}%`;
  const size = 30 + ((i * 23) % 31); // 30 to 60 px
  const duration = 10 + ((i * 13) % 13); // 10 to 22 seconds
  const delay = -(((i * 29) % 100) / 6); // -0 to -16.6 seconds
  const isRotatePositive = i % 2 === 0;
  return { id: i, left, size, duration, delay, isRotatePositive };
});

const OCEAN_BUBBLES = Array.from({ length: 22 }).map((_, i) => {
  const size = 4 + ((i * 13) % 13); // 4 to 16 px
  const duration = 6 + ((i * 7) % 9); // 6 to 14 seconds
  const delay = -(((i * 31) % 100) / 8); // -0 to -12.5 seconds
  const left = `${(i * 17) % 100}%`;
  const swayX = ((i * 23) % 50) - 25; // -25 to 25
  return { id: i, size, duration, delay, left, swayX };
});

const COSMIC_STARS = Array.from({ length: 18 }).map((_, i) => {
  const size = 2 + ((i * 13) % 5); // 2 to 6 px
  const duration = 2 + ((i * 7) % 5); // 2 to 6 seconds
  const delay = -(((i * 19) % 100) / 20); // -0 to -5 seconds
  const left = `${(i * 37) % 100}%`;
  const top = `${(i * 47) % 100}%`;
  return { id: i, size, duration, delay, left, top };
});

const COSMIC_SHOOTING_STARS = Array.from({ length: 2 }).map((_, i) => {
  const duration = 6 + ((i * 13) % 5); // 6 to 10 seconds
  const delay = 10 + i * 12;
  const left = `${((i * 41) % 30) - 10}%`;
  const top = `${20 + ((i * 37) % 40)}%`;
  return { id: i, duration, delay, left, top };
});

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
          {CYBER_CODES.map((code) => (
            <motion.div
              key={`cyber-code-${code.id}`}
              className={`absolute font-mono font-black select-none ${
                code.isCyan 
                  ? 'text-cyan-400 drop-shadow-[0_0_8px_#06b6d4]' 
                  : 'text-fuchsia-400 drop-shadow-[0_0_8px_#d946ef]'
              }`}
              style={{
                left: code.left,
                top: '-10%',
                fontSize: `${code.size}px`,
                opacity: code.opacity,
              }}
              animate={{
                y: ['0vh', '115vh'],
                rotate: [0, 360],
              }}
              transition={{
                duration: code.duration,
                repeat: Infinity,
                ease: "linear",
                delay: code.delay,
              }}
            >
              {code.char}
            </motion.div>
          ))}

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
          {FIREFLIES.map((fly) => (
            <motion.div
              key={`firefly-${fly.id}`}
              className="absolute rounded-full bg-amber-300/80 shadow-[0_0_10px_#f59e0b,0_0_20px_#f59e0b]"
              style={{
                width: `${fly.size}px`,
                height: `${fly.size}px`,
                left: fly.left,
                top: fly.top,
              }}
              animate={{
                y: [0, fly.targetY],
                x: [0, fly.targetX],
                opacity: [0, 0.8, 0.8, 0],
                scale: [1, 1.3, 0.8, 1],
              }}
              transition={{
                duration: fly.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: fly.delay,
              }}
            />
          ))}

          {/* Falling Leaves */}
          {LEAVES.map((leaf) => (
            <motion.svg
              key={`leaf-${leaf.id}`}
              viewBox="0 0 24 24"
              className="absolute text-emerald-500/30 fill-current"
              style={{
                width: `${leaf.size}px`,
                height: `${leaf.size}px`,
                left: leaf.left,
                top: '-10%',
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [0, leaf.swayX, -leaf.swayX, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: leaf.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: leaf.delay,
              }}
            >
              <path d="M17,8C8,20 4,21 4,21C4,21 5,17 17,8M17,8c-3.5,1.5 -8.5,1.5 -11.5,-1.5c-3,3 -3,8 0,11c3,3 8,3 11,0C19.5,14.5 19.5,9.5 17,8Z" />
            </motion.svg>
          ))}
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
          {CASTLE_SPARKLES.map((sparkle) => (
            <motion.div
              key={`sparkle-${sparkle.id}`}
              className="absolute rounded-full bg-amber-400/75 shadow-[0_0_8px_#fbbf24,0_0_15px_#f59e0b]"
              style={{
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                left: sparkle.left,
                top: sparkle.top,
              }}
              animate={{
                y: [0, sparkle.targetY],
                x: [0, sparkle.targetX],
                opacity: [0, 0.9, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: sparkle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: sparkle.delay,
              }}
            />
          ))}

          {/* Floating Royal Crests / Shields Outline Icons */}
          {CASTLE_CRESTS.map((crest) => (
            <motion.svg
              key={`crest-${crest.id}`}
              viewBox="0 0 24 24"
              className="absolute text-amber-500/10 fill-none stroke-current"
              strokeWidth="1"
              style={{
                width: `${crest.size}px`,
                height: `${crest.size}px`,
                left: crest.left,
                top: '110%',
              }}
              animate={{
                y: ['0vh', '-125vh'],
                rotate: [0, crest.isRotatePositive ? 45 : -45],
                opacity: [0, 0.3, 0.3, 0],
              }}
              transition={{
                duration: crest.duration,
                repeat: Infinity,
                ease: "linear",
                delay: crest.delay,
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </motion.svg>
          ))}

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
          {OCEAN_BUBBLES.map((bubble) => (
            <motion.div
              key={`bubble-${bubble.id}`}
              className="absolute rounded-full border border-cyan-300/30 bg-gradient-to-tr from-cyan-500/10 to-white/20 shadow-inner"
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                left: bubble.left,
                bottom: '-10%',
              }}
              animate={{
                y: ['0vh', '-115vh'],
                x: [0, bubble.swayX, -bubble.swayX, 0],
                scale: [1, 1.2, 0.9, 1.1],
              }}
              transition={{
                duration: bubble.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bubble.delay,
              }}
            />
          ))}

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
          {COSMIC_STARS.map((star) => (
            <motion.div
              key={`star-${star.id}`}
              className="absolute rounded-full bg-white/70 shadow-[0_0_8px_#fff]"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                left: star.left,
                top: star.top,
              }}
              animate={{
                opacity: [0.1, 1, 0.1],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: star.delay,
              }}
            />
          ))}

          {/* Cosmic Shooting Stars */}
          {COSMIC_SHOOTING_STARS.map((star) => (
            <motion.div
              key={`shooting-star-${star.id}`}
              className="absolute h-[1.5px] bg-gradient-to-r from-white via-cyan-300 to-transparent shadow-[0_0_8px_#fff]"
              style={{
                width: '80px',
                left: star.left,
                top: star.top,
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
                repeatDelay: star.duration,
                ease: "easeOut",
                delay: star.delay,
              }}
            />
          ))}
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
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: Math.min(1, scrollProgress * 1.5) }}>
          {EMBER_PARTICLES.map((particle) => (
            <motion.div
              key={`ember-${particle.id}`}
              className="absolute rounded-full bg-orange-500/90 shadow-[0_0_8px_#ff5500,0_0_15px_#ff0000]"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: particle.left,
                bottom: '-5%',
              }}
              animate={{
                y: ['0vh', '-105vh'],
                x: [0, particle.swayX],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: 'easeOut',
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
