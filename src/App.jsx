// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
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
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;