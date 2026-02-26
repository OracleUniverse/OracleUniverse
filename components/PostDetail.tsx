
import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';

interface PostDetailProps {
  post: BlogPost;
  allPosts: BlogPost[];
  onBack: () => void;
  onPostClick: (post: BlogPost) => void;
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
                return <span key={j} className="text-emerald-400">{word}</span>;
              }
              if (inString) {
                return <span key={j} className="text-emerald-400">{word}</span>;
              }
              if (keywords.has(word.toUpperCase())) {
                return <span key={j} className="text-oracle-red font-bold">{word}</span>;
              }
              return <span key={j} className="text-slate-300">{word}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
};

const CodeBlock: React.FC<{ code: string; language: string; index: number }> = ({ code, language, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div key={index} className="my-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0f172a] group relative transform hover:scale-[1.01] transition-transform duration-300">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleCopy}
            className="text-[10px] font-black text-slate-500 hover:text-oracle-red uppercase tracking-widest flex items-center gap-1.5 transition-colors"
          >
            {copied ? (
              <><i className="fas fa-check text-emerald-500"></i> Copied</>
            ) : (
              <><i className="far fa-copy"></i> Copy</>
            )}
          </button>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-terminal"></i> {language || 'SCRIPT'}
          </span>
        </div>
      </div>
      <div className="p-6 overflow-x-auto custom-scrollbar bg-[#1e293b]/50">
        {language === 'sql' ? (
          <SqlHighlighter code={code} />
        ) : (
          <pre className="font-mono text-sm text-slate-300 leading-relaxed whitespace-pre">
            {code}
          </pre>
        )}
      </div>
    </div>
  );
};

const renderContent = (content: string) => {
  const blocks = content.split(/```/g);

  return blocks.map((block, index) => {
    // Code Blocks (Odd indices)
    if (index % 2 === 1) {
      const lines = block.split('\n');
      const language = lines[0].trim().toLowerCase();
      const code = lines.slice(1).join('\n').replace(/^\n+|\n+$/g, '');

      return <CodeBlock key={index} code={code} language={language} index={index} />;
    }

    // Text Blocks
    return (
      <div key={index} className="space-y-6">
        {block.split('\n').map((line, i) => {
          const trimmed = line.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith('### ')) {
            return <h3 key={i} className="text-xl font-black text-slate-800 dark:text-white mt-10 mb-4 tracking-tight uppercase flex items-center gap-3"><span className="w-8 h-1 bg-oracle-red rounded-full"></span>{formatText(trimmed.replace('### ', ''))}</h3>;
          }
          if (trimmed.startsWith('## ')) {
            return <h2 key={i} className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-16 mb-8 tracking-tighter">{formatText(trimmed.replace('## ', ''))}</h2>;
          }
          if (trimmed.startsWith('- ')) {
            return (
              <div key={i} className="flex gap-4 ml-2 md:ml-4 text-slate-600 dark:text-slate-300">
                <span className="text-oracle-red mt-2 text-[8px]"><i className="fas fa-circle"></i></span>
                <p className="leading-relaxed text-lg">{formatText(trimmed.replace('- ', ''))}</p>
              </div>
            );
          }
          const numMatch = trimmed.match(/^(\d+)\.\s(.*)/);
          if (numMatch) {
            return (
              <div key={i} className="flex gap-4 ml-2 md:ml-4 mb-4 text-slate-600 dark:text-slate-300">
                <span className="font-black text-oracle-red font-mono text-lg">{numMatch[1]}.</span>
                <p className="leading-relaxed text-lg">{formatText(numMatch[2])}</p>
              </div>
            );
          }

          return <p key={i} className="text-lg md:text-xl leading-8 text-slate-600 dark:text-slate-300 font-medium">{formatText(trimmed)}</p>;
        })}
      </div>
    );
  });
};

const PostDetail: React.FC<PostDetailProps> = ({ post, allPosts, onBack, onPostClick }) => {
  const [scrollY, setScrollY] = useState(0);

  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t))))
    .slice(0, 3);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <article className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fadeIn transition-colors duration-300 relative z-10">

      {/* Sticky Action Bar */}
      <div className="sticky top-20 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between transition-all">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-oracle-red font-black uppercase tracking-widest text-xs transition group"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-oracle-red group-hover:text-white transition">
            <i className="fas fa-arrow-left group-hover:-translate-x-0.5 transition"></i>
          </div>
          Back
        </button>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition flex items-center justify-center"><i className="far fa-bookmark"></i></button>
          <button className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition flex items-center justify-center"><i className="fas fa-share-nodes"></i></button>
        </div>
      </div>

      {/* Parallax Hero Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden group">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-75 will-change-transform"
          style={{ transform: `scale(1.1) translateY(${scrollY * 0.3}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto max-w-4xl">
            <div className="flex gap-3 mb-6 animate-slideUp">
              <div className="relative isolate px-4 py-1.5 flex items-center justify-center liquid-shape">
                <div className="absolute inset-0 bg-oracle-red opacity-90 -z-10 rounded-[inherit]"></div>
                <span className="text-white text-[10px] font-black uppercase tracking-widest">
                  {post.category}
                </span>
              </div>
            </div>
            <h1 className="text-3xl md:text-6xl font-black text-white leading-tight tracking-tighter mb-6 drop-shadow-2xl animate-slideUp [animation-delay:100ms]">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="px-6 py-12 md:px-16 md:py-20 max-w-5xl mx-auto">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-8 mb-16 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
              <i className="fas fa-user-astronaut text-xl text-slate-400 dark:text-slate-500"></i>
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-white leading-none mb-1.5">{post.author}</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-oracle-red">Verified Author</p>
            </div>
          </div>
          <div className="h-12 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
              <i className="far fa-clock text-xl text-slate-400 dark:text-slate-500"></i>
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-white leading-none mb-1.5">{post.date}</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Published</p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="max-w-none">
          <div className="text-xl md:text-3xl text-slate-700 dark:text-slate-200 leading-normal font-bold mb-16 font-serif italic opacity-90">
            "{post.excerpt}"
          </div>

          <div className="post-content">
            {renderContent(post.content)}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <i className="fas fa-tags"></i> Related Topics
          </h4>
          <div className="flex flex-wrap gap-3">
            {post.tags.map(tag => (
              <span key={tag} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-oracle-red hover:text-white transition-colors cursor-pointer border border-slate-200 dark:border-slate-700">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="px-6 py-20 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-10 uppercase tracking-tighter flex items-center gap-3">
              <span className="w-2 h-8 bg-oracle-red"></span>
              Recommended Reads
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(rp => (
                <div
                  key={rp.id}
                  onClick={() => onPostClick(rp)}
                  className="group relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl liquid-card overflow-hidden shadow-sm hover:shadow-2xl hover:bg-white/80 dark:hover:bg-slate-900/80 transition-all duration-500 cursor-pointer z-10 border border-slate-200/50 dark:border-slate-800/50"
                >
                  <div className="absolute inset-[-50%] bg-oracle-red/10 liquid-shape blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>

                  <div className="h-32 overflow-hidden">
                    <img src={rp.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex flex-col justify-between" style={{ minHeight: '120px' }}>
                    <h4 className="font-black text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-oracle-red transition-colors mb-2">{rp.title}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-auto">{rp.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default PostDetail;
