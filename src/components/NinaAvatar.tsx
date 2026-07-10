import React from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'motion/react';

function DragonPet({ isBreathingFire, triggerFireBreathing, x = "132", y = "12", width = "65", height = "55" }: any) {
  return (
    <svg 
      x={x} 
      y={y} 
      width={width} 
      height={height} 
      viewBox="0 0 686.98 586.1"
      className={isBreathingFire ? "start-fire dragon-svg" : "dragon-svg"}
      onClick={triggerFireBreathing}
    >
      <defs>
        <style dangerouslySetInnerHTML={{ __html: `
          .cls-1 { fill: #f60; fill-rule: evenodd; }
          .cls-2 { fill: #ffbb1f; fill-rule: evenodd; }
          .cls-3 { fill: #ff0; fill-rule: evenodd; }
          .cls-4 { fill: #a29ed2; }
          .cls-5 { fill: #787791; }
          .cls-6 { fill: #fff; }
          .cls-7 { fill: #ffc31a; }
          .cls-8 { fill: #97ba04; }
          .cls-9 { fill: #4a5600; }
          .cls-10 { fill: #5f7500; }
          .cls-11 { fill: #4e5600; }
          .cls-12 { fill: #b9db2a; }
          .cls-13 { fill: #8ca304; }
          .cls-14 { fill: #e2ea36; }
          .cls-15 { opacity: 0.4; fill: #fff; }

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
          @keyframes burstNose {
            0% { opacity: 0; }
            50% { opacity: 1; transform: translate(-5%, 2px); }
            99% { opacity: 0; transform: translate(-5%, 2px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes burst {
            0% { opacity: 0; }
            50% { opacity: 1; transform: translate(-30%, 15%); }
            99% { opacity: 0; transform: translate(-30%, 15%); }
            100% { transform: translate(0, 0); }
          }
          @keyframes burst2 {
            0% { opacity: 0; }
            50% { opacity: 1; transform: translate(-35%, 30%); }
            99% { opacity: 0; transform: translate(-35%, 30%); }
            100% { transform: translate(0, 0); }
          }
          @keyframes burst3 {
            0% { opacity: 0; }
            50% { opacity: 1; transform: translate(-40%, 10%); }
            99% { opacity: 0; transform: translate(-40%, 10%); }
            100% { transform: translate(0, 0); }
          }
          @keyframes burst4 {
            0% { opacity: 0; }
            50% { opacity: 1; transform: translate(-25%, 35%); }
            99% { opacity: 0; transform: translate(-25%, 35%); }
            100% { transform: translate(0, 0); }
          }
          @keyframes bottomOpenMouth {
            0% { transform: translate(-319.81px, -91px) rotate(0deg); }
            100% { transform: translate(-319.81px, -91px) rotate(-3deg); }
          }
          @keyframes openMouth {
            0% { transform: rotate(0deg) translate(0px); }
            100% { transform: rotate(10deg) translate(-70px, 18px); }
          }

          .dragon-svg {
            overflow: visible;
            animation: float 4s ease-in-out infinite;
            cursor: pointer;
          }
          
          .top-mouth {
            transform-origin: center 100%;
            transition: transform 0.2s ease;
          }
          .bottom-mouth {
            transform-origin: right center;
            transform: translate(-319.81px, -91px) rotate(0deg);
            transition: transform 0.2s ease;
          }
          
          .fire {
            opacity: 0;
          }
          
          /* Active Fire Breathing state classes */
          .start-fire #NoseFireTiny,
          .start-fire #NoseFireMain {
            animation: burstNose 300ms 50ms ease infinite;
          }
          .start-fire .bottom-mouth {
            animation: bottomOpenMouth 300ms ease infinite alternate;
          }
          .start-fire .top-mouth {
            animation: openMouth 300ms ease infinite alternate;
          }
          .start-fire #MouthFireLarge {
            animation: burst 300ms 50ms ease infinite;
          }
          .start-fire #MouthFireMedium {
            animation: burst2 300ms 0ms ease infinite;
          }
          .start-fire #MouthFireSmall {
            animation: burst3 300ms 60ms ease infinite;
          }
          .start-fire #MouthFireXS {
            animation: burst4 300ms 70ms ease infinite;
          }
        ` }} />
      </defs>
      <g id="MouthFireLarge" className="fire">
        <polygon className="cls-1" points="191.25 161.22 172.28 189.81 153.31 218.41 119.06 220.39 84.8 222.37 103.77 193.78 122.73 165.18 156.99 163.2 191.25 161.22" fillRule="evenodd" />
        <polygon className="cls-2" points="164.63 176.51 155.15 190.81 145.67 205.1 128.54 206.09 111.42 207.08 120.9 192.79 130.38 178.5 147.51 177.5 164.63 176.51" fillRule="evenodd" />
        <polygon className="cls-3" points="111.42 207.08 120.9 192.79 130.38 178.5 147.51 177.51 164.63 176.51 111.42 207.08" fillRule="evenodd" />
      </g>
      <g id="MouthFireMedium" className="fire">
        <polygon className="cls-1" points="116.3 192.06 106.73 206.48 97.17 220.9 79.89 221.9 62.61 222.9 72.18 208.48 81.75 194.06 99.02 193.06 116.3 192.06" fillRule="evenodd" />
        <polygon className="cls-2" points="102.88 199.77 98.09 206.98 93.31 214.19 84.68 214.69 76.04 215.19 80.82 207.98 85.6 200.77 94.24 200.27 102.88 199.77" fillRule="evenodd" />
        <polygon className="cls-3" points="76.04 215.19 80.82 207.98 85.6 200.77 94.24 200.27 102.88 199.77 76.04 215.19" fillRule="evenodd" />
      </g>
      <g id="MouthFireSmall" className="fire">
        <polygon className="cls-1" points="144.11 197.6 136.37 209.27 128.63 220.95 114.65 221.75 100.66 222.57 108.41 210.89 116.14 199.22 130.13 198.41 144.11 197.6" fillRule="evenodd" />
        <polygon className="cls-2" points="133.25 203.84 129.38 209.68 125.51 215.51 118.52 215.92 111.53 216.32 115.4 210.49 119.27 204.65 126.26 204.25 133.25 203.84" fillRule="evenodd" />
        <polygon className="cls-3" points="111.53 216.32 115.4 210.49 119.27 204.65 126.26 204.25 133.25 203.84 111.53 216.32" fillRule="evenodd" />
      </g>
      <g id="MouthFireXS" className="fire">
        <polygon className="cls-1" points="141.98 183.75 136.26 192.37 130.54 200.99 120.22 201.59 109.89 202.18 115.61 193.56 121.33 184.94 131.65 184.34 141.98 183.75" fillRule="evenodd" />
        <polygon className="cls-2" points="133.96 188.36 131.1 192.67 128.24 196.98 123.08 197.28 117.92 197.57 120.77 193.26 123.63 188.96 128.79 188.66 133.96 188.36" fillRule="evenodd" />
        <polygon className="cls-3" points="117.92 197.58 120.77 193.26 123.63 188.96 128.79 188.66 133.96 188.36 117.92 197.58" fillRule="evenodd" />
      </g>
      <g id="NoseFireMain" className="fire">
        <polygon className="cls-1" points="54.24 175.91 49.6 186.68 44.97 197.44 33.57 200.19 22.17 202.94 26.81 192.18 31.45 181.41 42.84 178.66 54.24 175.91" fillRule="evenodd" />
        <polygon className="cls-2" points="46.22 182.67 43.9 188.05 41.58 193.44 35.89 194.81 30.19 196.18 32.51 190.8 34.83 185.42 40.52 184.04 46.22 182.67" fillRule="evenodd" />
        <polygon className="cls-3" points="30.19 196.19 32.51 190.8 34.83 185.42 40.52 184.04 46.22 182.67 30.19 196.19" fillRule="evenodd" />
      </g>
      <g id="NoseFireTiny" className="fire">
        <polygon className="cls-1" points="16.52 191.66 14.13 197.2 11.74 202.75 5.87 204.16 0 205.59 2.39 200.04 4.78 194.49 10.65 193.07 16.52 191.66" fillRule="evenodd" />
        <polygon className="cls-2" points="12.39 195.14 11.19 197.91 10 200.68 7.06 201.4 4.13 202.1 5.32 199.33 6.52 196.56 9.45 195.85 12.39 195.14" fillRule="evenodd" />
        <polygon className="cls-3" points="4.13 202.1 5.32 199.33 6.52 196.56 9.45 195.85 12.39 195.14 4.13 202.1" fillRule="evenodd" />
      </g>
      <polygon className="cls-4" points="148.05 471.51 38.75 471.51 130.06 555.02 236.65 513.27 275.98 586.11 352.42 523.95 485.92 586.11 508.76 509.36 686.98 471.51 148.05 471.51" />
      <polygon id="shadow" className="cls-5" points="508.76 509.36 686.98 471.51 265.53 471.51 352.42 523.95 485.92 586.11 508.76 509.36" />
      <path className="cls-6" d="M687.73,398.67s15.64-29.22,43.86-37.36,38.77-7.3,38.77-7.3l-20-64.56s-63.52,7.77-70.32,64.87C677.3,377.41,687.73,398.67,687.73,398.67Z" transform="translate(-319.81 -91)" />
      <path className="cls-7" d="M731.59,361.31c28.23-8.13,38.77-7.3,38.77-7.3l-11-35.56c-22.8,6.4-65.49,24.78-74.25,73.78,1.45,4,2.62,6.44,2.62,6.44S703.37,369.45,731.59,361.31Z" transform="translate(-319.81 -91)" />
      <path className="cls-8" d="M759.41,428.47s-48.92-43.63,0-43.63,102.19,32.85,131.37,80.42,52,57.31,52,57.31H759.41Z" transform="translate(-319.81 -91)" />
      <path className="cls-7" d="M759.41,522.57H942.79s-22.83-9.74-52-57.31c-2.43-4-5-7.81-7.79-11.56H759.41Z" transform="translate(-319.81 -91)" />
      <polygon className="cls-9" points="370.73 411.89 487.79 362.71 478.12 448.38 409.75 448.38 370.73 411.89" />
      <polygon className="cls-7" points="109.58 48.26 138.07 76.74 155.72 59.09 109.58 48.26" />
      <polygon className="cls-6" points="109.58 48.26 138.07 76.74 120.42 94.39 109.58 48.26" />
      <polygon className="cls-7" points="220.81 0 205.73 37.35 228.88 46.69 220.81 0" />
      <polygon className="cls-6" points="220.81 0 205.73 37.35 182.58 28 220.81 0" />
      <polygon className="cls-7" points="261.6 15.91 253.31 55.32 277.74 60.46 261.6 15.91" />
      <polygon className="cls-6" points="261.6 15.91 253.31 55.32 228.88 50.19 261.6 15.91" />
      <polygon className="cls-7" points="319.07 40.27 301.11 76.32 323.46 87.46 319.07 40.27" />
      <polygon className="cls-6" points="319.07 40.27 301.11 76.32 278.77 65.19 319.07 40.27" />
      <polygon className="cls-7" points="368.36 77.59 337.92 103.97 354.27 122.84 368.36 77.59" />
      <polygon className="cls-6" points="368.36 77.59 337.92 103.97 321.57 85.11 368.36 77.59" />
      <polygon className="cls-7" points="396.11 151.26 355.86 152.63 356.71 177.58 396.11 151.26" />
      <polygon className="cls-6" points="396.11 151.26 355.86 152.63 355.01 127.68 396.11 151.26" />
      <polygon className="cls-7" points="378.64 210.01 342.92 191.41 331.38 213.56 378.64 210.01" />
      <polygon className="cls-6" points="378.64 210.01 342.92 191.41 354.44 169.27 378.64 210.01" />
      <polygon className="cls-7" points="145.22 16.54 170.86 42.18 188.51 24.52 145.22 16.54" />
      <polygon className="cls-6" points="145.22 16.54 170.86 42.18 153.21 59.83 145.22 16.54" />
      <polygon className="cls-9" points="210.42 405.04 265.02 408.02 265.02 448.38 199.49 448.38 210.42 405.04" />
      <path className="cls-8" d="M446.14,255.29l-18-35.13S422.85,205,431,194.82s47.8-61.69,58.84-72.73,18.18-9.6,27.78,0,54.75,19.21,83.76,28.61,81.73,40,81.73,98.88c0,64.93-55.36,69.58-55.36,109.33,0,0,.42,25.79,23.25,25.79H759.27l11.42,74-11.28,63.85H573.12c-31.29,0-114.07-11.41-114.07-104S572.8,288.72,572.8,243.47s-20.72-42.71-20.72-42.71l-56.24,23.68Z" transform="translate(-319.81 -91)" />
      <path className="cls-7" d="M550.35,201.49c-12.09,1.78-22.29,5.59-26.61,9a22.38,22.38,0,0,0-3.12,3.52Z" transform="translate(-319.81 -91)" />
      <path className="cls-7" d="M573.12,522.55H759.41l11.28-26.85L729,453.7H598.58c-26.2,0-57.92-18.25-57.92-54.41,0-80.55,74.84-102.75,74.84-148.63,0-44.2-33.75-52.44-60.8-49.71,5.58,1.06,18.1,7.35,18.1,42.52,0,45.25-113.75,82.46-113.75,175.06S541.83,522.55,573.12,522.55Z" transform="translate(-319.81 -91)" />
      <path className="bottom-mouth cls-10" d="M450.67,334.59a18,18,0,0,1-25.43,0h0a18,18,0,0,1,0-25.43l100.5-100.49a18,18,0,0,1,25.43,0h0a18,18,0,0,1,0,25.43Z" transform="translate(-319.81 -91)" />
      <g className="top-mouth">
        <path className="cls-8" d="M410.67,326.66a18,18,0,0,1-25.43.42h0a18,18,0,0,1-.42-25.43L499.35,183.31a18,18,0,0,1,25.43-.42h0a18,18,0,0,1,.41,25.43Z" transform="translate(-319.81 -91)" />
        <path className="cls-8" d="M420.55,306.06A25.2,25.2,0,1,1,395,281.28,25.2,25.2,0,0,1,420.55,306.06Z" transform="translate(-319.81 -91)" />
        <path className="cls-11" d="M401.88,300.15a6.31,6.31,0,1,1-6.41-6.2A6.3,6.3,0,0,1,401.88,300.15Z" transform="translate(-319.81 -91)" />
      </g>
      <path className="cls-12" d="M563.92,210.49a40.18,40.18,0,1,1-40.18-40.17A40.17,40.17,0,0,1,563.92,210.49Z" transform="translate(-319.81 -91)" />
      <path className="cls-11" d="M472.12,215.09A11.19,11.19,0,1,1,460,204.87,11.17,11.17,0,0,1,472.12,215.09Z" transform="translate(-319.81 -91)" />
      <path className="cls-11" d="M460,216.12a5.23,5.23,0,0,1-7.36.62h0a5.23,5.23,0,0,1-.62-7.36l26.62-31.52a5.23,5.23,0,0,1,7.36-.62h0a5.22,5.22,0,0,1,.62,7.35Z" transform="translate(-319.81 -91)" />
      <path className="cls-8" d="M607.41,539.38H470.09a11.57,11.57,0,0,0-11.56,11.56H619A11.57,11.57,0,0,0,607.41,539.38Z" transform="translate(-319.81 -91)" />
      <path className="cls-10" d="M458.53,550.94a11.57,11.57,0,0,0,11.56,11.57H607.41A11.57,11.57,0,0,0,619,550.94Z" transform="translate(-319.81 -91)" />
      <path className="cls-10" d="M508.38,562.51a32,32,0,0,0-32-32v32Z" transform="translate(-319.81 -91)" />
      <path className="cls-7" d="M476.41,530.54a32,32,0,0,0-32,32h32Z" transform="translate(-319.81 -91)" />
      <path className="cls-8" d="M822.49,539.38H660.37a11.56,11.56,0,0,0-11.56,11.56H834.06A11.57,11.57,0,0,0,822.49,539.38Z" transform="translate(-319.81 -91)" />
      <path className="cls-10" d="M648.81,550.94a11.56,11.56,0,0,0,11.56,11.57H822.49a11.57,11.57,0,0,0,11.57-11.57Z" transform="translate(-319.81 -91)" />
      <path className="cls-10" d="M698.67,562.51a32,32,0,0,0-32-32v32Z" transform="translate(-319.81 -91)" />
      <path className="cls-7" d="M666.7,530.54a32,32,0,0,0-32,32h32Z" transform="translate(-319.81 -91)" />
      <polygon className="cls-8" points="327.22 416.03 278.77 448.38 213.24 448.38 236.62 378.5 327.22 416.03" />
      <path className="cls-13" d="M647,432a53.06,53.06,0,0,0-75,0l37.53,37.53Z" transform="translate(-319.81 -91)" />
      <path className="cls-14" d="M572,432A53.07,53.07,0,0,0,572,507l37.53-37.53Z" transform="translate(-319.81 -91)" />
      <path className="cls-10" d="M572,507a53.06,53.06,0,0,0,75,0L609.51,469.5Z" transform="translate(-319.81 -91)" />
      <path className="cls-14" d="M609.51,469.5,647,507A53.07,53.07,0,0,0,647,432Z" transform="translate(-319.81 -91)" />
      <polygon className="cls-8" points="391.41 411.89 508.46 362.71 498.8 448.38 430.43 448.38 391.41 411.89" />
      <path className="cls-10" d="M808.11,502.4a68.87,68.87,0,0,0,0-97.39l-48.7,48.7Z" transform="translate(-319.81 -91)" />
      <path className="cls-14" d="M808.11,405a68.87,68.87,0,0,0-97.4,0l48.7,48.7Z" transform="translate(-319.81 -91)" />
      <path className="cls-13" d="M710.71,405a68.87,68.87,0,0,0,0,97.39l48.7-48.69Z" transform="translate(-319.81 -91)" />
      <path className="cls-14" d="M759.41,453.71l-48.7,48.69a68.87,68.87,0,0,0,97.4,0Z" transform="translate(-319.81 -91)" />
      <path className="cls-6" d="M519.3,402.64a11,11,0,1,1-11-11A11,11,0,0,1,519.3,402.64Z" transform="translate(-319.81 -91)" />
      <path className="cls-6" d="M662.18,231.16a11,11,0,1,1-11-11A11,11,0,0,1,662.18,231.16Z" transform="translate(-319.81 -91)" />
      <path className="cls-6" d="M658.59,268.58a7.4,7.4,0,1,1-7.4-7.39A7.4,7.4,0,0,1,658.59,268.58Z" transform="translate(-319.81 -91)" />
      <circle className="cls-6" cx="188.51" cy="359.61" r="19.89" />
      <path className="cls-15" d="M549.72,203.07a21.52,21.52,0,1,1-21.51-21.52A21.52,21.52,0,0,1,549.72,203.07Z" transform="translate(-319.81 -91)" />
      <path className="cls-7" d="M461.43,221.79a3.81,3.81,0,1,1-3.81-3.81A3.8,3.8,0,0,1,461.43,221.79Z" transform="translate(-319.81 -91)" />
    </svg>
  );
}

