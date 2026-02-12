
import React from 'react';
import { BlogPost } from '../types';

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const formatText = (text: string) => {
  // Handle bold (**text**)
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-black text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index} className="bg-slate-100 dark:bg-slate-800 text-oracle-red px-1.5 py-0.5 rounded text-sm font-mono font-bold border border-slate-200 dark:border-slate-700">{part.slice(1, -1)}</code>;
    }
    return part;
  });
};

const SqlHighlighter: React.FC<{ code: string }> = ({ code }) => {
  const keywords = new Set(["SELECT", "FROM", "WHERE", "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "TABLE", "DROP", "ALTER", "ADD", "CONSTRAINT", "KEY", "PRIMARY", "FOREIGN", "REFERENCES", "JOIN", "ON", "AND", "OR", "NOT", "NULL", "IS", "AS", "ORDER", "BY", "GROUP", "HAVING", "LIMIT", "OFFSET", "FETCH", "FIRST", "ROWS", "ONLY", "COMMIT", "ROLLBACK", "GRANT", "REVOKE", "UNION", "ALL", "DISTINCT", "CASE", "WHEN", "THEN", "ELSE", "END", "DEFAULT", "IDENTITY", "GENERATED", "VECTOR", "CLOB", "VARCHAR2", "NUMBER", "FLOAT32"]);
  
  return (
    <div className="font-mono text-sm leading-relaxed">
      {code.split('\n').map((line, i) => {
        // Simple comment detection
        if (line.trim().startsWith('--')) {
           return (
            <div key={i} className="text-slate-500 italic">
              {line}
            </div>
          );
        }

        const words = line.split(/([ ,().;=<>'])/); 
        let inString = false;

        return (
          <div key={i} className="whitespace-pre">
            {words.map((word, j) => {
              if (word === "'") {
                inString = !inString;
                return <span key={j} className="text-green-400">{word}</span>;
              }
              if (inString) {
                return <span key={j} className="text-green-400">{word}</span>;
              }
              if (keywords.has(word.toUpperCase())) {
                return <span key={j} className="text-oracle-red font-bold">{word}</span>;
              }
              return <span key={j} className="text-slate-200">{word}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
};

const renderContent = (content: string) => {
  // Dedent content slightly if needed, though split usually handles it if we trim lines for headers
  const blocks = content.split(/```/g);

  return blocks.map((block, index) => {
    // Code Blocks (Odd indices)
    if (index % 2 === 1) {
      const lines = block.split('\n');
      // The first line usually contains the language (e.g., "sql")
      const language = lines[0].trim().toLowerCase();
      // The rest is code. Remove the first line and any initial/trailing whitespace
      const code = lines.slice(1).join('\n').replace(/^\n+|\n+$/g, '');

      return (
        <div key={index} className="my-8 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-[#0f172a] group relative">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
             <div className="flex gap-1.5">
               <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
               <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
             </div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{language || 'CODE'}</span>
          </div>
          <div className="p-6 overflow-x-auto custom-scrollbar">
            {language === 'sql' ? (
              <SqlHighlighter code={code} />
            ) : (
              <pre className="font-mono text-sm text-slate-200 leading-relaxed whitespace-pre">
                {code}
              </pre>
            )}
          </div>
        </div>
      );
    }

    // Text Blocks
    return (
      <div key={index} className="space-y-4">
        {block.split('\n').map((line, i) => {
          const trimmed = line.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith('### ')) {
            return <h3 key={i} className="text-xl font-black text-slate-800 dark:text-white mt-8 mb-4 tracking-tight uppercase flex items-center gap-2"><span className="w-2 h-2 bg-oracle-red rounded-sm"></span>{formatText(trimmed.replace('### ', ''))}</h3>;
          }
          if (trimmed.startsWith('## ')) {
            return <h2 key={i} className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-12 mb-6 tracking-tighter border-b border-slate-200 dark:border-slate-800 pb-4">{formatText(trimmed.replace('## ', ''))}</h2>;
          }
          if (trimmed.startsWith('- ')) {
             return (
              <div key={i} className="flex gap-3 ml-2 md:ml-4 text-slate-600 dark:text-slate-300">
                 <span className="text-oracle-red mt-1.5 text-xs"><i className="fas fa-circle"></i></span>
                 <p className="leading-relaxed">{formatText(trimmed.replace('- ', ''))}</p>
              </div>
             );
          }
          // Numbered lists (1. , 2. )
          const numMatch = trimmed.match(/^(\d+)\.\s(.*)/);
          if (numMatch) {
             return (
              <div key={i} className="flex gap-3 ml-2 md:ml-4 mb-2 text-slate-600 dark:text-slate-300">
                 <span className="font-bold text-oracle-red font-mono">{numMatch[1]}.</span>
                 <p className="leading-relaxed">{formatText(numMatch[2])}</p>
              </div>
             );
          }

          return <p key={i} className="text-lg leading-loose text-slate-600 dark:text-slate-300 font-normal">{formatText(trimmed)}</p>;
        })}
      </div>
    );
  });
};

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  return (
    <article className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden animate-fadeIn transition-colors duration-300">
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-oracle-red font-bold uppercase tracking-widest text-xs transition group"
        >
          <i className="fas fa-arrow-left group-hover:-translate-x-1 transition"></i>
          Back
        </button>
        <span className="text-xs font-black uppercase tracking-widest text-slate-300 dark:text-slate-600 hidden sm:block">Article View</span>
      </div>

      <div className="relative h-[300px] md:h-[400px] group">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
             <div className="flex gap-3 mb-4">
                <span className="bg-oracle-red text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-lg">
                  {post.category}
                </span>
             </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-4xl tracking-tighter mb-4 drop-shadow-2xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="px-6 py-10 md:px-12 md:py-16">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 mb-12 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
              <i className="fas fa-user-astronaut text-slate-400 dark:text-slate-500"></i>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1">{post.author}</p>
              <p className="text-[10px] uppercase tracking-widest font-bold">Author</p>
            </div>
          </div>
          <div className="h-10 w-px bg-slate-200 dark:bg-slate-800 hidden md:block mx-2"></div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
              <i className="far fa-calendar text-slate-400 dark:text-slate-500"></i>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1">{post.date}</p>
              <p className="text-[10px] uppercase tracking-widest font-bold">Published</p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="max-w-none">
          <div className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-12 border-l-4 border-oracle-red pl-6 md:pl-8 py-2">
            {post.excerpt}
          </div>
          
          <div className="post-content">
            {renderContent(post.content)}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Related Topics</h4>
          <div className="flex flex-wrap gap-3">
            {post.tags.map(tag => (
              <span key={tag} className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-default border border-slate-200 dark:border-slate-700">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
