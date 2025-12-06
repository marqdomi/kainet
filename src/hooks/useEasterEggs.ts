import { useEffect, useState } from 'react';
import { easterEggManager } from '../utils/easterEggs';
import { features } from '../config/features';
import type { SpecialDateEffect } from '@/types';

interface UseEasterEggsReturn {
  specialDateEffect: SpecialDateEffect;
  handleLogoClick: () => void;
}

/**
 * useEasterEggs - Custom hook to manage easter egg state and effects
 * Simplified version - only supports fireworks for special dates
 */
export const useEasterEggs = (): UseEasterEggsReturn => {
  const [specialDateEffect, setSpecialDateEffect] = useState<SpecialDateEffect>(null);

  useEffect(() => {
    // Only initialize if easter eggs feature is enabled
    if (!features.easterEggs) {
      return;
    }

    // Initialize easter egg manager
    easterEggManager.init();

    // Register callback for fireworks effect
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

  return {
    specialDateEffect,
    handleLogoClick,
  };
};
