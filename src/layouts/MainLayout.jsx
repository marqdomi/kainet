// src/layouts/MainLayout.jsx
import React, { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import PageBackground from '../components/PageBackground';

// Cursor personalizado KAINET
const KainetCursor = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    document.body.classList.add('has-custom-cursor');
    const el = ref.current;
    const onMove = (e) => {
      if (!el) return;
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);
  return <div ref={ref} className="k-cursor" />;
};

const MainLayout = () => {
  return (
    <>
      {/* Accessibility: Skip to main content */}
      <a href="#main" className="skip-link">Saltar al contenido</a>

      {/* Animated Particles Background (ogl - optimized) */}
      <PageBackground variant="default" />

      {/* Navigation */}
      <Navbar />

      {/* Custom Cursor */}
      <KainetCursor />

      {/* Main Content Area - Outlet renders child routes */}
      <main id="main" className="pt-24">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
};

export default MainLayout;
