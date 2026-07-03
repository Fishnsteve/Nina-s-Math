import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'motion/react';
import { translations } from '../i18n';
import { Lock, Sparkles, Check, Diamond, Coins } from 'lucide-react';
import { cn } from '../lib/utils';
import { NinaAvatar } from './NinaAvatar';

export function DanceStudio() {
  const { level, language, equippedAvatar, equippedPet, equippedBackground, equipItem, inventory, buyItem } = useGame();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'outfits' | 'accessories' | 'backgrounds'>('outfits');

  const outfits = [
    { id: 'hero_sulan', icon: '💃', level: 1, name: language === 'en' ? 'Sulan' : '素蘭', price: 0, currency: 'coins' as const },
    { id: 'hero_pink_kimono', icon: '👘', level: 2, name: language === 'en' ? 'Kimono' : '和服', price: 150, currency: 'coins' as const },
    { id: 'hero_ninja', icon: '🥷', level: 4, name: language === 'en' ? 'Ninja' : '忍者', price: 300, currency: 'coins' as const },
    { id: 'hero_flower', icon: '🌸', level: 6, name: language === 'en' ? 'Flower' : '花朵', price: 500, currency: 'coins' as const },
    { id: 'hero_princess', icon: '👑', level: 8, name: language === 'en' ? 'Princess' : '公主', price: 1000, currency: 'coins' as const },
    { id: 'hero_cyber', icon: '🤖', level: 10, name: language === 'en' ? 'Cyber' : '賽博', price: 2000, currency: 'coins' as const },
  ];

  const accessories = [
    { id: 'pet_fan', icon: '🪭', type: 'pet', name: language === 'en' ? 'Fan' : '扇子', price: 100, currency: 'coins' as const },
    { id: 'pet_lantern', icon: '🏮', type: 'pet', name: language === 'en' ? 'Lantern' : '燈籠', price: 250, currency: 'coins' as const },
    { id: 'pet_cat', icon: '🐈', type: 'pet', name: language === 'en' ? 'Cat' : '貓咪', price: 600, currency: 'coins' as const },
    { id: 'pet_dog', icon: '🐕', type: 'pet', name: language === 'en' ? 'Dog' : '小狗', price: 800, currency: 'coins' as const },
    { id: 'pet_dragon', icon: '🐉', type: 'pet', name: language === 'en' ? 'Dragon' : '神龍', price: 1500, currency: 'coins' as const },
    { id: 'pet_phoenix', icon: '🔥', type: 'pet', name: language === 'en' ? 'Phoenix' : '鳳凰', price: 3000, currency: 'coins' as const },
  ];

  const backgrounds = [
    { id: 'bg_default', icon: '🌌', type: 'background', name: language === 'en' ? 'Cosmic' : '宇宙', price: 0, currency: 'coins' as const },
    { id: 'bg_forest', icon: '🌲', type: 'background', name: language === 'en' ? 'Forest' : '森林', price: 200, currency: 'coins' as const },
    { id: 'bg_castle', icon: '🏰', type: 'background', name: language === 'en' ? 'Castle' : '城堡', price: 500, currency: 'coins' as const },
    { id: 'bg_ocean', icon: '🌊', type: 'background', name: language === 'en' ? 'Ocean' : '海洋', price: 1000, currency: 'coins' as const },
    { id: 'bg_cyber', icon: '🏙️', type: 'background', name: language === 'en' ? 'Cyber' : '賽博城市', price: 2500, currency: 'coins' as const },
  ];

  const getBackgroundClass = (bgId: string) => {
    switch (bgId) {
      case 'bg_forest': return 'from-emerald-900/60 to-black/80';
      case 'bg_castle': return 'from-amber-900/40 to-slate-900/80';
      case 'bg_ocean': return 'from-cyan-900/50 to-blue-900/80';
      case 'bg_cyber': return 'from-fuchsia-900/40 to-indigo-900/80';
      default: return 'from-blue-900/20 to-black/60';
    }
  };

  return (
    <div className={cn("h-[100dvh] w-full relative overflow-hidden bg-gradient-to-b pb-20 transition-colors duration-1000", getBackgroundClass(equippedBackground))}>
      {/* 2D Avatar Background - Center Focus */}
      <div className="absolute inset-0 z-0 flex items-start justify-center pointer-events-none pt-24 sm:pt-32">
        <motion.div 
          className="w-[90vw] max-w-[500px] aspect-square -mt-8 sm:mt-0"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <NinaAvatar />
        </motion.div>
      </div>

      {/* Header text */}
      <div className="absolute top-6 left-0 right-0 z-10 text-center pointer-events-none px-4">
        <h1 className="text-3xl font-black text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-1">
          {t.studio.title}
        </h1>
      </div>

      {/* Bottom Dock Controls */}
      <div className="absolute inset-x-0 bottom-24 z-10 pointer-events-auto px-4 flex flex-col items-center">
        
        {/* Tabs */}
        <div className="flex bg-black/40 backdrop-blur-md p-1 rounded-full mb-3 shadow-lg">
          <button 
            onClick={() => setActiveTab('outfits')}
            className={cn("px-4 py-1.5 rounded-full text-xs font-bold transition-all", activeTab === 'outfits' ? "bg-pink-500/80 text-white shadow-md" : "text-slate-300 hover:text-white")}
          >
            {t.studio.outfits}
          </button>
          <button 
            onClick={() => setActiveTab('accessories')}
            className={cn("px-4 py-1.5 rounded-full text-xs font-bold transition-all", activeTab === 'accessories' ? "bg-emerald-500/80 text-white shadow-md" : "text-slate-300 hover:text-white")}
          >
            {language === 'en' ? 'Accessories' : '配件'}
          </button>
          <button 
            onClick={() => setActiveTab('backgrounds')}
            className={cn("px-4 py-1.5 rounded-full text-xs font-bold transition-all", activeTab === 'backgrounds' ? "bg-purple-500/80 text-white shadow-md" : "text-slate-300 hover:text-white")}
          >
            {language === 'en' ? 'Backgrounds' : '背景'}
          </button>
        </div>

        {/* Scrollable Items Container */}
        <div className="w-full max-w-lg bg-black/30 backdrop-blur-md rounded-3xl p-3 border border-white/10 shadow-xl">
          <div className="flex overflow-x-auto gap-3 pb-2 pt-1 px-1 hide-scrollbar snap-x">
            
            {activeTab === 'outfits' && outfits.map(outfit => {
              const isUnlocked = level >= outfit.level || inventory.includes(outfit.id);
              const isEquipped = equippedAvatar === outfit.id;
              
              return (
                <button 
                  key={outfit.id} 
                  onClick={() => {
                    if (isUnlocked) {
                      equipItem(outfit.id, 'character');
                    } else {
                      buyItem(outfit.id, outfit.price, outfit.currency);
                    }
                  }}
                  className={cn(
                    "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center gap-1 border text-center transition-all shrink-0 snap-center relative",
                    isEquipped ? "bg-pink-500/40 border-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.6)] scale-105" :
                    isUnlocked ? "bg-white/10 border-white/20 hover:bg-white/20 active:scale-95" : "bg-black/40 border-white/5 opacity-80"
                  )}>
                  <div className={cn("text-2xl sm:text-3xl drop-shadow-md", !isUnlocked && "grayscale opacity-50")}>{outfit.icon}</div>
                  
                  {isUnlocked ? (
                    <div className="font-bold text-[9px] sm:text-[10px] text-white leading-tight">{outfit.name}</div>
                  ) : (
                    <div className="flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold text-amber-300">
                      {outfit.price}
                      <Coins className="w-2.5 h-2.5 fill-amber-300" />
                    </div>
                  )}

                  {isEquipped && (
                    <div className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full p-1 shadow-md">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}

            {activeTab === 'accessories' && (
              <>
                <button 
                  onClick={() => equipItem('', 'pet')}
                  className={cn(
                    "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center gap-1 border text-center transition-all shrink-0 snap-center relative",
                    equippedPet === '' ? "bg-emerald-500/40 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)] scale-105" :
                    "bg-white/10 border-white/20 hover:bg-white/20 active:scale-95"
                  )}>
                  <div className="font-bold text-[10px] sm:text-xs text-white leading-tight">None</div>
                </button>
                {accessories.map(acc => {
                  const isUnlocked = inventory.includes(acc.id);
                  const isEquipped = equippedPet === acc.id;
                  
                  return (
                    <button 
                      key={acc.id} 
                      onClick={() => {
                        if (isUnlocked) {
                          equipItem(acc.id, 'pet');
                        } else {
                          buyItem(acc.id, acc.price, acc.currency);
                        }
                      }}
                      className={cn(
                        "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center gap-1 border text-center transition-all shrink-0 snap-center relative",
                        isEquipped ? "bg-emerald-500/40 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)] scale-105" :
                        isUnlocked ? "bg-white/10 border-white/20 hover:bg-white/20 active:scale-95" : "bg-black/40 border-white/5 opacity-80"
                      )}>
                      <div className={cn("text-2xl sm:text-3xl drop-shadow-md", !isUnlocked && "grayscale opacity-50")}>{acc.icon}</div>
                      
                      {isUnlocked ? (
                        <div className="font-bold text-[9px] sm:text-[10px] text-white leading-tight">{acc.name}</div>
                      ) : (
                        <div className="flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold text-amber-300">
                          {acc.price}
                          <Coins className="w-2.5 h-2.5 fill-amber-300" />
                        </div>
                      )}

                      {isEquipped && (
                        <div className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow-md">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </>
            )}

            {activeTab === 'backgrounds' && backgrounds.map(bg => {
              const isUnlocked = inventory.includes(bg.id) || bg.id === 'bg_default';
              const isEquipped = equippedBackground === bg.id;
              
              return (
                <button 
                  key={bg.id} 
                  onClick={() => {
                    if (isUnlocked) {
                      equipItem(bg.id, 'background');
                    } else {
                      buyItem(bg.id, bg.price, bg.currency);
                    }
                  }}
                  className={cn(
                    "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center gap-1 border text-center transition-all shrink-0 snap-center relative",
                    isEquipped ? "bg-purple-500/40 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.6)] scale-105" :
                    isUnlocked ? "bg-white/10 border-white/20 hover:bg-white/20 active:scale-95" : "bg-black/40 border-white/5 opacity-80"
                  )}>
                  <div className={cn("text-2xl sm:text-3xl drop-shadow-md", !isUnlocked && "grayscale opacity-50")}>{bg.icon}</div>
                  
                  {isUnlocked ? (
                    <div className="font-bold text-[9px] sm:text-[10px] text-white leading-tight">{bg.name}</div>
                  ) : (
                    <div className="flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold text-amber-300">
                      {bg.price}
                      <Coins className="w-2.5 h-2.5 fill-amber-300" />
                    </div>
                  )}

                  {isEquipped && (
                    <div className="absolute -top-1 -right-1 bg-purple-500 text-white rounded-full p-1 shadow-md">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
