import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

/**
 * BackToTop - Floating button to scroll back to top of page
 * 
 * @component
 * @example
 * <BackToTop />
 * 
 * @accessibility
 * - Keyboard accessible
 * - Respects prefers-reduced-motion
 * - Has aria-label for screen readers
 * - Only appears when scrolled > 80% of page
 */
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled > 80% of page
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setIsVisible(scrollPercent > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (prefersReducedMotion) {
      // Instant scroll for reduced motion
      window.scrollTo(0, 0);
    } else {
      // Smooth scroll
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={scrollToTop}
          aria-label="Volver arriba"
          className="fixed bottom-8 right-8 z-50 group"
        >
          {/* Button Container */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[var(--cyan-neon)] opacity-20 blur-xl rounded-full group-hover:opacity-40 transition-opacity duration-300" />
            
            {/* Button */}
            <div className="relative w-14 h-14 bg-[var(--gray-800)] border-2 border-[var(--cyan-neon)] rounded-full flex items-center justify-center hover:bg-[var(--gray-700)] transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--purple-neon)]">
              {/* Torii Icon (simplified SVG) */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[var(--cyan-neon)] group-hover:text-[var(--purple-neon)] transition-colors duration-300"
              >
                {/* Top horizontal beam */}
                <path
                  d="M2 8 C2 8, 4 6, 12 6 C20 6, 22 8, 22 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Middle horizontal beam */}
                <path
                  d="M4 11 L20 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                {/* Left pillar */}
                <path
                  d="M6 8 L6 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Right pillar */}
                <path
                  d="M18 8 L18 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Arrow pointing up */}
                <path
                  d="M12 16 L12 10 M12 10 L9 13 M12 10 L15 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Tooltip */}
          <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-[var(--gray-800)] text-[var(--text-primary)] text-sm rounded border border-[var(--gray-700)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Volver arriba
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
