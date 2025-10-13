# Easter Eggs System

This document describes the easter eggs system implemented in KAINET.

## Overview

The easter eggs system adds hidden interactive surprises throughout the site that users can discover. All effects are non-intrusive, respect accessibility preferences, and enhance the user experience without interfering with core functionality.

## Easter Eggs

### 1. Konami Code - Matrix Rain Effect

**Trigger:** Type the Konami code: ↑↑↓↓←→←→BA

**Effect:** Full-screen Matrix rain animation with Japanese characters (katakana) falling in cyan color.

**Features:**
- Auto-dismisses after 10 seconds
- Can be dismissed early with ESC key
- Respects `prefers-reduced-motion`
- Tracked in localStorage as "konami"

**Implementation:** `src/components/effects/MatrixRain.jsx`

### 2. Triple-Click Logo - Special Torii Animation

**Trigger:** Triple-click the KAINET logo in the navbar

**Effect:** Elaborate torii gate animation with circuit connections and hidden message.

**Features:**
- Shows animated torii with energy particles
- Reveals message: "改 (KAI) = Change, Innovation"
- Auto-dismisses after 8 seconds
- Click anywhere to dismiss
- Tracked in localStorage as "tripleClick"

**Implementation:** `src/components/effects/ToriiAnimation.jsx`

### 3. Special Date Effects

#### New Year (January 1st)

**Trigger:** Visit the site on January 1st

**Effect:** Subtle sakura petals falling across the screen

**Features:**
- Gentle pink petals with rotation
- Non-intrusive, transparent overlay
- Respects `prefers-reduced-motion`
- Tracked in localStorage as "newYear"

**Implementation:** `src/components/effects/SakuraPetals.jsx`

#### Company Anniversary (October 13th)

**Trigger:** Visit the site on October 13th

**Effect:** Occasional fireworks bursts in the upper portion of the screen

**Features:**
- Subtle, infrequent bursts (every 3-5 seconds)
- Uses brand colors (cyan, purple, pink, white)
- Non-intrusive, transparent overlay
- Respects `prefers-reduced-motion`
- Tracked in localStorage as "anniversary"

**Implementation:** `src/components/effects/Fireworks.jsx`

## Architecture

### Core Components

1. **EasterEggManager** (`src/utils/easterEggs.js`)
   - Manages detection of Konami code
   - Handles triple-click detection
   - Checks for special dates
   - Stores discovered eggs in localStorage

2. **useEasterEggs Hook** (`src/hooks/useEasterEggs.js`)
   - React hook that wraps EasterEggManager
   - Manages state for active effects
   - Provides callbacks for triggering effects

3. **EasterEggContext** (`src/contexts/EasterEggContext.jsx`)
   - React context for sharing easter egg state
   - Provides `handleLogoClick` to Navbar
   - Centralizes easter egg management

### Integration Points

- **App.jsx**: Renders active easter egg effects
- **Navbar.jsx**: Logo click handler for triple-click detection
- **Global keyboard listener**: Detects Konami code from anywhere

## Usage

### Adding a New Easter Egg

1. **Define the easter egg in `easterEggs.js`:**

```javascript
export const easterEggs = {
  // ... existing eggs
  myNewEgg: {
    trigger: 'custom',
    action: 'myEffect',
    duration: 5000
  }
};
```

2. **Create the effect component:**

```jsx
// src/components/effects/MyEffect.jsx
const MyEffect = ({ active, onDismiss }) => {
  // Implementation
};
```

3. **Register callback in `useEasterEggs.js`:**

```javascript
easterEggManager.onEffect('myEffect', () => {
  setMyEffectActive(true);
  easterEggManager.markDiscovered('myNewEgg');
});
```

4. **Add to App.jsx:**

```jsx
const MyEffect = lazy(() => import('./components/effects/MyEffect'));

// In render:
{myEffectActive && <MyEffect active={myEffectActive} onDismiss={dismissMyEffect} />}
```

## Accessibility

All easter eggs respect accessibility preferences:

- **prefers-reduced-motion**: Animations are disabled or simplified
- **Keyboard navigation**: All effects can be dismissed with ESC or click
- **Screen readers**: Effects are marked as `aria-hidden="true"` and `role="presentation"`
- **Non-blocking**: Effects never interfere with page content or navigation

## Performance

- **Lazy loading**: All easter egg components are lazy-loaded
- **Canvas-based**: Heavy animations use canvas for better performance
- **Auto-cleanup**: Effects automatically clean up on unmount
- **Throttling**: Event handlers are throttled to prevent performance issues

## Testing

To test easter eggs in development:

```javascript
// In browser console:

// Trigger Matrix Rain
window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
// ... continue with full Konami code

// Trigger Torii Animation
// Triple-click the logo in navbar

// Trigger Special Date Effects
// Temporarily modify date check in easterEggs.js
```

## Discovered Eggs Tracking

Easter eggs are tracked in localStorage under the key `kainet_easter_eggs`:

```javascript
// Check discovered eggs
const discovered = JSON.parse(localStorage.getItem('kainet_easter_eggs') || '[]');
console.log('Discovered eggs:', discovered);

// Clear discovered eggs (for testing)
localStorage.removeItem('kainet_easter_eggs');
```

## Future Enhancements

Potential additions:

- Badge system showing discovered eggs in footer
- Achievement notifications when discovering eggs
- More complex trigger patterns
- Seasonal effects for other holidays
- Interactive mini-games
- Sound effects (with mute option)
