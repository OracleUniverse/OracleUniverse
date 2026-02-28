
import React, { useState, useRef, useEffect } from 'react';
import { getOracleHelp } from '../services/geminiService';
import { ChatMessage } from '../types';

const OracleAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome! I am O-Bot. Ask me any technical question about Oracle Database, PL/SQL or OCI!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const result = await getOracleHelp(userMessage);
      setMessages(prev => [...prev, { role: 'model', text: result }]);
    } catch {
      setMessages(prev => [...prev, { role: 'model', text: "Error: Service interruption. Please verify your connection." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl lg:shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col h-full overflow-hidden transition-colors duration-300">
      <div className="bg-slate-900 dark:bg-black p-5 text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 bg-oracle-red rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
              <i className="fas fa-robot text-lg"></i>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 dark:border-black rounded-full"></div>
          </div>
          <div>
            <p className="text-sm font-black tracking-tight leading-none">O-BOT EXPERT</p>
            <p className="text-[10px] text-slate-400 mt-1.5 font-bold uppercase tracking-widest">Always Learning</p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-white transition">
          <i className="fas fa-circle-info"></i>
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-grow p-5 overflow-y-auto space-y-6 bg-slate-50/50 dark:bg-slate-950/20"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-oracle-red text-white rounded-tr-none shadow-md shadow-red-500/10' 
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 rounded-tl-none font-medium'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 rounded-tl-none">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="flex gap-3 bg-slate-50 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-700 focus-within:ring-2 focus-within:ring-red-500/10 focus-within:border-red-500/30 transition-all">
          <input 
            type="text" 
            placeholder="Technical question..." 
            className="flex-grow bg-transparent border-none rounded-xl px-3 py-2 text-sm focus:ring-0 placeholder:text-slate-400 dark:placeholder:text-slate-600 dark:text-white font-medium"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-oracle-red dark:hover:bg-oracle-red dark:hover:text-white transition disabled:opacity-20 shadow-lg"
          >
            <i className="fas fa-paper-plane text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OracleAssistant;
