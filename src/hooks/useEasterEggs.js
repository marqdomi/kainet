import { useEffect, useState } from 'react';
import { easterEggManager } from '../utils/easterEggs';
import { features } from '../config/features';

/**
 * useEasterEggs - Custom hook to manage easter egg state and effects
 * 
 * @returns {Object} Easter egg states and handlers
 * 
 * @example
 * const { matrixRainActive, toriiAnimationActive, specialDateEffect, handleLogoClick } = useEasterEggs();
 */
export const useEasterEggs = () => {
  const [matrixRainActive, setMatrixRainActive] = useState(false);
  const [toriiAnimationActive, setToriiAnimationActive] = useState(false);
  const [specialDateEffect, setSpecialDateEffect] = useState(null);

  useEffect(() => {
    // Only initialize if easter eggs feature is enabled
    if (!features.easterEggs) {
      return;
    }

    // Initialize easter egg manager
    easterEggManager.init();

    // Register callbacks for effects
    easterEggManager.onEffect('matrixRain', () => {
      setMatrixRainActive(true);
      easterEggManager.markDiscovered('konami');
    });

    easterEggManager.onEffect('toriiAnimation', () => {
      setToriiAnimationActive(true);
      easterEggManager.markDiscovered('tripleClick');
    });

    easterEggManager.onEffect('sakuraPetals', () => {
      setSpecialDateEffect('sakuraPetals');
      easterEggManager.markDiscovered('newYear');
    });

    easterEggManager.onEffect('fireworks', () => {
      setSpecialDateEffect('fireworks');
      easterEggManager.markDiscovered('anniversary');
    });

    // Check for special date on mount
    const specialDate = easterEggManager.checkSpecialDate();
    if (specialDate) {
      easterEggManager.triggerSpecialDateEffect(specialDate.effect);
    }

    // Cleanup
    return () => {
      easterEggManager.destroy();
    };
  }, []);

  const handleLogoClick = () => {
    easterEggManager.handleLogoClick();
  };

  const dismissMatrixRain = () => {
    setMatrixRainActive(false);
  };

  const dismissToriiAnimation = () => {
    setToriiAnimationActive(false);
  };

  return {
    matrixRainActive,
    toriiAnimationActive,
    specialDateEffect,
    handleLogoClick,
    dismissMatrixRain,
    dismissToriiAnimation
  };
};
