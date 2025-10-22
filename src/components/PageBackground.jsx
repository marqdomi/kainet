import React, { Suspense } from 'react';
import OGLParticles from './effects/OGLParticles';

/**
 * PageBackground Component
 * 
 * Reemplaza BackgroundCanvas con ogl para mejor rendimiento
 * - 80% más ligero que Three.js
 * - Mejor en móviles
 * - Colores de Kainet (cyan + blanco)
 */
const PageBackground = ({ 
  variant = 'default',
  className = '' 
}) => {
  // Configuraciones para diferentes secciones
  const configs = {
    default: {
      particleCount: 150,
      particleSpread: 12,
      speed: 0.08,
      particleColors: ['#00E5FF', '#ffffff', '#00E5FF'],
      particleBaseSize: 120,
      sizeRandomness: 0.6,
      alphaParticles: true,
      moveParticlesOnHover: true,
      particleHoverFactor: 0.5,
      cameraDistance: 25,
      disableRotation: false
    },
    hero: {
      particleCount: 200,
      particleSpread: 14,
      speed: 0.12,
      particleColors: ['#00E5FF', '#ffffff', '#00E5FF'],
      particleBaseSize: 140,
      sizeRandomness: 0.8,
      alphaParticles: true,
      moveParticlesOnHover: true,
      particleHoverFactor: 0.6,
      cameraDistance: 30,
      disableRotation: false
    },
    minimal: {
      particleCount: 80,
      particleSpread: 8,
      speed: 0.06,
      particleColors: ['#00E5FF', '#ffffff'],
      particleBaseSize: 100,
      sizeRandomness: 0.4,
      alphaParticles: true,
      moveParticlesOnHover: false,
      particleHoverFactor: 0,
      cameraDistance: 20,
      disableRotation: true
    }
  };

  const config = configs[variant] || configs.default;

  return (
    <div className={`page-background fixed inset-0 -z-10 ${className}`}>
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        <OGLParticles {...config} className="w-full h-full" />
      </Suspense>
    </div>
  );
};

export default PageBackground;
