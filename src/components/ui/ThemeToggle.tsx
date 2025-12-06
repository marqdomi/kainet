// src/components/ui/ThemeToggle.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-lg
        bg-white/5 border border-white/10
        hover:bg-white/10 hover:border-[var(--cyan-neon)]/50
        transition-all duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan-neon)]
        ${className}
      `}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : 180,
          scale: 1
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative w-5 h-5"
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-[var(--cyan-neon)]" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-400" />
        )}
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        initial={false}
        animate={{
          opacity: isDark ? 0.3 : 0.5,
          scale: isDark ? 1 : 1.2
        }}
        className={`
          absolute inset-0 rounded-lg blur-md -z-10
          ${isDark ? 'bg-[var(--cyan-neon)]' : 'bg-yellow-400'}
        `}
      />
    </button>
  );
};

export default ThemeToggle;
