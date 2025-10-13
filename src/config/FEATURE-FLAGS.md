# Feature Flags Documentation

## Overview

This document describes the feature flag system for the Japanese-Cyberpunk enhancements. Feature flags allow for gradual rollout, A/B testing, and easy enabling/disabling of features without code changes.

## Configuration

Feature flags are configured via environment variables in `.env.local` and managed through `src/config/features.js`.

### Environment Variables

All feature flags use the `VITE_` prefix to be accessible in the browser. Set values to `'true'` to enable or `'false'` (or omit) to disable.

```bash
# Feature Flags - Japanese Cyberpunk Enhancements
VITE_FEATURE_KANJI=true
VITE_FEATURE_GLITCH=true
VITE_FEATURE_HOLO=true
VITE_FEATURE_TRANSITIONS=true
VITE_FEATURE_CIRCUITS=true
VITE_FEATURE_PARALLAX=true
VITE_FEATURE_TYPOGRAPHY=true
VITE_FEATURE_LOADERS=true
VITE_FEATURE_EASTER_EGGS=true
VITE_FEATURE_ENHANCED_UI=true
```

## Available Features

### 1. Kanji Particles (`VITE_FEATURE_KANJI`)

**Description:** Enables kanji particles in the 3D background canvas with torii formation and cursor interaction.

**Components Affected:**
- `BackgroundCanvas.jsx`
- `KanjiParticle.jsx`

**Usage:**
```jsx
import { features } from './config/features';

{features.kanjiParticles && <KanjiParticles />}
```

### 2. Glitch Effects (`VITE_FEATURE_GLITCH`)

**Description:** Enables cyberpunk glitch effects on text and UI elements including RGB split, digital reveal, and hologram flicker.

**Components Affected:**
- `GlitchText.jsx`
- Various UI components with glitch animations

**Usage:**
```jsx
import { features } from './config/features';

{features.glitchEffects && (
  <GlitchText trigger="hover">KAINET</GlitchText>
)}
```

### 3. Holographic Cards (`VITE_FEATURE_HOLO`)

**Description:** Enables holographic effects on cards including shimmer, scanning line, and ripple effects.

**Components Affected:**
- `HolographicCard.jsx`
- `Card.jsx` (holographic variant)

**Usage:**
```jsx
import { features } from './config/features';

{features.holographicCards && (
  <HolographicCard>Content</HolographicCard>
)}
```

### 4. Page Transitions (`VITE_FEATURE_TRANSITIONS`)

**Description:** Enables animated page transitions with wipe effect, motion blur, and content reveal.

**Components Affected:**
- `PageTransition.jsx`
- `App.jsx`

**Usage:**
```jsx
import { features } from './config/features';

{features.pageTransitions ? (
  <PageTransition>{children}</PageTransition>
) : (
  children
)}
```

### 5. Circuit Lines (`VITE_FEATURE_CIRCUITS`)

**Description:** Enables decorative circuit line elements with animated particles and connection effects.

**Components Affected:**
- `CircuitLines.jsx`

**Usage:**
```jsx
import { features } from './config/features';

{features.circuitLines && (
  <CircuitLines pattern="torii" animated />
)}
```

### 6. Parallax Scrolling (`VITE_FEATURE_PARALLAX`)

**Description:** Enables enhanced parallax scrolling with multi-layer effects and motion blur.

**Components Affected:**
- `useParallaxScroll.js`
- Various page components

**Usage:**
```jsx
import { features } from './config/features';
import { useParallaxScroll } from './hooks/useParallaxScroll';

const offset = features.parallaxScrolling ? useParallaxScroll(0.5) : 0;
```

### 7. Typography Enhancements (`VITE_FEATURE_TYPOGRAPHY`)

**Description:** Enables typography enhancements including kanji prefixes, Japanese quotes, and digital counters.

**Components Affected:**
- `SectionTitle.jsx`
- `DigitalCounter.jsx`
- Various text components

**Usage:**
```jsx
import { features } from './config/features';

{features.typographyEnhancements && (
  <span className="kanji-prefix">技術</span>
)}
```

### 8. Custom Loaders (`VITE_FEATURE_LOADERS`)

**Description:** Enables custom loading components with animated torii and rotating messages.

**Components Affected:**
- `ToriiLoader.jsx`
- `ToriiLoaderMini.jsx`

**Usage:**
```jsx
import { features } from './config/features';

{loading && features.customLoaders ? (
  <ToriiLoader />
) : (
  <DefaultLoader />
)}
```

### 9. Easter Eggs (`VITE_FEATURE_EASTER_EGGS`)

