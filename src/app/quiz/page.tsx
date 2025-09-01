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
        transition-all duration-500 group
        
        // Responsive height and padding - smaller to fit all screens
        h-16 p-1.5 sm:h-20 sm:p-2 md:h-24 md:p-3
        
        // Responsive borders and shadows
        ${isSelected 
          ? 'border-amber-600 shadow-amber-400/50 shadow-lg sm:shadow-xl bg-gradient-to-br from-amber-200 to-amber-300' 
          : 'border-amber-300/70 hover:border-amber-500 hover:shadow-amber-300/60 hover:shadow-lg sm:hover:shadow-xl'
        }
      `}
      style={{
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
      <div className="absolute inset-0 opacity-30">
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
      
      {/* Content container with proper spacing */}
      <div className="relative z-10 h-full flex flex-col">
        
        {/* Option image icon - responsive sizing */}
        {option.image && (
          <div className="flex justify-center mb-1 sm:mb-2">
            <motion.div 
              className="relative rounded-full bg-amber-300/50 
                        flex items-center justify-center border border-amber-500/30
                        group-hover:bg-amber-400/60 transition-all duration-300
                        w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"  // Responsive icon container
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <Image
                src={option.image}
                alt=""
                width={16}  // Base size for mobile
                height={16}
                className="opacity-90 group-hover:opacity-100 transition-opacity
                          w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"  // Responsive image size
              />
            </motion.div>
          </div>
        )}
        
        {/* Option text content - responsive typography */}
        <div className="flex-1 flex items-center justify-center px-0.5 sm:px-1">
          <p className="font-serif text-amber-900 text-center leading-tight relative z-10
                        group-hover:text-amber-800 transition-colors duration-300
                        font-medium
                        text-[9px] sm:text-[10px] md:text-xs">  {/* Responsive text sizing */}
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
                     flex items-center justify-center shadow-lg
                     -top-1 -right-1 w-4 h-4 sm:-top-2 sm:-right-2 sm:w-5 sm:h-5 md:w-6 md:h-6"  // Responsive indicator
        >
          <span className="text-white font-bold text-[8px] sm:text-xs">✓</span>
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
    <div className="h-full flex flex-col overflow-hidden">
      {/* Background magical effects */}
      <StarField />
      
      {/* Global UI controls (likely back button, settings, etc) */}
      <GlobalControls />
      
      {/* Animated Sorting Hat at top */}
      <div className="flex-shrink-0 py-1">
        <div className="flex justify-center">
          <SortingHat size="medium" isAnimating={true} showGlow={true} />
        </div>
      </div>
      
      {/* Quiz progress indicator - responsive padding */}
      <div className="flex-shrink-0 pt-0 pb-1 sm:pb-2 md:pb-3 px-3 sm:px-4 md:px-6">
        <ProgressBar 
          progress={progress}
          currentStep={currentQuestionIndex + 1}
          totalSteps={QUIZ_QUESTIONS.length}
        />
      </div>
      
      {/* Main content area - NO SCROLL, fixed layout */}
      <div className="flex-1 flex flex-col mx-auto w-full min-h-0">
        
        {/* Question display with parchment styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-2 sm:mb-3 md:mb-4 px-2 sm:px-4 flex-shrink-0"
        >
          <ParchmentScroll
            className="text-sm sm:text-base md:text-lg font-bold mb-2 
                       max-w-xs sm:max-w-sm md:max-w-md
                       mx-2 sm:mx-4 md:mx-6"
            subtitle={currentQuestion.question}
          />
        </motion.div>
        
        {/* Answer options grid - centers in remaining space */}
        <div className="flex-1 flex items-center justify-center px-2 sm:px-3 md:px-4">
          <AnimatePresence>
            <div className="grid grid-cols-2 w-full
                           max-w-xs sm:max-w-sm md:max-w-md
                           gap-2 sm:gap-3 md:gap-4">
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
        
        {/* Bottom spacer */}
        <div className="h-2 sm:h-3 md:h-4 flex-shrink-0"></div>
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