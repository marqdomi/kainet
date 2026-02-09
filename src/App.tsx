// src/App.tsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import PageTransition from './components/effects/PageTransition';
import ErrorBoundary from './components/ErrorBoundary';
import { EasterEggProvider, useEasterEggContext } from './contexts/EasterEggContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { features } from './config/features';

// Pages - Lazy loaded for code splitting
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NewsletterConfirmPage = lazy(() => import('./pages/NewsletterConfirmPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const KaidoPage = lazy(() => import('./pages/KaidoPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy load easter egg components (only non-cultural ones)
const Fireworks = lazy(() => import('./components/effects/Fireworks'));
const CookieConsent = lazy(() => import('./components/CookieConsent'));

// Enterprise Background - Static gradient (replaces FloatingLines for better performance)
import EnterpriseBackground from './components/effects/EnterpriseBackground';
import './components/effects/EnterpriseBackground.css';

// FloatingLines - kept for legacy/optional use (commented out for performance)
// import FloatingLines from './components/effects/FloatingLines';

const AppContent = () => {
  const {
    specialDateEffect,
  } = useEasterEggContext();

  // Page loading fallback
  const PageLoader = (
    <div className="min-h-screen flex items-center justify-center">
      <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-[var(--cyan-neon)] border-r-transparent" />
    </div>
  );

  // Conditionally render content based on feature flags
  const RoutesContent = (
    <Suspense fallback={PageLoader}>
      <Routes>
        {/* Main layout wraps all pages */}
        <Route path="/" element={<MainLayout />}>
          {/* Home page */}
          <Route index element={<Home />} />

          {/* About page */}
          <Route path="nosotros" element={<AboutPage />} />

          {/* Kaido Landing Page */}
          <Route path="kaido" element={<KaidoPage />} />

          {/* Products & Services - Ahora Competencias */}
          <Route path="servicios" element={<ServicesPage />} />

          {/* Projects */}
          <Route path="proyectos" element={<ProjectsPage />} />

          {/* Blog */}
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />

          {/* Contact */}
          <Route path="contact" element={<ContactPage />} />

          {/* Newsletter */}
          <Route path="newsletter/confirm" element={<NewsletterConfirmPage />} />

          {/* Legal */}
          <Route path="privacidad" element={<PrivacyPage />} />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );

  return (
    <>
      {/* Enterprise Background - Static gradient for professional look */}
      <EnterpriseBackground />

      {/* Main content with proper z-index */}
      <div className="app-content-wrapper">
        {features.pageTransitions ? (
          <PageTransition duration={600}>
            {RoutesContent}
          </PageTransition>
        ) : (
          RoutesContent
        )}
      </div>

      {/* Easter Egg Effects - Only fireworks for special dates */}
      {features.easterEggs && (
        <Suspense fallback={null}>
          {specialDateEffect === 'fireworks' && <Fireworks active={true} />}
        </Suspense>
      )}

      {/* Cookie Consent Banner - GDPR Compliance */}
      <Suspense fallback={null}>
        <CookieConsent />
      </Suspense>
    </>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <BrowserRouter>
            <EasterEggProvider>
              <AppContent />
            </EasterEggProvider>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;