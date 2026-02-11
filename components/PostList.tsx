
import React from 'react';
import { BlogPost } from '../types';

interface PostListProps {
  posts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onPostClick }) => {
  if (posts.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-10 md:p-12 text-center my-6 w-full">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
          <i className="fas fa-magnifying-glass text-2xl md:text-3xl text-slate-300 dark:text-slate-600"></i>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">No nodes found</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Query returned 0 results. Refine your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-10 w-full px-2 md:px-0">
      {posts.map((post) => (
        <article 
          key={post.id} 
          className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col cursor-pointer active:scale-[0.98]"
          onClick={() => onPostClick(post)}
        >
          <div className="relative h-48 sm:h-64 md:h-52 lg:h-56 overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute top-3 right-3 md:top-4 md:right-4">
              <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-oracle-red text-[8px] md:text-[10px] font-black px-2.5 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg uppercase tracking-widest">
                {post.category}
              </span>
            </div>
            <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 flex items-center gap-2 text-white/90 text-[8px] md:text-[10px] font-bold uppercase tracking-wider">
               <i className="far fa-calendar-alt"></i>
               <span>{post.date}</span>
            </div>
          </div>
          
          <div className="p-5 md:p-6 flex-grow flex flex-col">
            <h2 className="text-base md:text-lg font-black text-slate-900 dark:text-white group-hover:text-oracle-red transition mb-2 md:mb-3 leading-snug">
              {post.title}
            </h2>
            
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-2">
              {post.excerpt}
            </p>
            
            <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                  <i className="fas fa-user text-[8px] md:text-[10px] text-slate-400"></i>
                </div>
                <span className="text-[9px] md:text-[10px] font-bold text-slate-600 dark:text-slate-400">{post.author}</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center group-hover:bg-oracle-red group-hover:text-white transition">
                <i className="fas fa-arrow-right text-[10px] md:text-xs"></i>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default PostList;
