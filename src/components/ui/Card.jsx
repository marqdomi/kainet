// src/components/ui/Card.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card Component - Design System
 * 
 * Variants:
 * - default: Standard card with border
 * - glass: Glass morphism effect (backdrop blur)
 * - featured: Highlighted card with cyan border
 */

const Card = ({ 
  children, 
  variant = 'default',
  hover = false,
  className = '',
  ...props 
}) => {
  const baseStyles = `
    rounded-xl p-[var(--card-padding)]
    transition-all duration-300
  `;

  const variants = {
    default: `
      bg-[var(--gray-900)]
      border border-[var(--gray-700)]
      ${hover ? 'hover:border-[var(--cyan-neon)] hover:-translate-y-1 hover:shadow-2xl' : ''}
    `,
    glass: `
      bg-[var(--overlay-glass)]
      backdrop-blur-md
      border border-white/10
    `,
    featured: `
      bg-gradient-to-br from-[var(--gray-900)] to-[var(--gray-800)]
      border-2 border-[var(--cyan-neon)]
      relative overflow-hidden
      ${hover ? 'hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,229,255,0.3)]' : ''}
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
  variant: PropTypes.oneOf(['default', 'glass', 'featured']),
  hover: PropTypes.bool,
  className: PropTypes.string
};

export default Card;
