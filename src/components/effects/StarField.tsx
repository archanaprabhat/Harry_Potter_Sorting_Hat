
// src/components/effects/StarField.tsx
"use client";

import { motion } from 'framer-motion';
import { useMemo } from 'react';



export default function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-amber-200 rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating magical symbols */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`symbol-${i}`}
          className="absolute text-amber-300/30 text-xl font-serif"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
          }}
          animate={{
            y: [-10, -30, -10],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {['✨', '⭐', '🌟', '💫', '🔮', '⚡', '🪄', '🌙'][i]}
        </motion.div>
      ))}
    </div>
  );
}