# Changelog

All notable changes to the KAINET project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-10-13

### 🎉 Major Release: Japanese-Cyberpunk Visual Enhancements

This major release introduces a comprehensive set of visual effects and interactive elements that reinforce KAINET's unique identity: a fusion of cyberpunk futurism and Japanese cultural elements.

### ✨ Added

#### Visual Effects Components
- **GlitchText Component** - Cyberpunk glitch effect for text with RGB split and clip-path animations
  - Three trigger modes: hover, always, once
  - Three intensity levels: low, medium, high
  - Respects `prefers-reduced-motion`
  - Full JSDoc documentation and PropTypes

- **HolographicCard Component** - Interactive holographic shimmer effect that follows cursor
  - Radial gradient overlay with mix-blend-mode
  - Scanning line animation
  - Ripple effect on click using canvas
  - Throttled mouse tracking (60fps)
  - Automatic mobile detection and disabling
  - Memoized for performance

- **CircuitLines Component** - Decorative circuit patterns with animated energy particles
  - Three pattern types: grid, organic, torii
  - Three density levels: low, medium, high
  - SVG-based for scalability
  - Animated particles using SVG animateMotion
  - Performance-optimized (max 20 paths)

- **KanjiParticle Component** - 3D kanji characters as Three.js sprites
  - Tech-themed kanji library (技術, AI, 未来, 革新, etc.)
  - Torii formation algorithm using bezier curves
  - Magnetic cursor repulsion
  - Breathing animation with sine waves
  - Color transition based on scroll (cyan to purple)
  - InstancedMesh for efficient rendering (1 draw call for 200 particles)
  - Automatic reduction on mobile (200 → 80 particles)

- **PageTransition Component** - Cinematic page transitions with wipe effect
  - Wipe animation with clip-path
  - Motion blur during transition
  - Direction detection (forward/back)
  - ToriiLoader for slow page loads (>300ms)
  - Cancellation of incomplete transitions
  - Screen reader announcements

#### Loader Components
- **ToriiLoader Component** - Full-featured loader with animated torii gate
  - SVG torii with separated paths for animation
  - Pulsing circuit effects
  - Rotating messages (Japanese + English)
  - Three size variants: sm, md, lg
  - Framer Motion entrance/exit animations
  - ARIA live region for screen readers

- **ToriiLoaderMini Component** - Compact loader for buttons
  - Simplified torii animation
  - Size prop for different button sizes
  - Inline SVG for performance

#### Enhanced UI Components
- **Button Component Enhancements**
  - Ripple effect on click with canvas rendering
  - Hologram flicker on hover (secondary variant)
  - Loading state with ToriiLoaderMini
  - Maintains all existing variants (primary, secondary, ghost)
  - Respects `prefers-reduced-motion`

- **Badge Component Enhancements**
  - Optional kanji prefix based on category
  - Automatic kanji mapping (AI → AI, Web → 網, etc.)
  - Glow animation for featured badges
  - Maintains all existing color variants

- **Card Component Enhancements**
  - New "holographic" variant using HolographicCard
  - Backward compatible with existing variants
  - Updated PropTypes and documentation

#### Custom Hooks
- **useParallaxScroll Hook** - Enhanced parallax with motion blur
  - Multi-layer parallax support
  - Motion blur based on scroll velocity
  - IntersectionObserver for performance
  - Passive event listeners
  - RequestAnimationFrame throttling

- **useParallax Hook** - Basic parallax offset calculation
  - Simple speed multiplier
  - IntersectionObserver integration
  - Respects `prefers-reduced-motion`

- **useReducedMotion Hook** - Detects user motion preferences
  - Media query detection
  - Automatic updates on preference change
  - Clean event listener management

- **useEasterEggs Hook** - Manages easter egg state and detection
  - Konami code detection
  - Triple-click detection
  - Special date checking
  - LocalStorage persistence

#### Utilities
- **kanjiLibrary.js** - Tech-themed kanji dictionary
  - 10 curated kanji characters with meanings and unicode
  - `getRandomKanji()` function
  - `getKanjiByCategory()` for project mapping
  - Full JSDoc documentation

