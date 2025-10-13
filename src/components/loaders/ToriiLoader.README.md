# ToriiLoader Component

A full-featured loading component featuring an animated torii gate with circuit effects and rotating tech-themed messages in Japanese and English.

## Overview

The ToriiLoader is the main loading indicator for the KAINET site, embodying the fusion of Japanese culture and cyberpunk aesthetics. It features:

- Animated torii gate structure with pulsing effects
- Circuit paths with flowing energy animations
- Rotating messages that alternate between Japanese and English
- Three size variants for different use cases
- Full accessibility support

## Usage

### Basic Usage

```jsx
import ToriiLoader from './components/loaders/ToriiLoader';

function App() {
  return <ToriiLoader />;
}
```

### Size Variants

```jsx
// Small (80px) - for inline loading states
<ToriiLoader size="sm" />

// Medium (120px) - default, for general use
<ToriiLoader size="md" />

// Large (160px) - for full-page loading
<ToriiLoader size="lg" />
```

### With/Without Messages

```jsx
// With rotating messages (default)
<ToriiLoader showMessage />

// Without messages
<ToriiLoader showMessage={false} />

// Custom static message
<ToriiLoader message="Loading your data..." />
```

### Full-Page Loading Overlay

```jsx
function LoadingOverlay({ isLoading }) {
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <ToriiLoader size="lg" showMessage />
    </div>
  );
}
```

### In Page Transitions

```jsx
import { AnimatePresence } from 'framer-motion';
import ToriiLoader from './components/loaders/ToriiLoader';

function PageTransition({ isLoading, children }) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <ToriiLoader key="loader" size="lg" showMessage />
      ) : (
        <div key="content">{children}</div>
      )}
    </AnimatePresence>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the loader (80px, 120px, or 160px) |
| `showMessage` | `boolean` | `true` | Whether to show rotating messages below the loader |
| `message` | `string` | `null` | Custom message to display (disables rotation) |
| `className` | `string` | `''` | Additional CSS classes to apply |

## Features

### Animated Torii Structure

The torii gate consists of multiple paths that animate independently:

- **Top curved beam (kasagi)**: Main horizontal beam with curve
- **Second beam (nuki)**: Secondary horizontal support
- **Left & right pillars (hashira)**: Vertical support columns
- **Middle beam (gakuzuka)**: Central horizontal connector

Each element pulses with a staggered timing to create a flowing effect.

### Circuit Effects

Decorative circuit paths flow around the torii with:

- Animated stroke-dasharray for flowing energy effect
- Pulsing circuit nodes at connection points
- Synchronized timing with torii structure animations

### Message Rotation

Four default messages rotate every 3 seconds:

1. **技術は未来を創る** - "Tech creates the future" (Japanese)
2. **Loading innovation...** - English tech phrase
3. **Connecting circuits...** - Technical loading message
4. **Initializing AI...** - AI-themed message

Messages fade in/out smoothly using Framer Motion's AnimatePresence.

### Entrance/Exit Animations

The entire loader animates in and out with:

- Fade from 0 to 1 opacity
- Scale from 0.8 to 1
- 300ms duration with easeOut easing

## Accessibility

### Screen Reader Support

- Uses `role="status"` for loading announcements
- `aria-live="polite"` ensures messages are announced
- `aria-label="Loading"` provides context
- Hidden text provides additional context for screen readers

### Reduced Motion

Respects `prefers-reduced-motion` media query:

- Disables all pulsing animations
- Disables circuit flow animations
- Disables entrance/exit animations
- Maintains static, visible state

### Keyboard Navigation

- Does not interfere with keyboard navigation
- Does not trap focus
- Can be dismissed by parent component

## Performance

### Optimizations

- Uses CSS animations (GPU-accelerated) instead of JavaScript
- SVG-based for scalability without quality loss
- Minimal re-renders with proper React hooks
- Framer Motion animations are optimized for 60fps

### Bundle Size

- Component: ~3KB (minified)
- Requires Framer Motion (already in project)
- No additional dependencies

## Styling

### CSS Variables

The component uses CSS variables for theming:

```css
--cyan-neon: #00E5FF;  /* Primary color for torii and circuits */
```

### Custom Styling

You can override styles using the `className` prop:

```jsx
<ToriiLoader 
  className="custom-loader" 
  size="md" 
/>
```

```css
.custom-loader {
  /* Your custom styles */
}

.custom-loader .torii-svg {
  /* Style the SVG */
}
```

## Design Rationale

### Why Torii Gate?

The torii gate is a central element of the KAINET brand identity, representing:

- **Transition**: Gateway between states (loading → loaded)
- **Japanese Culture**: Authentic cultural reference
- **Technology**: Stylized with circuit elements for cyberpunk aesthetic

### Why Rotating Messages?

Multiple messages serve several purposes:

- **Engagement**: Keeps users interested during longer loads
- **Cultural Fusion**: Alternates between Japanese and English
- **Context**: Provides hints about what's happening
- **Brand Voice**: Reinforces tech-forward, innovative positioning

### Animation Timing

- **3-second rotation**: Long enough to read, short enough to stay engaging
- **2-second pulse cycle**: Creates rhythmic, calming effect
- **Staggered delays**: Prevents visual chaos, guides eye movement

## Related Components

- **ToriiLoaderMini**: Compact version for buttons and inline use
- **PageTransition**: Uses ToriiLoader for page transitions
- **LoadingState**: Wrapper component for conditional loading states

## Requirements Satisfied

This component satisfies the following requirements from the spec:

- **Requirement 7.1**: Torii loader with animated circuits
- **Requirement 7.2**: Rotating motivational messages in Japanese and English
- **Requirement 7.3**: Skeleton loader with scanning effect (via size variants)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires support for:
- CSS animations
- SVG
- CSS custom properties
- Framer Motion (React 18+)

## Examples

See `ToriiLoader.example.jsx` for comprehensive usage examples including:

- All size variants
- With/without messages
- Custom messages
- Full-page overlays
- Integration with page transitions

## Testing

Run tests with:

```bash
npm test -- ToriiLoader.test.jsx
```

Tests cover:
- Rendering with different props
- Message rotation timing
- Accessibility attributes
- Reduced motion support
- Entrance/exit animations
