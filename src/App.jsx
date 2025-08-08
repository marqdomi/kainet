// src/App.jsx
import React, { useEffect, useRef, lazy, Suspense, useState } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';

const Playground = lazy(() => import('./components/Playground'));

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
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { rootMargin: '200px' });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref}>{visible ? children : null}</div>;
};

const App = () => {
  return (
    <>
      <a href="#main" className="skip-link">Saltar al contenido</a>
      {/* Fondo viviente detrás de todo */}
      <BackgroundCanvas />

      <span id="top" className="sr-only">Inicio</span>
      <Navbar />
      <KainetCursor />

      <main id="main" className="pt-24">
        <Hero />
        <About />
        <Work />
        <LazySection>
          <Suspense fallback={null}>
            <Playground />
          </Suspense>
        </LazySection>
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default App;