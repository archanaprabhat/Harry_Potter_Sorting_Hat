'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
}

export default function MobileContainer({ children, className = '' }: MobileContainerProps) {
  return (
    <>
      {/* Mobile: Full screen, no container, no rounded corners */}
      <div className="md:hidden min-h-screen w-full">
        <motion.div
          className={`relative h-screen w-full ${className}`}
          style={{
            background: `radial-gradient(ellipse at center, var(--magical-blue) 0%, var(--deep-purple) 70%, #0a0a0a 100%)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Content */}
          <div className="relative z-10 h-full">
            <AnimatePresence mode="wait">
              {children}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Desktop: Centered container with NO rounded corners */}
      <div className="hidden md:flex min-h-screen w-full items-center justify-center p-4">
        <div className="w-full max-w-sm mx-auto h-screen">
          <motion.div
            className={`mobile-container relative h-full w-full border border-yellow-500/20 shadow-2xl ${className}`}
            style={{
              background: `radial-gradient(ellipse at center, var(--magical-blue) 0%, var(--deep-purple) 70%, #0a0a0a 100%)`
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Magical border glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 
                            animate-pulse pointer-events-none" />
            
            {/* Content */}
            <div className="relative z-10 h-full">
              <AnimatePresence mode="wait">
                {children}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}