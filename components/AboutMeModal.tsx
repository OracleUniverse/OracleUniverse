
import React from 'react';

interface AboutMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutMeModal: React.FC<AboutMeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center animate-fadeIn transition-colors duration-300">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl transform transition-all animate-scaleIn border-t sm:border dark:border-slate-800 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Mobile Pull Indicator */}
        <div className="sm:hidden w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-4 mb-2"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition shadow-md z-20"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="bg-slate-900 dark:bg-black h-24 sm:h-32 relative">
           <div className="absolute -bottom-12 sm:-bottom-16 left-6 sm:left-8 p-1 bg-white dark:bg-slate-900 rounded-full shadow-xl">
              <img 
                src="/oracleuniverse/avatar.png" 
                alt="Author Avatar" 
                className="w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-slate-100 dark:bg-slate-800 object-cover"
              />
           </div>
        </div>

        <div className="pt-16 sm:pt-20 pb-8 sm:pb-10 px-6 sm:px-8">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Oracle Architect</h2>
            <p className="text-oracle-red font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mt-1">Principal Certified Professional</p>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 font-medium">
            Passionate about high-performance data systems and cloud architecture. With over 15 years in the Oracle ecosystem, 
            I share deep-dives into SQL optimization and OCI best practices.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
               <p className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase mb-1">Expertise</p>
               <p className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200">OCI & Autonomous</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
               <p className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase mb-1">Focus</p>
               <p className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200">Performance</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#1877F2]/10 rounded-xl text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all">
                <i className="fab fa-facebook-f text-base sm:text-lg"></i>
              </button>
              <button className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#FF0000]/10 rounded-xl text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all">
                <i className="fab fa-youtube text-base sm:text-lg"></i>
              </button>
              <button className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#0A66C2]/10 rounded-xl text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all">
                <i className="fab fa-linkedin-in text-base sm:text-lg"></i>
              </button>
              <button className="flex-grow bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] sm:text-xs hover:bg-slate-800 dark:hover:bg-slate-200 transition active:scale-95 shadow-lg">
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeModal;