- **easterEggs.js** - Easter egg configuration and manager
  - EasterEggManager class with singleton pattern
  - Konami code detection (↑↑↓↓←→←→BA)
  - Triple-click detection with timing
  - Special date effects (New Year, Anniversary)
  - Keyboard alternatives for accessibility (Shift+K)
  - LocalStorage for discovered eggs tracking

- **performanceMonitor.js** - FPS tracking and performance management
  - Real-time FPS calculation
  - Automatic effect degradation at 45fps threshold
  - Singleton pattern for global access
  - Reset functionality

- **sectionKanji.js** - Intelligent kanji selection for section titles
  - Keyword-to-kanji mapping
  - `getKanjiForSection()` with smart matching
  - `getKanjiByName()` for explicit selection

#### Easter Eggs
- **Matrix Rain Effect** - Triggered by Konami code
  - Canvas-based matrix rain with Japanese characters
  - Auto-dismiss after 10 seconds
  - Escape key to dismiss early
  - Full-screen overlay

- **Torii Animation** - Triggered by triple-click on logo
  - Elaborate torii animation with circuit connections
  - Hidden message: "改 (KAI) = Change, Innovation"
  - Framer Motion orchestration

- **Sakura Petals** - Triggered on New Year (01-01)
  - Falling sakura petals animation
  - Subtle and non-intrusive
  - Canvas-based rendering

- **Fireworks** - Triggered on company anniversary (12-25)
  - Fireworks animation with particles
  - Celebratory effect
  - Canvas-based rendering

#### Accessibility Features
- **High Contrast Mode** - Automatic detection and adaptation
  - `@media (prefers-contrast: high)` support
  - Increased contrast ratios (7:1 minimum)
  - Thicker borders for better visibility
  - Disabled subtle effects (glitch, holographic)

- **Reduced Motion Support** - Comprehensive implementation
  - All animations respect `prefers-reduced-motion`
  - Simple fade instead of wipe transitions
  - Static particles instead of animated
  - Disabled parallax effects

- **Keyboard Navigation** - Full keyboard accessibility
  - Visible focus indicators (cyan 2px outline)
  - Keyboard alternatives for mouse-only features
  - Shift+K for torii animation easter egg
  - Proper tab order throughout

- **Screen Reader Support** - ARIA implementation
  - `aria-hidden="true"` on decorative elements
  - `role="status"` with `aria-live` on loaders
  - `aria-label` on icon-only buttons
  - Page transition announcements

#### Configuration & Testing
- **Feature Flags System** - Environment-based feature toggling
  - `src/config/features.js` configuration
  - Environment variables for each feature
  - Conditional rendering based on flags
  - Easy rollout and rollback

- **Test Suite** - Comprehensive unit and integration tests
  - Vitest + React Testing Library setup
  - Tests for all new components
  - Tests for custom hooks
  - Tests for utility functions
  - ~70% coverage for effects components

#### Styles & Animations
- **animations.css** - CSS keyframes for effects
  - Glitch animations (glitch, glitch-rgb)
  - Circuit flow animations
  - Hologram flicker
  - Badge glow pulse
  - Scanning line animation

- **variables.css Enhancements** - New CSS custom properties
  - Glitch effect colors
  - Animation timing variables
  - High contrast mode overrides
  - Selection color customization

#### Documentation
- **Component Documentation** - JSDoc comments on all components
  - Detailed prop descriptions
  - Usage examples
  - Accessibility notes
  - Performance considerations

- **Implementation Guides** - Comprehensive markdown docs
  - `EASTER-EGGS-IMPLEMENTATION.md`
  - `EASTER-EGGS-TEST-GUIDE.md`
  - `FEATURE-FLAGS-IMPLEMENTATION.md`
  - `FEATURE-FLAGS-TEST-GUIDE.md`
  - `HIGH-CONTRAST-MODE-IMPLEMENTATION.md`
  - `HIGH-CONTRAST-MODE-TEST-GUIDE.md`
  - `ACCESSIBILITY-AUDIT.md`
  - `ACCESSIBILITY-TEST-GUIDE.md`
  - Component-specific READMEs

### 🔧 Changed

