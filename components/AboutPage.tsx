
import React from 'react';

interface AboutPageProps {
  onBack?: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="animate-fadeIn space-y-16 pb-10">
      {onBack && (
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-oracle-red font-semibold transition group mb-8"
        >
          <i className="fas fa-arrow-left group-hover:-translate-x-1 transition"></i>
          Back to Home
        </button>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-oracle-red/5 rounded-[3rem] blur-2xl group-hover:bg-oracle-red/10 transition duration-700"></div>
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-white dark:bg-slate-900 p-2">
            <img 
              src="/oracleuniverse/avatar.png" 
              alt="Liam" 
              className="w-full h-[500px] object-cover rounded-[2.2rem] bg-slate-50 dark:bg-slate-800"
            />
            <div className="absolute bottom-10 left-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20">
              <p className="text-oracle-red font-black text-xs uppercase tracking-[0.3em] mb-1">Principal Consultant</p>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Liam Oracle-Expert</h2>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-oracle-red font-black uppercase tracking-[0.3em] text-xs">The Vision</span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">MASTERING DATA IN THE CLOUD AGE.</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
            With nearly two decades of experience in high-availability systems, I've seen the Oracle ecosystem evolve from heavyweight on-premise deployments to the agile, autonomous cloud era. 
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
            My goal with Oracle Tech Insights is to translate complex architecture into actionable intelligence for the modern database engineer.
          </p>
          
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="space-y-1">
              <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">150+</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Articles Published</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">15K+</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Monthly Readers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[3rem] p-10 md:p-20 border border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">GET IN TOUCH</h2>
            <p className="text-slate-500 font-medium">Whether it's a consulting inquiry or just to say hi, I'd love to hear from you.</p>
          </div>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Name</label>
              <input type="text" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-oracle-red outline-none transition dark:text-white" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email</label>
              <input type="email" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-oracle-red outline-none transition dark:text-white" placeholder="john@example.com" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Message</label>
              <textarea rows={5} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-oracle-red outline-none transition dark:text-white" placeholder="How can I help you?"></textarea>
            </div>
            <div className="md:col-span-2 pt-4">
              <button className="w-full bg-oracle-red text-white py-6 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-red-500/20 hover:scale-[1.02] active:scale-95 transition">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
