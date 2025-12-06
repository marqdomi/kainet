// src/components/ui/Card.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card Component - Design System v3.1
 * 
 * Professional glassmorphic cards with full dark/light theme support
 * Inspired by Vercel, Linear, Stripe
 * 
 * Variants:
 * - default: Standard card with subtle glass effect
 * - subtle: More transparent, for secondary content
 * - featured: Accent border for highlighted content
 * - elevated: Higher elevation with stronger shadow
 * 
 * @accessibility
 * - Respects prefers-reduced-motion via CSS
 * - Maintains proper contrast ratios in both themes
 */

const Card = ({ 
  children, 
  variant = 'default',
  hover = false,
  padding = 'default',
  className = '',
  as: Component = 'div',
  ...props 
}) => {
  const baseStyles = `
    rounded-2xl
    transition-all duration-200 ease-out
    border
  `;

  // Padding options
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  // Theme-aware glassmorphism variants using CSS custom properties
  // Dark mode: dark semi-transparent backgrounds
  // Light mode: light semi-transparent backgrounds with subtle shadows
  const variants = {
    default: `
      card-default
      backdrop-blur-xl
      ${hover ? 'card-hover-enabled' : ''}
    `,
    subtle: `
      card-subtle
      backdrop-blur-lg
      ${hover ? 'card-hover-enabled' : ''}
    `,
    featured: `
      card-featured
      backdrop-blur-xl
      ${hover ? 'card-hover-enabled card-featured-hover' : ''}
    `,
    elevated: `
      card-elevated
      backdrop-blur-xl
      ${hover ? 'card-hover-enabled' : ''}
    `,
  };

  return (
    <Component
      className={`${baseStyles} ${paddingStyles[padding]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'subtle', 'featured', 'elevated']),
  hover: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'sm', 'default', 'lg']),
  className: PropTypes.string,
  as: PropTypes.elementType,
};

export default Card;
