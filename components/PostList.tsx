import React from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '../types';

interface PostListProps {
  posts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onPostClick }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 225;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-12 text-center my-6 w-full"
      >
        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-magnifying-glass text-3xl text-slate-300 dark:text-slate-600"></i>
        </div>
        <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">No data found</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Refine your search parameters to locate nodes.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 w-full px-2 md:px-0"
    >
      {posts.map((post) => (
        <motion.article
          key={post.id}
          variants={item}
          className="group liquid-card flex flex-col cursor-pointer transition-all duration-500 z-10 h-full"
          onClick={() => onPostClick(post)}
        >
          {/* Glowing bottom bar - using relative pos to stick to bottom of liquid morph */}
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-oracle-red to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-20 rounded-b-[inherit]"></div>

          {/* Wrapper to clip image to morphing radius */}
          <div className="relative h-48 overflow-hidden z-10 rounded-t-[inherit]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

            {/* Category Badge */}
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="glass-pill text-[9px] font-black text-slate-400 dark:text-slate-500 border border-white/10 px-2 py-1 rounded-lg flex items-center gap-1 backdrop-blur-md">
                <i className="far fa-clock"></i> {calculateReadTime(post.content)} min
              </span>
              <div className="relative isolate px-3 py-1.5 flex items-center justify-center liquid-shape">
                {/* Liquid morphing background pill */}
                <div className="absolute inset-0 bg-oracle-red opacity-90 -z-10 shadow-lg shadow-oracle-red/30 rounded-[inherit]"></div>
                <span className="text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/90">
              <span className="bg-oracle-red w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-lg group-hover:rotate-12 transition-transform">
                <i className="far fa-calendar-alt"></i>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">{post.date}</span>
            </div>
          </div>

          <div className="p-5 flex-grow flex flex-col relative z-10">
            <h2 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-oracle-red transition-colors duration-300 mb-3 leading-tight tracking-tight">
              {post.title}
            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
              {post.excerpt}
            </p>

            <div className="mt-auto pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <i className="fas fa-user-astronaut text-xs"></i>
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{post.author}</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:bg-oracle-red group-hover:border-oracle-red group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
                <i className="fas fa-arrow-right text-xs"></i>
              </div>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
};

export default PostList;
