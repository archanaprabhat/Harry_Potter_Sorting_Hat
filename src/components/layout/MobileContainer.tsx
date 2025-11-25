'use client';

import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
}

export default function MobileContainer({ children, className = '' }: MobileContainerProps) {

  // Prevent scrolling on mount
  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.documentElement.style.overflow = 'hidden';

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <>
      {/* Mobile & Tablet: Full screen container */}
      <div className="xl:hidden">
        <div
          className={`fixed inset-0 w-full h-full ${className}`}
          style={{
            height: '100vh',
            background: `radial-gradient(ellipse at center, var(--magical-blue) 0%, var(--deep-purple) 70%, #0a0a0a 100%)`,
            overflow: 'hidden'
          }}
        >
          <motion.div
            className="relative h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              {children}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Desktop (large): Centered iPhone-like container */}
      <div className="hidden xl:block">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <motion.div
            className={`relative ${className}`}
            style={{
              width: '430px', // iPhone 14 Pro Max width
              height: '932px', // iPhone 14 Pro Max height
              maxHeight: '95vh', // Ensure it fits in viewport
              background: `radial-gradient(ellipse at center, var(--magical-blue) 0%, var(--deep-purple) 70%, #0a0a0a 100%)`,
              borderRadius: '25px',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 0 50px rgba(0, 0, 0, 0.8)',
              overflow: 'hidden'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Magical border glow effect */}
            <motion.div
              className="absolute inset-0 rounded-[25px] pointer-events-none"
              style={{
                background: 'linear-gradient(45deg, rgba(212, 175, 55, 0.1), transparent, rgba(212, 175, 55, 0.1))'
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Content */}
            <div className="relative z-10 h-full overflow-hidden">
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