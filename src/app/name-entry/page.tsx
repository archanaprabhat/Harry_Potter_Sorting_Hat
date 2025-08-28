'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SortingHat from '@/components/sorting-hat/SortingHat';
import MobileContainer from '@/components/layout/MobileContainer';
import { AudioProvider } from '@/components/layout/AudioProvider';
import { useAudio } from '@/components/layout/AudioProvider';
import { useSetUserName, useUserName } from '@/lib/store'; // Import Zustand hooks
import Image from 'next/image';

// Audio Control Component
function AudioControls() {
  const { audioState, toggleBackgroundMusic } = useAudio();
  
  return (
    <div className="absolute top-4 left-4 flex flex-col gap-2 z-50">
      {/* Time Turner Button */}
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
      
      {/* Audio Toggle */}
      <button
        onClick={toggleBackgroundMusic}
        title={audioState.backgroundMusic ? "🪄 Silencio" : "🔮 Sonorus"}
        className="flex items-center justify-center w-12 h-12 rounded-full 
                   bg-gradient-to-br  from-purple-300/10 to-purple-900
                    border border-gray-600
                   hover:scale-105 transition-all duration-300
                   hover:from-gray-500 hover:to-gray-500/20"
      >
        <span className="text-xl">
          {audioState.backgroundMusic ? '🔊' : '🔇'}
        </span>
      </button>
    </div>
  );
}

// Parchment Container Component
function ParchmentContainer({ children, className = "" }) {
  return (
    <div className={`parchment-bg rounded-e-full p-6 mx-4 ${className}`}>     
      {children}
    </div>
  );
}

// Quill Input Component
function QuillInput({ value, onChange, onKeyPress, disabled, error }) {
  return (
    <div className="relative">
      {/* Quill icon */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
      🪶 
      </div>
      
      {/* Input field */}
      <input
        type="text"
        placeholder="Etch your name with magic ink"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        disabled={disabled}
        className={`
          w-full pl-12 pr-4 py-4 rounded-lg
          bg-gradient-to-r from-amber-50 to-amber-100
          border-2 transition-all duration-300
          font-serif text-lg text-amber-900
          placeholder-amber-600/70
          ${error 
            ? 'border-red-500 shadow-red-200' 
            : 'border-amber-400 focus:border-amber-600 focus:shadow-amber-200'
          }
          focus:shadow-lg focus:outline-none
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        maxLength={50}
        autoFocus
      />
      
      {/* Magical sparkles */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
      𓅓
      </div>
    </div>
  );
}

// Main Component
function NameEntryContent() {
  const [nameInput, setNameInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // ZUSTAND state and actions (persistent, shared across components)
  const storedUserName = useUserName(); // Get the current stored name
  const setUserName = useSetUserName(); // Get the action to update the name
  
  const router = useRouter();

  const validateName = (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) return 'The quill awaits your name, young witch or wizard.';
    if (trimmedName.length < 2) return 'A name must be at least 2 characters, even in the wizarding world.';
    if (trimmedName.length > 50) return 'Even Albus Percival Wulfric Brian Dumbledore would find this name too long.';
    if (!/^[a-zA-Z\s\-']+$/.test(trimmedName)) {
      return 'Only letters fit for a wizard\'s name, please.';
    }
    return null;
  };

  const handleSubmit = async () => {
    setError('');
    const validationError = validateName(nameInput);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // STORE IN ZUSTAND (this will automatically persist to localStorage)
      setUserName(nameInput.trim());
      
      // Simulate some processing time
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      router.push('/quiz');
    } catch (err) {
      setError('The magic seems to have failed. Please try again.');
      console.error('Error submitting name:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isSubmitting && nameInput.trim()) {
      handleSubmit();
    }
  };

  const handleInputChange = (e) => {
    setNameInput(e.target.value);
    if (error) setError('');
  };
  return (
    <div className="no-scroll flex flex-col">
      {/* Audio Controls */}
      <AudioControls />

      {/* Display stored name if exists */}
      {storedUserName && (
        <div className="absolute top-4 right-4 bg-green-100 border border-green-400 rounded px-3 py-1 z-40">
          <p className="text-green-800 text-sm">
            Welcome back, {storedUserName}!
          </p>
        </div>
      )}

      {/* Sorting Hat */}
      <div className=" pb-16">
        <div className="flex justify-center ">
          <SortingHat 
            size="medium"
            isAnimating={true}
            showGlow={true}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-4 pb-8">
        
        {/* Parchment with question */}
        <ParchmentContainer className="mb-8">
          <div className="text-center">
            <h1 className="font-serif text-2xl font-bold text-amber-900 mb-3">
              State your name, young Muggle
            </h1>
          </div>
        </ParchmentContainer>

        {/* Input Section */}
        <div className="mb-8">
          <QuillInput
            value={nameInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={isSubmitting}
            error={error}
          />
          
          {error && (
            <div className="mt-4 text-center">
              <div className="inline-block bg-red-100 border border-red-400 rounded-lg px-4 py-2">
                <p className="text-red-700 text-sm font-serif">
                  {error}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Wax Seal Button */}
        <div className="mb-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !nameInput.trim()}
            className="relative mx-auto block"
            title="Cast the seal to begin"
          >
            <Image
              src="/images/hogwarts_logo.png"
              alt="Hogwarts Seal"
              width={96}
              height={96}
              className={`
                transition-all duration-300
                ${isSubmitting || !nameInput.trim() 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-105 cursor-pointer'
                }
              `}
            />
            </button>
          <p className="text-center mt-3 text-amber-200 text-sm font-serif">
            {isSubmitting ? 'Storing your name in the Book of Admittance...' : 'Press the Hogwarts seal to begin'}
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default function NameEntryPage() {
  return (
    <AudioProvider>
      <MobileContainer>
        <NameEntryContent />
      </MobileContainer>
    </AudioProvider>
  );
}