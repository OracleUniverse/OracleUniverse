
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
    <div className="animate-fadeIn space-y-12 md:space-y-16 pb-12 w-full overflow-hidden">
      {/* Refined Hero Section for Mobile */}
      <div className="text-center space-y-4 md:space-y-6 max-w-2xl mx-auto mb-8 md:mb-16 pt-4 md:pt-8">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.9] sm:leading-none">
          ORACLE <span className="text-oracle-red block sm:inline">INSIGHTS</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-base md:text-xl max-w-lg mx-auto leading-relaxed px-4">
          Deep dives into performance, architecture, and code for the modern database architect.
        </p>
      </div>

      {/* Mobile-Optimized Horizontal Scroll Categories */}
      <div className="relative -mx-4 px-4 mb-10">
        <div className="flex overflow-x-auto no-scrollbar gap-2 md:gap-4 pb-4 md:justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`flex-shrink-0 flex flex-col items-center justify-center min-w-[90px] md:min-w-[110px] h-12 md:h-16 px-4 md:px-6 rounded-xl md:rounded-3xl border transition-all duration-300 transform active:scale-95 relative ${
                activeCategory === cat 
                  ? 'bg-oracle-red border-oracle-red text-white shadow-xl shadow-red-500/20 -translate-y-0.5' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-oracle-red/40'
              }`}
            >
              <span className="text-[9px] md:text-xs font-black uppercase tracking-widest text-center">
                {cat}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Articles Feed */}
      <div className="w-full">
        <PostList posts={posts} onPostClick={onPostClick} />
      </div>

      {/* Integrated Innovation Lab for Mobile */}
      <div className="pt-16 md:pt-24 space-y-10 md:space-y-16">
        <div className="text-center space-y-3 md:space-y-4 max-w-3xl mx-auto px-4">
          <span className="text-oracle-red font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">Innovation Lab</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">PLUGIN UNIVERSE</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-lg font-medium leading-relaxed">
            Upcoming tools to supercharge your Oracle workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pluginIdeas.map((plugin, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 dark:bg-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center text-oracle-red mb-6 md:mb-8 group-hover:bg-oracle-red group-hover:text-white transition-all duration-500">
                <i className={`fas ${plugin.icon} text-xl md:text-2xl`}></i>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{plugin.title}</h3>
                  <span className="bg-slate-50 dark:bg-slate-800 text-slate-400 text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">{plugin.status}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed font-medium">{plugin.description}</p>
                <div className="flex flex-wrap gap-2 pt-2 md:pt-4">
                  {plugin.tags.map(tag => (
                    <span key={tag} className="text-[8px] md:text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border border-slate-100 dark:border-slate-800 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 dark:bg-black rounded-3xl md:rounded-[3rem] p-8 md:p-12 text-center text-white border border-white/5 relative overflow-hidden shadow-2xl mx-auto max-w-4xl">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-oracle-red/5 to-transparent pointer-events-none"></div>
           <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-2 md:mb-4 relative z-10">Have a Plugin Idea?</h2>
           <p className="text-slate-400 text-xs md:text-sm font-medium max-w-xs md:max-w-lg mx-auto mb-6 md:mb-8 relative z-10">
             We are looking for ways to extend the Oracle ecosystem.
           </p>
           <button className="bg-oracle-red text-white px-8 md:px-10 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-white hover:text-oracle-red transition-all shadow-xl active:scale-95 relative z-10">
             Submit Proposal
           </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
