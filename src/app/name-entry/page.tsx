'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SortingHat from '@/components/sorting-hat/SortingHat';
import MobileContainer from '@/components/layout/MobileContainer';
import { AudioProvider } from '@/components/layout/AudioProvider';
import { useAudio } from '@/components/layout/AudioProvider';

// Audio Control Component
function AudioControls() {
  const { audioState, toggleBackgroundMusic } = useAudio();
  
  return (
    <div className="absolute top-4 left-4 flex flex-col gap-2 z-50">
      {/* Time Turner Button */}
      <button
        onClick={() => window.history.back()}
        title="Go Back (Time-Turner)"
        className="flex items-center justify-center w-12 h-12 rounded-full 
                   bg-gradient-to-br from-purple-300/10 to-purple-900
                   backdrop-blur-sm border border-yellow-600/20
                   shadow-lg hover:scale-105 transition-all duration-300
                   hover:from-yellow-200/30 hover:to-yellow-400/20"
      >
        <span className="text-2xl">⏳</span>
      </button>
      
      {/* Audio Toggle */}
      <button
        onClick={toggleBackgroundMusic}
        title={audioState.backgroundMusic ? "Mute Audio" : "Unmute Audio"}
        className="flex items-center justify-center w-12 h-12 rounded-full 
                   bg-gradient-to-br  from-purple-300/10 to-purple-900
                   backdrop-blur-sm border border-gray-600
                   shadow-lg hover:scale-105 transition-all duration-300
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
    <div className={`parchment-bg rounded-lg p-6 mx-4 ${className}`}>     
      {children}
    </div>
  );
}

// Wax Seal Button Component
function WaxSealButton({ onClick, disabled, isLoading }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative mx-auto block"
      title="Press the seal to begin"
    >
      <div className={`
        relative w-24 h-24 rounded-full transition-all duration-300
        ${disabled 
          ? 'bg-gradient-to-br from-red-800 to-red-900 opacity-50 cursor-not-allowed' 
          : 'bg-gradient-to-br from-red-600 to-red-800 hover:scale-105 hover:shadow-xl cursor-pointer'
        }
        border-4 border-red-900 shadow-lg
      `}>
        {/* Wax texture */}
       
        
        {/* Hogwarts crest impression */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-red-900/50 flex items-center justify-center">
            <span className="text-yellow-200 text-2xl font-bold">H</span>
          </div>
        </div>
        
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-yellow-200/30 border-t-yellow-200 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </button>
    
  );
}

// Quill Input Component
function QuillInput({ value, onChange, onKeyPress, disabled, error }) {
  return (
    <div className="relative">
      {/* Quill icon */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber-700">
          <path
            d="M20.94 2.06c-1.39-1.39-3.64-1.39-5.03 0l-.88.88 5.03 5.03.88-.88c1.39-1.39 1.39-3.64 0-5.03zM4.5 17.5l8.5-8.5 5 5L9.5 22.5H4.5v-5z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="currentColor"
            opacity="0.8"
          />
        </svg>
      </div>
      
      {/* Input field */}
      <input
        type="text"
        placeholder="Write your name with the quill..."
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
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Component
function NameEntryContent() {
  const [nameInput, setNameInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
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
      // Simulate saving name
      localStorage.setItem('sortingHatUserName', nameInput.trim());
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

      {/* Sorting Hat */}
      <div className="flex-none pt-16 pb-6">
        <div className="flex justify-center">
          <div className="w-[180px] h-[220px]">
            <SortingHat 
              size="medium"
              isAnimating={true}
              isTalking={nameInput.length > 2}
              showGlow={true}
            />
          </div>
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
          <WaxSealButton
            onClick={handleSubmit}
            disabled={isSubmitting || !nameInput.trim()}
            isLoading={isSubmitting}
          />
          <p className="text-center mt-3 text-amber-200 text-sm font-serif">
            {isSubmitting ? 'Preparing the ancient ceremony...' : 'Press the Hogwarts seal to begin'}
          </p>
        </div>

        {/* Helper Text */}
        <div className="text-center">
          <p className="text-amber-300/70 text-xs font-serif tracking-wide">
            Press Enter or the seal to continue your magical journey
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