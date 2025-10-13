# Feature Flags Testing Guide

## Overview

This guide provides instructions for testing the feature flag system for the Japanese-Cyberpunk enhancements. Feature flags allow for gradual rollout and easy enabling/disabling of features.

## Quick Start

### 1. Automated Test Script

Run the automated test script to generate different configurations:

```bash
node scripts/test-feature-flags.js
```

This will:
- Backup your current `.env.local`
- Generate 4 test configurations
- Provide instructions for manual verification
- Show a testing checklist

### 2. Manual Configuration

Edit `.env.local` and set feature flags:

```bash
# Enable all features
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

### 3. Restart Dev Server

After changing flags, restart the dev server:

```bash
npm run dev
```

## Test Configurations

### Configuration 1: All Features OFF (Baseline)

**Purpose:** Verify site works without enhancements

```bash
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

**Expected Behavior:**
- ✅ Site loads without errors
- ✅ No visual enhancements visible
- ✅ All basic functionality works
- ✅ Standard page transitions (no wipe effect)
- ✅ Standard loaders (no torii)
- ✅ No kanji particles in background
- ✅ No glitch effects
- ✅ No holographic cards
- ✅ No easter eggs

**Verification Steps:**
1. Open http://localhost:5173
2. Navigate through all pages
3. Check browser console - should show all flags as ❌
4. Verify no console errors
5. Test all forms and interactions
6. Check mobile view

### Configuration 2: All Features ON (Full Enhancement)

**Purpose:** Verify all features work together