export function NinaAvatar({ className, interactive }: { className?: string, interactive?: boolean }) {
  const { equippedAvatar, equippedPet, equippedBackground } = useGame();
  const [isBreathingFire, setIsBreathingFire] = React.useState(false);

  React.useEffect(() => {
    if (equippedPet !== 'pet_dragon') return;
    
    let timerId: any;
    const interval = setInterval(() => {
      setIsBreathingFire(true);
      timerId = setTimeout(() => {
        setIsBreathingFire(false);
      }, 1500);
    }, 6000);

    return () => {
      clearInterval(interval);
      if (timerId) clearTimeout(timerId);
    };
  }, [equippedPet]);

  const triggerFireBreathing = () => {
    setIsBreathingFire(true);
    setTimeout(() => {
      setIsBreathingFire(false);
    }, 1500);
  };

  return (
    <div className={`relative w-full aspect-square ${className || ''} flex items-center justify-center`}>
      {/* Background Stage/Glow based on equippedBackground */}
      {equippedBackground === 'bg_stage' && (
        <div className="absolute inset-0 bg-gradient-to-t from-rose-500/40 to-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      )}
      {equippedBackground === 'bg_street' && (
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/40 to-cyan-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      )}

      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl max-w-lg">
        <defs>
          <radialGradient id="skin" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
            <stop offset="0%" stopColor="#ffe6cc" />
            <stop offset="70%" stopColor="#fcdbb3" />
            <stop offset="100%" stopColor="#eab896" />
          </radialGradient>
          <linearGradient id="hairDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d2314" />
            <stop offset="100%" stopColor="#1a0f0a" />
          </linearGradient>
          <radialGradient id="blush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff8080" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ff8080" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sulanDress" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="100%" stopColor="#cc0000" />
          </linearGradient>
          <linearGradient id="sishuPink" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffd1dc" />
            <stop offset="100%" stopColor="#fca5a5" />
          </linearGradient>
          <linearGradient id="sishuBlue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="kimonoPink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb3d9" />
            <stop offset="100%" stopColor="#ff66b2" />
          </linearGradient>
          <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe600" />
            <stop offset="100%" stopColor="#cc9900" />
          </linearGradient>
          <linearGradient id="princessGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fae8ff" />
            <stop offset="40%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>

          {/* Kimono Floral Pattern Defs */}
          <g id="kimonoFlower">
            {/* Multi-colored traditional flower burst / chiyogami design */}
            <path d="M 0 0 C -4 -12 4 -12 0 0" fill="#ffffff" />
            <path d="M 0 0 C 4 -12 12 -4 0 0" fill="#ff4d4d" />
            <path d="M 0 0 C 12 -4 12 4 0 0" fill="#fb923c" />
            <path d="M 0 0 C 12 4 4 12 0 0" fill="#a78bfa" />
            <path d="M 0 0 C 4 12 -4 12 0 0" fill="#ffffff" />
            <path d="M 0 0 C -4 12 -12 4 0 0" fill="#ff4d4d" />
            <path d="M 0 0 C -12 4 -12 -4 0 0" fill="#fb923c" />
            <path d="M 0 0 C -12 -4 -4 -12 0 0" fill="#a78bfa" />
            <circle cx="0" cy="0" r="3" fill="url(#gold)" stroke="#ffffff" strokeWidth="0.5" />
          </g>
          <g id="cherryBlossom">
            <path d="M 0 0 C -3 -7 3 -7 0 0" fill="#ffd1dc" />
            <path d="M 0 0 C 7 -3 7 3 0 0" fill="#ffd1dc" />
            <path d="M 0 0 C 3 7 -3 7 0 0" fill="#ffd1dc" />
            <path d="M 0 0 C -7 3 -7 -3 0 0" fill="#ffd1dc" />
            <circle cx="0" cy="0" r="1.5" fill="#f43f5e" />
          </g>
          <g id="kimonoLeaf">
            <path d="M 0 0 Q 5 -7 10 -2 Q 5 3 0 0" fill="#a7f3d0" />
          </g>
        </defs>

        {equippedPet === 'pet_dragon' && (
          <DragonPet 
            isBreathingFire={isBreathingFire} 
            triggerFireBreathing={triggerFireBreathing} 
            x="-10" 
            y="-15" 
            width="220" 
            height="190" 
          />
        )}

        {/* --- BASE GIRL --- */}
        <g id="nina-body" transform="translate(15, 27) scale(0.85)">
        {/* Back Hair - Sleek, straight shoulder-length cut in perfect proportion with the head */}
        <path d="M 70 28 C 80 20 120 20 130 28 C 134 32 135 85 135 145 L 65 145 C 65 85 66 32 70 28 Z" fill="url(#hairDark)" />
        
        {/* Body / Legs (Base) */}
        {/* Left Leg */}
        <path d="M 85 140 L 85 180 Q 85 185 92 185 L 95 185 L 95 140 Z" fill="url(#skin)" />
        {/* Right Leg */}
        <path d="M 105 140 L 105 185 L 108 185 Q 115 185 115 180 L 115 140 Z" fill="url(#skin)" />
        
        {/* Base dress (if flower is equipped or no outfit, she needs a base dress) */}
        {(equippedAvatar === 'hero_flower' || !equippedAvatar) && (
          <path d="M 70 95 Q 100 105 130 95 L 140 145 Q 100 155 60 145 Z" fill="#4fa8d1" />
        )}

        {/* Neck */}
        <rect x="92" y="90" width="16" height="15" fill="url(#skin)" />

        {/* Head */}
        <path d="M 70 65 Q 70 30 100 30 Q 130 30 130 65 Q 130 100 100 105 Q 70 100 70 65 Z" fill="url(#skin)" />
        
        {/* Face Details */}
        {/* Eyes (Cute Anime Style) */}
        <ellipse cx="85" cy="68" rx="5" ry="8" fill="#2d1b19" />
        <circle cx="87" cy="65" r="2" fill="#fff" />
        <circle cx="84" cy="71" r="1" fill="#fff" />
        
        <ellipse cx="115" cy="68" rx="5" ry="8" fill="#2d1b19" />
        <circle cx="113" cy="65" r="2" fill="#fff" />
        <circle cx="116" cy="71" r="1" fill="#fff" />

        {/* Eyelashes */}
        <path d="M 79 64 Q 85 58 91 64" fill="none" stroke="#2d1b19" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 109 64 Q 115 58 121 64" fill="none" stroke="#2d1b19" strokeWidth="1.5" strokeLinecap="round" />

        {/* Mouth */}
        <path d="M 96 84 Q 100 89 104 84" fill="none" stroke="#aa5555" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Blush */}
        <circle cx="78" cy="78" r="6" fill="url(#blush)" />
        <circle cx="122" cy="78" r="6" fill="url(#blush)" />

        {/* Front Hair / Bangs */}
        {/* Soft, feathered see-through fringe with a gentle center part, swerving gracefully to the sides */}
        {/* Base hair cap/underlayer to avoid forehead skin showing through at the very top */}
        <path d="M 66 46 C 70 20 130 20 134 46 C 122 41 112 39 100 39 C 88 39 78 41 66 46 Z" fill="url(#hairDark)" />
        
        {/* Left-sweeping main locks */}
        <path d="M 97 34 C 88 35 76 43 71 55 C 77 53 82 52 86 49 C 91 44 95 39 97 34 Z" fill="url(#hairDark)" />
        <path d="M 87 34 C 79 36 71 43 67 56 C 70 53 74 52 77 49 C 82 44 85 39 87 34 Z" fill="url(#hairDark)" />
        
        {/* Right-sweeping main locks */}
        <path d="M 103 34 C 112 35 124 43 129 55 C 123 53 118 52 114 49 C 109 44 105 39 103 34 Z" fill="url(#hairDark)" />
        <path d="M 113 34 C 121 36 129 43 133 56 C 130 53 126 52 123 49 C 118 44 115 39 113 34 Z" fill="url(#hairDark)" />
        
        {/* Cute individual front hair wisps/strands overlay for natural depth and texture */}
        <path d="M 96 35 C 93 42 88 49 84 53" fill="none" stroke="#1a0f0a" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <path d="M 104 35 C 107 42 112 49 116 53" fill="none" stroke="#1a0f0a" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <path d="M 98 36 Q 98 46 96 50" fill="none" stroke="#1a0f0a" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M 102 36 Q 102 46 104 50" fill="none" stroke="#1a0f0a" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M 75 42 C 77 48 76 53 75 55" fill="none" stroke="#1a0f0a" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <path d="M 125 42 C 123 48 124 53 125 55" fill="none" stroke="#1a0f0a" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        
        {/* Side strands framing the face beautifully and falling straight down to shoulder length */}
        <path d="M 66 48 C 61 70 59 105 59 140 C 69 110 71 80 71 48 Z" fill="url(#hairDark)" />
        <path d="M 134 48 C 139 70 141 105 141 140 C 131 110 129 80 129 48 Z" fill="url(#hairDark)" />

        {/* --- HAIRSTYLES & ACCESSORIES (conditional) --- */}
        {equippedAvatar === 'hero_pink_kimono' ? (
          <g>
            {/* Traditional Sulan Elaborate Bun & Updo */}
            <path d="M 60 25 Q 100 -5 140 25 Q 150 -10 100 -20 Q 50 -10 60 25 Z" fill="url(#hairDark)" />
            <circle cx="100" cy="5" r="28" fill="url(#hairDark)" />
            <circle cx="82" cy="10" r="20" fill="url(#hairDark)" />
            <circle cx="118" cy="10" r="20" fill="url(#hairDark)" />
            
            {/* Hair Accessories (Flowers in Bun) */}
            <circle cx="100" cy="-5" r="8" fill="#dda0dd" />
            <circle cx="92" cy="-2" r="7" fill="#ffb6c1" />
            <circle cx="108" cy="-2" r="7" fill="#ffb6c1" />
            <circle cx="100" cy="4" r="7" fill="#ffb6c1" />
            <circle cx="100" cy="-2" r="3" fill="url(#gold)" />
            <circle cx="75" cy="15" r="6" fill="#ffb6c1" />
            <circle cx="125" cy="15" r="6" fill="#dda0dd" />
            
            {/* Dangling Gold Ornaments */}
            <path d="M 75 20 L 70 45 M 78 20 L 74 40 M 125 20 L 130 45 M 122 20 L 126 40" stroke="url(#gold)" strokeWidth="1.5" strokeDasharray="3,2" />

            {/* Face Paint / Gems - high-fidelity rhinestone pattern inspired by the photo */}
            {/* Left Eye Gems (viewer's left, slanting upwards/outwards) */}
            <path d="M 78 72 L 80 70 L 82 72 L 80 74 Z" fill="#ffffff" /> {/* center white diamond */}
            <circle cx="74" cy="73.5" r="1.5" fill="#fb923c" /> {/* orange/gold gem */}
            <circle cx="70" cy="74.5" r="1.2" fill="#f43f5e" /> {/* pink gem */}
            <circle cx="84" cy="71.5" r="1.3" fill="#c084fc" /> {/* purple gem */}
            <circle cx="88" cy="71" r="1.0" fill="#38bdf8" /> {/* blue gem */}

            {/* Right Eye Gems (viewer's right, slanting upwards/outwards) */}
            <path d="M 120 72 L 122 70 L 124 72 L 122 74 Z" fill="#ffffff" /> {/* center white diamond */}
            <circle cx="126" cy="73.5" r="1.5" fill="#fb923c" /> {/* orange/gold gem */}
            <circle cx="130" cy="74.5" r="1.2" fill="#f43f5e" /> {/* pink gem */}
            <circle cx="116" cy="71.5" r="1.3" fill="#c084fc" /> {/* purple gem */}
            <circle cx="112" cy="71" r="1.0" fill="#38bdf8" /> {/* blue gem */}
          </g>
        ) : equippedAvatar === 'hero_ninja' ? (
          <g>
            {/* Ninja Sleek Headband wrapping around the forehead */}
            <path d="M 64 45 Q 100 40 136 45 L 134 52 Q 100 47 66 52 Z" fill="#0f172a" />
            {/* Metal Plate */}
            <rect x="90" y="42" width="20" height="8" rx="2" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="0.5" />
            {/* Engraving on metal plate */}
            <circle cx="95" cy="46" r="1" fill="#475569" />
            <circle cx="105" cy="46" r="1" fill="#475569" />
            <path d="M 98 46 L 102 46" stroke="#475569" strokeWidth="1" />
            {/* Headband knot ribbons at the side */}
            <path d="M 64 48 Q 50 52 45 62 L 53 62 Z" fill="#0f172a" />
          </g>
        ) : equippedAvatar === 'hero_princess' ? (
          <g>
            {/* Elegant Princess Updo Bun (no traditional Chinese elements) */}
            <circle cx="100" cy="15" r="22" fill="url(#hairDark)" />
          </g>
        ) : equippedAvatar === 'hero_cyber' ? (
          <g>
            {/* Cyberpunk Neon Highlights / Hair Clips */}
            <path d="M 72 40 L 85 36" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" />
            <path d="M 128 40 L 115 36" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" />
            <circle cx="70" cy="38" r="2" fill="#ec4899" />
            <circle cx="130" cy="38" r="2" fill="#ec4899" />
          </g>
        ) : equippedAvatar === 'hero_flower' ? (
          <g>
            {/* Simple sweet single flower pinned behind her ear */}
            <g transform="translate(126, 45)">
              <circle cx="-5" cy="-5" r="5" fill="#fef08a" />
              <circle cx="5" cy="-5" r="5" fill="#fef08a" />
              <circle cx="-5" cy="5" r="5" fill="#fef08a" />
              <circle cx="5" cy="5" r="5" fill="#fef08a" />
              <circle cx="0" cy="0" r="4.5" fill="#facc15" />
            </g>
          </g>
        ) : (
          <g>
            {/* Plain pretty girl Nina hairstyle (Sishu & default) with a cute little side pink bow ribbon clip */}
            <g transform="translate(68, 42)">
              <path d="M -6 -4 Q -12 -8 -6 -12 Q -2 -10 -2 -6 Z M 6 -4 Q 12 -8 6 -12 Q 2 -10 2 -6 Z" fill="#f43f5e" />
              <circle cx="0" cy="-5" r="2.5" fill="#fff" />
            </g>
          </g>
        )}

        {/* Arms */}
        {/* Left Arm */}
        <path d="M 75 100 Q 50 115 45 140" fill="none" stroke="url(#skin)" strokeWidth="10" strokeLinecap="round" />
        {/* Right Arm */}
        <path d="M 125 100 Q 150 115 155 140" fill="none" stroke="url(#skin)" strokeWidth="10" strokeLinecap="round" />

        {/* --- OUTFITS (equippedAvatar) --- */}
        {equippedAvatar === 'hero_sulan' && (
          <g>
            {/* Sishu PE Uniform (Pink & Royal Blue) */}
            
            {/* Slender skin-colored bare legs */}
            <path d="M 83 140 L 97 140 L 97 172 L 83 172 Z" fill="url(#skin)" />
            <path d="M 103 140 L 117 140 L 117 172 L 103 172 Z" fill="url(#skin)" />
            
            {/* Royal Blue Cute Mini Shorts (Athletic & Loose-fitting) */}
            <path d="M 73 135 H 98 V 151 C 90 153 82 153 74 151 C 72 146 72 140 73 135 Z" fill="url(#sishuBlue)" />
            <path d="M 127 135 H 102 V 151 C 110 153 118 153 126 151 C 128 146 128 140 127 135 Z" fill="url(#sishuBlue)" />
            
            {/* White sneakers / shoes */}
            <path d="M 81 172 Q 81 169 88 169 L 92 169 Q 99 169 99 172 L 97 186 L 83 186 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
            <path d="M 101 172 Q 101 169 108 169 L 112 169 Q 119 169 119 172 L 117 186 L 103 186 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
            <path d="M 84 182 L 96 182" stroke="#cbd5e1" strokeWidth="1" />
            <path d="M 104 182 L 116 182" stroke="#cbd5e1" strokeWidth="1" />

            {/* Sishu Pink T-Shirt Base - Cute, Relaxed, and Symmetrical Drop-Shoulder Fit */}
            <path d="M 86 96 Q 100 113 114 96 Q 122 90 130 97.4 L 132 138 Q 100 144 68 138 L 70 97.4 Q 78 90 86 96 Z" fill="url(#sishuPink)" />
            
            {/* Sishu Royal Blue lower part of the T-shirt with stock market chart zigzag boundary */}
            <path d="M 70 126 L 98 110 L 112 123 L 130 118 L 132 138 Q 100 144 68 138 Z" fill="url(#sishuBlue)" />

            {/* White stock market chart separating line */}
            <path d="M 70 126 L 98 110 L 112 123 L 130 118" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* White "喜樹" Chinese text printed vertically on the chest */}
            <g transform="translate(116, 126)" style={{ userSelect: 'none' }}>
              <text x="0" y="0" fontSize="6.5" fontWeight="900" fill="#ffffff" fontFamily="system-ui, sans-serif" textAnchor="middle">喜</text>
              <text x="0" y="7" fontSize="6.5" fontWeight="900" fill="#ffffff" fontFamily="system-ui, sans-serif" textAnchor="middle">樹</text>
            </g>

            {/* Collar neckband fitting the chin shape perfectly */}
            <path d="M 86 96 Q 100 113 114 96" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}

        {equippedAvatar === 'hero_pink_kimono' && (
          <g>
            {/* Pink Sulan Details */}
            <path d="M 65 95 Q 100 105 135 95 L 150 170 Q 100 175 50 170 Z" fill="url(#kimonoPink)" />

            {/* Traditional Floral Patterns Scattered Gracefully */}
            {/* Flowers on the chest/shoulders */}
            <use href="#kimonoFlower" transform="translate(76, 104) scale(0.75) rotate(-10)" />
            <use href="#kimonoFlower" transform="translate(124, 104) scale(0.75) rotate(10)" />
            <use href="#cherryBlossom" transform="translate(70, 112) scale(0.65)" />
            <use href="#cherryBlossom" transform="translate(130, 112) scale(0.65)" />

            {/* Flowers on the skirt and lower body */}
            <use href="#kimonoFlower" transform="translate(68, 152) scale(1.1) rotate(15)" />
            <use href="#kimonoFlower" transform="translate(132, 154) scale(1.0) rotate(-25)" />
            <use href="#kimonoFlower" transform="translate(100, 160) scale(0.9) rotate(45)" />

            {/* Small scattered cherry blossoms & petals */}
            <use href="#cherryBlossom" transform="translate(84, 144) scale(0.8) rotate(12)" />
            <use href="#cherryBlossom" transform="translate(116, 144) scale(0.8) rotate(-15)" />
            <use href="#cherryBlossom" transform="translate(100, 142) scale(0.6) rotate(30)" />

            {/* Green leaves for contrast and decoration */}
            <use href="#kimonoLeaf" transform="translate(60, 146) rotate(-35) scale(0.7)" />
            <use href="#kimonoLeaf" transform="translate(140, 149) rotate(45) scale(0.7)" />
            <use href="#kimonoLeaf" transform="translate(92, 154) rotate(10) scale(0.6)" />
            <use href="#kimonoLeaf" transform="translate(108, 154) rotate(-20) scale(0.6)" />

            {/* Obi (Belt) */}
            <path d="M 70 115 Q 100 125 130 115 L 132 135 Q 100 145 68 135 Z" fill="#cc0066" />
            <circle cx="100" cy="128" r="4" fill="url(#gold)" />
            <path d="M 68 128 Q 100 138 132 128" fill="none" stroke="url(#gold)" strokeWidth="2" />
            
            {/* Sulan Collar */}
            <path d="M 80 95 L 100 115 L 120 95" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinejoin="round" />
            <path d="M 80 95 L 100 115 L 120 95" fill="none" stroke="#ff3377" strokeWidth="2" strokeLinejoin="round" />
          </g>
        )}

        {equippedAvatar === 'hero_ninja' && (
          <g>
            {/* Ninja Suit */}
            <path d="M 70 95 Q 100 105 130 95 L 140 160 Q 100 165 60 160 Z" fill="#1e293b" />
            <path d="M 85 95 L 100 115 L 115 95" fill="none" stroke="#dc2626" strokeWidth="4" strokeLinejoin="round" />
            <path d="M 65 130 Q 100 135 135 130 L 135 140 Q 100 145 65 140 Z" fill="#dc2626" />
            <path d="M 90 130 L 110 140 M 110 130 L 90 140" stroke="#000" strokeWidth="2" />
          </g>
        )}

        {equippedAvatar === 'hero_princess' && (
          <g>
            {/* Elegant Sheer / Lace Bell Sleeves draped under arms */}
            {/* Left drape */}
            <path d="M 75 95 Q 45 120 40 155 Q 60 145 70 115 Z" fill="#ffffff" opacity="0.4" />
            {/* Right drape */}
            <path d="M 125 95 Q 155 120 160 155 Q 140 145 130 115 Z" fill="#ffffff" opacity="0.4" />

            {/* A delicate pearl necklace */}
            <path d="M 90 92 Q 100 100 110 92" fill="none" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="100" cy="101" r="3" fill="#f43f5e" stroke="#ffe600" strokeWidth="0.5" />

            {/* Slender flowy A-line cascading underskirt */}
            <path d="M 82 130 Q 100 138 118 130 L 142 185 Q 100 190 58 185 Z" fill="url(#princessGrad)" />

            {/* Sparkling vertical central front dress panel (adds vertical line for slender appearance) */}
            <path d="M 94 133 L 88 185 L 112 185 L 106 133 Z" fill="#ffffff" opacity="0.65" />
            {/* Little sparkles on the central panel */}
            <circle cx="100" cy="145" r="1.5" fill="#fdf4ff" className="animate-pulse" />
            <circle cx="100" cy="160" r="1.5" fill="#fdf4ff" className="animate-pulse" />
            <circle cx="100" cy="175" r="1.5" fill="#fdf4ff" className="animate-pulse" />

            {/* Elegant high-waisted slender bodice */}
            <path d="M 72 95 Q 100 102 128 95 L 118 130 Q 100 138 82 130 Z" fill="url(#princessGrad)" stroke="#fae8ff" strokeWidth="0.5" />

            {/* Sweetheart neckline corset lace */}
            <path d="M 72 95 Q 100 112 128 95" fill="none" stroke="#fbcfe8" strokeWidth="3" />
            <path d="M 85 99 L 100 115 L 115 99" fill="none" stroke="url(#gold)" strokeWidth="1.5" />

            {/* Gold Waistband/V-belt accentuating the slender waist */}
            <path d="M 82 130 Q 100 138 118 130 L 118 133 Q 100 141 82 133 Z" fill="url(#gold)" />

            {/* Floating side overskirts / peplum drapery (adds movement and flow) */}
            <path d="M 82 130 Q 64 145 70 162 Q 90 152 100 135 Z" fill="#f472b6" opacity="0.75" />
            <path d="M 118 130 Q 136 145 130 162 Q 110 152 100 135 Z" fill="#f472b6" opacity="0.75" />

            {/* Crown (Tiara) */}
            <g transform="translate(82, 10)">
              {/* Tiara Base */}
              <path d="M 2 15 Q 18 10 34 15 L 34 18 Q 18 13 2 18 Z" fill="url(#gold)" />
              {/* Tiara Peaks */}
              <path d="M 4 15 L 8 2 L 14 12 L 18 -2 L 22 12 L 28 2 L 32 15 Z" fill="url(#gold)" stroke="#b45309" strokeWidth="0.5" />
              {/* Jewels */}
              <circle cx="8" cy="2" r="2" fill="#38bdf8" />
              <circle cx="18" cy="-2" r="2.5" fill="#f43f5e" />
              <circle cx="28" cy="2" r="2" fill="#38bdf8" />
              <circle cx="18" cy="7" r="1.5" fill="#ffffff" className="animate-pulse" />
            </g>
          </g>
        )}

        {equippedAvatar === 'hero_cyber' && (
          <g>
            {/* Cyberpunk Suit */}
            <path d="M 65 95 Q 100 105 135 95 L 145 160 Q 100 165 55 160 Z" fill="#0f172a" />
            <path d="M 80 95 L 90 130 L 110 130 L 120 95" fill="none" stroke="#06b6d4" strokeWidth="4" />
            <path d="M 70 110 L 130 110" fill="none" stroke="#eab308" strokeWidth="2" />
            <circle cx="100" cy="115" r="8" fill="#0ea5e9" />
            <circle cx="100" cy="115" r="4" fill="#fff" />
            {/* Cyber Glasses */}
            <path d="M 80 55 L 120 55 L 115 65 L 85 65 Z" fill="#0ea5e9" opacity="0.8" />
            <path d="M 80 55 L 120 55 L 115 65 L 85 65 Z" fill="none" stroke="#fff" strokeWidth="1" />
          </g>
        )}

        {equippedAvatar === 'hero_flower' && (
          <g>
            <path d="M 65 95 Q 100 105 135 95 L 145 165 Q 100 170 55 165 Z" fill="#bbf7d0" />
            {/* Flowers on dress */}
            <circle cx="80" cy="120" r="6" fill="#f472b6" />
            <circle cx="80" cy="120" r="2" fill="#fff" />
            <circle cx="120" cy="140" r="6" fill="#f472b6" />
            <circle cx="120" cy="140" r="2" fill="#fff" />
            <circle cx="100" cy="150" r="8" fill="#fb7185" />
            <circle cx="100" cy="150" r="3" fill="#fff" />
            {/* Elaborate Flower on head */}
            <g transform="translate(65, 35)">
              <circle cx="0" cy="-12" r="8" fill="#ff66b2" />
              <circle cx="11" cy="-4" r="8" fill="#ff66b2" />
              <circle cx="7" cy="9" r="8" fill="#ff66b2" />
              <circle cx="-7" cy="9" r="8" fill="#ff66b2" />
              <circle cx="-11" cy="-4" r="8" fill="#ff66b2" />
              <circle cx="0" cy="0" r="6" fill="url(#gold)" />
            </g>
          </g>
        )}
        
        {/* Sleeves depending on outfit */}
        {equippedAvatar === 'hero_sulan' && (
          <g>
            <path d="M 70 97.4 Q 58 106 48 119 Q 58 124 64 122 Q 68 113 70 97.4 Z" fill="url(#sishuPink)" />
            <path d="M 130 97.4 Q 142 106 152 119 Q 142 124 136 122 Q 132 113 130 97.4 Z" fill="url(#sishuPink)" />
          </g>
        )}
        {equippedAvatar === 'hero_pink_kimono' && (
          <g>
            {/* Left Sleeve */}
            <path d="M 70 95 Q 40 120 45 145 L 65 140 Z" fill="url(#kimonoPink)" />
            <use href="#kimonoFlower" transform="translate(53, 122) scale(0.65) rotate(-15)" />
            <use href="#cherryBlossom" transform="translate(56, 134) scale(0.55) rotate(30)" />
            <use href="#kimonoLeaf" transform="translate(48, 114) rotate(-45) scale(0.5)" />

            {/* Right Sleeve */}
            <path d="M 130 95 Q 160 120 155 145 L 135 140 Z" fill="url(#kimonoPink)" />
            <use href="#kimonoFlower" transform="translate(147, 122) scale(0.65) rotate(15)" />
            <use href="#cherryBlossom" transform="translate(144, 134) scale(0.55) rotate(-30)" />
            <use href="#kimonoLeaf" transform="translate(152, 114) rotate(45) scale(0.5)" />
          </g>
        )}
        {equippedAvatar === 'hero_ninja' && (
          <g>
            <path d="M 70 95 Q 50 110 40 125 L 55 130 Z" fill="#1e293b" />
            <path d="M 130 95 Q 150 110 160 125 L 145 130 Z" fill="#1e293b" />
          </g>
        )}
        {equippedAvatar === 'hero_princess' && (
          <g>
            {/* Elegant sheer off-the-shoulder ruffle cuffs */}
            <path d="M 72 95 Q 60 102 52 107 L 62 114 Z" fill="#ffffff" opacity="0.6" />
            <path d="M 128 95 Q 140 102 148 107 L 138 114 Z" fill="#ffffff" opacity="0.6" />
            
            {/* Tiny gold arm bands */}
            <path d="M 72 95 L 68 97" stroke="url(#gold)" strokeWidth="1.5" />
            <path d="M 128 95 L 132 97" stroke="url(#gold)" strokeWidth="1.5" />
          </g>
        )}
        {equippedAvatar === 'hero_cyber' && (
          <g>
            <path d="M 70 95 Q 52 105 46 118 L 62 122 Z" fill="#0f172a" />
            <path d="M 130 95 Q 148 105 154 118 L 138 122 Z" fill="#0f172a" />
            <path d="M 45 130 L 45 140" fill="none" stroke="#0ea5e9" strokeWidth="10" strokeLinecap="round" />
            <path d="M 155 130 L 155 140" fill="none" stroke="#0ea5e9" strokeWidth="10" strokeLinecap="round" />
          </g>
        )}
        {equippedAvatar === 'hero_flower' && (
          <g>
            <path d="M 70 95 Q 52 105 46 118 L 62 122 Z" fill="#bbf7d0" />
            <path d="M 130 95 Q 148 105 154 118 L 138 122 Z" fill="#bbf7d0" />
          </g>
        )}

        {/* --- PETS / ACCESSORIES (equippedPet) --- */}
        {equippedPet === 'pet_fan' && (
          <g transform="translate(155, 120)">
            {/* Green Fan in Right Hand, illustrative */}
            <path d="M 0 20 L 30 -10 A 30 30 0 0 1 45 15 Z" fill="#2ecc71" />
            <path d="M 0 20 L 40 5 A 25 25 0 0 1 42 22 Z" fill="#a8e6cf" />
            <path d="M 0 20 L 30 -10" stroke="#f1c40f" strokeWidth="1" />
            <path d="M 0 20 L 45 15" stroke="#f1c40f" strokeWidth="1" />
            <circle cx="0" cy="20" r="3" fill="url(#gold)" />
          </g>
        )}

        {equippedPet === 'pet_lantern' && (
          <g transform="translate(45, 130)">
            {/* Red Lantern hanging from Left Hand */}
            <rect x="-1" y="0" width="2" height="15" fill="#333" />
            <ellipse cx="0" cy="30" rx="14" ry="20" fill="url(#sulanDress)" />
            <path d="M -14 30 Q 0 35 14 30" fill="none" stroke="#fff" strokeWidth="1" opacity="0.4" />
            <path d="M -10 20 Q 0 25 10 20" fill="none" stroke="#fff" strokeWidth="1" opacity="0.4" />
            <path d="M -10 40 Q 0 45 10 40" fill="none" stroke="#fff" strokeWidth="1" opacity="0.4" />
            <rect x="-8" y="10" width="16" height="4" fill="url(#gold)" />
            <rect x="-8" y="46" width="16" height="4" fill="url(#gold)" />
            {/* Tassel */}
            <path d="M 0 50 L -3 65 M 0 50 L 0 68 M 0 50 L 3 65" stroke="#cc0000" strokeWidth="1.5" />
          </g>
        )}
        </g>

        {equippedPet === 'pet_cat' && (
          <g transform="translate(0, 175)">
            <motion.g 
              animate={{ 
                x: [20, 160, 160, 20, 20],
                scaleX: [1, 1, -1, -1, 1] 
              }} 
              transition={{ repeat: Infinity, duration: 8, ease: "linear", times: [0, 0.45, 0.5, 0.95, 1] }}
            >
              {/* Body */}
              <ellipse cx="0" cy="0" rx="14" ry="10" fill="#f59e0b" />
              {/* Tail */}
              <motion.path 
                d="M -12 -5 Q -25 -20 -15 -25" 
                fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
              />
              {/* Legs */}
              <motion.line x1="-8" y1="8" x2="-8" y2="15" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" animate={{ y2: [15, 12, 15] }} transition={{ repeat: Infinity, duration: 0.4 }} />
              <motion.line x1="-3" y1="9" x2="-3" y2="15" stroke="#d97706" strokeWidth="3" strokeLinecap="round" animate={{ y2: [12, 15, 12] }} transition={{ repeat: Infinity, duration: 0.4 }} />
              <motion.line x1="5" y1="9" x2="5" y2="15" stroke="#d97706" strokeWidth="3" strokeLinecap="round" animate={{ y2: [15, 12, 15] }} transition={{ repeat: Infinity, duration: 0.4 }} />
              <motion.line x1="10" y1="8" x2="10" y2="15" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" animate={{ y2: [12, 15, 12] }} transition={{ repeat: Infinity, duration: 0.4 }} />
              {/* Head */}
              <circle cx="12" cy="-8" r="9" fill="#f59e0b" />
              {/* Ears */}
              <path d="M 6 -13 L 4 -22 L 12 -15 Z" fill="#f59e0b" />
              <path d="M 18 -13 L 20 -22 L 14 -16 Z" fill="#f59e0b" />
              {/* Face */}
              <circle cx="15" cy="-9" r="1.5" fill="#000" />
              <circle cx="9" cy="-9" r="1.5" fill="#000" />
              <path d="M 11 -6 L 12 -5 L 13 -6" fill="none" stroke="#000" strokeWidth="1" />
            </motion.g>
          </g>
        )}

        {equippedPet === 'pet_dog' && (
          <g transform="translate(0, 175)">
            <motion.g 
              animate={{ 
                x: [160, 20, 20, 160, 160],
                scaleX: [-1, -1, 1, 1, -1] 
              }} 
              transition={{ repeat: Infinity, duration: 7, ease: "linear", times: [0, 0.45, 0.5, 0.95, 1] }}
            >
              {/* Body */}
              <ellipse cx="0" cy="0" rx="16" ry="11" fill="#8b5a2b" />
              {/* Tail */}
              <motion.path 
                d="M -15 -2 Q -25 5 -22 -10" 
                fill="none" stroke="#8b5a2b" strokeWidth="4" strokeLinecap="round"
                animate={{ rotate: [-20, 20, -20] }}
                transition={{ repeat: Infinity, duration: 0.3, ease: "easeInOut" }}
                style={{ transformOrigin: '-15px -2px' }}
              />
              {/* Legs */}
              <motion.line x1="-10" y1="8" x2="-10" y2="16" stroke="#8b5a2b" strokeWidth="4" strokeLinecap="round" animate={{ y2: [16, 12, 16] }} transition={{ repeat: Infinity, duration: 0.4 }} />
              <motion.line x1="-4" y1="9" x2="-4" y2="16" stroke="#5c3a21" strokeWidth="4" strokeLinecap="round" animate={{ y2: [12, 16, 12] }} transition={{ repeat: Infinity, duration: 0.4 }} />
              <motion.line x1="6" y1="9" x2="6" y2="16" stroke="#5c3a21" strokeWidth="4" strokeLinecap="round" animate={{ y2: [16, 12, 16] }} transition={{ repeat: Infinity, duration: 0.4 }} />
              <motion.line x1="12" y1="8" x2="12" y2="16" stroke="#8b5a2b" strokeWidth="4" strokeLinecap="round" animate={{ y2: [12, 16, 12] }} transition={{ repeat: Infinity, duration: 0.4 }} />
              {/* Head */}
              <ellipse cx="14" cy="-8" rx="11" ry="10" fill="#8b5a2b" />
              {/* Ears */}
              <path d="M 6 -12 Q -2 -15 2 -3 Z" fill="#5c3a21" />
              <path d="M 22 -12 Q 30 -15 26 -3 Z" fill="#5c3a21" />
              {/* Face */}
              <circle cx="17" cy="-10" r="1.5" fill="#000" />
              <circle cx="11" cy="-10" r="1.5" fill="#000" />
              <circle cx="14" cy="-6" r="2.5" fill="#000" />
              <path d="M 14 -4 Q 14 -1 17 -2" fill="none" stroke="#ffb6c1" strokeWidth="2" strokeLinecap="round" />
            </motion.g>
          </g>
        )}


        {equippedPet === 'pet_phoenix' && (
          <g transform="translate(40, 40)">
            <motion.g animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
              <path d="M 10 20 Q 20 0 35 15 Q 20 30 5 25 Z" fill="#ef4444" />
              <path d="M 15 22 Q 25 5 30 15 Q 20 25 10 25 Z" fill="#f59e0b" />
              <circle cx="25" cy="12" r="6" fill="#dc2626" />
              <circle cx="27" cy="10" r="1.5" fill="#000" />
              <path d="M 30 12 L 35 10 L 30 15 Z" fill="#fbbf24" />
              <path d="M 5 25 Q -15 35 0 50" fill="none" stroke="#ef4444" strokeWidth="3" />
              <path d="M 0 50 Q -5 45 5 35" fill="none" stroke="#f59e0b" strokeWidth="2" />
              <path d="M 20 5 Q 15 -10 25 -15 Q 30 -5 25 5 Z" fill="#ef4444" />
              <path d="M 22 5 Q 18 -5 25 -8 Q 28 0 25 5 Z" fill="#f59e0b" />
            </motion.g>
          </g>
        )}

      </svg>
    </div>
  );
}
