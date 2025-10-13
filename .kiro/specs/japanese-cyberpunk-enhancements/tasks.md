# Implementation Plan

## Overview

Este plan de implementación convierte el diseño de mejoras japonesas-cyberpunk en tareas ejecutables. Las tareas están organizadas en 5 fases principales, priorizando funcionalidad core y dejando tests como opcionales.

**Estimated Timeline:** 4-5 semanas
**Priority:** Core features first, polish later

---

## Phase 1: Foundation & Utilities

- [x] 1. Setup base infrastructure

  - Create directory structure for new components (`src/components/effects/`, `src/hooks/`, `src/utils/`)
  - Add new CSS variables to `src/styles/variables.css` for effects (glitch colors, animation timings)
  - Create `src/styles/animations.css` with keyframes for glitch, shimmer, and scanning effects
  - _Requirements: All requirements depend on this foundation_

- [x] 2. Create kanji library utility

  - [x] 2.1 Implement `src/utils/kanjiLibrary.js` with tech kanji dictionary

    - Define techKanji object with 10 kanji (技術, AI, 未来, 革新, 開発, 自動, 網, データ, 雲, コード)
    - Implement `getRandomKanji()` function
    - Implement `getKanjiByCategory(category)` function for mapping project categories
    - _Requirements: 1.1, 4.2_

  - [ ]\* 2.2 Write unit tests for kanji library
    - Test getRandomKanji returns valid kanji
    - Test getKanjiByCategory maps correctly
    - Test all kanji have required properties (char, meaning, unicode)
    - _Requirements: 1.1, 4.2_

- [x] 3. Create performance monitoring utility

  - [x] 3.1 Implement `src/utils/performanceMonitor.js`

    - Create PerformanceMonitor class with FPS tracking
    - Implement `update()` method to calculate FPS
    - Implement `shouldReduceEffects()` method with 45fps threshold
    - Export singleton instance
    - _Requirements: 1.4, 6.4_

  - [ ]\* 3.2 Write unit tests for performance monitor
    - Test FPS calculation accuracy
    - Test shouldReduceEffects threshold
    - Test singleton pattern
    - _Requirements: 1.4, 6.4_

- [x] 4. Create custom hooks

  - [x] 4.1 Implement `src/hooks/useReducedMotion.js`

    - Hook to detect prefers-reduced-motion media query
    - Return boolean state
    - Add event listener for changes
    - Clean up on unmount
    - _Requirements: 9.1, 9.2_

  - [x] 4.2 Implement `src/hooks/useParallax.js`

    - Hook to calculate parallax offset based on scroll position
    - Accept speed multiplier parameter
    - Use IntersectionObserver for performance
    - Respect reduced motion preference
    - _Requirements: 8.1, 8.2, 8.4_

  - [ ]\* 4.3 Write unit tests for custom hooks
    - Test useReducedMotion detects media query
    - Test useParallax calculates offsets correctly
    - Test hooks respect reduced motion
    - _Requirements: 8.1, 9.1_

---

## Phase 2: Core Visual Effects

- [x] 5. Implement GlitchText component

  - [x] 5.1 Create `src/components/effects/GlitchText.jsx`

    - Accept props: children, trigger, intensity, duration, className
    - Implement hover trigger with state management
    - Apply CSS glitch animation with data-text attribute
    - Use useReducedMotion hook to disable when needed
    - Add PropTypes and JSDoc documentation
    - _Requirements: 2.1, 2.2, 2.4_

  - [x] 5.2 Create CSS animations in `src/styles/animations.css`

    - Define @keyframes glitch with clip-path and transform
    - Define @keyframes glitch-rgb with text-shadow RGB split
    - Create intensity variants (low, medium, high)
    - Add prefers-reduced-motion media query to disable
    - _Requirements: 2.1, 2.4_

  - [x] 5.3 Write unit tests for GlitchText
    - Test component renders children correctly
    - Test hover trigger activates animation
    - Test reduced motion disables effect
    - Test intensity prop changes animation
    - _Requirements: 2.1, 2.4_

