import { useEffect, useState } from 'react';
import { easterEggManager } from '../utils/easterEggs';
import { features } from '../config/features';
import type { SpecialDateEffect } from '@/types';

interface UseEasterEggsReturn {
  matrixRainActive: boolean;
  toriiAnimationActive: boolean;
  specialDateEffect: SpecialDateEffect;
  handleLogoClick: () => void;
  dismissMatrixRain: () => void;
  dismissToriiAnimation: () => void;
  activateMatrixRain: () => void;
  activateToriiAnimation: () => void;
}

/**
 * useEasterEggs - Custom hook to manage easter egg state and effects
 * 
 * @returns Easter egg states and handlers
 * 
 * @example
 * const { matrixRainActive, toriiAnimationActive, specialDateEffect, handleLogoClick } = useEasterEggs();
 */
export const useEasterEggs = (): UseEasterEggsReturn => {
  const [matrixRainActive, setMatrixRainActive] = useState<boolean>(false);
  const [toriiAnimationActive, setToriiAnimationActive] = useState<boolean>(false);
  const [specialDateEffect, setSpecialDateEffect] = useState<SpecialDateEffect>(null);

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

  const handleLogoClick = (): void => {
    easterEggManager.handleLogoClick();
  };

  const dismissMatrixRain = (): void => {
    setMatrixRainActive(false);
  };

  const dismissToriiAnimation = (): void => {
    setToriiAnimationActive(false);
  };

  const activateMatrixRain = (): void => {
    setMatrixRainActive(true);
  };

  const activateToriiAnimation = (): void => {
    setToriiAnimationActive(true);
  };

  return {
    matrixRainActive,
    toriiAnimationActive,
    specialDateEffect,
    handleLogoClick,
    dismissMatrixRain,
    dismissToriiAnimation,
    activateMatrixRain,
    activateToriiAnimation,
  };
};
