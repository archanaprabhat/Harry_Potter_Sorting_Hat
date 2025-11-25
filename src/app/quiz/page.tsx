// src/app/quiz/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Components
import SortingHat from "@/components/sorting-hat/SortingHat";
import MobileContainer from "@/components/layout/MobileContainer";
import GlobalControls from "@/components/layout/GlobalControls";
import StarField from "@/components/effects/StarField";
import ProgressBar from "@/components/ui/ProgressBar";
import ParchmentScroll from "@/components/ui/ParchmentScroll";

// Store & Data
import {
  useCurrentQuestionIndex,
  useQuizAnswers,
  useAddQuizAnswer,
  useNextQuestion,
  useSetSortedHouse,
} from "@/lib/store";
import { QUIZ_QUESTIONS, type QuizOption } from "@/lib/quiz-data";
import { calculateSortedHouse } from "@/lib/sorting-logic";

/**
 * Responsive Individual quiz option with magical hover animations
 * Displays option text, image, and handles click events
 */
/**
 * Responsive Individual quiz option with magical hover animations
 * Displays option text, image, and handles click events
 */
/**
 * Responsive Individual quiz option with magical hover animations
 * Displays option text, image, and handles click events
 */
/**
 * Responsive Individual quiz option with magical hover animations
 * Displays option text, image, and handles click events
 */
