import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, Flame, Star, Target, Download, Share2, PlusSquare, CheckCircle2, Sparkles, Lock, Unlock, ExternalLink, Award, MessageCircle, Instagram, Facebook, Gift, X, FileDown } from 'lucide-react';
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
  },
  {
    id: 'crown_collector',
    title: { en: 'Crown Collector', zh: '黃金王冠大師' },
    description: { en: 'Earn at least 3 Gold Crowns by completing levels on Hard (or Extra) difficulty', zh: '在困難 (Hard) 或以上難度通關累積獲得至少 3 個黃金王冠！' },
    target: 3,
    current: (state: any) => Object.values(state.completedDifficulties || {}).filter((d: any) => d === 'Hard' || d === 'Extra').length,
    reward: { coins: 500, gems: 10 },
    rewardLabel: { en: '+500 Coins, +10 Gems 💎', zh: '+500 金幣, +10 寶石 💎' },
    icon: '👑',
  },
  {
    id: 'extra_mode_elite',
    title: { en: 'Extra Mode Elite', zh: '白金極限神話' },
    description: { en: 'Complete at least 1 zone on Extra difficulty to earn a Platinum Crown and prove your ultimate math supremacy!', zh: '在極限 (Extra) 難度下通關至少 1 個關卡，獲得極其稀有的白金王冠！' },
    target: 1,
    current: (state: any) => Object.values(state.completedDifficulties || {}).filter((d: any) => d === 'Extra').length,
    reward: { coins: 1000, gems: 25 },
    rewardLabel: { en: '+1000 Coins, +25 Gems 💎', zh: '+1000 金幣, +25 寶石 💎' },
    icon: '🏆',
  }
];

