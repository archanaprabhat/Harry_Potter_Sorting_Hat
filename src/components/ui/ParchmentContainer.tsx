import React from 'react';

interface ParchmentContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function ParchmentContainer({ children, className = '' }: ParchmentContainerProps) {
    return (
        <div className={`relative bg-[#F4E4BC] rounded-sm shadow-xl border-4 border-[#3C2A17] ${className}`}>
            {/* Texture overlay */}
            <div className="absolute inset-0 opacity-10 bg-black pointer-events-none rounded-sm"
                style={{ backgroundImage: 'url("/images/parchment-texture.png")' }} />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
