'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SortingHat from '@/components/sorting-hat/SortingHat';
import MobileContainer from '@/components/layout/MobileContainer';
import { AudioProvider } from '@/components/layout/AudioProvider';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { HeadingSecondary, BodyText, MagicalText } from '@/components/ui/Typography';

export default function Home() {
  const [isTalking, setIsTalking] = useState(false);
  const router = useRouter();

  const handleBeginCeremony = () => {
    router.push('/name-entry');
  };

  return (
    <AudioProvider>
      <MobileContainer>
        <div className="h-screen flex flex-col justify-evenly">
          
          {/* Top Section */}
          <div className="flex-none text-center pt-[60px]">
            <div className="flex justify-center items-center mb-4">
              <Image 
                src='/images/image.png' 
                alt='Harry Potter Logo' 
                width={320} 
                height={140} 
                className='object-contain max-w-full h-auto drop-shadow-lg' 
              />
            </div>
            
            <HeadingSecondary>Sorting Hat</HeadingSecondary>
            <BodyText>Discover your true house ceremony</BodyText>
          </div>

          {/* Middle Section */}
          <div className="flex-1 flex items-center justify-center">
            <SortingHat size="large" isAnimating={true} isTalking={false} showGlow={true} />
          </div>

          {/* Bottom Section */}
          <div className="flex-none pb-10 px-6 mx-auto">
            <Button
              onClick={handleBeginCeremony}
              variant="primary"
              size="large"
              fullWidth={false}
            >
              Begin Your Sorting Ceremony
            </Button>

            <div className="text-center mb-5 mt-5">
              <MagicalText>🪄Experience Magic🪄</MagicalText>
            </div>
          </div>

        </div>
      </MobileContainer>
    </AudioProvider>
  );
}