#### BackgroundCanvas Component
- Enhanced with kanji particle layer
- New `<KanjiParticles />` component integration
- Torii formation algorithm for particle positioning
- Color transition based on scroll progress
- Cursor interaction with magnetic repulsion
- Performance optimizations with InstancedMesh

#### App.jsx
- Wrapped Routes with PageTransition component
- Integrated EasterEggContext provider
- Added global keyboard listeners for easter eggs
- Special date effect checking on mount

#### Navbar Component
- Added triple-click handler to logo
- GlitchText effect on logo hover
- Easter egg integration

#### Section Components
- Added kanji prefixes to section titles
- Integrated CircuitLines backgrounds
- Applied parallax effects
- Enhanced with HolographicCard variants

### 🚀 Performance Improvements

- **Code Splitting** - Lazy loading of all effect components
  - ~30KB reduction in initial bundle
  - Suspense boundaries with appropriate fallbacks
  - Dynamic imports for easter egg effects

- **Animation Optimizations**
  - Only `transform` and `opacity` (GPU-accelerated)
  - `will-change` hints on animated elements
  - RequestAnimationFrame throttling
  - IntersectionObserver for visible elements only

- **3D Optimizations**
  - InstancedMesh for kanji particles (1 draw call vs 200)
  - Texture memoization
  - Frustum culling
  - Automatic particle reduction on mobile

- **Automatic Degradation**
  - Real-time FPS monitoring
  - Effect reduction if FPS < 45 for 3 seconds
  - GPU capability detection
  - Mobile device detection

### 📊 Metrics

- **Lighthouse Score**: Maintained 98+ (target achieved)
- **Bundle Size**: +45KB gzipped (within 50KB target)
- **FPS Desktop**: 60fps maintained (target achieved)
- **FPS Mobile**: 55+ fps on mid-range devices (target achieved)
- **Time to Interactive**: <2s (target achieved)
- **Accessibility**: WCAG 2.1 AA compliant

### 🌐 Browser Compatibility

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅ (14.1+ for backdrop-filter)
- Edge 90+ ✅
- Mobile Safari iOS 14+ ✅
- Chrome Android 90+ ✅

### 🐛 Fixed

- Focus indicators now visible over all effects
- Proper cleanup of event listeners and RAF callbacks
- Memory leaks in canvas-based effects
- Hydration issues with SSR-incompatible code
- Tab order issues with overlay effects

### 🔒 Security

- XSS prevention in kanji library (predefined characters only)
- Performance DoS mitigation (particle limits, circuit breaker)
- No data collection in performance monitoring
- No fingerprinting techniques used

### 📝 Documentation

- Updated README.md with new features section
- Added browser compatibility matrix
- Added performance considerations
- Added accessibility features documentation
- Added troubleshooting section
- Created comprehensive CHANGELOG.md

### 👥 Contributors

- **Marco Domínguez** - Lead Developer & Designer
  - Concept and design of Japanese-cyberpunk aesthetic
  - Implementation of all visual effects
  - Performance optimization
  - Accessibility implementation
  - Documentation

### 🙏 Acknowledgments

- Inspired by Japanese cyberpunk aesthetics (Ghost in the Shell, Akira)
- Three.js community for 3D rendering techniques
- React Three Fiber team for excellent React integration
- Framer Motion for animation orchestration
- WCAG guidelines for accessibility standards

---

## [1.0.0] - 2024-12-01

### Initial Release

- React 18.2 + Vite 5.0 setup
- Three.js 3D background canvas
- Animated torii logo
- Portfolio sections (About, Work, Playground, Contact)
- Blog section with local data
- Kainet Resto product showcase
- Tailwind CSS styling
- Framer Motion animations
- Formspree contact form integration
- Vercel deployment configuration
- SEO optimization (meta tags, sitemap, robots.txt)
- Basic accessibility features

---

## Version History

- **2.0.0** (2025-10-13) - Japanese-Cyberpunk Visual Enhancements
- **1.0.0** (2024-12-01) - Initial Release

---

## Upcoming

See [README.md](./README.md#-próximas-mejoras-sugeridas) for planned improvements.
