import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import BackgroundCanvas from '../BackgroundCanvas';

// Mock the entire BackgroundCanvas to test integration points
// We'll create a simplified version that maintains the same props interface
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children, camera, dpr, performance, gl, eventPrefix }) => {
    // Store props for testing
    const canvasProps = {
      'data-testid': 'r3f-canvas',
      'data-camera': JSON.stringify(camera),
      'data-dpr': JSON.stringify(dpr),
      'data-performance': JSON.stringify(performance),
      'data-gl': JSON.stringify(gl),
      'eventPrefix': eventPrefix,
    };
    
    // Render children in a safe way
    return (
      <div {...canvasProps}>
        {typeof children === 'function' ? null : children}
      </div>
    );
  },
  useFrame: vi.fn(),
  useThree: vi.fn(() => ({
    camera: { position: { set: vi.fn() } },
    size: { width: 1920, height: 1080 },
    pointer: { x: 0, y: 0 },
  })),
}));

// Mock React Three Drei
vi.mock('@react-three/drei', () => ({
  Points: () => null,
  PointMaterial: () => null,
}));

// Mock React Three Postprocessing
vi.mock('@react-three/postprocessing', () => ({
  EffectComposer: ({ children }) => (
    <div data-testid="r3f-effect-composer">{children}</div>
  ),
  Bloom: (props) => <div data-testid="r3f-bloom" data-intensity={props.intensity} />,
}));

// Mock KanjiParticles component - this is what we're testing integration with
vi.mock('../effects/KanjiParticle', () => ({
  default: ({ count, formTorii, opacity, repulsionStrength, enableAnimation }) => (
    <div
      data-testid="kanji-particles"
      data-count={count}
      data-form-torii={String(formTorii)}
      data-opacity={opacity}
      data-repulsion-strength={repulsionStrength}
      data-enable-animation={String(enableAnimation)}
    />
  ),
}));

// Helper to create matchMedia mock
const createMatchMediaMock = (matches = false) => {
  const listeners = [];
  return vi.fn().mockImplementation((query) => ({
    matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
    media: query,
    onchange: null,
    addListener: (handler) => listeners.push(handler),
    removeListener: (handler) => {
      const index = listeners.indexOf(handler);
      if (index > -1) listeners.splice(index, 1);
    },
    addEventListener: (event, handler) => {
      if (event === 'change') listeners.push(handler);
    },
    removeEventListener: (event, handler) => {
      const index = listeners.indexOf(handler);
      if (index > -1) listeners.splice(index, 1);
    },
    dispatchEvent: vi.fn(),
    _listeners: listeners,
  }));
};

// Helper to detect mobile
const setMobileUserAgent = (isMobile = true) => {
  Object.defineProperty(window.navigator, 'userAgent', {
    writable: true,
    configurable: true,
    value: isMobile
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
      : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  });
};

