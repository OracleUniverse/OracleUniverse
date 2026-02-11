
import React from 'react';

const PluginsPage: React.FC = () => {
  const pluginIdeas = [
    {
      title: 'SQL Formatter Pro',
      icon: 'fa-code',
      description: 'A cloud-based SQL formatter supporting Oracle 23c syntax and custom enterprise style guides.',
      status: 'Idea Stage',
      tags: ['Development', 'Tools']
    },
    {
      title: 'PL/SQL Debugger Extension',
      icon: 'fa-terminal',
      description: 'VS Code extension for real-time remote debugging of PL/SQL procedures in OCI environments.',
      status: 'Conceptual',
      tags: ['VS Code', 'OCI']
    },
    {
      title: 'Cost Estimator Widget',
      icon: 'fa-calculator',
      description: 'Interactive widget to estimate OCI Autonomous Database costs based on real-time workload metrics.',
      status: 'Draft',
      tags: ['Cloud', 'Finance']
    },
    {
      title: 'Health Monitor Dashboard',
      icon: 'fa-heart-pulse',
      description: 'Open-source Grafana plugin tailored specifically for Oracle Database performance counters.',
      status: 'Planning',
      tags: ['Monitoring', 'DevOps']
    },
    {
      title: 'Apex Component Library',
      icon: 'fa-layer-group',
      description: 'A collection of high-performance UI components for Oracle APEX developers.',
      status: 'Researching',
      tags: ['APEX', 'UI/UX']
    }
  ];

  return (
    <div className="animate-fadeIn space-y-16 pb-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-8">
        <span className="text-oracle-red font-black uppercase tracking-[0.3em] text-xs">Innovation Lab</span>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">PLUGIN UNIVERSE</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
          Exploring upcoming tools and community plugin ideas to supercharge your Oracle workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pluginIdeas.map((plugin, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
            <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-oracle-red mb-8 group-hover:bg-oracle-red group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-red-500/20">
              <i className={`fas ${plugin.icon} text-2xl`}></i>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{plugin.title}</h3>
                <span className="bg-slate-50 dark:bg-slate-800 text-slate-400 text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">{plugin.status}</span>
              </div>
              
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                {plugin.description}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-4">
                {plugin.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border border-slate-100 dark:border-slate-800 px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 dark:bg-black rounded-[3rem] p-12 text-center text-white border border-white/5 relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-oracle-red/5 to-transparent pointer-events-none"></div>
         <h2 className="text-3xl font-black tracking-tighter uppercase mb-4 relative z-10">Have a Plugin Idea?</h2>
         <p className="text-slate-400 font-medium max-w-lg mx-auto mb-8 relative z-10">
           We are always looking for new ways to extend the Oracle ecosystem. Share your technical vision with our community labs.
         </p>
         <button className="bg-oracle-red text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-oracle-red transition-all shadow-xl active:scale-95 relative z-10">
           Submit Proposal
         </button>
      </div>
    </div>
  );
};

export default PluginsPage;
