// src/lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Global state for the Harry Potter Sorting Hat app.
 * We persist essentials so refreshes don't wipe the quiz.
 */
interface AppState {
  // Who is taking the quiz
  userName: string;

  // Where the user is in the 10-question flow (0-based)
  currentQuestionIndex: number;

  // For each answered question, store the selected option's index (0..3)
  quizAnswers: number[];

  // Final result after scoring
  sortedHouse: 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw' | null;

  // Actions (called from components)
  setUserName: (name: string) => void;
  addQuizAnswer: (answerIndex: number) => void;
  nextQuestion: () => void;
  setSortedHouse: (house: 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw') => void;
  resetQuiz: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // --- Initial state ---
      userName: '',
      currentQuestionIndex: 0,
      quizAnswers: [],
      sortedHouse: null,

      /**
       * Save/overwrite the user's name from the Name Entry page.
       */
      setUserName: (name: string) => {
        set({ userName: name.trim() });
      },

      /**
       * Record the selected option for the current question.
       * We append the option index to the answers array.
       * (E.g., if Q1 picked option #2, we push 2.)
       */
      addQuizAnswer: (answerIndex: number) => {
        const current = get().quizAnswers;
        set({ quizAnswers: [...current, answerIndex] });
      },

      /**
       * Advance to the next question (used by Next button or after selecting an option).
       */
      nextQuestion: () => {
        set({ currentQuestionIndex: get().currentQuestionIndex + 1 });
      },

      /**
       * Store the final computed house so the Results page can render it.
       */
      setSortedHouse: (house) => {
        set({ sortedHouse: house });
      },

      /**
       * Replay the quiz with the same name.
       * Clears progress + answers + result.
       */
      resetQuiz: () => {
        set({ currentQuestionIndex: 0, quizAnswers: [], sortedHouse: null });
      },
    }),
    {
      name: 'harry-potter-sorting', // localStorage key
      // Persist only meaningful data for this app.
      partialize: (state) => ({
        userName: state.userName,
        currentQuestionIndex: state.currentQuestionIndex,
        quizAnswers: state.quizAnswers,
        sortedHouse: state.sortedHouse,
      }),
    }
  )
);

/* ---------- Selectors (read values) ---------- */
/** Read just the userName (component re-renders only if userName changes). */
export const useUserName = () => useAppStore((s) => s.userName);

/** Read the current question pointer (0..9). */
export const useCurrentQuestionIndex = () => useAppStore((s) => s.currentQuestionIndex);

/** Read the list of selected option indices so far. */
export const useQuizAnswers = () => useAppStore((s) => s.quizAnswers);

/** Read the final result, if computed. */
export const useSortedHouse = () => useAppStore((s) => s.sortedHouse);

/* ---------- Action hooks (call functions) ---------- */
/** Get the function that writes userName. */
export const useSetUserName = () => useAppStore((s) => s.setUserName);

/** Get the function that appends an answer for the current question. */
export const useAddQuizAnswer = () => useAppStore((s) => s.addQuizAnswer);

/** Get the function that advances the quiz index. */
export const useNextQuestion = () => useAppStore((s) => s.nextQuestion);

/** Get the function that writes the final house result. */
export const useSetSortedHouse = () => useAppStore((s) => s.setSortedHouse);

/** Get the function that resets progress but keeps the name. */
export const useResetQuiz = () => useAppStore((s) => s.resetQuiz);
