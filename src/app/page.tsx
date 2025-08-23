// src/app/page.tsx

'use client';

import { useState } from 'react';
import SortingHat from '@/components/sorting-hat/SortingHat';
import MobileContainer from '@/components/layout/MobileContainer';
import { AudioProvider } from '@/components/layout/AudioProvider';
import Image from 'next/image'

export default function Home() {
  const [isTalking, setIsTalking] = useState(false);

  return (
    <AudioProvider>
      <MobileContainer>
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          {/* Main Content Card */}
          <div className="w-full max-w-sm bg-gradient-to-b from-purple-700 via-amber-700 to-purple-800 rounded-3xl shadow-2xl p-8 flex flex-col items-center">
            
            {/* Harry Potter Title */}
            <div className="text-center mb-8">
              <h1 className="heading-primary mb-6">
                <Image src='/images/image.png' alt='Harry Potter' width={300} height={100} className="mx-auto" />
              </h1>
              <h2 className="heading-secondary text-2xl mb-4">
                Sorting Hat
              </h2>
              <p className="body-text text-center opacity-90 text-lg">
                Discover your true house ceremony
              </p>
            </div>

            {/* Enhanced Sorting Hat */}
            <div className="my-10">
              <SortingHat 
                size="large"
                isAnimating={true}
                isTalking={isTalking}
                showGlow={true}
              />
            </div>

            {/* Main Button */}
            <button className="magical-button w-full text-center text-lg py-4 px-8 mb-8">
              Begin Your Sorting Ceremony
            </button>

            {/* Test Controls - Hidden by default, can be shown for development */}
            <div className="space-y-4 w-full max-w-xs">
              <button
                onClick={() => setIsTalking(!isTalking)}
                className="magical-button w-full text-center text-sm py-2 px-4 opacity-60 hover:opacity-100"
              >
                {isTalking ? 'Stop Talking' : 'Make Hat Talk'}
              </button>
            </div>
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