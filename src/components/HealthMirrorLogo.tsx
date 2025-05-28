import React from 'react';

interface HealthMirrorLogoProps {
  className?: string;
}

const HealthMirrorLogo: React.FC<HealthMirrorLogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="url(#gradient)" />
      <path d="M16 25C16 25 8 20 8 14C8 11.2386 10.2386 9 13 9C14.5 9 15.8283 9.80281 16.5 11C17.1717 9.80281 18.5 9 20 9C22.7614 9 25 11.2386 25 14C25 20 16 25 16 25Z" fill="white"/>
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6"/>
          <stop offset="1" stopColor="#06B6D4"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default HealthMirrorLogo; 