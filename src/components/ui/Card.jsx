// src/components/ui/Card.jsx
import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

// Lazy load HolographicCard for performance
const HolographicCard = lazy(() => import('../effects/HolographicCard'));

/**
 * Card Component - Design System
 * 
 * Variants:
 * - default: Standard card with border
 * - glass: Glass morphism effect (backdrop blur)
 * - featured: Highlighted card with cyan border
 * - holographic: Interactive holographic effect (lazy loaded)
 * 
 * @accessibility
 * - Maintains backward compatibility with existing variants
 * - Holographic variant respects prefers-reduced-motion
 */

const Card = ({ 
  children, 
  variant = 'default',
  hover = false,
  className = '',
  ...props 
}) => {
  // If holographic variant is requested, use HolographicCard component
  if (variant === 'holographic') {
    return (
      <Suspense fallback={
        <div className={`rounded-xl p-[var(--card-padding)] bg-black/40 backdrop-blur-md border border-white/10 ${className}`}>
          {children}
        </div>
      }>
        <HolographicCard 
          variant="featured" 
          holographic 
          scanningLine 
          rippleOnClick
          className={className}
          {...props}
        >
          {children}
        </HolographicCard>
      </Suspense>
    );
  }
  const baseStyles = `
    rounded-xl p-[var(--card-padding)]
    transition-all duration-300
  `;

  const variants = {
    default: `
      bg-black/40 backdrop-blur-md
      border border-white/10
      ${hover ? 'hover:border-white/20 hover:bg-black/50 hover:-translate-y-1 hover:shadow-2xl' : ''}
    `,
    glass: `
      bg-black/50 backdrop-blur-md
      border border-white/10
    `,
    featured: `
      bg-black/40 backdrop-blur-md
      border-2 border-[var(--cyan-neon)]/50
      relative overflow-hidden
      ${hover ? 'hover:bg-black/50 hover:border-[var(--cyan-neon)]/70 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,229,255,0.3)]' : ''}
    `
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {variant === 'featured' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,229,255,0.1)] to-[rgba(168,85,247,0.1)] opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'glass', 'featured', 'holographic']),
  hover: PropTypes.bool,
  className: PropTypes.string
};

export default Card;
