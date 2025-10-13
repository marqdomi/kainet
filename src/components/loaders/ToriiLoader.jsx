import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ToriiLoader - Full-featured loading component with torii gate and rotating messages
 * 
 * A comprehensive loader featuring an animated torii gate with circuit effects
 * and rotating tech-themed messages in Japanese and English.
 * 
 * @component
 * @example
 * <ToriiLoader size="lg" showMessage />
 * 
 * @accessibility
 * - Uses role="status" and aria-live for screen reader announcements
 * - Respects prefers-reduced-motion
 * - Messages are announced to screen readers
 */
const ToriiLoader = ({ 
  size = 'md', 
  showMessage = true,
  message = null,
  className = '' 
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  // Default rotating messages
  const defaultMessages = [
    '技術は未来を創る', // Tech creates the future
    'Loading innovation...',
    'Connecting circuits...',
    'Initializing AI...'
  ];
  
  const messages = message ? [message] : defaultMessages;
  
  // Rotate messages every 3 seconds
  useEffect(() => {
    if (!showMessage || message) return; // Don't rotate if custom message provided
    
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [showMessage, message, messages.length]);
  
  // Size configurations
  const sizeConfig = {
    sm: { width: 80, height: 80, strokeWidth: 2, fontSize: 'text-sm' },
    md: { width: 120, height: 120, strokeWidth: 2.5, fontSize: 'text-base' },
    lg: { width: 160, height: 160, strokeWidth: 3, fontSize: 'text-lg' }
  };
  
  const config = sizeConfig[size] || sizeConfig.md;
  
  return (
    <motion.div
      className={`torii-loader flex flex-col items-center justify-center gap-4 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      {/* SVG Torii with Circuit Animation */}
      <svg
        width={config.width}
        height={config.height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="torii-svg"
      >
        {/* Circuit paths - decorative background */}
        <g className="circuits" opacity="0.3">
          <path
            d="M10 30 L30 30 L30 50"
            stroke="var(--cyan-neon, #00E5FF)"
            strokeWidth="0.5"
            className="circuit-path circuit-1"
            strokeDasharray="4 2"
          />
          <path
            d="M90 30 L70 30 L70 50"
            stroke="var(--cyan-neon, #00E5FF)"
            strokeWidth="0.5"
            className="circuit-path circuit-2"
            strokeDasharray="4 2"
          />
          <path
            d="M30 70 L50 70 L50 85"
            stroke="var(--cyan-neon, #00E5FF)"
            strokeWidth="0.5"
            className="circuit-path circuit-3"
            strokeDasharray="4 2"
          />
        </g>
        
        {/* Main Torii Structure */}
        <g className="torii-structure">
          {/* Top curved beam (kasagi) */}
          <path
            d="M15 25 Q50 20 85 25"
            stroke="var(--cyan-neon, #00E5FF)"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            className="torii-beam-top"
            fill="none"
          />
          
          {/* Second horizontal beam (nuki) */}
          <path
            d="M20 30 L80 30"
            stroke="var(--cyan-neon, #00E5FF)"
            strokeWidth={config.strokeWidth * 0.8}
            strokeLinecap="round"
            className="torii-beam-second"
          />
          
          {/* Left pillar (hashira) */}
          <path
            d="M25 30 L25 85"
            stroke="var(--cyan-neon, #00E5FF)"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            className="torii-pillar-left"
          />
          
          {/* Right pillar (hashira) */}
          <path
            d="M75 30 L75 85"
            stroke="var(--cyan-neon, #00E5FF)"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            className="torii-pillar-right"
          />
          
          {/* Middle horizontal beam (gakuzuka) */}
          <path
            d="M25 50 L75 50"
            stroke="var(--cyan-neon, #00E5FF)"
            strokeWidth={config.strokeWidth * 0.7}
            strokeLinecap="round"
            className="torii-beam-middle"
          />
          
          {/* Decorative circuit nodes */}
          <circle cx="25" cy="30" r="2" fill="var(--cyan-neon, #00E5FF)" className="circuit-node node-1" />
          <circle cx="75" cy="30" r="2" fill="var(--cyan-neon, #00E5FF)" className="circuit-node node-2" />
          <circle cx="25" cy="50" r="2" fill="var(--cyan-neon, #00E5FF)" className="circuit-node node-3" />
          <circle cx="75" cy="50" r="2" fill="var(--cyan-neon, #00E5FF)" className="circuit-node node-4" />
        </g>
      </svg>
      
      {/* Rotating Messages */}
      {showMessage && (
        <div className={`message-container ${config.fontSize} font-medium text-center min-h-[2em]`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-gray-300"
              aria-live="polite"
            >
              {messages[currentMessageIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      
      {/* Screen reader only text */}
      <span className="sr-only">
        Loading content, please wait...
      </span>
      
      <style>{`
        .torii-loader {
          user-select: none;
        }
        
        /* Pulsing animation for torii beams */
        .torii-beam-top {
          animation: torii-pulse 2s ease-in-out infinite;
          stroke-dasharray: 100;
          stroke-dashoffset: 0;
          animation: torii-draw 2s ease-in-out infinite;
        }
        
        .torii-beam-second {
          animation: torii-pulse 2s ease-in-out infinite 0.2s;
        }
        
        .torii-pillar-left {
          animation: torii-pulse 2s ease-in-out infinite 0.4s;
        }
        
        .torii-pillar-right {
          animation: torii-pulse 2s ease-in-out infinite 0.6s;
        }
        
        .torii-beam-middle {
          animation: torii-pulse 2s ease-in-out infinite 0.8s;
        }
        
        /* Circuit path animations */
        .circuit-path {
          animation: circuit-flow 2s linear infinite;
        }
        
        .circuit-1 {
          animation-delay: 0s;
        }
        
        .circuit-2 {
          animation-delay: 0.3s;
        }
        
        .circuit-3 {
          animation-delay: 0.6s;
        }
        
        /* Circuit node pulsing */
        .circuit-node {
          animation: node-pulse 1.5s ease-in-out infinite;
        }
        
        .node-1 {
          animation-delay: 0s;
        }
        
        .node-2 {
          animation-delay: 0.2s;
        }
        
        .node-3 {
          animation-delay: 0.4s;
        }
        
        .node-4 {
          animation-delay: 0.6s;
        }
        
        /* Keyframe animations */
        @keyframes torii-pulse {
          0%, 100% {
            opacity: 1;
            filter: drop-shadow(0 0 2px var(--cyan-neon, #00E5FF));
          }
          50% {
            opacity: 0.5;
            filter: drop-shadow(0 0 8px var(--cyan-neon, #00E5FF));
          }
        }
        
        @keyframes torii-draw {
          0%, 100% {
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dashoffset: 50;
          }
        }
        
        @keyframes circuit-flow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 12;
          }
        }
        
        @keyframes node-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.5);
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .torii-beam-top,
          .torii-beam-second,
          .torii-pillar-left,
          .torii-pillar-right,
          .torii-beam-middle,
          .circuit-path,
          .circuit-node {
            animation: none;
            opacity: 1;
            filter: none;
          }
          
          .torii-loader {
            animation: none;
          }
        }
      `}</style>
    </motion.div>
  );
};

ToriiLoader.propTypes = {
  /** Size variant: 'sm' (80px), 'md' (120px), or 'lg' (160px) */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Whether to show rotating messages below the loader */
  showMessage: PropTypes.bool,
  /** Custom message to display (disables rotation) */
  message: PropTypes.string,
  /** Additional CSS classes */
  className: PropTypes.string
};

export default ToriiLoader;
