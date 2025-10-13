// src/components/ui/Button.jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import ToriiLoaderMini from '../loaders/ToriiLoaderMini';
import useReducedMotion from '../../hooks/useReducedMotion';

/**
 * Button Component - Design System
 * 
 * Enhanced with cyberpunk effects:
 * - Ripple effect on click
 * - Hologram flicker on hover
 * - Mini torii spinner for loading state
 * 
 * Variants:
 * - primary: Cyan neon with glow (CTA buttons)
 * - secondary: Outlined cyan (less emphasis)
 * - ghost: Transparent, text only (tertiary actions)
 * 
 * @accessibility
 * - Respects prefers-reduced-motion
 * - Maintains keyboard navigation
 * - Proper ARIA attributes for loading state
 */

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  as = 'button',
  ...props 
}) => {
  const [ripples, setRipples] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);
  const canvasRef = useRef(null);
  const rippleAnimationRef = useRef(null);
  const ripplesRef = useRef([]);
  const prefersReducedMotion = useReducedMotion();
  
  // Disable effects if reduced motion is preferred
  const effectsEnabled = !prefersReducedMotion;
  /**
   * Handle click with ripple effect
   * Creates ripple animation from click position
   */
  const handleClick = useCallback((e) => {
    // Call original onClick handler
    if (onClick) {
      onClick(e);
    }
    
    // Create ripple effect if enabled
    if (!effectsEnabled || !buttonRef.current || !canvasRef.current || disabled || loading) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add new ripple to array
    ripplesRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: Math.max(rect.width, rect.height) * 1.5,
      startTime: Date.now()
    });
    
    // Start animation loop if not already running
    if (!rippleAnimationRef.current) {
      animateRipples();
    }
  }, [onClick, effectsEnabled, disabled, loading]);

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

  const handleMouseEnter = useCallback(() => {
    if (!disabled && !loading) {
      setIsHovered(true);
    }
  }, [disabled, loading]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Setup canvas size
  useEffect(() => {
    if (!canvasRef.current || !buttonRef.current) return;
    
    const updateCanvasSize = () => {
      const rect = buttonRef.current.getBoundingClientRect();
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
      if (rippleAnimationRef.current) {
        cancelAnimationFrame(rippleAnimationRef.current);
      }
    };
  }, []);

  const baseStyles = `
    relative overflow-hidden
    inline-flex items-center justify-center
    font-semibold rounded-lg
    transition-all duration-200
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-neon)] focus-visible:ring-offset-2 focus-visible:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-[var(--cyan-neon)] text-black
      hover:bg-[var(--cyan-bright)]
      shadow-[0_0_20px_rgba(0,229,255,0.3)]
      hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]
      hover:-translate-y-0.5
    `,
    secondary: `
      bg-transparent text-[var(--cyan-neon)]
      border-2 border-[var(--cyan-neon)]
      hover:bg-[rgba(0,229,255,0.1)]
      ${effectsEnabled && isHovered && !disabled && !loading ? 'hologram-flicker' : ''}
    `,
    ghost: `
      bg-transparent text-[var(--text-secondary)]
      hover:text-[var(--cyan-neon)]
      hover:bg-[rgba(255,255,255,0.05)]
    `
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const Component = as;
  const elementProps = as === 'button' 
    ? { type, disabled: disabled || loading }
    : {};

  return (
    <Component
      ref={buttonRef}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...elementProps}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center">
          <ToriiLoaderMini size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="mr-2" />
          <span>Cargando...</span>
        </span>
      ) : (
        children
      )}
      
      {/* Ripple canvas */}
      {effectsEnabled && (
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
    </Component>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export default Button;
