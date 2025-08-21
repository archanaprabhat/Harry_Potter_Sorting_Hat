'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AudioState } from '@/types';

interface AudioContextType {
  audioState: AudioState;
  toggleBackgroundMusic: () => void;
  toggleSoundEffects: () => void;
  toggleHatVoice: () => void;
  playSound: (soundType: 'click' | 'magic' | 'scroll' | 'whoosh') => void;
  isLoading: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const [audioState, setAudioState] = useState<AudioState>({
    backgroundMusic: true,
    soundEffects: true,
    hatVoice: true
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [audioElements, setAudioElements] = useState<{
    backgroundMusic?: HTMLAudioElement;
    sounds: { [key: string]: HTMLAudioElement };
  }>({ sounds: {} });

  // Initialize audio elements
  useEffect(() => {
    const initAudio = async () => {
      try {
        // Background music
        const bgMusic = new Audio('/audio/hogwarts-theme.mp3');
        bgMusic.loop = true;
        bgMusic.volume = 0.3;

        // Sound effects
        const sounds = {
          click: new Audio('/audio/sounds/magical-click.mp3'),
          magic: new Audio('/audio/sounds/spell-cast.mp3'),
          scroll: new Audio('/audio/sounds/parchment.mp3'),
          whoosh: new Audio('/audio/sounds/whoosh.mp3')
        };

        // Set volumes
        Object.values(sounds).forEach(sound => {
          sound.volume = 0.5;
        });

        setAudioElements({ backgroundMusic: bgMusic, sounds });
        
        // Load saved preferences
        const saved = localStorage.getItem('audioSettings');
        if (saved) {
          setAudioState(JSON.parse(saved));
        }
        
        setIsLoading(false);
      } catch (error) {
        console.warn('Audio initialization failed:', error);
        setIsLoading(false);
      }
    };

    initAudio();
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('audioSettings', JSON.stringify(audioState));
  }, [audioState]);

  // Handle background music
  useEffect(() => {
    if (audioElements.backgroundMusic) {
      if (audioState.backgroundMusic) {
        audioElements.backgroundMusic.play().catch(() => {
          // Auto-play might be blocked
          console.warn('Background music auto-play blocked');
        });
      } else {
        audioElements.backgroundMusic.pause();
      }
    }
  }, [audioState.backgroundMusic, audioElements.backgroundMusic]);

  const toggleBackgroundMusic = () => {
    setAudioState(prev => ({ ...prev, backgroundMusic: !prev.backgroundMusic }));
  };

  const toggleSoundEffects = () => {
    setAudioState(prev => ({ ...prev, soundEffects: !prev.soundEffects }));
  };

  const toggleHatVoice = () => {
    setAudioState(prev => ({ ...prev, hatVoice: !prev.hatVoice }));
  };

  const playSound = (soundType: 'click' | 'magic' | 'scroll' | 'whoosh') => {
    if (audioState.soundEffects && audioElements.sounds[soundType]) {
      const sound = audioElements.sounds[soundType];
      sound.currentTime = 0;
      sound.play().catch(() => {
        console.warn(`Failed to play ${soundType} sound`);
      });
    }
  };

  const value: AudioContextType = {
    audioState,
    toggleBackgroundMusic,
    toggleSoundEffects,
    toggleHatVoice,
    playSound,
    isLoading
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}