// src/pages/Home.tsx
import React, { lazy, Suspense, useState, useRef, useEffect, ReactNode } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';

// Lazy loading de componentes pesados
const FeaturedProjects = lazy(() => import('../components/FeaturedProjects'));
const LatestPosts = lazy(() => import('../components/LatestPosts'));
const About = lazy(() => import('../components/About'));
const Contact = lazy(() => import('../components/Contact'));

// Loading placeholder
const LoadingFallback: React.FC = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-[#00E5FF]">Cargando...</div>
  </div>
);

interface LazySectionProps {
  children: ReactNode;
}

// Lazy section with IntersectionObserver
const LazySection: React.FC<LazySectionProps> = ({ children }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  
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

const Home: React.FC = () => {
  return (
    <>
      <span id="top" className="sr-only">Inicio</span>
      
      {/* Hero Section */}
      <Hero />
      
      {/* Services Overview - No lazy (importante, arriba del fold) */}
      <Services />
      
      {/* Featured Projects */}
      <LazySection>
        <Suspense fallback={<LoadingFallback />}>
          <FeaturedProjects />
        </Suspense>
      </LazySection>

      {/* Latest Blog Posts */}
      <LazySection>
        <Suspense fallback={<LoadingFallback />}>
          <LatestPosts />
        </Suspense>
      </LazySection>

      {/* About Section */}
      <LazySection>
        <Suspense fallback={<LoadingFallback />}>
          <About />
        </Suspense>
      </LazySection>

      {/* Contact Form */}
      <LazySection>
        <Suspense fallback={<LoadingFallback />}>
          <Contact />
        </Suspense>
      </LazySection>
    </>
  );
};

export default Home;
