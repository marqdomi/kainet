// src/components/effects/EnterpriseBackground.tsx
/**
 * EnterpriseBackground - Static gradient background inspired by Vercel/Linear/Stripe
 * 
 * Features:
 * - No animations = Zero GPU usage
 * - Mesh gradients for depth
 * - Noise texture for subtle texture
 * - Fully responsive to dark/light theme
 * 
 * @component
 */

import React from 'react';

interface EnterpriseBackgroundProps {
  className?: string;
}

const EnterpriseBackground: React.FC<EnterpriseBackgroundProps> = ({ className = '' }) => {
  return (
    <div 
      className={`enterprise-background ${className}`}
      aria-hidden="true"
    >
      {/* Base gradient layer */}
      <div className="enterprise-bg-base" />
      
      {/* Mesh gradient accents */}
      <div className="enterprise-bg-mesh" />
      
      {/* Subtle noise texture for depth */}
      <div className="enterprise-bg-noise" />
      
      {/* Top fade for navbar integration */}
      <div className="enterprise-bg-fade-top" />
      
      {/* Bottom fade */}
      <div className="enterprise-bg-fade-bottom" />
    </div>
  );
};

export default EnterpriseBackground;
