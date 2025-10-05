// src/components/Navbar.jsx
import React, { useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Detectar si estamos en una página de blog
  const isBlogPage = window.location.pathname.startsWith('/blog/');
  const isBlogListing = window.location.pathname === '/blog';

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

  const scrollToTop = useCallback((e) => {
    e.preventDefault();
    if (isBlogPage || isBlogListing) {
      // Si estamos en blog, navegar a la home
      window.location.href = '/';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isBlogPage, isBlogListing]);

  const scrollToId = useCallback((e, id) => {
    e.preventDefault();
    if (isBlogPage || isBlogListing) {
      // Si estamos en blog, navegar a la home con hash
      window.location.href = `/#${id}`;
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isBlogPage, isBlogListing]);

  const handleBlogClick = useCallback((e) => {
    e.preventDefault();
    if (isBlogPage) {
      // Si estamos en un post, ir al listing
      window.location.href = '/blog';
    } else if (isBlogListing) {
      // Si estamos en el listing, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Si estamos en home, scroll a la sección
      const el = document.getElementById('blog');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isBlogPage, isBlogListing]);

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
            <a
              href="/"
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
                  href="#kainet-resto"
                  onClick={(e) => scrollToId(e, 'kainet-resto')}
                  className="link-underline hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70 rounded"
                >
                  Kainet Resto
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  onClick={handleBlogClick}
                  className="link-underline hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70 rounded"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToId(e, 'contact')}
                  className="link-underline hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70 rounded"
                >
                  Contacto
                </a>
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