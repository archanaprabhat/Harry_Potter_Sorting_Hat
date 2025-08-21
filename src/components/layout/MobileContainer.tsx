// src/components/layout/MobileContainer.tsx

'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
}

export default function MobileContainer({ children, className = '' }: MobileContainerProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      {/* Desktop: Centered mobile view */}
      <div className="w-full max-w-sm mx-auto">
        <motion.div
          className={`mobile-container relative bg-gradient-to-b from-purple-900/80 via-blue-900/80 to-slate-900/80 
                     backdrop-blur-sm border border-yellow-500/20 rounded-3xl overflow-hidden shadow-2xl ${className}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Magical border glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 
                          animate-pulse pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {children}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}