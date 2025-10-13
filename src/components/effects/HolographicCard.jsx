import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '../ui/Card';
import useReducedMotion from '../../hooks/useReducedMotion';

/**
 * HolographicCard - Card with holographic shimmer effect
 * 
 * Extends the base Card component with an interactive holographic effect
 * that follows the cursor position. The effect is disabled on mobile devices
 * and respects user motion preferences.
 * 
 * @component
 * @example
 * <HolographicCard variant="featured" holographic scanningLine>
 *   <h3>Project Title</h3>
 *   <p>Description</p>
 * </HolographicCard>
 * 
 * @accessibility
 * - Respects prefers-reduced-motion
 * - Disabled on mobile (no hover support)
 * - Does not interfere with keyboard navigation
 */
const HolographicCard = ({
  children,
  holographic = true,
  scanningLine = true,
  rippleOnClick = true,
  variant = 'default',
  className = '',
  ...props
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const rippleAnimationRef = useRef(null);
  const ripplesRef = useRef([]);
  const prefersReducedMotion = useReducedMotion();
  
  // Detect mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  // Disable effects if reduced motion is preferred or on mobile
  const effectsEnabled = holographic && !prefersReducedMotion && !isMobile;
  const scanningEnabled = scanningLine && !prefersReducedMotion && !isMobile;
  const rippleEnabled = rippleOnClick && !prefersReducedMotion;

  /**
   * Throttled mouse move handler using requestAnimationFrame
   * Calculates cursor position relative to card (0-100%)
   */
  const handleMouseMove = useCallback((e) => {
    if (!effectsEnabled || !cardRef.current) return;
    
    // Cancel previous frame if still pending
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    // Schedule update for next frame (60fps throttling)
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });
    });
  }, [effectsEnabled]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePosition({ x: 50, y: 50 }); // Reset to center
  }, []);

  /**
   * Click handler for ripple effect
   * Calculates click position and creates ripple animation using canvas
   */
  const handleClick = useCallback((e) => {
    if (!rippleEnabled || !cardRef.current || !canvasRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add new ripple to array
    ripplesRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: Math.max(rect.width, rect.height),
      startTime: Date.now()
    });
    
    // Start animation loop if not already running
    if (!rippleAnimationRef.current) {
      animateRipples();
    }
  }, [rippleEnabled]);

  /**
   * Animate ripples on canvas
   * Uses requestAnimationFrame for smooth 60fps animation
   */
  const animateRipples = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const now = Date.now();
    const duration = 600; // ms
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw ripples
    ripplesRef.current = ripplesRef.current.filter(ripple => {
      const elapsed = now - ripple.startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (cubic-bezier approximation)
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      ripple.radius = eased * ripple.maxRadius;
      
      // Draw ripple
      const opacity = 0.6 * (1 - progress);
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      
      // Gradient fill
      const gradient = ctx.createRadialGradient(
        ripple.x, ripple.y, 0,
        ripple.x, ripple.y, ripple.radius
      );
      gradient.addColorStop(0, `rgba(0, 229, 255, ${opacity})`);
      gradient.addColorStop(0.5, `rgba(0, 229, 255, ${opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(0, 229, 255, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Keep ripple if not complete
      return progress < 1;
    });
    
    // Continue animation if ripples remain
    if (ripplesRef.current.length > 0) {
      rippleAnimationRef.current = requestAnimationFrame(animateRipples);
    } else {
      rippleAnimationRef.current = null;
    }
  }, []);

  // Setup canvas size
  useEffect(() => {
    if (!canvasRef.current || !cardRef.current) return;
    
    const updateCanvasSize = () => {
      const rect = cardRef.current.getBoundingClientRect();
      canvasRef.current.width = rect.width;
      canvasRef.current.height = rect.height;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (rippleAnimationRef.current) {
        cancelAnimationFrame(rippleAnimationRef.current);
      }
    };
  }, []);

  // Generate holographic gradient style
  const holographicStyle = effectsEnabled && isHovered ? {
    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
      rgba(0, 229, 255, 0.3) 0%, 
      rgba(168, 85, 247, 0.2) 30%, 
      transparent 60%)`
  } : {};

  return (
    <div
      ref={cardRef}
      className={`holographic-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ position: 'relative' }}
    >
      <Card
        variant={variant}
        hover={!effectsEnabled} // Use default hover if effects disabled
        {...props}
      >
        {children}
      </Card>
      
      {/* Holographic overlay */}
      {effectsEnabled && (
        <div
          className="holographic-overlay"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            mixBlendMode: 'overlay',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            willChange: 'transform',
            ...holographicStyle
          }}
        />
      )}
      
      {/* Scanning line effect */}
      {scanningEnabled && isHovered && (
        <div className="scanning-line" aria-hidden="true" />
      )}
      
      {/* Ripple canvas */}
      {rippleEnabled && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            zIndex: 5
          }}
        />
      )}
    </div>
  );
};

HolographicCard.propTypes = {
  children: PropTypes.node.isRequired,
  holographic: PropTypes.bool,
  scanningLine: PropTypes.bool,
  rippleOnClick: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'glass', 'featured']),
  className: PropTypes.string
};

export default React.memo(HolographicCard);
