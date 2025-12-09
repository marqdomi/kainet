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

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import NewsletterConfirmPage from './pages/NewsletterConfirmPage';
import PrivacyPage from './pages/PrivacyPage';
import KaidoPage from './pages/KaidoPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import NotFound from './pages/NotFound';

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

  // Conditionally render content based on feature flags
  const RoutesContent = (
    <Routes>
      {/* Main layout wraps all pages */}
      <Route path="/" element={<MainLayout />}>
        {/* Home page */}
        <Route index element={<Home />} />

        {/* About page */}
        <Route path="about" element={<AboutPage />} />
        <Route path="nosotros" element={<AboutPage />} />

        {/* Kaido Landing Page */}
        <Route path="kaido" element={<KaidoPage />} />

        {/* Products & Services - Ahora Competencias */}
        <Route path="servicios" element={<ServicesPage />} />

        {/* Projects / Proyectos */}
        <Route path="projects" element={<ProjectsPage />} />
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