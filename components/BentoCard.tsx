import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  span?: 'col-1' | 'col-2' | 'row-1' | 'row-2' | 'mega';
  onClick?: () => void;
}

const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className,
  delay = 0,
  span = 'col-1',
  onClick
}) => {
  const spanClasses = {
    'col-1': 'col-span-1',
    'col-2': 'col-span-1 md:col-span-2',
    'row-1': 'row-span-1',
    'row-2': 'row-span-1 md:row-span-2',
    'mega': 'col-span-1 md:col-span-2 row-span-1 md:row-span-2'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={cn(
        "group relative bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-[2.5rem] border border-slate-200 dark:border-slate-800/50 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500",
        spanClasses[span as keyof typeof spanClasses],
        className
      )}
    >
      {/* Premium Glass Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Subtle border glow */}
      <div className="absolute inset-0 border border-oracle-red/0 group-hover:border-oracle-red/20 rounded-[2.5rem] transition-colors duration-500 pointer-events-none"></div>

      {children}
    </motion.div>
  );
};

export default BentoCard;
