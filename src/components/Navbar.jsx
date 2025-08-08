// src/components/Navbar.jsx
import React, { useCallback } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const scrollToTop = useCallback((e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToId = useCallback((e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className="
            mt-4 rounded-2xl
            bg-black/40 backdrop-blur-md
            border border-white/10
            shadow-[0_2px_20px_rgba(0,0,0,0.35)]
          "
        >
          <div className="h-14 px-4 flex items-center justify-between">
            {/* Logo */}
            <a
              href="#top"
              onClick={scrollToTop}
              aria-label="Inicio KAINET"
              className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70 rounded"
            >
              <img src="/logoletras.svg" alt="KAINET" className="h-16 md:h-17 w-auto" loading="eager" decoding="sync" />
              <span className="sr-only">KAINET</span>
            </a>

            {/* Links */}
            <ul className="flex items-center gap-6">
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToId(e, 'about')}
                  className="link-underline hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70 rounded"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  onClick={(e) => scrollToId(e, 'work')}
                  className="link-underline hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70 rounded"
                >
                  Proyectos
                </a>
              </li>
              <li>
                <a
                    href="https://www.linkedin.com/in/marcdomibe/"
                    target="_blank" rel="me noopener noreferrer"
                    className="link-underline hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70 rounded flex items-center gap-2"
                    aria-label="LinkedIn de Marco Domínguez"
                >
                    {/* Ícono simple inline (sin dependencias) */}
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="opacity-90">
                    <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.98 0h3.83v2.2h.05c.53-1 1.82-2.2 3.75-2.2 4.01 0 4.75 2.64 4.75 6.07V24h-4v-6.9c0-1.64-.03-3.74-2.28-3.74-2.29 0-2.64 1.78-2.64 3.62V24h-4V8z"/>
                    </svg>
                    LinkedIn
                </a>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;