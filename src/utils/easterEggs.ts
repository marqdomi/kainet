/**
 * Easter Eggs Configuration and Manager
 * Handles Konami code, triple-click detection, and special date effects
 */

type EasterEggEffect = 'matrixRain' | 'toriiAnimation' | 'sakuraPetals' | 'fireworks';

interface KonamiConfig {
  code: string[];
  action: string;
  duration: number;
}

interface TripleClickConfig {
  target: string;
  action: string;
  message: string;
}

interface SpecialDateConfig {
  date: string;
  name: string;
  effect: string;
}

interface EasterEggsConfig {
  konami: KonamiConfig;
  tripleClick: TripleClickConfig;
  specialDates: SpecialDateConfig[];
}

export const easterEggs: EasterEggsConfig = {
  konami: {
    code: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
    action: 'matrixRain',
    duration: 10000
  },
  tripleClick: {
    target: 'logo',
    action: 'toriiAnimation',
    message: '改 (KAI) = Change, Innovation'
  },
  specialDates: [
    { date: '01-01', name: 'New Year', effect: 'sakuraPetals' },
    { date: '12-25', name: 'Company Anniversary', effect: 'fireworks' } // Changed from 10-13 to avoid auto-trigger during development
  ]
};

/**
 * EasterEggManager - Manages detection and triggering of easter eggs
 * 
 * @class
 * @example
 * const manager = new EasterEggManager();
 * manager.init();
 */
export class EasterEggManager {
  private konamiIndex: number;
  private clickCount: number;
  private clickTimer: NodeJS.Timeout | null;
  private callbacks: Record<EasterEggEffect, (() => void) | null>;
  private handleKeyDown: ((e: KeyboardEvent) => void) | null;

  constructor() {
    this.konamiIndex = 0;
    this.clickCount = 0;
    this.clickTimer = null;
    this.callbacks = {
      matrixRain: null,
      toriiAnimation: null,
      sakuraPetals: null,
      fireworks: null
    };
    this.handleKeyDown = null;
  }

  /**
   * Initialize the easter egg manager
   * Sets up keyboard listener for Konami code
   */
  init(): void {
    this.setupKonamiListener();
  }

  /**
   * Clean up event listeners
   */
  destroy(): void {
    if (typeof window !== 'undefined' && this.handleKeyDown) {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
    if (this.clickTimer) {
      clearTimeout(this.clickTimer);
    }
  }

  /**
   * Set up keyboard listener for Konami code and keyboard shortcuts
   * @private
   */
  private setupKonamiListener(): void {
    if (typeof window === 'undefined') return;

    this.handleKeyDown = (e) => {
      // Check Konami code
      this.checkKonami(e.key);
      
      // Keyboard alternative for logo triple-click: Shift+K
      // Accessibility: Provides keyboard-only alternative to mouse-only easter egg
      if (e.shiftKey && e.key.toLowerCase() === 'k') {
        this.triggerToriiAnimation();
      }
    };

    window.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Check if key matches Konami code sequence
   * @param key - The key that was pressed
   */
  private checkKonami(key: string): void {
    if (key === easterEggs.konami.code[this.konamiIndex]) {
      this.konamiIndex++;
      if (this.konamiIndex === easterEggs.konami.code.length) {
        this.triggerMatrixRain();
        this.konamiIndex = 0;
      }
    } else {
      this.konamiIndex = 0;
    }
  }

  /**
   * Handle logo click for triple-click detection
   * Should be called from logo component's onClick handler
   */
  handleLogoClick(): void {
    this.clickCount++;
    if (this.clickTimer) {
      clearTimeout(this.clickTimer);
    }

    if (this.clickCount === 3) {
      this.triggerToriiAnimation();
      this.clickCount = 0;
    } else {
      this.clickTimer = setTimeout(() => {
        this.clickCount = 0;
      }, 500);
    }
  }

  /**
   * Check if today is a special date
   * @returns Special date config or null
   */
  checkSpecialDate(): SpecialDateConfig | null {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `${month}-${day}`;

    return easterEggs.specialDates.find(sd => sd.date === dateString) || null;
  }

  /**
   * Trigger Matrix Rain effect
   */
  triggerMatrixRain(): void {
    if (this.callbacks.matrixRain) {
      this.callbacks.matrixRain();
    }
  }

  /**
   * Trigger special Torii animation
   */
  triggerToriiAnimation(): void {
    if (this.callbacks.toriiAnimation) {
      this.callbacks.toriiAnimation();
    }
  }

  /**
   * Trigger special date effect
   * @param effect - The effect to trigger ('sakuraPetals' or 'fireworks')
   */
  triggerSpecialDateEffect(effect: string): void {
    if (this.callbacks[effect as EasterEggEffect]) {
      this.callbacks[effect as EasterEggEffect]?.();
    }
  }

  /**
   * Register callback for an easter egg effect
   * @param effect - The effect name
   * @param callback - The callback function to execute
   */
  onEffect(effect: EasterEggEffect, callback: () => void): void {
    this.callbacks[effect] = callback;
  }

  /**
   * Store discovered easter egg in localStorage
   * @param eggName - Name of the easter egg
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
   * @returns List of discovered easter egg names
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

// Export singleton instance
export const easterEggManager = new EasterEggManager();
