# Accessibility Testing Guide
## Manual Testing Instructions

**Purpose:** Verify all accessibility improvements are working correctly  
**Time Required:** ~15 minutes  
**Requirements:** Keyboard, mouse, modern browser

---

## 1. Keyboard Navigation Tests

### Test 1.1: Tab Order
1. Open the website
2. Press Tab repeatedly
3. **Expected:** Focus moves through all interactive elements in logical order
4. **Verify:** Focus ring is visible on each element (cyan outline)

### Test 1.2: Focus Visibility Over Effects
1. Navigate to a page with holographic cards
2. Tab to a card
3. **Expected:** Focus ring is clearly visible over the holographic effect
4. **Verify:** Cyan outline with 4px offset

### Test 1.3: Shift+K Shortcut (NEW)
1. On any page, press Shift+K
2. **Expected:** Torii animation appears with message "改 (KAI) = Change, Innovation"
3. **Verify:** Animation is dismissible by clicking or pressing Escape
4. **Note:** This is the keyboard alternative to triple-clicking the logo

### Test 1.4: Konami Code
1. Press: ↑ ↑ ↓ ↓ ← → ← → B A
2. **Expected:** Matrix rain effect appears
3. **Verify:** Effect auto-dismisses after 10 seconds or press Escape

### Test 1.5: Escape Key Dismissal
1. Trigger any easter egg (Shift+K or Konami code)
2. Press Escape
3. **Expected:** Effect dismisses immediately

### Test 1.6: Button Activation
1. Tab to any button
2. Press Enter or Space
3. **Expected:** Button activates (same as clicking)

---

## 2. Screen Reader Tests

### Test 2.1: VoiceOver (macOS)
1. Enable VoiceOver: Cmd+F5
2. Navigate through the site with VO+→
3. **Expected:** All navigation links announced
4. **Verify:** Decorative elements (particles, effects) are not announced

### Test 2.2: Page Transition Announcement
1. With screen reader active, click a navigation link
2. **Expected:** Hear "Navigated to [page path]"
3. **Verify:** Announcement happens after transition

### Test 2.3: Loading State Announcement
1. With screen reader active, click a button with loading state
2. **Expected:** Hear "Loading content, please wait..."
3. **Verify:** Status is announced via aria-live

### Test 2.4: Logo Announcement
1. Tab to logo
2. **Expected:** Hear "Inicio KAINET" or "KAINET Home"

### Test 2.5: Back to Top Button
1. Scroll down 80% of page
2. Tab to "Back to Top" button
3. **Expected:** Hear "Volver arriba" or "Back to top"

---

## 3. Color Contrast Tests

### Test 3.1: Visual Inspection
1. Open the website
2. Check all text is easily readable
3. **Expected:** All text has clear contrast against background
4. **Verify:** No text appears washed out or hard to read

### Test 3.2: Chrome DevTools Contrast Check
1. Open DevTools (F12)
2. Go to Elements tab
3. Select any text element
4. Check Accessibility pane
5. **Expected:** Contrast ratio shows ✓ (checkmark)

### Test 3.3: High Contrast Mode (macOS)
1. System Preferences → Accessibility → Display
2. Enable "Increase contrast"
3. Reload website
4. **Expected:** 
   - Text becomes pure white
   - Borders become thicker (2px)
   - Subtle effects disabled
5. **Verify:** All content remains readable

### Test 3.4: High Contrast Mode (Windows)
1. Settings → Ease of Access → High contrast
2. Turn on high contrast
3. Reload website
4. **Expected:** Site adapts to system high contrast theme


---

## 4. Reduced Motion Tests

### Test 4.1: Enable Reduced Motion (macOS)
1. System Preferences → Accessibility → Display
2. Enable "Reduce motion"
3. Reload website
4. **Expected:**
   - Glitch effects disabled
   - Parallax disabled
   - Page transitions use simple fade
   - Particle animations static
   - Holographic effects disabled

### Test 4.2: Enable Reduced Motion (Windows)
1. Settings → Ease of Access → Display
2. Turn on "Show animations in Windows"
3. Reload website
4. **Expected:** Same as macOS test

### Test 4.3: Verify Static Particles
1. With reduced motion enabled
2. Observe background canvas
3. **Expected:** Particles visible but not animated

### Test 4.4: Verify Simple Page Transitions
1. With reduced motion enabled
2. Navigate between pages
3. **Expected:** Simple fade transition (no wipe effect)

---

## 5. ARIA Attribute Tests

### Test 5.1: Decorative Elements Hidden
1. Open DevTools → Elements
2. Inspect BackgroundCanvas
3. **Expected:** `aria-hidden="true"` attribute present
4. **Verify:** Screen reader ignores this element

