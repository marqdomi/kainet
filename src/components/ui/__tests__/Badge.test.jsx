import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from '../Badge';

// Mock kanjiLibrary
vi.mock('../../utils/kanjiLibrary', () => ({
  getKanjiByCategory: vi.fn((category) => {
    const mapping = {
      'AI': { char: 'AI', meaning: 'Artificial Intelligence' },
      'Web': { char: '網', meaning: 'Network' },
      'Automation': { char: '自動', meaning: 'Automation' },
      'MLOps': { char: 'データ', meaning: 'Data' },
      'default': { char: '技術', meaning: 'Technology' }
    };
    return mapping[category] || mapping['default'];
  })
}));

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

describe('Badge', () => {
  beforeEach(() => {
    // Setup matchMedia mock before each test
    window.matchMedia = createMatchMediaMock(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>Test Badge</Badge>);
      
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('renders as a span element', () => {
      const { container } = render(<Badge>Test</Badge>);
      
      const span = container.querySelector('span');
      expect(span).toBeInTheDocument();
      expect(span.tagName).toBe('SPAN');
    });

    it('applies custom className', () => {
      const { container } = render(<Badge className="custom-class">Test</Badge>);
      
      const span = container.querySelector('span');
      expect(span).toHaveClass('custom-class');
    });

    it('applies correct variant styles', () => {
      const { rerender, container } = render(<Badge variant="default">Default</Badge>);
      let badge = container.querySelector('span');
      expect(badge.className).toContain('border-[var(--cyan-neon)]');
      
      rerender(<Badge variant="purple">Purple</Badge>);
      badge = container.querySelector('span');
      expect(badge.className).toContain('border-[var(--purple-accent)]');
      
      rerender(<Badge variant="success">Success</Badge>);
      badge = container.querySelector('span');
      expect(badge.className).toContain('border-[var(--green-success)]');
      
      rerender(<Badge variant="warning">Warning</Badge>);
      badge = container.querySelector('span');
      expect(badge.className).toContain('border-[var(--yellow-warning)]');
      
      rerender(<Badge variant="error">Error</Badge>);
      badge = container.querySelector('span');
      expect(badge.className).toContain('border-[var(--red-error)]');
    });

    it('applies correct size styles', () => {
      const { rerender, container } = render(<Badge size="sm">Small</Badge>);
      let badge = container.querySelector('span');
      expect(badge.className).toContain('px-2 py-0.5 text-[10px]');
      
      rerender(<Badge size="md">Medium</Badge>);
      badge = container.querySelector('span');
      expect(badge.className).toContain('px-3 py-1 text-xs');
      
      rerender(<Badge size="lg">Large</Badge>);
      badge = container.querySelector('span');
      expect(badge.className).toContain('px-4 py-1.5 text-sm');
    });
  });

  describe('Kanji Rendering', () => {
    it('renders kanji prefix when kanji prop is a category string', () => {
      const { container } = render(<Badge kanji="AI">Artificial Intelligence</Badge>);
      
      const kanjiSpan = container.querySelector('.kanji-prefix');
      expect(kanjiSpan).toBeInTheDocument();
      expect(kanjiSpan).toHaveTextContent('AI');
      expect(kanjiSpan).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders correct kanji for different categories', () => {
      const { rerender, container } = render(<Badge kanji="Web">Web Development</Badge>);
      let kanjiSpan = container.querySelector('.kanji-prefix');
      expect(kanjiSpan).toHaveTextContent('網');
      
      rerender(<Badge kanji="Automation">Automation</Badge>);
      kanjiSpan = container.querySelector('.kanji-prefix');
      expect(kanjiSpan).toHaveTextContent('自動');
      
      rerender(<Badge kanji="MLOps">MLOps</Badge>);
      kanjiSpan = container.querySelector('.kanji-prefix');
      expect(kanjiSpan).toHaveTextContent('データ');
    });

    it('renders kanji when kanji prop is true and auto-detects from children', () => {
      const { container } = render(<Badge kanji={true}>AI</Badge>);
      
      const kanjiSpan = container.querySelector('.kanji-prefix');
      expect(kanjiSpan).toBeInTheDocument();
      expect(kanjiSpan).toHaveTextContent('AI');
    });

    it('does not render kanji when kanji prop is false', () => {
      const { container } = render(<Badge kanji={false}>Test</Badge>);
      
      const kanjiSpan = container.querySelector('.kanji-prefix');
      expect(kanjiSpan).not.toBeInTheDocument();
    });

    it('does not render kanji when kanji prop is not provided', () => {
      const { container } = render(<Badge>Test</Badge>);
      
      const kanjiSpan = container.querySelector('.kanji-prefix');
      expect(kanjiSpan).not.toBeInTheDocument();
    });

    it('applies correct size to kanji based on badge size', () => {
      const { rerender, container } = render(<Badge kanji="AI" size="sm">Test</Badge>);
      let kanjiSpan = container.querySelector('.kanji-prefix');
      expect(kanjiSpan.className).toContain('text-[9px]');
      
      rerender(<Badge kanji="AI" size="md">Test</Badge>);
      kanjiSpan = container.querySelector('.kanji-prefix');
      expect(kanjiSpan.className).toContain('text-[11px]');
      
      rerender(<Badge kanji="AI" size="lg">Test</Badge>);
      kanjiSpan = container.querySelector('.kanji-prefix');
      expect(kanjiSpan.className).toContain('text-[13px]');
    });

    it('makes kanji decorative with aria-hidden', () => {
      const { container } = render(<Badge kanji="AI">Test</Badge>);
      
      const kanjiSpan = container.querySelector('.kanji-prefix');
      expect(kanjiSpan).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Featured Badge', () => {
    it('applies glow animation when featured is true', () => {
      const { container } = render(<Badge featured>Featured</Badge>);
      
      const badge = container.querySelector('span');
      expect(badge.className).toContain('badge-glow');
    });

    it('does not apply glow animation when featured is false', () => {
      const { container } = render(<Badge featured={false}>Normal</Badge>);
      
      const badge = container.querySelector('span');
      expect(badge.className).not.toContain('badge-glow');
    });

    it('does not apply glow animation when reduced motion is enabled', () => {
      window.matchMedia = createMatchMediaMock(true);
      
      const { container } = render(<Badge featured>Featured</Badge>);
      
      const badge = container.querySelector('span');
      expect(badge.className).not.toContain('badge-glow');
    });

    it('combines featured with kanji correctly', () => {
      const { container } = render(<Badge featured kanji="AI">Featured AI</Badge>);
      
      const badge = container.querySelector('span');
      expect(badge.className).toContain('badge-glow');
      
      const kanjiSpan = container.querySelector('.kanji-prefix');
      expect(kanjiSpan).toBeInTheDocument();
      expect(kanjiSpan).toHaveTextContent('AI');
    });
  });

  describe('Accessibility', () => {
    it('maintains text readability with proper structure', () => {
      render(<Badge kanji="AI">Artificial Intelligence</Badge>);
      
      // Main text should be visible
      expect(screen.getByText('Artificial Intelligence')).toBeInTheDocument();
    });

    it('respects reduced motion preference for animations', () => {
      window.matchMedia = createMatchMediaMock(true);
      
      const { container } = render(<Badge featured>Featured</Badge>);
      
      const badge = container.querySelector('span');
      expect(badge.className).not.toContain('badge-glow');
    });

    it('uses uppercase and letter spacing for readability', () => {
      const { container } = render(<Badge>Test</Badge>);
      
      const badge = container.querySelector('span');
      expect(badge.className).toContain('uppercase');
      expect(badge.className).toContain('letter-spacing-wider');
    });
  });

  describe('Variant and Size Combinations', () => {
    it('combines variant and size correctly', () => {
      const { container } = render(<Badge variant="purple" size="lg">Large Purple</Badge>);
      
      const badge = container.querySelector('span');
      expect(badge.className).toContain('border-[var(--purple-accent)]');
      expect(badge.className).toContain('px-4 py-1.5 text-sm');
    });

    it('combines all props correctly', () => {
      const { container } = render(
        <Badge variant="success" size="md" kanji="Web" featured>
          Complete Badge
        </Badge>
      );
      
      const badge = container.querySelector('span');
      expect(badge.className).toContain('border-[var(--green-success)]');
      expect(badge.className).toContain('px-3 py-1 text-xs');
      expect(badge.className).toContain('badge-glow');
      
      const kanjiSpan = container.querySelector('.kanji-prefix');
      expect(kanjiSpan).toBeInTheDocument();
      expect(kanjiSpan).toHaveTextContent('網');
    });
  });

  describe('PropTypes Validation', () => {
    it('accepts all valid variant values', () => {
      const variants = ['default', 'purple', 'success', 'warning', 'error'];
      
      variants.forEach((variant, index) => {
        const { unmount } = render(<Badge variant={variant}>Test {index}</Badge>);
        expect(screen.getByText(`Test ${index}`)).toBeInTheDocument();
        unmount();
      });
    });

    it('accepts all valid size values', () => {
      const sizes = ['sm', 'md', 'lg'];
      
      sizes.forEach((size, index) => {
        const { unmount } = render(<Badge size={size}>Test {index}</Badge>);
        expect(screen.getByText(`Test ${index}`)).toBeInTheDocument();
        unmount();
      });
    });

    it('accepts kanji as boolean or string', () => {
      const { rerender } = render(<Badge kanji={true}>Test</Badge>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      
      rerender(<Badge kanji="AI">Test</Badge>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      
      rerender(<Badge kanji={false}>Test</Badge>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('accepts featured as boolean', () => {
      const { rerender } = render(<Badge featured={true}>Test</Badge>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      
      rerender(<Badge featured={false}>Test</Badge>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      const { container } = render(<Badge></Badge>);
      
      const badge = container.querySelector('span');
      expect(badge).toBeInTheDocument();
    });

    it('handles non-string children', () => {
      render(
        <Badge>
          <span>Complex</span> Content
        </Badge>
      );
      
      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('handles unknown category gracefully', () => {
      const { container } = render(<Badge kanji="UnknownCategory">Test</Badge>);
      
      const kanjiSpan = container.querySelector('.kanji-prefix');
      expect(kanjiSpan).toBeInTheDocument();
      // Should fall back to default kanji
      expect(kanjiSpan).toHaveTextContent('技術');
    });
  });
});
