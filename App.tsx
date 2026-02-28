import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import PostDetail from './components/PostDetail';
import AboutPage from './components/AboutPage';
import HomePage from './components/HomePage';
import Sidebar from './components/Sidebar';
import OracleAssistant from './components/OracleAssistant';
import BottomNav from './components/BottomNav';
import AboutMeModal from './components/AboutMeModal';
import { BLOG_POSTS, CATEGORIES } from './constants';
import { BlogPost, ViewState, MobileTab } from './types';

export type ThemeMode = 'light' | 'dark' | 'midnight';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [activeMobileTab, setActiveMobileTab] = useState<MobileTab>('feed');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>((localStorage.getItem('oti-theme') as ThemeMode) || 'light');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'midnight');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'midnight') {
      root.classList.add('midnight', 'dark');
    } else {
      root.classList.add('light');
    }
    localStorage.setItem('oti-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'midnight';
      return 'light';
    });
  };

  const handleTabChange = (tab: MobileTab) => {
    setActiveMobileTab(tab);
    if (tab !== 'feed') {
      setCurrentView('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentView('post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setSelectedPost(null);
    setActiveMobileTab('feed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [scrollToContact, setScrollToContact] = useState(false);

  const handleGoToContact = () => {
    setIsAboutModalOpen(false);
    setCurrentView('about');
    setSelectedPost(null);
    setActiveMobileTab('feed');
    setScrollToContact(true);
    // Reset the state after a delay to allow re-triggering if needed
    setTimeout(() => setScrollToContact(false), 2000);
  };

  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
    setSelectedPost(null);
    setActiveMobileTab('feed');
    setScrollToContact(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (activeMobileTab !== 'feed') {
      switch (activeMobileTab) {
        case 'explore':
          return (
            <div className="lg:hidden py-4 space-y-8 max-w-2xl mx-auto">
              <Sidebar
                categories={CATEGORIES}
                activeCategory={activeCategory}
                onCategoryChange={(cat) => {
                  setActiveCategory(cat);
                  setActiveMobileTab('feed');
                  setCurrentView('home');
                }}
              />
            </div>
          );
        case 'ai':
          return (
            <div className="lg:hidden py-4 h-[calc(100vh-16rem)] min-h-[500px] max-w-2xl mx-auto">
              <OracleAssistant />
            </div>
          );
        case 'more':
          return (
            <div className="lg:hidden py-6 text-center space-y-8 max-w-xl mx-auto">
              <div
                className="relative isolate w-48 h-48 bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-md rounded-full mx-auto overflow-hidden shadow-xl cursor-pointer p-2 border border-slate-200 dark:border-slate-700"
                onClick={() => setIsAboutModalOpen(true)}
              >
                <div className="absolute inset-[-20%] bg-oracle-red/30 liquid-shape blur-[20px] -z-10 animate-pulse-slow"></div>
                <img src="/avatar.png" alt="Author" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-4 px-4">
                <button onClick={handleGoHome} className="relative isolate overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-100 dark:border-slate-800 font-black text-xs uppercase tracking-widest text-slate-800 dark:text-white group">
                  <div className="absolute inset-[-50%] bg-oracle-red/10 liquid-shape blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                  Home
                </button>
                <button onClick={() => navigateTo('about')} className="relative isolate overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-100 dark:border-slate-800 font-black text-xs uppercase tracking-widest text-slate-800 dark:text-white group">
                  <div className="absolute inset-[-50%] bg-oracle-red/10 liquid-shape blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                  About
                </button>
              </div>
            </div>
          );
      }
    }

    switch (currentView) {
      case 'post':
        return selectedPost ? <div className="max-w-4xl mx-auto w-full"><PostDetail post={selectedPost} allPosts={BLOG_POSTS} onBack={handleGoHome} onPostClick={handlePostClick} /></div> : null;
      case 'about':
        return <AboutPage onBack={handleGoHome} scrollToContact={scrollToContact} />;
      case 'home':
      default:
        return (
          <HomePage
            posts={filteredPosts}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categories={CATEGORIES}
            onPostClick={handlePostClick}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300 w-full overflow-x-hidden relative">
      {/* Premium Aurora Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-oracle-red/5 liquid-shape blur-[100px] animate-aurora"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-oracle-red/5 liquid-shape blur-[100px] animate-aurora [animation-delay:-5s]"></div>
      </div>
      <Header
        onHomeClick={handleGoHome}
        onAboutClick={() => navigateTo('about')}
        onAvatarClick={() => setIsAboutModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery} theme={theme} onThemeToggle={toggleTheme} activeView={currentView}
      />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 lg:bottom-10 right-6 lg:right-10 z-[55] w-12 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-oracle-red hover:shadow-xl hover:shadow-oracle-red/20 transition-all duration-500 shadow-lg active:scale-90 ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
        title="Back to top"
      >
        <i className="fas fa-chevron-up"></i>
      </button>

      <main className="flex-grow container mx-auto px-4 lg:px-6 pt-8 pb-32 lg:pb-40 flex flex-col gap-12 min-w-0 relative z-10">
        <div className="w-full min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMobileTab !== 'feed' ? activeMobileTab : currentView + (selectedPost?.id || '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AboutMeModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} onContactClick={handleGoToContact} />

      <BottomNav activeTab={activeMobileTab} onTabChange={handleTabChange} />

      <footer className="hidden lg:block bg-[#0a0a0a] text-white overflow-hidden relative border-t border-white/5 mt-auto">
        {/* Footer Liquid Background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-oracle-red/10 liquid-shape blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-oracle-red/5 liquid-shape blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-4 space-y-8">
              <div className="flex items-center gap-4 group cursor-pointer" onClick={handleGoHome}>
                <div className="w-14 h-14 rounded-2xl bg-white p-1 transform group-hover:rotate-12 transition-transform duration-500 shadow-2xl">
                  <img src="/avatar.png" className="w-full h-full object-cover rounded-xl" alt="Footer Logo" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">ORACLE</h3>
                  <p className="text-oracle-red font-black text-[10px] uppercase tracking-[0.2em]">UNIVERSE</p>
                </div>
              </div>
              <p className="text-slate-400 text-base font-medium leading-relaxed max-sm">
                Empowering architects with precision intelligence. The definitive source for high-performance Oracle ecosystem insights.
              </p>
              <div className="flex gap-4">
                <button onClick={scrollToTop} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition group">
                  <span className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center group-hover:bg-oracle-red group-hover:border-oracle-red transition">
                    <i className="fas fa-arrow-up"></i>
                  </span>
                  Back to Top
                </button>
              </div>
            </div>

            <div className="md:col-span-5 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-oracle-red mb-8">Navigation</h4>
                <ul className="space-y-5 text-slate-400 text-sm font-bold uppercase tracking-wider">
                  <li><button onClick={handleGoHome} className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-800"></span> Home</button></li>
                  <li><button onClick={() => navigateTo('about')} className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-800"></span> The Author</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-oracle-red mb-8">Connect</h4>
                <ul className="space-y-5 text-slate-400 text-sm font-bold uppercase tracking-wider">
                  <li><a href="#" className="hover:text-[#1877F2] transition-colors flex items-center gap-3"><i className="fab fa-facebook-f w-5"></i> Facebook</a></li>
                  <li><a href="https://youtube.com/@oracle-universe?si=nCN9JzTTuPf2MVh1" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors flex items-center gap-3"><i className="fab fa-youtube w-5"></i> YouTube</a></li>
                  <li><a href="https://linkedin.com/company/oracleuniverse" target="_blank" rel="noopener noreferrer" className="hover:text-[#0A66C2] transition-colors flex items-center gap-3"><i className="fab fa-linkedin-in w-5"></i> LinkedIn</a></li>
                  <li><button onClick={handleGoToContact} className="hover:text-white transition-colors flex items-center gap-3"><i className="fas fa-envelope w-5"></i> Direct Mail</button></li>

                </ul>
              </div>
            </div>

            <div className="md:col-span-3 space-y-10">
              <div className="p-6 bg-slate-900/50 rounded-3xl border border-white/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-white">Subscribe to Insights</h4>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">No spam. Only elite technical updates.</p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email address..."
                    className="w-full bg-[#151515] border border-slate-800 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-oracle-red transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-oracle-red rounded-xl flex items-center justify-center hover:bg-white hover:text-oracle-red transition-all shadow-xl">
                    <i className="fas fa-chevron-right text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">
            <div>© {new Date().getFullYear()} ORACLE UNIVERSE. All rights reserved.</div>
            <div className="flex gap-8 text-[9px] text-slate-600 font-black uppercase tracking-widest">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;