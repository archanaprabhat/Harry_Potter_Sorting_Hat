// src/components/layout/GlobalControls.tsx
"use client";

import { useAudio } from "@/components/layout/AudioProvider";

/**
 * GlobalControls
 *
 * - Appears in every main page (Name Entry, Quiz, Results, etc.)
 * - Provides:
 *   1. Time-Turner (back button → uses browser history)
 *   2. Background Music Toggle (Sonorus / Silencio)
 *
 * Top-left floating buttons.
 */
export default function GlobalControls() {
  const { audioState, toggleBackgroundMusic } = useAudio();

  return (
    <div className="absolute top-4 left-4 flex flex-col gap-2 z-50">
      {/* Time-Turner: go back one page */}
      <button
        onClick={() => window.history.back()}
        title="Time-Turner"
        className="flex items-center justify-center w-12 h-12 rounded-full 
                   bg-gradient-to-br from-purple-300/10 to-purple-900 border border-yellow-600/20
                   hover:scale-105 transition-all duration-300
                   hover:from-yellow-200/30 hover:to-yellow-400/20"
      >
        <span className="text-2xl">⏳</span>
      </button>

      {/* Background music toggle */}
      <button
        onClick={toggleBackgroundMusic}
        title={audioState.backgroundMusic ? "🪄 Silencio (mute)" : "🔮 Sonorus (play)"}
        className="flex items-center justify-center w-12 h-12 rounded-full 
                   bg-gradient-to-br from-purple-300/10 to-purple-900 border border-gray-600
                   hover:scale-105 transition-all duration-300
                   hover:from-gray-500 hover:to-gray-500/20"
      >
        <span className="text-xl">
          {audioState.backgroundMusic ? "🔇" : "🔊"}
        </span>
      </button>
    </div>
  );
}
