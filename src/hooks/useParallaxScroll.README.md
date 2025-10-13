# useParallaxScroll Hook

Enhanced parallax scrolling hook with motion blur and multi-layer support.

## Features

- ✅ **Multi-layer parallax** - Different speeds for depth effect
- ✅ **Motion blur** - Automatic blur during fast scrolling
- ✅ **Performance optimized** - Uses IntersectionObserver and RAF
- ✅ **Accessibility** - Respects `prefers-reduced-motion`
- ✅ **Smooth animations** - RequestAnimationFrame for 60fps
- ✅ **Passive listeners** - Better scroll performance

## Installation

The hook is already available in `src/hooks/useParallaxScroll.js`.

## Basic Usage

```jsx
import useParallaxScroll from '../hooks/useParallaxScroll';

const MyComponent = () => {
  const { offset, blur, ref } = useParallaxScroll();

  return (
    <div
      ref={ref}
      style={{
        transform: `translateY(${offset}px)`,
        filter: `blur(${blur}px)`,
      }}
    >
      Parallax content
    </div>
  );
};
```

## API

### Parameters

```typescript
useParallaxScroll(options?: {
  speed?: number;          // Speed multiplier (default: 0.5)
  blurThreshold?: number;  // Scroll speed for blur activation (default: 10)
  maxBlur?: number;        // Maximum blur amount in px (default: 3)
})
```

### Returns

```typescript
{
  offset: number;          // Parallax offset in pixels
  blur: number;            // Motion blur amount in pixels
  ref: RefObject;          // Ref to attach to element
  scrollVelocity: number;  // Current scroll velocity
}
```

## Examples

### 1. Basic Parallax

```jsx
const { offset, blur, ref } = useParallaxScroll({ speed: 0.5 });

<div
  ref={ref}
  style={{
    transform: `translateY(${offset}px)`,
    filter: `blur(${blur}px)`,
  }}
>
  Content
</div>
```

### 2. Multiple Layers (Depth Effect)

```jsx
const layer1 = useParallaxScroll({ speed: 0.1 }); // Background (slow)
const layer2 = useParallaxScroll({ speed: 0.3 }); // Middle
const layer3 = useParallaxScroll({ speed: 0.5 }); // Foreground (fast)

<div className="relative">
  <div ref={layer1.ref} style={{ transform: `translateY(${layer1.offset}px)` }}>
    Background
  </div>
  <div ref={layer2.ref} style={{ transform: `translateY(${layer2.offset}px)` }}>
    Middle
  </div>
  <div ref={layer3.ref} style={{ transform: `translateY(${layer3.offset}px)` }}>
    Foreground
  </div>
</div>
```

### 3. Custom Motion Blur

```jsx
const { offset, blur, ref } = useParallaxScroll({
  speed: 0.4,
  blurThreshold: 5,  // Blur activates at lower scroll speed
  maxBlur: 5,        // More intense blur
});
```

### 4. Parallax Background

```jsx
const { offset, blur, ref } = useParallaxScroll({ speed: 0.2 });

<section className="relative">
  <div
    ref={ref}
    className="absolute inset-0 opacity-20"
    style={{
      transform: `translateY(${offset}px)`,
      filter: `blur(${blur}px)`,
    }}
  >
    <CircuitLines pattern="grid" />
  </div>
  <div className="relative z-10">
    Content
  </div>
</section>
```

### 5. Parallax Cards

```jsx
const cards = [
  { title: 'Card 1', speed: 0.1 },
  { title: 'Card 2', speed: 0.15 },
  { title: 'Card 3', speed: 0.2 },
];

<div className="grid grid-cols-3 gap-8">
  {cards.map((card, i) => {
    const { offset, blur, ref } = useParallaxScroll({ speed: card.speed });
    return (
      <div
        key={i}
        ref={ref}
        style={{
          transform: `translateY(${offset}px)`,
          filter: `blur(${blur}px)`,
        }}
      >
        {card.title}
      </div>
    );
  })}
</div>
```

## Performance Tips

1. **Use IntersectionObserver** - The hook automatically only animates visible elements
2. **Limit parallax elements** - Don't apply to every element on the page
3. **Use transform** - Always use `transform: translateY()` instead of `top` or `margin`
4. **Avoid heavy children** - Keep parallax elements lightweight
5. **Test on mobile** - Reduce speeds or disable on low-end devices if needed

## Accessibility

The hook automatically respects `prefers-reduced-motion`:

- When enabled, `offset` returns 0 (no parallax)
- `blur` returns 0 (no motion blur)
- Elements remain static

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

Requires:
- IntersectionObserver (widely supported)
- RequestAnimationFrame (widely supported)
- CSS transforms (widely supported)

## Troubleshooting

### Parallax not working

1. Make sure you attach the `ref` to the element
2. Check that the element is in the viewport
3. Verify `prefers-reduced-motion` is not enabled

### Performance issues

1. Reduce the number of parallax elements
2. Lower the `speed` values
3. Disable motion blur by setting `maxBlur: 0`
4. Check if elements have heavy children (images, videos)

### Jittery animation

1. Ensure you're using `transform` not `top`/`margin`
2. Add `will-change: transform` to CSS
3. Check for other scroll listeners interfering

## Related Components

- `useParallax.js` - Simpler parallax hook (legacy)
- `BackToTop.jsx` - Uses scroll detection
- `CircuitLines.jsx` - Great for parallax backgrounds
- `Hero.jsx` - Example implementation

## Requirements Satisfied

This implementation satisfies requirements:
- **8.1** - Parallax at different speeds
- **8.2** - Multiple layer support
- **8.3** - Motion blur for fast scrolling
- **8.4** - Respects prefers-reduced-motion
- **8.5** - Works with back to top button

## See Also

- [useParallaxScroll.example.jsx](./useParallaxScroll.example.jsx) - Full examples
- [Design Document](../../.kiro/specs/japanese-cyberpunk-enhancements/design.md) - Technical design
- [Requirements](../../.kiro/specs/japanese-cyberpunk-enhancements/requirements.md) - Feature requirements