```bash
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

**Expected Behavior:**
- ✅ Kanji particles visible in background
- ✅ Particles form torii shape
- ✅ Glitch effects on logo hover
- ✅ Holographic shimmer on cards
- ✅ Page transitions with wipe effect
- ✅ Circuit lines in sections
- ✅ Kanji prefixes on section titles
- ✅ Torii loader when loading
- ✅ Easter eggs functional (Konami code, triple-click)
- ✅ Button ripple effects
- ✅ Badge kanji

**Verification Steps:**
1. Open http://localhost:5173
2. Check browser console - should show all flags as ✅
3. Hover over logo - should see glitch effect
4. Navigate between pages - should see wipe transition
5. Hover over project cards - should see holographic effect
6. Try Konami code (↑↑↓↓←→←→BA) - should see matrix rain
7. Triple-click logo - should see torii animation
8. Check mobile view - should see reduced effects
9. Monitor FPS in DevTools (target: 60fps desktop, 40+ mobile)

### Configuration 3: Core Features Only

**Purpose:** Test essential enhancements without heavy effects

```bash
VITE_FEATURE_KANJI=false
VITE_FEATURE_GLITCH=true
VITE_FEATURE_HOLO=false
VITE_FEATURE_TRANSITIONS=false
VITE_FEATURE_CIRCUITS=false
VITE_FEATURE_PARALLAX=false
VITE_FEATURE_TYPOGRAPHY=true
VITE_FEATURE_LOADERS=true
VITE_FEATURE_EASTER_EGGS=false
VITE_FEATURE_ENHANCED_UI=true
```

**Expected Behavior:**
- ✅ Glitch effects enabled
- ✅ Typography enhancements enabled
- ✅ Custom loaders enabled
- ✅ Enhanced UI enabled
- ❌ No kanji particles
- ❌ No holographic cards
- ❌ No page transitions
- ❌ No circuit lines
- ❌ No parallax
- ❌ No easter eggs

**Verification Steps:**
1. Verify only enabled features are visible
2. Check disabled features are not present
3. Verify no console errors
4. Test performance (should be better than full enhancement)

### Configuration 4: Gradual Rollout (Phase 2)

**Purpose:** Simulate gradual rollout scenario

```bash
VITE_FEATURE_KANJI=false
VITE_FEATURE_GLITCH=true
VITE_FEATURE_HOLO=true
VITE_FEATURE_TRANSITIONS=false
VITE_FEATURE_CIRCUITS=true
VITE_FEATURE_PARALLAX=false
VITE_FEATURE_TYPOGRAPHY=true
VITE_FEATURE_LOADERS=true
VITE_FEATURE_EASTER_EGGS=false
VITE_FEATURE_ENHANCED_UI=true
```

**Expected Behavior:**
- Mix of enabled and disabled features
- No conflicts between features
- Smooth degradation for disabled features

**Verification Steps:**
1. Verify feature combination works correctly
2. Check no errors from disabled features
3. Test all enabled features function properly

## Testing Checklist

### Functional Testing

- [ ] Site loads without errors
- [ ] All navigation links work
- [ ] Forms submit correctly
- [ ] Images load properly
- [ ] Responsive design works
- [ ] All pages render correctly

### Feature-Specific Testing

#### Kanji Particles
- [ ] Particles visible in background
- [ ] Particles form torii shape
- [ ] Cursor interaction works
- [ ] Color transitions on scroll
- [ ] Reduced count on mobile

#### Glitch Effects
- [ ] Logo glitch on hover
- [ ] Title digital reveal
- [ ] Button hologram flicker
- [ ] Respects reduced motion

#### Holographic Cards
- [ ] Shimmer follows cursor
- [ ] Scanning line animates
- [ ] Ripple on click
- [ ] Disabled on mobile

#### Page Transitions
- [ ] Wipe effect on navigation
- [ ] Motion blur during transition
- [ ] Content reveal animation
- [ ] Browser back/forward works

#### Circuit Lines
- [ ] Lines visible in sections
- [ ] Particles flow along paths
- [ ] Connection pulses
- [ ] Simplified on mobile

#### Parallax Scrolling
- [ ] Background moves at different speed
- [ ] Smooth animation
- [ ] Motion blur on fast scroll
- [ ] Disabled with reduced motion

#### Typography Enhancements
- [ ] Kanji prefixes on titles
- [ ] Japanese quotes in content
- [ ] Digital counter effect
- [ ] Custom selection color

#### Custom Loaders
- [ ] Torii loader appears
- [ ] Messages rotate
- [ ] Smooth animations
- [ ] Respects reduced motion

#### Easter Eggs
- [ ] Konami code triggers matrix rain
- [ ] Triple-click triggers torii animation
- [ ] Special date effects work
- [ ] Can be dismissed

#### Enhanced UI
- [ ] Button ripple effect
- [ ] Badge kanji display
- [ ] Card holographic variant
- [ ] Backward compatibility

### Performance Testing

- [ ] Desktop FPS: 60fps
- [ ] Mobile FPS: 40+ fps
- [ ] Load time: < 2s
- [ ] No memory leaks
- [ ] Smooth animations
- [ ] No jank or stuttering

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] Reduced motion respected
- [ ] High contrast mode works
- [ ] Color contrast ratios pass
- [ ] ARIA labels present

### Browser Testing

- [ ] Chrome 90+ (Windows, Mac, Android)
- [ ] Firefox 88+ (Windows, Mac)
- [ ] Safari 14+ (Mac, iOS)
- [ ] Edge 90+ (Windows)

### Mobile Testing

- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad, Android)
- [ ] Effects reduced appropriately
- [ ] Touch interactions work
- [ ] Performance acceptable

## Console Verification

### Feature Status Log

When you open the site in development mode, you should see:

```
🎌 Feature Flags Status
✅ kanjiParticles: true
✅ glitchEffects: true
✅ holographicCards: true
✅ pageTransitions: true
✅ circuitLines: true
✅ parallaxScrolling: true
✅ typographyEnhancements: true
✅ customLoaders: true
✅ easterEggs: true
✅ enhancedUI: true
```

### No Errors

Check for:
- ❌ No console errors
- ❌ No console warnings
- ❌ No failed network requests
- ❌ No React errors

## Performance Monitoring

### Chrome DevTools

1. Open DevTools (F12)
2. Go to Performance tab
3. Click Record
4. Interact with the site
5. Stop recording
6. Check:
   - FPS should be 60 (or close)
   - No long tasks (> 50ms)
   - Smooth frame rate

### Lighthouse Audit

```bash
npm run build
npm run preview
```

Then run Lighthouse:
- Performance: 98+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## Common Issues

### Issue: Features not updating

**Solution:**
1. Restart dev server
2. Clear browser cache
3. Hard reload (Cmd+Shift+R / Ctrl+Shift+R)

### Issue: Console errors

**Solution:**
1. Check feature flag syntax (must be 'true' or 'false' as strings)
2. Verify all required components are imported
3. Check for missing dependencies

### Issue: Performance degradation

**Solution:**
1. Disable heavy features (kanji, parallax)
2. Check for memory leaks
3. Verify GPU acceleration is working
4. Test on different devices

### Issue: Features not visible

**Solution:**
1. Check feature flag is set to 'true'
2. Verify component is conditionally rendered
3. Check CSS is not hiding elements
4. Verify no JavaScript errors

## Rollback Procedure

If issues are detected:

1. **Immediate Rollback:**
   ```bash
   # Set problematic flag to false
   VITE_FEATURE_PROBLEMATIC=false
   
   # Restart dev server
   npm run dev
   ```

2. **Full Rollback:**
   ```bash
   # Set all flags to false
   # Edit .env.local and set all to false
   
   # Or restore backup
   cp .env.local.backup .env.local
   
   # Restart dev server
   npm run dev
   ```

3. **Investigate:**
   - Check browser console
   - Review error logs
   - Test in isolation
   - Fix issue

4. **Re-enable:**
   - Set flag back to true
   - Test thoroughly
   - Monitor metrics

## Gradual Rollout Strategy

### Week 1: Core Features
```bash
VITE_FEATURE_GLITCH=true
VITE_FEATURE_TYPOGRAPHY=true
VITE_FEATURE_ENHANCED_UI=true
```

### Week 2: Interactive Features
```bash
# Keep Week 1 flags
VITE_FEATURE_HOLO=true
VITE_FEATURE_CIRCUITS=true
VITE_FEATURE_LOADERS=true
```

### Week 3: Advanced Features
```bash
# Keep Week 1-2 flags
VITE_FEATURE_KANJI=true
VITE_FEATURE_PARALLAX=true
VITE_FEATURE_TRANSITIONS=true
```

### Week 4: Easter Eggs
```bash
# Keep all previous flags
VITE_FEATURE_EASTER_EGGS=true
```

## Monitoring Metrics

### Key Metrics to Track

1. **Error Rate:** < 0.1%
2. **Performance:**
   - FPS: 60 desktop, 40+ mobile
   - Load time: < 2s
   - Time to Interactive: < 2s
3. **User Engagement:**
   - Time on site
   - Bounce rate
   - Page views
4. **Feedback:**
   - User comments
   - Support tickets
   - Analytics events

## Documentation

For more information:
- [Feature Flags Documentation](src/config/FEATURE-FLAGS.md)
- [Design Document](.kiro/specs/japanese-cyberpunk-enhancements/design.md)
- [Requirements](.kiro/specs/japanese-cyberpunk-enhancements/requirements.md)

## Support

If you encounter issues:
1. Check this guide
2. Review console logs
3. Test with different configurations
4. Contact development team

---

**Last Updated:** 2025-01-13
**Version:** 1.0.0