**Description:** Enables interactive easter eggs including Konami code, triple-click effects, and special date animations.

**Components Affected:**
- `MatrixRain.jsx`
- `ToriiAnimation.jsx`
- `SakuraPetals.jsx`
- `Fireworks.jsx`
- `useEasterEggs.js`

**Usage:**
```jsx
import { features } from './config/features';

{features.easterEggs && (
  <EasterEggProvider>
    {children}
  </EasterEggProvider>
)}
```

### 10. Enhanced UI (`VITE_FEATURE_ENHANCED_UI`)

**Description:** Enables enhanced UI components including button ripples, badge kanji, and card variants.

**Components Affected:**
- `Button.jsx`
- `Badge.jsx`
- `Card.jsx`

**Usage:**
```jsx
import { features } from './config/features';

<Button ripple={features.enhancedUI}>
  Click Me
</Button>
```

## API Reference

### `features` Object

The main export from `src/config/features.js` containing all feature flags.

```javascript
import { features } from './config/features';

console.log(features.kanjiParticles); // true or false
```

### `isFeatureEnabled(featureName)`

Check if a specific feature is enabled.

```javascript
import { isFeatureEnabled } from './config/features';

if (isFeatureEnabled('glitchEffects')) {
  // Apply glitch effect
}
```

### `getEnabledFeatures()`

Get an array of all enabled feature names.

```javascript
import { getEnabledFeatures } from './config/features';

const enabled = getEnabledFeatures();
console.log('Enabled features:', enabled);
// Output: ['kanjiParticles', 'glitchEffects', ...]
```

### `getDisabledFeatures()`

Get an array of all disabled feature names.

```javascript
import { getDisabledFeatures } from './config/features';

const disabled = getDisabledFeatures();
console.log('Disabled features:', disabled);
```

### `hasAnyFeatureEnabled()`

Check if at least one feature is enabled.

```javascript
import { hasAnyFeatureEnabled } from './config/features';

if (hasAnyFeatureEnabled()) {
  console.log('Some enhancements are active');
}
```

### `areAllFeaturesEnabled()`

Check if all features are enabled.

```javascript
import { areAllFeaturesEnabled } from './config/features';

if (areAllFeaturesEnabled()) {
  console.log('All enhancements are active');
}
```

### `logFeatureStatus()`

Log feature flags status to console (development only).

```javascript
import { logFeatureStatus } from './config/features';

logFeatureStatus();
// Console output:
// 🎌 Feature Flags Status
// ✅ kanjiParticles: true
// ✅ glitchEffects: true
// ...
```

## Gradual Rollout Strategy

### Phase 1: Deploy with All Flags OFF

```bash
# .env.local
VITE_FEATURE_KANJI=false
VITE_FEATURE_GLITCH=false
VITE_FEATURE_HOLO=false
VITE_FEATURE_TRANSITIONS=false
VITE_FEATURE_CIRCUITS=false
VITE_FEATURE_PARALLAX=false
VITE_FEATURE_TYPOGRAPHY=false
VITE_FEATURE_LOADERS=false
VITE_FEATURE_EASTER_EGGS=false
VITE_FEATURE_ENHANCED_UI=false
```

Deploy to production. Site should work exactly as before.

### Phase 2: Enable Core Visual Effects

```bash
# Day 1: Enable glitch effects
VITE_FEATURE_GLITCH=true

# Day 2: Enable typography enhancements
VITE_FEATURE_TYPOGRAPHY=true

# Day 3: Enable enhanced UI
VITE_FEATURE_ENHANCED_UI=true
```

Monitor metrics after each change.

### Phase 3: Enable Interactive Features

```bash
# Day 4: Enable holographic cards
VITE_FEATURE_HOLO=true

# Day 5: Enable circuit lines
VITE_FEATURE_CIRCUITS=true

# Day 6: Enable custom loaders
VITE_FEATURE_LOADERS=true
```

### Phase 4: Enable Advanced Features

```bash
# Day 7: Enable kanji particles
VITE_FEATURE_KANJI=true

# Day 8: Enable parallax scrolling
VITE_FEATURE_PARALLAX=true

# Day 9: Enable page transitions
VITE_FEATURE_TRANSITIONS=true
```

### Phase 5: Enable Easter Eggs

```bash
# Day 10: Enable easter eggs
VITE_FEATURE_EASTER_EGGS=true
```

## Testing

### Test All Flags OFF

