// src/components/sorting-hat/SortingHat.tsx

'use client';

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
    <div className={`relative ${className}`}>
      {/* Magical glow effect */}
      {showGlow && (
        <motion.div 
          className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
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
          y: [0, -8, 0],
          rotate: [0, 1, -1, 0]
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Hat SVG */}
        <svg
          viewBox="0 0 200 240"
          className="w-full h-full drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}
        >
          {/* Hat Body */}
          <defs>
            <linearGradient id="hatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B4513" />
              <stop offset="30%" stopColor="#A0522D" />
              <stop offset="60%" stopColor="#654321" />
              <stop offset="100%" stopColor="#3C2414" />
            </linearGradient>
            <linearGradient id="hatShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D1810" />
              <stop offset="100%" stopColor="#1A0F08" />
            </linearGradient>
          </defs>

          {/* Hat Shadow */}
          <ellipse cx="100" cy="220" rx="60" ry="15" fill="rgba(0,0,0,0.3)" />

          {/* Hat Base */}
          <path
            d="M50 180 Q50 170 70 165 L130 165 Q150 170 150 180 L150 190 Q150 200 130 205 L70 205 Q50 200 50 190 Z"
            fill="url(#hatShadow)"
          />

          {/* Hat Cone */}
          <path
            d="M100 20 Q120 25 130 50 L140 80 Q145 100 140 120 L135 140 Q130 160 120 165 L80 165 Q70 160 65 140 L60 120 Q55 100 60 80 L70 50 Q80 25 100 20 Z"
            fill="url(#hatGradient)"
            stroke="#2D1810"
            strokeWidth="2"
          />

          {/* Hat Wrinkles */}
          <path
            d="M75 60 Q85 65 95 60 Q105 65 115 60"
            stroke="#654321"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M70 100 Q85 105 100 100 Q115 105 125 100"
            stroke="#654321"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Hat Tip Fold */}
          <path
            d="M95 20 Q105 15 120 25 Q125 30 120 40 Q110 35 95 20"
            fill="#654321"
            stroke="#2D1810"
            strokeWidth="1"
          />

          {/* Eyes */}
          <g>
            {/* Eye Whites */}
            <ellipse cx="85" cy="90" rx="8" ry="10" fill="#FFFFFF" />
            <ellipse cx="115" cy="90" rx="8" ry="10" fill="#FFFFFF" />
            
            {/* Eye Pupils */}
            <motion.ellipse 
              cx="85" 
              cy="90" 
              rx="4" 
              ry={hatState.isBlinking ? 1 : 5} 
              fill="#2D1810"
              animate={{ ry: hatState.isBlinking ? 1 : 5 }}
              transition={{ duration: 0.1 }}
            />
            <motion.ellipse 
              cx="115" 
              cy="90" 
              rx="4" 
              ry={hatState.isBlinking ? 1 : 5} 
              fill="#2D1810"
              animate={{ ry: hatState.isBlinking ? 1 : 5 }}
              transition={{ duration: 0.1 }}
            />

            {/* Eye Highlights */}
            {!hatState.isBlinking && (
              <>
                <circle cx="87" cy="88" r="1.5" fill="#FFFFFF" />
                <circle cx="117" cy="88" r="1.5" fill="#FFFFFF" />
              </>
            )}

            {/* Eyebrows */}
            <path d="M78 82 Q85 78 92 82" stroke="#654321" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M108 82 Q115 78 122 82" stroke="#654321" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>

          {/* Mouth */}
          <g>
            <motion.path
              d={hatState.mouthPosition === 'open' 
                ? "M90 110 Q100 120 110 110 Q105 125 95 125 Q90 120 90 110" 
                : "M90 115 Q100 118 110 115"
              }
              fill={hatState.mouthPosition === 'open' ? "#2D1810" : "none"}
              stroke="#654321"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{
                d: hatState.mouthPosition === 'open' 
                  ? "M90 110 Q100 120 110 110 Q105 125 95 125 Q90 120 90 110" 
                  : "M90 115 Q100 118 110 115"
              }}
              transition={{ duration: 0.2 }}
            />

            {/* Teeth when mouth open */}
            {hatState.mouthPosition === 'open' && (
              <>
                <rect x="96" y="115" width="2" height="6" fill="#F5F5DC" />
                <rect x="99" y="115" width="2" height="7" fill="#F5F5DC" />
                <rect x="102" y="115" width="2" height="6" fill="#F5F5DC" />
              </>
            )}
          </g>

          {/* Magical sparkles */}
          {showGlow && (
            <g className="animate-twinkle">
              <circle cx="60" cy="70" r="1" fill="#FFD700" opacity="0.8" />
              <circle cx="140" cy="90" r="1.5" fill="#FFD700" opacity="0.6" />
              <circle cx="75" cy="45" r="1" fill="#FFD700" opacity="0.9" />
              <circle cx="125" cy="130" r="1" fill="#FFD700" opacity="0.7" />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
}