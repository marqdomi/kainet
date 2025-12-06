// src/components/Navbar.jsx
import React, { useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEasterEggContext } from '../contexts/EasterEggContext';

// Hamburger Icon Component
const HamburgerIcon = ({ isOpen }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <motion.line
      x1="3" y1="6" x2="21" y2="6"
      animate={isOpen ? { rotate: 45, y: 6, x: 0 } : { rotate: 0, y: 0, x: 0 }}
      transition={{ duration: 0.2 }}
      style={{ transformOrigin: 'center' }}
    />
    <motion.line
      x1="3" y1="12" x2="21" y2="12"
      animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    />
    <motion.line
      x1="3" y1="18" x2="21" y2="18"
      animate={isOpen ? { rotate: -45, y: -6, x: 0 } : { rotate: 0, y: 0, x: 0 }}
      transition={{ duration: 0.2 }}
      style={{ transformOrigin: 'center' }}
    />
  </svg>
);

// Navigation Links Data
const navLinks = [
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/productos', label: 'Productos' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contacto' },
];

const Navbar = () => {
  const { handleLogoClick } = useEasterEggContext();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Auto-hide navbar on scroll down, show on mouse move or scroll up
  useEffect(() => {
    let timeoutId;
    let lastY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Don't hide navbar if mobile menu is open
      if (isMobileMenuOpen) return;

      if (currentScrollY > lastY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastY) {
        setIsVisible(true);
      }

      lastY = currentScrollY;
    };

    const handleMouseMove = (e) => {
      if (e.clientY <= 100) {
        setIsVisible(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (window.scrollY > 100 && !isMobileMenuOpen) {
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
  }, [isMobileMenuOpen]);

  const handleLogoClickWithNavigation = useCallback((e) => {
    handleLogoClick();

    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      return;
    }

    e.preventDefault();
    navigate('/', { replace: false });
    setIsMobileMenuOpen(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }, [handleLogoClick, location.pathname, navigate]);

  const isLinkActive = (path) => {
    if (path === '/blog') {
      return location.pathname.startsWith('/blog');
    }
    return location.pathname === path;
  };

  return (
    <>
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

                  {/* Desktop Links */}
                  <ul className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className={`link-underline hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70 rounded ${isLinkActive(link.to) ? 'text-[#00E5FF]' : ''
                            }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Mobile Menu Button */}
                  <button
                    className="md:hidden flex items-center justify-center w-12 h-12 -mr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu"
                  >
                    <HamburgerIcon isOpen={isMobileMenuOpen} />
                  </button>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay & Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 mobile-menu-backdrop md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm z-50 bg-[#0A0A0A] border-l border-white/10 md:hidden safe-area-top safe-area-bottom"
            >
              {/* Close Button */}
              <div className="flex justify-end p-4">
                <button
                  className="flex items-center justify-center w-12 h-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/70 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Cerrar menú"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="px-6 py-4">
                <ul className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-4 px-4 text-lg font-medium rounded-xl transition-all ${isLinkActive(link.to)
                            ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20'
                            : 'text-white hover:bg-white/5'
                          }`}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="absolute bottom-8 left-6 right-6">
                <div className="border-t border-white/10 pt-6">
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-4 px-6 bg-[#00E5FF] text-black font-bold text-center rounded-xl hover:bg-[#66F0FF] transition-colors"
                  >
                    Hablemos →
                  </Link>
                  <p className="text-center text-xs text-gray-500 mt-4">
                    contacto@kainet.mx
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;