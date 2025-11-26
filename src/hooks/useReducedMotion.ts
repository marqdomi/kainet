import { useState, useEffect } from 'react';

/**
 * Hook to detect prefers-reduced-motion media query
 * 
 * @returns True if user prefers reduced motion
 * 
 * @example
 * const prefersReducedMotion = useReducedMotion();
 * if (prefersReducedMotion) {
 *   // Disable animations
 * }
 * 
 * @accessibility
 * - Respects user's system preference for reduced motion
 * - Automatically updates when preference changes
 * - Cleans up event listeners on unmount
 */
const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Create media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Handler for changes
    const handler = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add event listener
    mediaQuery.addEventListener('change', handler);

    // Cleanup on unmount
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  return prefersReducedMotion;
};

export default useReducedMotion;
