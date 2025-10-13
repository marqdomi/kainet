/**
 * Easter Eggs Configuration and Manager
 * Handles Konami code, triple-click detection, and special date effects
 */

export const easterEggs = {
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
  }

  /**
   * Initialize the easter egg manager
   * Sets up keyboard listener for Konami code
   */
  init() {
    this.setupKonamiListener();
  }

  /**
   * Clean up event listeners
   */
  destroy() {
    if (typeof window !== 'undefined') {
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
  setupKonamiListener() {
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
   * @param {string} key - The key that was pressed
   */
  checkKonami(key) {
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
  handleLogoClick() {
    this.clickCount++;
    clearTimeout(this.clickTimer);

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
   * @returns {Object|null} Special date config or null
   */
  checkSpecialDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `${month}-${day}`;

    return easterEggs.specialDates.find(sd => sd.date === dateString) || null;
  }

  /**
   * Trigger Matrix Rain effect
   */
  triggerMatrixRain() {
    if (this.callbacks.matrixRain) {
      this.callbacks.matrixRain();
    }
  }

  /**
   * Trigger special Torii animation
   */
  triggerToriiAnimation() {
    if (this.callbacks.toriiAnimation) {
      this.callbacks.toriiAnimation();
    }
  }

  /**
   * Trigger special date effect
   * @param {string} effect - The effect to trigger ('sakuraPetals' or 'fireworks')
   */
  triggerSpecialDateEffect(effect) {
    if (this.callbacks[effect]) {
      this.callbacks[effect]();
    }
  }

  /**
   * Register callback for an easter egg effect
   * @param {string} effect - The effect name
   * @param {Function} callback - The callback function to execute
   */
  onEffect(effect, callback) {
    if (this.callbacks.hasOwnProperty(effect)) {
      this.callbacks[effect] = callback;
    }
  }

  /**
   * Store discovered easter egg in localStorage
   * @param {string} eggName - Name of the easter egg
   */
  markDiscovered(eggName) {
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
   * @returns {Array<string>} List of discovered easter egg names
   */
  getDiscovered() {
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
