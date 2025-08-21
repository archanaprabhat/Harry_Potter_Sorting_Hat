// src/app/page.tsx

'use client';

import { useState } from 'react';
import SortingHat from '@/components/sorting-hat/SortingHat';
import MobileContainer from '@/components/layout/MobileContainer';
import { AudioProvider } from '@/components/layout/AudioProvider';

export default function Home() {
  const [isTalking, setIsTalking] = useState(false);

  return (
    <AudioProvider>
      <MobileContainer>
        <div className="p-8 flex flex-col items-center min-h-screen justify-center space-y-8">
          {/* Harry Potter Title */}
          <div className="text-center space-y-4">
            <h1 className="heading-primary text-4xl mb-2">
              Harry Potter
            </h1>
            <h2 className="heading-secondary text-2xl">
              Sorting Hat
            </h2>
            <p className="body-text text-center opacity-90">
              Discover your true house ceremony
            </p>
          </div>

          {/* Enhanced Sorting Hat */}
          <div className="py-8">
            <SortingHat 
              size="large"
              isAnimating={true}
              isTalking={isTalking}
              showGlow={true}
            />
          </div>

          {/* Test Controls */}
          <div className="space-y-4 w-full max-w-xs">
            <button
              onClick={() => setIsTalking(!isTalking)}
              className="magical-button w-full text-center"
            >
              {isTalking ? 'Stop Talking' : 'Make Hat Talk'}
            </button>
            
            <button className="magical-button w-full text-center">
              Begin Your Sorting Ceremony
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm opacity-60">
              ⚡ Magical Experience ⚡
            </p>
          </div>
        </div>
      </MobileContainer>
    </AudioProvider>
  );
}