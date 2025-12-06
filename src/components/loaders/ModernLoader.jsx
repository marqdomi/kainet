import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * ModernLoader - Clean, minimal loading component
 * 
 * A professional loader with animated rings and optional message.
 * No cultural or regional elements - universally clean design.
 * 
 * @component
 * @example
 * <ModernLoader size="lg" showMessage />
 * 
 * @accessibility
 * - Uses role="status" and aria-live for screen reader announcements
 * - Respects prefers-reduced-motion via CSS
 */
const ModernLoader = ({ 
  size = 'md', 
  showMessage = true,
  message = 'Cargando...',
  className = '' 
}) => {
  // Size configurations
  const sizeConfig = {
    sm: { width: 40, height: 40, ringSize: 32, fontSize: 'text-sm' },
    md: { width: 60, height: 60, ringSize: 48, fontSize: 'text-base' },
    lg: { width: 80, height: 80, ringSize: 64, fontSize: 'text-lg' }
  };
  
  const config = sizeConfig[size] || sizeConfig.md;
  
  return (
    <motion.div
      className={`modern-loader flex flex-col items-center justify-center gap-4 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      role="status"
      aria-live="polite"
      aria-label="Cargando"
    >
      {/* Animated rings */}
      <div 
        className="relative"
        style={{ width: config.width, height: config.height }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[var(--cyan-neon,#00E5FF)]/30"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        />
        
        {/* Middle spinning ring */}
        <motion.div
          className="absolute inset-1 rounded-full border-2 border-transparent border-t-[var(--cyan-neon,#00E5FF)] border-r-[var(--purple-accent,#A855F7)]"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
        />
        
        {/* Inner pulsing dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            scale: [0.8, 1, 0.8],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        >
          <div 
            className="rounded-full bg-gradient-to-br from-[var(--cyan-neon,#00E5FF)] to-[var(--purple-accent,#A855F7)]"
            style={{ 
              width: config.ringSize / 4, 
              height: config.ringSize / 4,
              boxShadow: '0 0 20px rgba(0, 229, 255, 0.4)'
            }}
          />
        </motion.div>
      </div>

      {/* Message */}
      {showMessage && (
        <motion.p
          className={`text-[var(--text-secondary)] ${config.fontSize} font-medium`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {message}
        </motion.p>
      )}
      
      {/* Screen reader text */}
      <span className="sr-only">Cargando contenido, por favor espere</span>
    </motion.div>
  );
};

ModernLoader.propTypes = {
  /** Loader size: 'sm', 'md', or 'lg' */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Whether to show the loading message */
  showMessage: PropTypes.bool,
  /** Custom message to display */
  message: PropTypes.string,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default ModernLoader;
