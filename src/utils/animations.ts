// Animation utilities with TypeScript for better type safety and autocomplete
import { AnimationConfig, MotionVariants } from '@/types';

/**
 * Predefined easing functions for smoother animations
 */
export const EASINGS = {
  // Smooth and natural easings
  easeInOut: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
  easeOut: [0.22, 1, 0.36, 1] as [number, number, number, number],
  easeIn: [0.4, 0, 1, 1] as [number, number, number, number],
  
  // Bouncy and playful
  bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
  elastic: [0.7, 0, 0.84, 0] as [number, number, number, number],
  
  // Sharp and digital (cyberpunk feel)
  sharp: [0.95, 0.05, 0.8, 0.04] as [number, number, number, number],
  snappy: [0.87, 0, 0.13, 1] as [number, number, number, number],
} as const;

/**
 * Animation durations (in seconds)
 */
export const DURATIONS = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  slower: 1.2,
} as const;

/**
 * Common animation variants for Framer Motion
 */
export const VARIANTS = {
  /**
   * Fade in/out animation
   */
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } as MotionVariants,

  /**
   * Slide up animation (from bottom)
   */
  slideUp: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
  } as MotionVariants,

  /**
   * Slide down animation (from top)
   */
  slideDown: {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
  } as MotionVariants,

  /**
   * Scale animation
   */
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  } as MotionVariants,

  /**
   * Glitch effect (cyberpunk style)
   */
  glitch: {
    initial: { 
      x: 0,
      opacity: 0,
      filter: 'blur(4px)',
    },
    animate: { 
      x: [0, -2, 2, -1, 1, 0],
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }
    },
  } as MotionVariants,

  /**
   * Stagger children animation
   */
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as MotionVariants,

  /**
   * Stagger child item
   */
  staggerItem: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  } as MotionVariants,
} as const;

/**
 * Create a custom fade animation with options
 */
export const createFadeAnimation = (
  duration: number = DURATIONS.normal,
  delay: number = 0,
  ease: AnimationConfig['ease'] = EASINGS.easeInOut
): AnimationConfig => ({
  duration,
  delay,
  ease,
});

/**
 * Create a custom slide animation with options
 */
export const createSlideAnimation = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 50,
  duration: number = DURATIONS.normal,
  delay: number = 0
): MotionVariants => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const value = direction === 'down' || direction === 'right' ? distance : -distance;

  return {
    initial: { [axis]: value, opacity: 0 },
    animate: { 
      [axis]: 0, 
      opacity: 1,
      transition: { duration, delay, ease: EASINGS.easeOut }
    },
    exit: { [axis]: -value, opacity: 0 },
  };
};

/**
 * Create a stagger animation for list items
 */
export const createStaggerAnimation = (
  staggerDelay: number = 0.1,
  childDuration: number = DURATIONS.fast
): { container: MotionVariants; item: MotionVariants } => ({
  container: {
    animate: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  },
  item: {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: childDuration, ease: EASINGS.easeOut }
    },
  },
});

/**
 * Parallax scroll animation utility
 */
export const createParallaxScroll = (speed: number = 0.5) => {
  return {
    initial: { y: 0 },
    animate: { y: 0 },
    whileInView: {
      y: speed * -100,
      transition: {
        ease: 'linear',
      },
    },
  } as MotionVariants;
};

/**
 * Hover scale animation
 */
export const createHoverScale = (scale: number = 1.05) => ({
  whileHover: { 
    scale,
    transition: { duration: DURATIONS.fast }
  },
  whileTap: { scale: scale * 0.95 },
});

/**
 * Digital reveal animation (cyberpunk style)
 */
export const createDigitalReveal = (
  duration: number = DURATIONS.slow
): MotionVariants => ({
  initial: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
    opacity: 0,
  },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    opacity: 1,
    transition: {
      duration,
      ease: EASINGS.sharp,
    },
  },
});

/**
 * Glitch text effect
 */
export const glitchTextAnimation = {
  animate: {
    x: [0, -2, 2, -2, 2, 0],
    textShadow: [
      '0 0 0 transparent',
      '2px 0 0 #00E5FF, -2px 0 0 #5227FF',
      '-2px 0 0 #00E5FF, 2px 0 0 #5227FF',
      '2px 0 0 #00E5FF, -2px 0 0 #5227FF',
      '-2px 0 0 #00E5FF, 2px 0 0 #5227FF',
      '0 0 0 transparent',
    ],
    transition: {
      duration: 0.5,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  },
} as MotionVariants;

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get animation config respecting user preferences
 */
export const getAnimationConfig = (config: AnimationConfig): AnimationConfig => {
  if (prefersReducedMotion()) {
    return {
      ...config,
      duration: 0.01,
      delay: 0,
    };
  }
  return config;
};

/**
 * Get motion variants respecting user preferences
 */
export const getMotionVariants = (variants: MotionVariants): MotionVariants => {
  if (prefersReducedMotion()) {
    // Simplify animations for reduced motion
    return {
      initial: variants.initial,
      animate: {
        ...variants.animate,
        transition: { duration: 0.01 },
      },
    };
  }
  return variants;
};
