import { useState, useEffect, useRef } from 'react';
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
  const containerWrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!showCertificateModal) return;

    const timer = setTimeout(() => {
      if (containerWrapperRef.current) {
        const width = containerWrapperRef.current.getBoundingClientRect().width;
        setScale(Math.min(1, Math.max(280, width) / 720));
      }
    }, 50);

    const updateScale = () => {
      if (containerWrapperRef.current) {
        const width = containerWrapperRef.current.getBoundingClientRect().width;
        setScale(Math.min(1, Math.max(280, width) / 720));
      }
    };

    window.addEventListener('resize', updateScale);

    let observer: ResizeObserver | null = null;
    if (containerWrapperRef.current) {
      observer = new ResizeObserver(() => {
        updateScale();
      });
      observer.observe(containerWrapperRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScale);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [showCertificateModal]);
  const [recipientName, setRecipientName] = useState(language === 'en' ? 'Ultimate Math Champ' : '終極數學大師');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'claimed'>('active');

  const [ninaSigSrc, setNinaSigSrc] = useState('https://raw.githubusercontent.com/Fishnsteve/Logo/main/NinaSignature.png');
  const [ninaSigFailed, setNinaSigFailed] = useState(false);

  useEffect(() => {
    const ninaUrls = [
      'https://raw.githubusercontent.com/Fishnsteve/Logo/main/NinaSignature.png',
      'https://raw.githubusercontent.com/Fishnsteve/Logo/main/Nina.png',
      'https://raw.githubusercontent.com/Fishnsteve/Logo/main/nina.png',
      'https://raw.githubusercontent.com/Fishnsteve/Logo/main/ninasignature.png',
      'https://raw.githubusercontent.com/Fishnsteve/Logo/main/BlackSignature_Nina.png'
    ];

    const testNext = (index: number) => {
      if (index >= ninaUrls.length) {
        setNinaSigFailed(true);
        return;
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setNinaSigSrc(ninaUrls[index]);
        setNinaSigFailed(false);
      };
      img.onerror = () => {
        testNext(index + 1);
      };
      img.src = ninaUrls[index];
    };

    testNext(0);
  }, []);

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

      // Nina hand-drawn signature (vector paths fallback to match user's image exactly)
      const drawNinaFallback = () => {
        ctx.save();
        ctx.strokeStyle = '#000000'; // Black ink as in the image
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const ninaSigX = 240;
        const ninaSigY = sigLineY - 20;

        // Draw N
        ctx.beginPath();
        ctx.moveTo(ninaSigX + 25, ninaSigY - 25);
        ctx.quadraticCurveTo(ninaSigX + 23, ninaSigY, ninaSigX + 28, ninaSigY + 25);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(ninaSigX + 27, ninaSigY - 18);
        ctx.lineTo(ninaSigX + 42, ninaSigY + 23);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(ninaSigX + 38, ninaSigY + 23);
        ctx.quadraticCurveTo(ninaSigX + 39, ninaSigY + 5, ninaSigX + 39, ninaSigY - 15);
        ctx.stroke();

        // Draw i
        ctx.beginPath();
        ctx.moveTo(ninaSigX + 53, ninaSigY + 3);
        ctx.quadraticCurveTo(ninaSigX + 54, ninaSigY + 14, ninaSigX + 56, ninaSigY + 24);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(ninaSigX + 49, ninaSigY - 5);
        ctx.lineTo(ninaSigX + 54, ninaSigY - 7);
        ctx.stroke();

        // Draw n
        ctx.beginPath();
        ctx.moveTo(ninaSigX + 62, ninaSigY + 5);
        ctx.lineTo(ninaSigX + 63, ninaSigY + 24);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(ninaSigX + 62, ninaSigY + 9);
        ctx.quadraticCurveTo(ninaSigX + 68, ninaSigY + 2, ninaSigX + 74, ninaSigY + 6);
        ctx.lineTo(ninaSigX + 78, ninaSigY + 24);
        ctx.stroke();

        // Draw a
        ctx.beginPath();
        ctx.moveTo(ninaSigX + 92, ninaSigY + 12);
        ctx.bezierCurveTo(ninaSigX + 84, ninaSigY + 10, ninaSigX + 80, ninaSigY + 20, ninaSigX + 87, ninaSigY + 24);
        ctx.bezierCurveTo(ninaSigX + 94, ninaSigY + 24, ninaSigX + 96, ninaSigY + 16, ninaSigX + 92, ninaSigY + 12);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(ninaSigX + 92, ninaSigY + 13);
        ctx.quadraticCurveTo(ninaSigX + 100, ninaSigY + 24, ninaSigX + 112, ninaSigY + 30);
        ctx.stroke();

        ctx.restore();
      };

      if (!ninaSigFailed) {
        const ninaImgObj = new Image();
        ninaImgObj.crossOrigin = 'anonymous';
        ninaImgObj.src = ninaSigSrc;
        await new Promise<void>((resolve) => {
          ninaImgObj.onload = () => {
            ctx.drawImage(ninaImgObj, 210, sigLineY - 60, 180, 70);
            resolve();
          };
          ninaImgObj.onerror = () => {
            drawNinaFallback();
            resolve();
          };
          setTimeout(() => {
            drawNinaFallback();
            resolve();
          }, 2500);
        });
      } else {
        drawNinaFallback();
      }

      ctx.font = 'bold 12px "Georgia", serif';
      ctx.fillStyle = '#2D3748';
      ctx.fillText("Nina", 300, sigLineY + 18);

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

  const activeAchievements = ACHIEVEMENTS.filter(achievement => !claimedAchievements.includes(achievement.id));
  const claimedList = ACHIEVEMENTS.filter(achievement => claimedAchievements.includes(achievement.id));
  const displayAchievements = activeTab === 'active' ? activeAchievements : claimedList;

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
      
      <div className="max-w-2xl mx-auto w-full space-y-5 relative z-10">
        
        {/* Unified Profile & Stats Dashboard */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-5 md:p-6 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle light accent background reflection */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            {/* Avatar Section */}
            <div className="flex flex-col items-center text-center shrink-0">
              <div className="w-28 h-28 md:w-32 md:h-32 relative mb-2">
                <NinaAvatar />
                <div className="absolute -bottom-1 -right-1 z-20 bg-gradient-to-tr from-pink-500 to-rose-500 text-white w-9 h-9 rounded-full flex items-center justify-center font-black border-2 border-slate-900 shadow-lg text-sm">
                  {level}
                </div>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">{profileTitle}</h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span className="text-pink-300 font-extrabold text-[10px] tracking-wider uppercase">XP: {xp}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-28 bg-white/10" />

            {/* Stats Grid Section */}
            <div className="w-full grid grid-cols-2 gap-3">
              {/* Day Streak */}
              <div className="bg-white/[0.02] hover:bg-white/[0.05] p-3 rounded-2xl border border-white/5 transition-all flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-xl text-orange-400 border border-orange-500/20">
                  <Flame className="w-4 h-4 fill-orange-400" />
                </div>
                <div>
                  <div className="text-base md:text-lg font-black text-white">{currentStreak}</div>
                  <div className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.profile.dayStreak}</div>
                </div>
              </div>

              {/* Total Stars */}
              <div className="bg-white/[0.02] hover:bg-white/[0.05] p-3 rounded-2xl border border-white/5 transition-all flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <div className="text-base md:text-lg font-black text-white">{stars}</div>
                  <div className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.profile.totalStars}</div>
                </div>
              </div>

              {/* Questions Answered */}
              <div className="bg-white/[0.02] hover:bg-white/[0.05] p-3 rounded-2xl border border-white/5 transition-all flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                  <Target className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-base md:text-lg font-black text-white">{totalQuestionsAnswered}</div>
                  <div className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.profile.questions}</div>
                </div>
              </div>

              {/* Best Streak */}
              <div className="bg-white/[0.02] hover:bg-white/[0.05] p-3 rounded-2xl border border-white/5 transition-all flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                  <Trophy className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-base md:text-lg font-black text-white">{maxStreak}</div>
                  <div className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.profile.bestStreak}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PWA Home Screen Installation Row */}
        {!isStandalone && (
          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-4 border border-white/5 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-xs text-pink-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                {language === 'en' ? 'Install App Shortcut' : '將遊戲新增至主畫面'}
              </h3>
              <p className="text-[11px] text-slate-400 max-w-md leading-relaxed">
                {language === 'en' 
                  ? "Launch in full-screen with high-definition Pink Sulan Nina icon from your home screen." 
                  : "解鎖沉浸式全螢幕滿版視野，使用專屬粉紅素蘭 Nina 圖示快速啟動冒險。"}
              </p>
            </div>
            
            <div className="shrink-0 flex items-center w-full sm:w-auto">
              {canInstall ? (
                <button
                  onClick={handleInstallClick}
                  className="w-full sm:w-auto py-2 px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 border border-pink-400/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  {language === 'en' ? 'Install' : '立即安裝'}
                </button>
              ) : isIOS ? (
                <div className="w-full text-center sm:text-left text-[11px] font-semibold text-slate-300 bg-white/5 rounded-xl px-3 py-2 border border-white/5 flex items-center justify-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span>{language === 'en' ? "Tap Share → Add to Home" : "請點選分享 → 加入主畫面"}</span>
                </div>
              ) : (
                <div className="w-full text-center sm:text-left text-[11px] font-semibold text-slate-300 bg-white/5 rounded-xl px-3 py-2 border border-white/5 flex items-center justify-center gap-1.5">
                  <span className="text-pink-400 font-bold">⋮</span>
                  <span>{language === 'en' ? "Menu → Install App" : "選單 → 安裝或新增捷徑"}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Real-Life Mystery Gift Voucher (Completion Symbol - Slim, Compact, Classy, Fully Golden!) */}
        {purchasedCount >= 12 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4.5 bg-gradient-to-br from-[#FFF5C3] via-[#E0B034] to-[#8A6405] rounded-3xl border-2 border-[#FFF5C3] shadow-[0_8px_30px_rgba(224,176,52,0.35)] relative overflow-hidden flex flex-col sm:flex-row items-center gap-4 text-slate-950"
          >
            {/* Elegant luxury gold corner accents */}
            <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#785108]/30" />
            <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#785108]/30" />
            <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#785108]/30" />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#785108]/30" />
            
            {/* Shimmer overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

            {/* Glowing Golden Holographic Seal (Compact, elegant stamp) */}
            <div className="w-14 h-14 rounded-full bg-slate-950/15 border-2 border-[#785108]/30 flex items-center justify-center text-2xl shrink-0 shadow-[0_4px_15px_rgba(0,0,0,0.15)] relative">
              <span className="animate-bounce" style={{ animationDuration: '3s' }}>🎁</span>
              <div className="absolute inset-1 rounded-full border border-dashed border-[#785108]/20" />
            </div>

            {/* Core Info */}
            <div className="flex-1 text-center sm:text-left space-y-0.5 z-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
                <h3 className="text-sm font-black tracking-wider text-slate-950 uppercase">
                  {language === 'en' ? 'Ultimate Mystery Gift Unlocked' : '已解鎖：終極神秘實體大禮'}
                </h3>
                <span className="inline-flex items-center gap-1 text-[9px] font-black text-white bg-red-600 px-2 py-0.5 rounded-full uppercase tracking-widest border border-red-400/30 self-center sm:self-auto shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  {language === 'en' ? 'Valid' : '有效'}
                </span>
              </div>
              <p className="text-xs text-[#3D2C04] font-bold leading-normal max-w-xl">
                {language === 'en' 
                  ? 'Congratulations! Present your official Certificate of Supremacy to claim your physical reward from Steven.' 
                  : '恭喜！您已收集全部商城道具。請自訂您的官方認證證書，向 Steven 兌換神秘實體大禮。'}
              </p>
            </div>

            {/* Compact Actions */}
            <div className="shrink-0 w-full sm:w-auto z-10">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  audioEngine.play('click');
                  setShowCertificateModal(true);
                }}
                className="w-full sm:w-auto py-2.5 px-5 bg-slate-950 text-amber-300 hover:bg-slate-900 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.25)] border border-[#D4AF37]/30 transition-all cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>{language === 'en' ? 'Open Pass' : '打開並自訂證書'}</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Achievements Section */}
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl p-4 md:p-5 border border-white/5 shadow-xl">
          <div className="flex items-center gap-2 mb-3.5">
            <Trophy className="w-5 h-5 text-amber-400 fill-amber-400/10 shrink-0" /> 
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-pink-300">
              {language === 'en' ? 'Quest Achievements' : '冒險成就與專屬獎勵'}
            </h3>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 bg-white/[0.03] rounded-xl border border-white/5 mb-4">
            <button
              onClick={() => {
                audioEngine.play('click');
                setActiveTab('active');
              }}
              className={`flex-1 py-1.5 px-3 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'active'
                  ? 'bg-pink-500/10 text-pink-300 border border-pink-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Active Quests' : '進行中任務'}</span>
              <span className="px-1.5 py-0.5 bg-pink-500/20 text-pink-300 text-[10px] font-black rounded-full leading-none">
                {activeAchievements.length}
              </span>
            </button>
            
            <button
              onClick={() => {
                audioEngine.play('click');
                setActiveTab('claimed');
              }}
              className={`flex-1 py-1.5 px-3 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'claimed'
                  ? 'bg-pink-500/10 text-pink-300 border border-pink-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Claimed' : '已領取獎勵'}</span>
              <span className="px-1.5 py-0.5 bg-slate-800 text-slate-400 text-[10px] font-black rounded-full leading-none">
                {claimedList.length}
              </span>
            </button>
          </div>

          <div className="space-y-2.5">
            {displayAchievements.map(achievement => {
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
                  className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-2xl border transition-all duration-300 ${
                    isClaimed 
                      ? 'bg-emerald-950/5 border-emerald-500/10 opacity-75' 
                      : isCompleted
                      ? 'bg-pink-950/10 border-pink-500/20 shadow-[0_0_15px_rgba(244,114,182,0.05)]'
                      : 'bg-white/[0.02] border-white/5'
                  }`}
                >
                  {/* Left row / top section of item */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Badge & Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border shrink-0 transition-all ${
                      isClaimed 
                        ? 'bg-emerald-500/10 border-emerald-400/20' 
                        : isCompleted
                        ? 'bg-pink-500/20 border-pink-400/30 text-xl animate-pulse'
                        : 'bg-white/5 border-white/5 grayscale opacity-60'
                    }`}>
                      {achievement.icon}
                    </div>

                    {/* Info and Progress Bar */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className={`font-extrabold text-xs truncate ${isCompleted && !isClaimed ? 'text-pink-300' : 'text-white'}`}>
                          {language === 'en' ? achievement.title.en : achievement.title.zh}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {Math.min(achievement.target, currentVal)}/{achievement.target}
                        </span>
                      </div>
                      
                      <p className="text-[11px] text-slate-400 leading-normal line-clamp-1">
                        {language === 'en' ? achievement.description.en : achievement.description.zh}
                      </p>

                      {/* Progress Bar & Reward Label */}
                      <div className="flex items-center gap-3 pt-0.5">
                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full rounded-full ${
                              isClaimed 
                                ? 'bg-emerald-500'
                                : isCompleted 
                                ? 'bg-pink-500' 
                                : 'bg-blue-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-wider shrink-0 ${isCompleted && !isClaimed ? 'text-pink-300 animate-pulse' : 'text-slate-400'}`}>
                          {language === 'en' ? achievement.rewardLabel.en : achievement.rewardLabel.zh}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Button */}
                  <div className="shrink-0 flex items-center justify-end sm:pl-2 w-full sm:w-auto border-t sm:border-0 border-white/5 pt-2 sm:pt-0">
                    {isClaimed ? (
                      <div className="flex flex-row sm:flex-col gap-1.5 items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto">
                        {/* Small claimed badge */}
                        <div className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{language === 'en' ? 'Claimed' : '已領取'}</span>
                        </div>
                        {/* Links if available */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {achievement.reward.isLineAccess && (
                            <a
                              href="https://line.me/ti/p/JouU9u0l3j"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => audioEngine.play('click')}
                              className="text-[10px] font-black text-white bg-[#06C755] px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm"
                            >
                              <span>LINE</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                          {achievement.reward.isInstagramAccess && (
                            <a
                              href="https://www.instagram.com/steven611com?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => audioEngine.play('click')}
                              className="text-[10px] font-black text-white bg-gradient-to-r from-purple-600 to-pink-500 px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm"
                            >
                              <span>IG</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                          {achievement.reward.isFacebookAccess && (
                            <a
                              href="https://www.facebook.com/steven.sixeleven/"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => audioEngine.play('click')}
                              className="text-[10px] font-black text-white bg-[#1877F2] px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm"
                            >
                              <span>FB</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    ) : isCompleted ? (
                      <div className="w-full sm:w-auto flex flex-row sm:flex-col gap-1.5 items-center sm:items-end justify-between sm:justify-center">
                        {/* Unclaimed bonus access links */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {achievement.reward.isLineAccess && (
                            <a
                              href="https://line.me/ti/p/JouU9u0l3j"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => audioEngine.play('click')}
                              className="text-[10px] font-black text-white bg-[#06C755] px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm animate-pulse"
                            >
                              <span>LINE</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                          {achievement.reward.isInstagramAccess && (
                            <a
                              href="https://www.instagram.com/steven611com?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => audioEngine.play('click')}
                              className="text-[10px] font-black text-white bg-gradient-to-r from-purple-600 to-pink-500 px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm animate-pulse"
                            >
                              <span>IG</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                          {achievement.reward.isFacebookAccess && (
                            <a
                              href="https://www.facebook.com/steven.sixeleven/"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => audioEngine.play('click')}
                              className="text-[10px] font-black text-white bg-[#1877F2] px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm animate-pulse"
                            >
                              <span>FB</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            audioEngine.play('unlock');
                            claimAchievement(achievement.id, achievement.reward.coins, achievement.reward.gems);
                          }}
                          className="py-1.5 px-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] rounded-lg shadow-md border border-amber-400/20 flex items-center gap-0.5 shrink-0"
                        >
                          <span>{language === 'en' ? 'CLAIM' : '領取'}</span>
                        </motion.button>
                      </div>
                    ) : (
                      <div className="w-full sm:w-auto text-right flex items-center justify-end">
                        <div className="text-[10px] font-bold text-slate-500 bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg flex items-center justify-center gap-1 w-full sm:w-auto">
                          <Lock className="w-3 h-3" />
                          <span>{language === 'en' ? 'Locked' : '鎖定'}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            {displayAchievements.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-xs">
                {activeTab === 'active'
                  ? (language === 'en' ? '🎉 Amazing! You completed all quests!' : '🎉 太棒了！您已完成所有任務！')
                  : (language === 'en' ? 'No achievements claimed yet. Complete quests to claim rewards!' : '尚未領取任何獎勵。完成任務並點擊領取吧！')}
              </div>
            )}
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
              <div 
                ref={containerWrapperRef}
                className="w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl flex justify-center bg-slate-950/40 p-2 relative"
                style={{ height: `${453 * scale}px` }}
              >
                <div 
                  style={{ 
                    transform: `scale(${scale})`, 
                    transformOrigin: 'top center',
                  }}
                  className="w-[680px] h-[453px] bg-[#FCFAF2] text-slate-950 p-8 rounded-2xl relative flex flex-col justify-between select-none border-[8px] border-[#B38B32] shrink-0"
                >
                  {/* Decorative gold double accent frame */}
                  <div className="absolute inset-4 border border-[#D4AF37] pointer-events-none" />
                  <div className="absolute inset-5 border border-dashed border-[#AA8226]/40 pointer-events-none" />
                  
                  {/* Corner Flourish Elements */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#B38B32] pointer-events-none" />
                  <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#B38B32] pointer-events-none" />
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#B38B32] pointer-events-none" />
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#B38B32] pointer-events-none" />

                  {/* Header */}
                  <div className="text-center space-y-1 z-10">
                    <p className="font-serif tracking-[0.15em] text-[10px] font-bold text-slate-600">NINA'S MATH QUEST</p>
                    <div className="h-0.5 w-32 bg-[#D4AF37] mx-auto" />
                    <h4 className="font-serif text-lg font-black text-[#856404] tracking-tight uppercase mt-1.5">
                      {language === 'en' ? 'Certificate of Ultimate Supremacy' : '終極數學大師暨全舞伴收藏勳章'}
                    </h4>
                    <p className="font-serif italic text-[11px] text-slate-500">
                      {language === 'en' ? 'This prestigious award is officially presented to:' : '此最高殊榮特此頒發予傑出冒險家：'}
                    </p>
                  </div>

                  {/* Custom Recipient Name Display */}
                  <div className="text-center my-2 z-10">
                    <span className="font-serif text-2xl font-bold text-[#92400E] border-b-2 border-[#B38B32] px-8 pb-0.5 uppercase tracking-wide inline-block max-w-[90%] truncate">
                      {recipientName || "THE MATH CHAMPION"}
                    </span>
                  </div>

                  {/* Certificate Body text */}
                  <div className="text-center space-y-1 text-[11px] text-slate-700 leading-relaxed max-w-xl mx-auto z-10 font-serif">
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
                  <div className="grid grid-cols-3 items-end pt-4 z-10 font-serif">
                    {/* Left: Nina's Signature */}
                    <div className="text-center space-y-1">
                      <div className="h-10 flex items-center justify-center">
                        {!ninaSigFailed ? (
                          <img 
                            src={ninaSigSrc} 
                            alt="Nina Signature" 
                            className="h-10 object-contain pointer-events-none drop-shadow-sm select-none" 
                            referrerPolicy="no-referrer"
                            onError={() => setNinaSigFailed(true)}
                          />
                        ) : (
                          <svg viewBox="0 0 120 80" className="h-10 w-28 object-contain text-slate-950 pointer-events-none drop-shadow-sm select-none">
                            {/* N */}
                            <path d="M 25 15 Q 23 40 28 65" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            <path d="M 27 22 L 42 63" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            <path d="M 38 63 Q 39 45 39 25" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            {/* i */}
                            <path d="M 53 43 Q 54 54 56 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            <path d="M 49 35 L 54 33" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                            {/* n */}
                            <path d="M 62 45 L 63 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            <path d="M 62 49 Q 68 42 74 46 L 78 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            {/* a */}
                            <path d="M 92 52 C 84 50 80 60 87 64 C 94 64 96 56 92 52 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            <path d="M 92 53 Q 100 64 112 70" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                      <div className="w-32 border-t border-slate-400 mx-auto" />
                      <p className="text-[9px] font-bold text-slate-600">
                        Nina
                      </p>
                    </div>

                    {/* Middle: Golden Foil Seal with Ribbons */}
                    <div className="relative flex flex-col items-center justify-center">
                      {/* Ribbon tails */}
                      <div className="absolute top-2 w-14 h-10 flex justify-between pointer-events-none">
                        <div className="w-4.5 h-12 bg-[#9B1C1C] origin-top rotate-[-15deg] shadow-sm" />
                        <div className="w-4.5 h-12 bg-[#5B21B6] origin-top rotate-[15deg] shadow-sm" />
                      </div>
                      {/* Round gold medal stamp */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-200 via-amber-400 to-yellow-600 border border-amber-300 flex items-center justify-center shadow-lg relative z-20 m-1">
                        <span className="text-xl">🏆</span>
                        <div className="absolute inset-1 rounded-full border border-dashed border-slate-950/20" />
                      </div>
                    </div>

                    {/* Right: Steven's Signature */}
                    <div className="text-center space-y-1">
                      <div className="h-10 flex items-center justify-center relative">
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
                              fallback.className = "font-serif italic text-xl text-slate-950 select-none";
                              fallback.innerText = "Steven";
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      </div>
                      <div className="w-32 border-t border-slate-400 mx-auto" />
                      <p className="text-[9px] font-bold text-slate-600">
                        {language === 'en' ? 'Steven, Game Creator' : '創作者 Steven'}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Metadata bar */}
                  <div className="flex justify-between items-center text-[8px] text-slate-400 pt-4 font-mono">
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
