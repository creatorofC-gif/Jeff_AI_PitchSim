import React from 'react';

interface ECellLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ECellLogo: React.FC<ECellLogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-12 w-auto'
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 160 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={sizeClasses[size]}
      >
        {/* Venture Terminal Emblem */}
        <rect x="2" y="6" width="28" height="28" rx="6" fill="#111821" stroke="#263241" strokeWidth="1.5" />
        <path d="M10 13H22M10 20H18M10 27H22" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" />
        <circle cx="21" cy="20" r="2.5" fill="#0F766E" />

        {/* Typographic Identity */}
        <text
          x="38"
          y="19"
          fill="#F4F5F7"
          fontFamily="'Geist', 'Inter', sans-serif"
          fontSize="12"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          E-CELL INCUBATOR
        </text>
        <text
          x="38"
          y="30"
          fill="#6F7B89"
          fontFamily="'Geist', 'Inter', sans-serif"
          fontSize="9.5"
          fontWeight="500"
          letterSpacing="0.06em"
        >
          AI PITCH SIMULATOR
        </text>
      </svg>
    </div>
  );
};
