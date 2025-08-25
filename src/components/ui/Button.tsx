// src/components/ui/Button.tsx
'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  className = '',
  type = 'button'
}: ButtonProps) {
  
  // Base styles that all buttons share
  const baseStyles = `
    font-family: 'Cinzel', serif;
    font-weight: 600;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  `;

  // Variant-specific styles
  const variantStyles = {
    primary: `
      background: linear-gradient(135deg, var(--gold) 0%, #D4AF37 50%, var(--bronze) 100%);
      border: 2px solid var(--gold);
      color: var(--deep-purple);
      box-shadow: 
        0 4px 15px rgba(212, 175, 55, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    `,
    secondary: `
      background: linear-gradient(135deg, var(--bronze) 0%, #8B4513 100%);
      border: 2px solid var(--bronze);
      color: var(--parchment);
    `,
    outline: `
      background: transparent;
      border: 2px solid var(--gold);
      color: var(--gold);
    `
  };

  // Size-specific styles
  const sizeStyles = {
    small: 'padding: 8px 16px; font-size: 0.85rem; min-height: 40px;',
    medium: 'padding: 12px 24px; font-size: 0.95rem; min-height: 48px;',
    large: 'padding: 16px 32px; font-size: 1rem; min-height: 56px;'
  };

  // Width styles
  const widthStyles = fullWidth ? 'width: 100%;' : '';

  // Disabled styles
  const disabledStyles = disabled ? `
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  ` : '';

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`magical-button-reusable ${className}`}
      style={{
        ...Object.fromEntries(
          (baseStyles + variantStyles[variant] + sizeStyles[size] + widthStyles + disabledStyles)
            .split(';')
            .filter(rule => rule.trim())
            .map(rule => {
              const [property, value] = rule.split(':').map(s => s.trim());
              return [
                property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
                value
              ];
            })
        )
      }}
    >
      {/* Shimmer effect */}
      <div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 hover:translate-x-full"
        style={{ 
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)' 
        }}
      />
      
      {/* Button content */}
      <span className="relative z-10">
        {children}
      </span>
    </button>
  );
}