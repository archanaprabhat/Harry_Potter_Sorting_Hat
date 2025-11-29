// src/app/results/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';

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
 * House Crest Component with magical animations
 */
function HouseCrest({ house }: { house: keyof typeof HOUSES }) {
  const houseInfo = getHouseInfo(house);
  const logoPath = `/images/${house}_logo.png`;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
        delay: 0.5
      }}
      className="relative flex justify-center mb-2 flex-shrink-0"
    >
      {/* Glowing background effect */}
      <motion.div
        className="absolute inset-0 rounded-full "
        style={{
          background: `radial-gradient(circle, ${houseInfo.colors[0]}40 0%, transparent 70%)`,
          filter: 'blur(20px)',
          transform: 'scale(1.5)'
        }}
        animate={{
          scale: [1.5, 1.8, 1.5],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* House logo */}
      <motion.div
        className="relative z-10"
        whileHover={{ scale: 1.10 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={logoPath}
          alt={`${houseInfo.name} crest`}
          width={320}
          height={320}
          className="drop-shadow-2xl"
        />
      </motion.div>

      {/* Floating particles around the crest */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full "
          style={{
            background: houseInfo.colors[1],
            left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 80}%`,
            top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 80}%`,
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 360]
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
}

/**
 * House Information Display
 */
function HouseInfo({ house }: { house: keyof typeof HOUSES }) {
  const houseInfo = getHouseInfo(house);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="text-center mb-6"
    >
      {/* House name with magical styling */}
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mb-2 font-serif"
        style={{
          background: `linear-gradient(135deg, ${houseInfo.colors[0]}, ${houseInfo.colors[1]})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: `0 0 20px ${houseInfo.colors[1]}40`
        }}
        animate={{
          textShadow: [
            `0 0 20px ${houseInfo.colors[1]}40`,
            `0 0 30px ${houseInfo.colors[1]}60`,
            `0 0 20px ${houseInfo.colors[1]}40`
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {houseInfo.name}
      </motion.h1>

      {/* House description */}
      <motion.p
        className="text-amber-100 text-sm sm:text-base mb-4 px-4 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        {houseInfo.description}
      </motion.p>

      {/* House traits */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        {houseInfo.traits.map((trait, index) => (
          <motion.span
            key={trait}
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: `linear-gradient(135deg, ${houseInfo.colors[0]}80, ${houseInfo.colors[1]}80)`,
              color: 'white',
              border: `1px solid ${houseInfo.colors[1]}`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
          >
            {trait}
          </motion.span>
        ))}
      </motion.div>

      {/* House details */}
      <motion.div
        className="flex justify-evenly gap-4 text-xs sm:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
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
      </motion.div>
    </motion.div>
  );
}

/**
 * Action Buttons
 */
function ActionButtons({ onShareClick, onDownloadClick, isDownloading }: { onShareClick: () => void; onDownloadClick: () => void; isDownloading: boolean }) {
  const router = useRouter();

  return (
    <motion.div
      className="flex flex-col gap-3 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.5 }}
    >
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
    </motion.div>
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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-6xl"
        >
          ⚡
        </motion.div>
      </div>
    );
  }

  // Get house colors for dynamic background
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
    <div
      className="h-full flex flex-col overflow-hidden relative"
      style={{
        background: `linear-gradient(135deg, ${primaryColor}15 0%, ${secondaryColor}20 50%, ${primaryColor}15 100%)`,
      }}
    >
      {/* Dynamic background overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${primaryColor}40 0%, transparent 50%), 
                      radial-gradient(circle at 70% 80%, ${secondaryColor}30 0%, transparent 50%)`,
        }}
      />

      {/* Background effects */}
      <StarField />

      {/* Global controls */}
      <GlobalControls />

      {/* Main content with proper spacing to avoid overlap with controls */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex flex-col py-6 pt-20 px-4">

          {/* Congratulations message with proper spacing */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-4"
          >
            <h2
              className="text-base sm:text-lg font-bold mb-0.5 font-serif flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `0 0 20px ${secondaryColor}40`
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

            {/* Bottom spacer */}
            {/* Bottom spacer */}
          </motion.div>
          <div className="h-6"></div>
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
