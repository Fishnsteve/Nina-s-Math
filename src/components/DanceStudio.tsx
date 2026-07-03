import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'motion/react';
import { translations } from '../i18n';
import { Lock, Sparkles, Check, Diamond, Coins } from 'lucide-react';
import { cn } from '../lib/utils';
import { NinaAvatar } from './NinaAvatar';
import { BackgroundVisuals } from './BackgroundVisuals';

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
    <div className="flex flex-col h-[100dvh] w-full relative transition-colors duration-1000 bg-transparent pb-24 px-4 overflow-hidden">
      
      {/* Header section (strictly non-absolute, fits cleanly) */}
      <div className="pt-6 pb-2 text-center shrink-0 z-10 select-none">
        <h1 className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] tracking-wide">
          {t.studio.title}
        </h1>
      </div>

      {/* Avatar Stage (Dynamic growing container that fits the middle space perfectly) */}
      <div className="flex-1 min-h-0 w-full flex items-center justify-center relative z-0 pointer-events-none">
        <motion.div 
          className="h-full max-h-[50dvh] aspect-square flex items-center justify-center relative"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <NinaAvatar className="w-full h-full" />
        </motion.div>
      </div>

      {/* Bottom HUD Controls (Floating and extremely space-efficient circle bubbles) */}
      <div className="shrink-0 w-full max-w-lg mx-auto z-10 pointer-events-auto flex flex-col items-center gap-4">
        
        {/* Beautiful Glassmorphic Tab Selectors */}
        <div className="flex bg-black/60 backdrop-blur-lg p-1 rounded-full shadow-lg border border-white/10 w-fit">
          <button 
            onClick={() => setActiveTab('outfits')}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-black tracking-wide transition-all duration-300", 
              activeTab === 'outfits' 
                ? "bg-pink-500 text-white shadow-[0_2px_8px_rgba(236,72,153,0.5)]" 
                : "text-slate-300 hover:text-white"
            )}
          >
            {t.studio.outfits}
          </button>
          <button 
            onClick={() => setActiveTab('accessories')}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-black tracking-wide transition-all duration-300", 
              activeTab === 'accessories' 
                ? "bg-emerald-500 text-white shadow-[0_2px_8px_rgba(16,185,129,0.5)]" 
                : "text-slate-300 hover:text-white"
            )}
          >
            {language === 'en' ? 'Accessories' : '配件'}
          </button>
          <button 
            onClick={() => setActiveTab('backgrounds')}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-black tracking-wide transition-all duration-300", 
              activeTab === 'backgrounds' 
                ? "bg-purple-500 text-white shadow-[0_2px_8px_rgba(139,92,246,0.5)]" 
                : "text-slate-300 hover:text-white"
            )}
          >
            {language === 'en' ? 'Backgrounds' : '背景'}
          </button>
        </div>

        {/* Floating Circle Islands Carousel (No container, fully transparent backgrounds) */}
        <div className="w-full relative select-none">
          <div className="flex overflow-x-auto gap-4 py-2 px-6 hide-scrollbar snap-x scroll-smooth justify-start sm:justify-center">
            
            {activeTab === 'outfits' && outfits.map(outfit => {
              const isUnlocked = inventory.includes(outfit.id) || outfit.price === 0;
              const meetsLevel = level >= outfit.level;
              const isEquipped = equippedAvatar === outfit.id;
              
              return (
                <div key={outfit.id} className="flex flex-col items-center gap-1.5 shrink-0 snap-center">
                  <button 
                    onClick={() => {
                      if (isUnlocked) {
                        equipItem(outfit.id, 'character');
                      } else if (meetsLevel) {
                        buyItem(outfit.id, outfit.price, outfit.currency);
                      }
                    }}
                    className={cn(
                      "w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border text-center transition-all relative cursor-pointer shadow-lg",
                      isEquipped 
                        ? "bg-pink-500/30 border-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.6)] scale-110" 
                        : isUnlocked 
                          ? "bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30 active:scale-95" 
                          : "bg-black/60 border-white/5 opacity-70"
                    )}
                  >
                    <span className={cn("text-2xl sm:text-3xl drop-shadow-md", !isUnlocked && "grayscale opacity-50")}>
                      {outfit.icon}
                    </span>
                    
                    {isEquipped && (
                      <div className="absolute -top-0.5 -right-0.5 bg-pink-500 text-white rounded-full p-0.5 shadow-md border border-white/20">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                    {!isUnlocked && !meetsLevel && (
                      <div className="absolute -bottom-0.5 -right-0.5 bg-slate-800 text-slate-400 rounded-full p-0.5 border border-white/10 shadow-md">
                        <Lock className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </button>
                  
                  <div className="text-[10px] font-black text-white/95 leading-tight text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                    {isUnlocked ? outfit.name : meetsLevel ? (
                      <span className="flex items-center gap-0.5 text-amber-300">
                        {outfit.price}
                        <Coins className="w-2.5 h-2.5 fill-amber-300" />
                      </span>
                    ) : (
                      <span className="text-slate-400">Lv {outfit.level}</span>
                    )}
                  </div>
                </div>
              );
            })}

            {activeTab === 'accessories' && (
              <>
                <div className="flex flex-col items-center gap-1.5 shrink-0 snap-center">
                  <button 
                    onClick={() => equipItem('', 'pet')}
                    className={cn(
                      "w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border text-center transition-all relative cursor-pointer shadow-lg",
                      equippedPet === '' 
                        ? "bg-emerald-500/30 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)] scale-110" 
                        : "bg-white/10 border-white/20 hover:bg-white/15 active:scale-95"
                    )}
                  >
                    <span className="text-xl drop-shadow">❌</span>
                  </button>
                  <div className="text-[10px] font-black text-white/95 leading-tight text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                    {language === 'en' ? 'None' : '無'}
                  </div>
                </div>
                
                {accessories.map(acc => {
                  const isUnlocked = inventory.includes(acc.id);
                  const isEquipped = equippedPet === acc.id;
                  
                  return (
                    <div key={acc.id} className="flex flex-col items-center gap-1.5 shrink-0 snap-center">
                      <button 
                        onClick={() => {
                          if (isUnlocked) {
                            equipItem(acc.id, 'pet');
                          } else {
                            buyItem(acc.id, acc.price, acc.currency);
                          }
                        }}
                        className={cn(
                          "w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border text-center transition-all relative cursor-pointer shadow-lg",
                          isEquipped 
                            ? "bg-emerald-500/30 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)] scale-110" 
                            : isUnlocked 
                              ? "bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30 active:scale-95" 
                              : "bg-black/60 border-white/5 opacity-70"
                        )}
                      >
                        <span className={cn("text-2xl sm:text-3xl drop-shadow-md", !isUnlocked && "grayscale opacity-50")}>
                          {acc.icon}
                        </span>
                        
                        {isEquipped && (
                          <div className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-white rounded-full p-0.5 shadow-md border border-white/20">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                      
                      <div className="text-[10px] font-black text-white/95 leading-tight text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                        {isUnlocked ? acc.name : (
                          <span className="flex items-center gap-0.5 text-amber-300">
                            {acc.price}
                            <Coins className="w-2.5 h-2.5 fill-amber-300" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {activeTab === 'backgrounds' && backgrounds.map(bg => {
              const isUnlocked = inventory.includes(bg.id) || bg.id === 'bg_default';
              const isEquipped = equippedBackground === bg.id;
              
              return (
                <div key={bg.id} className="flex flex-col items-center gap-1.5 shrink-0 snap-center">
                  <button 
                    onClick={() => {
                      if (isUnlocked) {
                        equipItem(bg.id, 'background');
                      } else {
                        buyItem(bg.id, bg.price, bg.currency);
                      }
                    }}
                    className={cn(
                      "w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border text-center transition-all relative cursor-pointer shadow-lg",
                      isEquipped 
                        ? "bg-purple-500/30 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.6)] scale-110" 
                        : isUnlocked 
                          ? "bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30 active:scale-95" 
                          : "bg-black/60 border-white/5 opacity-70"
                    )}
                  >
                    <span className={cn("text-2xl sm:text-3xl drop-shadow-md", !isUnlocked && "grayscale opacity-50")}>
                      {bg.icon}
                    </span>
                    
                    {isEquipped && (
                      <div className="absolute -top-0.5 -right-0.5 bg-purple-500 text-white rounded-full p-0.5 shadow-md border border-white/20">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                  
                  <div className="text-[10px] font-black text-white/95 leading-tight text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                    {isUnlocked ? bg.name : (
                      <span className="flex items-center gap-0.5 text-amber-300">
                        {bg.price}
                        <Coins className="w-2.5 h-2.5 fill-amber-300" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
