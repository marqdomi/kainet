// src/App.jsx
import React, { useEffect, useRef, lazy, Suspense, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

// 🚀 OPTIMIZADO: Lazy loading de componentes pesados
const BackgroundCanvas = lazy(() => import('./components/BackgroundCanvas'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const KainetResto = lazy(() => import('./components/KainetResto'));
const Blog = lazy(() => import('./components/Blog'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const Playground = lazy(() => import('./components/Playground'));

// 🚀 OPTIMIZADO: Loading placeholder mejorado
const LoadingFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-[#00E5FF]">Cargando...</div>
  </div>
);

const KainetCursor = () => {
  const ref = useRef(null);
  useEffect(() => {
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

const sectionByPath = (path) => {
  const clean = (path || '/').replace(/\/+$/, '') || '/';
  
  // Detectar rutas de blog individual (/blog/slug)
  if (clean.startsWith('/blog/')) {
    return 'blog-post';
  }
  
  switch (clean) {
    case '/about':
      return 'about';
    case '/kainet-resto':
      return 'kainet-resto';
    case '/blog':
      return 'blog';
    case '/playground':
      return 'playground';
    case '/contact':
      return 'contact';
    case '/':
    default:
      return 'top';
  }
};

const App = () => {
  // Si la ruta es /playground, montamos esa sección de inmediato (sin lazy-in-view)
  const initialForcePlayground =
    typeof window !== 'undefined' &&
    window.location.pathname.replace(/\/+$/, '') === '/playground';
  const [forcePlayground] = useState(initialForcePlayground);
  
  // Detectar si estamos en una página de blog individual
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isBlogPost = currentPath.startsWith('/blog/') && currentPath !== '/blog' && currentPath !== '/blog/';

  useEffect(() => {
    // Scroll automático a la sección correspondiente a la ruta bonita
    const targetId = sectionByPath(window.location.pathname);
    // Espera un tick para asegurar que el DOM/section existe (y Playground si aplica)
    const t = setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
    return () => clearTimeout(t);
  }, []);

  // Si es una página de blog individual, mostrar solo eso
  if (isBlogPost) {
    return (
      <>
        <a href="#main" className="skip-link">Saltar al contenido</a>
        <Suspense fallback={null}>
          <BackgroundCanvas />
        </Suspense>
        <Navbar />
        <KainetCursor />
        <main id="main">
          <Suspense fallback={<LoadingFallback />}>
            <BlogPost />
          </Suspense>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <a href="#main" className="skip-link">Saltar al contenido</a>

      {/* Fondo viviente detrás de todo */}
      <Suspense fallback={null}>
        <BackgroundCanvas />
      </Suspense>

      {/* Ancla de inicio para el logo de la navbar */}
      <span id="top" className="sr-only">Inicio</span>
      <Navbar />
      <KainetCursor />

      <main id="main" className="pt-24">
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

        {forcePlayground ? (
          <Suspense fallback={<LoadingFallback />}>
            <Playground />
          </Suspense>
        ) : (
          <LazySection>
            <Suspense fallback={<LoadingFallback />}>
              <Playground />
            </Suspense>
          </LazySection>
        )}

        <LazySection>
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        </LazySection>

        <Footer />
      </main>
    </>
  );
};

export default App;