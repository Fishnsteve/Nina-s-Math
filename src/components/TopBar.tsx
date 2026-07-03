import { useGame } from '../context/GameContext';
import { Heart, Coins, Gem, Shield, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import { translations } from '../i18n';
import { audioEngine } from '../utils/audio';
import { useState } from 'react';

export function TopBar() {
  const { coins, gems, hearts, level, xp, language, setLanguage } = useGame();
  const t = translations[language];
  const nextLevelXp = level * 100 + (level * level * 20);
  const progress = (xp / nextLevelXp) * 100;

  const [muted, setMuted] = useState(audioEngine.getIsMuted());

  const toggleMuted = () => {
    const nextMuted = audioEngine.toggleMute();
    setMuted(nextMuted);
  };

  const toggleLanguage = () => {
    audioEngine.play('click');
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="bg-slate-950/85 backdrop-blur-md sticky top-0 z-50 px-4 py-2.5 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Level & XP inside a elegant modern capsule */}
        <div className="flex items-center gap-2 shrink-0 bg-white/5 backdrop-blur-md rounded-full pl-1 pr-3 py-1 border border-white/10 select-none">
          <div className="relative">
            <Shield className="w-8 h-8 text-indigo-400 fill-indigo-950/80 drop-shadow-[0_2px_6px_rgba(99,102,241,0.4)]" />
            <span className="absolute inset-0 flex items-center justify-center font-black text-indigo-100 text-[11px]">
              {level}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="h-1.5 w-14 bg-slate-950 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-[9px] text-blue-300 font-bold mt-0.5 tracking-wider whitespace-nowrap">
              {xp}/{nextLevelXp} {t.topbar.xp}
            </div>
          </div>
        </div>

        {/* Currencies & Language & Sound */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide hide-scrollbar select-none">
          <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/10 shrink-0">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span className="font-bold text-white text-xs leading-none">{hearts}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/10 shrink-0">
            <Coins className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-bold text-white text-xs leading-none">{coins}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/10 shrink-0">
            <Gem className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span className="font-bold text-white text-xs leading-none">{gems}</span>
          </div>
          <button 
            onClick={toggleLanguage}
            className="flex items-center justify-center w-7 h-7 bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-500/20 shrink-0 hover:bg-indigo-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-[10px] font-black">{language === 'en' ? 'EN' : '中'}</span>
          </button>
          <button 
            onClick={toggleMuted}
            className="flex items-center justify-center w-7 h-7 bg-pink-500/10 text-pink-300 rounded-full border border-pink-500/20 shrink-0 hover:bg-pink-500/25 active:scale-95 transition-all cursor-pointer"
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>
    </div>
  );
}
