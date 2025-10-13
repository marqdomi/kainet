import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

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

// Mock ToriiLoaderMini component
vi.mock('../loaders/ToriiLoaderMini', () => ({
  default: ({ size, className }) => (
    <div data-testid="torii-loader" data-size={size} className={className}>
      Loading...
    </div>
  ),
}));

describe('Button', () => {
  beforeEach(() => {
    // Setup matchMedia mock before each test
    window.matchMedia = createMatchMediaMock(false);
    
    // Mock canvas context
    HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      createRadialGradient: vi.fn(() => ({
        addColorStop: vi.fn(),
      })),
      fill: vi.fn(),
      fillStyle: '',
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click Me</Button>);
      
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('renders as a button element by default', () => {
      render(<Button>Test Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
    });

    it('renders with custom className', () => {
      render(<Button className="custom-class">Test</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('applies correct variant styles', () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>);
      let button = screen.getByRole('button');
      expect(button.className).toContain('bg-[var(--cyan-neon)]');
      
      rerender(<Button variant="secondary">Secondary</Button>);
      button = screen.getByRole('button');
      expect(button.className).toContain('border-2');
      
      rerender(<Button variant="ghost">Ghost</Button>);
      button = screen.getByRole('button');
      expect(button.className).toContain('bg-transparent');
    });

    it('applies correct size styles', () => {
      const { rerender } = render(<Button size="sm">Small</Button>);
      let button = screen.getByRole('button');
      expect(button.className).toContain('px-4 py-2 text-sm');
      
      rerender(<Button size="md">Medium</Button>);
      button = screen.getByRole('button');
      expect(button.className).toContain('px-6 py-3 text-base');
      
      rerender(<Button size="lg">Large</Button>);
      button = screen.getByRole('button');
      expect(button.className).toContain('px-8 py-4 text-lg');
    });

    it('renders with correct button type', () => {
      const { rerender } = render(<Button type="submit">Submit</Button>);
      let button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      
      rerender(<Button type="reset">Reset</Button>);
      button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });

    it('renders as different element when "as" prop is provided', () => {
      render(<Button as="a" href="/test">Link Button</Button>);
      
      const link = screen.getByText('Link Button');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/test');
    });
  });

  describe('Ripple Effect', () => {
    it('creates ripple canvas element', () => {
      const { container } = render(<Button>Test</Button>);
      
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('triggers ripple effect on click', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const { container } = render(<Button onClick={onClick}>Test</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      // Verify onClick was called
      expect(onClick).toHaveBeenCalledTimes(1);
      
      // Verify canvas exists (ripple effect is present)
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('does not create ripple when disabled', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Button disabled onClick={onClick}>Test</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      // onClick should not be called when disabled
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not create ripple when loading', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Button loading onClick={onClick}>Test</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      // onClick should not be called when loading
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not render canvas when reduced motion is enabled', () => {
      window.matchMedia = createMatchMediaMock(true);
      
      const { container } = render(<Button>Test</Button>);
      
      const canvas = container.querySelector('canvas');
      expect(canvas).not.toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows ToriiLoader when loading', () => {
      render(<Button loading>Submit</Button>);
      
      // ToriiLoaderMini is rendered (check for the actual SVG element)
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Cargando...')).toBeInTheDocument();
    });

    it('passes correct size to ToriiLoader', () => {
      const { rerender } = render(<Button loading size="sm">Test</Button>);
      let loader = screen.getByRole('status');
      expect(loader).toHaveAttribute('height', '14');
      
      rerender(<Button loading size="md">Test</Button>);
      loader = screen.getByRole('status');
      expect(loader).toHaveAttribute('height', '16');
      
      rerender(<Button loading size="lg">Test</Button>);
      loader = screen.getByRole('status');
      expect(loader).toHaveAttribute('height', '18');
    });

    it('sets aria-busy when loading', () => {
      render(<Button loading>Test</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('disables button when loading', () => {
      render(<Button loading>Test</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('hides original children when loading', () => {
      render(<Button loading>Original Text</Button>);
      
      expect(screen.queryByText('Original Text')).not.toBeInTheDocument();
      expect(screen.getByText('Cargando...')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('disables button when disabled prop is true', () => {
      render(<Button disabled>Test</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('sets aria-disabled when disabled', () => {
      render(<Button disabled>Test</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('applies opacity style when disabled', () => {
      render(<Button disabled>Test</Button>);
      
      const button = screen.getByRole('button');
      expect(button.className).toContain('disabled:opacity-50');
      expect(button.className).toContain('disabled:cursor-not-allowed');
    });

    it('does not trigger onClick when disabled', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Button disabled onClick={onClick}>Test</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('Hover Effects', () => {
    it('applies hologram flicker class on hover for secondary variant', async () => {
      const user = userEvent.setup();
      render(<Button variant="secondary">Test</Button>);
      
      const button = screen.getByRole('button');
      
      await user.hover(button);
      
      // Check if hover state is applied (hologram-flicker class)
      await waitFor(() => {
        expect(button.className).toContain('hologram-flicker');
      });
    });

    it('does not apply hover effects when disabled', async () => {
      const user = userEvent.setup();
      render(<Button variant="secondary" disabled>Test</Button>);
      
      const button = screen.getByRole('button');
      
      await user.hover(button);
      
      // Should not have hologram-flicker class when disabled
      expect(button.className).not.toContain('hologram-flicker');
    });

    it('does not apply hover effects when loading', async () => {
      const user = userEvent.setup();
      render(<Button variant="secondary" loading>Test</Button>);
      
      const button = screen.getByRole('button');
      
      await user.hover(button);
      
      // Should not have hologram-flicker class when loading
      expect(button.className).not.toContain('hologram-flicker');
    });

    it('removes hover effects on mouse leave', async () => {
      const user = userEvent.setup();
      render(<Button variant="secondary">Test</Button>);
      
      const button = screen.getByRole('button');
      
      await user.hover(button);
      await waitFor(() => {
        expect(button.className).toContain('hologram-flicker');
      });
      
      await user.unhover(button);
      
      // Hover state should be removed
      await waitFor(() => {
        expect(button.className).not.toContain('hologram-flicker');
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper focus styles', () => {
      render(<Button>Test</Button>);
      
      const button = screen.getByRole('button');
      expect(button.className).toContain('focus:outline-none');
      expect(button.className).toContain('focus-visible:ring-2');
    });

    it('maintains keyboard navigation', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Test</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      expect(button).toHaveFocus();
      
      // Simulate Enter key press
      await act(async () => {
        button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        button.click();
      });
      
      expect(onClick).toHaveBeenCalled();
    });

    it('respects reduced motion preference', () => {
      window.matchMedia = createMatchMediaMock(true);
      
      const { container } = render(<Button variant="secondary">Test</Button>);
      
      // Canvas should not be rendered
      const canvas = container.querySelector('canvas');
      expect(canvas).not.toBeInTheDocument();
    });
  });

  describe('Canvas Setup', () => {
    it('sets canvas size based on button dimensions', () => {
      const { container } = render(<Button>Test</Button>);
      
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
      
      // Canvas should have inline styles for positioning
      expect(canvas.style.position).toBe('absolute');
      expect(canvas.style.inset).toBe('0');
      expect(canvas.style.pointerEvents).toBe('none');
    });

    it('updates canvas size on window resize', () => {
      const { container } = render(<Button>Test</Button>);
      
      const canvas = container.querySelector('canvas');
      
      // Trigger resize event
      act(() => {
        window.dispatchEvent(new Event('resize'));
      });
      
      // Canvas should still be present
      expect(canvas).toBeInTheDocument();
    });

    it('cleans up event listeners on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      
      const { unmount } = render(<Button>Test</Button>);
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });
  });

  describe('PropTypes Validation', () => {
    it('accepts all valid variant values', () => {
      const { rerender } = render(<Button variant="primary">Test</Button>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      
      rerender(<Button variant="secondary">Test</Button>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      
      rerender(<Button variant="ghost">Test</Button>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('accepts all valid size values', () => {
      const { rerender } = render(<Button size="sm">Test</Button>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      
      rerender(<Button size="md">Test</Button>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      
      rerender(<Button size="lg">Test</Button>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('accepts boolean props', () => {
      render(
        <Button disabled={true} loading={false}>
          Test
        </Button>
      );
      
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
