/**
 * PerformanceMonitor - Tracks FPS and determines if effects should be reduced
 * 
 * @class
 * @example
 * import { perfMonitor } from './utils/performanceMonitor';
 * 
 * // In animation loop
 * perfMonitor.update();
 * 
 * // Check if effects should be reduced
 * if (perfMonitor.shouldReduceEffects()) {
 *   // Reduce particle count, disable effects, etc.
 * }
 */
class PerformanceMonitor {
  constructor() {
    this.fps = 60;
    this.lastTime = performance.now();
    this.frames = 0;
  }

  /**
   * Update FPS calculation - call this once per animation frame
   * Calculates FPS based on frames rendered in the last second
   */
  update() {
    this.frames++;
    const now = performance.now();
    
    // Calculate FPS every second
    if (now >= this.lastTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (now - this.lastTime));
      this.frames = 0;
      this.lastTime = now;
    }
  }

  /**
   * Determine if visual effects should be reduced based on performance
   * @returns {boolean} True if FPS is below threshold (45fps)
   */
  shouldReduceEffects() {
    return this.fps < 45;
  }

  /**
   * Get current FPS
   * @returns {number} Current frames per second
   */
  getFPS() {
    return this.fps;
  }

  /**
   * Reset the performance monitor
   */
  reset() {
    this.fps = 60;
    this.lastTime = performance.now();
    this.frames = 0;
  }
}

// Export singleton instance
export const perfMonitor = new PerformanceMonitor();

// Also export the class for testing purposes
export { PerformanceMonitor };
