// src/components/ui/Skeleton.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Skeleton Component - Loading placeholders
 */

const Skeleton = ({ 
  variant = 'text',
  width,
  height,
  className = '',
  ...props 
}) => {
  const baseStyles = `
    bg-[var(--gray-800)]
    animate-pulse
    rounded
  `;

  const variants = {
    text: 'h-4 w-full rounded',
    title: 'h-8 w-3/4 rounded',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-48 w-full rounded-xl',
    button: 'h-10 w-24 rounded-lg'
  };

  const style = {
    width: width,
    height: height
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={style}
      {...props}
    />
  );
};

Skeleton.propTypes = {
  variant: PropTypes.oneOf(['text', 'title', 'avatar', 'card', 'button']),
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string
};

export default Skeleton;
