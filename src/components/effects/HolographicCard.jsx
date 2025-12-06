import React from 'react';
import PropTypes from 'prop-types';
import Card from '../ui/Card';

/**
 * HolographicCard - DEPRECATED in v3.0
 * 
 * This component has been deprecated in favor of the simplified Card component
 * with glassmorphic styling. The holographic effects (shimmer, scanning line,
 * ripple) have been removed for better performance and cleaner design.
 * 
 * Migration guide:
 * - Replace <HolographicCard> with <Card variant="default" hover>
 * - For featured cards, use <Card variant="featured" hover>
 * - All holographic, scanningLine, and rippleOnClick props are now ignored
 * 
 * @deprecated Use Card component instead
 * @component
 */
const HolographicCard = ({
  children,
  holographic = false,  // Ignored
  scanningLine = false, // Ignored
  rippleOnClick = false, // Ignored
  variant = 'default',
  className = '',
  ...props
}) => {
  // Simply render the new Card component with appropriate variant
  const cardVariant = variant === 'featured' ? 'featured' : 'default';
  
  // Log deprecation warning in development (only once per component type)
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[DEPRECATED] HolographicCard is deprecated. ' +
        'Please use <Card variant="' + cardVariant + '" hover> instead.'
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card
      variant={cardVariant}
      hover
      padding="lg"
      className={className}
      {...props}
    >
      {children}
    </Card>
  );
};

HolographicCard.propTypes = {
  children: PropTypes.node.isRequired,
  holographic: PropTypes.bool,
  scanningLine: PropTypes.bool,
  rippleOnClick: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'featured']),
  className: PropTypes.string,
};

export default HolographicCard;
