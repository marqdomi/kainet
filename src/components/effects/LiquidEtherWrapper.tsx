import { useEffect, useState } from 'react';
// @ts-ignore - LiquidEther is JSX
import LiquidEther from './LiquidEther.jsx';
import LiquidEtherCanvas from './LiquidEtherCanvas.tsx';

interface LiquidEtherWrapperProps {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  resolution?: number;
  isBounce?: boolean;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * LiquidEtherWrapper - Automatically selects between WebGL and Canvas 2D
 * - Tries WebGL (LiquidEther) first for best quality
 * - Falls back to Canvas 2D (LiquidEtherCanvas) if WebGL fails
 * 
 * This ensures the component works everywhere while maintaining best performance
 */
export default function LiquidEtherWrapper({
  colors = ['#00E5FF', '#5227FF', '#B19EEF'],
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 3000,
  autoRampDuration = 0.6,
  style = {},
  className = '',
}: LiquidEtherWrapperProps) {
  const [useCanvas2D, setUseCanvas2D] = useState(false);
  const [hasTriedWebGL, setHasTriedWebGL] = useState(false);

  useEffect(() => {
    // Check if WebGL is supported
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      // WebGL not supported, use Canvas 2D
      setUseCanvas2D(true);
      setHasTriedWebGL(true);
      return;
    }

    // WebGL is available, try to use it
    setHasTriedWebGL(true);
  }, []);

  // Show nothing until we've checked WebGL support
  if (!hasTriedWebGL) {
    return <div className={className} />;
  }

  // Use Canvas 2D if WebGL failed or not supported
  if (useCanvas2D) {
    return (
      <LiquidEtherCanvas
        colors={colors}
        mouseForce={mouseForce}
        cursorSize={cursorSize}
        resolution={resolution}
        autoDemo={autoDemo}
        autoSpeed={autoSpeed}
        autoIntensity={autoIntensity}
      />
    );
  }

  // Use WebGL (LiquidEther) if available
  return (
    <LiquidEther
      colors={colors}
      mouseForce={mouseForce}
      cursorSize={cursorSize}
      isViscous={isViscous}
      viscous={viscous}
      iterationsViscous={iterationsViscous}
      iterationsPoisson={iterationsPoisson}
      dt={dt}
      BFECC={BFECC}
      resolution={resolution}
      isBounce={isBounce}
      autoDemo={autoDemo}
      autoSpeed={autoSpeed}
      autoIntensity={autoIntensity}
      takeoverDuration={takeoverDuration}
      autoResumeDelay={autoResumeDelay}
      autoRampDuration={autoRampDuration}
      style={style}
      className={className}
    />
  );
}
