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
        <div className="h-screen flex flex-col">
          
          {/* Top Section - Harry Potter Title */}
          <div className="flex-none text-center" style={{ paddingTop: '60px' }}>
            <div className="flex justify-center items-center mb-4">
              <Image 
                src='/images/image.png' 
                alt='Harry Potter Logo' 
                width={320} 
                height={140} 
                className='object-contain max-w-full h-auto' 
                style={{
                  filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8))'
                }}
              />
            </div>
            
            <h2 className="heading-secondary text-center" style={{ marginBottom: '8px' }}>
              Sorting Hat
            </h2>
            <p className="body-text text-center">
              Discover your true house ceremony
            </p>
          </div>

          {/* Middle Section - Sorting Hat */}
          <div className="flex-1 flex items-center justify-center">
            
              <SortingHat 
                size="large"
                isAnimating={true}
                isTalking={false}
                showGlow={true}
              />
          </div>

          {/* Bottom Section - Button and Text */}
          <div className="flex-none" style={{ paddingBottom: '40px', paddingLeft: '24px', paddingRight: '24px' }}>
            {/* Main Button */}
            <button className="magical-button-full">
              Begin Your Sorting Ceremony
            </button>

            {/* Bottom Text */}
            <div className="text-center" style={{ marginTop: '20px' }}>
              <p className="magical-text">
              🪄Experience Magic🪄
              </p>
            </div>
          </div>

        </div>
      </MobileContainer>
    </AudioProvider>
  );
}