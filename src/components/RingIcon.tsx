import React from 'react';

export const Ring: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 2l3 4h-6l3-4z" fill="currentColor" opacity="0.3" />
    <circle cx="12" cy="14" r="7" />
    <path d="M12 2l3 4H9l3-4z" />
  </svg>
);
