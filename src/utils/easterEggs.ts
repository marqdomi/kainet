/**
 * Easter Eggs Configuration and Manager
 * Handles special date effects (fireworks on anniversary)
 */

type EasterEggEffect = 'fireworks';

interface SpecialDateConfig {
  date: string;
  name: string;
  effect: EasterEggEffect;
}

interface EasterEggsConfig {
  specialDates: SpecialDateConfig[];
}

export const easterEggs: EasterEggsConfig = {
  specialDates: [
    { date: '12-25', name: 'Company Anniversary', effect: 'fireworks' }
  ]
};

/**
 * EasterEggManager - Manages detection and triggering of easter eggs
 */
export class EasterEggManager {
  private callbacks: Record<EasterEggEffect, (() => void) | null>;

  constructor() {
    this.callbacks = {
      fireworks: null
    };
  }

  /**
   * Initialize the easter egg manager
   */
  init(): void {
    // No keyboard listeners needed for simplified version
  }

  /**
   * Clean up event listeners
   */
  destroy(): void {
    // Nothing to clean up in simplified version
  }

  /**
   * Handle logo click - no-op in simplified version
   */
  handleLogoClick(): void {
    // No action in simplified version
  }

  /**
   * Check if today is a special date
   */
  checkSpecialDate(): SpecialDateConfig | null {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `${month}-${day}`;

    return easterEggs.specialDates.find(sd => sd.date === dateString) || null;
  }

  /**
   * Trigger special date effect
   */
  triggerSpecialDateEffect(effect: string): void {
    if (effect === 'fireworks' && this.callbacks.fireworks) {
      this.callbacks.fireworks();
    }
  }

  /**
   * Register callback for an easter egg effect
   */
  onEffect(effect: EasterEggEffect, callback: () => void): void {
    this.callbacks[effect] = callback;
  }

  /**
   * Store discovered easter egg in localStorage
   */
  markDiscovered(eggName: string): void {
    if (typeof window === 'undefined') return;

    try {
      const discovered = JSON.parse(localStorage.getItem('kainet_easter_eggs') || '[]');
      if (!discovered.includes(eggName)) {
        discovered.push(eggName);
        localStorage.setItem('kainet_easter_eggs', JSON.stringify(discovered));
      }
    } catch (e) {
      console.warn('Failed to save easter egg discovery:', e);
    }
  }

  /**
   * Get list of discovered easter eggs
   */
  getDiscovered(): string[] {
    if (typeof window === 'undefined') return [];

    try {
      return JSON.parse(localStorage.getItem('kainet_easter_eggs') || '[]');
    } catch (e) {
      return [];
    }
  }
}

// Singleton instance
export const easterEggManager = new EasterEggManager();
