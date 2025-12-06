// src/components/ui/Input.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Input Component - Design System
 * 
 * Types: text, email, textarea
 */

const Input = React.forwardRef(({
  type = 'text',
  label,
  error,
  helperText,
  className = '',
  ...props
}, ref) => {
  const baseStyles = `
    w-full
    bg-[var(--gray-900)]
    border border-[var(--gray-700)]
    rounded-lg
    px-3 sm:px-[var(--input-padding-x)] py-3 sm:py-[var(--input-padding-y)]
    text-[var(--text-primary)]
    font-[var(--font-primary)]
    text-base
    min-h-[48px]
    transition-all duration-200
    focus:outline-none focus:border-[var(--cyan-neon)] focus:ring-2 focus:ring-[rgba(0,229,255,0.1)]
    placeholder:text-[var(--text-tertiary)]
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-[var(--red-error)] focus:border-[var(--red-error)] focus:ring-[rgba(239,68,68,0.1)]' : ''}
  `;

  const InputElement = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
          {label}
        </label>
      )}
      <InputElement
        ref={ref}
        type={type === 'textarea' ? undefined : type}
        className={`${baseStyles} ${type === 'textarea' ? 'min-h-[120px] resize-vertical' : ''} ${className}`}
        {...props}
      />
      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-[var(--red-error)]' : 'text-[var(--text-tertiary)]'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'textarea']),
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string
};

export default Input;
