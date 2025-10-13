// src/components/ui/Badge.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Badge Component - Design System
 * 
 * Used for: categories, tags, status indicators
 */

const Badge = ({ 
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseStyles = `
    inline-block
    rounded-full
    font-medium
    uppercase
    letter-spacing-wider
    transition-colors duration-200
  `;

  const variants = {
    default: `
      bg-[rgba(0,229,255,0.1)]
      border border-[var(--cyan-neon)]
      text-[var(--cyan-neon)]
    `,
    purple: `
      bg-[rgba(168,85,247,0.1)]
      border border-[var(--purple-accent)]
      text-[var(--purple-accent)]
    `,
    success: `
      bg-[rgba(16,185,129,0.1)]
      border border-[var(--green-success)]
      text-[var(--green-success)]
    `,
    warning: `
      bg-[rgba(245,158,11,0.1)]
      border border-[var(--yellow-warning)]
      text-[var(--yellow-warning)]
    `,
    error: `
      bg-[rgba(239,68,68,0.1)]
      border border-[var(--red-error)]
      text-[var(--red-error)]
    `
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'purple', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

export default Badge;
