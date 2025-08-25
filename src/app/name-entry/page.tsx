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
  // Local state for the input field
  const [nameInput, setNameInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Get actions from Zustand store
  const { setUserName } = useAppActions();
  
  // Next.js router for navigation
  const router = useRouter();

  // Form validation
  const validateName = (name: string): string | null => {
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      return 'Please enter your name to continue.';
    }
    
    if (trimmedName.length < 2) {
      return 'Your name must be at least 2 characters long.';
    }
    
    if (trimmedName.length > 50) {
      return 'Your name is too long. Please use a shorter name.';
    }
    
    // Check for valid characters (letters, spaces, hyphens, apostrophes)
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    if (!nameRegex.test(trimmedName)) {
      return 'Please use only letters, spaces, hyphens, and apostrophes in your name.';
    }
    
    return null;
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Clear previous errors
    setError('');
    
    // Validate the name
    const validationError = validateName(nameInput);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Show loading state
    setIsSubmitting(true);

    try {
      // Store the name in Zustand store
      setUserName(nameInput);
      
      // Add a small delay for better UX (shows the loading state)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Navigate to quiz page
      router.push('/quiz');
      
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error submitting name:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Enter key press in input field
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameInput(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  return (
    <AudioProvider>
      <MobileContainer>
        <div className="h-screen flex flex-col">
          
          {/* Top Section - Sorting Hat */}
          <div className="flex-none" style={{ paddingTop: '40px', paddingBottom: '20px' }}>
            <div className="flex justify-center">
              <div style={{ width: '200px', height: '240px' }}>
                <SortingHat 
                  size="medium"
                  isAnimating={true}
                  isTalking={nameInput.length > 0} // Hat "talks" when user is typing
                  showGlow={true}
                />
              </div>
            </div>
          </div>

          {/* Middle Section - Question and Input */}
          <div className="flex-1 flex flex-col justify-center" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
            
            {/* Question Text */}
            <div className="text-center mb-8">
              <h1 className="heading-secondary text-center mb-4" style={{ fontSize: '1.6rem' }}>
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
              
              {/* Error Message */}
              {error && (
                <div className="mt-3 text-center">
                  <p style={{ 
                    color: '#dc2626', 
                    fontSize: '0.9rem',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                    fontFamily: "'Inter', sans-serif"
                  }}>
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
              <p className="magical-text" style={{ fontSize: '0.8rem' }}>
                Press Enter or click the button to continue
              </p>
            </div>

          </div>

          {/* Bottom Section - Optional Back Button */}
          <div className="flex-none" style={{ paddingBottom: '30px', paddingLeft: '24px', paddingRight: '24px' }}>
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              size="medium"
              fullWidth={false}
              className="mx-auto"
              style={{ width: 'auto', minWidth: '120px' }}
            >
              Back to Start
            </Button>
          </div>

        </div>
      </MobileContainer>
    </AudioProvider>
  );
}