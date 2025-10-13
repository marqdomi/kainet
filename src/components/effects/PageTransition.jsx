/**
 * PageTransition - Cinematic page transitions with wipe effect
 * 
 * @component
 * @example
 * <PageTransition>
 *   <Routes>
 *     <Route path="/" element={<Home />} />
 *   </Routes>
 * </PageTransition>
 * 
 * @accessibility
 * - Respects prefers-reduced-motion (uses simple fade)
 * - Announces page changes to screen readers
 * - Does not interfere with keyboard navigation
 * 
 * @requirements 3.1, 3.2, 3.3, 3.4
 */

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import useReducedMotion from '../../hooks/useReducedMotion';
import ToriiLoader from '../loaders/ToriiLoader';

const PageTransition = ({ children, duration = 600 }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState('forward');
  const prefersReducedMotion = useReducedMotion();
  const previousLocation = useRef(location.pathname);
  const loadingTimeout = useRef(null);
  const transitionTimeout = useRef(null);

  // Detect navigation direction (forward/back)
  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = previousLocation.current;

    // Simple heuristic: if going to root or shorter path, it's "back"
    if (currentPath === '/' || currentPath.length < prevPath.length) {
      setDirection('back');
    } else {
      setDirection('forward');
    }

    previousLocation.current = currentPath;
  }, [location.pathname]);

  // Show loader if page load takes > 300ms
  useEffect(() => {
    setIsLoading(true);

    // Clear any existing timeouts (handle rapid navigation)
    if (loadingTimeout.current) {
      clearTimeout(loadingTimeout.current);
    }
    if (transitionTimeout.current) {
      clearTimeout(transitionTimeout.current);
    }

    // Show loader after 300ms if still loading
    loadingTimeout.current = setTimeout(() => {
      setIsLoading(true);
    }, 300);

    // Hide loader after transition duration
    transitionTimeout.current = setTimeout(() => {
      setIsLoading(false);
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
      }
    }, duration);

    return () => {
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
      }
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current);
      }
    };
  }, [location.pathname, duration]);

  // Wipe animation variants
  const wipeVariants = {
    initial: (direction) => ({
      clipPath: direction === 'forward' 
        ? 'inset(0 100% 0 0)' 
        : 'inset(0 0 0 100%)',
      filter: 'blur(0px)',
    }),
    animate: {
      clipPath: 'inset(0 0 0 0)',
      filter: 'blur(0px)',
      transition: {
        clipPath: {
          duration: duration / 1000,
          ease: [0.4, 0, 0.2, 1], // cubic-bezier easing
        },
        filter: {
          duration: duration / 2000,
          ease: 'easeOut',
        },
      },
    },
    exit: (direction) => ({
      clipPath: direction === 'forward' 
        ? 'inset(0 0 0 100%)' 
        : 'inset(0 100% 0 0)',
      filter: 'blur(4px)',
      transition: {
        clipPath: {
          duration: duration / 1000,
          ease: [0.4, 0, 0.2, 1],
        },
        filter: {
          duration: duration / 2000,
          ease: 'easeIn',
        },
      },
    }),
  };

  // Simple fade for reduced motion
  const fadeVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  const variants = prefersReducedMotion ? fadeVariants : wipeVariants;

  return (
    <>
      {/* Screen reader announcement */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {`Navigated to ${location.pathname}`}
      </div>

      {/* Loader overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            style={{ pointerEvents: 'none' }}
          >
            <ToriiLoader size="lg" showMessage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page transition wrapper */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={location.pathname}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            width: '100%',
            willChange: 'clip-path, filter',
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

PageTransition.propTypes = {
  /** Child routes to render */
  children: PropTypes.node.isRequired,
  /** Transition duration in milliseconds */
  duration: PropTypes.number,
};

export default PageTransition;
