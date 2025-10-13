/**
 * Feature Flags Tests
 * 
 * Tests for the feature flag configuration system
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Feature Flags', () => {
  beforeEach(() => {
    // Clear module cache to reset feature flags
    vi.resetModules();
  });

  describe('Feature Flag Values', () => {
    it('should read feature flags from environment variables', async () => {
      // Mock environment variables
      vi.stubGlobal('import.meta', {
        env: {
          VITE_FEATURE_KANJI: 'true',
          VITE_FEATURE_GLITCH: 'false',
          DEV: true
        }
      });

      const { features } = await import('../features.js');
      
      expect(features.kanjiParticles).toBe(true);
      expect(features.glitchEffects).toBe(false);
    });

    it('should default to false when environment variable is not set', async () => {
      vi.stubGlobal('import.meta', {
        env: {
          DEV: true
        }
      });

      const { features } = await import('../features.js');
      
      expect(features.kanjiParticles).toBe(false);
      expect(features.glitchEffects).toBe(false);
    });

    it('should have all expected feature flags', async () => {
      vi.stubGlobal('import.meta', {
        env: { DEV: true }
      });

      const { features } = await import('../features.js');
      
      expect(features).toHaveProperty('kanjiParticles');
      expect(features).toHaveProperty('glitchEffects');
      expect(features).toHaveProperty('holographicCards');
      expect(features).toHaveProperty('pageTransitions');
      expect(features).toHaveProperty('circuitLines');
      expect(features).toHaveProperty('parallaxScrolling');
      expect(features).toHaveProperty('typographyEnhancements');
      expect(features).toHaveProperty('customLoaders');
      expect(features).toHaveProperty('easterEggs');
      expect(features).toHaveProperty('enhancedUI');
    });
  });

  describe('isFeatureEnabled', () => {
    it('should return true for enabled features', async () => {
      vi.stubGlobal('import.meta', {
        env: {
          VITE_FEATURE_KANJI: 'true',
          DEV: true
        }
      });

      const { isFeatureEnabled } = await import('../features.js');
      
      expect(isFeatureEnabled('kanjiParticles')).toBe(true);
    });

    it('should return false for disabled features', async () => {
      vi.stubGlobal('import.meta', {
        env: {
          VITE_FEATURE_KANJI: 'false',
          DEV: true
        }
      });

      const { isFeatureEnabled } = await import('../features.js');
      
      expect(isFeatureEnabled('kanjiParticles')).toBe(false);
    });
  });

  describe('getEnabledFeatures', () => {
    it('should return array of enabled feature names', async () => {
      vi.stubGlobal('import.meta', {
        env: {
          VITE_FEATURE_KANJI: 'true',
          VITE_FEATURE_GLITCH: 'true',
          VITE_FEATURE_HOLO: 'false',
          DEV: true
        }
      });

      const { getEnabledFeatures } = await import('../features.js');
      const enabled = getEnabledFeatures();
      
      expect(enabled).toContain('kanjiParticles');
      expect(enabled).toContain('glitchEffects');
      expect(enabled).not.toContain('holographicCards');
    });

    it('should return empty array when no features enabled', async () => {
      vi.stubGlobal('import.meta', {
        env: { DEV: true }
      });

      const { getEnabledFeatures } = await import('../features.js');
      const enabled = getEnabledFeatures();
      
      expect(enabled).toEqual([]);
    });
  });

  describe('getDisabledFeatures', () => {
    it('should return array of disabled feature names', async () => {
      vi.stubGlobal('import.meta', {
        env: {
          VITE_FEATURE_KANJI: 'true',
          VITE_FEATURE_GLITCH: 'false',
          DEV: true
        }
      });

      const { getDisabledFeatures } = await import('../features.js');
      const disabled = getDisabledFeatures();
      
      expect(disabled).toContain('glitchEffects');
      expect(disabled).not.toContain('kanjiParticles');
    });
  });

  describe('hasAnyFeatureEnabled', () => {
    it('should return true when at least one feature is enabled', async () => {
      vi.stubGlobal('import.meta', {
        env: {
          VITE_FEATURE_KANJI: 'true',
          DEV: true
        }
      });

      const { hasAnyFeatureEnabled } = await import('../features.js');
      
      expect(hasAnyFeatureEnabled()).toBe(true);
    });

    it('should return false when no features are enabled', async () => {
      vi.stubGlobal('import.meta', {
        env: { DEV: true }
      });

      const { hasAnyFeatureEnabled } = await import('../features.js');
      
      expect(hasAnyFeatureEnabled()).toBe(false);
    });
  });

  describe('areAllFeaturesEnabled', () => {
    it('should return true when all features are enabled', async () => {
      vi.stubGlobal('import.meta', {
        env: {
          VITE_FEATURE_KANJI: 'true',
          VITE_FEATURE_GLITCH: 'true',
          VITE_FEATURE_HOLO: 'true',
          VITE_FEATURE_TRANSITIONS: 'true',
          VITE_FEATURE_CIRCUITS: 'true',
          VITE_FEATURE_PARALLAX: 'true',
          VITE_FEATURE_TYPOGRAPHY: 'true',
          VITE_FEATURE_LOADERS: 'true',
          VITE_FEATURE_EASTER_EGGS: 'true',
          VITE_FEATURE_ENHANCED_UI: 'true',
          DEV: true
        }
      });

      const { areAllFeaturesEnabled } = await import('../features.js');
      
      expect(areAllFeaturesEnabled()).toBe(true);
    });

    it('should return false when some features are disabled', async () => {
      vi.stubGlobal('import.meta', {
        env: {
          VITE_FEATURE_KANJI: 'true',
          VITE_FEATURE_GLITCH: 'false',
          DEV: true
        }
      });

      const { areAllFeaturesEnabled } = await import('../features.js');
      
      expect(areAllFeaturesEnabled()).toBe(false);
    });
  });

  describe('logFeatureStatus', () => {
    it('should log feature status in development mode', async () => {
      const consoleSpy = vi.spyOn(console, 'group');
      const consoleLogSpy = vi.spyOn(console, 'log');
      
      vi.stubGlobal('import.meta', {
        env: {
          VITE_FEATURE_KANJI: 'true',
          DEV: true
        }
      });

      const { logFeatureStatus } = await import('../features.js');
      logFeatureStatus();
      
      expect(consoleSpy).toHaveBeenCalledWith('🎌 Feature Flags Status');
      expect(consoleLogSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
      consoleLogSpy.mockRestore();
    });

    it('should not log in production mode', async () => {
      const consoleSpy = vi.spyOn(console, 'group');
      
      vi.stubGlobal('import.meta', {
        env: {
          VITE_FEATURE_KANJI: 'true',
          DEV: false
        }
      });

      const { logFeatureStatus } = await import('../features.js');
      logFeatureStatus();
      
      expect(consoleSpy).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });
});
