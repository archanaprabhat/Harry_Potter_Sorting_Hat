// src/lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Animation variants for consistent transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: "easeInOut" }
};

export const modalTransition = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.3, ease: "easeOut" }
};

export const slideTransition = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
  transition: { duration: 0.5, ease: "easeInOut" }
};

// House color utilities
export const houseColors = {
  gryffindor: {
    primary: '#7C0A02',
    secondary: '#D4AF37',
    bg: 'from-red-900 to-yellow-700',
    text: 'text-red-100',
    accent: 'border-yellow-400'
  },
  slytherin: {
    primary: '#1A472A',
    secondary: '#C0C0C0',
    bg: 'from-green-900 to-gray-700',
    text: 'text-green-100',
    accent: 'border-gray-400'
  },
  hufflepuff: {
    primary: '#ECB939',
    secondary: '#2D2926',
    bg: 'from-yellow-600 to-yellow-900',
    text: 'text-yellow-100',
    accent: 'border-yellow-300'
  },
  ravenclaw: {
    primary: '#0E1A40',
    secondary: '#946B2D',
    bg: 'from-blue-900 to-bronze-700',
    text: 'text-blue-100',
    accent: 'border-blue-400'
  }
};

// Random magical quotes for loading states
export const magicalQuotes = [
  "Consulting the ancient magic...",
  "Peering into your soul...",
  "The hat is thinking deeply...",
  "Weighing your noble qualities...",
  "Sensing your true nature...",
  "The magic is working..."
];

export const getRandomQuote = () => {
  return magicalQuotes[Math.floor(Math.random() * magicalQuotes.length)];
};

// Format percentage for display
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

// Generate share text
export const generateShareText = (userName: string, house: string): string => {
  return `🧙‍♀️ I've been sorted into ${house.toUpperCase()}! ⚡ Discover your Hogwarts house in this magical experience! #HarryPotter #SortingHat #${house}`;
};

// Sleep utility for artificial delays
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};