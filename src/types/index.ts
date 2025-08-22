// src/types/index.ts

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  image: string;
  housePoints: {
    gryffindor: number;
    slytherin: number;
    hufflepuff: number;
    ravenclaw: number;
  };
}

export interface HouseScores {
  gryffindor: number;
  slytherin: number;
  hufflepuff: number;
  ravenclaw: number;
}

export type HouseName = 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw';

export interface SortingResult {
  house: HouseName;
  userName: string;
  scores: HouseScores;
  percentage: number;
}

export interface AudioState {
  backgroundMusic: boolean;
  soundEffects: boolean;
  hatVoice: boolean;
}

export interface HatAnimationState {
  isBlinking: boolean;
  isTalking: boolean;
  isFloating: boolean;
  mouthPosition: 'closed' | 'open' | 'mid';
  eyeState: 'open' | 'closed' | 'wink';
}

export interface GameState {
  currentScreen: 'landing' | 'name-entry' | 'quiz' | 'results';
  userName: string;
  currentQuestionIndex: number;
  answers: string[];
  finalResult: SortingResult | null;
  isLoading: boolean;
}