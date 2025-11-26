import { useState } from 'react';
import PropTypes from 'prop-types';
import useReducedMotion from '../../hooks/useReducedMotion';

/**
 * GlitchText - Applies cyberpunk glitch effect to text
 * 
 * @component
 * @example
 * <GlitchText trigger="hover" intensity="medium">
 *   KAINET
 * </GlitchText>
 * 
 * @example
 * <GlitchText trigger="always" intensity="high" duration={500}>
 *   ERROR
 * </GlitchText>
 * 
 * @accessibility
 * - Respects prefers-reduced-motion
 * - Does not interfere with screen readers
 * - Maintains text contrast ratios
 * - Decorative effect only, does not affect content
 */
const GlitchText = ({ 
  children, 
  trigger = 'hover', 
  intensity = 'medium', 
  duration = 300,
  className = '',
  style = {}
}) => {
  const [isGlitching, setIsGlitching] = useState(trigger === 'always');
  const prefersReducedMotion = useReducedMotion();

  // Disable glitch effect if user prefers reduced motion
  const shouldGlitch = !prefersReducedMotion && (trigger === 'always' || isGlitching);

  // Handle hover trigger
  const handleMouseEnter = () => {
    if (trigger === 'hover' && !prefersReducedMotion) {
      setIsGlitching(true);
      
      // Auto-disable after duration
      setTimeout(() => {
        setIsGlitching(false);
      }, duration);
    }
  };

  // Handle once trigger
  const handleClick = () => {
    if (trigger === 'once' && !prefersReducedMotion) {
      setIsGlitching(true);
      
      // Auto-disable after duration
      setTimeout(() => {
        setIsGlitching(false);
      }, duration);
    }
  };

  // Build class names
  const glitchClass = shouldGlitch ? `glitch-text glitch-${intensity}` : '';
  const combinedClassName = `${glitchClass} ${className}`.trim();

  return (
    <span
      className={combinedClassName}
      data-text={children}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{
        '--glitch-duration': `${duration}ms`,
        ...style
      }}
    >
      {children}
    </span>
  );
};

GlitchText.propTypes = {
  /** Text content to apply glitch effect to */
  children: PropTypes.string.isRequired,
  
  /** When to trigger the glitch effect */
  trigger: PropTypes.oneOf(['hover', 'always', 'once']),
  
  /** Intensity of the glitch effect */
  intensity: PropTypes.oneOf(['low', 'medium', 'high']),
  
  /** Duration of the glitch animation in milliseconds */
  duration: PropTypes.number,
  
  /** Additional CSS classes */
  className: PropTypes.string,
  
  /** Additional inline styles */
  style: PropTypes.object
};

export default GlitchText;
