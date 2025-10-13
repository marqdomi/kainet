import { useState, useEffect, useRef, useCallback } from 'react';
import useReducedMotion from './useReducedMotion';

/**
 * Enhanced hook for parallax scrolling with multiple layers and motion blur
 * 
 * @param {Object} options - Configuration options
 * @param {number} options.speed - Speed multiplier for parallax effect (default: 0.5)
 * @param {number} options.blurThreshold - Scroll speed threshold for motion blur in px/frame (default: 10)
 * @param {number} options.maxBlur - Maximum blur amount in pixels (default: 3)
 * @returns {Object} { offset, blur, ref, scrollVelocity }
 * 
 * @example
 * const { offset, blur, ref } = useParallaxScroll({ speed: 0.5 });
 * <div 
 *   ref={ref}
 *   style={{ 
 *     transform: `translateY(${offset}px)`,
 *     filter: `blur(${blur}px)`
 *   }}
 * >
 *   Parallax content
 * </div>
 * 
 * @performance
 * - Uses IntersectionObserver to only animate visible elements
 * - Passive event listeners for better scroll performance
 * - RequestAnimationFrame for smooth updates
 * - Respects prefers-reduced-motion preference
 */
const useParallaxScroll = (options = {}) => {
  const {
    speed = 0.5,
    blurThreshold = 10,
    maxBlur = 3,
  } = options;

  const [offset, setOffset] = useState(0);
  const [blur, setBlur] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Track scroll velocity for motion blur
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());
  const rafId = useRef(null);
  const scrollVelocity = useRef(0);

  // Calculate parallax offset and motion blur
  const updateParallax = useCallback(() => {
    if (!isVisible || prefersReducedMotion) {
      rafId.current = null;
      return;
    }

    const now = Date.now();
    const scrollY = window.scrollY;
    const deltaTime = now - lastTimestamp.current;
    const deltaScroll = scrollY - lastScrollY.current;

    // Calculate scroll velocity (pixels per millisecond)
    if (deltaTime > 0) {
      scrollVelocity.current = Math.abs(deltaScroll / deltaTime);
    }

    // Update parallax offset
    const newOffset = scrollY * speed;
    setOffset(newOffset);

    // Calculate motion blur based on scroll velocity
    // Convert velocity to pixels per frame (assuming 60fps = 16.67ms per frame)
    const velocityPerFrame = scrollVelocity.current * 16.67;
    
    if (velocityPerFrame > blurThreshold) {
      const blurAmount = Math.min(
        ((velocityPerFrame - blurThreshold) / blurThreshold) * maxBlur,
        maxBlur
      );
      setBlur(blurAmount);
    } else {
      setBlur(0);
    }

    lastScrollY.current = scrollY;
    lastTimestamp.current = now;

    rafId.current = null;
  }, [isVisible, prefersReducedMotion, speed, blurThreshold, maxBlur]);

  useEffect(() => {
    // If user prefers reduced motion, don't apply parallax
    if (prefersReducedMotion) {
      setOffset(0);
      setBlur(0);
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

    // Scroll handler with RAF throttling
    const handleScroll = () => {
      if (!isVisible) return;
      
      // Only schedule update if one isn't already pending
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(updateParallax);
      }
    };

    // Only add scroll listener if element is visible
    if (isVisible) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Calculate initial state
      lastScrollY.current = window.scrollY;
      lastTimestamp.current = Date.now();
      updateParallax();
    }

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      observer.disconnect();
    };
  }, [isVisible, prefersReducedMotion, updateParallax]);

  return {
    offset,
    blur,
    ref: elementRef,
    scrollVelocity: scrollVelocity.current,
  };
};

export default useParallaxScroll;
