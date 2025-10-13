import { useState, useEffect, useRef } from 'react';
import useReducedMotion from './useReducedMotion';

/**
 * Hook to calculate parallax offset based on scroll position
 * 
 * @param {number} speed - Speed multiplier for parallax effect (default: 0.5)
 * @returns {number} Parallax offset value
 * 
 * @example
 * const offset = useParallax(0.5);
 * <div style={{ transform: `translateY(${offset}px)` }}>
 *   Parallax content
 * </div>
 * 
 * @performance
 * - Uses IntersectionObserver to only calculate when element is visible
 * - Respects prefers-reduced-motion preference
 * - Uses passive event listeners for better scroll performance
 */
const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion, don't apply parallax
    if (prefersReducedMotion) {
      setOffset(0);
      return;
    }

    // IntersectionObserver to track visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '100px', // Start observing slightly before element enters viewport
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Scroll handler
    const handleScroll = () => {
      if (!isVisible) return;

      const scrollY = window.scrollY;
      const newOffset = scrollY * speed;
      setOffset(newOffset);
    };

    // Only add scroll listener if element is visible
    if (isVisible) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Calculate initial offset
      handleScroll();
    }

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      observer.disconnect();
    };
  }, [speed, isVisible, prefersReducedMotion]);

  return { offset, ref: elementRef };
};

export default useParallax;
