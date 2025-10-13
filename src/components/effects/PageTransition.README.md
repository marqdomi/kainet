# PageTransition Component

Cinematic page transitions with wipe effect and motion blur for the KAINET website.

## Features

- ✨ Smooth wipe transitions between pages
- 🎬 Motion blur during transitions
- ⬅️➡️ Direction-aware animations (forward/back)
- ⏱️ Automatic loader for slow page loads (>300ms)
- ♿ Full accessibility support (reduced motion, screen reader announcements)
- 🚀 Handles rapid navigation gracefully

## Usage

### Basic Setup

Wrap your Routes with PageTransition in App.jsx:

```jsx
import PageTransition from './components/effects/PageTransition';

const App = () => {
  return (
    <BrowserRouter>
      <PageTransition duration={600}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </PageTransition>
    </BrowserRouter>
  );
};
```

### With PageContent for Staggered Reveals

Use PageContent inside your pages for animated content sections:

```jsx
import { PageContent } from '../components/effects';

const AboutPage = () => {
  return (
    <PageContent>
      <section className="hero">
        <h1>About Us</h1>
      </section>
      
      <section className="mission">
        <h2>Our Mission</h2>
        <p>Content here...</p>
      </section>
      
      <section className="team">
        <h2>Our Team</h2>
        <p>Content here...</p>
      </section>
    </PageContent>
  );
};
```

## Props

### PageTransition

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `node` | required | Routes to render |
| `duration` | `number` | `600` | Transition duration in milliseconds |

### PageContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `node` | required | Content sections to animate |
| `staggerDelay` | `number` | `0.1` | Delay between each section in seconds |
| `className` | `string` | `''` | Additional CSS classes |

## How It Works

### Navigation Detection

The component uses React Router's `useLocation` hook to detect route changes. It determines navigation direction using a simple heuristic:

- **Forward**: Going to a longer path or away from root
- **Back**: Going to root or a shorter path

### Transition Phases

1. **Exit**: Current page wipes out with motion blur
2. **Loading**: If page takes >300ms, ToriiLoader appears
3. **Enter**: New page wipes in
4. **Reveal**: Content sections fade in with stagger (if using PageContent)

### Rapid Navigation Handling

If the user navigates quickly between pages:
- Previous transition timeouts are cleared
- Incomplete transitions are cancelled
- New transition starts immediately
- Prevents animation queue buildup

## Accessibility

### Reduced Motion

When `prefers-reduced-motion` is enabled:
- Wipe effect replaced with simple fade
- Motion blur disabled
- Stagger animations disabled
- Transition duration reduced

### Screen Reader Support

- Route changes announced via `aria-live="polite"`
- Loader has `role="status"`
- Transitions don't interfere with focus management

### Keyboard Navigation

- All transitions are purely visual
- Tab order and focus remain unaffected
- No keyboard traps

## Performance

### Optimizations

- Uses `will-change: clip-path, filter` for GPU acceleration
- Clears timeouts on unmount to prevent memory leaks
- Loader only renders when needed (>300ms)
- AnimatePresence mode="wait" prevents multiple pages rendering

### Bundle Size

- ~2KB gzipped (including PageContent)
- Leverages existing Framer Motion dependency
- No additional dependencies

## Browser Support

- Chrome 90+: Full support
- Firefox 88+: Full support
- Safari 14+: Full support
- Edge 90+: Full support

All browsers support `clip-path` and `filter` properties used in transitions.

## Examples

### Custom Duration

```jsx
<PageTransition duration={800}>
  <Routes>{/* routes */}</Routes>
</PageTransition>
```

### Fast Stagger

```jsx
<PageContent staggerDelay={0.05}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</PageContent>
```

### No Stagger

```jsx
<PageContent staggerDelay={0}>
  <div>All items appear together</div>
  <div>No delay between them</div>
</PageContent>
```

## Troubleshooting

### Transitions not working

- Ensure PageTransition wraps Routes, not individual Route components
- Check that React Router is properly configured
- Verify Framer Motion is installed

### Loader always showing

- Check network tab for slow API calls
- Verify images are optimized
- Consider lazy loading heavy components

### Content jumping

- Ensure pages have consistent layout
- Use min-height on page containers
- Check for layout shifts in DevTools

### Performance issues

- Reduce transition duration
- Disable motion blur on low-end devices
- Use smaller stagger delays
- Lazy load page components

## Related Components

- **ToriiLoader**: Used for loading states
- **PageContent**: Companion component for content reveals
- **useReducedMotion**: Hook for accessibility

## Requirements Satisfied

- ✅ 3.1: Wipe transition on navigation
- ✅ 3.2: ToriiLoader for slow loads
- ✅ 3.3: Staggered content reveal
- ✅ 3.4: Direction-aware animations
- ✅ 3.5: Rapid navigation handling