- [x] 6. Implement CircuitLines component

  - [x] 6.1 Create `src/components/effects/CircuitLines.jsx`

    - Accept props: pattern, density, animated, color
    - Generate SVG paths based on pattern type (grid, organic, torii)
    - Implement animated particles using SVG animateMotion
    - Use stroke-dasharray for connection effect
    - Add PropTypes and JSDoc documentation
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 6.2 Implement pattern generators

    - Create generateGridPattern() for grid layout
    - Create generateOrganicPattern() with bezier curves
    - Create generateToriiPattern() converging to torii shape
    - Limit to 20 paths maximum for performance
    - _Requirements: 6.1, 6.2_

  - [x] 6.3 Write unit tests for CircuitLines
    - Test SVG renders with correct pattern
    - Test density prop affects number of paths
    - Test animated prop controls animation
    - Test mobile reduces density automatically
    - _Requirements: 6.1, 6.4_

- [x] 7. Enhance BackgroundCanvas with kanji particles

  - [x] 7.1 Create `src/components/effects/KanjiParticle.jsx` helper

    - Component to render single kanji as Three.js sprite
    - Use TextureLoader to create kanji texture from canvas
    - Implement magnetic repulsion from cursor
    - Add breathing animation with sine wave
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 7.2 Integrate kanji particles into BackgroundCanvas

    - Add new layer <KanjiParticles /> to BackgroundCanvas.jsx
    - Use InstancedMesh for ~200 kanji instances (80 on mobile)
    - Calculate initial positions to form torii silhouette
    - Implement cursor attraction/repulsion logic
    - Add color transition based on scroll (cyan to purple)
    - _Requirements: 1.1, 1.2, 1.3, 1.5_

  - [x] 7.3 Implement torii formation algorithm

    - Define bezier curves for torii shape outline
    - Distribute particles along curves
    - Add slight randomness for organic feel
    - Animate particles to formation on page load
    - _Requirements: 1.5_

  - [x] 7.4 Write integration tests for enhanced BackgroundCanvas
    - Test kanji particles render correctly
    - Test cursor interaction works
    - Test mobile reduces particle count
    - Test reduced motion disables animations
    - _Requirements: 1.1, 1.4_

---

## Phase 3: Interactive Components

- [x] 8. Implement HolographicCard component

  - [x] 8.1 Create `src/components/effects/HolographicCard.jsx`

    - Extend existing Card component with holographic variant
    - Track mouse position with onMouseMove
    - Calculate radial gradient centered on cursor
    - Apply gradient as overlay with mix-blend-mode
    - Throttle mousemove to 60fps with requestAnimationFrame
    - _Requirements: 5.1, 5.2_

  - [x] 8.2 Implement scanning line effect

    - Add ::after pseudo-element for scanning line
    - Animate vertically with CSS keyframes
    - Sync with holographic shimmer
    - Add glow effect with box-shadow
    - _Requirements: 5.2_

  - [x] 8.3 Implement ripple effect on click

    - Create canvas element for ripple rendering
    - Calculate click position relative to card
    - Animate expanding circles with easing
    - Remove ripple after animation completes
    - _Requirements: 5.3_

  - [x] 8.4 Optimize for performance

    - Disable holographic effect on mobile (no hover)
    - Use will-change: transform for GPU acceleration
    - Memoize component with React.memo
    - Clean up event listeners on unmount
    - _Requirements: 5.1, 5.4_

  - [x] 8.5 Write unit tests for HolographicCard
    - Test mouse tracking works correctly
    - Test throttling limits event frequency
    - Test mobile disables hover effects
    - Test ripple triggers on click
    - _Requirements: 5.1, 5.3_

