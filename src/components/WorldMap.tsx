import { ZONES } from '../data/curriculum';
import { useGame } from '../context/GameContext';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { cn } from '../lib/utils';
import { translations } from '../i18n';

export function WorldMap({ onSelectZone }: { onSelectZone: (zoneId: string) => void }) {
  const { unlockedZones, level, completedLevels, language } = useGame();
  const t = translations[language];

  const trainingZones = ZONES.filter(z => z.type === 'training');
  const kingdomZones = ZONES.filter(z => z.type === 'kingdom');

  return (
    <div className="min-h-screen pb-32 pt-6 px-4 flex flex-col items-center overflow-y-auto">
      <div className="w-full max-w-lg mb-8">
        <h1 className="text-3xl font-black text-white drop-shadow-md text-center">{t.map.welcome}</h1>
      </div>
      
      {/* Training Grounds Section */}
      <div className="w-full max-w-lg mb-4 text-center">
        <h2 className="text-xl font-bold text-slate-300 uppercase tracking-widest">{language === 'en' ? 'Training Grounds' : '訓練場'}</h2>
        <p className="text-sm text-slate-400 mb-8">{language === 'en' ? 'Practice concepts to earn XP' : '練習概念以獲得經驗值'}</p>
      </div>

      <div className="w-full max-w-lg relative mb-16">
        {/* Background path line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-4 bg-white/5 -translate-x-1/2 rounded-full z-0" />
        
        {trainingZones.map((zone, index) => {
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
                  {isUnlocked && (
                    <motion.div 
                      className="absolute inset-0 z-0"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
                    </motion.div>
                  )}
                  {isLockedByLevel ? (
                    <Icons.Lock className="w-8 h-8" />
                  ) : (
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                      className="relative z-10"
                    >
                      <IconComponent className="w-8 h-8 drop-shadow-md" />
                    </motion.div>
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

      {/* Starred Kingdoms Section */}
      <div className="w-full max-w-lg mb-4 text-center mt-8">
        <h2 className="text-2xl font-black text-amber-300 uppercase tracking-widest drop-shadow-md flex items-center justify-center gap-2">
          <Icons.Star className="w-6 h-6 fill-amber-300" />
          {language === 'en' ? 'Starred Kingdoms' : '星辰王國'}
          <Icons.Star className="w-6 h-6 fill-amber-300" />
        </h2>
        <p className="text-sm text-amber-200/70 mb-8">{language === 'en' ? 'Complete challenges for coins & gems!' : '完成挑戰獲得金幣與寶石！'}</p>
      </div>

      <div className="w-full max-w-lg relative mb-16">
        {/* Background path line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-4 bg-amber-500/20 -translate-x-1/2 rounded-full z-0" />
        
        {kingdomZones.map((zone, index) => {
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
              <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-slate-900 border-4 border-amber-500/50 rounded-full -translate-x-1/2 -translate-y-1/2 z-0 shadow-lg shadow-amber-500/20" />
              <button
                onClick={() => isUnlocked && onSelectZone(zone.id)}
                disabled={!isUnlocked}
                className={cn(
                  "w-3/4 rounded-[32px] p-4 transition-transform active:scale-95 relative overflow-hidden backdrop-blur-md shadow-xl border-2",
                  isUnlocked ? "bg-amber-900/40 border-amber-500/40 hover:bg-amber-900/60 cursor-pointer shadow-[0_0_30px_rgba(245,158,11,0.15)]" : "bg-slate-900/60 border-slate-700/50 opacity-80 cursor-not-allowed"
                )}
              >
                <div className={cn(
                  "w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(255,255,255,0.2)] border-4 border-white/20 ring-4 ring-white/10 text-white z-10 relative bg-gradient-to-br",
                  isUnlocked ? zone.color : "from-slate-700 to-slate-800 grayscale"
                )}>
                  {isUnlocked && (
                    <motion.div 
                      className="absolute inset-0 z-0"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
                    </motion.div>
                  )}
                  {isLockedByLevel ? (
                    <Icons.Lock className="w-8 h-8" />
                  ) : (
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                      className="relative z-10"
                    >
                      <IconComponent className="w-8 h-8 drop-shadow-md" />
                    </motion.div>
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
