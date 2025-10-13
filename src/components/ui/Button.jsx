// src/components/ui/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button Component - Design System
 * 
 * Variants:
 * - primary: Cyan neon with glow (CTA buttons)
 * - secondary: Outlined cyan (less emphasis)
 * - ghost: Transparent, text only (tertiary actions)
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
  const baseStyles = `
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
    ? { type, disabled: disabled || loading, onClick }
    : { onClick };

  return (
    <Component
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...elementProps}
      {...props}
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Cargando...
        </>
      ) : (
        children
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
