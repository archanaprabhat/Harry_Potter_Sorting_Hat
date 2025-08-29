// src/app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import SortingHat from '@/components/sorting-hat/SortingHat';
import MobileContainer from '@/components/layout/MobileContainer';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { HeadingSecondary, BodyText, MagicalText } from '@/components/ui/Typography';

export default function Home() {
  const router = useRouter();

  // Navigate to the name entry screen when user starts ceremony
  const handleBeginCeremony = () => {
    router.push('/name-entry');
  };

  return (
      <MobileContainer>
        {/* Full-screen layout: divided into header, hat area, and footer */}
        <div className="h-screen flex flex-col justify-evenly">
          
          {/* Header: Harry Potter logo + intro text */}
          <div className="text-center pt-[60px]">
            <div className="flex justify-center items-center mb-4">
              <Image 
                src="/images/image.png" 
                alt="Harry Potter Logo" 
                width={320} 
                height={140} 
                className="max-w-full h-auto" 
              />
            </div>
            
            <HeadingSecondary>Sorting Hat</HeadingSecondary>
            <BodyText>Discover your true house ceremony</BodyText>
          </div>

          {/* Centerpiece: animated Sorting Hat (floating + glow effect) */}
          <div className="flex-1 flex items-center justify-center">
            <SortingHat size="large" isAnimating={true} showGlow={true} />
          </div>

          {/* Footer: Start button + magical text */}
          <div className="pb-10 px-6 mx-auto">
            <Button
              onClick={handleBeginCeremony}
              variant="primary"
              size="large"
              fullWidth={false}
            >
              Begin Your Sorting Ceremony
            </Button>

            <div className="text-center mb-5 mt-5">
              <MagicalText>🪄 Experience Magic 🪄</MagicalText>
            </div>
          </div>

        </div>
      </MobileContainer>
  );
}
