import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, Flame, Star, Target, Download, Share2, PlusSquare, CheckCircle2, Sparkles, Lock, Unlock, ExternalLink, Award, MessageCircle, Instagram, Facebook, Gift } from 'lucide-react';
import { motion } from 'motion/react';
import { translations } from '../i18n';
import { NinaAvatar } from './NinaAvatar';
import { audioEngine } from '../utils/audio';

const COLLECTIBLE_IDS = [
  'hero_pink_kimono', 'hero_ninja', 'hero_flower', 'hero_princess', 'hero_cyber',
  'pet_fan', 'pet_lantern', 'pet_cat', 'pet_dog', 'pet_dragon', 'pet_phoenix',
  'bg_forest', 'bg_castle', 'bg_ocean', 'bg_cyber'
];

interface AchievementItem {
  id: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  target: number;
  current: (state: any) => number;
  reward: { 
    coins: number; 
    gems: number; 
    isLineAccess?: boolean; 
    isInstagramAccess?: boolean; 
    isFacebookAccess?: boolean;
    isMysteryGift?: boolean;
  };
  rewardLabel: { en: string; zh: string };
  icon: string;
}

const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'first_steps',
    title: { en: 'First Steps', zh: '初試啼聲' },
    description: { en: 'Complete your first zone level', zh: '完成你的第一個關卡' },
    target: 1,
    current: (state: any) => Object.keys(state.completedLevels || {}).length,
    reward: { coins: 50, gems: 0 },
    rewardLabel: { en: '+50 Coins 🪙', zh: '+50 金幣 🪙' },
    icon: '🏅',
  },
  {
    id: 'steven_instagram',
    title: { en: "Steven's Inner Circle", zh: 'Steven 的潮流圈子' },
    description: { en: 'Reach Level 15 to unlock direct Instagram access to Steven!', zh: '達到等級 15，解鎖並追蹤 Steven 的個人 Instagram 精彩生活！' },
    target: 15,
    current: (state: any) => state.level || 1,
    reward: { coins: 150, gems: 2, isInstagramAccess: true },
    rewardLabel: { en: '🔓 150 Coins, 2 Gems & Follow Steven on IG!', zh: '🔓 150 金幣、2 寶石 & 追蹤 Steven IG！' },
    icon: '📸',
  },
  {
    id: 'star_chaser',
    title: { en: 'Star Chaser', zh: '星星獵人' },
    description: { en: 'Collect 3 stars from levels', zh: '從關卡中累積獲得 3 顆星星' },
    target: 3,
    current: (state: any) => state.stars || 0,
    reward: { coins: 0, gems: 5 },
    rewardLabel: { en: '+5 Gems 💎', zh: '+5 寶石 💎' },
    icon: '⭐',
  },
  {
    id: 'streak_master',
    title: { en: 'Streak Master', zh: '每日狂熱' },
    description: { en: 'Reach a 3-day active streak', zh: '達到 3 天以上的連續登入狀態' },
    target: 3,
    current: (state: any) => Math.max(state.currentStreak || 0, state.maxStreak || 0),
    reward: { coins: 100, gems: 0 },
    rewardLabel: { en: '+100 Coins 🪙', zh: '+100 金幣 🪙' },
    icon: '🔥',
  },
  {
    id: 'steven_line',
    title: { en: "Steven's Elite Circle", zh: 'Steven 的核心舞伴' },
    description: { en: 'Reach Level 3 to unlock direct personal LINE chat access to Steven!', zh: '達到等級 3，即獲取 Steven 的個人 LINE 專屬好友通道！' },
    target: 3,
    current: (state: any) => state.level || 1,
    reward: { coins: 200, gems: 5, isLineAccess: true },
    rewardLabel: { en: '🔓 200 Coins, 5 Gems & Add Steven on LINE!', zh: '🔓 200 金幣、5 寶石 ＆ 開啟 Steven LINE 帳號！' },
    icon: '✨',
  },
  {
    id: 'avid_shopper',
    title: { en: 'Apprentice Shopper', zh: '時尚新星' },
    description: { en: 'Own at least 3 items in your collection', zh: '在收藏庫中擁有至少 3 件服裝或寵物' },
    target: 3,
    current: (state: any) => state.inventory?.length || 0,
    reward: { coins: 100, gems: 0 },
    rewardLabel: { en: '+100 Coins 🪙', zh: '+100 金幣 🪙' },
    icon: '🛍️',
  },
  {
    id: 'steven_facebook',
    title: { en: "Steven's Global Network", zh: 'Steven 的全球好友網' },
    description: { en: 'Collect all 36 stars from levels to unlock Steven\'s personal Facebook profile!', zh: '累積獲得全部 36 顆關卡星星，解鎖 Steven 的個人臉書，成為社群好友！' },
    target: 36,
    current: (state: any) => state.stars || 0,
    reward: { coins: 150, gems: 2, isFacebookAccess: true },
    rewardLabel: { en: '🔓 150 Coins, 2 Gems & Add Steven on Facebook!', zh: '🔓 150 金幣、2 寶石 & 加 Steven 臉書好友！' },
    icon: '🌐',
  },
  {
    id: 'ultimate_collector',
    title: { en: 'Ultimate Collector', zh: '終極收藏大師' },
    description: { en: 'Unlock exclusive profile backdrop by purchasing all 12 items', zh: '收集商店內全部 12 款限定服裝與寵物' },
    target: 12,
    current: (state: any) => state.inventory?.filter((id: string) => COLLECTIBLE_IDS.includes(id)).length || 0,
    reward: { coins: 300, gems: 10, isMysteryGift: true },
    rewardLabel: { en: '+300 Coins, +10 Gems & Mystery Gift 🎁', zh: '+300 金幣、+10 寶石 & 神秘實體禮物 🎁' },
    icon: '🔮',
  }
];

