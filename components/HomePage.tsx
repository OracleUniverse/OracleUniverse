import React from 'react';
import { BlogPost } from '../types';
import PostList from './PostList';

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
  return (
    <div className="animate-fadeIn space-y-8 pb-32 w-full overflow-hidden relative">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-oracle-red/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Hero Header */}
      <div className="relative z-10 text-center space-y-4 max-w-4xl mx-auto py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-oracle-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-oracle-red"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Mastering the Ecosystem</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
          Oracle <span className="text-oracle-red text-glow">Universe</span>
        </h1>
      </div>

      {/* Category Filter */}
      <div className="relative z-10 flex flex-wrap justify-center gap-3 mb-10 max-w-4xl mx-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-6 py-2.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all shadow-sm ${activeCategory === cat ? 'bg-oracle-red text-white shadow-oracle-red/20' : 'bg-white dark:bg-slate-800 text-slate-500 hover:text-oracle-red hover:shadow-md border border-slate-200 dark:border-slate-700'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Unified Posts Archive */}
      <div className="relative z-10">
        <PostList posts={posts} onPostClick={onPostClick} />
      </div>
    </div>
  );
};

export default HomePage;