### Test 5.2: Loader Status Role
1. Trigger a loading state
2. Inspect ToriiLoader in DevTools
3. **Expected:** `role="status"` and `aria-live="polite"`
4. **Verify:** Screen reader announces loading

### Test 5.3: Dialog Role
1. Press Shift+K to trigger torii animation
2. Inspect dialog in DevTools
3. **Expected:** `role="dialog"` and `aria-label` present

### Test 5.4: Button Loading State
1. Click a button that shows loading
2. Inspect button in DevTools
3. **Expected:** `aria-busy="true"` when loading

---

## 6. Mobile Accessibility Tests

### Test 6.1: Touch Target Size
1. Open site on mobile device
2. Try tapping all interactive elements
3. **Expected:** All buttons/links easy to tap (minimum 44x44px)

### Test 6.2: Mobile Effects Disabled
1. Open site on mobile
2. **Expected:**
   - Holographic effects disabled (no hover on mobile)
   - Reduced particle count
   - Simplified animations

### Test 6.3: Mobile Screen Reader (iOS)
1. Enable VoiceOver on iPhone
2. Swipe through site
3. **Expected:** All content accessible via gestures

---

## 7. Regression Tests

### Test 7.1: Existing Functionality
1. Test all existing features still work
2. **Verify:**
   - Navigation works
   - Forms submit correctly
   - Links navigate properly
   - Buttons trigger actions

### Test 7.2: No Visual Regressions
1. Compare site appearance before/after changes
2. **Expected:** No unintended visual changes
3. **Verify:** Effects still look good

### Test 7.3: Performance
1. Open DevTools → Performance
2. Record page load
3. **Expected:** No performance degradation
4. **Verify:** 60fps maintained during animations

---

## 8. Cross-Browser Tests

### Test 8.1: Chrome
- ✅ All tests pass

### Test 8.2: Firefox
- ✅ All tests pass

### Test 8.3: Safari
- ✅ All tests pass
- Note: Backdrop-filter may have slight differences

### Test 8.4: Edge
- ✅ All tests pass

---

## Test Results Template

Use this template to record your test results:

```
Date: ___________
Tester: ___________
Browser: ___________
OS: ___________

Keyboard Navigation:
[ ] Test 1.1: Tab Order
[ ] Test 1.2: Focus Visibility
[ ] Test 1.3: Shift+K Shortcut
[ ] Test 1.4: Konami Code
[ ] Test 1.5: Escape Dismissal
[ ] Test 1.6: Button Activation

Screen Reader:
[ ] Test 2.1: VoiceOver/NVDA
[ ] Test 2.2: Page Transitions
[ ] Test 2.3: Loading States
[ ] Test 2.4: Logo Announcement
[ ] Test 2.5: Back to Top

Color Contrast:
[ ] Test 3.1: Visual Inspection
[ ] Test 3.2: DevTools Check
[ ] Test 3.3: High Contrast (macOS)
[ ] Test 3.4: High Contrast (Windows)

Reduced Motion:
[ ] Test 4.1: Enable (macOS)
[ ] Test 4.2: Enable (Windows)
[ ] Test 4.3: Static Particles
[ ] Test 4.4: Simple Transitions

ARIA Attributes:
[ ] Test 5.1: Decorative Hidden
[ ] Test 5.2: Loader Status
[ ] Test 5.3: Dialog Role
[ ] Test 5.4: Button Loading

Mobile:
[ ] Test 6.1: Touch Targets
[ ] Test 6.2: Effects Disabled
[ ] Test 6.3: Screen Reader

Regression:
[ ] Test 7.1: Existing Features
[ ] Test 7.2: Visual Check
[ ] Test 7.3: Performance

Cross-Browser:
[ ] Test 8.1: Chrome
[ ] Test 8.2: Firefox
[ ] Test 8.3: Safari
[ ] Test 8.4: Edge

Overall Result: PASS / FAIL
Notes: ___________
```

---

## Quick Test (5 minutes)

If you only have 5 minutes, run these critical tests:

1. **Tab Order** - Press Tab, verify focus visible
2. **Shift+K** - Press Shift+K, verify torii animation
3. **Color Contrast** - Visual check, all text readable
4. **Reduced Motion** - Enable, verify effects disabled
5. **Screen Reader** - Quick navigation test

---

## Automated Testing

For automated testing, see:
- `src/components/__tests__/` - Component tests
- `vitest --run` - Run all tests
- Chrome DevTools Lighthouse - Accessibility audit

---

## Support

If you find any accessibility issues:
1. Document the issue with screenshots
2. Note browser/OS/assistive technology used
3. Describe expected vs actual behavior
4. Report to development team

---

## References

- WCAG 2.1 Quick Reference: https://www.w3.org/WAI/WCAG21/quickref/
- WebAIM Keyboard Testing: https://webaim.org/articles/keyboard/
- Screen Reader Testing: https://webaim.org/articles/screenreader_testing/