export function Profile() {
  const { 
    xp, level, currentStreak, maxStreak, stars, completedLevels, language, equippedAvatar, inventory,
    claimedAchievements = [], claimAchievement 
  } = useGame();
  const t = translations[language];

  const purchasedCount = COLLECTIBLE_IDS.filter(id => inventory.includes(id)).length;
  const totalCount = COLLECTIBLE_IDS.length;
  const hasAllCollectibles = purchasedCount === totalCount;

  const outfitsMap = {
    hero_sulan: language === 'en' ? 'Sishu' : '喜樹',
    hero_pink_kimono: language === 'en' ? 'Sulan' : '素蘭',
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
    <div className="w-full pb-32 pt-6 px-4 relative overflow-hidden flex flex-col">
      {/* Immersive Sulan Dancer Background Art - Only appears when all collectibles are purchased */}
      {hasAllCollectibles && (
        <div 
          className="fixed inset-0 z-0 opacity-40 pointer-events-none bg-cover bg-no-repeat bg-center mix-blend-screen"
          style={{ 
            backgroundImage: `url('/src/assets/images/profile_bg_1783148219481.jpg')`,
          }}
        />
      )}
      
      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        
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
                  ? "Launch Nina's Quest directly from your home screen! Tap install to save the app with our high-definition Pink Sulan Nina icon." 
                  : "直接從主畫面啟動 Nina 的冒險！點擊下方安裝，即可使用專屬粉紅素蘭 Nina 高畫質圖示快速啟動遊戲。"}
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
                  ? "Launch directly from your home screen with a full-screen display and our custom Nina with Pink Sulan icon!" 
                  : "在手機或電腦主畫面建立捷徑，享受滿版全螢幕視野與粉紅素蘭 Nina 專屬的高清遊戲圖示！"}
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

        {/* Achievements Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-[32px] p-6 shadow-xl border border-white/10 mt-6">
          <h3 className="font-black text-sm uppercase tracking-widest text-pink-400 mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400 animate-bounce" /> 
            {language === 'en' ? 'Quest Achievements' : '冒險成就與專屬獎勵'}
          </h3>
          <p className="text-xs text-slate-300 mb-5 leading-relaxed">
            {language === 'en' 
              ? 'Complete learning milestones to earn exclusive coin rewards, gems, and access to Steven\'s LINE chat!' 
              : '達成各項數學與學習里程碑，即可領取金幣、寶石，甚至解鎖 Steven 的個人專屬 LINE 帳號！'}
          </p>

          <div className="space-y-4">
            {ACHIEVEMENTS.map(achievement => {
              const currentVal = achievement.current({ 
                completedLevels, 
                stars, 
                currentStreak, 
                maxStreak, 
                inventory, 
                level 
              });
              const isCompleted = currentVal >= achievement.target;
              const isClaimed = claimedAchievements.includes(achievement.id);
              const progressPercent = Math.min(100, Math.floor((currentVal / achievement.target) * 100));

              return (
                <div 
                  key={achievement.id} 
                  className={`relative flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                    isClaimed 
                      ? 'bg-emerald-950/20 border-emerald-500/20 opacity-90' 
                      : isCompleted
                      ? 'bg-pink-950/20 border-pink-400/40 shadow-[0_0_15px_rgba(244,114,182,0.15)]'
                      : 'bg-white/5 border-white/5'
                  }`}
                >
                  {/* Badge & Icon */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border transition-all ${
                      isClaimed 
                        ? 'bg-emerald-500/20 border-emerald-400/30' 
                        : isCompleted
                        ? 'bg-pink-500/30 border-pink-400/50 text-2xl animate-pulse shadow-[0_0_12px_rgba(244,114,182,0.3)]'
                        : 'bg-slate-800/40 border-slate-700/30 grayscale'
                    }`}>
                      {achievement.icon}
                    </div>
                    
                    {/* Small screen label */}
                    <div className="md:hidden flex-1">
                      <h4 className={`font-bold text-sm ${isCompleted ? 'text-pink-300 font-black' : 'text-white'}`}>
                        {language === 'en' ? achievement.title.en : achievement.title.zh}
                      </h4>
                      <div className="text-[11px] font-bold text-pink-400/80 uppercase tracking-wider">
                        {language === 'en' ? achievement.rewardLabel.en : achievement.rewardLabel.zh}
                      </div>
                    </div>
                  </div>

                  {/* Info and Progress Bar */}
                  <div className="flex-1 min-w-0">
                    {/* Title & Reward Info - Desktop Screen */}
                    <div className="hidden md:flex md:items-center justify-between gap-2 mb-1">
                      <h4 className={`font-bold text-base ${isCompleted ? 'text-pink-300 font-black' : 'text-white'}`}>
                        {language === 'en' ? achievement.title.en : achievement.title.zh}
                      </h4>
                      <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                        isClaimed 
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-pink-500/10 text-pink-300 animate-pulse'
                      }`}>
                        {language === 'en' ? achievement.rewardLabel.en : achievement.rewardLabel.zh}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                      {language === 'en' ? achievement.description.en : achievement.description.zh}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-slate-400">
                        <span>
                          {isClaimed 
                            ? (language === 'en' ? 'CLAIMED' : '已領取獎勵') 
                            : isCompleted 
                            ? (language === 'en' ? 'UNLOCKED' : '已達成') 
                            : (language === 'en' ? 'IN PROGRESS' : '進行中')}
                        </span>
                        <span>{Math.min(achievement.target, currentVal)} / {achievement.target}</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          className={`h-full rounded-full ${
                            isClaimed 
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                              : isCompleted 
                              ? 'bg-gradient-to-r from-pink-500 to-rose-400' 
                              : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions / Status Button */}
                  <div className="shrink-0 mt-2 md:mt-0 flex flex-col gap-2 w-full md:w-auto">
                    {isClaimed ? (
                      <div className="flex flex-col gap-2 w-full">
                        <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black rounded-xl flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          {language === 'en' ? 'Claimed' : '已領取'}
                        </div>
                        {/* Once claimed, Steven's LINE remains permanently accessible */}
                        {achievement.reward.isLineAccess && (
                          <motion.a
                            href="https://line.me/ti/p/JouU9u0l3j"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => audioEngine.play('click')}
                            className="px-4 py-2 bg-[#06C755] hover:bg-[#05b04b] text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(6,199,85,0.4)] border border-[#06C755]/20"
                          >
                            <MessageCircle className="w-4 h-4 fill-white text-[#06C755]" />
                            <span>{language === 'en' ? "Steven's LINE" : "聯絡 Steven LINE"}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </motion.a>
                        )}
                        {achievement.reward.isInstagramAccess && (
                          <motion.a
                            href="https://www.instagram.com/steven611com?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => audioEngine.play('click')}
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-95 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(219,39,119,0.4)] border border-pink-500/20"
                          >
                            <Instagram className="w-4 h-4" />
                            <span>{language === 'en' ? "Steven's Instagram" : "追蹤 Steven IG"}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </motion.a>
                        )}
                        {achievement.reward.isFacebookAccess && (
                          <motion.a
                            href="https://www.facebook.com/steven.sixeleven/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => audioEngine.play('click')}
                            className="px-4 py-2 bg-[#1877F2] hover:bg-[#166fe5] text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(24,119,242,0.4)] border border-[#1877F2]/20"
                          >
                            <Facebook className="w-4 h-4 fill-white text-[#1877F2]" />
                            <span>{language === 'en' ? "Steven's Facebook" : "加 Steven 臉書"}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </motion.a>
                        )}
                        {achievement.reward.isMysteryGift && (
                          <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(251,191,36,0.5)] border border-yellow-300/30">
                            <Gift className="w-4 h-4 animate-bounce" />
                            <span className="text-center leading-tight">
                              {language === 'en' ? "Exchange in real life for Mystery Gift!" : "可兌換神秘實體禮物！請出示此畫面"}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : isCompleted ? (
                      <div className="flex flex-col gap-2 w-full">
                        {/* Special interactive reward option */}
                        {achievement.reward.isLineAccess && (
                          <motion.a
                            href="https://line.me/ti/p/JouU9u0l3j"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => audioEngine.play('click')}
                            className="px-4 py-2 bg-[#06C755] hover:bg-[#05b04b] text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(6,199,85,0.4)] border border-[#06C755]/20 animate-pulse"
                          >
                            <MessageCircle className="w-4 h-4 fill-white text-[#06C755]" />
                            <span>{language === 'en' ? "Add Steven on LINE" : "加 Steven LINE"}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </motion.a>
                        )}
                        {achievement.reward.isInstagramAccess && (
                          <motion.a
                            href="https://www.instagram.com/steven611com?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => audioEngine.play('click')}
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-95 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(219,39,119,0.4)] border border-pink-500/20 animate-pulse"
                          >
                            <Instagram className="w-4 h-4" />
                            <span>{language === 'en' ? "Follow Steven on IG" : "追蹤 Steven IG"}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </motion.a>
                        )}
                        {achievement.reward.isFacebookAccess && (
                          <motion.a
                            href="https://www.facebook.com/steven.sixeleven/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => audioEngine.play('click')}
                            className="px-4 py-2 bg-[#1877F2] hover:bg-[#166fe5] text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(24,119,242,0.4)] border border-[#1877F2]/20 animate-pulse"
                          >
                            <Facebook className="w-4 h-4 fill-white text-[#1877F2]" />
                            <span>{language === 'en' ? "Add Steven on Facebook" : "加 Steven 臉書"}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </motion.a>
                        )}
                        {achievement.reward.isMysteryGift && (
                          <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(251,191,36,0.5)] border border-yellow-300/30 animate-pulse">
                            <Gift className="w-4 h-4" />
                            <span className="text-center leading-tight">
                              {language === 'en' ? "Exchange in real life for Mystery Gift!" : "可兌換神秘實體禮物！請出示此畫面"}
                            </span>
                          </div>
                        )}
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            audioEngine.play('unlock');
                            claimAchievement(achievement.id, achievement.reward.coins, achievement.reward.gems);
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] border border-amber-400/20 flex items-center justify-center gap-1"
                        >
                          <span>{language === 'en' ? 'CLAIM' : '領取獎勵'}</span>
                        </motion.button>
                      </div>
                    ) : (
                      <div className="px-4 py-2 bg-white/5 border border-white/5 text-slate-500 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        {language === 'en' ? 'Locked' : '尚未解鎖'}
                      </div>
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
