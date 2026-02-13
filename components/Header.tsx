
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
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchExpanded]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalScroll = docHeight - windowHeight;
      const progress = (scrollY / totalScroll) * 100;
      
      setScrolled(scrollY > 20);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getThemeIcon = () => {
    if (theme === 'light') return 'fa-sun';
    if (theme === 'dark') return 'fa-moon';
    return 'fa-star';
  };

  const socialIconClass = "w-8 h-8 flex items-center justify-center bg-transparent rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-110 hover:text-oracle-red";

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-oracle-red z-[70] transition-all duration-100 ease-out" style={{ width: `${scrollProgress}%` }}></div>
      
      <header 
        className={`fixed top-0 left-0 right-0 w-full z-[60] transition-all duration-500 pt-safe px-4 lg:px-8
          ${scrolled 
            ? 'h-20 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm' 
            : 'h-28 bg-transparent'
          }`}
      >
        <div className="container mx-auto h-full flex items-center justify-between">
          {!isSearchExpanded ? (
            <>
              {/* Logo Section */}
              <div className="flex items-center gap-4 shrink-0">
                <div 
                  className={`relative cursor-pointer group active:scale-90 transition-all duration-500 transform ${scrolled ? 'scale-75' : 'scale-100'}`}
                  onClick={onAvatarClick}
                >
                  {/* Pulsing Tech Ring */}
                  <div className="absolute inset-[-6px] rounded-full border border-oracle-red/30 animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-[-12px] rounded-full border border-oracle-red/10 animate-[pulse-ring_4s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative rounded-full overflow-hidden border-[3px] border-white dark:border-slate-800 shadow-2xl group-hover:border-oracle-red transition-all duration-500 bg-white dark:bg-slate-800 w-14 h-14 md:w-16 md:h-16">
                    <img 
                      src="/avatar.png" 
                      alt="Logo Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-[3px] border-white dark:border-slate-950 rounded-full shadow-lg"></div>
                </div>

                {/* Dynamic Brand Name */}
                <div 
                  className={`transition-all duration-500 flex flex-col cursor-pointer active:opacity-70 ${scrolled ? 'opacity-0 w-0 overflow-hidden md:opacity-100 md:w-auto' : 'opacity-100'}`}
                  onClick={onHomeClick}
                >
                  <h1 className="font-black uppercase tracking-tighter leading-none text-slate-900 dark:text-white text-xl md:text-2xl">
                    Oracle <span className="text-oracle-red">Universe</span>
                  </h1>
                </div>
              </div>

              {/* Navigation & Controls */}
              <div className="flex items-center gap-3">
                <div className="hidden xl:flex items-center gap-1 mr-4 border-r border-slate-200 dark:border-slate-800 pr-4">
                  <a href="#" className={socialIconClass}><i className="fab fa-facebook-f text-xs"></i></a>
                  <a href="#" className={socialIconClass}><i className="fab fa-youtube text-xs"></i></a>
                  <a href="#" className={socialIconClass}><i className="fab fa-linkedin-in text-xs"></i></a>
                </div>

                <div className={`rounded-full p-1.5 flex items-center gap-1 transition-all duration-300 ${scrolled ? 'bg-slate-100/50 dark:bg-slate-800/50' : 'glass-pill'}`}>
                  <button 
                    onClick={() => setIsSearchExpanded(true)}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:text-oracle-red hover:bg-white dark:hover:bg-slate-700 transition-all duration-300"
                    title="Search"
                  >
                    <i className="fas fa-search text-xs"></i>
                  </button>

                  <button 
                    onClick={onAboutClick}
                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${activeView === 'about' ? 'bg-oracle-red text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:text-oracle-red hover:bg-white dark:hover:bg-slate-700'}`}
                    title="About Author"
                  >
                    <i className="fas fa-user-ninja text-xs"></i>
                  </button>

                  <button 
                    onClick={onThemeToggle}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:text-oracle-red hover:bg-white dark:hover:bg-slate-700 transition-all duration-300"
                    title="Switch Reality"
                  >
                    <i className={`fas ${getThemeIcon()} text-xs`}></i>
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Improved Search View */
            <div className="w-full flex items-center gap-4 animate-scaleIn h-full">
              <div className="relative flex-grow max-w-2xl mx-auto">
                <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-oracle-red text-sm"></i>
                <input 
                  ref={inputRef}
                  type="text" 
                  placeholder="Search Database, Cloud, SQL..." 
                  className="w-full bg-slate-100 dark:bg-slate-900/80 border-none rounded-full pl-12 pr-6 py-3 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-oracle-red transition-all shadow-inner placeholder:text-slate-400"
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
                className="w-10 h-10 shrink-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-oracle-red rounded-full transition-all shadow-sm"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}
        </div>
      </header>
      
      {/* Spacer to prevent content jump when header becomes fixed/changes height */}
      <div className="h-28"></div>
    </>
  );
};

export default Header;
