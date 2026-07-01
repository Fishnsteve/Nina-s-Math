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

function AppContent() {
  const [activeTab, setActiveTab] = useState<'map' | 'studio' | 'profile'>('map');
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const { equippedBackground } = useGame();

  let bgClass = "bg-gradient-to-b from-blue-900/20 via-indigo-900/10 to-slate-900/40";
  let circle1 = "bg-purple-600/30";
  let circle2 = "bg-blue-600/20";
  let baseBg = "bg-[#1a1c2c]";

  if (equippedBackground === 'bg_stage') {
    bgClass = "bg-gradient-to-b from-rose-900/20 via-pink-900/10 to-stone-900/50";
    circle1 = "bg-rose-600/30";
    circle2 = "bg-pink-600/20";
    baseBg = "bg-[#25181e]";
  } else if (equippedBackground === 'bg_street') {
    bgClass = "bg-gradient-to-b from-orange-900/20 via-amber-900/10 to-stone-900/50";
    circle1 = "bg-orange-600/30";
    circle2 = "bg-amber-600/20";
    baseBg = "bg-[#261f1c]";
  }

  return (
    <div className={`font-sans text-slate-100 ${baseBg} min-h-screen relative overflow-hidden flex flex-col transition-colors duration-1000`}>
      <div className={`fixed top-[-10%] left-[-10%] w-[400px] h-[400px] ${circle1} rounded-full blur-[120px] pointer-events-none z-0 transition-colors duration-1000`}></div>
      <div className={`fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] ${circle2} rounded-full blur-[120px] pointer-events-none z-0 transition-colors duration-1000`}></div>
      <div className={`fixed inset-0 ${bgClass} pointer-events-none z-0 transition-colors duration-1000`}></div>

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

