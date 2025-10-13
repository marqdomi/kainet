import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useEasterEggs } from '../hooks/useEasterEggs';

const EasterEggContext = createContext(null);

export const EasterEggProvider = ({ children }) => {
  const easterEggState = useEasterEggs();

  return (
    <EasterEggContext.Provider value={easterEggState}>
      {children}
    </EasterEggContext.Provider>
  );
};

EasterEggProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useEasterEggContext = () => {
  const context = useContext(EasterEggContext);
  if (!context) {
    throw new Error('useEasterEggContext must be used within EasterEggProvider');
  }
  return context;
};
