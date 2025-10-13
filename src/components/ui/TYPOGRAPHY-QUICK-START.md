# Typography Enhancements - Quick Start Guide

## Installation

All components are already installed and ready to use!

## Import

```jsx
import { SectionTitle, DigitalCounter } from '@/components/ui';
```

## Usage Examples

### 1. Section Titles with Kanji

```jsx
// Auto-detect kanji from title
<SectionTitle>Our Services</SectionTitle>
// Shows: 技術 Our Services

<SectionTitle>AI Projects</SectionTitle>
// Shows: AI AI Projects

<SectionTitle>About Us</SectionTitle>
// Shows: 革新 About Us

// Explicit kanji
<SectionTitle kanji="future">Vision 2030</SectionTitle>
// Shows: 未来 Vision 2030

// Without kanji
<SectionTitle showKanji={false}>Contact</SectionTitle>
// Shows: Contact

// Different heading level
<SectionTitle as="h1">Main Title</SectionTitle>
<SectionTitle as="h3">Sub Title</SectionTitle>
```

### 2. Digital Counters

```jsx
// Simple counter
<DigitalCounter value={1000} suffix="+" />
// Shows: 1000+

// Percentage
<DigitalCounter value={99} suffix="%" />
// Shows: 99%

// With decimals
<DigitalCounter value={4.9} decimals={1} suffix="/5.0" />
// Shows: 4.9/5.0

// With prefix
<DigitalCounter value={2500} prefix="$" suffix="K" />
// Shows: $2500K

// With pulse effect
<DigitalCounter value={24} suffix="/7" pulse />
// Shows: 24/7 (with pulsing glow)

// Without animation
<DigitalCounter value={100} animate={false} />
// Shows: 100 (immediately, no count-up)
```

### 3. Japanese Quotation Marks

```jsx
// Just use regular blockquotes - styling is automatic!
<blockquote>
  <p>Your quote text here</p>
</blockquote>
// Displays with 「」 marks automatically
```

### 4. Text Selection

No code needed! Text selection is automatically styled with cyan background.

## Common Patterns

### Stats Section

```jsx
<section>
  <SectionTitle>Our Impact</SectionTitle>
  
  <div className="grid grid-cols-3 gap-8">
    <div className="text-center">
      <DigitalCounter value={1000} suffix="+" className="text-4xl" />
      <p className="text-gray-300 mt-2">Projects</p>
    </div>
    
    <div className="text-center">
      <DigitalCounter value={99} suffix="%" className="text-4xl" />
      <p className="text-gray-300 mt-2">Satisfaction</p>
    </div>
    
    <div className="text-center">
      <DigitalCounter value={50} suffix="+" className="text-4xl" />
      <p className="text-gray-300 mt-2">Team Members</p>
    </div>
  </div>
</section>
```

### Blog Post with Quote

```jsx
<article>
  <SectionTitle kanji="data">Latest Insights</SectionTitle>
  
  <p>Article content here...</p>
  
  <blockquote>
    <p>Innovation distinguishes between a leader and a follower.</p>
  </blockquote>
  
  <p>More content...</p>
</article>
```

### Services Section

```jsx
<section>
  <SectionTitle>Our Services</SectionTitle>
  
  <div className="grid grid-cols-2 gap-6">
    <div>
      <SectionTitle as="h3" kanji="ai">AI Solutions</SectionTitle>
      <p>Description...</p>
    </div>
    
    <div>
      <SectionTitle as="h3" kanji="automation">Automation</SectionTitle>
      <p>Description...</p>
    </div>
  </div>
</section>
```

## Kanji Auto-Detection Keywords

The `SectionTitle` component automatically selects kanji based on these keywords:

| Keyword | Kanji | Meaning |
|---------|-------|---------|
| tech, technology | 技術 | Technology |
| ai, artificial, intelligence | AI | AI |
| innovation, innovative | 革新 | Innovation |
| future | 未来 | Future |
| development, develop | 開発 | Development |
| automation, automate | 自動 | Automation |
| network, web | 網 | Network |
| data, database | データ | Data |
| cloud | 雲 | Cloud |
| code, coding, programming | コード | Code |
| services | 技術 | Technology |
| projects, work, portfolio | 開発 | Development |
| about | 革新 | Innovation |
| blog, posts | データ | Data |
| contact, team, clients | 網 | Network |

## Available Kanji

You can explicitly use these kanji names:

- `tech` - 技術 (Technology)
- `ai` - AI (Artificial Intelligence)
- `future` - 未来 (Future)
- `innovation` - 革新 (Innovation)
- `development` - 開発 (Development)
- `automation` - 自動 (Automation)
- `network` - 網 (Network)
- `data` - データ (Data)
- `cloud` - 雲 (Cloud)
- `code` - コード (Code)

## Styling

All components use CSS variables from `variables.css`:

```css
--kanji-prefix-color: var(--cyan-neon);
--counter-glow: 0 0 8px rgba(0, 229, 255, 0.4);
--selection-bg: rgba(0, 229, 255, 0.2);
```

You can customize these in your CSS if needed.

## Accessibility

All components are fully accessible:

- ✅ Kanji prefixes are decorative (`aria-hidden="true"`)
- ✅ Animations respect `prefers-reduced-motion`
- ✅ Color contrast meets WCAG 2.1 AA
- ✅ Screen reader friendly
- ✅ Keyboard navigation unaffected

## Performance

- Kanji prefixes: Pure CSS, no JS overhead
- Digital counters: Use IntersectionObserver, only animate when visible
- Text selection: Pure CSS, no performance impact
- Quotation marks: CSS pseudo-elements, no DOM manipulation

## Browser Support

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+

## Need Help?

See full documentation in `TYPOGRAPHY-ENHANCEMENTS.md`
