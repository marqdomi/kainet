import React from 'react';
import PropTypes from 'prop-types';

/**
 * ToriiLoaderMini - Compact torii spinner for button loading states
 * 
 * A simplified version of the main ToriiLoader designed specifically
 * for inline use in buttons and small UI elements.
 * 
 * @component
 * @example
 * <ToriiLoaderMini size={16} />
 */
const ToriiLoaderMini = ({ size = 20, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`torii-loader-mini ${className}`}
      aria-label="Loading"
      role="status"
    >
      {/* Simplified torii gate structure */}
      {/* Top horizontal beam */}
      <path
        d="M2 6 L22 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="torii-beam-top"
      />
      
      {/* Left pillar */}
      <path
        d="M6 6 L6 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="torii-pillar-left"
      />
      
      {/* Right pillar */}
      <path
        d="M18 6 L18 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="torii-pillar-right"
      />
      
      {/* Middle horizontal beam */}
      <path
        d="M6 12 L18 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="torii-beam-middle"
      />
      
      <style>{`
        .torii-loader-mini {
          display: inline-block;
          animation: torii-spin 1s linear infinite;
        }
        
        @keyframes torii-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .torii-beam-top {
          animation: torii-pulse-1 1.5s ease-in-out infinite;
        }
        
        .torii-pillar-left {
          animation: torii-pulse-2 1.5s ease-in-out infinite 0.2s;
        }
        
        .torii-pillar-right {
          animation: torii-pulse-2 1.5s ease-in-out infinite 0.4s;
        }
        
        .torii-beam-middle {
          animation: torii-pulse-1 1.5s ease-in-out infinite 0.6s;
        }
        
        @keyframes torii-pulse-1 {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
        
        @keyframes torii-pulse-2 {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .torii-loader-mini {
            animation: none;
          }
          .torii-beam-top,
          .torii-pillar-left,
          .torii-pillar-right,
          .torii-beam-middle {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </svg>
  );
};

ToriiLoaderMini.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
};

export default ToriiLoaderMini;
