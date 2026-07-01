import { useGame } from '../context/GameContext';
import { Heart, Coins, Gem, Shield, Languages } from 'lucide-react';
import { motion } from 'motion/react';
import { translations } from '../i18n';

export function TopBar() {
  const { coins, gems, hearts, level, xp, language, setLanguage } = useGame();
  const t = translations[language];
  const nextLevelXp = level * 100 + (level * level * 20);
  const progress = (xp / nextLevelXp) * 100;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="bg-white/5 backdrop-blur-md sticky top-0 z-50 px-4 py-3 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Level & XP */}
        <div className="flex items-center gap-2 flex-1 max-w-[150px]">
          <div className="relative">
            <Shield className="w-10 h-10 text-indigo-400 fill-indigo-900/50" />
            <span className="absolute inset-0 flex items-center justify-center font-bold text-indigo-100 text-sm">
              {level}
            </span>
          </div>
          <div className="flex-1">
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-[10px] text-blue-300 font-semibold mt-0.5 uppercase tracking-wider">
              {xp} / {nextLevelXp} {t.topbar.xp}
            </div>
          </div>
        </div>

        {/* Currencies & Language */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 border border-white/10 shrink-0">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            <span className="font-bold text-white text-xs">{hearts}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 border border-white/10 shrink-0">
            <Coins className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span className="font-bold text-white text-xs">{coins}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 border border-white/10 shrink-0">
            <Gem className="w-5 h-5 text-emerald-400 fill-emerald-400" />
            <span className="font-bold text-white text-xs">{gems}</span>
          </div>
          <button 
            onClick={toggleLanguage}
            className="flex items-center justify-center w-8 h-8 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30 shrink-0 hover:bg-indigo-500/40 transition-colors"
          >
            <span className="text-xs font-bold">{language === 'en' ? 'EN' : '中'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
