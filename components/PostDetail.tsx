
import React from 'react';
import { BlogPost } from '../types';

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  return (
    <article className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden animate-fadeIn transition-colors duration-300">
      <button 
        onClick={onBack}
        className="m-6 flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-oracle-red font-semibold transition group"
      >
        <i className="fas fa-arrow-left group-hover:-translate-x-1 transition"></i>
        Back to list
      </button>

      <div className="relative h-[300px] md:h-[400px]">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-12">
          <div className="container mx-auto">
             <span className="bg-oracle-red text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-4xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="px-6 py-10 md:px-12">
        <div className="flex flex-wrap items-center gap-6 mb-8 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <i className="fas fa-user text-slate-400"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none mb-1">{post.author}</p>
              <p className="text-xs uppercase tracking-tighter">Author</p>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
          <div>
             <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none mb-1">{post.date}</p>
             <p className="text-xs uppercase tracking-tighter">Published</p>
          </div>
          <div className="flex gap-4 ml-auto">
            <button className="text-slate-400 hover:text-blue-500 transition"><i className="fab fa-twitter text-xl"></i></button>
            <button className="text-slate-400 hover:text-blue-700 transition"><i className="fab fa-linkedin text-xl"></i></button>
            <button className="text-slate-400 hover:text-green-600 transition"><i className="fas fa-share-nodes text-xl"></i></button>
          </div>
        </div>

        <div className="prose prose-slate prose-lg dark:prose-invert max-w-none prose-headings:text-slate-800 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-300">
          <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-8 italic border-l-4 border-oracle-red pl-6 py-2 bg-slate-50 dark:bg-slate-800/50">
            {post.excerpt}
          </p>
          
          <div className="whitespace-pre-line text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
            {post.content}
          </div>
        </div>

        <div className="mt-12 pt-12 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
          {post.tags.map(tag => (
            <span key={tag} className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-default">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
