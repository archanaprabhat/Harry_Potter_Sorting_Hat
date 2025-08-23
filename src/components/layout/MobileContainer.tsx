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
    <div className="min-h-screen w-full flex items-center justify-center">
      {/* Desktop: Centered mobile view */}
      <div className="w-full max-w-sm mx-auto">
        <motion.div
          className={`mobile-container relative ${className}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
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