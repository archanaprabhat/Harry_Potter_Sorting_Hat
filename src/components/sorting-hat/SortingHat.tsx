// src/components/sorting-hat/SortingHat.tsx
'use client';
import Image from 'next/image';


import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HatAnimationState } from '@/types';

interface SortingHatProps {
  size?: 'small' | 'medium' | 'large';
  isAnimating?: boolean;
  isTalking?: boolean;
  className?: string;
  showGlow?: boolean;
}

export default function SortingHat({ 
  size = 'large', 
  isAnimating = true, 
  isTalking = false,
  className = '',
  showGlow = true
}: SortingHatProps) {
  const [hatState, setHatState] = useState<HatAnimationState>({
    isBlinking: false,
    isTalking: false,
    isFloating: true,
    mouthPosition: 'closed',
    eyeState: 'open'
  });

  // Auto-blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isTalking) {
        setHatState(prev => ({ ...prev, isBlinking: true }));
        setTimeout(() => {
          setHatState(prev => ({ ...prev, isBlinking: false }));
        }, 150);
      }
    }, Math.random() * 3000 + 2000); // Random blink every 2-5 seconds

    return () => clearInterval(blinkInterval);
  }, [isTalking]);

  // Talking animation
  useEffect(() => {
    if (isTalking) {
      const talkInterval = setInterval(() => {
        setHatState(prev => ({
          ...prev,
          mouthPosition: prev.mouthPosition === 'closed' ? 'open' : 'closed'
        }));
      }, 200);

      return () => clearInterval(talkInterval);
    } else {
      setHatState(prev => ({ ...prev, mouthPosition: 'closed' }));
    }
  }, [isTalking]);

  const sizeClasses = {
    small: 'w-20 h-24',
    medium: 'w-32 h-40',
    large: 'w-48 h-60'
  };

  return (
    <div className={`relative mt-15 ${className}`}>
      {/* Magical glow effect */}
      {showGlow && (
        <motion.div 
          className="absolute inset-0 bg-purple-500/15 rounded-full blur-xl "
          animate={{ 
            scale: [1.8, 1, 1.8],
            opacity: [3, 6, 3]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Hat Container */}
      <motion.div
        className={`relative ${sizeClasses[size]} mx-auto`}
        animate={isAnimating ? {
          y: [0,20,0,-20,0],
          x: [0,10,0,-20,0],
          rotate: [6, 10, -10, 6]
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Hat SVG */}
        <Image src="/images/sorting-hat.png" alt='' width={300} height={300}>

        </Image>

      </motion.div>
    </div>
  );
}