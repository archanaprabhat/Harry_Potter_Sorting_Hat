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
import MagicalCursor from "@/components/effects/MagicalCursor";
import StarField from "@/components/effects/StarField";
import ProgressBar from "@/components/ui/ProgressBar";

// Store & Data
import {
  useCurrentQuestionIndex,
  useQuizAnswers,
  useAddQuizAnswer,
  useNextQuestion,
  useSetSortedHouse,
  useUserName
} from "@/lib/store";
import { QUIZ_QUESTIONS, type QuizOption } from "@/lib/quiz-data";
import { calculateSortedHouse } from "@/lib/sorting-logic";

/* -------------------------------------------------------------------------- */
/*                              Helper Components                             */
/* -------------------------------------------------------------------------- */

/**
 * Magical parchment container for questions
 */
function ParchmentQuestion({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mx-4 mb-8"
    >
      {/* Parchment shadow */}
      <div className="bg-amber-900/20 rounded-xl blur-sm transform translate-y-2" />
      
      {/* Main parchment */}
      <div className="relative bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 
                      border-4 border-amber-600/60 rounded-xl p-6
                      shadow-2xl backdrop-blur-sm">
        
                
        {/* Magical sparkles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-4 right-4 text-amber-600/40 text-xl"
        >
          ✨
        </motion.div>
        
        {children}
      </div>
    </motion.div>
  );
}

/**
 * Individual answer option with magical hover effects
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ 
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`
        relative w-full p-4 mb-3 mx-2 rounded-xl 
        bg-gradient-to-br from-amber-100/90 via-amber-200/80 to-amber-300/70
        border-2 border-amber-400/60 shadow-lg
        transition-all duration-300 group
        hover:border-amber-500 hover:shadow-amber-200/50 hover:shadow-xl
        ${isSelected ? 'ring-2 ring-amber-500 border-amber-600' : ''}
      `}
    >
      {/* Magical glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-300/20 to-gold/20 
                      rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Option image */}
      {option.image && (
        <div className="flex justify-center mb-3">
          <div className="relative w-12 h-12 rounded-full bg-amber-200/50 
                          flex items-center justify-center border border-amber-400/30">
            <Image
              src={option.image}
              alt=""
              width={32}
              height={32}
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      )}
      
      {/* Option text */}
      <p className="font-serif text-amber-900 text-sm leading-relaxed relative z-10
                    group-hover:text-amber-800 transition-colors">
        {option.text}
      </p>
      
      {/* Floating particles on hover */}
      <motion.div
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-amber-500/60 text-xs">⭐</span>
      </motion.div>
    </motion.button>
  );
}

/**
 * Main quiz content component
 */
function QuizContent() {
  const router = useRouter();
  const userName = useUserName();
  
  const currentQuestionIndex = useCurrentQuestionIndex();
  const quizAnswers = useQuizAnswers();
  const addQuizAnswer = useAddQuizAnswer();
  const nextQuestion = useNextQuestion();
  const setSortedHouse = useSetSortedHouse();
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if no name provided
  useEffect(() => {
    if (!userName) {
      router.push('/name-entry');
    }
  }, [userName, router]);

  // Get current question
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;
  
  if (!currentQuestion) {
    // Quiz completed - calculate result and navigate
    useEffect(() => {
      if (quizAnswers.length === QUIZ_QUESTIONS.length) {
        const house = calculateSortedHouse(quizAnswers);
        setSortedHouse(house);
        router.push('/results');
      }
    }, [quizAnswers, setSortedHouse, router]);
    
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

  const handleOptionSelect = async (optionIndex: number) => {
    if (isSubmitting) return;
    
    setSelectedOption(optionIndex);
    setIsSubmitting(true);
    
    // Add magical delay for effect
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Record the answer
    addQuizAnswer(optionIndex);
    
    // Move to next question or finish
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      nextQuestion();
      setSelectedOption(null);
    } else {
      // Quiz complete - calculate and navigate to results
      const finalAnswers = [...quizAnswers, optionIndex];
      const house = calculateSortedHouse(finalAnswers);
      setSortedHouse(house);
      router.push('/results');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="no-scroll flex flex-col h-full relative">
      {/* Magical background effects */}
      <StarField />
      
      
      {/* Global controls */}
      <GlobalControls />
      
       {/* Sorting Hat */}
       <div className="top-0" >
        <div className="flex justify-center">
          <SortingHat size="medium" isAnimating={true} showGlow={true} />
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="pt-0 pb-4 px-6">
        <ProgressBar 
          progress={progress}
          currentStep={currentQuestionIndex + 1}
          totalSteps={QUIZ_QUESTIONS.length}
        />
      </div>
      
     
      
      {/* Main content area */}
      <div className="flex-1 overflow-y-auto px-2">
        {/* Question parchment */}
        <ParchmentQuestion>
          <div className="text-center mb-6">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-lg font-bold text-amber-900 leading-relaxed"
            >
              {currentQuestion.question}
            </motion.h1>
          </div>
        </ParchmentQuestion>
        
        {/* Answer options */}
        <div className="pb-8">
          <AnimatePresence>
            {currentQuestion.options.map((option, index) => (
              <QuizOptionCard
                key={index}
                option={option}
                index={index}
                onSelect={() => handleOptionSelect(index)}
                isSelected={selectedOption === index}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Magical loading overlay */}
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

/* -------------------------------------------------------------------------- */
/*                                   Page                                     */
/* -------------------------------------------------------------------------- */

export default function QuizPage() {
  return (
    <MobileContainer>
      <QuizContent />
    </MobileContainer>
  );
}