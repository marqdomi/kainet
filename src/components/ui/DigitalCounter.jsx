import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * DigitalCounter - Animated counter with digital/cyberpunk styling
 * 
 * Displays numbers with a monospace font, glow effect, and optional
 * count-up animation when scrolled into view.
 * 
 * @component
 * @example
 * // Simple counter
 * <DigitalCounter value={1000} />
 * 
 * // With count-up animation
 * <DigitalCounter value={500} animate duration={2000} />
 * 
 * // With suffix
 * <DigitalCounter value={99} suffix="%" />
 */
const DigitalCounter = ({
  value,
  animate = true,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  pulse = false,
  className = '',
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    if (!animate || hasAnimated) {
      setDisplayValue(value);
      return;
    }

    // Intersection Observer to trigger animation when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateCounter();
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [animate, hasAnimated, value]);

  const animateCounter = () => {
    const startTime = Date.now();
    const startValue = 0;
    const endValue = value;

    const updateCounter = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOut;
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(endValue);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const formattedValue = displayValue.toFixed(decimals);

  return (
    <span
      ref={counterRef}
      className={`digital-counter ${animate && !hasAnimated ? 'animate' : ''} ${pulse ? 'pulse' : ''} ${className}`}
      {...props}
    >
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

DigitalCounter.propTypes = {
  /** The target number to display/count to */
  value: PropTypes.number.isRequired,
  
  /** Whether to animate the count-up */
  animate: PropTypes.bool,
  
  /** Duration of the count-up animation in milliseconds */
  duration: PropTypes.number,
  
  /** Text to display before the number */
  prefix: PropTypes.string,
  
  /** Text to display after the number (e.g., '%', '+', 'K') */
  suffix: PropTypes.string,
  
  /** Number of decimal places to show */
  decimals: PropTypes.number,
  
  /** Whether to add a pulsing glow effect */
  pulse: PropTypes.bool,
  
  /** Additional CSS classes */
  className: PropTypes.string
};

export default DigitalCounter;
