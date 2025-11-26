// src/pages/Home.jsx
import React, { lazy, Suspense, useState, useRef, useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';

// Lazy loading de componentes pesados
const KaidoSpotlight = lazy(() => import('../components/KaidoSpotlight'));
const SocialProof = lazy(() => import('../components/SocialProof'));
const FinalCTA = lazy(() => import('../components/FinalCTA'));

// Loading placeholder
const LoadingFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-[#00E5FF]">Cargando...</div>
  </div>
);

// Lazy section with IntersectionObserver
const LazySection = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref}>{visible ? children : null}</div>;
};

const Home = () => {
  return (
    <>
      <span id="top" className="sr-only">Inicio</span>

      {/* Hero Section */}
      <Hero />

      {/* Kaido Spotlight - Producto Insignia */}
      <LazySection>
        <Suspense fallback={<LoadingFallback />}>
          <KaidoSpotlight />
        </Suspense>
      </LazySection>

      {/* Services Overview */}
      <Services />

      {/* Social Proof - NUEVO (Fase 4) */}
      <LazySection>
        <Suspense fallback={<LoadingFallback />}>
          <SocialProof />
        </Suspense>
      </LazySection>

      {/* Final Dual CTA - NUEVO (Fase 4) */}
      <LazySection>
        <Suspense fallback={<LoadingFallback />}>
          <FinalCTA />
        </Suspense>
      </LazySection>
    </>
  );
};

export default Home;
