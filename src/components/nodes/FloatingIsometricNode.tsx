import React from 'react';
import { RatioPeakIslandNode } from './RatioPeakIslandNode';
import { ForestCampIslandNode } from './ForestCampIslandNode';
import { FractionCastleNode } from './FractionCastleNode';
import { EquationFactoryNode } from './EquationFactoryNode';
import { DecimalOceanNode } from './DecimalOceanNode';
import { CircumferenceTempleNode } from './CircumferenceTempleNode';
import { CircleArenaNode } from './CircleArenaNode';
import { SpeedHighwayNode } from './SpeedHighwayNode';

interface FloatingIsometricNodeProps {
  unlocked: boolean;
  colors: {
    mountainLight: string;
    mountainMid: string;
    mountainDark: string;
    crystalLight: string;
    crystalDark: string;
    castleLight: string;
    castleDark: string;
    orbColor: string;
    dropShadow: string;
  };
  duration?: number;
  topic?: string | string[];
}

export const FloatingIsometricNode = ({ unlocked, colors, duration = 6, topic = 'U5_Ratio' }: FloatingIsometricNodeProps) => {
  const t = Array.isArray(topic) ? topic[0] : topic;

  switch (t) {
    case 'U1_GCF_LCM':
      return <ForestCampIslandNode unlocked={unlocked} colors={colors} duration={duration} />;
    case 'U2_Fraction_Division':
      return <FractionCastleNode unlocked={unlocked} colors={colors} duration={duration} />;
    case 'U3_Algebra':
      return <EquationFactoryNode unlocked={unlocked} colors={colors} duration={duration} />;
    case 'U4_Decimal_Division':
      return <DecimalOceanNode unlocked={unlocked} colors={colors} duration={duration} />;
    case 'U5_Ratio':
      return <RatioPeakIslandNode unlocked={unlocked} colors={colors} duration={duration} />;
    case 'U6_Circle_Circumference':
      return <CircumferenceTempleNode unlocked={unlocked} colors={colors} duration={duration} />;
    case 'U7_Circle_Area':
      return <CircleArenaNode unlocked={unlocked} colors={colors} duration={duration} />;
    case 'U8_Speed':
      return <SpeedHighwayNode unlocked={unlocked} colors={colors} duration={duration} />;
    default:
      return <RatioPeakIslandNode unlocked={unlocked} colors={colors} duration={duration} />;
  }
};