- [x] 9. Enhance existing UI components

  - [x] 9.1 Enhance Button component with effects

    - Add ripple effect on click (reuse from HolographicCard)
    - Add hologram flicker on hover using CSS animation
    - Create loading state with mini torii spinner
    - Maintain existing variants (primary, secondary, ghost)
    - _Requirements: 2.3, 5.3_

  - [x] 9.2 Enhance Badge component with kanji

    - Add optional kanji prop for prefix
    - Use getKanjiByCategory() to map category to kanji
    - Add glow animation for featured badges
    - Maintain existing color variants
    - _Requirements: 4.1, 4.2, 5.4_

  - [x] 9.3 Update Card component

    - Add "holographic" variant that uses HolographicCard
    - Maintain backward compatibility with existing variants
    - Update PropTypes and documentation
    - _Requirements: 5.1_

  - [x] 9.4 Write unit tests for enhanced UI components
    - Test Button ripple effect
    - Test Badge kanji rendering
    - Test Card holographic variant
    - Test backward compatibility
    - _Requirements: 2.3, 4.1, 5.1_

- [x] 10. Create ToriiLoader component

  - [x] 10.1 Create `src/components/loaders/ToriiLoader.jsx`

    - Create SVG of torii with separated paths for animation
    - Implement pulsing animation on circuits with stroke-dasharray
    - Add rotating messages (Japanese + English tech quotes)
    - Accept size prop (sm, md, lg)
    - Use Framer Motion for entrance/exit animations
    - _Requirements: 7.1, 7.2, 7.3_

  - [x] 10.2 Implement message rotation

    - Array of 4 messages: "技術は未来を創る", "Loading innovation...", "Connecting circuits...", "Initializing AI..."
    - Rotate every 3 seconds with fade transition
    - Use Framer Motion AnimatePresence
    - _Requirements: 7.2_

  - [ ]\* 10.3 Write unit tests for ToriiLoader
    - Test component renders SVG correctly
    - Test size prop affects dimensions
    - Test messages rotate correctly
    - Test animations respect reduced motion
    - _Requirements: 7.1, 7.2_

---

## Phase 4: Page Transitions & Polish

- [x] 11. Implement PageTransition component

  - [x] 11.1 Create `src/components/effects/PageTransition.jsx`

    - Use React Router's useLocation to detect route changes
    - Implement Framer Motion AnimatePresence for orchestration
    - Create wipe effect with animated clip-path
    - Add motion blur during transition with CSS filter
    - Detect navigation direction (forward/back) for animation direction
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 11.2 Integrate with App.jsx routing

    - Wrap Routes with PageTransition component
    - Configure transition duration (600ms default)
    - Show ToriiLoader if page load > 300ms
    - Handle rapid navigation (cancel incomplete transitions)
    - _Requirements: 3.1, 3.5_

  - [x] 11.3 Implement content reveal animation

    - Staggered fade-in + slide-up for page content
    - Use Framer Motion stagger children
    - Respect reduced motion preference
    - _Requirements: 3.3_

  - [ ]\* 11.4 Write integration tests for PageTransition
    - Test transition triggers on navigation
    - Test loader appears for slow loads
    - Test browser back/forward works
    - Test rapid navigation cancels transitions
    - _Requirements: 3.1, 3.4, 3.5_

- [x] 12. Implement enhanced parallax scrolling

  - [x] 12.1 Create `src/hooks/useParallaxScroll.js` (enhanced version)

    - Track scroll position with passive event listener
    - Calculate parallax offset for multiple layers
    - Use IntersectionObserver to only animate visible elements
    - Apply motion blur for fast scrolling
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 12.2 Apply parallax to key sections

    - Add parallax to hero section background
    - Add parallax to CircuitLines in sections
    - Add parallax to project cards
    - Configure different speeds for depth effect
    - _Requirements: 8.1, 8.2_

  - [x] 12.3 Implement "back to top" button

    - Show button when scroll > 80% of page
    - Use torii icon for button
    - Smooth scroll to top on click
    - Add entrance animation
    - _Requirements: 8.5_

  - [ ]\* 12.4 Write unit tests for parallax
    - Test scroll position calculation
    - Test IntersectionObserver integration
    - Test reduced motion disables parallax
    - Test back to top button appears/hides correctly
    - _Requirements: 8.1, 8.4, 8.5_