export function Profile() {
  const { 
    xp, level, currentStreak, maxStreak, stars, completedLevels, completedDifficulties = {}, language, equippedAvatar, inventory,
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

  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [recipientName, setRecipientName] = useState(language === 'en' ? 'Ultimate Math Champ' : '終極數學大師');
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadCertificate = async () => {
    setIsGenerating(true);
    audioEngine.play('unlock');
    
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Fill background (Premium Cream/Ivory parchment)
      const bgGrad = ctx.createRadialGradient(600, 400, 100, 600, 400, 700);
      bgGrad.addColorStop(0, '#FCFAF2');
      bgGrad.addColorStop(1, '#F3EFE0');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Ornate Border
      // Thick gold band
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#B38B32'; // Antique gold
      ctx.strokeRect(30, 30, 1140, 740);

      // Accent gold line
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#D4AF37'; // Shiny gold
      ctx.strokeRect(45, 45, 1110, 710);

      // Thin inner gold border
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#AA8226';
      ctx.strokeRect(52, 52, 1096, 696);

      // Draw elegant corner flourishes
      const drawCornerFlourish = (x: number, y: number, xDir: number, yDir: number) => {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#B38B32';
        
        // Flourish corner bracket
        ctx.moveTo(x, y + yDir * 40);
        ctx.lineTo(x, y);
        ctx.lineTo(x + xDir * 40, y);
        
        // Inner corner line
        ctx.moveTo(x + xDir * 12, y + yDir * 12);
        ctx.lineTo(x + xDir * 12, y + yDir * 30);
        ctx.moveTo(x + xDir * 12, y + yDir * 12);
        ctx.lineTo(x + xDir * 30, y + yDir * 12);

        ctx.stroke();

        // Corner dot
        ctx.beginPath();
        ctx.arc(x + xDir * 20, y + yDir * 20, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#D4AF37';
        ctx.fill();
      };

      drawCornerFlourish(45, 45, 1, 1);       // Top-left
      drawCornerFlourish(1155, 45, -1, 1);    // Top-right
      drawCornerFlourish(45, 755, 1, -1);     // Bottom-left
      drawCornerFlourish(1155, 755, -1, -1);  // Bottom-right

      // 3. Header Text
      ctx.textAlign = 'center';
      
      // Game Name
      ctx.fillStyle = '#1A202C'; // Dark slate
      ctx.font = 'bold 28px "Georgia", "Times New Roman", serif';
      ctx.fillText("NINA'S MATH QUEST", 600, 120);

      // Mini separator lines
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#D4AF37';
      ctx.moveTo(480, 140);
      ctx.lineTo(720, 140);
      ctx.stroke();

      // "🏆 OFFICIAL DANCE MASTER DIPLOMA 🏆"
      ctx.fillStyle = '#856404'; // Muted gold
      ctx.font = 'bold 36px "Georgia", "Times New Roman", serif';
      ctx.fillText(
        language === 'en' ? "OFFICIAL CERTIFICATE OF ULTIMATE SUPREMACY" : "終極數學大師暨全舞伴收藏勳章", 
        600, 200
      );

      ctx.fillStyle = '#4A5568';
      ctx.font = 'italic 18px "Georgia", "Times New Roman", serif';
      ctx.fillText(
        language === 'en' ? "This prestigious award is officially presented to:" : "此最高殊榮特此頒發予傑出冒險家：", 
        600, 260
      );

      // Recipient Name
      ctx.fillStyle = '#92400E'; // Deep warm gold/amber
      ctx.font = 'bold 44px "Georgia", "Times New Roman", serif';
      ctx.fillText(recipientName.toUpperCase(), 600, 330);

      // Name underlines
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#B38B32';
      ctx.moveTo(350, 350);
      ctx.lineTo(850, 350);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = '#AA8226';
      ctx.moveTo(380, 354);
      ctx.lineTo(820, 354);
      ctx.stroke();

      // Certificate Body Text
      ctx.fillStyle = '#2D3748'; // Charcoal text
      ctx.font = 'normal 15px "Georgia", "Times New Roman", serif';
      
      const line1 = language === 'en' 
        ? "For displaying exceptional mathematical intelligence, outstanding logical reasoning, and unbreakable perseverance."
        : "表彰其在《Nina 的數學冒險》中展現出卓越非凡的數學智慧、嚴謹的邏輯推理能力，以及無比堅韌的冒險精神。";
      const line2 = language === 'en'
        ? "By conquering all primary learning domains and unlocking the absolute complete set of all 15 rare dance garments,"
        : "成功攻克全關卡挑戰，並在舞蹈工作室解鎖全套 15 款限量珍稀舞衣、神秘配飾、遠古神龍與聖焰鳳凰寵物，";
      const line3 = language === 'en'
        ? "thereby proving their ultimate dancer status and mathematical supremacy to the entire universe."
        : "特頒此官方白金證書，證明其無可置疑的終極舞伴大師身分與至高無上的學術成就，永誌紀念。";

      ctx.fillText(line1, 600, 405);
      ctx.fillText(line2, 600, 435);
      ctx.fillText(line3, 600, 465);

      // 4. Golden Foil Stamp Seal (Bottom Center)
      const sealX = 600;
      const sealY = 560;

      // Draw seal starburst ribbons (red and purple ribbon tails)
      ctx.beginPath();
      ctx.fillStyle = '#9B1C1C'; // Red ribbon tail left
      ctx.moveTo(sealX - 25, sealY);
      ctx.lineTo(sealX - 40, sealY + 80);
      ctx.lineTo(sealX - 20, sealY + 70);
      ctx.lineTo(sealX - 5, sealY + 80);
      ctx.lineTo(sealX - 10, sealY);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = '#5B21B6'; // Purple ribbon tail right
      ctx.moveTo(sealX + 10, sealY);
      ctx.moveTo(sealX + 5, sealY);
      ctx.lineTo(sealX + 20, sealY + 80);
      ctx.lineTo(sealX + 30, sealY + 70);
      ctx.lineTo(sealX + 45, sealY + 80);
      ctx.lineTo(sealX + 30, sealY);
      ctx.fill();

      // Gold wax seal outer circles
      ctx.beginPath();
      ctx.arc(sealX, sealY, 48, 0, Math.PI * 2);
      ctx.fillStyle = '#B38B32';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(sealX, sealY, 44, 0, Math.PI * 2);
      const sealGrad = ctx.createRadialGradient(sealX - 10, sealY - 10, 5, sealX, sealY, 40);
      sealGrad.addColorStop(0, '#FFF5C3');
      sealGrad.addColorStop(0.4, '#E0B034');
      sealGrad.addColorStop(1, '#8A6405');
      ctx.fillStyle = sealGrad;
      ctx.fill();

      // Outer dashed circle
      ctx.beginPath();
      ctx.arc(sealX, sealY, 38, 0, Math.PI * 2);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(138, 100, 5, 0.5)';
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      // Trophy in center
      ctx.font = '34px Arial';
      ctx.fillText("🏆", sealX, sealY + 11);

      // 5. Signatures
      // Left: Nina (Instructor)
      const sigLineY = 660;
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#4A5568';
      ctx.moveTo(180, sigLineY);
      ctx.lineTo(420, sigLineY);
      ctx.stroke();

      // Nina script signature
      ctx.font = 'italic 32px "Brush Script MT", "Lucida Handwriting", "Georgia", cursive';
      ctx.fillStyle = '#0F2C59'; // Blue ink
      ctx.fillText("Nina Dancer", 300, sigLineY - 15);

      ctx.font = 'bold 12px "Georgia", serif';
      ctx.fillStyle = '#2D3748';
      ctx.fillText(language === 'en' ? "Nina, Chief Instructor" : "首席導師 Nina", 300, sigLineY + 18);

      // Right: Steven (Game Creator)
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#4A5568';
      ctx.moveTo(780, sigLineY);
      ctx.lineTo(1020, sigLineY);
      ctx.stroke();

      // Steven text fallback
      const drawStevenFallback = () => {
        ctx.font = 'italic 32px "Brush Script MT", "Lucida Handwriting", "Georgia", cursive';
        ctx.fillStyle = '#000000'; // Black ink signature
        ctx.fillText("Steven", 900, sigLineY - 15);
      };

      // Load Steven transparent signature image
      const sigImg = new Image();
      sigImg.crossOrigin = 'anonymous';
      sigImg.src = 'https://raw.githubusercontent.com/Fishnsteve/Logo/main/BlackSignature.png';

      await new Promise<void>((resolve) => {
        sigImg.onload = () => {
          // Draw signature logo image centered over the right line:
          // Center X is 900, Center Y is sigLineY - 20
          ctx.drawImage(sigImg, 810, sigLineY - 60, 180, 70);
          resolve();
        };
        sigImg.onerror = () => {
          drawStevenFallback();
          resolve();
        };
        // Safety timeout of 2.5 seconds
        setTimeout(() => {
          drawStevenFallback();
          resolve();
        }, 2500);
      });

      ctx.font = 'bold 12px "Georgia", serif';
      ctx.fillStyle = '#2D3748';
      ctx.fillText(language === 'en' ? "Steven, Game Creator" : "創作者 Steven", 900, sigLineY + 18);

      // 6. Footer details
      // Reference ID
      ctx.font = 'bold 11px monospace';
      ctx.fillStyle = '#718096';
      ctx.textAlign = 'left';
      ctx.fillText("REF ID: MQ-COMP-2026-NINA", 65, 745);

      // Date of issue
      ctx.textAlign = 'right';
      const today = new Date();
      const dateStr = language === 'en' 
        ? today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
      ctx.fillText(`${language === 'en' ? 'Date Issued: ' : '頒發日期：'}${dateStr}`, 1135, 745);

      // 7. Trigger Download
      const dataUrl = canvas.toDataURL('image/png');
      const dlLink = document.createElement('a');
      dlLink.download = `Ninas_Math_Quest_Ultimate_Award_${recipientName.replace(/\s+/g, '_')}.png`;
      dlLink.href = dataUrl;
      dlLink.click();
    } catch (err) {
      console.error("Failed to generate certificate", err);
    } finally {
      setIsGenerating(false);
    }
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

        {/* Real-Life Mystery Gift Voucher (Completion Symbol) */}
        {purchasedCount >= 12 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="p-8 bg-gradient-to-br from-amber-500 via-yellow-400 to-orange-500 rounded-[36px] border-4 border-amber-300 shadow-2xl text-slate-950 space-y-6 relative overflow-hidden"
            style={{
              boxShadow: "0 0 40px rgba(245, 158, 11, 0.5)",
            }}
          >
            {/* Holographic glowing stripes */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full animate-pulse pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-950/20 pb-4">
              <span className="text-[11px] font-black tracking-widest bg-slate-950 text-amber-400 px-4 py-1.5 rounded-full uppercase self-start sm:self-auto">
                {language === 'en' ? '🏆 OFFICIAL GOLD AWARD CERTIFICATE' : '🏆 官方黃金認證榮譽'}
              </span>
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-slate-950 animate-bounce" />
                <Award className="w-6 h-6 text-slate-950" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl font-black tracking-tight leading-tight uppercase flex items-center gap-2">
                <Gift className="w-7 h-7 fill-slate-950 stroke-[2.5]" />
                {language === 'en' ? 'ULTIMATE MYSTERY GIFT' : '終極神秘實體大禮'}
              </h3>
              <p className="text-sm font-extrabold text-slate-900 leading-relaxed">
                {language === 'en' 
                  ? 'Outstanding! You have claimed all dancer items in the studio. We have minted a premium Certificate of Supremacy for you. Present this certificate or download the official image to claim your physical mystery gift from Steven!' 
                  : '太震撼了！您已成功收集舞蹈工作室全部限定舞伴道具。系統已為您鑄造專屬白金勳章證書，在現實生活中向 Steven 出示證書或直接下載官方認證圖片，即可兌換神秘實體禮物！'}
              </p>
            </div>

            {/* Glowing Golden Holographic Seal (The Completion Symbol) */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 p-5 bg-slate-950/10 rounded-2xl border border-slate-950/10">
              <div className="md:col-span-4 flex items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-300 via-amber-400 to-yellow-600 border-2 border-slate-950 flex items-center justify-center shadow-lg relative animate-[spin_20s_linear_infinite] shrink-0">
                  <span className="text-4xl select-none">🏆</span>
                  <div className="absolute inset-0 rounded-full border border-dashed border-slate-950/40 m-1.5" />
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-950/5 flex items-center justify-center border border-dashed border-slate-950/20 text-2xl">
                  👑
                </div>
              </div>

              <div className="md:col-span-4 space-y-1 text-center md:text-left">
                <div className="font-mono text-sm font-black tracking-widest text-slate-950">
                  REF: MQ-COLLECT-2026
                </div>
                <div className="text-[11px] font-black text-slate-800 uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  {language === 'en' ? 'STATUS: VALID FOR EXCHANGE' : '狀態：有效且可兌換'}
                </div>
              </div>

              {/* Authorized Logo Signature on Card */}
              <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center border-t md:border-t-0 md:border-l border-slate-950/10 pt-4 md:pt-0 md:pl-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-800/80 mb-1">
                  {language === 'en' ? 'Authorized Signature' : '官方手寫簽名認證'}
                </span>
                <div className="relative h-10 flex items-center justify-center">
                  <img 
                    src="https://raw.githubusercontent.com/Fishnsteve/Logo/main/BlackSignature.png" 
                    alt="Steven Signature" 
                    className="h-10 object-contain pointer-events-none drop-shadow-sm select-none" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                      const parent = (e.target as HTMLElement).parentElement;
                      if (parent) {
                        const fallback = document.createElement('span');
                        fallback.className = "font-serif italic font-bold text-lg text-slate-950 select-none";
                        fallback.innerText = "Steven";
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <span className="text-[9px] font-black text-slate-900 mt-1">
                  Steven, Game Creator
                </span>
              </div>
            </div>

            {/* Interactive Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  audioEngine.play('click');
                  setShowCertificateModal(true);
                }}
                className="flex-1 py-3.5 px-6 bg-slate-950 text-amber-400 hover:text-amber-300 font-black text-sm rounded-2xl shadow-xl border border-slate-800 hover:border-amber-400/30 flex items-center justify-center gap-2 transition-all"
              >
                <Award className="w-4 h-4 animate-spin-slow" />
                <span>{language === 'en' ? 'View & Customise Award' : '自訂與預覽官方證書'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadCertificate}
                disabled={isGenerating}
                className="flex-1 py-3.5 px-6 bg-slate-900 text-white font-black text-sm rounded-2xl shadow-xl hover:bg-slate-800 border border-white/10 flex items-center justify-center gap-2 transition-all disabled:opacity-55"
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>{language === 'en' ? 'Generating Image...' : '正在繪製證書...'}</span>
                  </>
                ) : (
                  <>
                    <FileDown className="w-4 h-4 text-amber-400" />
                    <span>{language === 'en' ? 'Fast Download PNG' : '快速下載證書圖檔'}</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

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
                completedDifficulties,
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

        {/* Certificate Customization & Download Modal */}
        {showCertificateModal && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="bg-slate-900 rounded-[32px] p-6 max-w-4xl w-full border border-white/10 shadow-2xl space-y-6 relative flex flex-col my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowCertificateModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title Header */}
              <div className="text-center space-y-1 pt-2">
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
                  {language === 'en' ? 'Official Diploma Studio' : '官方實體證書自訂室'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'en' 
                    ? 'Enter your name to personalize your prestigious Certificate of Supremacy, then export it!' 
                    : '請輸入您的姓名來量身打造這份專屬的終極榮譽證書，並下載高畫質 PNG 保存！'}
                </p>
              </div>

              {/* Interactive Name Form */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-amber-400">
                  {language === 'en' ? "Recipient Name on Certificate:" : "證書印製姓名："}
                </label>
                <input
                  type="text"
                  maxLength={24}
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder={language === 'en' ? "Enter your name..." : "請輸入您的名字..."}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl py-3 px-4 text-white font-bold text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Certificate Canvas Mock Visual representation (Matches downloaded file 100%!) */}
              <div className="w-full overflow-x-auto rounded-2xl border border-white/10 shadow-2xl">
                <div className="min-w-[680px] bg-[#FCFAF2] text-slate-950 p-10 rounded-2xl relative flex flex-col justify-between aspect-[1.5/1] overflow-hidden select-none border-[8px] border-[#B38B32] m-0.5">
                  {/* Decorative gold double accent frame */}
                  <div className="absolute inset-4 border border-[#D4AF37] pointer-events-none" />
                  <div className="absolute inset-5 border border-dashed border-[#AA8226]/40 pointer-events-none" />
                  
                  {/* Corner Flourish Elements */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#B38B32] pointer-events-none" />
                  <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#B38B32] pointer-events-none" />
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#B38B32] pointer-events-none" />
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#B38B32] pointer-events-none" />

                  {/* Header */}
                  <div className="text-center space-y-1.5 z-10">
                    <p className="font-serif tracking-[0.15em] text-xs font-bold text-slate-600">NINA'S MATH QUEST</p>
                    <div className="h-0.5 w-32 bg-[#D4AF37] mx-auto" />
                    <h4 className="font-serif text-xl sm:text-2xl font-black text-[#856404] tracking-tight uppercase mt-2">
                      {language === 'en' ? 'Certificate of Ultimate Supremacy' : '終極數學大師暨全舞伴收藏勳章'}
                    </h4>
                    <p className="font-serif italic text-xs text-slate-500">
                      {language === 'en' ? 'This prestigious award is officially presented to:' : '此最高殊榮特此頒發予傑出冒險家：'}
                    </p>
                  </div>

                  {/* Custom Recipient Name Display */}
                  <div className="text-center my-4 z-10">
                    <span className="font-serif text-3xl font-bold text-[#92400E] border-b-2 border-[#B38B32] px-10 pb-1 uppercase tracking-wide inline-block max-w-[90%] truncate">
                      {recipientName || "THE MATH CHAMPION"}
                    </span>
                  </div>

                  {/* Certificate Body text */}
                  <div className="text-center space-y-1.5 text-xs text-slate-700 leading-relaxed max-w-xl mx-auto z-10 font-serif">
                    <p>
                      {language === 'en' 
                        ? 'For displaying exceptional mathematical intelligence, outstanding logical reasoning, and unbreakable perseverance.' 
                        : '表彰其在《Nina 的數學冒險》中展現出卓越非凡的數學智慧、嚴謹的邏輯推理能力，以及無比堅韌的冒險精神。'}
                    </p>
                    <p>
                      {language === 'en'
                        ? 'By conquering all primary learning domains and unlocking the absolute complete set of all 15 rare dance garments,'
                        : '成功攻克全關卡挑戰，並在舞蹈工作室解鎖全套 15 款限量珍稀舞衣、神秘配飾、遠古神龍與聖焰鳳凰寵物，'}
                    </p>
                    <p>
                      {language === 'en'
                        ? 'thereby proving their ultimate dancer status and mathematical supremacy to the entire universe.'
                        : '特頒此官方白金證書，證明其無可置疑的終極舞伴大師身分與至高無上的學術成就，永誌紀念。'}
                    </p>
                  </div>

                  {/* Seals & Signatures Row */}
                  <div className="grid grid-cols-3 items-end pt-6 z-10 font-serif">
                    {/* Left: Nina's Signature */}
                    <div className="text-center space-y-1">
                      <div className="h-10 flex items-center justify-center">
                        <span className="font-serif italic text-2xl text-[#0F2C59] select-none">Nina Dancer</span>
                      </div>
                      <div className="w-40 border-t border-slate-400 mx-auto" />
                      <p className="text-[10px] font-bold text-slate-600">
                        {language === 'en' ? 'Nina, Chief Instructor' : '首席導師 Nina'}
                      </p>
                    </div>

                    {/* Middle: Golden Foil Seal with Ribbons */}
                    <div className="relative flex flex-col items-center justify-center">
                      {/* Ribbon tails */}
                      <div className="absolute top-2 w-16 h-12 flex justify-between pointer-events-none">
                        <div className="w-5 h-16 bg-[#9B1C1C] origin-top rotate-[-15deg] shadow-sm" />
                        <div className="w-5 h-16 bg-[#5B21B6] origin-top rotate-[15deg] shadow-sm" />
                      </div>
                      {/* Round gold medal stamp */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-200 via-amber-400 to-yellow-600 border border-amber-300 flex items-center justify-center shadow-lg relative z-20 m-1">
                        <span className="text-2xl">🏆</span>
                        <div className="absolute inset-1 rounded-full border border-dashed border-slate-950/20" />
                      </div>
                    </div>

                    {/* Right: Steven's Signature */}
                    <div className="text-center space-y-1">
                      <div className="h-10 flex items-center justify-center relative">
                        <img 
                          src="https://raw.githubusercontent.com/Fishnsteve/Logo/main/BlackSignature.png" 
                          alt="Steven Signature" 
                          className="h-12 object-contain pointer-events-none drop-shadow-sm select-none" 
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                            const parent = (e.target as HTMLElement).parentElement;
                            if (parent) {
                              const fallback = document.createElement('span');
                              fallback.className = "font-serif italic text-2xl text-slate-950 select-none";
                              fallback.innerText = "Steven";
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      </div>
                      <div className="w-40 border-t border-slate-400 mx-auto" />
                      <p className="text-[10px] font-bold text-slate-600">
                        {language === 'en' ? 'Steven, Game Creator' : '創作者 Steven'}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Metadata bar */}
                  <div className="flex justify-between items-center text-[9px] text-slate-400 pt-6 font-mono">
                    <span>REF: MQ-COMP-2026-NINA</span>
                    <span>
                      {language === 'en' ? 'Date Issued: ' : '頒發日期：'}
                      {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="flex-1 py-3 px-6 bg-white/5 hover:bg-white/10 text-white font-bold text-sm rounded-2xl transition-all"
                >
                  {language === 'en' ? 'Close Window' : '關閉視窗'}
                </button>

                <button
                  onClick={downloadCertificate}
                  disabled={isGenerating}
                  className="flex-[2] py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm rounded-2xl shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.45)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                      <span>{language === 'en' ? 'Generating Premium Image...' : '正在繪製證書...'}</span>
                    </>
                  ) : (
                    <>
                      <FileDown className="w-4 h-4 text-slate-950" />
                      <span>{language === 'en' ? 'Download High-Res PNG Image' : '下載高解析度 PNG 證書圖檔'}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
