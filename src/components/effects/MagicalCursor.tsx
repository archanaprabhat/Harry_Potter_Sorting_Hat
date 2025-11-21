// src/components/effects/MagicalCursor.tsx
"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  life: number;
}

export default function MagicalCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let animationFrame: number;
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {

      // Create new particle
      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        life: 1
      };

      setParticles(prev => [...prev, newParticle].slice(-15)); // Keep only last 15 particles
    };

    const updateParticles = () => {
      setParticles(prev =>
        prev
          .map(particle => ({
            ...particle,
            life: particle.life - 0.02
          }))
          .filter(particle => particle.life > 0)
      );

      animationFrame = requestAnimationFrame(updateParticles);
    };

    document.addEventListener('mousemove', handleMouseMove);
    updateParticles();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-amber-400 rounded-full"
          style={{
            left: particle.x - 4,
            top: particle.y - 4,
            opacity: particle.life,
            boxShadow: `0 0 ${particle.life * 10}px rgba(245, 158, 11, ${particle.life * 0.8})`
          }}
          initial={{ scale: 1 }}
          animate={{
            scale: 0,
            y: particle.y - 20,
            opacity: 0
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