- [x] 13. Implement typography enhancements

  - [x] 13.1 Add kanji decorative prefixes to section titles

    - Create utility function to select appropriate kanji
    - Add as optional decorative element before h2 titles
    - Style with cyan color and smaller size
    - Make aria-hidden for accessibility
    - _Requirements: 4.1_

  - [x] 13.2 Implement Japanese-style quotation marks

    - Replace standard quotes with 「」 in blog content
    - Use CSS ::before and ::after for automatic replacement
    - Apply to blockquote elements
    - _Requirements: 4.2_

  - [x] 13.3 Style important numbers with digital counter effect

    - Add monospace font to metrics and statistics
    - Add subtle glow effect
    - Implement count-up animation on scroll into view
    - _Requirements: 4.3_

  - [x] 13.4 Customize text selection color
    - Set selection background to cyan with 20% opacity
    - Set selection text color to white
    - Apply globally in variables.css
    - _Requirements: 4.5_

---

## Phase 5: Easter Eggs & Accessibility

- [x] 14. Implement easter eggs system

  - [x] 14.1 Create `src/utils/easterEggs.js`

    - Define EasterEggManager class
    - Implement Konami code detection (↑↑↓↓←→←→BA)
    - Implement triple-click detection on logo
    - Implement special date detection
    - _Requirements: 10.1, 10.2, 10.3_

  - [x] 14.2 Implement Matrix Rain effect

    - Create canvas-based matrix rain with Japanese characters
    - Trigger on Konami code completion
    - Auto-dismiss after 10 seconds
    - Add escape key to dismiss early
    - _Requirements: 10.1_

  - [x] 14.3 Implement special torii animation

    - Create elaborate torii animation with circuit connections
    - Show hidden message: "改 (KAI) = Change, Innovation"
    - Trigger on triple-click of logo
    - _Requirements: 10.2_

  - [x] 14.4 Implement special date effects

    - Sakura petals for New Year (01-01)
    - Fireworks for company anniversary (10-13)
    - Subtle, non-intrusive animations
    - _Requirements: 10.3_

  - [x] 14.5 Integrate easter eggs into App
    - Add global keyboard listener for Konami code
    - Add click listener to logo component
    - Check date on app mount
    - Store discovered eggs in localStorage (optional)
    - _Requirements: 10.1, 10.2, 10.3_

- [x] 15. Implement high contrast mode

  - [x] 15.1 Add high contrast CSS in variables.css

    - Use @media (prefers-contrast: high)
    - Increase color contrast ratios to 7:1 minimum
    - Increase border widths for better visibility
    - Disable subtle effects (glitch, holographic)
    - _Requirements: 9.1, 9.2, 9.3_

  - [x] 15.2 Test with system high contrast mode
    - Test on Windows High Contrast
    - Test on macOS Increase Contrast
    - Verify all text is readable
    - Verify interactive elements are visible
    - _Requirements: 9.1, 9.4_

- [x] 16. Accessibility audit and fixes

  - [x] 16.1 Ensure keyboard navigation works

    - Test tab order through all interactive elements
    - Verify focus indicators are visible over effects
    - Add keyboard alternatives for mouse-only easter eggs
    - Test with screen reader (VoiceOver/NVDA)
    - _Requirements: 9.1, 9.2_

  - [x] 16.2 Add ARIA labels and roles

    - Add aria-hidden="true" to decorative elements
    - Add role="status" to loaders with aria-live
    - Add aria-label to icon-only buttons
    - Announce page transitions to screen readers
    - _Requirements: 9.1_

  - [x] 16.3 Verify color contrast ratios

    - Test all text combinations with contrast checker
    - Ensure minimum 4.5:1 for normal text
    - Ensure minimum 3:1 for large text and UI components
    - Fix any failing combinations
    - _Requirements: 9.1_

  - [ ]\* 16.4 Run automated accessibility tests
    - Use axe-core or similar tool
    - Fix all critical and serious issues
    - Document any known limitations
    - _Requirements: 9.1_

---

## Phase 6: Testing & Optimization

