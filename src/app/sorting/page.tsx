"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Components
import SortingHat from "@/components/sorting-hat/SortingHat";
import MobileContainer from "@/components/layout/MobileContainer";
import StarField from "@/components/effects/StarField";
import GlobalControls from "@/components/layout/GlobalControls";
import { useAudio } from "@/components/layout/AudioProvider";

export default function SortingPage() {
    const router = useRouter();
    const { audioState } = useAudio();
    const [showHat, setShowHat] = useState(false);

    useEffect(() => {
        // Prefetch results page
        router.prefetch('/results');

        // Small delay before showing hat for dramatic effect - Removed for speed
        setShowHat(true);
        // const timer = setTimeout(() => setShowHat(true), 100);
        // return () => clearTimeout(timer);
    }, [router]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const playThinkingAudio = async () => {
            // Always play the thinking sound regardless of background music setting
            const audio = new Audio('/audio/sorting_hat_thinking.mp3');

            audio.onended = () => {
                router.push('/results');
            };

            audio.onerror = () => {
                console.error("Error playing thinking audio");
                // Fallback if audio fails
                timeoutId = setTimeout(() => {
                    router.push('/results');
                }, 4000);
            };

            try {
                await audio.play();
            } catch (err) {
                console.error("Audio play failed:", err);
                // Fallback if autoplay is blocked
                timeoutId = setTimeout(() => {
                    router.push('/results');
                }, 4000);
            }
        };

        if (showHat) {
            playThinkingAudio();
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [showHat, router]);

    return (
        <MobileContainer>
            <div className="h-screen flex flex-col relative overflow-hidden">
                <StarField />
                <GlobalControls />

                <div className="flex-1 flex flex-col items-center justify-center z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: showHat ? 1 : 0,
                            scale: showHat ? [0, 2.5, 1] : 0
                        }}
                        transition={{
                            duration: 2.5,
                            times: [0, 0.6, 1],
                            ease: "easeInOut"
                        }}
                        className="flex flex-col items-center"
                    >
                        <SortingHat size="large" isAnimating={true} showGlow={true} />

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="mt-8 text-amber-200 text-xl font-serif text-center px-6 animate-pulse"
                        >
                            Hmm... difficult. Very difficult...
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </MobileContainer>
    );
}
