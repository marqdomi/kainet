/**
 * GlitchText Component Usage Examples
 * 
 * This file demonstrates various ways to use the GlitchText component.
 * Import this component in your pages to add cyberpunk glitch effects to text.
 */

import GlitchText from './GlitchText';

// Example 1: Hover trigger with medium intensity (default)
export const Example1 = () => (
  <h1>
    <GlitchText>KAINET</GlitchText>
  </h1>
);

// Example 2: Always glitching with high intensity
export const Example2 = () => (
  <div>
    <GlitchText trigger="always" intensity="high">
      ERROR 404
    </GlitchText>
  </div>
);

// Example 3: Low intensity glitch on hover
export const Example3 = () => (
  <button>
    <GlitchText intensity="low">
      Click Me
    </GlitchText>
  </button>
);

// Example 4: Once trigger (on click) with custom duration
export const Example4 = () => (
  <div>
    <GlitchText trigger="once" intensity="medium" duration={500}>
      Activate
    </GlitchText>
  </div>
);

// Example 5: With custom className for additional styling
export const Example5 = () => (
  <h2>
    <GlitchText 
      trigger="hover" 
      intensity="high" 
      className="text-cyan-neon text-4xl"
    >
      未来 FUTURE
    </GlitchText>
  </h2>
);

// Example 6: In navigation/logo
export const LogoExample = () => (
  <nav>
    <GlitchText trigger="hover" intensity="medium" duration={300}>
      KAINET
    </GlitchText>
  </nav>
);

// Example 7: Error message with always-on glitch
export const ErrorExample = () => (
  <div className="error-message">
    <GlitchText trigger="always" intensity="high" duration={200}>
      System Error
    </GlitchText>
  </div>
);
