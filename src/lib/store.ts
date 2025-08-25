// src/lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the shape of our application state
interface AppState {
  // User data
  userName: string;
  
  // Quiz data
  currentQuestionIndex: number;
  quizAnswers: number[];
  
  // Results data
  sortedHouse: 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw' | null;
  
  // Actions for updating state
  setUserName: (name: string) => void;
  addQuizAnswer: (answerIndex: number) => void;
  nextQuestion: () => void;
  setSortedHouse: (house: 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw') => void;
  resetQuiz: () => void;
  resetAll: () => void;
}

// Create the Zustand store with persistence
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      userName: '',
      currentQuestionIndex: 0,
      quizAnswers: [],
      sortedHouse: null,

      // Actions - these are the functions components can call to update state
      setUserName: (name: string) => {
        set({ userName: name.trim() });
      },

      addQuizAnswer: (answerIndex: number) => {
        const currentAnswers = get().quizAnswers;
        set({ 
          quizAnswers: [...currentAnswers, answerIndex] 
        });
      },

      nextQuestion: () => {
        const currentIndex = get().currentQuestionIndex;
        set({ 
          currentQuestionIndex: currentIndex + 1 
        });
      },

      setSortedHouse: (house) => {
        set({ sortedHouse: house });
      },

      // Reset just the quiz data (keep the name)
      resetQuiz: () => {
        set({
          currentQuestionIndex: 0,
          quizAnswers: [],
          sortedHouse: null
        });
      },

      // Reset everything (for starting completely over)
      resetAll: () => {
        set({
          userName: '',
          currentQuestionIndex: 0,
          quizAnswers: [],
          sortedHouse: null
        });
      }
    }),
    {
      name: 'harry-potter-sorting', // Key in localStorage
      // Only persist certain fields (not temporary UI state)
      partialize: (state) => ({
        userName: state.userName,
        quizAnswers: state.quizAnswers,
        currentQuestionIndex: state.currentQuestionIndex,
        sortedHouse: state.sortedHouse
      })
    }
  )
);

// Custom hooks for commonly used state selections
// This prevents unnecessary re-renders by only subscribing to specific parts of the store

export const useUserName = () => useAppStore(state => state.userName);
export const useQuizState = () => useAppStore(state => ({
  currentQuestionIndex: state.currentQuestionIndex,
  quizAnswers: state.quizAnswers,
  totalAnswers: state.quizAnswers.length
}));
export const useSortedHouse = () => useAppStore(state => state.sortedHouse);

// Action hooks - separate from state for cleaner component code
export const useAppActions = () => {
    const setUserName = useAppStore(state => state.setUserName);
    const addQuizAnswer = useAppStore(state => state.addQuizAnswer);
    const nextQuestion = useAppStore(state => state.nextQuestion);
    const setSortedHouse = useAppStore(state => state.setSortedHouse);
    const resetQuiz = useAppStore(state => state.resetQuiz);
    const resetAll = useAppStore(state => state.resetAll);
  
    return { setUserName, addQuizAnswer, nextQuestion, setSortedHouse, resetQuiz, resetAll };
  };
  