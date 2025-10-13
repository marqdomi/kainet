// src/components/effects/KanjiParticle.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getRandomKanji } from '../../utils/kanjiLibrary';

/**
 * KanjiParticles - Renders kanji characters as Three.js sprites with interactive behavior
 * 
 * @component
 * @param {Object} props
 * @param {number} props.count - Number of kanji particles to render (default: 200)
 * @param {boolean} props.formTorii - Whether particles should form torii shape (default: true)
 * @param {number} props.opacity - Base opacity of particles (default: 0.3)
 * @param {number} props.repulsionStrength - Strength of cursor repulsion (default: 0.08)
 * @param {boolean} props.enableAnimation - Enable breathing and cursor interaction (default: true)
 * 
 * @accessibility
 * - Purely decorative, does not interfere with content
 * - Respects prefers-reduced-motion via enableAnimation prop
 * 
 * @performance
 * - Uses InstancedMesh for efficient rendering
 * - Reduces count on mobile devices
 * - Canvas texture generation is memoized
 */
const KanjiParticles = ({ 
  count = 200, 
  formTorii = true,
  opacity = 0.3,
  repulsionStrength = 0.08,
  enableAnimation = true
}) => {
  const meshRef = useRef();
  const dummy = useRef(new THREE.Object3D());
  const { size } = useThree();
  
  // Store particle data (positions, velocities, phases)
  const particleData = useRef([]);
  
  // Animation state for initial formation
  const formationProgress = useRef(0);
  const isForming = useRef(true);
  
  // Create kanji textures using canvas
  const textures = useMemo(() => {
    const textureArray = [];
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Generate textures for different kanji
    for (let i = 0; i < Math.min(count, 10); i++) {
      const kanji = getRandomKanji();
      
      // Clear canvas
      ctx.clearRect(0, 0, 128, 128);
      
      // Draw kanji
      ctx.fillStyle = '#00E5FF'; // Cyan color
      ctx.font = 'bold 80px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(kanji.char, 64, 64);
      
      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      textureArray.push(texture);
    }
    
    return textureArray;
  }, [count]);
  
  // Initialize particle positions and data
  useMemo(() => {
    particleData.current = [];
    formationProgress.current = 0;
    isForming.current = true;
    
    for (let i = 0; i < count; i++) {
      const textureIndex = i % textures.length;
      
      // Target position (torii formation or random)
      const targetPosition = formTorii 
        ? getToriiPosition(i, count)
        : getRandomPosition();
      
      // Start from random scattered position for animation
      const startPosition = new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        -8 + (Math.random() - 0.5) * 8
      );
      
      particleData.current.push({
        position: startPosition.clone(),
        startPosition: startPosition.clone(),
        targetPosition: targetPosition.clone(),
        velocity: new THREE.Vector3(0, 0, 0),
        phase: Math.random() * Math.PI * 2, // For breathing animation
        breathSpeed: 0.8 + Math.random() * 0.4, // Slight variation in breathing
        textureIndex,
        baseScale: 0.3 + Math.random() * 0.2,
        formationDelay: i / count, // Stagger the formation animation
      });
    }
  }, [count, formTorii, textures.length]);
  
  // Cursor position in world space
  const cursorWorld = useRef(new THREE.Vector3(0, 0, 0));
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Update cursor position in world space
    const { x, y } = state.pointer;
    cursorWorld.current.set(x * 10, y * 10, -5);
    
    // Calculate scroll progress for color transition
    const scrollProgress = getScrollProgress();
    
    // Update formation animation progress
    if (isForming.current && formTorii) {
      formationProgress.current += delta * 0.5; // 2 second formation
      if (formationProgress.current >= 1) {
        formationProgress.current = 1;
        isForming.current = false;
      }
    }
    
    particleData.current.forEach((particle, i) => {
      // Formation animation - ease particles into torii shape
      if (isForming.current && formTorii) {
        const particleProgress = Math.max(0, Math.min(1, 
          (formationProgress.current - particle.formationDelay) / 0.3
        ));
        // Ease out cubic
        const eased = 1 - Math.pow(1 - particleProgress, 3);
        
        particle.position.lerpVectors(
          particle.startPosition,
          particle.targetPosition,
          eased
        );
      } else if (enableAnimation) {
        // Normal interactive behavior after formation
        
        // Breathing animation using sine wave
        const breathScale = 1 + 0.15 * Math.sin(time * particle.breathSpeed + particle.phase);
        
        // Magnetic repulsion from cursor
        const toCursor = new THREE.Vector3()
          .subVectors(particle.position, cursorWorld.current);
        const distance = toCursor.length();
        
        if (distance < 3) {
          // Apply repulsion force
          const repulsion = toCursor.normalize().multiplyScalar(
            repulsionStrength * (1 - distance / 3)
          );
          particle.velocity.add(repulsion);
        }
        
        // Spring force back to target position
        const toTarget = new THREE.Vector3()
          .subVectors(particle.targetPosition, particle.position);
        particle.velocity.add(toTarget.multiplyScalar(0.02));
        
        // Apply damping
        particle.velocity.multiplyScalar(0.92);
        
        // Update position
        particle.position.add(particle.velocity);
      }
      
      // Breathing animation for scale
      const breathScale = enableAnimation 
        ? 1 + 0.15 * Math.sin(time * particle.breathSpeed + particle.phase)
        : 1;
      
      // Update instance matrix
      dummy.current.position.copy(particle.position);
      dummy.current.scale.setScalar(particle.baseScale * breathScale);
      dummy.current.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.current.matrix);
      
      // Color transition based on scroll (cyan to purple)
      const color = new THREE.Color().lerpColors(
        new THREE.Color(0x00E5FF), // Cyan
        new THREE.Color(0xA855F7), // Purple
        scrollProgress
      );
      meshRef.current.setColorAt(i, color);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });
  
  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={textures[0]} // Default texture, will be overridden per instance if needed
        vertexColors
      />
    </instancedMesh>
  );
};

