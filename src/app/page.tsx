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
        {/* Remove justify-center and use flex-col with space-y for proper spacing */}
        <div className="px-8 py-16 flex flex-col items-center min-h-screen space-y-12">
          {/* Harry Potter Title */}
          <div className="text-center space-y-6">
            <Image src='/images/image.png' alt='' width={500} height={500} className='mx-auto' />
            <h2 className="heading-secondary text-2xl !mb-6">
              Sorting Hat
            </h2>
            <p className="body-text text-center opacity-90">
              Discover your true house ceremony
            </p>
          </div>

          {/* Enhanced Sorting Hat with explicit margin */}
          <div className="py-12 mt-8">
            <SortingHat 
              size="large"
              isAnimating={true}
              isTalking={isTalking}
              showGlow={true}
            />
          </div>

          {/* Test Controls with margin-top */}
          <div className="space-y-6 w-1/2 max-w-xs mt-12">
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
          <div className="text-center mt-auto pt-8">
            <p className="text-sm opacity-60">
              ⚡ Magical Experience ⚡
            </p>
          </div>
        </div>
      </MobileContainer>
    </AudioProvider>
  );
}