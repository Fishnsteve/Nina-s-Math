import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState } from '../types/game';

const INITIAL_STATE: GameState = {
  language: 'zh',
  xp: 0,
  level: 1,
  coins: 50,
  gems: 5,
  stars: 0,
  hearts: 5,
  maxHearts: 5,
  currentStreak: 0,
  maxStreak: 0,
  unlockedZones: ['zone_1'],
  completedLevels: {},
  equippedAvatar: 'hero_sulan',
  equippedBackground: 'bg_default',
  equippedPet: '',
  inventory: ['hero_sulan', 'bg_default'],
  claimedAchievements: []
};

interface GameContextType extends GameState {
  setLanguage: (lang: 'en' | 'zh') => void;
  addXp: (amount: number) => void;
  addCoins: (amount: number) => void;
  addGems: (amount: number) => void;
  loseHeart: () => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  unlockZone: (zoneId: string) => void;
  completeLevel: (zoneId: string, starsEarned: number) => void;
  buyItem: (itemId: string, price: number, currency: 'coins' | 'gems') => boolean;
  equipItem: (itemId: string, type: 'character' | 'background' | 'pet') => void;
  claimAchievement: (achievementId: string, rewardCoins: number, rewardGems: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const LEVEL_XP_REQ = (level: number) => level * 100 + (level * level * 20);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem('mathQuestState');
    const parsed = saved ? JSON.parse(saved) : null;
    return { 
      ...INITIAL_STATE, 
      ...parsed, 
      language: parsed?.language || 'zh',
      claimedAchievements: parsed?.claimedAchievements || []
    };
  });

  useEffect(() => {
    localStorage.setItem('mathQuestState', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      setState(p => {
        if (p.hearts < p.maxHearts) {
          return { ...p, hearts: p.hearts + 1 };
        }
        return p;
      });
    }, 60000); // Regenerate 1 heart every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const setLanguage = (lang: 'en' | 'zh') => setState(p => ({ ...p, language: lang }));

  const addXp = (amount: number) => {
    setState(prev => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      
      while (newXp >= LEVEL_XP_REQ(newLevel)) {
        newXp -= LEVEL_XP_REQ(newLevel);
        newLevel++;
      }

      // No automatic level unlocks, users must purchase them in the shop.
      
      return { ...prev, xp: newXp, level: newLevel };
    });
  };

  const addCoins = (amount: number) => setState(p => ({ ...p, coins: p.coins + amount }));
  const addGems = (amount: number) => setState(p => ({ ...p, gems: p.gems + amount }));
  
  const loseHeart = () => setState(p => ({ 
    ...p, 
    hearts: Math.max(0, p.hearts - 1),
    currentStreak: 0 
  }));

  const incrementStreak = () => setState(p => {
    const newStreak = p.currentStreak + 1;
    return {
      ...p,
      currentStreak: newStreak,
      maxStreak: Math.max(p.maxStreak, newStreak)
    };
  });

  const resetStreak = () => setState(p => ({ ...p, currentStreak: 0 }));

  const unlockZone = (zoneId: string) => setState(p => ({
    ...p,
    unlockedZones: p.unlockedZones.includes(zoneId) ? p.unlockedZones : [...p.unlockedZones, zoneId]
  }));

  const completeLevel = (zoneId: string, starsEarned: number) => setState(p => {
    const currentStars = p.completedLevels[zoneId] || 0;
    const newStars = Math.max(currentStars, starsEarned);
    const totalStars = p.stars + (newStars - currentStars);
    
    return {
      ...p,
      completedLevels: { ...p.completedLevels, [zoneId]: newStars },
      stars: totalStars,
      hearts: p.maxHearts // Restore hearts to full on level completion!
    };
  });

  const buyItem = (itemId: string, price: number, currency: 'coins' | 'gems') => {
    if (state[currency] >= price && !state.inventory.includes(itemId)) {
      setState(p => ({
        ...p,
        [currency]: p[currency] - price,
        inventory: [...p.inventory, itemId]
      }));
      return true;
    }
    return false;
  };

  const equipItem = (itemId: string, type: 'character' | 'background' | 'pet') => {
    const isDefault = itemId === 'hero_sulan' || itemId === 'bg_default' || itemId === '';
    if (isDefault || state.inventory.includes(itemId)) {
      setState(p => {
        let field: keyof GameState;
        if (type === 'character') field = 'equippedAvatar';
        else if (type === 'background') field = 'equippedBackground';
        else field = 'equippedPet';
        
        return {
          ...p,
          [field]: itemId
        };
      });
    }
  };

  const claimAchievement = (achievementId: string, rewardCoins: number, rewardGems: number) => {
    setState(p => {
      const claimed = p.claimedAchievements || [];
      if (claimed.includes(achievementId)) return p;
      return {
        ...p,
        coins: p.coins + rewardCoins,
        gems: p.gems + rewardGems,
        claimedAchievements: [...claimed, achievementId]
      };
    });
  };

  return (
    <GameContext.Provider value={{
      ...state,
      setLanguage, addXp, addCoins, addGems, loseHeart, incrementStreak, resetStreak,
      unlockZone, completeLevel, buyItem, equipItem, claimAchievement
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
