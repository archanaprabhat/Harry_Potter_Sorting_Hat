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
        <div className="px-8 py-12 flex flex-col items-center min-h-screen justify-between">
          {/* Top spacer */}
          <div className="flex-shrink-0"></div>
          
          {/* Content */}
          <div className="flex flex-col items-center space-y-8">
            {/* Harry Potter Title */}
            <div className="text-center">
              <h1 className="heading-primary mb-1">
                <Image src='/images/image.png' alt='Harry Potter' width={230} height={75} className="mx-auto" />
              </h1>
              <h2 className="heading-secondary text-lg mb-1">
                Sorting Hat
              </h2>
              <p className="body-text text-sm opacity-75 leading-tight">
                Discover your true house ceremony
              </p>
            </div>

            {/* Enhanced Sorting Hat */}
            <div className="py-4">
              <SortingHat 
                size="large"
                isAnimating={true}
                isTalking={isTalking}
                showGlow={true}
              />
            </div>
          </div>

          {/* Main Action Button */}
          <div className="w-full px-4 flex-shrink-0">
            <button className="magical-button w-full text-center">
              Begin Your Sorting Ceremony
            </button>
          </div>
        </div>
      </MobileContainer>
    </AudioProvider>
  );
}