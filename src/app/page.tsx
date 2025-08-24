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
        <div className="h-screen flex flex-col px-6 py-6">
          
          {/* Top Section - Harry Potter Title */}
          <div className="flex-none text-center">
            <div className="mb-4">
              <Image 
                src='/images/image.png' 
                alt='Harry Potter Logo' 
                width={280} 
                height={120} 
                className='mx-auto block' 
              />
            </div>
            
            <h2 className="heading-secondary text-2xl mb-2 text-center">
              Sorting Hat
            </h2>
            <p className="body-text text-center opacity-90 text-sm">
              Discover your true house ceremony
            </p>
          </div>

          {/* Middle Section - Sorting Hat */}
          <div className="flex-1 flex items-center justify-center py-8">
            <SortingHat 
              size="large"
              isAnimating={true}
              isTalking={false} // Commented out isTalking functionality
              showGlow={true}
            />
          </div>

          {/* Bottom Section - Single Button */}
          <div className="flex-none">
            {/* COMMENTED OUT: Make Hat Talk Button and Logic
            <button
              onClick={() => setIsTalking(!isTalking)}
              className="magical-button w-full text-center py-3 mb-4"
            >
              {isTalking ? 'Stop Talking' : 'Make Hat Talk'}
            </button>
            */}
            
            <button className="magical-button w-full text-center py-3 mb-4">
              Begin Your Sorting Ceremony
            </button>

            <div className="text-center">
              <p className="text-xs opacity-60">
                ⚡ Magical Experience ⚡
              </p>
            </div>
          </div>

        </div>
      </MobileContainer>
    </AudioProvider>
  );
}