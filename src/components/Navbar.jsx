// src/components/Navbar.jsx
import React, { useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEasterEggContext } from '../contexts/EasterEggContext';

const Navbar = () => {
  const { handleLogoClick } = useEasterEggContext();
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Detectar si estamos en una página de blog
  const isBlogPage = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';
  const isBlogListing = location.pathname === '/blog';

  // Auto-hide navbar on scroll down, show on mouse move or scroll up
  useEffect(() => {
    let timeoutId;
    let lastY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Si scroll down, ocultar
      if (currentScrollY > lastY && currentScrollY > 100) {
        setIsVisible(false);
      }
      // Si scroll up, mostrar
      else if (currentScrollY < lastY) {
        setIsVisible(true);
      }

      lastY = currentScrollY;
    };

    const handleMouseMove = (e) => {
      // Mostrar navbar si el mouse está en los primeros 100px de la pantalla
      if (e.clientY <= 100) {
        setIsVisible(true);

        // Auto-hide después de 3 segundos si no hay movimiento
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (window.scrollY > 100) {
            setIsVisible(false);
          }
        }, 3000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []); // Solo ejecutar una vez al montar

  const handleLogoClickWithNavigation = useCallback((e) => {
    // Primero manejar el easter egg
    handleLogoClick(e);

    // Si estamos en home, solo scroll to top
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Si estamos en otra página, dejar que Link navegue normalmente
    // y luego hacer scroll to top
    else {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [handleLogoClick, location.pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
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
                <Link
                  to="/"
                  aria-label="Inicio KAINET"
                  className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70 rounded"
                  onClick={handleLogoClickWithNavigation}
                >
                  <img src="/logoletras.svg" alt="KAINET" className="h-16 md:h-17 w-auto" loading="eager" decoding="sync" />
                  <span className="sr-only">KAINET</span>
                </Link>

                {/* Links */}
                <ul className="flex items-center gap-6">
                  <li>
                    <Link
                      to="/nosotros"
                      className={`link-underline hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70 rounded ${location.pathname === '/nosotros' ? 'text-[#00E5FF]' : ''
                        }`}
                    >
                      Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/productos"
                      className={`link-underline hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70 rounded ${location.pathname === '/productos' ? 'text-[#00E5FF]' : ''
                        }`}
                    >
                      Productos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/servicios"
                      className={`link-underline hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70 rounded ${location.pathname === '/servicios' ? 'text-[#00E5FF]' : ''
                        }`}
                    >
                      Servicios
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className={`link-underline hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70 rounded ${location.pathname.startsWith('/blog') ? 'text-[#00E5FF]' : ''
                        }`}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className={`link-underline hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70 rounded ${location.pathname === '/contact' ? 'text-[#00E5FF]' : ''
                        }`}
                    >
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;