describe('BackgroundCanvas Integration Tests', () => {
  let originalUserAgent;
  let originalInnerWidth;

  beforeEach(() => {
    // Store original values
    originalUserAgent = window.navigator.userAgent;
    originalInnerWidth = window.innerWidth;

    // Setup default matchMedia mock
    window.matchMedia = createMatchMediaMock(false);

    // Setup default desktop environment
    setMobileUserAgent(false);
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    
    // Restore original values
    Object.defineProperty(window.navigator, 'userAgent', {
      writable: true,
      configurable: true,
      value: originalUserAgent,
    });
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  describe('Kanji Particles Rendering', () => {
    it('renders kanji particles correctly', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      const kanjiParticles = getByTestId('kanji-particles');
      expect(kanjiParticles).toBeInTheDocument();
    });

    it('renders kanji particles with correct default count on desktop', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      const kanjiParticles = getByTestId('kanji-particles');
      expect(kanjiParticles).toHaveAttribute('data-count', '200');
    });

    it('renders kanji particles with torii formation enabled', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      const kanjiParticles = getByTestId('kanji-particles');
      expect(kanjiParticles).toHaveAttribute('data-form-torii', 'true');
    });

    it('passes correct opacity to kanji particles', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      const kanjiParticles = getByTestId('kanji-particles');
      expect(kanjiParticles).toHaveAttribute('data-opacity', '0.3');
    });

    it('passes correct repulsion strength to kanji particles', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      const kanjiParticles = getByTestId('kanji-particles');
      expect(kanjiParticles).toHaveAttribute('data-repulsion-strength', '0.08');
    });

    it('enables animation by default', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      const kanjiParticles = getByTestId('kanji-particles');
      expect(kanjiParticles).toHaveAttribute('data-enable-animation', 'true');
    });
  });

  describe('Cursor Interaction', () => {
    it('renders canvas with event handling enabled', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      const canvas = getByTestId('r3f-canvas');
      expect(canvas).toBeInTheDocument();
      expect(canvas).toHaveAttribute('eventPrefix', 'client');
    });

    it('passes repulsion strength for cursor interaction', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      const kanjiParticles = getByTestId('kanji-particles');
      // Verify repulsion strength is set (used for cursor interaction)
      expect(kanjiParticles).toHaveAttribute('data-repulsion-strength', '0.08');
    });

    it('enables animation for cursor interaction effects', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      const kanjiParticles = getByTestId('kanji-particles');
      expect(kanjiParticles).toHaveAttribute('data-enable-animation', 'true');
    });
  });

  describe('Mobile Optimization', () => {
    // Note: Mobile detection (isMobile) is evaluated at module load time in BackgroundCanvas
    // These tests verify the desktop behavior since we can't change isMobile after module load
    
    it('verifies desktop configuration is applied in test environment', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      const kanjiParticles = getByTestId('kanji-particles');
      // In test environment (desktop), should have 200 particles
      // In real mobile, this would be 80
      expect(kanjiParticles).toHaveAttribute('data-count', '200');
    });

    it('enables bloom effect on desktop', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      // Bloom should be rendered on desktop
      const bloom = getByTestId('r3f-bloom');
      expect(bloom).toBeInTheDocument();
    });

    it('sets desktop DPR configuration', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      const canvas = getByTestId('r3f-canvas');
      expect(canvas).toHaveAttribute('data-dpr');
      const dpr = JSON.parse(canvas.getAttribute('data-dpr'));
      // Desktop should have DPR [1, 2]
      // Mobile would have [1, 1.5]
      expect(dpr).toEqual([1, 2]);
    });

    it('enables antialiasing on desktop for better quality', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      const canvas = getByTestId('r3f-canvas');
      expect(canvas).toHaveAttribute('data-gl');
      const gl = JSON.parse(canvas.getAttribute('data-gl'));
      // Desktop should have antialiasing enabled
      // Mobile would have it disabled for performance
      expect(gl.antialias).toBe(true);
    });
  });

  describe('Reduced Motion Support', () => {
    it('disables animations when prefers-reduced-motion is enabled', () => {
      // Mock matchMedia to return true for prefers-reduced-motion
      window.matchMedia = createMatchMediaMock(true);

      const { getByTestId } = render(<BackgroundCanvas />);

      const kanjiParticles = getByTestId('kanji-particles');
      expect(kanjiParticles).toHaveAttribute('data-enable-animation', 'false');
    });

    it('reduces particle count when reduced motion is enabled', () => {
      // Mock matchMedia to return true for prefers-reduced-motion
      window.matchMedia = createMatchMediaMock(true);

      const { getByTestId } = render(<BackgroundCanvas />);

      const kanjiParticles = getByTestId('kanji-particles');
      // Should reduce to 50% of normal count (200 * 0.5 = 100)
      expect(kanjiParticles).toHaveAttribute('data-count', '100');
    });

    it('enables animations when reduced motion is disabled', () => {
      // Mock matchMedia to return false for prefers-reduced-motion
      window.matchMedia = createMatchMediaMock(false);

      const { getByTestId } = render(<BackgroundCanvas />);

      const kanjiParticles = getByTestId('kanji-particles');
      expect(kanjiParticles).toHaveAttribute('data-enable-animation', 'true');
    });

    it('maintains full particle count when reduced motion is disabled', () => {
      // Mock matchMedia to return false for prefers-reduced-motion
      window.matchMedia = createMatchMediaMock(false);

      const { getByTestId } = render(<BackgroundCanvas />);

      const kanjiParticles = getByTestId('kanji-particles');
      expect(kanjiParticles).toHaveAttribute('data-count', '200');
    });

    it('respects reduced motion preference changes', () => {
      // Note: This test verifies that the component uses the usePrefersReducedMotion hook
      // The actual dynamic behavior is tested in the hook itself
      // Here we just verify that different initial states work correctly
      
      // Test with reduced motion enabled from start
      window.matchMedia = createMatchMediaMock(true);
      const { getByTestId: getByTestId1, unmount: unmount1 } = render(<BackgroundCanvas />);
      const kanjiParticles1 = getByTestId1('kanji-particles');
      expect(kanjiParticles1).toHaveAttribute('data-enable-animation', 'false');
      unmount1();
      
      // Test with reduced motion disabled from start
      window.matchMedia = createMatchMediaMock(false);
      const { getByTestId: getByTestId2 } = render(<BackgroundCanvas />);
      const kanjiParticles2 = getByTestId2('kanji-particles');
      expect(kanjiParticles2).toHaveAttribute('data-enable-animation', 'true');
    });
  });

  describe('Component Structure', () => {
    it('renders canvas with fixed positioning', () => {
      const { container } = render(<BackgroundCanvas />);

      const wrapper = container.querySelector('.fixed');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('inset-0');
      expect(wrapper).toHaveClass('-z-10');
    });

    it('renders canvas with pointer-events-none', () => {
      const { container } = render(<BackgroundCanvas />);

      const wrapper = container.querySelector('.pointer-events-none');
      expect(wrapper).toBeInTheDocument();
    });

    it('renders kanji particles layer', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      // Should render kanji particles (the main integration point we're testing)
      const kanjiParticles = getByTestId('kanji-particles');
      expect(kanjiParticles).toBeInTheDocument();
      
      // Verify it's integrated with the canvas
      const canvas = getByTestId('r3f-canvas');
      expect(canvas).toContainElement(kanjiParticles);
    });

    it('renders effect composer on desktop', () => {
      setMobileUserAgent(false);
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });

      const { getByTestId } = render(<BackgroundCanvas />);

      const effectComposer = getByTestId('r3f-effect-composer');
      expect(effectComposer).toBeInTheDocument();
    });
  });

  describe('Performance Configuration', () => {
    it('sets performance minimum threshold', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      const canvas = getByTestId('r3f-canvas');
      expect(canvas).toHaveAttribute('data-performance');
      const performance = JSON.parse(canvas.getAttribute('data-performance'));
      expect(performance.min).toBe(0.5);
    });

    it('configures camera with correct position and FOV', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      const canvas = getByTestId('r3f-canvas');
      expect(canvas).toHaveAttribute('data-camera');
      const camera = JSON.parse(canvas.getAttribute('data-camera'));
      expect(camera.position).toEqual([0, 0, 8]);
      expect(camera.fov).toBe(60);
    });

    it('sets high-performance power preference', () => {
      const { getByTestId } = render(<BackgroundCanvas />);

      const canvas = getByTestId('r3f-canvas');
      expect(canvas).toHaveAttribute('data-gl');
      const gl = JSON.parse(canvas.getAttribute('data-gl'));
      expect(gl.powerPreference).toBe('high-performance');
    });
  });

  describe('Combined Scenarios', () => {
    it('handles mobile with reduced motion correctly', () => {
      // Note: isMobile is evaluated at module load time, so we can't change it in tests
      // This test verifies that reduced motion works correctly
      // In a real mobile environment, the count would be 80 * 0.5 = 40
      // In test environment (desktop), it's 200 * 0.5 = 100
      
      // Enable reduced motion
      window.matchMedia = createMatchMediaMock(true);

      const { getByTestId, queryByTestId } = render(<BackgroundCanvas />);

      const kanjiParticles = getByTestId('kanji-particles');
      
      // Should have reduced count for reduced motion (200 * 0.5 = 100 in test environment)
      // In real mobile, this would be 80 * 0.5 = 40
      expect(kanjiParticles).toHaveAttribute('data-count', '100');
      
      // Should disable animations
      expect(kanjiParticles).toHaveAttribute('data-enable-animation', 'false');
      
      // Bloom rendering depends on isMobile which is set at module load
      // In test environment (desktop), bloom is rendered
      const bloom = queryByTestId('r3f-bloom');
      expect(bloom).toBeInTheDocument();
    });

    it('handles desktop with reduced motion correctly', () => {
      // Set desktop environment
      setMobileUserAgent(false);
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });

      // Enable reduced motion
      window.matchMedia = createMatchMediaMock(true);

      const { getByTestId } = render(<BackgroundCanvas />);

      const kanjiParticles = getByTestId('kanji-particles');
      
      // Should have reduced count for reduced motion (200 * 0.5 = 100)
      expect(kanjiParticles).toHaveAttribute('data-count', '100');
      
      // Should disable animations
      expect(kanjiParticles).toHaveAttribute('data-enable-animation', 'false');
      
      // Should still render bloom on desktop
      const bloom = getByTestId('r3f-bloom');
      expect(bloom).toBeInTheDocument();
    });

    it('maintains all features on desktop without reduced motion', () => {
      // Set desktop environment
      setMobileUserAgent(false);
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });

      // Disable reduced motion
      window.matchMedia = createMatchMediaMock(false);

      const { getByTestId } = render(<BackgroundCanvas />);

      const kanjiParticles = getByTestId('kanji-particles');
      
      // Should have full count
      expect(kanjiParticles).toHaveAttribute('data-count', '200');
      
      // Should enable animations
      expect(kanjiParticles).toHaveAttribute('data-enable-animation', 'true');
      
      // Should render bloom
      const bloom = getByTestId('r3f-bloom');
      expect(bloom).toBeInTheDocument();
      
      // Should have torii formation
      expect(kanjiParticles).toHaveAttribute('data-form-torii', 'true');
      
      // Should have cursor interaction
      expect(kanjiParticles).toHaveAttribute('data-repulsion-strength', '0.08');
    });
  });
});
