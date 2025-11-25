import React from 'react';

interface ParchmentScrollProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const ParchmentScroll: React.FC<ParchmentScrollProps> = ({
  subtitle = "",
  className = ""
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Main parchment container */}
      <div
        className="relative text-center mx-auto"
        style={{
          padding: 'clamp(0.75rem, 2vh, 2rem) clamp(1rem, 3vw, 3rem)',
          minWidth: 'clamp(150px, 40vw, 300px)',
          maxHeight: '100%',
          background: 'linear-gradient(135deg, #f4e4bc 0%, #f9f1d4 20%, #fdf6e3 40%, #f9f1d4 60%, #f4e4bc 80%, #ede0c8 100%)',
          borderRadius: '12px',
          boxShadow: `
            inset 0 2px 4px rgba(0,0,0,0.05),
            inset 0 -2px 4px rgba(0,0,0,0.05),
            0 4px 12px rgba(0,0,0,0.2),
            0 2px 4px rgba(0,0,0,0.1)
          `,
          position: 'relative',
          clipPath: `polygon(
            2% 0%, 98% 0%, 100% 3%, 99% 8%, 100% 15%, 98% 20%, 100% 30%, 99% 40%, 
            100% 50%, 99% 60%, 100% 70%, 98% 80%, 100% 85%, 99% 92%, 100% 97%, 
            98% 100%, 2% 100%, 0% 97%, 1% 92%, 0% 85%, 2% 80%, 0% 70%, 1% 60%, 
            0% 50%, 1% 40%, 0% 30%, 2% 20%, 0% 15%, 1% 8%, 0% 3%
          )`
        }}
      >
        {/* Enhanced aged paper texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            background: `
              radial-gradient(circle at 15% 25%, rgba(160, 82, 45, 0.08) 0%, transparent 40%),
              radial-gradient(circle at 85% 70%, rgba(139, 69, 19, 0.06) 0%, transparent 35%),
              radial-gradient(circle at 30% 85%, rgba(160, 82, 45, 0.05) 0%, transparent 30%),
              radial-gradient(circle at 70% 15%, rgba(139, 69, 19, 0.04) 0%, transparent 25%),
              radial-gradient(circle at 50% 50%, rgba(205, 133, 63, 0.03) 0%, transparent 60%),
              linear-gradient(45deg, transparent 0%, rgba(160, 82, 45, 0.02) 50%, transparent 100%)
            `,
            borderRadius: '12px'
          }}
        />

        {/* Old stains and water marks */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, rgba(139, 69, 19, 0.1) 0%, transparent 25%),
              radial-gradient(ellipse at 80% 20%, rgba(160, 82, 45, 0.08) 0%, transparent 20%),
              radial-gradient(ellipse at 70% 80%, rgba(139, 69, 19, 0.06) 0%, transparent 30%),
              radial-gradient(ellipse at 25% 70%, rgba(160, 82, 45, 0.05) 0%, transparent 15%)
            `,
            borderRadius: '12px'
          }}
        />

        {/* Text content - responsive to content length */}
        <div className="relative z-10">
          <p
            className="leading-relaxed max-w-prose"
            style={{
              fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
              color: '#4a4a4a',
              textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.06)',
              fontFamily: 'serif',
              fontStyle: 'italic',
              lineHeight: '1.6',
              wordWrap: 'break-word',
              hyphens: 'auto'
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* Left scroll rod - lighter wood */}
      <div
        className="absolute left-0 top-0 bottom-0 w-5 rounded-full"
        style={{
          background: 'linear-gradient(90deg, #CD853F 0%, #DEB887 25%, #F5DEB3 50%, #DEB887 75%, #CD853F 100%)',
          boxShadow: `
            -2px 0 4px rgba(0,0,0,0.2),
            inset 1px 0 1px rgba(255,255,255,0.3),
            inset -1px 0 1px rgba(0,0,0,0.1)
          `,
          transform: 'translateX(-50%)'
        }}
      >
        {/* Lighter wood grain lines */}
        <div className="absolute inset-0 rounded-full opacity-15">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full border-t border-amber-800/20"
              style={{ top: `${16.67 * (i + 1)}%` }}
            />
          ))}
        </div>
      </div>

      {/* Right scroll rod - lighter wood */}
      <div
        className="absolute right-0 top-0 bottom-0 w-5 rounded-full"
        style={{
          background: 'linear-gradient(90deg, #CD853F 0%, #DEB887 25%, #F5DEB3 50%, #DEB887 75%, #CD853F 100%)',
          boxShadow: `
            2px 0 4px rgba(0,0,0,0.2),
            inset 1px 0 1px rgba(255,255,255,0.3),
            inset -1px 0 1px rgba(0,0,0,0.1)
          `,
          transform: 'translateX(50%)'
        }}
      >
        {/* Lighter wood grain lines */}
        <div className="absolute inset-0 rounded-full opacity-15">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full border-t border-amber-800/20"
              style={{ top: `${16.67 * (i + 1)}%` }}
            />
          ))}
        </div>
      </div>

      {/* Top decorative rings - lighter */}
      <div className="absolute -top-2 left-0 w-5 h-3 transform -translate-x-1/2">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'linear-gradient(180deg, #B8860B 0%, #DAA520 50%, #B8860B 100%)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
          }}
        />
      </div>
      <div className="absolute -top-2 right-0 w-5 h-3 transform translate-x-1/2">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'linear-gradient(180deg, #B8860B 0%, #DAA520 50%, #B8860B 100%)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
          }}
        />
      </div>

      {/* Bottom decorative rings - lighter */}
      <div className="absolute -bottom-2 left-0 w-5 h-3 transform -translate-x-1/2">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'linear-gradient(180deg, #B8860B 0%, #DAA520 50%, #B8860B 100%)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
          }}
        />
      </div>
      <div className="absolute -bottom-2 right-0 w-5 h-3 transform translate-x-1/2">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'linear-gradient(180deg, #B8860B 0%, #DAA520 50%, #B8860B 100%)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
          }}
        />
      </div>

      {/* Tattered edges effect */}
      <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="roughPaper">
              <feTurbulence
                baseFrequency="0.04"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="0.5"
              />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Burn marks and aged spots */}
      <div className="absolute inset-2 rounded-lg pointer-events-none opacity-15">
        {/* Corner burn marks */}
        <div
          className="absolute top-0 left-0 w-8 h-8 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,69,19,0.3) 0%, transparent 70%)',
            transform: 'translate(-25%, -25%)'
          }}
        />
        <div
          className="absolute top-0 right-0 w-6 h-6 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,69,19,0.2) 0%, transparent 70%)',
            transform: 'translate(25%, -25%)'
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-5 h-5 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,69,19,0.25) 0%, transparent 70%)',
            transform: 'translate(-25%, 25%)'
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-7 h-7 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,69,19,0.2) 0%, transparent 70%)',
            transform: 'translate(25%, 25%)'
          }}
        />
      </div>
    </div>
  );
};

export default ParchmentScroll;