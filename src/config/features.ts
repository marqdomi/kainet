/**
 * Feature Flags Configuration
 * 
 * This module provides centralized feature flag management for visual enhancements.
 * Features can be enabled/disabled via environment variables for gradual rollout and testing.
 * 
 * @module config/features
 */

/**
 * Feature flags object
 * Each feature can be controlled independently via environment variables
 * 
 * Environment variables should be prefixed with VITE_ to be accessible in the browser
 * Values should be 'true' or 'false' as strings
 * 
 * @type {Object}
 */
export const features = {
  /**
   * DISABLED - Kanji particles removed for Mexico market
   * @type {boolean}
   */
  kanjiParticles: false,

  /**
   * Enable glitch effects on text and UI elements
   * Includes RGB split, digital reveal, and hologram flicker
   * @type {boolean}
   */
  glitchEffects: import.meta.env.VITE_FEATURE_GLITCH === 'true',

  /**
   * Enable holographic effects on cards
   * Includes shimmer, scanning line, and ripple effects
   * @type {boolean}
   */
  holographicCards: import.meta.env.VITE_FEATURE_HOLO === 'true',

  /**
   * Enable animated page transitions
   * Includes wipe effect, motion blur, and content reveal
   * @type {boolean}
   */
  pageTransitions: import.meta.env.VITE_FEATURE_TRANSITIONS === 'true',

  /**
   * Enable circuit line decorative elements
   * Includes animated particles and connection effects
   * @type {boolean}
   */
  circuitLines: import.meta.env.VITE_FEATURE_CIRCUITS === 'true',

  /**
   * Enable enhanced parallax scrolling
   * Includes multi-layer parallax and motion blur
   * @type {boolean}
   */
  parallaxScrolling: import.meta.env.VITE_FEATURE_PARALLAX === 'true',

  /**
   * Enable typography enhancements
   * Includes digital counters (kanji prefixes removed)
   * @type {boolean}
   */
  typographyEnhancements: import.meta.env.VITE_FEATURE_TYPOGRAPHY === 'true',

  /**
   * DISABLED - Japanese loaders removed, using ModernLoader instead
   * @type {boolean}
   */
  customLoaders: false,

  /**
   * Enable easter eggs (fireworks only - Japanese elements removed)
   * @type {boolean}
   */
  easterEggs: import.meta.env.VITE_FEATURE_EASTER_EGGS === 'true',

  /**
   * Enable enhanced UI components
   * Includes button ripples and card variants (kanji badges removed)
   * @type {boolean}
   */
  enhancedUI: import.meta.env.VITE_FEATURE_ENHANCED_UI === 'true',
};

/**
 * Check if a specific feature is enabled
 * @param {string} featureName - Name of the feature to check
 * @returns {boolean} True if feature is enabled
 */
export const isFeatureEnabled = (featureName) => {
  return features[featureName] === true;
};

/**
 * Get all enabled features
 * @returns {string[]} Array of enabled feature names
 */
export const getEnabledFeatures = () => {
  return Object.keys(features).filter(key => features[key] === true);
};

/**
 * Get all disabled features
 * @returns {string[]} Array of disabled feature names
 */
export const getDisabledFeatures = () => {
  return Object.keys(features).filter(key => features[key] === false);
};

/**
 * Check if any features are enabled
 * @returns {boolean} True if at least one feature is enabled
 */
export const hasAnyFeatureEnabled = () => {
  return Object.values(features).some(value => value === true);
};

/**
 * Check if all features are enabled
 * @returns {boolean} True if all features are enabled
 */
export const areAllFeaturesEnabled = () => {
  return Object.values(features).every(value => value === true);
};

/**
 * Log feature flags status to console (development only)
 */
export const logFeatureStatus = () => {
  if (import.meta.env.DEV) {
    console.group('🎌 Feature Flags Status');
    Object.entries(features).forEach(([key, value]) => {
      console.log(`${value ? '✅' : '❌'} ${key}: ${value}`);
    });
    console.groupEnd();
  }
};

// Log feature status in development mode
if (import.meta.env.DEV) {
  logFeatureStatus();
}

export default features;
