'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SortingHat from '@/components/sorting-hat/SortingHat';
import MobileContainer from '@/components/layout/MobileContainer';
import { AudioProvider } from '@/components/layout/AudioProvider';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAppActions } from '@/lib/store';

export default function NameEntryPage() {
  const [nameInput, setNameInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { setUserName } = useAppActions();
  const router = useRouter();

  const validateName = (name: string): string | null => {
    const trimmedName = name.trim();
    if (!trimmedName) return 'Please enter your name to continue.';
    if (trimmedName.length < 2) return 'Your name must be at least 2 characters long.';
    if (trimmedName.length > 50) return 'Your name is too long. Please use a shorter name.';
    if (!/^[a-zA-Z\s\-']+$/.test(trimmedName)) {
      return 'Please use only letters, spaces, hyphens, and apostrophes in your name.';
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
      setUserName(nameInput);
      await new Promise(resolve => setTimeout(resolve, 800));
      router.push('/quiz');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error submitting name:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
    if (error) setError('');
  };

  return (
    <AudioProvider>
      <MobileContainer>
        <div className="h-screen flex flex-col">

          {/* Back button */}
          <button
  onClick={() => router.push('/')}
  title="Time-Turner"
  className="mx-auto mt-60 ml-7 flex items-center justify-center w-12 h-12 rounded-full 
             bg-gradient-to-br from-yellow-300 to-yellow-600 border border-yellow-200
             shadow-lg hover:scale-105 transition-all"
>
  ⏳
</button>


          {/* Sorting Hat */}
          <div className="flex-none pt-10 pb-5">
            <div className="flex justify-center">
              <div className="w-[200px] h-[240px]">
                <SortingHat 
                  size="medium"
                  isAnimating={true}
                  isTalking={nameInput.length > 0}
                  showGlow={true}
                />
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div className="flex-1 flex flex-col justify-center px-6">
            
            {/* Question Text */}
            <div className="text-center mb-8">
              <h1 className="heading-secondary text-center mb-4 text-[1.6rem]">
                State your name, young Muggle
              </h1>
              <p className="body-text text-center opacity-80">
                The Sorting Hat must know who you are before the ceremony begins
              </p>
            </div>

            {/* Input Section */}
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Enter your full name..."
                value={nameInput}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                variant="parchment"
                maxLength={50}
                autoFocus={true}
                disabled={isSubmitting}
              />
              
              {error && (
                <div className="mt-3 text-center">
                  <p className="text-red-600 text-[0.9rem] font-sans"
                     style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    {error}
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <Button
                onClick={handleSubmit}
                variant="primary"
                size="large"
                fullWidth={true}
                disabled={isSubmitting || !nameInput.trim()}
              >
                {isSubmitting ? 'Preparing the Ceremony...' : 'Let the Sorting Begin'}
              </Button>
            </div>

            {/* Helper Text */}
            <div className="text-center">
              <p className="magical-text text-[0.8rem]">
                Press Enter or click the button to continue
              </p>
            </div>

          </div>
        </div>
      </MobileContainer>
    </AudioProvider>
  );
}
