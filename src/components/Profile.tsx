import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, Flame, Star, Target, Download, Share2, PlusSquare, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { translations } from '../i18n';
import { NinaAvatar } from './NinaAvatar';
import { audioEngine } from '../utils/audio';

export function Profile() {
  const { xp, level, currentStreak, maxStreak, stars, completedLevels, language, equippedAvatar } = useGame();
  const t = translations[language];

  const outfitsMap = {
    hero_sulan: language === 'en' ? 'Sulan' : '素蘭',
    hero_pink_kimono: language === 'en' ? 'Kimono' : '和服',
    hero_ninja: language === 'en' ? 'Ninja' : '忍者',
    hero_flower: language === 'en' ? 'Flower' : '花朵',
    hero_princess: language === 'en' ? 'Princess' : '公主',
    hero_cyber: language === 'en' ? 'Cyber' : '賽博',
  };

  const costumeName = outfitsMap[equippedAvatar as keyof typeof outfitsMap] || (language === 'en' ? 'Dancer' : '舞者');
  const profileTitle = `${costumeName} Nina`;
  
  const [canInstall, setCanInstall] = useState<boolean>(!!(window as any).getDeferredPrompt?.());
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);

  useEffect(() => {
    setCanInstall(!!(window as any).getDeferredPrompt?.());
    setIsStandalone(
      window.matchMedia('(display-mode: standalone)').matches || 
      (navigator as any).standalone === true
    );
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);

    const handlePwaInstallable = () => {
      setCanInstall(!!(window as any).getDeferredPrompt?.());
    };

    window.addEventListener('pwa-installable', handlePwaInstallable);
    
    const handleAppInstalled = () => {
      setIsStandalone(true);
      setCanInstall(false);
      (window as any).clearDeferredPrompt?.();
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('pwa-installable', handlePwaInstallable);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    audioEngine.play('click');
    const promptEvent = (window as any).getDeferredPrompt?.();
    if (!promptEvent) return;
    
    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    console.log(`User choice outcome: ${outcome}`);
    
    (window as any).clearDeferredPrompt?.();
    setCanInstall(false);
  };
  
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
          <h2 className="text-2xl font-black text-white tracking-tight">{profileTitle}</h2>
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

        {/* PWA Home Screen Installation Section */}
        <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/5 backdrop-blur-lg rounded-[32px] p-6 shadow-xl border border-pink-500/20 mt-6 relative overflow-hidden">
          {/* Decorative glowing background item */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl -z-10 pointer-events-none" />
          
          <h3 className="font-black text-sm uppercase tracking-widest text-pink-300 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
            {language === 'en' ? 'Install to Home Screen' : '安裝至主畫面'}
          </h3>

          {isStandalone ? (
            <div className="flex items-start gap-4 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-300 text-sm">
                  {language === 'en' ? 'Already Installed!' : '已成功安裝！'}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {language === 'en' 
                    ? "Nina's Math Quest is running directly from your home screen as an immersive full-screen application." 
                    : "《Nina's Math Quest》已成功安裝，您正直接從主畫面啟動此全螢幕沉浸式遊戲。"}
                </p>
              </div>
            </div>
          ) : canInstall ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-200 leading-relaxed">
                {language === 'en' 
                  ? "Launch Nina's Quest directly from your home screen! Tap install to save the app with our high-definition Pink Kimono Nina icon." 
                  : "直接從主畫面啟動 Nina 的冒險！點擊下方安裝，即可使用專屬粉紅和服 Nina 高畫質圖示快速啟動遊戲。"}
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleInstallClick}
                className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-sm rounded-2xl shadow-[0_4px_20px_rgba(244,63,94,0.3)] hover:shadow-[0_4px_25px_rgba(244,63,94,0.45)] transition-all flex items-center justify-center gap-2 border border-pink-400/20"
              >
                <Download className="w-4 h-4" />
                {language === 'en' ? 'Install Nina\'s Math Quest' : '立即安裝遊戲'}
              </motion.button>
            </div>
          ) : isIOS ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-200 leading-relaxed">
                {language === 'en' 
                  ? "iOS devices don't support one-click installations, but you can easily add Nina to your home screen:" 
                  : "iOS 系統不支援一鍵自動安裝，但您可以透過以下簡單步驟將 Nina 新增至主畫面："}
              </p>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-pink-500/20 text-pink-300 font-bold rounded-full flex items-center justify-center text-xs shrink-0">1</span>
                  <span className="leading-relaxed">
                    {language === 'en' ? 'Tap the Share button ' : '點擊瀏覽器下方的分享按鈕 '}
                    <Share2 className="w-4 h-4 inline mx-1 text-pink-400" />
                    {language === 'en' ? 'in your Safari bar.' : '（在 Safari 工具列中）。'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-pink-500/20 text-pink-300 font-bold rounded-full flex items-center justify-center text-xs shrink-0">2</span>
                  <span className="leading-relaxed">
                    {language === 'en' ? 'Scroll down and select ' : '向下捲動選單並選擇 '}
                    <span className="font-bold text-white flex items-center gap-1 inline-flex bg-white/10 px-2 py-0.5 rounded text-[11px] align-middle">
                      <PlusSquare className="w-3.5 h-3.5 text-pink-400" />
                      {language === 'en' ? 'Add to Home Screen' : '加入主畫面'}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-slate-200 leading-relaxed">
                {language === 'en' 
                  ? "Launch directly from your home screen with a full-screen display and our custom Nina with Pink Kimono icon!" 
                  : "在手機或電腦主畫面建立捷徑，享受滿版全螢幕視野與粉紅和服 Nina 專屬的高清遊戲圖示！"}
              </p>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-xs text-slate-300 space-y-2">
                <p className="font-semibold text-pink-300">
                  {language === 'en' ? 'Quick Install Tip:' : '如何手動安裝：'}
                </p>
                <p className="leading-relaxed">
                  {language === 'en' 
                    ? "Click the browser menu (usually three dots ⋮ or a direct install icon ⊕ in the address bar) and select 'Install' or 'Add to Home Screen' to save." 
                    : "點選瀏覽器選單（右上角的三個點 ⋮ 或網址列右側的 ⊕ 圖示），接著選擇「安裝」或「新增至主畫面」即可完成。"}
                </p>
              </div>
            </div>
          )}
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
