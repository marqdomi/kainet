// src/pages/BlogPage.tsx
import React, { Suspense, lazy } from 'react';
import SEO from '../components/SEO';

const Blog = lazy(() => import('../components/Blog'));

const LoadingFallback: React.FC = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-[#00E5FF]">Cargando...</div>
  </div>
);

const BlogPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Blog"
        description="Artículos sobre IA, automatización empresarial, desarrollo web y DevOps. Mantente al día con las últimas tendencias en tecnología y transformación digital."
        url="https://kainet.mx/blog"
      />
      <Suspense fallback={<LoadingFallback />}>
        <Blog />
      </Suspense>
    </>
  );
};

export default BlogPage;

