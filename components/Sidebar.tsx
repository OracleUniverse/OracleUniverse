
import React from 'react';

interface SidebarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  isHome?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  isHome = false
}) => {
  if (isHome) {
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Trending Tech Updates */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
          <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
            <span className="w-2 h-2 bg-oracle-red rounded-full animate-pulse"></span>
            Tech Radar
          </h3>
          <div className="space-y-6">
            {[
              { label: 'Cloud', title: 'OCI Gen3 Regions Live', time: '2h ago' },
              { label: 'Security', title: 'Patch Advisory 24.1.2', time: '5h ago' },
              { label: 'Database', title: 'Vector Search v2 Beta', time: '1d ago' },
            ].map((item, idx) => (
              <div key={idx} className="group cursor-pointer border-b border-slate-50 dark:border-slate-800 last:border-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-black text-oracle-red uppercase tracking-widest">{item.label}</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase">{item.time}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-oracle-red transition leading-snug">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-oracle-red transition-all">
            Full Updates List
          </button>
        </div>

        {/* Elite Labs Ad */}
        <div className="bg-gradient-to-br from-oracle-red to-red-800 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group border border-white/10">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-2xl font-black leading-tight tracking-tighter">ELITE DBA LABS</h3>
            <p className="text-red-100 text-xs font-medium leading-relaxed">Sandbox access for 23c experimentation and performance tuning.</p>
            <button className="w-full bg-white text-oracle-red py-3.5 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl transform active:scale-95 transition-all">
              Claim Access
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-8">Categories</h3>
        <div className="grid grid-cols-1 gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`w-full text-left px-5 py-3.5 rounded-2xl text-[11px] font-black transition-all flex items-center justify-between group uppercase tracking-widest border ${
                activeCategory === cat 
                  ? 'bg-oracle-red border-oracle-red text-white shadow-lg -translate-y-1' 
                  : 'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-600 dark:text-slate-400 hover:border-oracle-red/30'
              }`}
            >
              <span>{cat}</span>
              <i className={`fas fa-chevron-right text-[8px] opacity-40 ${activeCategory === cat ? 'text-white' : ''}`}></i>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white border border-white/10">
        <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase">DBA MASTERCLASS</h3>
        <p className="text-slate-400 text-xs mb-8 leading-relaxed font-medium">Join 15k cloud engineers mastering Database 23c and OCI through labs.</p>
        <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-2xl hover:bg-oracle-red hover:text-white transition-all active:scale-95">
          Join Free
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
