// src/components/layout/AudioProvider.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// ---- Types ----

/**
 * Shape of the audio state stored in React + localStorage.
 * Currently only backgroundMusic is used, but easily extendable.
 */
interface AudioState {
  backgroundMusic: boolean;
}

/**
 * What the AudioContext provides to the rest of the app.
 */
interface AudioContextType {
  audioState: AudioState;
  toggleBackgroundMusic: () => void;
}

// ---- Context ----
const AudioContext = createContext<AudioContextType | undefined>(undefined);

// ---- Provider ----
export function AudioProvider({ children }: { children: ReactNode }) {
  const [audioState, setAudioState] = useState<AudioState>({
    backgroundMusic: false, // Default → muted (better UX, avoids autoplay issues)
  });

  const [audioElements, setAudioElements] = useState<{
    backgroundMusic?: HTMLAudioElement;
  }>({});

  // Initialize audio element (runs once)
  // Inside useEffect that initializes audio
  useEffect(() => {
    const bg = new Audio("/audio/hogwarts-theme.mp3");
    bg.loop = true;
    bg.preload = "auto";
  
    setAudioElements({ backgroundMusic: bg });
  
    const saved = localStorage.getItem("audio-settings");
    if (saved) {
      const parsed = JSON.parse(saved) as AudioState;
  
      // ⚡ Force music OFF at first mount (refresh/autoplay block)
      setAudioState({
        ...parsed,
        backgroundMusic: false,
      });
  
      // Always reset storage too, so UI matches
      localStorage.setItem(
        "audio-settings",
        JSON.stringify({ ...parsed, backgroundMusic: false })
      );
    }
  }, []);
  


  // Persist audio state → localStorage
  useEffect(() => {
    localStorage.setItem("audio-settings", JSON.stringify(audioState));
  }, [audioState]);

  // Sync state → actual audio element
  useEffect(() => {
    if (!audioElements.backgroundMusic) return;

    if (audioState.backgroundMusic) {
      audioElements.backgroundMusic.play().catch((err) => {
        console.warn("Background music autoplay blocked:", err);
      });
    } else {
      audioElements.backgroundMusic.pause();
    }
  }, [audioState, audioElements]);

  // ---- Actions ----
  const toggleBackgroundMusic = () => {
    setAudioState((prev) => ({
      ...prev,
      backgroundMusic: !prev.backgroundMusic,
    }));
  };

  // ---- Expose ----
  return (
    <AudioContext.Provider value={{ audioState, toggleBackgroundMusic }}>
      {children}
    </AudioContext.Provider>
  );
}

// ---- Hook ----
export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
