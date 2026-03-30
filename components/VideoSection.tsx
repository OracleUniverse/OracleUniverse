import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Video } from '../types';

interface VideoSectionProps {
  videos: Video[];
}

const VideoSection: React.FC<VideoSectionProps> = ({ videos }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 w-full">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase transition-colors">
            Elite <span className="text-oracle-red">Video Insights</span>
          </h2>
          <div className="h-1 w-12 bg-oracle-red rounded-full"></div>
        </div>
        
        <div className="flex items-center gap-4 self-start md:self-auto">
          {/* Scroll Controls */}
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:bg-oracle-red hover:border-oracle-red hover:text-white transition-all duration-300 shadow-sm"
              aria-label="Previous videos"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:bg-oracle-red hover:border-oracle-red hover:text-white transition-all duration-300 shadow-sm"
              aria-label="Next videos"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-1"></div>
          
          {/* Channel Link */}
          <a 
            href="https://www.youtube.com/@oracle-universe" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-oracle-red transition-all duration-300"
          >
            <span className="hidden sm:inline">View Channel</span>
            <span className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-oracle-red group-hover:border-oracle-red group-hover:text-white transition-all duration-300 shadow-sm">
              <i className="fab fa-youtube"></i>
            </span>
          </a>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Helper to hide scrollbar in WebKit but still keep functionality */}
        <style dangerouslySetInnerHTML={{ __html: `
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
        `}} />

        {videos.map((video, index) => (
          <motion.a
            key={video.id}
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(index * 0.1, 0.5) }}
            className="group relative flex flex-col bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 overflow-hidden hover:shadow-2xl hover:shadow-oracle-red/10 transition-all duration-500 hover:-translate-y-2 flex-none w-[280px] sm:w-[320px] snap-center shrink-0"
          >
            {/* Thumbnail Wrapper */}
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-oracle-red/90 text-white flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl backdrop-blur-sm">
                  <i className="fas fa-play ml-1"></i>
                </div>
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] font-bold text-white tracking-wider">
                {video.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-3 flex-grow border-t border-slate-200/50 dark:border-slate-800/50">
              <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 leading-tight group-hover:text-oracle-red transition-colors line-clamp-2">
                {video.title}
              </h3>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-1.5">
                  <i className="far fa-eye text-oracle-red/60"></i>
                  {video.views}
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="far fa-clock text-oracle-red/60"></i>
                  {video.publishedAt}
                </span>
              </div>
            </div>

            {/* Subtle Liquid Highlight */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-oracle-red/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default VideoSection;
