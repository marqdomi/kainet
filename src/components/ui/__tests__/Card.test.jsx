import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../Card';

// Don't mock HolographicCard - test with actual implementation

describe('Card', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders children correctly', () => {
      render(<Card>Test Content</Card>);
      
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders as a div element', () => {
      const { container } = render(<Card>Test</Card>);
      
      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Card className="custom-class">Test</Card>);
      
      const card = container.querySelector('div');
      expect(card).toHaveClass('custom-class');
    });

    it('passes additional props to the card element', () => {
      const { container } = render(
        <Card data-testid="test-card" aria-label="Test Card">
          Test
        </Card>
      );
      
      const card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('aria-label', 'Test Card');
    });
  });

  describe('Variant Styles', () => {
    it('applies default variant styles', () => {
      const { container } = render(<Card variant="default">Default</Card>);
      
      const card = container.querySelector('div');
      expect(card.className).toContain('bg-[var(--gray-900)]');
      expect(card.className).toContain('border-[var(--gray-700)]');
    });

    it('applies glass variant styles', () => {
      const { container } = render(<Card variant="glass">Glass</Card>);
      
      const card = container.querySelector('div');
      expect(card.className).toContain('bg-[var(--overlay-glass)]');
      expect(card.className).toContain('backdrop-blur-md');
    });

    it('applies featured variant styles', () => {
      const { container } = render(<Card variant="featured">Featured</Card>);
      
      const card = container.querySelector('div');
      expect(card.className).toContain('border-2');
      expect(card.className).toContain('border-[var(--cyan-neon)]');
    });

    it('renders featured variant with gradient overlay', () => {
      const { container } = render(<Card variant="featured">Featured</Card>);
      
      const overlay = container.querySelector('.absolute.inset-0');
      expect(overlay).toBeInTheDocument();
      expect(overlay.className).toContain('bg-gradient-to-br');
    });
  });

  describe('Holographic Variant', () => {
    it('renders HolographicCard when variant is holographic', () => {
      render(<Card variant="holographic">Holographic Content</Card>);
      
      // Check that content is rendered
      expect(screen.getByText('Holographic Content')).toBeInTheDocument();
    });

    it('renders with holographic wrapper structure', () => {
      const { container } = render(<Card variant="holographic">Test</Card>);
      
      // Check that content is rendered
      expect(screen.getByText('Test')).toBeInTheDocument();
      // Verify there's at least one div (the card structure)
      const divs = container.querySelectorAll('div');
      expect(divs.length).toBeGreaterThanOrEqual(1);
    });

    it('passes className to HolographicCard wrapper', () => {
      const { container } = render(<Card variant="holographic" className="custom-holo">Test</Card>);
      
      // Check that className is applied somewhere in the structure
      const element = container.querySelector('.custom-holo');
      expect(element).toBeInTheDocument();
    });

    it('renders content correctly in holographic variant', () => {
      render(<Card variant="holographic">Loading Test</Card>);
      
      // Content should be rendered
      expect(screen.getByText('Loading Test')).toBeInTheDocument();
    });

    it('maintains proper structure in holographic mode', () => {
      const { container } = render(
        <Card variant="holographic">
          Test Content
        </Card>
      );
      
      // Verify content is rendered
      expect(screen.getByText('Test Content')).toBeInTheDocument();
      
      // Verify there's a card structure (multiple divs)
      const divs = container.querySelectorAll('div');
      expect(divs.length).toBeGreaterThan(0);
    });
  });

  describe('Hover Effects', () => {
    it('applies hover styles when hover prop is true for default variant', () => {
      const { container } = render(<Card variant="default" hover>Test</Card>);
      
      const card = container.querySelector('div');
      expect(card.className).toContain('hover:border-[var(--cyan-neon)]');
      expect(card.className).toContain('hover:-translate-y-1');
    });

    it('applies hover styles when hover prop is true for featured variant', () => {
      const { container } = render(<Card variant="featured" hover>Test</Card>);
      
      const card = container.querySelector('div');
      expect(card.className).toContain('hover:-translate-y-1');
      expect(card.className).toContain('hover:shadow-[0_0_40px_rgba(0,229,255,0.3)]');
    });

    it('does not apply hover styles when hover prop is false', () => {
      const { container } = render(<Card variant="default" hover={false}>Test</Card>);
      
      const card = container.querySelector('div');
      expect(card.className).not.toContain('hover:border-[var(--cyan-neon)]');
    });

    it('does not apply hover styles by default', () => {
      const { container } = render(<Card variant="default">Test</Card>);
      
      const card = container.querySelector('div');
      expect(card.className).not.toContain('hover:border-[var(--cyan-neon)]');
    });
  });

  describe('Content Wrapping', () => {
    it('wraps content in relative z-10 div for non-holographic variants', () => {
      const { container } = render(<Card variant="default">Content</Card>);
      
      const wrapper = container.querySelector('.relative.z-10');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveTextContent('Content');
    });

    it('wraps content in relative z-10 div for featured variant', () => {
      const { container } = render(<Card variant="featured">Content</Card>);
      
      const wrapper = container.querySelector('.relative.z-10');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveTextContent('Content');
    });

    it('renders holographic variant with proper structure', () => {
      const { container } = render(<Card variant="holographic">Content</Card>);
      
      // Holographic variant uses HolographicCard which has its own wrapper structure
      expect(screen.getByText('Content')).toBeInTheDocument();
      // Check for the presence of a wrapper div
      const wrappers = container.querySelectorAll('div');
      expect(wrappers.length).toBeGreaterThan(0);
    });
  });

  describe('Backward Compatibility', () => {
    it('maintains default variant behavior', () => {
      const { container } = render(<Card>Default Content</Card>);
      
      const card = container.querySelector('div');
      expect(card.className).toContain('bg-[var(--gray-900)]');
      expect(screen.getByText('Default Content')).toBeInTheDocument();
    });

    it('maintains glass variant behavior', () => {
      const { container } = render(<Card variant="glass">Glass Content</Card>);
      
      const card = container.querySelector('div');
      expect(card.className).toContain('backdrop-blur-md');
      expect(screen.getByText('Glass Content')).toBeInTheDocument();
    });

    it('maintains featured variant behavior', () => {
      const { container } = render(<Card variant="featured">Featured Content</Card>);
      
      const card = container.querySelector('div');
      expect(card.className).toContain('border-[var(--cyan-neon)]');
      expect(screen.getByText('Featured Content')).toBeInTheDocument();
    });

    it('works with existing hover prop', () => {
      const { container } = render(<Card hover>Hover Content</Card>);
      
      const card = container.querySelector('div');
      expect(card.className).toContain('hover:border-[var(--cyan-neon)]');
      expect(screen.getByText('Hover Content')).toBeInTheDocument();
    });

    it('works with existing className prop', () => {
      const { container } = render(<Card className="legacy-class">Legacy Content</Card>);
      
      const card = container.querySelector('div');
      expect(card).toHaveClass('legacy-class');
      expect(screen.getByText('Legacy Content')).toBeInTheDocument();
    });

    it('preserves all existing props', () => {
      render(
        <Card
          variant="default"
          hover={true}
          className="test-class"
          data-testid="backward-compat"
          aria-label="Test"
        >
          Test Content
        </Card>
      );
      
      const card = screen.getByTestId('backward-compat');
      expect(card).toHaveAttribute('aria-label', 'Test');
      expect(card).toHaveClass('test-class');
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('Base Styles', () => {
    it('applies base rounded and padding styles', () => {
      const { container } = render(<Card>Test</Card>);
      
      const card = container.querySelector('div');
      expect(card.className).toContain('rounded-xl');
      expect(card.className).toContain('p-[var(--card-padding)]');
    });

    it('applies transition styles', () => {
      const { container } = render(<Card>Test</Card>);
      
      const card = container.querySelector('div');
      expect(card.className).toContain('transition-all');
      expect(card.className).toContain('duration-300');
    });
  });

  describe('PropTypes Validation', () => {
    it('accepts all valid variant values', () => {
      const variants = ['default', 'glass', 'featured', 'holographic'];
      
      variants.forEach(variant => {
        const { unmount } = render(<Card variant={variant}>Test</Card>);
        expect(screen.getByText('Test')).toBeInTheDocument();
        unmount();
      });
    });

    it('accepts hover as boolean', () => {
      const { rerender } = render(<Card hover={true}>Test</Card>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      
      rerender(<Card hover={false}>Test</Card>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('accepts className as string', () => {
      render(<Card className="test-class">Test</Card>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  describe('Complex Content', () => {
    it('renders complex nested content', () => {
      render(
        <Card>
          <h2>Title</h2>
          <p>Description</p>
          <button>Action</button>
        </Card>
      );
      
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('maintains content structure with featured variant', () => {
      render(
        <Card variant="featured">
          <div data-testid="nested-content">
            <span>Nested</span>
          </div>
        </Card>
      );
      
      const nested = screen.getByTestId('nested-content');
      expect(nested).toBeInTheDocument();
      expect(screen.getByText('Nested')).toBeInTheDocument();
    });

    it('maintains content structure with holographic variant', () => {
      render(
        <Card variant="holographic">
          <div data-testid="holo-nested">
            <span>Holographic Nested</span>
          </div>
        </Card>
      );
      
      const nested = screen.getByTestId('holo-nested');
      expect(nested).toBeInTheDocument();
      expect(screen.getByText('Holographic Nested')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      const { container } = render(<Card></Card>);
      
      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      const { container } = render(<Card>{null}</Card>);
      
      const card = container.querySelector('div');
      expect(card).toBeInTheDocument();
    });

    it('handles undefined variant gracefully', () => {
      const { container } = render(<Card variant={undefined}>Test</Card>);
      
      // Should default to 'default' variant
      const card = container.querySelector('div');
      expect(card.className).toContain('bg-[var(--gray-900)]');
    });
  });
});
