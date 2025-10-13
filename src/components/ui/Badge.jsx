// src/components/ui/Badge.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { getKanjiByCategory } from '../../utils/kanjiLibrary';
import useReducedMotion from '../../hooks/useReducedMotion';

/**
 * Badge Component - Design System
 * 
 * Enhanced with Japanese cyberpunk elements:
 * - Optional kanji prefix based on category
 * - Glow animation for featured badges
 * 
 * Used for: categories, tags, status indicators
 * 
 * @accessibility
 * - Kanji is decorative and aria-hidden
 * - Respects prefers-reduced-motion for glow animation
 */

const Badge = ({ 
  children,
  variant = 'default',
  size = 'md',
  kanji = null,
  featured = false,
  className = '',
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Get kanji character if kanji prop is provided
  // Can be either a category string or boolean true for auto-detection
  let kanjiChar = null;
  if (kanji) {
    if (typeof kanji === 'string') {
      // Use provided category to get kanji
      const kanjiObj = getKanjiByCategory(kanji);
      kanjiChar = kanjiObj.char;
    } else if (typeof kanji === 'boolean' && typeof children === 'string') {
      // Try to auto-detect from children text
      const kanjiObj = getKanjiByCategory(children);
      kanjiChar = kanjiObj.char;
    }
  }
  const baseStyles = `
    inline-flex items-center gap-1
    rounded-full
    font-medium
    uppercase
    letter-spacing-wider
    transition-colors duration-200
    ${featured && !prefersReducedMotion ? 'badge-glow' : ''}
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

  const kanjiSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-[13px]'
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {kanjiChar && (
        <span 
          className={`kanji-prefix ${kanjiSizes[size]} opacity-80`}
          aria-hidden="true"
        >
          {kanjiChar}
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'purple', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  kanji: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  featured: PropTypes.bool,
  className: PropTypes.string
};

export default Badge;
