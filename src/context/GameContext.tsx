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
  equippedBackground: 'bg_stage',
  equippedPet: '',
  inventory: ['hero_sulan', 'bg_stage']
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
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const LEVEL_XP_REQ = (level: number) => level * 100 + (level * level * 20);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem('mathQuestState');
    const parsed = saved ? JSON.parse(saved) : null;
    return { ...INITIAL_STATE, ...parsed, language: parsed?.language || 'zh' };
  });

  useEffect(() => {
    localStorage.setItem('mathQuestState', JSON.stringify(state));
  }, [state]);

  const setLanguage = (lang: 'en' | 'zh') => setState(p => ({ ...p, language: lang }));

  const addXp = (amount: number) => {
    setState(prev => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      
      while (newXp >= LEVEL_XP_REQ(newLevel)) {
        newXp -= LEVEL_XP_REQ(newLevel);
        newLevel++;
      }

      // Automatically unlock level-based outfits
      const newInventory = [...prev.inventory];
      const levelUnlocks = [
        { id: 'hero_pink_kimono', level: 4 },
        { id: 'hero_flower', level: 8 }
      ];
      levelUnlocks.forEach(item => {
        if (newLevel >= item.level && !newInventory.includes(item.id)) {
          newInventory.push(item.id);
        }
      });
      
      return { ...prev, xp: newXp, level: newLevel, inventory: newInventory };
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
      stars: totalStars
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
    if (itemId === '' || state.inventory.includes(itemId)) {
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

  return (
    <GameContext.Provider value={{
      ...state,
      setLanguage, addXp, addCoins, addGems, loseHeart, incrementStreak, resetStreak,
      unlockZone, completeLevel, buyItem, equipItem
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
