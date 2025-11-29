// src/app/name-entry/page.tsx
"use client";

import { useState, KeyboardEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Components
import SortingHat from "@/components/sorting-hat/SortingHat";
import MobileContainer from "@/components/layout/MobileContainer";
import StarField from "@/components/effects/StarField";
import GlobalControls from "@/components/layout/GlobalControls";

// Zustand store hooks
import { useSetUserName } from "@/lib/store";

/* -------------------------------------------------------------------------- */
/*                              Helper Components                             */
/* -------------------------------------------------------------------------- */

/**
 * ParchmentContainer
 * - Decorative parchment-styled wrapper for text content.
 */
function ParchmentContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`parchment-bg rounded-e-full p-6 mx-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * QuillInput
 * - Input field with a quill icon (left) and a sparkle (right).
 * - Handles error highlighting and disabled state.
 */
function QuillInput({
  value,
  onChange,
  onKeyPress,
  disabled,
  error,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  disabled: boolean;
  error: string;
}) {
  return (
    <div className='relative'>
      {/* Quill icon */}
      <div className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10'>
        🪶
      </div>

      {/* Input field */}
      <input
        type='text'
        placeholder='Etch your name with magic ink'
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
            ? "border-red-500 shadow-red-200"
            : "border-amber-400 focus:border-amber-600 focus:shadow-amber-200"
          }
          focus:shadow-lg focus:outline-none
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        maxLength={50}
        autoFocus
      />

      {/* Magical sparkles */}
      <div className='absolute right-4 top-1/2 transform -translate-y-1/2'>
        𓅓
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Main Content                                 */
/* -------------------------------------------------------------------------- */

function NameEntryContent() {
  const [nameInput, setNameInput] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");


  const setUserName = useSetUserName(); // Action to update Zustand state

  const router = useRouter();

  /**
   * Validates a name string and returns an error message if invalid.
   */
  const validateName = (name: string): string | null => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return "The quill awaits your name, young witch or wizard.";
    }
    if (trimmedName.length < 2) {
      return "A name must be at least 2 characters, even in the wizarding world.";
    }
    if (trimmedName.length > 50) {
      return "Even Albus Percival Wulfric Brian Dumbledore would find this name too long.";
    }
    if (!/^[a-zA-Z\s\-']+$/.test(trimmedName)) {
      return "Only letters fit for a wizard's name, please.";
    }

    return null;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    setError("");
    const validationError = validateName(nameInput);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      // Store in Zustand (persists to localStorage automatically)
      setUserName(nameInput.trim());

      // Fake a loading delay for ✨ dramatic effect ✨
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Navigate to quiz page
      router.push("/quiz");
    } catch (err) {
      setError("The magic seems to have failed. Please try again.");
      console.error("Error submitting name:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle Enter key submission
   */
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isSubmitting && nameInput.trim()) {
      handleSubmit();
    }
  };

  /**
   * Handle input change + clear errors on typing
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
    if (error) setError("");
  };

  return (
    <div className='no-scroll flex flex-col h-full'>
      {/* Global controls (back + audio toggle) */}
      <GlobalControls />

      {/* Sorting Hat animation */}
      <div className='shrink-0 xl:pb-10 pb-6'>
        <div className='flex justify-center'>
          <SortingHat size='medium' isAnimating={true} showGlow={true} />
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col px-4 pb-6 min-h-0 overflow-y-auto'>

        {/* Center Group: Parchment + Input */}
        <div className="flex-1 flex flex-col justify-center w-full max-w-lg mx-auto">
          {/* Question prompt on parchment */}
          <ParchmentContainer className='mb-8'>
            <div className='text-center'>
              <h1 className='font-serif text-2xl font-bold text-amber-900 mb-3'>
                State your name, young Muggle
              </h1>
            </div>
          </ParchmentContainer>

          {/* Input Section */}
          <div className='mb-4'>
            <QuillInput
              value={nameInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={isSubmitting}
              error={error}
            />

            {/* Validation error message */}
            {error && (
              <div className='mt-4 text-center'>
                <div className='inline-block bg-red-100 border border-red-400 rounded-lg px-4 py-2'>
                  <p className='text-red-700 text-sm font-serif'>{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hogwarts seal button */}
        <div className='mt-auto shrink-0 mb-4'>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !nameInput.trim()}
            className='relative mx-auto block'
            title='Cast the seal to begin'>
            <Image
              src='/images/hogwarts_logo.png'
              alt='Hogwarts Seal'
              width={96}
              height={96}
              className={`
                transition-all duration-300
                ${isSubmitting || !nameInput.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 cursor-pointer"
                }
              `}
            />
          </button>

          <p className='text-center mt-3 text-amber-200 text-sm font-serif p-2'>
            {isSubmitting
              ? "Storing your name in the Book of Admittance..."
              : "Press the Hogwarts seal to begin"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Page                                     */
/* -------------------------------------------------------------------------- */

export default function NameEntryPage() {
  return (
    <>
      <StarField />
      <MobileContainer>
        <NameEntryContent />
      </MobileContainer>
    </>
  );
}
