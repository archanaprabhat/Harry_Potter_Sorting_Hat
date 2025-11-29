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

  return (
    <div className="relative flex justify-center mb-4">
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
      {/* House name */}
      <h1
        className="text-3xl sm:text-4xl font-bold mb-2 font-serif"
        style={{
          background: `linear-gradient(135deg, ${houseInfo.colors[0]}, ${houseInfo.colors[1]})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        {houseInfo.name}
      </h1>

      {/* House description */}
      <p className="text-amber-100 text-sm sm:text-base mb-4 px-4 leading-relaxed">
        {houseInfo.description}
      </p>

      {/* House traits */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {houseInfo.traits.map((trait) => (
          <span
            key={trait}
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: `linear-gradient(135deg, ${houseInfo.colors[0]}80, ${houseInfo.colors[1]}80)`,
              color: 'white',
              border: `1px solid ${houseInfo.colors[1]}`
            }}
          >
            {trait}
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