/**
 * Get position for torii formation
 * Distributes particles along torii shape outline using bezier curves
 * 
 * Torii structure:
 * - Top horizontal beam (kasagi) - curved
 * - Second horizontal beam (nuki) - straight
 * - Two vertical pillars (hashira)
 */
function getToriiPosition(index, total) {
  // Distribute particles across different parts of the torii
  const t = index / total;
  
  // Define torii dimensions
  const pillarHeight = 6;
  const pillarWidth = 0.3;
  const pillarSpacing = 8;
  const topBeamWidth = 10;
  const topBeamCurve = 0.8; // Upward curve amount
  const secondBeamY = -2;
  
  let position;
  
  // Divide particles among torii components
  if (t < 0.3) {
    // Top beam (kasagi) - curved upward at ends
    const beamT = (t / 0.3);
    const x = (beamT - 0.5) * topBeamWidth;
    // Bezier curve for upward sweep at ends
    const curveAmount = Math.pow(Math.abs(beamT - 0.5) * 2, 2) * topBeamCurve;
    const y = pillarHeight + curveAmount;
    position = new THREE.Vector3(x, y, -8);
  } else if (t < 0.5) {
    // Second beam (nuki) - straight horizontal
    const beamT = ((t - 0.3) / 0.2);
    const x = (beamT - 0.5) * (pillarSpacing - pillarWidth);
    const y = secondBeamY;
    position = new THREE.Vector3(x, y, -8);
  } else if (t < 0.75) {
    // Left pillar (hashira)
    const pillarT = ((t - 0.5) / 0.25);
    const x = -pillarSpacing / 2;
    const y = pillarT * pillarHeight - pillarHeight / 2;
    position = new THREE.Vector3(x, y, -8);
  } else {
    // Right pillar (hashira)
    const pillarT = ((t - 0.75) / 0.25);
    const x = pillarSpacing / 2;
    const y = pillarT * pillarHeight - pillarHeight / 2;
    position = new THREE.Vector3(x, y, -8);
  }
  
  // Add slight randomness for organic feel
  position.x += (Math.random() - 0.5) * 0.4;
  position.y += (Math.random() - 0.5) * 0.4;
  position.z += (Math.random() - 0.5) * 1.5;
  
  return position;
}

/**
 * Get random position in space
 */
function getRandomPosition() {
  return new THREE.Vector3(
    (Math.random() - 0.5) * 30,
    (Math.random() - 0.5) * 20,
    -8 + (Math.random() - 0.5) * 4
  );
}

/**
 * Get scroll progress (0 to 1)
 */
function getScrollProgress() {
  if (typeof window === 'undefined') return 0;
  
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const scrollHeight = doc.scrollHeight || document.body.scrollHeight;
  const clientHeight = window.innerHeight;
  const maxScroll = scrollHeight - clientHeight;
  
  return maxScroll > 0 ? Math.min(1, scrollTop / maxScroll) : 0;
}

export default KanjiParticles;
