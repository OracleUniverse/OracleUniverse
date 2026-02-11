import React, { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  onHomeClick: () => void;
  onAboutClick: () => void;
  onAvatarClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  theme: 'light' | 'dark' | 'midnight';
  onThemeToggle: () => void;
  activeView: string;
}

const Header: React.FC<HeaderProps> = ({ 
  onHomeClick, 
  onAboutClick,
  onAvatarClick,
  searchQuery, 
  onSearchChange,
  theme,
  onThemeToggle,
  activeView
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const getThemeIcon = () => {
    if (theme === 'light') return 'fa-sun';
    if (theme === 'dark') return 'fa-moon';
    return 'fa-star';
  };

  const socialIconClass = "w-9 h-9 flex items-center justify-center bg-white/40 dark:bg-slate-800/40 rounded-full text-slate-400 dark:text-slate-500 transition-all duration-300 hover:scale-110 hover:text-oracle-red";

  return (
    <header className="relative w-full z-[60] bg-transparent h-32 pt-safe">
      <div className="container mx-auto px-4 lg:px-8 h-full flex items-center justify-between">
        {!isSearchExpanded ? (
          <>
            {/* Logo Section */}
            <div className="flex items-center gap-4 shrink-0">
              <div 
                className="relative cursor-pointer group active:scale-90 transition-all duration-500 transform scale-100"
                onClick={onAvatarClick}
              >
                {/* Pulsing Tech Ring */}
                <div className="absolute inset-[-6px] rounded-full border border-oracle-red/30 animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-[-12px] rounded-full border border-oracle-red/10 animate-[pulse-ring_4s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative rounded-full overflow-hidden border-[3px] border-white dark:border-slate-800 shadow-2xl group-hover:border-oracle-red transition-all duration-500 bg-white dark:bg-slate-800 w-16 h-16">
                  <img 
                    src="/avatar.png" 
                    alt="Logo Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Status Indicator */}
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-[3px] border-white dark:border-slate-950 rounded-full shadow-lg"></div>
              </div>

              {/* Dynamic Brand Name */}
              <div 
                className="transition-all duration-700 flex flex-col cursor-pointer active:opacity-70"
                onClick={onHomeClick}
              >
                <h1 className="font-black uppercase tracking-tighter leading-none text-slate-900 dark:text-white transition-all text-2xl">
                  Oracle <span className="text-oracle-red">Universe</span>
                </h1>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mt-1">
                  Principal Intelligence
                </p>
              </div>
            </div>

            {/* Navigation & Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden xl:flex items-center gap-2 mr-4">
                <a href="#" className={socialIconClass}><i className="fab fa-facebook-f text-xs"></i></a>
                <a href="#" className={socialIconClass}><i className="fab fa-youtube text-xs"></i></a>
                <a href="#" className={socialIconClass}><i className="fab fa-linkedin-in text-xs"></i></a>
              </div>

              <div className="glass-pill rounded-2xl p-1 flex items-center gap-1 shadow-inner">
                <button 
                  onClick={() => setIsSearchExpanded(true)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:text-oracle-red hover:bg-white dark:hover:bg-slate-800 transition-all duration-300"
                  title="Search"
                >
                  <i className="fas fa-search text-xs"></i>
                </button>

                <button 
                  onClick={onAboutClick}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${activeView === 'about' ? 'bg-oracle-red text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:text-oracle-red hover:bg-white dark:hover:bg-slate-800'}`}
                  title="About Author"
                >
                  <i className="fas fa-user-ninja text-xs"></i>
                </button>

                <button 
                  onClick={onThemeToggle}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:text-oracle-red hover:bg-white dark:hover:bg-slate-800 transition-all duration-300"
                  title="Switch Reality"
                >
                  <i className={`fas ${getThemeIcon()} text-xs`}></i>
                </button>
              </div>

              <button className="relative group bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase overflow-hidden shadow-xl transition-all active:scale-95 hidden sm:block">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Join Fleet</span>
                <div className="absolute inset-0 bg-oracle-red translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              </button>
            </div>
          </>
        ) : (
          /* Improved Search View */
          <div className="w-full flex items-center gap-4 animate-scaleIn h-full py-4">
            <div className="relative flex-grow">
              <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-oracle-red text-sm"></i>
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Search Database, Cloud, SQL, PL/SQL..." 
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-14 pr-6 py-4 text-base font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-oracle-red/10 focus:border-oracle-red transition-all shadow-xl placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Escape' && setIsSearchExpanded(false)}
              />
            </div>
            <button 
              onClick={() => {
                onSearchChange('');
                setIsSearchExpanded(false);
              }}
              className="w-14 h-14 shrink-0 flex items-center justify-center bg-white dark:bg-slate-900 text-slate-400 hover:text-oracle-red border border-slate-200 dark:border-slate-800 rounded-2xl transition-all shadow-lg active:scale-95"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;