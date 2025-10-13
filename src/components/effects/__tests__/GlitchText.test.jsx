import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GlitchText from '../GlitchText';

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

describe('GlitchText', () => {
  beforeEach(() => {
    // Setup matchMedia mock before each test
    window.matchMedia = createMatchMediaMock(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders children correctly', () => {
      render(<GlitchText>KAINET</GlitchText>);
      
      expect(screen.getByText('KAINET')).toBeInTheDocument();
    });

    it('renders as a span element', () => {
      const { container } = render(<GlitchText>Test Text</GlitchText>);
      
      const span = container.querySelector('span');
      expect(span).toBeInTheDocument();
      expect(span).toHaveTextContent('Test Text');
    });

    it('applies custom className when provided', () => {
      const { container } = render(
        <GlitchText className="custom-class">Test</GlitchText>
      );
      
      const span = container.querySelector('span');
      expect(span).toHaveClass('custom-class');
    });

    it('sets data-text attribute with children value', () => {
      const { container } = render(<GlitchText>KAINET</GlitchText>);
      
      const span = container.querySelector('span');
      expect(span).toHaveAttribute('data-text', 'KAINET');
    });

    it('sets CSS custom property for duration', () => {
      const { container } = render(
        <GlitchText duration={500}>Test</GlitchText>
      );
      
      const span = container.querySelector('span');
      expect(span).toHaveStyle({ '--glitch-duration': '500ms' });
    });
  });

  describe('Hover Trigger', () => {
    it('activates glitch animation on hover', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <GlitchText trigger="hover">KAINET</GlitchText>
      );
      
      const span = container.querySelector('span');
      
      // Initially should not have glitch class
      expect(span).not.toHaveClass('glitch-text');
      
      // Hover over the element
      await user.hover(span);
      
      // Should now have glitch class
      expect(span).toHaveClass('glitch-text');
      expect(span).toHaveClass('glitch-medium');
    });

    it('deactivates glitch animation after duration', async () => {
      const { container } = render(
        <GlitchText trigger="hover" duration={100}>KAINET</GlitchText>
      );
      
      const span = container.querySelector('span');
      const user = userEvent.setup();
      
      // Hover over the element
      await user.hover(span);
      
      // Should have glitch class
      expect(span).toHaveClass('glitch-text');
      
      // Wait for duration to pass
      await waitFor(() => {
        expect(span).not.toHaveClass('glitch-text');
      }, { timeout: 200 });
    });

    it('uses custom duration when provided', async () => {
      const { container } = render(
        <GlitchText trigger="hover" duration={150}>KAINET</GlitchText>
      );
      
      const span = container.querySelector('span');
      const user = userEvent.setup();
      
      // Trigger hover
      await user.hover(span);
      
      expect(span).toHaveClass('glitch-text');
      
      // Wait for duration to pass
      await waitFor(() => {
        expect(span).not.toHaveClass('glitch-text');
      }, { timeout: 250 });
    });
  });

  describe('Always Trigger', () => {
    it('applies glitch effect immediately when trigger is "always"', () => {
      const { container } = render(
        <GlitchText trigger="always">KAINET</GlitchText>
      );
      
      const span = container.querySelector('span');
      expect(span).toHaveClass('glitch-text');
      expect(span).toHaveClass('glitch-medium');
    });

    it('maintains glitch effect continuously', () => {
      const { container } = render(
        <GlitchText trigger="always">KAINET</GlitchText>
      );
      
      const span = container.querySelector('span');
      
      // Should have glitch class initially
      expect(span).toHaveClass('glitch-text');
      
      // Should still have glitch class (no timeout to clear it)
      expect(span).toHaveClass('glitch-text');
      expect(span).toHaveClass('glitch-medium');
    });
  });

  describe('Once Trigger', () => {
    it('activates glitch animation on click', async () => {
      const { container } = render(
        <GlitchText trigger="once">KAINET</GlitchText>
      );
      
      const span = container.querySelector('span');
      
      // Initially should not have glitch class
      expect(span).not.toHaveClass('glitch-text');
      
      // Click the element
      await act(async () => {
        span.click();
      });
      
      // Should now have glitch class
      expect(span).toHaveClass('glitch-text');
      expect(span).toHaveClass('glitch-medium');
    });

    it('deactivates glitch animation after duration on click', async () => {
      vi.useFakeTimers();
      const { container } = render(
        <GlitchText trigger="once" duration={300}>KAINET</GlitchText>
      );
      
      const span = container.querySelector('span');
      
      // Trigger click
      act(() => {
        span.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      
      expect(span).toHaveClass('glitch-text');
      
      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(300);
      });
      
      expect(span).not.toHaveClass('glitch-text');
      
      vi.useRealTimers();
    });
  });

  describe('Intensity Prop', () => {
    it('applies low intensity class', () => {
      const { container } = render(
        <GlitchText trigger="always" intensity="low">KAINET</GlitchText>
      );
      
      const span = container.querySelector('span');
      expect(span).toHaveClass('glitch-low');
    });

    it('applies medium intensity class by default', () => {
      const { container } = render(
        <GlitchText trigger="always">KAINET</GlitchText>
      );
      
      const span = container.querySelector('span');
      expect(span).toHaveClass('glitch-medium');
    });

    it('applies high intensity class', () => {
      const { container } = render(
        <GlitchText trigger="always" intensity="high">KAINET</GlitchText>
      );
      
      const span = container.querySelector('span');
      expect(span).toHaveClass('glitch-high');
    });

    it('changes animation based on intensity prop', () => {
      const { container, rerender } = render(
        <GlitchText trigger="always" intensity="low">KAINET</GlitchText>
      );
      
      const span = container.querySelector('span');
      expect(span).toHaveClass('glitch-low');
      expect(span).not.toHaveClass('glitch-high');
      
      // Change intensity
      rerender(
        <GlitchText trigger="always" intensity="high">KAINET</GlitchText>
      );
      
      expect(span).toHaveClass('glitch-high');
      expect(span).not.toHaveClass('glitch-low');
    });
  });

  describe('Reduced Motion Support', () => {
    it('disables glitch effect when prefers-reduced-motion is enabled', () => {
      // Mock matchMedia to return true for prefers-reduced-motion
      window.matchMedia = createMatchMediaMock(true);

      const { container } = render(
        <GlitchText trigger="always">KAINET</GlitchText>
      );
      
      const span = container.querySelector('span');
      expect(span).not.toHaveClass('glitch-text');
    });

    it('does not activate glitch on hover when reduced motion is enabled', async () => {
      // Mock matchMedia to return true for prefers-reduced-motion
      window.matchMedia = createMatchMediaMock(true);

      const user = userEvent.setup();
      const { container } = render(
        <GlitchText trigger="hover">KAINET</GlitchText>
      );
      
      const span = container.querySelector('span');
      
      await user.hover(span);
      
      // Should not have glitch class even after hover
      expect(span).not.toHaveClass('glitch-text');
    });

    it('does not activate glitch on click when reduced motion is enabled', async () => {
      // Mock matchMedia to return true for prefers-reduced-motion
      window.matchMedia = createMatchMediaMock(true);

      const user = userEvent.setup();
      const { container } = render(
        <GlitchText trigger="once">KAINET</GlitchText>
      );
      
      const span = container.querySelector('span');
      
      await user.click(span);
      
      // Should not have glitch class even after click
      expect(span).not.toHaveClass('glitch-text');
    });

    it('respects reduced motion preference changes', () => {
      let matchesReducedMotion = false;
      const listeners = [];

      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)' && matchesReducedMotion,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: (event, handler) => {
          if (event === 'change') listeners.push(handler);
        },
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container, rerender } = render(
        <GlitchText trigger="always">KAINET</GlitchText>
      );
      
      const span = container.querySelector('span');
      
      // Initially should have glitch
      expect(span).toHaveClass('glitch-text');
      
      // Enable reduced motion
      matchesReducedMotion = true;
      listeners.forEach(listener => listener({ matches: true }));
      
      rerender(<GlitchText trigger="always">KAINET</GlitchText>);
      
      // Should not have glitch after reduced motion is enabled
      expect(span).not.toHaveClass('glitch-text');
    });
  });

  describe('PropTypes Validation', () => {
    it('accepts valid trigger values', () => {
      const { rerender } = render(<GlitchText trigger="hover">Test</GlitchText>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      
      rerender(<GlitchText trigger="always">Test</GlitchText>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      
      rerender(<GlitchText trigger="once">Test</GlitchText>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('accepts valid intensity values', () => {
      const { rerender } = render(<GlitchText intensity="low">Test</GlitchText>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      
      rerender(<GlitchText intensity="medium">Test</GlitchText>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      
      rerender(<GlitchText intensity="high">Test</GlitchText>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('accepts duration as a number', () => {
      render(<GlitchText duration={500}>Test</GlitchText>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });
});