function QuizOptionCard({
  option,
  index,
  onSelect,
  isSelected = false
}: {
  option: QuizOption;
  index: number;
  onSelect: () => void;
  isSelected?: boolean;
}) {
  return (
    <motion.button
      // Entrance animation: fade in from below with staggered timing
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        ease: "easeOut"
      }}

      // Interactive hover effects with magical feel - reduced for mobile
      whileHover={{
        scale: 1.02,              // Reduced scale for mobile
        y: -4,                    // Reduced lift for mobile
        rotateX: 2,               // Subtle 3D tilt
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98, rotateX: -1 }}

      onClick={onSelect}
      className={`
        relative cursor-pointer rounded-lg overflow-hidden
        bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200
        border-2 shadow-lg backdrop-blur-sm
        transition-all duration-500 group w-full h-full flex flex-col
        
        // Responsive borders and shadows
        ${isSelected
          ? 'border-amber-600 shadow-amber-400/50 shadow-lg sm:shadow-xl bg-gradient-to-br from-amber-200 to-amber-300'
          : 'border-amber-300/70 hover:border-amber-500 hover:shadow-amber-300/60 hover:shadow-lg sm:hover:shadow-xl'
        }
      `}
      style={{
        padding: 'clamp(0.5rem, 1.5vh, 1rem)',
        background: isSelected
          ? 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 50%, #f59e0b 100%)'
          : undefined
      }}
    >
      {/* Magical shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                      -skew-x-12 transform -translate-x-full group-hover:translate-x-full
                      transition-transform duration-1000 ease-out" />

      {/* Magical particles background - responsive sizing */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {[...Array(3)].map((_, i) => (  // Reduced particles for mobile
          <motion.div
            key={i}
            className="absolute bg-amber-400 rounded-full
                       w-0.5 h-0.5 sm:w-1 sm:h-1"  // Responsive particle size
            style={{
              left: `${20 + i * 25}%`,
              top: `${25 + (i % 2) * 50}%`,
            }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content container with proper spacing - Centers everything */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center" style={{ gap: 'clamp(0.25rem, 1vh, 0.75rem)' }}>

        {/* Option image icon - responsive sizing */}
        {option.image && (
          <div className="flex-shrink-0">
            <motion.div
              className="relative rounded-full bg-amber-300/50 
                        flex items-center justify-center border border-amber-500/30
                        group-hover:bg-amber-400/60 transition-all duration-300"
              style={{
                width: 'clamp(2rem, 5vw, 3rem)',
                height: 'clamp(2rem, 5vw, 3rem)'
              }}
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <Image
                src={option.image}
                alt=""
                width={24}
                height={24}
                className="opacity-90 group-hover:opacity-100 transition-opacity"
                style={{
                  width: 'clamp(1rem, 2.5vw, 1.5rem)',
                  height: 'clamp(1rem, 2.5vw, 1.5rem)'
                }}
              />
            </motion.div>
          </div>
        )}

        {/* Option text content - responsive typography */}
        <div className="flex-1 flex items-center justify-center w-full min-h-0">
          <p className="font-serif text-amber-900 text-center leading-tight relative z-10
                        group-hover:text-amber-800 transition-colors duration-300
                        font-medium line-clamp-4"
            style={{ fontSize: 'clamp(0.625rem, 2vw, 1rem)' }}>  {/* Responsive text sizing */}
            {option.text}
          </p>
        </div>
      </div>

      {/* Selection indicator - responsive sizing */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute border-2 border-white bg-amber-500 rounded-full
                     flex items-center justify-center shadow-lg"
          style={{
            top: 'clamp(-0.25rem, -0.5vh, -0.5rem)',
            right: 'clamp(-0.25rem, -0.5vh, -0.5rem)',
            width: 'clamp(1rem, 3vw, 1.5rem)',
            height: 'clamp(1rem, 3vw, 1.5rem)'
          }}
        >
          <span className="text-white font-bold" style={{ fontSize: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}>✓</span>
        </motion.div>
      )}
    </motion.button>
  );
}

/**
 * Main quiz content and logic
 * Handles question flow, answer collection, and navigation
 */
function QuizContent() {
  const router = useRouter();

  // Store state - quiz progress and answers
  const currentQuestionIndex = useCurrentQuestionIndex();
  const quizAnswers = useQuizAnswers();
  const addQuizAnswer = useAddQuizAnswer();
  const nextQuestion = useNextQuestion();
  const setSortedHouse = useSetSortedHouse();

  // Local component state for UI feedback
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current question data
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  /**
   * Handle quiz completion when no more questions
   * Calculate final house result and redirect
   */
  useEffect(() => {
    if (!currentQuestion && quizAnswers.length === QUIZ_QUESTIONS.length) {
      const house = calculateSortedHouse(quizAnswers);
      setSortedHouse(house);
      router.push('/results');
    }
  }, [currentQuestion, quizAnswers, setSortedHouse, router]);

  // Show loading spinner if quiz is complete but still processing
  if (!currentQuestion) {
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

  /**
   * Handle user selecting an answer option
   * Adds visual feedback, records answer, and moves to next question
   */
  const handleOptionSelect = async (optionIndex: number) => {
    // Prevent multiple clicks during submission
    if (isSubmitting) return;

    // Show selected state and disable further clicks
    setSelectedOption(optionIndex);
    setIsSubmitting(true);

    // Add magical delay for better UX (shows selection feedback)
    await new Promise(resolve => setTimeout(resolve, 800));

    // Record the user's answer in the store
    addQuizAnswer(optionIndex);

    // Navigate to next question or complete quiz
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      // More questions remaining - go to next
      nextQuestion();
      setSelectedOption(null);  // Reset selection for next question
    } else {
      // Quiz complete - calculate final result and redirect
      const finalAnswers = [...quizAnswers, optionIndex];
      const house = calculateSortedHouse(finalAnswers);
      setSortedHouse(house);
      router.push('/results');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ padding: 'clamp(0.5rem, 1.5vh, 1rem)' }}>
      {/* Background magical effects */}
      <StarField />

      {/* Global UI controls (likely back button, settings, etc) */}
      <GlobalControls />

      {/* Animated Sorting Hat at top - scales with viewport */}
      <div className="flex-shrink-0 flex justify-center" style={{ marginBottom: 'clamp(0.25rem, 1vh, 0.75rem)' }}>
        <SortingHat size="medium" isAnimating={true} showGlow={true} />
      </div>

      {/* Main content area - Fluid layout with percentage widths */}
      <div className="flex-1 flex flex-col w-[95%] mx-auto min-h-0" style={{ gap: 'clamp(0.5rem, 1.5vh, 1.5rem)' }}>

        {/* Top Section: Progress & Question - Dynamic height based on screen */}
        <div className="flex flex-col justify-center min-h-0" style={{
          height: 'clamp(25%, 30vh, 35%)',
          gap: 'clamp(0.5rem, 1vh, 1rem)'
        }}>
          {/* Quiz progress indicator */}
          <div className="w-[90%] mx-auto flex-shrink-0">
            <ProgressBar
              progress={progress}
              currentStep={currentQuestionIndex + 1}
              totalSteps={QUIZ_QUESTIONS.length}
            />
          </div>

          {/* Question display with parchment styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex justify-center flex-1 min-h-0"
          >
            <ParchmentScroll
              className="text-sm sm:text-base md:text-lg lg:text-xl font-bold w-full"
              subtitle={currentQuestion.question}
            />
          </motion.div>
        </div>

        {/* Bottom Section: Answer options grid - Takes remaining space */}
        <div className="flex-1 min-h-0 w-full">
          <AnimatePresence mode="wait">
            <div className="grid grid-cols-2 h-full w-full" style={{ gap: 'clamp(0.5rem, 1.5vw, 1.5rem)' }}>
              {currentQuestion.options.map((option, index) => (
                <QuizOptionCard
                  key={index}
                  option={option}
                  index={index}
                  onSelect={() => handleOptionSelect(index)}
                  isSelected={selectedOption === index}
                />
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* Loading overlay during answer submission */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-purple-900/20 backdrop-blur-sm 
                       flex items-center justify-center z-50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-6xl text-amber-400"
            >
              🔮
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Main Quiz Page Component
 * Wraps quiz content in mobile-responsive container
 */
export default function QuizPage() {
  return (
    <MobileContainer>
      <div className="h-screen flex flex-col">
        <QuizContent />
      </div>
    </MobileContainer>
  );
}