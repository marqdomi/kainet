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
  // Usar Supabase como única fuente de verdad
  if (!supabase) {
    console.error('❌ Supabase no está configurado');
    throw new Error('Supabase not configured');
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
  // Usar Supabase como única fuente de verdad
  if (!supabase) {
    console.error('❌ Supabase no está configurado');
    throw new Error('Supabase not configured');
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
    console.error('❌ Supabase no está configurado');
    return ['IA', 'Automatización', 'DevOps', 'Tutoriales']; // Fallback a categorías por defecto
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
    console.error('❌ Supabase no está configurado');
    return 0;
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

/**
 * Insertar un nuevo post en la base de datos
 * @param {Object} post - Objeto del post
 * @param {string} post.slug - Slug único del post
 * @param {string} post.title - Título
 * @param {string} post.excerpt - Resumen corto
 * @param {string} post.content - Contenido markdown
 * @param {string} post.category - Categoría (IA, Automatización, Tutoriales, DevOps, etc)
 * @param {string} post.author - Autor (default: KAINET)
 * @param {string} post.date - Fecha (YYYY-MM-DD)
 * @param {string} post.readTime - Tiempo de lectura (default: 5 min)
 * @param {string} post.image - URL de imagen (optional)
 * @param {boolean} post.featured - Si es destacado (default: false)
 * @returns {Promise<Object>} Post insertado con ID
 */
export async function insertBlogPost(post) {
  if (!supabase) {
    console.error('❌ Supabase no está configurado. No se puede guardar en BD.');
    throw new Error('Supabase not configured');
  }

  // Validar campos requeridos
  if (!post.slug || !post.title || !post.excerpt || !post.content || !post.category || !post.date) {
    throw new Error('Faltan campos requeridos: slug, title, excerpt, content, category, date');
  }

  // Preparar datos para insertar
  const postData = {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    author: post.author || 'KAINET',
    date: post.date,
    read_time: post.readTime || '5 min',
    image: post.image || null,
    featured: post.featured || false,
  };

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([postData])
    .select();

  if (error) {
    console.error('❌ Error insertando post:', error);
    throw error;
  }

  console.log('✅ Post insertado exitosamente:', data[0].slug);
  return data[0];
}

/**
 * Actualizar un post existente
 * @param {string} slug - Slug del post a actualizar
 * @param {Object} updates - Campos a actualizar
 * @returns {Promise<Object>} Post actualizado
 */
export async function updateBlogPost(slug, updates) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .update(updates)
    .eq('slug', slug)
    .select();

  if (error) {
    console.error('❌ Error actualizando post:', error);
    throw error;
  }

  console.log('✅ Post actualizado:', slug);
  return data[0];
}

/**
 * Eliminar un post
 * @param {string} slug - Slug del post a eliminar
 * @returns {Promise<void>}
 */
export async function deleteBlogPost(slug) {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('slug', slug);

  if (error) {
    console.error('❌ Error eliminando post:', error);
    throw error;
  }

  console.log('✅ Post eliminado:', slug);
}
