# HolographicCard Component

A premium card component with interactive holographic shimmer effect, scanning line animation, and ripple effects on click. Extends the base `Card` component with cyberpunk-inspired visual enhancements.

## Features

- **Holographic Shimmer**: Interactive gradient overlay that follows cursor position
- **Scanning Line**: Animated vertical line with glow effect
- **Ripple Effect**: Canvas-based ripple animation on click
- **Performance Optimized**: 60fps throttling, GPU acceleration, React.memo
- **Accessibility**: Respects `prefers-reduced-motion`, disabled on mobile
- **Responsive**: Automatically adjusts for mobile devices

## Usage

```jsx
import HolographicCard from './components/effects/HolographicCard';

// Basic usage
<HolographicCard variant="featured">
  <h3>Project Title</h3>
  <p>Description</p>
</HolographicCard>

// With all effects
<HolographicCard 
  variant="featured" 
  holographic 
  scanningLine 
  rippleOnClick
>
  <h3>Interactive Card</h3>
  <p>Hover and click to see effects</p>
</HolographicCard>

// Minimal effects
<HolographicCard 
  variant="default" 
  holographic={false} 
  scanningLine
>
  <h3>Scanning Only</h3>
  <p>Only scanning line effect</p>
</HolographicCard>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Card content |
| `holographic` | `boolean` | `true` | Enable holographic shimmer effect |
| `scanningLine` | `boolean` | `true` | Enable scanning line animation |
| `rippleOnClick` | `boolean` | `true` | Enable ripple effect on click |
| `variant` | `'default' \| 'glass' \| 'featured'` | `'default'` | Card style variant |
| `className` | `string` | `''` | Additional CSS classes |
| `...props` | `object` | - | Additional props passed to Card |

## Variants

### Default
Standard card with border and holographic effects.

```jsx
<HolographicCard variant="default">
  Content
</HolographicCard>
```

### Glass
Glass morphism effect with backdrop blur.

```jsx
<HolographicCard variant="glass">
  Content
</HolographicCard>
```

### Featured
Highlighted card with cyan border and gradient background.

```jsx
<HolographicCard variant="featured">
  Content
</HolographicCard>
```

## Effects

### Holographic Shimmer
- Tracks mouse position with `onMouseMove`
- Calculates radial gradient centered on cursor
- Throttled to 60fps using `requestAnimationFrame`
- Disabled on mobile devices (no hover support)

### Scanning Line
- Vertical line that moves from top to bottom
- Cyan glow effect with box-shadow
- 2-second animation loop
- Synced with holographic shimmer

### Ripple Effect
- Canvas-based rendering for smooth animation
- Expands from click position
- Cubic-bezier easing function
- Auto-removes after 600ms

## Performance

- **GPU Acceleration**: Uses `will-change: transform`
- **Throttling**: Mouse events throttled to 60fps
- **Memoization**: Component wrapped with `React.memo`
- **Mobile Optimization**: Effects disabled on mobile
- **Cleanup**: Event listeners properly cleaned up on unmount

## Accessibility

- **Reduced Motion**: All effects disabled when `prefers-reduced-motion` is set
- **Keyboard Navigation**: Does not interfere with tab order or focus
- **Screen Readers**: Decorative effects are non-intrusive
- **Mobile**: Touch-friendly, no hover-dependent functionality

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires support for:
- CSS `mix-blend-mode`
- Canvas 2D API
- `requestAnimationFrame`

## Examples

See `HolographicCard.example.jsx` for complete usage examples including:
- Project cards
- Blog post cards
- Different variant combinations
- Effect configurations

## Technical Details

### Holographic Effect Implementation
```javascript
// Radial gradient follows cursor position (0-100%)
background: radial-gradient(
  circle at ${mousePosition.x}% ${mousePosition.y}%, 
  rgba(0, 229, 255, 0.3) 0%, 
  rgba(168, 85, 247, 0.2) 30%, 
  transparent 60%
)
```

### Ripple Animation
```javascript
// Canvas-based with easing function
const eased = progress < 0.5
  ? 4 * progress * progress * progress
  : 1 - Math.pow(-2 * progress + 2, 3) / 2;

ripple.radius = eased * ripple.maxRadius;
```

### Performance Throttling
```javascript
// RAF-based throttling for 60fps
rafRef.current = requestAnimationFrame(() => {
  // Update mouse position
});
```

## Related Components

- `Card` - Base card component
- `GlitchText` - Text with glitch effect
- `CircuitLines` - Circuit line decorations

## Requirements

Implements requirements:
- 5.1: Holographic shimmer effect
- 5.2: Scanning line animation
- 5.3: Ripple effect on click
- 5.4: Performance optimization
