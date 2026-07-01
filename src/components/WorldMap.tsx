import { ZONES } from '../data/curriculum';
import { useGame } from '../context/GameContext';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { cn } from '../lib/utils';
import { translations } from '../i18n';

export function WorldMap({ onSelectZone }: { onSelectZone: (zoneId: string) => void }) {
  const { unlockedZones, level, completedLevels, language } = useGame();
  const t = translations[language];

  return (
    <div className="min-h-screen pb-32 pt-6 px-4 flex flex-col items-center">
      <div className="w-full max-w-lg mb-8">
        <h1 className="text-3xl font-black text-white drop-shadow-md text-center">{t.map.welcome}</h1>
      </div>
      
      <div className="w-full max-w-lg relative">
        {/* Background path line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-4 bg-white/5 -translate-x-1/2 rounded-full z-0" />
        
        {ZONES.map((zone, index) => {
          const isLockedByLevel = level < zone.requiredLevel;
          const isUnlocked = unlockedZones.includes(zone.id) || !isLockedByLevel;
          // Dynamically get the icon component
          const IconComponent = (Icons as any)[zone.icon] || Icons.MapPin;
          
          const isEven = index % 2 === 0;
          const stars = completedLevels[zone.id] || 0;

          return (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative z-10 flex w-full my-8",
                isEven ? "justify-start pr-12" : "justify-end pl-12"
              )}
            >
              {/* Connector dot */}
              <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-slate-800 border-4 border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 z-0 shadow-lg" />

              <button
                onClick={() => isUnlocked && onSelectZone(zone.id)}
                disabled={!isUnlocked}
                className={cn(
                  "w-3/4 rounded-[32px] p-4 transition-transform active:scale-95 relative overflow-hidden backdrop-blur-md shadow-xl border",
                  isUnlocked ? "bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer" : "bg-white/5 border-white/5 opacity-60 cursor-not-allowed grayscale"
                )}
              >
                <div className={cn(
                  "w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(255,255,255,0.2)] border-4 border-white/20 ring-4 ring-white/10 text-white z-10 relative bg-gradient-to-br",
                  isUnlocked ? zone.color : "from-slate-700 to-slate-800 grayscale"
                )}>
                  {isLockedByLevel ? (
                    <Icons.Lock className="w-8 h-8" />
                  ) : (
                    <IconComponent className="w-8 h-8 drop-shadow-md" />
                  )}
                </div>
                
                <h3 className="font-bold text-center text-white text-lg drop-shadow-md relative z-10">{zone.name[language]}</h3>
                
                {isUnlocked ? (
                  <div className="flex justify-center gap-1 mt-2 relative z-10">
                    {[1, 2, 3].map(star => (
                      <Icons.Star 
                        key={star} 
                        className={cn(
                          "w-5 h-5",
                          star <= stars ? "fill-yellow-400 text-yellow-300 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" : "fill-white/10 text-white/20"
                        )} 
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-center text-red-400 font-bold mt-2 relative z-10 drop-shadow-md">
                    {t.map.locked} {zone.requiredLevel}
                  </p>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
