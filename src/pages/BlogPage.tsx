// src/pages/BlogPage.tsx
import React, { Suspense, lazy } from 'react';

const Blog = lazy(() => import('../components/Blog'));

const LoadingFallback: React.FC = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-[#00E5FF]">Cargando...</div>
  </div>
);

const BlogPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Blog />
    </Suspense>
  );
};

export default BlogPage;
