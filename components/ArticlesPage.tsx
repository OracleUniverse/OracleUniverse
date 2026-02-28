
import React, { useState } from 'react';
import PostList from './PostList';
import PostDetail from './PostDetail';
import { BlogPost } from '../types';

interface ArticlesPageProps {
  posts: BlogPost[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  categories: string[];
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ posts, activeCategory, onCategoryChange, categories }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="animate-fadeIn max-w-4xl mx-auto py-4">
        <PostDetail 
          post={selectedPost} 
          allPosts={posts} 
          onBack={() => setSelectedPost(null)} 
          onPostClick={setSelectedPost} 
        />
      </div>
    );
  }

  return (
    <div className="animate-fadeIn space-y-12">
      {/* Title Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Technical <span className="text-oracle-red">ORACLE UNIVERSE</span></h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Deep dives into performance, architecture, and code.</p>
      </div>

      {/* Centralized Rounded Rectangle Filters - Icons Removed */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`flex flex-col items-center justify-center min-w-[100px] h-14 md:h-16 px-6 rounded-2xl md:rounded-3xl border transition-all duration-300 transform active:scale-95 ${
              activeCategory === cat 
                ? 'bg-oracle-red border-oracle-red text-white shadow-2xl shadow-red-500/30 -translate-y-1' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-oracle-red/40 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm'
            }`}
          >
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-center">
              {cat}
            </span>
          </button>
        ))}
      </div>

      <div className="pt-6">
        <PostList posts={posts} onPostClick={setSelectedPost} />
      </div>
    </div>
  );
};

export default ArticlesPage;
