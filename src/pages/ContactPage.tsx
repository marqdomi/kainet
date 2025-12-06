// src/pages/ContactPage.tsx
import React, { Suspense, lazy } from 'react';
import SEO from '../components/SEO';

const Contact = lazy(() => import('../components/Contact'));

const LoadingFallback: React.FC = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-[#00E5FF]">Cargando...</div>
  </div>
);

const ContactPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Contacto"
        description="Contáctanos para consultas sobre automatización, desarrollo web o proyectos SaaS. Respuesta en menos de 24 horas. Ciudad de México."
        url="https://kainet.mx/contact"
      />
      <Suspense fallback={<LoadingFallback />}>
        <Contact />
      </Suspense>
    </>
  );
};

export default ContactPage;

