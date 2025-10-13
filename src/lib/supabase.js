// src/lib/supabase.js
// Cliente de Supabase para el frontend (solo lectura pública)

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️  Supabase no está configurado. Usando datos estáticos.');
}

// Cliente público de Supabase (solo anon key, seguro para frontend)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Obtener todos los posts del blog (ordenados por fecha descendente)
 * @param {Object} options - Opciones de filtrado
 * @param {string} options.category - Filtrar por categoría
 * @param {boolean} options.featured - Solo posts destacados
 * @param {number} options.limit - Límite de resultados
 * @returns {Promise<Array>} Array de posts
 */
export async function getBlogPosts({ category, featured, limit } = {}) {
  if (!supabase) {
    // Fallback a datos estáticos si Supabase no está configurado
    const { blogPosts } = await import('../data/blogPosts.js');
    let filtered = [...blogPosts];
    
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }
    if (featured !== undefined) {
      filtered = filtered.filter(p => p.featured === featured);
    }
    if (limit) {
      filtered = filtered.slice(0, limit);
    }
    
    return filtered;
  }

  let query = supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  if (featured !== undefined) {
    query = query.eq('featured', featured);
  }

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error obteniendo posts:', error);
    throw error;
  }

  // Transformar read_time a readTime para mantener compatibilidad
  return data.map(post => ({
    ...post,
    readTime: post.read_time,
  }));
}

/**
 * Obtener un post específico por slug
 * @param {string} slug - Slug del post
 * @returns {Promise<Object|null>} Post o null si no existe
 */
export async function getPostBySlug(slug) {
  if (!supabase) {
    const { blogPosts } = await import('../data/blogPosts.js');
    return blogPosts.find(p => p.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // No encontrado
    }
    console.error('Error obteniendo post:', error);
    throw error;
  }

  return {
    ...data,
    readTime: data.read_time,
  };
}

/**
 * Obtener categorías únicas de posts
 * @returns {Promise<Array<string>>} Array de categorías
 */
export async function getCategories() {
  if (!supabase) {
    const { blogPosts } = await import('../data/blogPosts.js');
    return [...new Set(blogPosts.map(p => p.category))];
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('category')
    .order('category');

  if (error) {
    console.error('Error obteniendo categorías:', error);
    throw error;
  }

  return [...new Set(data.map(p => p.category))];
}

/**
 * Contar total de posts
 * @param {Object} options - Opciones de filtrado
 * @returns {Promise<number>} Número de posts
 */
export async function getPostsCount({ category, featured } = {}) {
  if (!supabase) {
    const { blogPosts } = await import('../data/blogPosts.js');
    let filtered = blogPosts;
    if (category) filtered = filtered.filter(p => p.category === category);
    if (featured !== undefined) filtered = filtered.filter(p => p.featured === featured);
    return filtered.length;
  }

  let query = supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true });

  if (category) query = query.eq('category', category);
  if (featured !== undefined) query = query.eq('featured', featured);

  const { count, error } = await query;

  if (error) {
    console.error('Error contando posts:', error);
    throw error;
  }

  return count || 0;
}
