// src/app/results/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Components
import MobileContainer from "@/components/layout/MobileContainer";
import GlobalControls from "@/components/layout/GlobalControls";
import StarField from "@/components/effects/StarField";
import Button from "@/components/ui/Button";
import ParchmentScroll from "@/components/ui/ParchmentScroll";

// Store & Data
import { useUserName, useSortedHouse, useQuizAnswers, useResetQuiz } from "@/lib/store";
import { getHouseInfo, calculateHousePercentages } from "@/lib/sorting-logic";
import { HOUSES } from "@/lib/quiz-data";

/**
 * House Crest Component with magical animations
 */
function HouseCrest({ house }: { house: keyof typeof HOUSES }) {
  const houseInfo = getHouseInfo(house);
  const logoPath = `/images/${house}_logo.png`;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        duration: 1.2, 
        ease: "easeOut",
        delay: 0.5 
      }}
      className="relative flex justify-center mb-4"
    >
      {/* Glowing background effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${houseInfo.colors[0]}40 0%, transparent 70%)`,
          filter: 'blur(20px)',
          transform: 'scale(1.5)'
        }}
        animate={{
          scale: [1.5, 1.8, 1.5],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* House logo */}
      <motion.div
        className="relative z-10"
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={logoPath}
          alt={`${houseInfo.name} crest`}
          width={120}
          height={120}
          className="drop-shadow-2xl"
        />
      </motion.div>
      
      {/* Floating particles around the crest */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: houseInfo.colors[1],
            left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 80}%`,
            top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 80}%`,
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 360]
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
}

/**
 * House Information Display
 */
function HouseInfo({ house }: { house: keyof typeof HOUSES }) {
  const houseInfo = getHouseInfo(house);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="text-center mb-6"
    >
      {/* House name with magical styling */}
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mb-2 font-serif"
        style={{
          background: `linear-gradient(135deg, ${houseInfo.colors[0]}, ${houseInfo.colors[1]})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: `0 0 20px ${houseInfo.colors[1]}40`
        }}
        animate={{
          textShadow: [
            `0 0 20px ${houseInfo.colors[1]}40`,
            `0 0 30px ${houseInfo.colors[1]}60`,
            `0 0 20px ${houseInfo.colors[1]}40`
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {houseInfo.name}
      </motion.h1>

      {/* House description */}
      <motion.p
        className="text-amber-100 text-sm sm:text-base mb-4 px-4 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        {houseInfo.description}
      </motion.p>

      {/* House traits */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        {houseInfo.traits.map((trait, index) => (
          <motion.span
            key={trait}
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: `linear-gradient(135deg, ${houseInfo.colors[0]}80, ${houseInfo.colors[1]}80)`,
              color: 'white',
              border: `1px solid ${houseInfo.colors[1]}`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
          >
            {trait}
          </motion.span>
        ))}
      </motion.div>

      {/* House details */}
      <motion.div
        className="grid grid-cols-2 gap-4 text-xs sm:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <div className="text-center">
          <p className="text-amber-300 font-semibold">Founder</p>
          <p className="text-amber-100">{houseInfo.founder}</p>
        </div>
        <div className="text-center">
          <p className="text-amber-300 font-semibold">Element</p>
          <p className="text-amber-100">{houseInfo.element}</p>
        </div>
        <div className="text-center">
          <p className="text-amber-300 font-semibold">Animal</p>
          <p className="text-amber-100">{houseInfo.animal}</p>
        </div>
        <div className="text-center">
          <p className="text-amber-300 font-semibold">Colors</p>
          <p className="text-amber-100">{houseInfo.colors.join(' & ')}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * House Percentage Breakdown
 */
function HouseBreakdown({ answers }: { answers: number[] }) {
  const percentages = calculateHousePercentages(answers);
  const sortedHouses = Object.entries(percentages).sort(([,a], [,b]) => b - a);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      className="mb-6 px-4"
    >
      <h3 className="text-lg font-bold text-amber-200 mb-3 text-center">Your House Affinities</h3>
      
      <div className="space-y-3">
        {sortedHouses.map(([house, percentage], index) => {
          const houseInfo = getHouseInfo(house as keyof typeof HOUSES);
          const isTopHouse = index === 0;
          
          return (
            <motion.div
              key={house}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-amber-100 capitalize">
                  {houseInfo.name}
                </span>
                <span className="text-sm font-bold text-amber-300">
                  {percentage}%
                </span>
              </div>
              
              <div className="w-full bg-amber-900/30 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full rounded-full relative"
                  style={{
                    background: `linear-gradient(90deg, ${houseInfo.colors[0]}, ${houseInfo.colors[1]})`,
                    width: `${percentage}%`
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 2.4 + index * 0.1 }}
                >
                  {isTopHouse && (
                    <motion.div
                      className="absolute inset-0 bg-white/30"
                      animate={{
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/**
 * Action Buttons
 */
function ActionButtons({ onRetakeQuiz }: { onRetakeQuiz: () => void }) {
  const router = useRouter();

  return (
    <motion.div
      className="flex flex-col gap-3 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.5 }}
    >
      <Button
        onClick={onRetakeQuiz}
        variant="primary"
        size="large"
        fullWidth
      >
        🪄 Take the Quiz Again
      </Button>
      
      <Button
        onClick={() => router.push('/')}
        variant="outline"
        size="medium"
        fullWidth
      >
        🏰 Back to Hogwarts
      </Button>
    </motion.div>
  );
}

/**
 * Main Results Content
 */
function ResultsContent() {
  const router = useRouter();
  const userName = useUserName();
  const sortedHouse = useSortedHouse();
  const quizAnswers = useQuizAnswers();
  const resetQuiz = useResetQuiz();

  // Redirect if no results
  useEffect(() => {
    if (!sortedHouse) {
      router.push('/name-entry');
    }
  }, [sortedHouse, router]);

  // Show loading if no house yet
  if (!sortedHouse) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-6xl"
        >
          ⚡
        </motion.div>
      </div>
    );
  }

  const handleRetakeQuiz = () => {
    resetQuiz();
    router.push('/quiz');
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Background effects */}
      <StarField />
      
      {/* Global controls */}
      <GlobalControls />
      
      {/* Main content with scroll */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex flex-col py-6">
          
          {/* Congratulations message */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-4 px-4"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-amber-200 mb-2">
              Congratulations, {userName}!
            </h2>
            <p className="text-amber-100 text-sm">
              The Sorting Hat has made its decision...
            </p>
          </motion.div>

          {/* House crest */}
          <HouseCrest house={sortedHouse} />

          {/* House information */}
          <HouseInfo house={sortedHouse} />

          {/* House breakdown */}
          <HouseBreakdown answers={quizAnswers} />

          {/* Action buttons */}
          <ActionButtons onRetakeQuiz={handleRetakeQuiz} />
          
          {/* Bottom spacer */}
          <div className="h-6"></div>
        </div>
      </div>
    </div>
  );
}

/**
 * Main Results Page Component
 */
export default function ResultsPage() {
  return (
    <MobileContainer>
      <div className="h-screen flex flex-col">
        <ResultsContent />
      </div>
    </MobileContainer>
  );
}
