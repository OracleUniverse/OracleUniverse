
import React from 'react';

const ResourcesPage: React.FC = () => {
  const resourceCategories = [
    {
      title: 'Cheatsheets',
      icon: 'fa-file-code',
      items: [
        { name: 'SQL Performance Tuning Guide', size: '2.4 MB' },
        { name: 'PL/SQL Best Practices Reference', size: '1.8 MB' },
        { name: 'OCI CLI Commands Cheat Sheet', size: '1.2 MB' }
      ]
    },
    {
      title: 'Whitepapers',
      icon: 'fa-book-open',
      items: [
        { name: 'Migrating to Autonomous Database', size: '5.6 MB' },
        { name: 'Security Hardening for Oracle 19c', size: '4.1 MB' },
        { name: 'Real-time Analytics with OCI', size: '3.9 MB' }
      ]
    },
    {
      title: 'Essential Tools',
      icon: 'fa-screwdriver-wrench',
      items: [
        { name: 'SQL Developer (Latest)', size: 'External' },
        { name: 'Oracle Instant Client', size: 'External' },
        { name: 'OCI Terraform Provider', size: 'Github' }
      ]
    }
  ];

  return (
    <div className="animate-fadeIn space-y-12 pb-10">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-oracle-red font-black uppercase tracking-[0.3em] text-xs">Knowledge Base</span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">TECHNICAL RESOURCES</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          A curated collection of documentation, tools, and guides to help you master the Oracle ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resourceCategories.map((cat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-oracle-red mb-6 group-hover:bg-oracle-red group-hover:text-white transition-all duration-500">
              <i className={`fas ${cat.icon} text-2xl`}></i>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-sm">{cat.title}</h3>
            <div className="space-y-4">
              {cat.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between group/item cursor-pointer p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover/item:text-oracle-red transition">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{item.size}</p>
                  </div>
                  <i className="fas fa-download text-slate-300 group-hover/item:text-oracle-red text-xs transition"></i>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-oracle-red rounded-[2.5rem] p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-red-500/20">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-black tracking-tighter">Request a Custom Guide</h2>
          <p className="text-white/80 max-w-md font-medium">Need a specific walkthrough for your unique environment? Let me know what you're working on.</p>
        </div>
        <button className="bg-white text-oracle-red px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-900 hover:text-white transition-all transform hover:-translate-y-1 shadow-xl">
          Contact Author
        </button>
      </div>
    </div>
  );
};

export default ResourcesPage;
