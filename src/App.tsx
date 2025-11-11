// src/App.tsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import PageTransition from './components/effects/PageTransition';
import ErrorBoundary from './components/ErrorBoundary';
import { EasterEggProvider, useEasterEggContext } from './contexts/EasterEggContext';
import { features } from './config/features';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import NewsletterConfirmPage from './pages/NewsletterConfirmPage';
import NotFound from './pages/NotFound';

// Lazy load easter egg components
const MatrixRain = lazy(() => import('./components/effects/MatrixRain'));
const ToriiAnimation = lazy(() => import('./components/effects/ToriiAnimation'));
const SakuraPetals = lazy(() => import('./components/effects/SakuraPetals'));
const Fireworks = lazy(() => import('./components/effects/Fireworks'));

const AppContent = () => {
  const {
    matrixRainActive,
    toriiAnimationActive,
    specialDateEffect,
    dismissMatrixRain,
    dismissToriiAnimation
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
        
        {/* Projects */}
        <Route path="projects" element={<ProjectsPage />} />
        
        {/* Blog */}
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        
        {/* Contact */}
        <Route path="contact" element={<ContactPage />} />
        
        {/* Newsletter */}
        <Route path="newsletter/confirm" element={<NewsletterConfirmPage />} />
        
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );

  return (
    <>
      {/* Conditionally wrap with PageTransition based on feature flag */}
      {features.pageTransitions ? (
        <PageTransition duration={600}>
          {RoutesContent}
        </PageTransition>
      ) : (
        RoutesContent
      )}

      {/* Easter Egg Effects - Only render if feature is enabled */}
      {features.easterEggs && (
        <Suspense fallback={null}>
          {matrixRainActive && (
            <MatrixRain active={matrixRainActive} onDismiss={dismissMatrixRain} />
          )}
          {toriiAnimationActive && (
            <ToriiAnimation active={toriiAnimationActive} onDismiss={dismissToriiAnimation} />
          )}
          {specialDateEffect === 'sakuraPetals' && <SakuraPetals active={true} />}
          {specialDateEffect === 'fireworks' && <Fireworks active={true} />}
        </Suspense>
      )}
    </>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <EasterEggProvider>
          <AppContent />
        </EasterEggProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;