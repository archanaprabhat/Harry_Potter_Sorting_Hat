// src/components/sorting-hat/SortingHat.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface SortingHatProps {
  size?: 'small' | 'medium' | 'large'; // control hat dimensions
  isAnimating?: boolean;              // toggle floating animation
  className?: string;                 // allow parent to pass extra styles
  showGlow?: boolean;                 // toggle magical purple glow
}


export default function SortingHat({ 
  size = 'large',
  isAnimating = true,
  className = '',
  showGlow = true
}: SortingHatProps) {

  // Tailwind-based sizing for different use cases
  const sizeClasses = {
    small: 'w-20 h-24',
    medium: 'w-32 h-40',
    large: 'w-48 h-60'
  };

  return (
    <div className={`relative mt-15 ${className}`}>
      
      {/* Magical purple glow aura behind the hat */}
      {showGlow && (
        <motion.div 
          className="absolute inset-0 bg-purple-500/15 rounded-full blur-xl"
          animate={{ scale: [1.8, 1, 1.8], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Hat container with optional floating/bobbing motion */}
      <motion.div
        className={`relative ${sizeClasses[size]} mx-auto`}
        animate={isAnimating ? {
          y: [0, 20, 0, -20, 0],    // up/down motion
          x: [0, 10, 0, -10, 0],    // side sway
          rotate: [6, 10, -10, 6]   // subtle tilt
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Hat image (static PNG) */}
        <Image 
          src="/images/sorting-hat.png" 
          alt="Sorting Hat" 
          width={300} 
          height={300} 
          priority
        />
      </motion.div>
    </div>
  );
}
