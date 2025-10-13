import { useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * Pattern generator functions for circuit line layouts
 */

/**
 * Generates a grid pattern with horizontal and vertical lines
 * @param {number} density - Number of lines to generate
 * @returns {Array} Array of path objects
 */
const generateGridPattern = (density) => {
  const paths = [];
  const maxPaths = Math.min(density, 20);
  const spacing = 100 / (maxPaths / 2);

  // Horizontal lines
  for (let i = 0; i < maxPaths / 2; i++) {
    const y = spacing * i;
    paths.push({
      id: `grid-h-${i}`,
      d: `M 0 ${y} L 100 ${y}`,
      length: 100
    });
  }

  // Vertical lines
  for (let i = 0; i < maxPaths / 2; i++) {
    const x = spacing * i;
    paths.push({
      id: `grid-v-${i}`,
      d: `M ${x} 0 L ${x} 100`,
      length: 100
    });
  }

  return paths.slice(0, maxPaths);
};

/**
 * Generates an organic pattern with bezier curves
 * @param {number} density - Number of curves to generate
 * @returns {Array} Array of path objects
 */
const generateOrganicPattern = (density) => {
  const paths = [];
  const maxPaths = Math.min(density, 20);

  for (let i = 0; i < maxPaths; i++) {
    // Random start and end points
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const endX = Math.random() * 100;
    const endY = Math.random() * 100;

    // Random control points for bezier curve
    const cp1X = Math.random() * 100;
    const cp1Y = Math.random() * 100;
    const cp2X = Math.random() * 100;
    const cp2Y = Math.random() * 100;

    const pathD = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
    
    // Approximate length for bezier curve
    const dx = endX - startX;
    const dy = endY - startY;
    const length = Math.sqrt(dx * dx + dy * dy) * 1.5;

    paths.push({
      id: `organic-${i}`,
      d: pathD,
      length
    });
  }

  return paths;
};

/**
 * Generates a torii pattern with lines converging to torii shape
 * @param {number} density - Number of lines to generate
 * @returns {Array} Array of path objects
 */
const generateToriiPattern = (density) => {
  const paths = [];
  const maxPaths = Math.min(density, 20);
  
  // Torii center point
  const centerX = 50;
  const centerY = 50;
  
  // Top horizontal beam (kasagi)
  paths.push({
    id: 'torii-top',
    d: `M 20 30 L 80 30`,
    length: 60
  });
  
  // Second horizontal beam (nuki)
  paths.push({
    id: 'torii-middle',
    d: `M 25 45 L 75 45`,
    length: 50
  });
  
  // Left pillar
  paths.push({
    id: 'torii-left',
    d: `M 30 30 L 30 80`,
    length: 50
  });
  
  // Right pillar
  paths.push({
    id: 'torii-right',
    d: `M 70 30 L 70 80`,
    length: 50
  });

  // Converging lines from edges to torii structure
  const remainingPaths = maxPaths - 4;
  for (let i = 0; i < remainingPaths; i++) {
    const angle = (i / remainingPaths) * Math.PI * 2;
    const startX = centerX + Math.cos(angle) * 45;
    const startY = centerY + Math.sin(angle) * 45;
    
    // Target points on torii structure
    const targets = [
      { x: 30, y: 30 }, // Top left
      { x: 70, y: 30 }, // Top right
      { x: 30, y: 55 }, // Middle left
      { x: 70, y: 55 }  // Middle right
    ];
    
    const target = targets[i % targets.length];
    const cpX = (startX + target.x) / 2 + (Math.random() - 0.5) * 20;
    const cpY = (startY + target.y) / 2 + (Math.random() - 0.5) * 20;
    
    const pathD = `M ${startX} ${startY} Q ${cpX} ${cpY} ${target.x} ${target.y}`;
    
    const dx = target.x - startX;
    const dy = target.y - startY;
    const length = Math.sqrt(dx * dx + dy * dy);

    paths.push({
      id: `torii-converge-${i}`,
      d: pathD,
      length
    });
  }

  return paths.slice(0, maxPaths);
};

/**
 * CircuitLines - Decorative circuit line patterns with animated particles
 * 
 * @component
 * @example
 * <CircuitLines pattern="torii" density="medium" animated />
 * 
 * @accessibility
 * - Marked as aria-hidden since purely decorative
 * - Does not interfere with content or navigation
 * - Respects prefers-reduced-motion for animations
 */
const CircuitLines = ({ 
  pattern = 'grid', 
  density = 'medium', 
  animated = true, 
  color = 'var(--cyan-neon, #00E5FF)' 
}) => {
  // Convert density to number
  const densityMap = {
    low: 8,
    medium: 14,
    high: 20
  };
  const densityValue = densityMap[density] || 14;

  // Generate paths based on pattern
  const paths = useMemo(() => {
    switch (pattern) {
      case 'grid':
        return generateGridPattern(densityValue);
      case 'organic':
        return generateOrganicPattern(densityValue);
      case 'torii':
        return generateToriiPattern(densityValue);
      default:
        return generateGridPattern(densityValue);
    }
  }, [pattern, densityValue]);

  return (
    <svg
      className="circuit-lines"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.3
      }}
    >
      <defs>
        {/* Gradient for particles */}
        <radialGradient id="particle-glow">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {paths.map((path) => (
        <g key={path.id}>
          {/* Circuit path with dash animation */}
          <path
            d={path.d}
            stroke={color}
            strokeWidth="0.2"
            fill="none"
            strokeDasharray={animated ? "2 2" : "none"}
            style={{
              strokeDashoffset: animated ? path.length : 0,
              animation: animated ? 'circuit-flow 3s linear infinite' : 'none'
            }}
          />
          
          {/* Animated particle */}
          {animated && (
            <circle
              r="0.5"
              fill="url(#particle-glow)"
              style={{
                filter: 'blur(0.5px)'
              }}
            >
              <animateMotion
                dur={`${3 + Math.random() * 2}s`}
                repeatCount="indefinite"
                path={path.d}
              />
            </circle>
          )}
        </g>
      ))}

      <style>
        {`
          @keyframes circuit-flow {
            to {
              stroke-dashoffset: 0;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .circuit-lines path,
            .circuit-lines circle {
              animation: none !important;
            }
          }
        `}
      </style>
    </svg>
  );
};

CircuitLines.propTypes = {
  /** Pattern type: 'grid', 'organic', or 'torii' */
  pattern: PropTypes.oneOf(['grid', 'organic', 'torii']),
  /** Density of circuit lines: 'low', 'medium', or 'high' */
  density: PropTypes.oneOf(['low', 'medium', 'high']),
  /** Whether to animate the circuit lines and particles */
  animated: PropTypes.bool,
  /** Color of the circuit lines (CSS color value) */
  color: PropTypes.string
};

export default CircuitLines;