```bash
# Set all flags to false
VITE_FEATURE_KANJI=false
VITE_FEATURE_GLITCH=false
# ... etc

# Run dev server
npm run dev

# Verify:
# - Site loads without errors
# - No visual changes from baseline
# - All functionality works
```

### Test Individual Flags

```bash
# Enable one flag at a time
VITE_FEATURE_GLITCH=true

# Run dev server
npm run dev

# Verify:
# - Feature works as expected
# - No console errors
# - Performance is acceptable
```

### Test All Flags ON

```bash
# Set all flags to true
VITE_FEATURE_KANJI=true
VITE_FEATURE_GLITCH=true
# ... etc

# Run dev server
npm run dev

# Verify:
# - All features work together
# - No conflicts between features
# - Performance is acceptable
```

## Monitoring

### Metrics to Track

1. **Error Rate**: Should remain < 0.1%
2. **Performance**: 
   - FPS should stay > 55 on desktop
   - FPS should stay > 40 on mobile
3. **Load Time**: Should remain < 2s
4. **User Engagement**: Track time on site, bounce rate

### Rollback Procedure

If issues are detected:

1. Set problematic feature flag to `false` in `.env.local`
2. Rebuild and redeploy: `npm run build && npm run deploy`
3. Investigate issue in development
4. Fix and test thoroughly
5. Re-enable feature flag

## Best Practices

### 1. Always Use Feature Flags for New Features

```jsx
// ✅ Good
{features.newFeature && <NewComponent />}

// ❌ Bad
<NewComponent />
```

### 2. Provide Fallbacks

```jsx
// ✅ Good
{features.customLoaders ? <ToriiLoader /> : <DefaultLoader />}

// ❌ Bad
{features.customLoaders && <ToriiLoader />}
// (No fallback if feature is disabled)
```

### 3. Test Both States

Always test with feature enabled AND disabled.

### 4. Document Dependencies

If features depend on each other, document it:

```javascript
// holographicCards requires enhancedUI to be enabled
if (features.holographicCards && !features.enhancedUI) {
  console.warn('holographicCards requires enhancedUI');
}
```

### 5. Clean Up Old Flags

Once a feature is stable and permanently enabled, remove the flag and conditional logic.

## Troubleshooting

### Feature Not Working

1. Check environment variable is set correctly
2. Restart dev server (Vite needs restart for env changes)
3. Check browser console for errors
4. Verify feature flag is imported correctly

### Feature Flag Not Updating

1. Restart dev server
2. Clear browser cache
3. Check `.env.local` file is in project root
4. Verify variable name has `VITE_` prefix

### All Features Disabled

1. Check `.env.local` exists
2. Verify all variables are set to `'true'` (string, not boolean)
3. Restart dev server
4. Check console for feature status log

## Examples

### Example 1: Conditional Component Rendering

```jsx
import { features } from './config/features';

const MyComponent = () => {
  return (
    <div>
      <h1>Welcome</h1>
      
      {/* Only show glitch effect if enabled */}
      {features.glitchEffects ? (
        <GlitchText>KAINET</GlitchText>
      ) : (
        <span>KAINET</span>
      )}
    </div>
  );
};
```

### Example 2: Conditional Props

```jsx
import { features } from './config/features';

const MyCard = () => {
  return (
    <Card 
      variant={features.holographicCards ? 'holographic' : 'default'}
      ripple={features.enhancedUI}
    >
      Content
    </Card>
  );
};
```

### Example 3: Conditional Hook Usage

```jsx
import { features } from './config/features';
import { useParallaxScroll } from './hooks/useParallaxScroll';

const MySection = () => {
  const parallaxOffset = features.parallaxScrolling 
    ? useParallaxScroll(0.5) 
    : 0;
  
  return (
    <div style={{ transform: `translateY(${parallaxOffset}px)` }}>
      Content
    </div>
  );
};
```

### Example 4: Multiple Feature Check

```jsx
import { features, hasAnyFeatureEnabled } from './config/features';

const EnhancedSection = () => {
  // Only render enhanced version if any feature is enabled
  if (!hasAnyFeatureEnabled()) {
    return <BasicSection />;
  }
  
  return (
    <div className="enhanced-section">
      {features.circuitLines && <CircuitLines />}
      {features.glitchEffects && <GlitchText>Title</GlitchText>}
      {features.parallaxScrolling && <ParallaxBackground />}
    </div>
  );
};
```

## Support

For questions or issues with feature flags:

1. Check this documentation
2. Review `src/config/features.js` source code
3. Check browser console for feature status log
4. Contact development team

---

**Last Updated:** 2025-01-13
**Version:** 1.0.0
