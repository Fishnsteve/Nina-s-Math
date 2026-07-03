import { Map, User, Music } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { translations } from '../i18n';
import { motion, AnimatePresence } from 'motion/react';
import { audioEngine } from '../utils/audio';

interface BottomNavProps {
  currentTab: 'map' | 'studio' | 'profile';
  setTab: (tab: 'map' | 'studio' | 'profile') => void;
}

export function BottomNav({ currentTab, setTab }: BottomNavProps) {
  const { language } = useGame();
  const t = translations[language];

  const tabs = [
    { id: 'map', label: t.nav.map, icon: Map, color: '#ff8c00' },
    { id: 'studio', label: t.nav.studio, icon: Music, color: '#ff007f' },
    { id: 'profile', label: t.nav.profile, icon: User, color: '#8b5cf6' },
  ] as const;

  const activeIndex = tabs.findIndex((tab) => tab.id === currentTab);

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-[#0c0d14] pb-safe z-50 transition-all duration-300"
      style={{ 
        boxShadow: `0 -10px 30px ${tabs[activeIndex].color}15, 0 -15px 35px rgba(0,0,0,0.6)`
      }}
    >
      {/* Seamless Continuous SVG Border and Protrusion (Clipped horizontally to screen width) */}
      <div className="absolute -top-[23.5px] left-0 right-0 h-[24px] overflow-hidden pointer-events-none z-10">
        <motion.div
          className="absolute top-0 h-[24px] pointer-events-none overflow-visible"
          style={{ width: '6202.9px' }}
          animate={{ 
            left: `${activeIndex * 33.333 + 16.666}%`,
            x: '-50%'
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          <svg 
            viewBox="-3000 -22 6202.9 46" 
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Solid background fill to blend seamlessly with the bottom navigation bar */}
            <path 
              d="M -3000 24 L 0 24 c 5.7 0.1, 14.1-0.4, 23.3-4 c 5.7-2.3, 9.9-5, 18.1-10.5 c 10.7-7.1, 11.8-9.2, 20.6-14.3 c 5-2.9, 9.2-5.2, 15.2-7 c 7.1-2.1, 13.3-2.3, 17.6-2.1 c 4.2-0.2, 10.5,0.1, 17.6,2.1 c 6.1,1.8, 10.2,4.1, 15.2,7 c 8.8,5, 9.9,7.1, 20.6,14.3 c 8.3,5.5, 12.4,8.2, 18.1,10.5 c 9.2,3.6, 17.6,4.2, 23.3,4 L 3202.9 24 L 3202.9 150 L -3000 150 Z" 
              fill="#0c0d14" 
              stroke="none"
            />
            {/* Beautiful, uniform continuous neon border line */}
            <path 
              d="M -3000 24 L 0 24 c 5.7 0.1, 14.1-0.4, 23.3-4 c 5.7-2.3, 9.9-5, 18.1-10.5 c 10.7-7.1, 11.8-9.2, 20.6-14.3 c 5-2.9, 9.2-5.2, 15.2-7 c 7.1-2.1, 13.3-2.3, 17.6-2.1 c 4.2-0.2, 10.5,0.1, 17.6,2.1 c 6.1,1.8, 10.2,4.1, 15.2,7 c 8.8,5, 9.9,7.1, 20.6,14.3 c 8.3,5.5, 12.4,8.2, 18.1,10.5 c 9.2,3.6, 17.6,4.2, 23.3,4 L 3202.9 24" 
              fill="none" 
              stroke={tabs[activeIndex].color} 
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-colors duration-300"
              style={{
                filter: `drop-shadow(0px -2px 3px ${tabs[activeIndex].color}60)`
              }}
            />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-md mx-auto h-16 relative px-4 flex justify-around items-center">
        
        {/* Unified Sliding Active Bubble background (Z-indexed above the background curve to avoid cropping) */}
        <motion.div
          className="absolute w-12 h-12 rounded-full z-20 shadow-[0_5px_15px_rgba(0,0,0,0.35)] pointer-events-none"
          style={{ 
            y: -34,
          }}
          animate={{ 
            left: `${activeIndex * 33.333 + 16.666}%`,
            x: '-50%',
            backgroundColor: tabs[activeIndex].color,
            boxShadow: `0 4px 18px ${tabs[activeIndex].color}70`
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        />

        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                if (!isActive) {
                  audioEngine.play('nav');
                }
                setTab(tab.id as any);
              }}
              className="flex-1 flex flex-col items-center justify-center h-full relative cursor-pointer outline-none focus:outline-none select-none z-30"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {/* Icon Container with motion */}
              <motion.div
                animate={{ y: isActive ? -34 : 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                className="w-10 h-10 flex items-center justify-center rounded-full"
              >
                <Icon 
                  className={`w-5 h-5 transition-all duration-300 ${
                    isActive 
                      ? "stroke-white stroke-[2.5]" 
                      : "stroke-slate-400 stroke-[1.8] hover:stroke-slate-200"
                  }`} 
                />
              </motion.div>

              {/* Label below */}
              <motion.span 
                animate={{ 
                  opacity: isActive ? 0 : 0.6,
                  scale: isActive ? 0.8 : 1,
                  y: isActive ? 5 : 0
                }}
                transition={{ duration: 0.2 }}
                className="text-[10px] font-extrabold tracking-wider text-slate-300 select-none absolute bottom-1.5"
              >
                {tab.label}
              </motion.span>
            </button>
          );
        })}
      </div>
      
      {/* Discreet Developer Signature */}
      <div className="text-center pb-1 text-[9px] font-semibold text-slate-700/60 font-mono tracking-widest select-none pointer-events-none">
        made by Steven
      </div>
    </div>
  );
}
