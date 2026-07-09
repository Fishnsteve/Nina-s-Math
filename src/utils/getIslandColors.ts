export const getIslandColors = (topic: string | string[]) => {
  const t = Array.isArray(topic) ? topic[0] : topic;
  
  switch(t) {
    case 'U1_GCF_LCM': // Greens / Nature
      return {
        mountainLight: '#86efac', mountainMid: '#22c55e', mountainDark: '#166534',
        crystalLight: '#dcfce7', crystalDark: '#15803d',
        castleLight: '#4ade80', castleDark: '#14532d',
        orbColor: 'bg-green-400 text-green-400', dropShadow: 'rgba(74,222,128,0.5)'
      };
    case 'U2_Fraction_Division': // Blues / Water
      return {
        mountainLight: '#93c5fd', mountainMid: '#3b82f6', mountainDark: '#1e3a8a',
        crystalLight: '#dbeafe', crystalDark: '#1d4ed8',
        castleLight: '#60a5fa', castleDark: '#1e40af',
        orbColor: 'bg-blue-400 text-blue-400', dropShadow: 'rgba(96,165,250,0.5)'
      };
    case 'U3_Algebra': // Oranges / Fire / Factory
      return {
        mountainLight: '#fdba74', mountainMid: '#f97316', mountainDark: '#7c2d12',
        crystalLight: '#ffedd5', crystalDark: '#c2410c',
        castleLight: '#fb923c', castleDark: '#9a3412',
        orbColor: 'bg-orange-400 text-orange-400', dropShadow: 'rgba(251,146,60,0.5)'
      };
    case 'U4_Decimal_Division': // Cyans / Ice
      return {
        mountainLight: '#67e8f9', mountainMid: '#06b6d4', mountainDark: '#164e63',
        crystalLight: '#cffafe', crystalDark: '#0e7490',
        castleLight: '#22d3ee', castleDark: '#155e75',
        orbColor: 'bg-cyan-400 text-cyan-400', dropShadow: 'rgba(34,211,238,0.5)'
      };
    case 'U5_Ratio': // Purples / Magic
      return {
        mountainLight: '#d8b4fe', mountainMid: '#a855f7', mountainDark: '#581c87',
        crystalLight: '#f3e8ff', crystalDark: '#7e22ce',
        castleLight: '#c084fc', castleDark: '#6b21a8',
        orbColor: 'bg-purple-400 text-purple-400', dropShadow: 'rgba(192,132,252,0.5)'
      };
    case 'U6_Circle_Circumference': // Pinks / Fairy
      return {
        mountainLight: '#f9a8d4', mountainMid: '#ec4899', mountainDark: '#831843',
        crystalLight: '#fce7f3', crystalDark: '#be185d',
        castleLight: '#f472b6', castleDark: '#9d174d',
        orbColor: 'bg-pink-400 text-pink-400', dropShadow: 'rgba(244,114,182,0.5)'
      };
    case 'U7_Circle_Area': // Reds / Volcano
      return {
        mountainLight: '#fca5a5', mountainMid: '#ef4444', mountainDark: '#7f1d1d',
        crystalLight: '#fee2e2', crystalDark: '#b91c1c',
        castleLight: '#f87171', castleDark: '#991b1b',
        orbColor: 'bg-red-400 text-red-400', dropShadow: 'rgba(248,113,113,0.5)'
      };
    case 'U8_Speed': // Yellows / Lightning
      return {
        mountainLight: '#fde047', mountainMid: '#eab308', mountainDark: '#713f12',
        crystalLight: '#fef9c3', crystalDark: '#a16207',
        castleLight: '#facc15', castleDark: '#854d0e',
        orbColor: 'bg-yellow-400 text-yellow-400', dropShadow: 'rgba(250,204,21,0.5)'
      };
    default: // Default Gray/Stone
      return {
        mountainLight: '#cbd5e1', mountainMid: '#64748b', mountainDark: '#0f172a',
        crystalLight: '#f1f5f9', crystalDark: '#334155',
        castleLight: '#94a3b8', castleDark: '#1e293b',
        orbColor: 'bg-slate-400 text-slate-400', dropShadow: 'rgba(148,163,184,0.5)'
      };
  }
}
