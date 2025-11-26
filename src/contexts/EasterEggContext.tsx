import { createContext, useContext, ReactNode } from 'react';
import { useEasterEggs } from '../hooks/useEasterEggs';
import type { EasterEggContextType } from '@/types';

const EasterEggContext = createContext<EasterEggContextType | null>(null);

interface EasterEggProviderProps {
  children: ReactNode;
}

export const EasterEggProvider = ({ children }: EasterEggProviderProps) => {
  const easterEggState = useEasterEggs();

  return (
    <EasterEggContext.Provider value={easterEggState}>
      {children}
    </EasterEggContext.Provider>
  );
};

export const useEasterEggContext = (): EasterEggContextType => {
  const context = useContext(EasterEggContext);
  if (!context) {
    throw new Error('useEasterEggContext must be used within EasterEggProvider');
  }
  return context;
};
