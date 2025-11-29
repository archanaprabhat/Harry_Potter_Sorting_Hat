// src/app/results/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toPng } from 'html-to-image';

// Components
import MobileContainer from "@/components/layout/MobileContainer";
import GlobalControls from "@/components/layout/GlobalControls";
import StarField from "@/components/effects/StarField";
import Button from "@/components/ui/Button";
import ShareModal from "@/components/ShareModal";
import ShareCard from "@/components/results/ShareCard";

// Store & Data
import { useUserName, useSortedHouse } from "@/lib/store";
import { getHouseInfo } from "@/lib/sorting-logic";
import { HOUSES } from "@/lib/quiz-data";

/**
 * House Crest Component
 */
function HouseCrest({ house }: { house: keyof typeof HOUSES }) {
  const houseInfo = getHouseInfo(house);
  const logoPath = `/images/${house}_logo.png`;
  const primaryColor = houseInfo.colors[0];

  // Convert hex to rgba for glow effect
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className="relative flex justify-center mb-4">
      {/* Luminous glow background */}
      <div
        className="absolute inset-0 -m-16 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, 
            ${hexToRgba(primaryColor, 0.4)} 0%, 
            ${hexToRgba(primaryColor, 0.2)} 40%, 
            ${hexToRgba(primaryColor, 0.05)} 70%, 
            transparent 100%)`,
          filter: 'blur(30px)',
          transform: 'scale(1.2)'
        }}
      />

      {/* Secondary pulsing glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, 
            ${hexToRgba(primaryColor, 0.3)} 0%, 
            transparent 60%)`,
          filter: 'blur(20px)',
          animation: 'pulse 2s ease-in-out infinite'
        }}
      />

      <div className="relative z-10">
        <Image
          src={logoPath}
          alt={`${houseInfo.name} crest`}
          width={320}
          height={320}
          className="drop-shadow-2xl"
        />
      </div>
    </div>
  );
}

/**
 * House Information Display
 */
