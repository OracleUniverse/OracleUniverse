import React from 'react';
import { motion } from 'framer-motion';
import { Video } from '../types';

interface VideoSectionProps {
  videos: Video[];
}

const VideoSection: React.FC<VideoSectionProps> = ({ videos }) => {
  return (
    <section className="py-20 relative">
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase transition-colors">
            Elite <span className="text-oracle-red">Video Insights</span>
          </h2>
          <div className="h-1 w-12 bg-oracle-red rounded-full"></div>
        </div>
        <a 
          href="https://www.youtube.com/@oracle-universe" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-oracle-red transition-all duration-300"
        >
          View Channel 
          <span className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-oracle-red group-hover:border-oracle-red group-hover:text-white transition-all duration-300 shadow-sm">
            <i className="fab fa-youtube"></i>
          </span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <motion.a
            key={video.id}
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 overflow-hidden hover:shadow-2xl hover:shadow-oracle-red/10 transition-all duration-500 hover:-translate-y-2"
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
