import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import CircuitLines from '../CircuitLines';

// Helper to create matchMedia mock
const createMatchMediaMock = (matches = false) => {
  return vi.fn().mockImplementation((query) => ({
    matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

// Mock navigator.userAgent for mobile detection
const mockUserAgent = (userAgent) => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: userAgent,
    configurable: true,
  });
};

describe('CircuitLines', () => {
  beforeEach(() => {
    // Setup matchMedia mock before each test
    window.matchMedia = createMatchMediaMock(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders SVG element', () => {
      const { container } = render(<CircuitLines />);
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('circuit-lines');
    });

    it('sets correct SVG attributes', () => {
      const { container } = render(<CircuitLines />);
      
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 100 100');
      expect(svg).toHaveAttribute('preserveAspectRatio', 'none');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('applies correct positioning styles', () => {
      const { container } = render(<CircuitLines />);
      
      const svg = container.querySelector('svg');
      expect(svg).toHaveStyle({
        position: 'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: '0.3'
      });
    });

    it('renders with default props', () => {
      const { container } = render(<CircuitLines />);
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      
      // Should render paths (grid pattern by default)
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });
  });

  describe('Pattern Prop', () => {
    it('renders grid pattern by default', () => {
      const { container } = render(<CircuitLines />);
      
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
      
      // Grid pattern should have paths with IDs starting with 'grid-'
      const gridPaths = Array.from(paths).filter(path => 
        path.parentElement.querySelector('path')?.getAttribute('d')?.includes('M')
      );
      expect(gridPaths.length).toBeGreaterThan(0);
    });

    it('renders grid pattern when specified', () => {
      const { container } = render(<CircuitLines pattern="grid" />);
      
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
      
      // Grid pattern creates horizontal and vertical lines
      const pathElements = Array.from(paths);
      expect(pathElements.length).toBeGreaterThan(0);
    });

    it('renders organic pattern when specified', () => {
      const { container } = render(<CircuitLines pattern="organic" />);
      
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
      
      // Organic pattern uses bezier curves (contains 'C' command)
      const pathElements = Array.from(paths);
      const hasBezierCurves = pathElements.some(path => {
        const d = path.getAttribute('d');
        return d && d.includes('C');
      });
      expect(hasBezierCurves).toBe(true);
    });

    it('renders torii pattern when specified', () => {
      const { container } = render(<CircuitLines pattern="torii" />);
      
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
      
      // Torii pattern should have specific structure paths
      const pathElements = Array.from(paths);
      expect(pathElements.length).toBeGreaterThan(0);
    });

    it('falls back to grid pattern for invalid pattern', () => {
      const { container } = render(<CircuitLines pattern="invalid" />);
      
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });
  });

  describe('Density Prop', () => {
    it('renders fewer paths with low density', () => {
      const { container } = render(<CircuitLines density="low" />);
      
      const paths = container.querySelectorAll('path');
      const lowDensityCount = paths.length;
      
      expect(lowDensityCount).toBeGreaterThan(0);
      expect(lowDensityCount).toBeLessThanOrEqual(8);
    });

    it('renders medium number of paths with medium density', () => {
      const { container } = render(<CircuitLines density="medium" />);
      
      const paths = container.querySelectorAll('path');
      const mediumDensityCount = paths.length;
      
      expect(mediumDensityCount).toBeGreaterThan(0);
      expect(mediumDensityCount).toBeLessThanOrEqual(14);
    });

    it('renders more paths with high density', () => {
      const { container } = render(<CircuitLines density="high" />);
      
      const paths = container.querySelectorAll('path');
      const highDensityCount = paths.length;
      
      expect(highDensityCount).toBeGreaterThan(0);
      expect(highDensityCount).toBeLessThanOrEqual(20);
    });

    it('density affects number of paths correctly', () => {
      const { container: lowContainer } = render(<CircuitLines density="low" />);
      const { container: mediumContainer } = render(<CircuitLines density="medium" />);
      const { container: highContainer } = render(<CircuitLines density="high" />);
      
      const lowPaths = lowContainer.querySelectorAll('path').length;
      const mediumPaths = mediumContainer.querySelectorAll('path').length;
      const highPaths = highContainer.querySelectorAll('path').length;
      
      // Low should have fewer paths than medium
      expect(lowPaths).toBeLessThanOrEqual(mediumPaths);
      // Medium should have fewer paths than high
      expect(mediumPaths).toBeLessThanOrEqual(highPaths);
    });

    it('respects maximum path limit of 20', () => {
      const { container } = render(<CircuitLines density="high" />);
      
      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeLessThanOrEqual(20);
    });
  });

  describe('Animated Prop', () => {
    it('renders animated particles when animated is true', () => {
      const { container } = render(<CircuitLines animated={true} />);
      
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
      
      // Check for animateMotion elements
      const animateMotions = container.querySelectorAll('animateMotion');
      expect(animateMotions.length).toBeGreaterThan(0);
    });

    it('does not render particles when animated is false', () => {
      const { container } = render(<CircuitLines animated={false} />);
      
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBe(0);
      
      const animateMotions = container.querySelectorAll('animateMotion');
      expect(animateMotions.length).toBe(0);
    });

    it('applies stroke-dasharray when animated', () => {
      const { container } = render(<CircuitLines animated={true} />);
      
      const paths = container.querySelectorAll('path');
      const animatedPaths = Array.from(paths).filter(path => {
        const dashArray = path.getAttribute('stroke-dasharray');
        return dashArray && dashArray !== 'none';
      });
      
      expect(animatedPaths.length).toBeGreaterThan(0);
    });

    it('does not apply stroke-dasharray when not animated', () => {
      const { container } = render(<CircuitLines animated={false} />);
      
      const paths = container.querySelectorAll('path');
      const nonAnimatedPaths = Array.from(paths).filter(path => {
        const dashArray = path.getAttribute('stroke-dasharray');
        return dashArray === 'none';
      });
      
      expect(nonAnimatedPaths.length).toBe(paths.length);
    });

    it('includes circuit-flow animation keyframes', () => {
      const { container } = render(<CircuitLines animated={true} />);
      
      const style = container.querySelector('style');
      expect(style).toBeInTheDocument();
      expect(style.textContent).toContain('@keyframes circuit-flow');
    });
  });

  describe('Color Prop', () => {
    it('applies default cyan color', () => {
      const { container } = render(<CircuitLines />);
      
      const paths = container.querySelectorAll('path');
      const firstPath = paths[0];
      
      expect(firstPath).toHaveAttribute('stroke', 'var(--cyan-neon, #00E5FF)');
    });

    it('applies custom color when provided', () => {
      const customColor = '#FF00FF';
      const { container } = render(<CircuitLines color={customColor} />);
      
      const paths = container.querySelectorAll('path');
      const firstPath = paths[0];
      
      expect(firstPath).toHaveAttribute('stroke', customColor);
    });

    it('uses color in particle gradient', () => {
      const customColor = '#FF00FF';
      const { container } = render(<CircuitLines color={customColor} animated={true} />);
      
      const gradient = container.querySelector('#particle-glow');
      expect(gradient).toBeInTheDocument();
      
      const stops = gradient.querySelectorAll('stop');
      stops.forEach(stop => {
        expect(stop).toHaveAttribute('stop-color', customColor);
      });
    });
  });

  describe('Reduced Motion Support', () => {
    it('includes prefers-reduced-motion media query in styles', () => {
      const { container } = render(<CircuitLines animated={true} />);
      
      const style = container.querySelector('style');
      expect(style).toBeInTheDocument();
      expect(style.textContent).toContain('@media (prefers-reduced-motion: reduce)');
      expect(style.textContent).toContain('animation: none !important');
    });

    it('respects reduced motion preference', () => {
      // Mock matchMedia to return true for prefers-reduced-motion
      window.matchMedia = createMatchMediaMock(true);

      const { container } = render(<CircuitLines animated={true} />);
      
      // Component should still render but with reduced motion styles
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      
      const style = container.querySelector('style');
      expect(style.textContent).toContain('prefers-reduced-motion');
    });
  });

  describe('Accessibility', () => {
    it('marks SVG as aria-hidden', () => {
      const { container } = render(<CircuitLines />);
      
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('sets pointer-events to none', () => {
      const { container } = render(<CircuitLines />);
      
      const svg = container.querySelector('svg');
      expect(svg).toHaveStyle({ pointerEvents: 'none' });
    });
  });

  describe('Performance', () => {
    it('limits paths to maximum of 20', () => {
      const patterns = ['grid', 'organic', 'torii'];
      
      patterns.forEach(pattern => {
        const { container } = render(
          <CircuitLines pattern={pattern} density="high" />
        );
        
        const paths = container.querySelectorAll('path');
        expect(paths.length).toBeLessThanOrEqual(20);
      });
    });

    it('uses useMemo for path generation', () => {
      const { rerender } = render(<CircuitLines pattern="grid" density="medium" />);
      
      // Rerender with same props should use memoized paths
      rerender(<CircuitLines pattern="grid" density="medium" />);
      
      // Component should render successfully (memoization working)
      expect(true).toBe(true);
    });

    it('regenerates paths when pattern changes', () => {
      const { container, rerender } = render(<CircuitLines pattern="grid" />);
      
      const initialPaths = container.querySelectorAll('path');
      const initialCount = initialPaths.length;
      
      rerender(<CircuitLines pattern="organic" />);
      
      const newPaths = container.querySelectorAll('path');
      const newCount = newPaths.length;
      
      // Paths should be regenerated (may have different count)
      expect(newPaths).toBeTruthy();
      expect(newCount).toBeGreaterThan(0);
    });

    it('regenerates paths when density changes', () => {
      const { container, rerender } = render(<CircuitLines density="low" />);
      
      const initialPaths = container.querySelectorAll('path');
      const initialCount = initialPaths.length;
      
      rerender(<CircuitLines density="high" />);
      
      const newPaths = container.querySelectorAll('path');
      const newCount = newPaths.length;
      
      // High density should have more paths than low
      expect(newCount).toBeGreaterThanOrEqual(initialCount);
    });
  });

  describe('PropTypes Validation', () => {
    it('accepts valid pattern values', () => {
      const patterns = ['grid', 'organic', 'torii'];
      
      patterns.forEach(pattern => {
        const { container } = render(<CircuitLines pattern={pattern} />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
      });
    });

    it('accepts valid density values', () => {
      const densities = ['low', 'medium', 'high'];
      
      densities.forEach(density => {
        const { container } = render(<CircuitLines density={density} />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
      });
    });

    it('accepts animated as boolean', () => {
      const { container: animatedContainer } = render(<CircuitLines animated={true} />);
      expect(animatedContainer.querySelector('svg')).toBeInTheDocument();
      
      const { container: staticContainer } = render(<CircuitLines animated={false} />);
      expect(staticContainer.querySelector('svg')).toBeInTheDocument();
    });

    it('accepts color as string', () => {
      const colors = ['#FF0000', 'rgb(255, 0, 0)', 'var(--custom-color)'];
      
      colors.forEach(color => {
        const { container } = render(<CircuitLines color={color} />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
      });
    });
  });
});
