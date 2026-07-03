/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { WorldMap } from './components/WorldMap';
import { GameSession } from './components/GameSession';
import { Profile } from './components/Profile';
import { DanceStudio } from './components/DanceStudio';
import { BackgroundVisuals } from './components/BackgroundVisuals';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'map' | 'studio' | 'profile'>('map');
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const { equippedBackground } = useGame();

  const [canInstall, setCanInstall] = useState<boolean>(!!(window as any).getDeferredPrompt?.());
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0 });
    }
  }, [activeTab]);

  useEffect(() => {
    setCanInstall(!!(window as any).getDeferredPrompt?.());

    const handlePwaInstallable = () => {
      setCanInstall(!!(window as any).getDeferredPrompt?.());
    };
    window.addEventListener('pwa-installable', handlePwaInstallable);

    const handleAppInstalled = () => {
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
    const promptEvent = (window as any).getDeferredPrompt?.();
    if (!promptEvent) return;
    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    console.log(`User chosen: ${outcome}`);
    (window as any).clearDeferredPrompt?.();
    setCanInstall(false);
  };

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
          <div ref={scrollContainerRef} className="relative z-10 flex flex-col h-full overflow-y-auto overflow-x-hidden flex-1">
            <TopBar />
            
            {/* Elegant Floating PWA Banner */}
            <AnimatePresence>
              {canInstall && !isDismissed && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="mx-4 mt-2 mb-1 p-3.5 bg-gradient-to-r from-pink-600 via-pink-500 to-purple-600 rounded-2xl shadow-lg border border-pink-400/30 flex items-center justify-between gap-4 z-40 relative overflow-hidden shrink-0"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-center gap-3">
                    <img 
                      src="/icon.svg?v=2" 
                      alt="Nina Icon" 
                      className="w-10 h-10 rounded-xl bg-slate-950/40 p-1 border border-pink-300/30 object-contain shadow-inner shrink-0" 
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-black text-xs sm:text-sm text-white tracking-wide">
                        Install Nina's Quest!
                      </h4>
                      <p className="text-[10px] sm:text-xs text-pink-100 font-medium">
                        Play in full-screen on desktop or mobile
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={handleInstallClick}
                      className="py-1.5 px-3.5 bg-white text-pink-600 font-black text-xs rounded-xl shadow-md hover:bg-pink-50 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Install
                    </button>
                    <button
                      onClick={() => setIsDismissed(true)}
                      className="p-1.5 text-pink-100 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                      aria-label="Dismiss"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <main className="flex-1 w-full flex flex-col relative">
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 w-full flex flex-col"
                >
                  {activeTab === 'map' && <WorldMap onSelectZone={setActiveZone} />}
                  {activeTab === 'studio' && <DanceStudio />}
                  {activeTab === 'profile' && <Profile />}
                </motion.div>
              </AnimatePresence>
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

