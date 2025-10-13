import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionTitle from '../SectionTitle';

describe('SectionTitle', () => {
  it('renders children correctly', () => {
    render(<SectionTitle>Test Title</SectionTitle>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('shows kanji prefix by default', () => {
    const { container } = render(<SectionTitle>Our Services</SectionTitle>);
    const kanji = container.querySelector('.section-title__kanji');
    expect(kanji).toBeInTheDocument();
    expect(kanji).toHaveAttribute('aria-hidden', 'true');
  });

  it('hides kanji when showKanji is false', () => {
    const { container } = render(
      <SectionTitle showKanji={false}>Test Title</SectionTitle>
    );
    const kanji = container.querySelector('.section-title__kanji');
    expect(kanji).not.toBeInTheDocument();
  });

  it('uses explicit kanji when provided', () => {
    const { container } = render(
      <SectionTitle kanji="innovation">Test Title</SectionTitle>
    );
    const kanji = container.querySelector('.section-title__kanji');
    expect(kanji).toBeInTheDocument();
    expect(kanji.textContent).toBe('革新');
  });

  it('renders as different heading levels', () => {
    const { container: h1Container } = render(
      <SectionTitle as="h1">H1 Title</SectionTitle>
    );
    expect(h1Container.querySelector('h1')).toBeInTheDocument();

    const { container: h3Container } = render(
      <SectionTitle as="h3">H3 Title</SectionTitle>
    );
    expect(h3Container.querySelector('h3')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <SectionTitle className="custom-class">Test Title</SectionTitle>
    );
    const title = container.querySelector('.section-title');
    expect(title).toHaveClass('custom-class');
  });

  it('auto-detects kanji for common keywords', () => {
    const { container: servicesContainer } = render(
      <SectionTitle>Our Services</SectionTitle>
    );
    const servicesKanji = servicesContainer.querySelector('.section-title__kanji');
    expect(servicesKanji.textContent).toBe('技術');

    const { container: aiContainer } = render(
      <SectionTitle>AI Projects</SectionTitle>
    );
    const aiKanji = aiContainer.querySelector('.section-title__kanji');
    expect(aiKanji.textContent).toBe('AI');
  });

  it('has proper accessibility attributes', () => {
    const { container } = render(<SectionTitle>Test Title</SectionTitle>);
    const kanji = container.querySelector('.section-title__kanji');
    expect(kanji).toHaveAttribute('aria-hidden', 'true');
    expect(kanji).toHaveAttribute('title');
  });
});
