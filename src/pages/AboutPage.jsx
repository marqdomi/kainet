// src/pages/AboutPage.jsx
import React, { Suspense, lazy } from 'react';

const About = lazy(() => import('../components/About'));

const LoadingFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-[#00E5FF]">Cargando...</div>
  </div>
);

const AboutPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <About />
    </Suspense>
  );
};

export default AboutPage;
