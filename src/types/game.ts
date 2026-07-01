export type Topic = 
  | 'U1_GCF_LCM' 
  | 'U2_Fraction_Division' 
  | 'U3_Algebra' 
  | 'U4_Decimal_Division' 
  | 'U5_Ratio' 
  | 'U6_Circle_Circumference' 
  | 'U7_Circle_Area' 
  | 'U8_Speed';

export type LocalizedString = { en: string; zh: string };
export type LocalizedStringArray = { en: string[]; zh: string[] };

export interface Question {
  id: string;
  topic: Topic;
  question: LocalizedString;
  options: LocalizedStringArray;
  correctAnswer: number; // index of the correct option
  explanation: LocalizedString;
  difficulty: 'Easy' | 'Normal' | 'Hard';
}

export interface Zone {
  id: string;
  name: LocalizedString;
  topic: Topic;
  description: LocalizedString;
  icon: string;
  color: string;
  requiredLevel: number;
}

export interface GameState {
  language: 'en' | 'zh';
  xp: number;
  level: number;
  coins: number;
  gems: number;
  stars: number;
  hearts: number;
  maxHearts: number;
  currentStreak: number;
  maxStreak: number;
  unlockedZones: string[];
  completedLevels: Record<string, number>; // zoneId -> stars
  equippedAvatar: string;
  equippedBackground: string;
  equippedPet: string;
  inventory: string[];
}

export interface AvatarItem {
  id: string;
  name: LocalizedString;
  type: 'character' | 'background' | 'pet';
  price: number;
  currency: 'coins' | 'gems';
  image: string;
}
