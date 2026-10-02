import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Heart, Gift, Image, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  const navs = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'couple', label: 'Love', icon: Heart },
    { id: 'gifts', label: 'Gifts', icon: Gift },
    { id: 'memories', label: 'Memories', icon: Image },
    { id: 'dashboard', label: 'Profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden backdrop-blur-xl bg-slate-950/90 border-t border-rose-900/30 px-3 py-2">
      <div className="flex items-center justify-around">
        {navs.map(item => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                isActive
                  ? 'text-rose-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-rose-400 fill-rose-500/20' : ''}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
