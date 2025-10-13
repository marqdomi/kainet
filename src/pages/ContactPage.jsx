// src/pages/ContactPage.jsx
import React, { Suspense, lazy } from 'react';

const Contact = lazy(() => import('../components/Contact'));

const LoadingFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-[#00E5FF]">Cargando...</div>
  </div>
);

const ContactPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Contact />
    </Suspense>
  );
};

export default ContactPage;
