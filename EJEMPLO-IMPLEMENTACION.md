/**
 * EJEMPLO DE IMPLEMENTACIÓN
 * 
 * Cómo usar los nuevos componentes de fondo en Blog.jsx
 * 
 * Este archivo muestra las diferentes formas de usar:
 * 1. TitleBackground para secciones
 * 2. Clases CardBackground para tarjetas
 * 3. PageBackground para fondos de página
 */

// ============================================
// OPCIÓN 1: Agregar TitleBackground al inicio
// ============================================

// En Blog.jsx, importar:
// import TitleBackground from '../TitleBackground';

// Luego en el JSX, antes de las categorías:
/*
  <TitleBackground animated={true} className="mb-12">
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
      Blog & Artículos
    </h2>
    <p className="text-gray-400 text-lg">
      Explora mis últimas publicaciones sobre automatización, IA y DevOps
    </p>
  </TitleBackground>
*/

// ============================================
// OPCIÓN 2: Agregar clase CardBackground a tarjetas
// ============================================

// En PostCard, agregar clase:
// className="card-background group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"

// Resultado:
/*
  <motion.article
    variants={cardVariants}
    className="card-background group relative overflow-hidden rounded-2xl"
  >
*/

// ============================================
// OPCIÓN 3: Agregar fondos a secciones específicas
// ============================================

// Para hacer que los títulos de categorías se vean mejor:
/*
  <div className="mb-8">
    <div className="card-background card-title">
      <h3 className="text-2xl font-bold text-white mb-2">
        Categorías
      </h3>
      <p className="text-gray-400">
        Filtra por tema para encontrar lo que te interesa
      </p>
    </div>
  </div>
*/

// ============================================
// OPCIÓN 4: Combinar con PageBackground
// ============================================

// En Home o paginas específicas:
/*
import PageBackground from '../PageBackground';
import TitleBackground from '../TitleBackground';

export default function BlogPage() {
  return (
    <>
      {/* Fondo de partículas */}
      <PageBackground variant="default" />
      
      <div className="container mx-auto px-4 py-20">
        {/* Título con TitleBackground */}
        <TitleBackground animated={true} className="mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Blog de Automatización
          </h1>
        </TitleBackground>
        
        {/* Contenido */}
      </div>
    </>
  );
}
*/

// ============================================
// RESUMEN DE CLASES CSS DISPONIBLES
// ============================================

/*
.card-background
  - Fondo base con gradiente y blur
  - Hover effect con glow
  
.card-background.card-title
  - Variante para títulos
  - Más opaco y más glow en hover
  
.card-background.animate-in
  - Animación de entrada suave
  
.card-background.glassmorphic
  - Efecto vidrio más pronunciado
  - Mejor transparencia
*/

// ============================================
// EJEMPLO COMPLETO DE BLOG.JSX
// ============================================

/*
import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../hoc/SectionWrapper';
import TitleBackground from '../TitleBackground';
import PageBackground from '../PageBackground';
import { getBlogPosts } from '../lib/supabase';

const Blog = ({ variant = 'default' }) => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState('Todos');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await getBlogPosts({});
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  return (
    <>
      {/* Fondo animado solo en esta página (opcional) */}
      {variant === 'full' && <PageBackground variant="minimal" />}
      
      <SectionWrapper idName="blog">
        {/* Título con fondo */}
        <TitleBackground animated={true} className="mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            📝 Blog & Artículos
          </h2>
          <p className="text-gray-400 text-lg">
            Explora mis últimas publicaciones sobre automatización, IA y DevOps
          </p>
        </TitleBackground>

        {/* Resto del contenido */}
        <div className="grid gap-6">
          {posts.map((post) => (
            <article key={post.id} className="card-background animate-in">
              <h3 className="text-2xl font-bold text-white">
                {post.title}
              </h3>
              <p className="text-gray-400 mt-2">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
};

export default Blog;
*/