function HouseInfo({ house }: { house: keyof typeof HOUSES }) {
  const houseInfo = getHouseInfo(house);

  return (
    <div className="text-center mb-6">
      {/* House name with shimmer effect */}
      <h1
        className="text-3xl sm:text-4xl font-bold mb-2 font-serif relative inline-block"
        style={{
          background: `linear-gradient(135deg, ${houseInfo.colors[0]}, ${houseInfo.colors[1]})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '200% 200%',
          animation: 'shimmer 3s ease-in-out infinite'
        }}
      >
        <style jsx>{`
          @keyframes shimmer {
            0%, 100% {
              background-position: 0% 50%;
              filter: brightness(1) drop-shadow(0 0 8px ${houseInfo.colors[1]}40);
            }
            50% {
              background-position: 100% 50%;
              filter: brightness(1.3) drop-shadow(0 0 12px ${houseInfo.colors[1]}60);
            }
          }
          @keyframes sparkle {
            0%, 100% {
              transform: scale(1);
              filter: brightness(1);
            }
            50% {
              transform: scale(1.05);
              filter: brightness(1.2) drop-shadow(0 0 6px ${houseInfo.colors[1]}80);
            }
          }
        `}</style>
        {houseInfo.name}
      </h1>

      {/* House description */}
      <p className="text-amber-100 text-sm sm:text-base mb-4 px-4 leading-relaxed">
        {houseInfo.description}
      </p>

      {/* House traits with sparkle effect */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {houseInfo.traits.map((trait, index) => (
          <span
            key={trait}
            className="px-3 py-1 rounded-full text-xs font-medium relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${houseInfo.colors[0]}80, ${houseInfo.colors[1]}80)`,
              color: 'white',
              border: `1px solid ${houseInfo.colors[1]}`,
              animation: `sparkle 2s ease-in-out infinite ${index * 0.2}s`,
              boxShadow: `0 0 10px ${houseInfo.colors[1]}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
            }}
          >
            {/* Shiny overlay effect */}
            <span
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
                animation: 'shine 3s ease-in-out infinite',
                animationDelay: `${index * 0.3}s`
              }}
            />
            <style jsx>{`
              @keyframes shine {
                0% {
                  background-position: -100% 0;
                }
                100% {
                  background-position: 200% 0;
                }
              }
            `}</style>
            <span className="relative z-10">{trait}</span>
          </span>
        ))}
      </div>

      {/* House details */}
      <div className="flex justify-evenly gap-4 text-xs sm:text-sm">
        <div className="text-center">
          <p className="text-amber-300 font-semibold">Founder</p>
          <p className="text-amber-100">{houseInfo.founder}</p>
        </div>
        <div className="text-center">
          <p className="text-amber-300 font-semibold">Element</p>
          <p className="text-amber-100">{houseInfo.element}</p>
        </div>
        <div className="text-center">
          <p className="text-amber-300 font-semibold">Animal</p>
          <p className="text-amber-100">{houseInfo.animal}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Action Buttons
 */
function ActionButtons({ onShareClick, onDownloadClick, isDownloading }: {
  onShareClick: () => void;
  onDownloadClick: () => void;
  isDownloading: boolean
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 px-4">
      <Button
        onClick={onShareClick}
        variant="primary"
        size="large"
        fullWidth
      >
        🪄 Share your results
      </Button>

      <Button
        onClick={onDownloadClick}
        variant="secondary"
        size="large"
        fullWidth
        disabled={isDownloading}
      >
        {isDownloading ? '⏳ Creating Scroll...' : '📜 Download Result'}
      </Button>

      <Button
        onClick={() => router.push('/')}
        variant="outline"
        size="medium"
        fullWidth
      >
        🏰 Back to Hogwarts
      </Button>
    </div>
  );
}

/**
 * Main Results Content
 */
function ResultsContent() {
  const router = useRouter();
  const userName = useUserName();
  const sortedHouse = useSortedHouse();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  // Redirect if no results
  useEffect(() => {
    if (!sortedHouse) {
      router.push('/name-entry');
    } else {
      // Play house-specific audio
      const audio = new Audio(`/audio/${sortedHouse}.mp3`);
      audio.play().catch(err => console.error("Error playing house audio:", err));
    }
  }, [sortedHouse, router]);

  // Show loading if no house yet
  if (!sortedHouse) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-6xl">⚡</div>
      </div>
    );
  }

  // Get house colors
  const houseInfo = getHouseInfo(sortedHouse);
  const primaryColor = houseInfo.colors[0];
  const secondaryColor = houseInfo.colors[1];

  // Share data
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `I'm a ${houseInfo.name}!`;
  const shareDescription = `I just got sorted into ${houseInfo.name}! 🏰✨ The Sorting Hat has spoken!`;
  const shareHashtags = ['HarryPotter', 'SortingHat', houseInfo.name];

  const handleDownload = async () => {
    if (shareCardRef.current === null) {
      return;
    }

    setIsDownloading(true);

    try {
      const dataUrl = await toPng(shareCardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `hogwarts-result-${sortedHouse}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Background effects */}
      <StarField />

      {/* Global controls */}
      <div className="relative z-20">
        <GlobalControls />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10">
        <div className="min-h-full flex flex-col py-6 pt-20 px-4">
          <div className="text-center mb-4">
            <h2
              className="text-xl sm:text-2xl font-bold mb-2 font-serif"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Congratulations, {userName}!
            </h2>

            {/* House crest */}
            <HouseCrest house={sortedHouse} />

            {/* House information */}
            <HouseInfo house={sortedHouse} />

            {/* Action buttons */}
            <ActionButtons
              onShareClick={() => setIsShareModalOpen(true)}
              onDownloadClick={handleDownload}
              isDownloading={isDownloading}
            />
          </div>
          <div className="h-6"></div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareUrl={shareUrl}
        title={shareTitle}
        description={shareDescription}
        hashtags={shareHashtags}
      />

      {/* Hidden ShareCard for image generation */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0, opacity: 0, pointerEvents: 'none' }}>
        <div ref={shareCardRef}>
          <ShareCard house={sortedHouse} userName={userName} />
        </div>
      </div>
    </div>
  );
}

/**
 * Main Results Page Component
 */
export default function ResultsPage() {
  return (
    <MobileContainer>
      <div className="h-screen flex flex-col">
        <ResultsContent />
      </div>
    </MobileContainer>
  );
}
