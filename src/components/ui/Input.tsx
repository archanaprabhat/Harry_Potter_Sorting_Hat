// src/components/ui/Input.tsx
'use client';

import { forwardRef } from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
  name?: string;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  variant?: 'parchment' | 'magical' | 'simple';
}

// Using forwardRef for better form integration and focus management
const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onKeyPress,
  disabled = false,
  required = false,
  className = '',
  id,
  name,
  autoFocus = false,
  maxLength,
  minLength,
  variant = 'parchment'
}, ref) => {

  // Variant styles - different looks for different contexts
  const variantStyles = {
    // Parchment style - matches the magical theme
    parchment: {
      background: 'var(--parchment)',
      border: '3px solid var(--bronze)',
      borderRadius: '8px',
      color: 'var(--dark-wood)',
      fontSize: '1.1rem',
      fontFamily: "'Cinzel', serif",
      fontWeight: '500',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
      boxShadow: 'inset 2px 2px 4px rgba(139, 69, 19, 0.1)',
      transition: 'all 0.3s ease'
    },
    // Magical style - glowing effect
    magical: {
      background: 'rgba(244, 228, 188, 0.95)',
      border: '2px solid var(--gold)',
      borderRadius: '12px',
      color: 'var(--deep-purple)',
      fontSize: '1rem',
      fontFamily: "'Inter', sans-serif",
      boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)',
      transition: 'all 0.3s ease'
    },
    // Simple style - clean and minimal
    simple: {
      background: 'white',
      border: '2px solid #e2e8f0',
      borderRadius: '6px',
      color: '#1a202c',
      fontSize: '1rem',
      fontFamily: "'Inter', sans-serif"
    }
  };

  // Focus styles for each variant
  const focusStyles = {
    parchment: {
      borderColor: 'var(--gold)',
      boxShadow: '0 0 15px rgba(212, 175, 55, 0.4), inset 2px 2px 4px rgba(139, 69, 19, 0.1)',
      outline: 'none'
    },
    magical: {
      borderColor: 'var(--bronze)',
      boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)',
      outline: 'none'
    },
    simple: {
      borderColor: '#3182ce',
      boxShadow: '0 0 0 3px rgba(49, 130, 206, 0.1)',
      outline: 'none'
    }
  };

  return (
    <div className="relative w-full">
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        disabled={disabled}
        required={required}
        id={id}
        name={name}
        autoFocus={autoFocus}
        maxLength={maxLength}
        minLength={minLength}
        className={`magical-input-${variant} ${className}`}
        style={{
          ...variantStyles[variant],
          padding: '12px 16px',
          width: '100%',
          outline: 'none',
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          // Add focus styles via CSS-in-JS since we can't use Tailwind focus: easily
        }}
        onFocus={(e) => {
          Object.assign(e.target.style, focusStyles[variant]);
        }}
        onBlur={(e) => {
          Object.assign(e.target.style, variantStyles[variant]);
          e.target.style.padding = '12px 16px';
          e.target.style.width = '100%';
          e.target.style.outline = 'none';
        }}
      />
      
      {/* Optional: Add magical sparkles effect on focus for parchment variant */}
      {variant === 'parchment' && (
        <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-2 right-2 w-1 h-1 bg-yellow-400 rounded-full animate-pulse" />
          <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-pulse delay-200" />
        </div>
      )}
    </div>
  );
});

// Display name for debugging
Input.displayName = 'Input';

export default Input;