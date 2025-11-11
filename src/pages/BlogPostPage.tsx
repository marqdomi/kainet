// src/pages/BlogPostPage.tsx
import React, { Suspense, lazy } from 'react';

const BlogPost = lazy(() => import('../components/BlogPost'));

const LoadingFallback: React.FC = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-[#00E5FF]">Cargando...</div>
  </div>
);

const BlogPostPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BlogPost />
    </Suspense>
  );
};

export default BlogPostPage;
