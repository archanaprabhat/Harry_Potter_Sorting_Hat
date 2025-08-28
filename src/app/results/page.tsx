// src/app/results/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserName, useSortedHouse, useQuizAnswers, useResetAll, useResetQuiz } from '@/lib/store';
import MobileContainer from '@/components/layout/MobileContainer';
import { AudioProvider } from '@/components/layout/AudioProvider';

export default function ResultsPage() {
  // ALL DATA FROM ZUSTAND STORE
  const userName = useUserName();
  const sortedHouse = useSortedHouse();
  const quizAnswers = useQuizAnswers();
  const resetAll = useResetAll();
  const resetQuiz = useResetQuiz();
  
  const router = useRouter();

  // Redirect if no data
  useEffect(() => {
    if (!userName || quizAnswers.length === 0) {
      router.push('/name-entry');
    }
  }, [userName, quizAnswers, router]);

  if (!userName) {
    return <div>Loading...</div>;
  }

  return (
    <AudioProvider>
      <MobileContainer>
        <div className="h-full flex flex-col justify-center p-6 text-center">
          
          {/* Results Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif text-parchment mb-4">
              Congratulations, {userName}!
            </h1>
            <div className="parchment-bg p-6 rounded-lg">
              <h2 className="text-2xl font-serif text-amber-900 mb-2">
                You have been sorted into...
              </h2>
              <h3 className="text-4xl font-bold text-red-700">
                {sortedHouse || 'GRYFFINDOR'}
              </h3>
            </div>
          </div>

          {/* Debug Information */}
          <div className="bg-green-900/50 p-4 rounded mb-6 text-left">
            <h3 className="text-white font-bold mb-2">Stored Data (from Zustand):</h3>
            <p className="text-green-200 text-sm">Name: "{userName}"</p>
            <p className="text-green-200 text-sm">House: {sortedHouse || 'Not set'}</p>
            <p className="text-green-200 text-sm">Quiz answers: {quizAnswers.length} answers</p>
            <p className="text-green-200 text-sm">
              Answers: [{quizAnswers.join(', ')}]
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => {
                resetQuiz(); // Keep name, reset quiz
                router.push('/quiz');
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg
                       transition-colors duration-200"
            >
              Take Quiz Again (Keep Name: {userName})
            </button>
            
            <button
              onClick={() => {
                resetAll(); // Reset everything
                router.push('/name-entry');
              }}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg
                       transition-colors duration-200"
            >
              Start Over Completely
            </button>
          </div>

          {/* Data Flow Explanation */}
          <div className="mt-8 bg-purple-900/30 p-4 rounded text-left">
            <h4 className="text-purple-200 font-bold mb-2">How Data Flows:</h4>
            <ol className="text-purple-300 text-sm space-y-1">
              <li>1. Name entered in name-entry page → stored in Zustand</li>
              <li>2. Quiz answers → stored in Zustand as array</li>
              <li>3. Results calculated → house stored in Zustand</li>
              <li>4. All data persists across page refreshes</li>
              <li>5. Data shared across all components</li>
            </ol>
          </div>

        </div>
      </MobileContainer>
    </AudioProvider>
  );
}