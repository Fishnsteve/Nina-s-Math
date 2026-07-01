import { Map, User, Music } from 'lucide-react';
import { cn } from '../lib/utils';
import { useGame } from '../context/GameContext';
import { translations } from '../i18n';

interface BottomNavProps {
  currentTab: 'map' | 'studio' | 'profile';
  setTab: (tab: 'map' | 'studio' | 'profile') => void;
}

export function BottomNav({ currentTab, setTab }: BottomNavProps) {
  const { language } = useGame();
  const t = translations[language];

  const tabs = [
    { id: 'map', label: t.nav.map, icon: Map },
    { id: 'studio', label: t.nav.studio, icon: Music },
    { id: 'profile', label: t.nav.profile, icon: User },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/5 backdrop-blur-xl border-t border-white/10 pb-safe z-50">
      <div className="max-w-7xl mx-auto flex justify-around items-center p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id as any)}
              className={cn(
                "flex flex-col items-center justify-center w-full py-2 px-4 rounded-xl transition-all duration-200",
                isActive ? "text-blue-400 opacity-100" : "text-slate-300 opacity-50 hover:opacity-100 hover:text-white"
              )}
            >
              <div className={cn(
                "w-10 h-10 flex items-center justify-center rounded-xl mb-1 transition-all",
                isActive ? "bg-blue-500/20 border border-blue-400/30" : "bg-transparent"
              )}>
                <Icon className={cn("w-5 h-5", isActive && "fill-blue-500/20")} />
              </div>
              <span className="text-[10px] font-bold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
