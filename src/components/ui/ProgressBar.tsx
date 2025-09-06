"use client";

import { useState, useEffect } from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  currentStep: number;
  totalSteps: number;
  className?: string;
}

// Yellow sparkle system matching the reference code
interface Sparkle {
  id: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const YellowSparkles = ({ isActive }: { isActive: boolean }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  
  useEffect(() => {
    if (!isActive) return;
    
    const generateSparkles = () => {
      return Array.from({ length: 80 }, (_, i) => ({
        id: `sparkle-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 0.5, // 0.5px to 3.5px
        delay: Math.random() * 3000,
        duration: Math.random() * 2 + 2, // 2-4 seconds
      }));
    };
    
    setSparkles(generateSparkles());
  }, [isActive]);
  
  if (!isActive) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: `${sparkle.delay}ms`,
            animationDuration: `${sparkle.duration}s`,
          }}
        >
          <div
            className="w-full h-full bg-yellow-300 rounded-full"
            style={{
              boxShadow: `0 0 ${sparkle.size * 2}px rgba(251, 191, 36, 0.8)`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default function ProgressBar({ 
  progress, 
  currentStep, 
  totalSteps, 
  className = "" 
}: ProgressBarProps) {
  // Show sparkles when progress changes
  const [showSparkles, setShowSparkles] = useState(false);
  const [lastProgress, setLastProgress] = useState(progress);
  
  useEffect(() => {
    if (progress > lastProgress) {
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 3000);
    }
    setLastProgress(progress);
  }, [progress, lastProgress]);
  
  return (
    <div className={`w-2/3 mx-auto ${className}`}>
      {/* Progress info */}
      <div className="flex justify-end items-center mb-3">
        <div className="font-serif text-yellow-400 text-sm">
          Question {currentStep} of {totalSteps}
        </div>
      </div>
      
      {/* Progress bar container with sparkles */}
      <div className="relative">
        <YellowSparkles isActive={showSparkles} />
        
        <div className="relative w-full h-6 bg-slate-700 rounded-full border-2 border-yellow-700/50 overflow-hidden shadow-inner">
          {/* Background ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/30 via-yellow-800/20 to-yellow-900/30 rounded-full" />
          
          {/* Progress fill with yellow liquid metal effect */}
          <div
            className="relative h-full rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #b45309 0%, #d97706 25%, #f59e0b 50%, #fbbf24 75%, #fde047 100%)',
              boxShadow: progress > 0 
                ? '0 0 20px rgba(251, 191, 36, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
                : 'none'
            }}
          >
            {/* Top highlight for 3D effect */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-200/40 to-yellow-100/40 rounded-full" />
            
            {/* Moving shimmer effect */}
            {progress > 0 && (
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full animate-shimmer"
                style={{
                  width: '40%',
                  transform: 'skewX(-20deg)'
                }}
              />
            )}
            
            {/* Leading edge bright spot */}
            {progress > 0 && progress < 100 && (
              <div
                className="absolute top-0 right-0 w-1 h-full bg-yellow-200 rounded-full animate-pulse-glow"
                style={{ 
                  boxShadow: '0 0 8px #fbbf24, 0 0 16px #f59e0b',
                }}
              />
            )}
          </div>
        </div>
      </div>
      
      {/* CSS Animations matching the reference */}
      <style jsx>{`
        @keyframes sparkle {
          0%, 20% { 
            opacity: 0; 
            transform: scale(0) rotate(0deg); 
          }
          25% { 
            opacity: 1; 
            transform: scale(1) rotate(180deg); 
          }
          50% { 
            opacity: 0.3; 
            transform: scale(1.2) rotate(270deg); 
          }
          75% { 
            opacity: 0.8; 
            transform: scale(0.8) rotate(360deg); 
          }
          100% { 
            opacity: 0; 
            transform: scale(0) rotate(450deg); 
          }
        }
        
        .animate-sparkle {
          animation: sparkle infinite ease-in-out;
        }
        
        @keyframes shimmer {
          0% { 
            transform: translateX(-100%) skewX(-20deg); 
          }
          50% { 
            transform: translateX(0%) skewX(-20deg); 
          }
          100% { 
            transform: translateX(200%) skewX(-20deg); 
          }
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.8; 
            transform: scaleY(1); 
          }
          50% { 
            opacity: 1; 
            transform: scaleY(1.1); 
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}