# Typography Enhancements

This document describes the typography enhancements implemented to reinforce the Japanese-cyberpunk aesthetic of KAINET.

## Overview

The typography enhancements include four main features:

1. **Kanji Decorative Prefixes** - Section titles with Japanese tech kanji
2. **Japanese-style Quotation Marks** - Blockquotes with 「」 marks
3. **Digital Counter Effect** - Animated numbers with cyberpunk styling
4. **Custom Text Selection** - Cyan selection color matching brand

## Components

### SectionTitle

A component that displays section titles with optional kanji prefixes.

**Props:**
- `children` (required): The title text
- `showKanji` (boolean): Whether to show kanji prefix (default: true)
- `kanji` (string): Explicit kanji category (e.g., 'tech', 'ai', 'innovation')
- `className` (string): Additional CSS classes
- `as` (elementType): HTML element to render (default: 'h2')

**Usage:**

```jsx
import { SectionTitle } from '@/components/ui';

// Auto-detect kanji from title
<SectionTitle>Our Services</SectionTitle>

// Explicit kanji
<SectionTitle kanji="innovation">About Us</SectionTitle>

// Without kanji
<SectionTitle showKanji={false}>Contact</SectionTitle>

// Different heading level
<SectionTitle as="h1">Main Title</SectionTitle>
```

**Auto-detection Keywords:**

The component intelligently selects kanji based on keywords in the title:

- **Technology**: tech, technology, development, code, programming
- **AI**: ai, artificial, intelligence
- **Innovation**: innovation, innovative, future
- **Automation**: automation, automate, automatic
- **Network**: network, web, contact, team, clients
- **Data**: data, database, information, blog, posts
- **Cloud**: cloud
- **Development**: development, projects, work, portfolio

### DigitalCounter

An animated counter component with cyberpunk styling and optional count-up animation.

**Props:**
- `value` (required): The target number to display
- `animate` (boolean): Whether to animate count-up (default: true)
- `duration` (number): Animation duration in ms (default: 2000)
- `prefix` (string): Text before number (e.g., '$')
- `suffix` (string): Text after number (e.g., '%', '+', 'K')
- `decimals` (number): Decimal places to show (default: 0)
- `pulse` (boolean): Add pulsing glow effect (default: false)
- `className` (string): Additional CSS classes

**Usage:**

```jsx
import { DigitalCounter } from '@/components/ui';

// Simple counter
<DigitalCounter value={1000} suffix="+" />

// With animation
<DigitalCounter value={500} animate duration={2000} />

// With decimals
<DigitalCounter value={4.9} decimals={1} suffix="/5.0" />

// With pulse effect
<DigitalCounter value={24} suffix="/7" pulse />

// With prefix
<DigitalCounter value={2500} prefix="$" suffix="K" />
```

**Features:**
- Automatic count-up animation when scrolled into view
- Intersection Observer for performance
- Easing function for smooth animation
- Monospace font with cyan glow effect
- Optional pulsing animation

## CSS Styles

### Kanji Prefix Styling

```css
.section-title__kanji {
  font-size: 0.6em;
  color: var(--cyan-neon);
  opacity: 0.8;
}

.section-title:hover .section-title__kanji {
  opacity: 1;
  text-shadow: var(--shadow-cyan);
}
```

### Japanese Quotation Marks

Blockquotes automatically get Japanese-style quotation marks:

```html
<blockquote>
  <p>Your quote text here</p>
</blockquote>
```

The `「」` marks are added via CSS `::before` and `::after` pseudo-elements.

### Digital Counter

```css
.digital-counter {
  font-family: var(--font-mono);
  color: var(--cyan-neon);
  text-shadow: 0 0 8px rgba(0, 229, 255, 0.4);
}
```

### Text Selection

Global text selection styling:

```css
::selection {
  background-color: rgba(0, 229, 255, 0.2);
  color: #FFFFFF;
}
```

## Utilities

### sectionKanji.js

Utility functions for kanji selection:

```javascript
import { getKanjiForSection, getKanjiByName } from '@/utils/sectionKanji';

// Auto-detect from title
const kanji = getKanjiForSection('Our Services');
// Returns: { char: '技術', meaning: 'Technology', unicode: '\u6280\u8853' }

// Get by explicit name
const kanji = getKanjiByName('innovation');
// Returns: { char: '革新', meaning: 'Innovation', unicode: '\u9769\u65b0' }
```

## Accessibility

All typography enhancements follow accessibility best practices:

1. **Kanji Prefixes**: Marked with `aria-hidden="true"` as they're decorative
2. **Reduced Motion**: Animations disabled when `prefers-reduced-motion` is set
3. **Color Contrast**: All text meets WCAG 2.1 AA standards
4. **Screen Readers**: Decorative elements don't interfere with content reading
5. **Keyboard Navigation**: No impact on tab order or focus

## CSS Variables

New variables added to `variables.css`:

```css
/* Section Title Kanji */
--kanji-prefix-color: var(--cyan-neon);
--kanji-prefix-size: 0.6em;
--kanji-prefix-spacing: 0.75rem;
--kanji-prefix-opacity: 0.8;

/* Digital Counter Effect */
--counter-glow: 0 0 8px rgba(0, 229, 255, 0.4);
--counter-font: var(--font-mono);

/* Text Selection */
--selection-bg: rgba(0, 229, 255, 0.2);
--selection-color: var(--text-primary);
```

## Examples

See `TypographyEnhancements.example.jsx` for comprehensive usage examples including:

- Section titles with various kanji options
- Blockquotes with Japanese quotation marks
- Digital counters with different configurations
- Text selection demonstration
- Combined usage examples

## Browser Support

All features are supported in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Fallbacks are provided for older browsers where needed.

## Performance

- **Kanji Prefixes**: Pure CSS, no JavaScript overhead
- **Quotation Marks**: CSS pseudo-elements, no DOM manipulation
- **Digital Counter**: Uses `requestAnimationFrame` for smooth 60fps animation
- **Text Selection**: Pure CSS, no performance impact

## Requirements Fulfilled

This implementation fulfills the following requirements from the spec:

- **Requirement 4.1**: Kanji decorative prefixes for section titles
- **Requirement 4.2**: Japanese-style quotation marks
- **Requirement 4.3**: Digital counter effect for numbers
- **Requirement 4.5**: Custom text selection color
