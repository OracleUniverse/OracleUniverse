
import React from 'react';
import { MobileTab } from '../types';

interface BottomNavProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: MobileTab; icon: string; label: string }[] = [
    { id: 'feed', icon: 'fa-house', label: 'Feed' },
    { id: 'explore', icon: 'fa-compass', label: 'Explore' },
    { id: 'ai', icon: 'fa-robot', label: 'O-Bot' },
    { id: 'more', icon: 'fa-ellipsis', label: 'More' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-[999] shadow-[0_-10px_40px_rgba(0,0,0,0.12)] h-20 transition-colors duration-300">
      <div className="flex justify-around items-center h-full max-w-2xl mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 relative group ${
              activeTab === tab.id ? 'text-oracle-red' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {activeTab === tab.id && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1 bg-oracle-red rounded-b-full"></span>
            )}
            <div className={`mb-1 transition-transform duration-300 ${activeTab === tab.id ? 'scale-125 -translate-y-1' : 'group-hover:scale-110'}`}>
              <i className={`fas ${tab.icon} text-xl sm:text-2xl`}></i>
            </div>
            <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] transition-opacity ${activeTab === tab.id ? 'opacity-100' : 'opacity-60'}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
