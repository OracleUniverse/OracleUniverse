import React, { useState, useEffect } from 'react';
import { BlogPost, Video } from '../types';
import PostList from './PostList';
import VideoSection from './VideoSection';
import { YOUTUBE_VIDEOS } from '../constants';

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
  const [videos, setVideos] = useState<Video[]>(YOUTUBE_VIDEOS);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const rssUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCEfppnCWgxKqm-PHU0dsYcg';
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
        const data = await response.json();
        if (data && data.items && data.items.length > 0) {
          const dynamicVideos: Video[] = data.items.map((item: any, index: number) => {
            const dateObj = new Date(item.pubDate);
            const formattedDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            return {
              id: item.guid || `v_dyn_${index}`,
              title: item.title,
              thumbnail: item.thumbnail || '',
              youtubeUrl: item.link,
              duration: 'Watch',
              views: 'New',
              publishedAt: formattedDate
            };
          });

          // Merge fetched videos with existing hardcoded ones, preventing duplicates by comparing the youtubeUrl
          setVideos(prev => {
            const merged = [...dynamicVideos];
            prev.forEach(staticVideo => {
              if (!merged.some(v => v.youtubeUrl === staticVideo.youtubeUrl)) {
                merged.push(staticVideo);
              }
            });
            return merged;
          });
        }
      } catch (err) {
        console.error('Failed to fetch dynamic youtube videos', err);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="animate-fadeIn space-y-8 pb-32 w-full overflow-hidden relative">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-oracle-red/15 liquid-shape blur-[80px] sm:blur-[120px] pointer-events-none z-0"></div>

      {/* Hero Header */}
      <div className="relative z-10 text-center space-y-4 max-w-4xl mx-auto py-12">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase mt-8">
          ORACLE <span className="text-oracle-red text-glow">UNIVERSE</span>
        </h1>
      </div>

      {/* Category Filter */}
      <div className="relative z-10 flex flex-wrap justify-center gap-3 mb-10 max-w-4xl mx-auto">
        {categories.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`relative isolate px-6 py-2.5 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all shadow-sm ${isActive ? 'text-white border-transparent liquid-shape' : 'bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-slate-500 hover:text-oracle-red border border-slate-200 dark:border-slate-700 rounded-full hover:liquid-shape'}`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-oracle-red opacity-90 -z-10 rounded-[inherit]"></div>
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Unified Posts Archive */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <PostList posts={posts} onPostClick={onPostClick} />
      </div>

      {/* Video Insights Section */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <VideoSection videos={videos} />
      </div>
    </div>
  );
};

export default HomePage;
