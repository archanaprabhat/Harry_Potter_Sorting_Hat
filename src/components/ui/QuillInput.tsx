import React from 'react';

interface QuillInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export default function QuillInput({ error, className = '', ...props }: QuillInputProps) {
    return (
        <div className="relative">
            <input
                className={`
          w-full bg-transparent border-b-2 border-amber-900/30 
          text-amber-900 text-center text-xl font-serif py-2
          focus:outline-none focus:border-amber-900 transition-all duration-300
          placeholder:text-amber-900/30
          ${error ? 'border-red-500/50' : ''}
          ${className}
        `}
                {...props}
            />
            {error && (
                <p className="text-red-600 text-xs text-center font-serif mt-1 animate-pulse">
                    {error}
                </p>
            )}
        </div>
    );
}
