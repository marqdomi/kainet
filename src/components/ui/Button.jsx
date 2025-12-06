// src/components/ui/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';
import ToriiLoaderMini from '../loaders/ToriiLoaderMini';

/**
 * Button Component - Design System v3.1
 * 
 * Professional, theme-aware button system
 * Inspired by: Vercel, Linear, Stripe, Apple
 * 
 * Variants:
 * - primary: Solid cyan (CTA, high emphasis)
 * - secondary: Outlined neutral (medium emphasis)
 * - accent: Outlined cyan (branded secondary)
 * - ghost: Transparent (low emphasis, tertiary)
 * - danger: Red (destructive actions)
 * - subtle: Cyan tinted background (alternative primary)
 * 
 * @accessibility
 * - Respects prefers-reduced-motion via CSS
 * - Maintains keyboard navigation
 * - Proper focus indicators
 * - ARIA attributes for loading state
 */

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  pill = false,
  className = '',
  onClick,
  type = 'button',
  as = 'button',
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg'
  };

  // Variant classes (defined in buttons.css)
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
    subtle: 'btn-subtle'
  };

  const Component = as;
  const elementProps = as === 'button'
    ? { type, disabled: disabled || loading }
    : {};

  const classes = [
    'btn',
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && 'btn-full',
    pill && 'btn-pill',
    loading && 'btn-loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component
      className={classes}
      onClick={onClick}
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
    </Component>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'ghost', 'danger', 'subtle']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  pill: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
};

Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  pill: false,
  className: '',
  type: 'button',
  as: 'button'
};

export default Button;
