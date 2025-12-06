// src/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

const MainLayout: React.FC = () => {
  console.log('[MainLayout] Component rendering');
  
  return (
    <>
      {/* Accessibility: Skip to main content */}
      <a href="#main" className="skip-link">Saltar al contenido</a>

      {/* Navigation */}
      <Navbar />

      {/* Main Content Area - Outlet renders child routes */}
      <main id="main" className="pt-24">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
};

export default MainLayout;
