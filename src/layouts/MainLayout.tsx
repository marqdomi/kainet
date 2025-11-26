// src/layouts/MainLayout.tsx
import React, { useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

// Cursor personalizado KAINET
const KainetCursor: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    document.body.classList.add('has-custom-cursor');
    const el = ref.current;
    
    const onMove = (e: PointerEvent): void => {
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

const MainLayout: React.FC = () => {
  return (
    <>
      {/* Accessibility: Skip to main content */}
      <a href="#main" className="skip-link">Saltar al contenido</a>

      {/* Note: FloatingLines is now rendered globally in App.tsx */}

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
