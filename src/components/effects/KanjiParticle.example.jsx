/**
 * KanjiParticle Example Usage
 * 
 * This file demonstrates how to use the KanjiParticles component
 * in a Three.js Canvas context.
 */

import React from 'react';
import { Canvas } from '@react-three/fiber';
import KanjiParticles from './KanjiParticle';

/**
 * Example 1: Basic usage with torii formation
 */
export const BasicExample = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <KanjiParticles 
        count={200}
        formTorii={true}
        opacity={0.3}
        repulsionStrength={0.08}
        enableAnimation={true}
      />
    </Canvas>
  </div>
);

/**
 * Example 2: Mobile-optimized version with fewer particles
 */
export const MobileExample = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <KanjiParticles 
        count={80}
        formTorii={true}
        opacity={0.3}
        repulsionStrength={0.08}
        enableAnimation={true}
      />
    </Canvas>
  </div>
);

/**
 * Example 3: Random distribution without torii formation
 */
export const RandomExample = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <KanjiParticles 
        count={150}
        formTorii={false}
        opacity={0.4}
        repulsionStrength={0.1}
        enableAnimation={true}
      />
    </Canvas>
  </div>
);

/**
 * Example 4: Reduced motion (accessibility)
 */
export const ReducedMotionExample = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <KanjiParticles 
        count={200}
        formTorii={true}
        opacity={0.3}
        repulsionStrength={0}
        enableAnimation={false}
      />
    </Canvas>
  </div>
);

export default BasicExample;
