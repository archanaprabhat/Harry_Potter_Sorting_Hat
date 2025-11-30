// src/components/sorting-hat/SortingHat.tsx
'use client';
import { useEffect, useState } from "react";
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

  // Generate random sparkle positions
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 50,
    y: Math.random() * 50,
    delay: Math.random() * 10,
    duration: 2 + Math.random() * 9,
    size: 2 + Math.random() * 2
  }));

  // State for click-triggered sparkle bursts
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleHatClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.

    const newBurst = { id: Date.now(), x, y };
    setBursts((prev) => [...prev, newBurst]);

    // Remove burst after animation
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
    }, 1000);
  };

  return (
    <div
      className={`relative mt-15 cursor-pointer ${className}`}
      onClick={handleHatClick}
    >

      {/* Luminous purple radial gradient background */}
      {showGlow && (
        <div
          className="absolute inset-0 -m-32 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, 
              rgba(90, 24, 154, 0.4) 0%, 
              rgba(90, 24, 154, 0.25) 30%, 
              rgba(90, 24, 154, 0.1) 60%, 
              transparent 100%)`,
            filter: 'blur(40px)',
            transform: 'scale(1.5)'
          }}
        />
      )}

      {/* Pulsing purple glow aura */}
      {showGlow && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, 
              rgba(90, 24, 154, 0.6) 0%, 
              rgba(90, 24, 154, 0.3) 40%, 
              transparent 70%)`
          }}
          animate={{
            scale: [1.5, 1.8, 1.5],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Ambient animated sparkles */}
      {showGlow && sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 12px rgba(147, 51, 234, 0.6)'
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -20, -40]
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Click Burst Sparkles */}
      {bursts.map((burst) => (
        <div key={burst.id} className="absolute pointer-events-none" style={{ left: burst.x, top: burst.y }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-200"
              initial={{ scale: 0, opacity: 1, x: 0, y: 0, rotate: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [1, 0],
                x: (Math.random() - 0.5) * 150,
                y: (Math.random() - 0.5) * 150,
                rotate: Math.random() * 360
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </motion.div>
          ))}
        </div>
      ))}

      {/* Hat container with optional floating/bobbing motion */}
      <motion.div
        className={`relative ${sizeClasses[size]} mx-auto z-10 pointer-events-none`}
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
