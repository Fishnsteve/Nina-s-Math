/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { WorldMap } from './components/WorldMap';
import { GameSession } from './components/GameSession';
import { Profile } from './components/Profile';
import { DanceStudio } from './components/DanceStudio';
import { BackgroundVisuals } from './components/BackgroundVisuals';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'map' | 'studio' | 'profile'>('map');
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const { equippedBackground } = useGame();

  let bgClass = "bg-gradient-to-b from-blue-900/20 via-indigo-900/10 to-slate-900/40";
  let circle1 = "bg-purple-600/30";
  let circle2 = "bg-blue-600/20";
  let baseBg = "bg-[#0b0f19]";

  if (equippedBackground === 'bg_forest') {
    bgClass = "bg-gradient-to-b from-emerald-900/40 via-green-900/20 to-slate-900/50";
    circle1 = "bg-emerald-600/40";
    circle2 = "bg-green-600/30";
    baseBg = "bg-[#0f1712]";
  } else if (equippedBackground === 'bg_castle') {
    bgClass = "bg-gradient-to-b from-amber-900/40 via-orange-900/20 to-slate-900/50";
    circle1 = "bg-amber-600/40";
    circle2 = "bg-orange-600/30";
    baseBg = "bg-[#17130f]";
  } else if (equippedBackground === 'bg_ocean') {
    bgClass = "bg-gradient-to-b from-cyan-900/40 via-blue-900/20 to-slate-900/50";
    circle1 = "bg-cyan-600/40";
    circle2 = "bg-blue-600/30";
    baseBg = "bg-[#0f1417]";
  } else if (equippedBackground === 'bg_cyber') {
    bgClass = "bg-gradient-to-b from-fuchsia-900/40 via-indigo-900/20 to-slate-900/50";
    circle1 = "bg-fuchsia-600/40";
    circle2 = "bg-indigo-600/30";
    baseBg = "bg-[#140f17]";
  }

  return (
    <div className={`font-sans text-slate-100 ${baseBg} min-h-screen relative overflow-hidden flex flex-col transition-colors duration-1000`}>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundVisuals bgId={equippedBackground} />
      </div>

      {activeZone ? (
        <GameSession zoneId={activeZone} onExit={() => setActiveZone(null)} />
      ) : (
        <>
          <div className="relative z-10 flex flex-col h-full overflow-y-auto overflow-x-hidden flex-1">
            <TopBar />
            
            <main className="flex-1">
              {activeTab === 'map' && <WorldMap onSelectZone={setActiveZone} />}
              {activeTab === 'studio' && <DanceStudio />}
              {activeTab === 'profile' && <Profile />}
            </main>
          </div>

          <BottomNav currentTab={activeTab} setTab={setActiveTab} />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

