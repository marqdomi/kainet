// src/layouts/MainLayout.tsx
import React, { useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import Particles from '../components/effects/Particles';

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

      {/* Animated Particle Background (OGL) */}
      <Particles
        particleCount={200}
        particleSpread={10}
        speed={0.3}
        particleColors={['#00E5FF', '#5227FF', '#B19EEF']}
        moveParticlesOnHover={true}
        particleHoverFactor={1}
        alphaParticles={true}
        particleBaseSize={100}
        sizeRandomness={1}
        cameraDistance={20}
        disableRotation={false}
      />

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
