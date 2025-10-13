// src/pages/BlogPostPage.jsx
import React, { Suspense, lazy } from 'react';

const BlogPost = lazy(() => import('../components/BlogPost'));

const LoadingFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse text-[#00E5FF]">Cargando...</div>
  </div>
);

const BlogPostPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BlogPost />
    </Suspense>
  );
};

export default BlogPostPage;
