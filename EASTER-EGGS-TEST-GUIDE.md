# Easter Eggs Testing Guide

Quick guide to test all implemented easter eggs in the KAINET application.

## Prerequisites

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open the application in your browser (usually http://localhost:5173)

---

## Test 1: Konami Code - Matrix Rain

### Steps:
1. With the page loaded, press the following keys in sequence:
   - ↑ (Arrow Up)
   - ↑ (Arrow Up)
   - ↓ (Arrow Down)
   - ↓ (Arrow Down)
   - ← (Arrow Left)
   - → (Arrow Right)
   - ← (Arrow Left)
   - → (Arrow Right)
   - B
   - A

### Expected Result:
- Full-screen Matrix rain effect appears
- Japanese katakana characters fall in cyan color
- Effect auto-dismisses after 10 seconds
- Can press ESC to dismiss early
- Button in top-right shows "Press ESC to exit"

### Verification:
```javascript
// In browser console:
localStorage.getItem('kainet_easter_eggs')
// Should include "konami"
```

---

## Test 2: Triple-Click Logo - Torii Animation

### Steps:
1. Locate the KAINET logo in the navbar (top-left)
2. Triple-click the logo quickly (within 500ms)

### Expected Result:
- Elaborate torii gate animation appears
- Circuit lines connect to the torii
- Energy particles flow through circuits
- After 1.5 seconds, message appears: "改" with "KAI = Change, Innovation"
- Effect auto-dismisses after 8 seconds
- Can click anywhere to dismiss

### Verification:
```javascript
// In browser console:
localStorage.getItem('kainet_easter_eggs')
// Should include "tripleClick"
```

---

## Test 3: New Year - Sakura Petals

### Steps:
1. Temporarily modify the date check:
   - Open `src/utils/easterEggs.js`
   - In `checkSpecialDate()` method, change the date comparison to match today
   - Or wait until January 1st

2. Refresh the page

### Expected Result:
- Subtle pink sakura petals fall across the screen
- Petals rotate and drift gently
- Effect is non-intrusive and transparent
- Continues throughout the session

### Verification:
```javascript
// In browser console:
localStorage.getItem('kainet_easter_eggs')
// Should include "newYear"
```

---

## Test 4: Company Anniversary - Fireworks

### Steps:
1. Temporarily modify the date check:
   - Open `src/utils/easterEggs.js`
   - In `checkSpecialDate()` method, change the date comparison to match today
   - Or wait until October 13th

2. Refresh the page

### Expected Result:
- Occasional fireworks bursts in upper portion of screen
- Bursts occur every 3-5 seconds
- Uses brand colors (cyan, purple, pink, white)
- Effect is subtle and non-intrusive
- Continues throughout the session

### Verification:
```javascript
// In browser console:
localStorage.getItem('kainet_easter_eggs')
// Should include "anniversary"
```

---

## Accessibility Testing

### Test 5: Reduced Motion Preference

1. Enable reduced motion in your OS:
   - **macOS:** System Preferences → Accessibility → Display → Reduce motion
   - **Windows:** Settings → Ease of Access → Display → Show animations
   - **Linux:** Varies by desktop environment

2. Trigger any easter egg

### Expected Result:
- Matrix Rain: Should still work (canvas-based)
- Torii Animation: Should still work (essential animation)
- Sakura Petals: Should NOT appear
- Fireworks: Should NOT appear

### Test 6: Keyboard Dismissal

1. Trigger Matrix Rain (Konami code)
2. Press ESC key

### Expected Result:
- Effect dismisses immediately
- No errors in console

### Test 7: Click Dismissal

1. Trigger Torii Animation (triple-click logo)
2. Click anywhere on the screen

### Expected Result:
- Effect dismisses immediately
- No errors in console

---

## Developer Testing

### Check localStorage Tracking

```javascript
// View all discovered eggs
const discovered = JSON.parse(localStorage.getItem('kainet_easter_eggs') || '[]');
console.log('Discovered eggs:', discovered);

// Clear all discovered eggs (for re-testing)
localStorage.removeItem('kainet_easter_eggs');
```

### Check Console for Errors

1. Open browser DevTools (F12)
2. Go to Console tab
3. Trigger each easter egg
4. Verify no errors appear

### Check Performance

1. Open browser DevTools (F12)
2. Go to Performance tab
3. Start recording
4. Trigger Matrix Rain or Fireworks
5. Stop recording after 5 seconds
6. Verify FPS stays above 55fps

---

## Production Testing Checklist

- [ ] Konami code triggers Matrix Rain
- [ ] Matrix Rain auto-dismisses after 10s
- [ ] ESC dismisses Matrix Rain
- [ ] Triple-click logo triggers Torii Animation
- [ ] Torii Animation shows message
- [ ] Click dismisses Torii Animation
- [ ] January 1st shows Sakura Petals
- [ ] October 13th shows Fireworks
- [ ] All effects respect reduced motion
- [ ] No console errors
- [ ] localStorage tracking works
- [ ] Effects don't block page interaction
- [ ] Build completes successfully
- [ ] Bundle size is acceptable

---

## Troubleshooting

### Easter egg doesn't trigger

1. Check browser console for errors
2. Verify EasterEggManager is initialized:
   ```javascript
   // In console:
   window.easterEggManager
   ```
3. Check that context provider is wrapping the app
4. Verify event listeners are attached

### Effect appears but doesn't dismiss

1. Check that onDismiss callback is provided
2. Verify setTimeout is working
3. Check for JavaScript errors in console

### localStorage not saving

1. Check browser privacy settings
2. Verify localStorage is available:
   ```javascript
   typeof localStorage !== 'undefined'
   ```
3. Check for quota exceeded errors

---

## Notes

- All easter eggs are lazy-loaded for performance
- Effects use canvas for smooth animations
- localStorage tracking is optional and gracefully fails
- All effects are non-blocking and decorative
- Respects user accessibility preferences

---

**Last Updated:** October 13, 2025
**Version:** 1.0.0
