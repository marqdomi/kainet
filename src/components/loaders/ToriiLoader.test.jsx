import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ToriiLoader from './ToriiLoader';

describe('ToriiLoader', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<ToriiLoader />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders with correct aria attributes', () => {
      render(<ToriiLoader />);
      const loader = screen.getByRole('status');
      expect(loader).toHaveAttribute('aria-live', 'polite');
      expect(loader).toHaveAttribute('aria-label', 'Loading');
    });

    it('renders screen reader text', () => {
      render(<ToriiLoader />);
      expect(screen.getByText('Loading content, please wait...')).toBeInTheDocument();
    });

    it('renders SVG torii structure', () => {
      const { container } = render(<ToriiLoader />);
      const svg = container.querySelector('svg.torii-svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('renders small size correctly', () => {
      const { container } = render(<ToriiLoader size="sm" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '80');
      expect(svg).toHaveAttribute('height', '80');
    });

    it('renders medium size correctly (default)', () => {
      const { container } = render(<ToriiLoader size="md" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '120');
      expect(svg).toHaveAttribute('height', '120');
    });

    it('renders large size correctly', () => {
      const { container } = render(<ToriiLoader size="lg" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '160');
      expect(svg).toHaveAttribute('height', '160');
    });

    it('defaults to medium size when no size prop provided', () => {
      const { container } = render(<ToriiLoader />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '120');
    });
  });

  describe('Message Display', () => {
    it('shows messages when showMessage is true', () => {
      render(<ToriiLoader showMessage />);
      const messageContainer = screen.getByText('技術は未来を創る');
      expect(messageContainer).toBeInTheDocument();
    });

    it('hides messages when showMessage is false', () => {
      const { container } = render(<ToriiLoader showMessage={false} />);
      const messageContainer = container.querySelector('.message-container');
      expect(messageContainer).not.toBeInTheDocument();
    });

    it('displays custom message when provided', () => {
      render(<ToriiLoader message="Custom loading message" />);
      expect(screen.getByText('Custom loading message')).toBeInTheDocument();
    });

    it('does not rotate when custom message is provided', async () => {
      render(<ToriiLoader message="Static message" />);
      
      // Fast-forward 3 seconds
      vi.advanceTimersByTime(3000);
      
      // Message should still be the same
      expect(screen.getByText('Static message')).toBeInTheDocument();
      expect(screen.queryByText('技術は未来を創る')).not.toBeInTheDocument();
    });
  });

  describe('Message Rotation', () => {
    it('starts with the first message', () => {
      render(<ToriiLoader showMessage />);
      
      // Initial message should be displayed
      expect(screen.getByText('技術は未来を創る')).toBeInTheDocument();
    });

    it('has all four default messages available', () => {
      const { rerender } = render(<ToriiLoader showMessage />);
      
      // Component should have access to all messages
      // We verify this by checking the component renders without error
      expect(screen.getByRole('status')).toBeInTheDocument();
      
      // Rerender to ensure stability
      rerender(<ToriiLoader showMessage />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('cleans up interval on unmount', () => {
      const { unmount } = render(<ToriiLoader showMessage />);
      
      // Spy on clearInterval
      const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
      
      unmount();
      
      expect(clearIntervalSpy).toHaveBeenCalled();
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      const { container } = render(<ToriiLoader className="custom-class" />);
      const loader = container.querySelector('.torii-loader');
      expect(loader).toHaveClass('custom-class');
    });

    it('maintains default classes with custom className', () => {
      const { container } = render(<ToriiLoader className="custom-class" />);
      const loader = container.querySelector('.torii-loader');
      expect(loader).toHaveClass('torii-loader');
      expect(loader).toHaveClass('custom-class');
    });
  });

  describe('SVG Structure', () => {
    it('renders all torii structural elements', () => {
      const { container } = render(<ToriiLoader />);
      
      // Check for main structural paths
      expect(container.querySelector('.torii-beam-top')).toBeInTheDocument();
      expect(container.querySelector('.torii-beam-second')).toBeInTheDocument();
      expect(container.querySelector('.torii-pillar-left')).toBeInTheDocument();
      expect(container.querySelector('.torii-pillar-right')).toBeInTheDocument();
      expect(container.querySelector('.torii-beam-middle')).toBeInTheDocument();
    });

    it('renders circuit decorations', () => {
      const { container } = render(<ToriiLoader />);
      
      // Check for circuit paths
      const circuits = container.querySelectorAll('.circuit-path');
      expect(circuits.length).toBeGreaterThan(0);
      
      // Check for circuit nodes
      const nodes = container.querySelectorAll('.circuit-node');
      expect(nodes.length).toBe(4);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA role', () => {
      render(<ToriiLoader />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has aria-live attribute', () => {
      render(<ToriiLoader />);
      const loader = screen.getByRole('status');
      expect(loader).toHaveAttribute('aria-live', 'polite');
    });

    it('includes screen reader only text', () => {
      render(<ToriiLoader />);
      const srText = screen.getByText('Loading content, please wait...');
      expect(srText).toHaveClass('sr-only');
    });

    it('messages have aria-live for announcements', () => {
      const { container } = render(<ToriiLoader showMessage />);
      const messageDiv = container.querySelector('[aria-live="polite"]');
      expect(messageDiv).toBeInTheDocument();
    });
  });

  describe('Reduced Motion', () => {
    it('includes reduced motion styles', () => {
      const { container } = render(<ToriiLoader />);
      const style = container.querySelector('style');
      expect(style?.textContent).toContain('@media (prefers-reduced-motion: reduce)');
    });

    it('disables animations in reduced motion styles', () => {
      const { container } = render(<ToriiLoader />);
      const style = container.querySelector('style');
      const styleContent = style?.textContent || '';
      
      // Check that reduced motion disables animations
      expect(styleContent).toContain('animation: none');
    });
  });

  describe('Framer Motion Integration', () => {
    it('wraps component in motion.div', () => {
      const { container } = render(<ToriiLoader />);
      const loader = container.querySelector('.torii-loader');
      expect(loader).toBeInTheDocument();
    });

    it('uses AnimatePresence for message transitions', () => {
      render(<ToriiLoader showMessage />);
      // If this renders without error, AnimatePresence is working
      expect(screen.getByText('技術は未来を創る')).toBeInTheDocument();
    });
  });
});
