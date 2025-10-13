// src/pages/Home.jsx
import React, { lazy, Suspense, useState, useRef, useEffect } from 'react';
import Hero from '../components/Hero';

// Lazy loading de componentes pesados
const About = lazy(() => import('../components/About'));
const KainetResto = lazy(() => import('../components/KainetResto'));
const Blog = lazy(() => import('../components/Blog'));
const Playground = lazy(() => import('../components/Playground'));
const Contact = lazy(() => import('../components/Contact'));

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
      
      <Hero />
      
      <LazySection>
        <Suspense fallback={<LoadingFallback />}>
          <About />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<LoadingFallback />}>
          <KainetResto />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<LoadingFallback />}>
          <Blog />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<LoadingFallback />}>
          <Playground />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<LoadingFallback />}>
          <Contact />
        </Suspense>
      </LazySection>
    </>
  );
};

export default Home;
