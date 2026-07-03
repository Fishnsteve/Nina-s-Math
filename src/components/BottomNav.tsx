import { Map, User, Music } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { translations } from '../i18n';
import { motion, AnimatePresence } from 'motion/react';

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
    <div className="fixed bottom-0 left-0 right-0 bg-[#0c0d14] border-t border-white/5 pb-safe z-50 shadow-[0_-15px_35px_rgba(0,0,0,0.6)]">
      <div className="max-w-md mx-auto h-16 relative px-4 flex justify-around items-center">
        
        {/* Gooey Animated Border (High-Fidelity SVG Bridge) */}
        <motion.div
          className="absolute -top-[23px] left-0 h-[24px] w-1/3 pointer-events-none z-10"
          animate={{ x: `${activeIndex * 100}%` }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          <svg 
            viewBox="0 0 202.9 45.5" 
            className="w-full h-full overflow-visible" 
            preserveAspectRatio="none"
          >
            {/* Solid background bridge shape */}
            <path 
              d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7 c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5 c9.2,3.6,17.6,4.2,23.3,4H6.7z" 
              fill="#0c0d14" 
              stroke="none"
            />
            {/* Glowing neon stroke on top edge ONLY */}
            <path 
              d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7 c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5 c9.2,3.6,17.6,4.2,23.3,4" 
              fill="none" 
              stroke={tabs[activeIndex].color} 
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-all duration-300"
              style={{
                filter: `drop-shadow(0px -3px 5px ${tabs[activeIndex].color}80)`
              }}
            />
          </svg>
        </motion.div>

        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id as any)}
              className="flex-1 flex flex-col items-center justify-center h-full relative cursor-pointer outline-none focus:outline-none select-none z-20"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {/* Active Bubble Glow (slides or fades elegantly) */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeBubble"
                    className="absolute w-12 h-12 rounded-full -z-10 shadow-[0_5px_15px_rgba(0,0,0,0.35)]"
                    style={{ 
                      backgroundColor: tab.color,
                      boxShadow: `0 4px 18px ${tab.color}70`
                    }}
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: -34 }}
                    exit={{ scale: 0, y: 10 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                  />
                )}
              </AnimatePresence>

              {/* Icon Container with motion */}
              <motion.div
                animate={{ y: isActive ? -34 : 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 24 }}
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
    </div>
  );
}
