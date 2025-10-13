# UI Components Enhancements - Japanese Cyberpunk Theme

This document describes the enhancements made to the core UI components as part of the Japanese Cyberpunk visual improvements.

## Overview

Three core UI components have been enhanced with interactive effects and Japanese cultural elements:
- **Button**: Ripple effects, hologram flicker, and torii spinner
- **Badge**: Kanji prefixes and glow animations
- **Card**: Holographic variant with interactive effects

All enhancements respect accessibility preferences (`prefers-reduced-motion`) and maintain backward compatibility.

---

## Button Component

### New Features

#### 1. Ripple Effect on Click
- Canvas-based ripple animation that emanates from click position
- Smooth 600ms animation with cubic-bezier easing
- Cyan gradient that fades out
- Works on all button variants

#### 2. Hologram Flicker on Hover
- CSS animation that creates a holographic border effect
- Primarily visible on `secondary` variant buttons
- 600ms animation with color and shadow transitions
- Automatically disabled with `prefers-reduced-motion`

#### 3. Mini Torii Spinner
- Custom loading spinner based on torii gate design
- Replaces generic spinner in loading state
- Animated rotation with pulsing elements
- Size adapts to button size (sm/md/lg)

### Usage

```jsx
import Button from './components/ui/Button';

// Basic usage (ripple effect on click)
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>

// Secondary button with hologram flicker on hover
<Button variant="secondary">
  Hover Me
</Button>

// Loading state with torii spinner
<Button variant="primary" loading={true}>
  Loading...
</Button>

// All sizes supported
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Shows torii spinner when true |
| `disabled` | `boolean` | `false` | Disables button and effects |
| `onClick` | `function` | - | Click handler |

### Accessibility

- Ripple effect respects `prefers-reduced-motion`
- Hologram flicker disabled with `prefers-reduced-motion`
- Proper `aria-busy` and `aria-disabled` attributes
- Maintains keyboard navigation
- Focus indicators remain visible

---

## Badge Component

### New Features

#### 1. Kanji Prefix
- Optional Japanese character prefix based on category
- Maps common tech categories to appropriate kanji:
  - AI → AI
  - Web → 網 (network)
  - Automation → 自動
  - Cloud → 雲
  - Development → 開発
  - Innovation → 革新
  - Code → コード
  - Data → データ

#### 2. Glow Animation
- Pulsing glow effect for featured badges
- 2-second infinite animation
- Increases brightness and shadow on pulse
- Automatically disabled with `prefers-reduced-motion`

### Usage

```jsx
import Badge from './components/ui/Badge';

// Basic badge
<Badge variant="default">Category</Badge>

// Badge with kanji prefix (auto-mapped from category)
<Badge variant="default" kanji="AI">
  Artificial Intelligence
</Badge>

// Badge with custom category mapping
<Badge variant="purple" kanji="Web">
  Web Development
</Badge>

// Featured badge with glow animation
<Badge variant="default" featured>
  Featured
</Badge>

// Combined: kanji + featured + custom variant
<Badge variant="success" kanji="Innovation" featured>
  Innovation
</Badge>

// Different sizes
<Badge size="sm" kanji="AI">Small</Badge>
<Badge size="md" kanji="Web">Medium</Badge>
<Badge size="lg" kanji="Cloud">Large</Badge>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'purple' \| 'success' \| 'warning' \| 'error'` | `'default'` | Badge color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `kanji` | `boolean \| string` | `null` | Category for kanji prefix |
| `featured` | `boolean` | `false` | Enables glow animation |

### Kanji Category Mapping

```javascript
{
  'AI': 'AI',
  'Web': '網',
  'Automation': '自動',
  'MLOps': 'データ',
  'Cloud': '雲',
  'Development': '開発',
  'Innovation': '革新',
  'Future': '未来',
  'Code': 'コード'
}
```

### Accessibility

- Kanji prefix is decorative and marked `aria-hidden="true"`
- Glow animation respects `prefers-reduced-motion`
- Maintains proper color contrast ratios
- Text remains readable with all effects

---

## Card Component

### New Features

#### 1. Holographic Variant
- New `variant="holographic"` option
- Lazy-loaded for performance optimization
- Uses the full `HolographicCard` component with:
  - Interactive holographic shimmer that follows cursor
  - Vertical scanning line effect
  - Ripple effect on click
  - GPU-accelerated animations

### Usage

```jsx
import Card from './components/ui/Card';

// Standard variants (unchanged)
<Card variant="default" hover>
  <h3>Default Card</h3>
  <p>Content here</p>
</Card>

<Card variant="glass">
  <h3>Glass Card</h3>
</Card>

<Card variant="featured" hover>
  <h3>Featured Card</h3>
</Card>

// New holographic variant
<Card variant="holographic">
  <h3>Holographic Card</h3>
  <p>Move your cursor over this card to see the effect!</p>
  <p>Click to see ripple animation!</p>
</Card>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'glass' \| 'featured' \| 'holographic'` | `'default'` | Card style variant |
| `hover` | `boolean` | `false` | Enable hover effects (for non-holographic variants) |

### Backward Compatibility

- All existing variants work exactly as before
- `holographic` variant is opt-in
- Lazy loading ensures no performance impact if not used
- Fallback to standard card during loading

### Accessibility

- Holographic effects respect `prefers-reduced-motion`
- Disabled on mobile devices (no hover support)
- Maintains keyboard navigation
- Does not interfere with screen readers

---

## Performance Considerations

### Button
- Canvas ripple uses `requestAnimationFrame` for 60fps
- Ripples are cleaned up after animation completes
- Canvas size updates on window resize
- All RAF calls cancelled on unmount

### Badge
- Kanji lookup is O(1) dictionary access
- Glow animation is CSS-based (GPU accelerated)
- No JavaScript overhead during animation

### Card
- Holographic variant is lazy-loaded with `React.lazy()`
- Suspense boundary provides instant fallback
- Only loads when `variant="holographic"` is used
- Reduces initial bundle size

---

## Browser Support

All enhancements work on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Graceful degradation for older browsers:
- Effects simply don't appear
- Core functionality remains intact
- No errors or broken layouts

---

## Testing

See `EnhancedComponents.example.jsx` for comprehensive usage examples.

To test:
1. Import the example component
2. Add to your route/page
3. Interact with buttons (click, hover)
4. Test badges with different kanji categories
5. Move cursor over holographic cards
6. Enable `prefers-reduced-motion` to verify accessibility

---

## Related Files

- `src/components/ui/Button.jsx` - Enhanced button component
- `src/components/ui/Badge.jsx` - Enhanced badge component
- `src/components/ui/Card.jsx` - Enhanced card component
- `src/components/loaders/ToriiLoaderMini.jsx` - Mini torii spinner
- `src/components/effects/HolographicCard.jsx` - Full holographic card
- `src/utils/kanjiLibrary.js` - Kanji dictionary and utilities
- `src/hooks/useReducedMotion.js` - Accessibility hook
- `src/styles/animations.css` - CSS animations

---

## Requirements Fulfilled

This implementation fulfills the following requirements from the spec:

- **Requirement 2.3**: Button hologram flicker effect
- **Requirement 4.1**: Kanji decorative prefixes
- **Requirement 4.2**: Japanese-style elements in UI
- **Requirement 5.1**: Holographic card variant
- **Requirement 5.3**: Ripple effect on click
- **Requirement 5.4**: Featured badge glow animation
