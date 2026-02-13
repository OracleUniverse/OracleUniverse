
import React from 'react';
import PostList from './PostList';
import { BlogPost } from '../types';

interface HomePageProps {
  posts: BlogPost[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  categories: string[];
  onPostClick: (post: BlogPost) => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  posts, 
  activeCategory, 
  onCategoryChange, 
  categories,
  onPostClick
}) => {
  const pluginIdeas = [
    {
      title: 'SQL Formatter Pro',
      icon: 'fa-code',
      description: 'A cloud-based SQL formatter supporting Oracle 23c syntax and custom enterprise style guides.',
      status: 'Idea Stage',
      tags: ['Development', 'Tools']
    },
    {
      title: 'PL/SQL Debugger Extension',
      icon: 'fa-terminal',
      description: 'VS Code extension for real-time remote debugging of PL/SQL procedures in OCI environments.',
      status: 'Conceptual',
      tags: ['VS Code', 'OCI']
    },
    {
      title: 'Cost Estimator Widget',
      icon: 'fa-calculator',
      description: 'Interactive widget to estimate OCI Autonomous Database costs based on real-time workload metrics.',
      status: 'Draft',
      tags: ['Cloud', 'Finance']
    }
  ];

  return (
    <div className="animate-fadeIn space-y-16 pb-12 w-full overflow-hidden relative">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-oracle-red/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Hero Section */}
      <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto mb-12 pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-oracle-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-oracle-red"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Live Insights</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.9]">
          Oracle <span className="text-transparent bg-clip-text bg-gradient-to-br from-oracle-red to-red-600">Universe</span>
        </h1>
        
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed px-4">
          Architecting the future of data. Deep dives into 23c, OCI, and high-performance SQL.
        </p>
      </div>

      {/* Floating Dock Category Selector */}
      <div className="relative z-20 flex justify-center mb-16 px-4">
        <div className="glass-pill p-2 rounded-2xl md:rounded-full flex gap-2 overflow-x-auto no-scrollbar max-w-full shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-xl md:rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-0.5 ${
                activeCategory === cat 
                  ? 'bg-oracle-red text-white shadow-lg' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Feed */}
      <div className="w-full relative z-10">
        <PostList posts={posts} onPostClick={onPostClick} />
      </div>

      {/* Innovation Lab */}
      <div className="pt-24 space-y-16 relative z-10">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <span className="text-oracle-red font-black uppercase tracking-[0.3em] text-[10px]">Innovation Lab</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase mt-2">Plugin Universe</h2>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-oracle-red transition">
            View Roadmap <i className="fas fa-arrow-right"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pluginIdeas.map((plugin, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-oracle-red mb-8 group-hover:scale-110 transition-transform duration-500">
                <i className={`fas ${plugin.icon} text-2xl`}></i>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{plugin.title}</h3>
                  <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-oracle-red transition-colors"></div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">{plugin.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {plugin.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border border-slate-100 dark:border-slate-800 px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
