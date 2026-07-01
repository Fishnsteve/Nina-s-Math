import { useGame } from '../context/GameContext';
import { Trophy, Flame, Star, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { translations } from '../i18n';
import { NinaAvatar } from './NinaAvatar';

export function Profile() {
  const { xp, level, currentStreak, maxStreak, stars, completedLevels, language } = useGame();
  const t = translations[language];
  
  const totalQuestionsAnswered = Object.values(completedLevels).reduce((acc, curr) => acc + curr, 0) * 3; // Approx

  return (
    <div className="min-h-screen pb-32 pt-6 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header Avatar */}
        <div className="bg-white/5 backdrop-blur-lg rounded-[32px] p-6 shadow-xl border border-white/10 flex flex-col items-center">
          <div className="w-48 h-48 mb-4 relative">
            <NinaAvatar />
            <div className="absolute bottom-2 right-2 z-20 bg-gradient-to-tr from-pink-500 to-rose-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-black border-2 border-white/20 shadow-lg text-lg">
              {level}
            </div>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">{t.profile.title}</h2>
          <p className="text-pink-300/80 font-bold text-sm tracking-widest uppercase mt-1">XP: {xp}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 backdrop-blur-lg p-4 rounded-[24px] border border-white/10 shadow-lg flex items-center gap-4">
            <div className="p-3 bg-orange-500/20 rounded-2xl text-orange-400 border border-orange-500/30">
              <Flame className="w-6 h-6 fill-orange-400" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{currentStreak}</div>
              <div className="text-xs text-blue-200/60 font-bold uppercase tracking-wider">{t.profile.dayStreak}</div>
            </div>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 backdrop-blur-lg p-4 rounded-[24px] border border-white/10 shadow-lg flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400 border border-amber-500/30">
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{stars}</div>
              <div className="text-xs text-blue-200/60 font-bold uppercase tracking-wider">{t.profile.totalStars}</div>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 backdrop-blur-lg p-4 rounded-[24px] border border-white/10 shadow-lg flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400 border border-emerald-500/30">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{totalQuestionsAnswered}</div>
              <div className="text-xs text-blue-200/60 font-bold uppercase tracking-wider">{t.profile.questions}</div>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 backdrop-blur-lg p-4 rounded-[24px] border border-white/10 shadow-lg flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-2xl text-purple-400 border border-purple-500/30">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{maxStreak}</div>
              <div className="text-xs text-blue-200/60 font-bold uppercase tracking-wider">{t.profile.bestStreak}</div>
            </div>
          </motion.div>
        </div>

        {/* Achievements Placeholder */}
        <div className="bg-white/5 backdrop-blur-lg rounded-[32px] p-6 shadow-xl border border-white/10 mt-6">
          <h3 className="font-black text-sm uppercase tracking-widest text-pink-400 mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" /> 
            {t.profile.recentAchievements}
          </h3>
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-12 h-12 bg-pink-500/20 border border-pink-400/20 rounded-full flex items-center justify-center text-xl shadow-[0_0_15px_rgba(244,114,182,0.2)]">
                  {i === 1 ? '🏅' : i === 2 ? '🔥' : '⭐'}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {i === 1 ? (language === 'en' ? 'First Steps' : '初試啼聲') : 
                     i === 2 ? (language === 'en' ? 'On Fire' : '火力全開') : 
                     (language === 'en' ? 'Star Collector' : '星星收藏家')}
                  </h4>
                  <p className="text-[11px] text-pink-200/60 mt-0.5">{t.profile.unlockedYesterday}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