- [ ]\* 17. Performance optimization

  - [ ]\* 17.1 Implement code splitting

    - Lazy load all effect components with React.lazy
    - Add Suspense boundaries with appropriate fallbacks
    - Measure bundle size reduction
    - _Requirements: 1.4, 6.4_

  - [ ]\* 17.2 Optimize animations

    - Ensure all animations use transform and opacity only
    - Add will-change hints where appropriate
    - Profile with Chrome DevTools Performance tab
    - Optimize any animations causing jank
    - _Requirements: 1.4, 6.4_

  - [ ]\* 17.3 Mobile optimization

    - Test on real devices (iPhone, Android)
    - Verify automatic degradation works
    - Ensure 40+ FPS on mid-range devices
    - Reduce particle counts if needed
    - _Requirements: 1.4, 6.4_

  - [ ]\* 17.4 Bundle size analysis
    - Run bundle analyzer
    - Identify largest dependencies
    - Consider tree-shaking opportunities
    - Ensure total increase < 50KB gzipped
    - _Requirements: 1.4_

- [ ]\* 18. Cross-browser testing

  - [ ]\* 18.1 Test on all target browsers

    - Chrome 90+ (Windows, Mac, Android)
    - Firefox 88+ (Windows, Mac)
    - Safari 14+ (Mac, iOS)
    - Edge 90+ (Windows)
    - _Requirements: All_

  - [ ]\* 18.2 Fix browser-specific issues
    - Implement fallbacks for unsupported features
    - Test backdrop-filter fallback in Safari < 14.1
    - Verify all animations work consistently
    - _Requirements: All_

- [ ]\* 19. Integration testing

  - [ ]\* 19.1 Test complete user flows

    - Navigate through all pages with transitions
    - Interact with all enhanced components
    - Trigger all easter eggs
    - Test with reduced motion enabled
    - Test with high contrast enabled
    - _Requirements: All_

  - [ ]\* 19.2 Performance testing
    - Run Lighthouse audits (target: 98+ score)
    - Measure FPS during animations (target: 60fps desktop, 55+ mobile)
    - Measure Time to Interactive (target: < 2s)
    - Verify no performance regressions
    - _Requirements: 1.4, 6.4_

---

## Phase 7: Deployment & Documentation

- [x] 20. Feature flags setup

  - [x] 20.1 Create feature configuration

    - Add environment variables to .env files
    - Create src/config/features.js with feature flags
    - Implement conditional rendering based on flags
    - _Requirements: All_

  - [x] 20.2 Test with flags enabled/disabled
    - Verify site works with all flags off
    - Test enabling flags one by one
    - Ensure no errors when features disabled
    - _Requirements: All_

- [x] 21. Documentation

  - [x] 21.1 Update component documentation

    - Add JSDoc comments to all new components
    - Document props with PropTypes descriptions
    - Add usage examples
    - Document accessibility considerations
    - _Requirements: All_

  - [x] 21.2 Update README.md

    - Add new features section
    - Document browser compatibility
    - Add performance considerations
    - Document accessibility features
    - Add troubleshooting section
    - _Requirements: All_

  - [x] 21.3 Create CHANGELOG.md entry
    - List all new features
    - List all enhancements
    - Note any breaking changes (none expected)
    - Credit contributors
    - _Requirements: All_

- [ ] 22. Gradual rollout to production

  - [x] 22.1 Deploy to dev branch

    - Merge all changes to dev
    - Deploy to preview URL
    - Test all features thoroughly
    - Fix any critical bugs
    - _Requirements: All_

  - [ ] 22.2 Deploy to production with flags OFF

    - Merge dev to main
    - Deploy to production
    - Verify deployment successful
    - Confirm no visual changes (flags off)
    - _Requirements: All_

  - [ ] 22.3 Enable features gradually

    - Day 1: Enable glitch effects (monitor metrics)
    - Day 2: Enable holographic cards (monitor metrics)
    - Day 3: Enable page transitions (monitor metrics)
    - Day 4: Enable kanji particles (monitor metrics)
    - Day 5: Enable easter eggs (monitor metrics)
    - _Requirements: All_

  - [ ] 22.4 Monitor and iterate
    - Monitor error rates (target: < 0.1%)
    - Monitor performance metrics
    - Gather user feedback
    - Make adjustments as needed
    - _Requirements: All_
