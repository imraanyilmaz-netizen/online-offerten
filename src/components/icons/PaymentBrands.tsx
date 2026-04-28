import * as React from 'react';

/**
 * Mastercard wordmark logo with the two iconic overlapping circles.
 * Authentic brand colors: #EB001B (red), #F79E1B (orange), #FF5F00 (overlap).
 */
export function MastercardLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 38 24"
      className={className}
      role="img"
      aria-label="Mastercard"
    >
      <circle cx="14" cy="12" r="9" fill="#EB001B" />
      <circle cx="24" cy="12" r="9" fill="#F79E1B" />
      <path
        d="M19 5.4a8.97 8.97 0 0 1 0 13.2 8.97 8.97 0 0 1 0-13.2Z"
        fill="#FF5F00"
      />
    </svg>
  );
}

/**
 * Visa wordmark logo (italic, brand blue #1A1F71).
 */
export function VisaLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 20"
      className={className}
      role="img"
      aria-label="Visa"
    >
      <text
        x="30"
        y="16"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="18"
        fill="#1A1F71"
        letterSpacing="-0.5"
      >
        VISA
      </text>
    </svg>
  );
}
