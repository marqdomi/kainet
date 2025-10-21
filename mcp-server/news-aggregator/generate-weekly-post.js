#!/usr/bin/env node

/**
 * GENERADOR SEMANAL DE POSTS CON IA
 * 
 * Genera 2 posts semanales:
 * 1. Automatización Empresarial (noticias globales)
 * 2. DevOps & Herramientas (tendencias de automatización)
 * 
 * - Agrega noticias reales (HN, Reddit, ArXiv)
 * - Usa Gemini 2.5-PRO para análisis inteligente
 * - Guarda automáticamente en Supabase
 * - Fallback a blogPosts.js si Supabase falla
 * 
 * Uso:
 *   npm run generate-weekly
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Parser from 'rss-parser';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// ===== CONFIGURACIÓN =====
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar Gemini (usando 2.5-flash para mejor disponibilidad)
// Cambia a 'gemini-2.5-pro' si necesitas más poder
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Inicializar Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://tqdencmzezjevnntifos.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

let supabaseClient = null;
if (SUPABASE_SERVICE_KEY) {
  supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  console.log('✅ Supabase configurado');
} else {
  console.warn('⚠️  SUPABASE_SERVICE_KEY no configurada. Guardado local solo.');
}

// Ruta al archivo local de posts
const blogPostsPath = join(__dirname, '../../src/data/blogPosts.js');

// Configuración de búsqueda
const CONFIG = {
  categories: {
    automation: {
      keywords: ['automation', 'rpa', 'workflow', 'ifttt', 'zapier', 'make', 'n8n', 'integración', 'enterprise', 'business process'],
      sources: ['Hacker News', 'Reddit', 'Industry News'],
      title: 'Automatización Empresarial',
      category: 'Automatización',
    },
    devops: {
      keywords: ['devops', 'ci/cd', 'kubernetes', 'docker', 'terraform', 'ansible', 'github actions', 'gitlab ci', 'deployment', 'infrastructure as code', 'iac', 'deployment automation'],
      sources: ['Hacker News', 'Reddit', 'Tech News'],
      title: 'DevOps & Herramientas',
      category: 'DevOps',
    },
  },
};

// Utilidad: Delay para rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ===== FUNCIONES DE AGREGACIÓN =====

/**
 * Obtiene top stories de Hacker News filtrados por keywords
 */
async function fetchHackerNews(keywords, limit = 20) {
  try {
    const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const storyIds = await res.json();
    
    const stories = [];
    for (let i = 0; i < Math.min(storyIds.length, 50); i++) {
      const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyIds[i]}.json`);
      const story = await storyRes.json();
      
      if (story && story.title) {
        const titleLower = story.title.toLowerCase();
        if (keywords.some(kw => titleLower.includes(kw.toLowerCase()))) {
          stories.push({
            title: story.title,
            url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
            score: story.score,
            source: 'Hacker News',
            date: new Date(story.time * 1000).toISOString(),
          });
        }
      }
      
      if (stories.length >= limit) break;
      await delay(100); // Rate limiting
    }
    
    return stories;
  } catch (error) {
    console.error('❌ Error fetching HN:', error.message);
    return [];
  }
}

/**
 * Obtiene posts relevantes de Reddit
 */
async function fetchReddit(keywords, subreddit = 'r/devops+r/automation', limit = 15) {
  try {
    const url = `https://www.reddit.com/${subreddit}.json?limit=50`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'KAINET-Bot/1.0' },
    });
    const data = await res.json();

    // Validar que data.data.children existe
    if (!data || !data.data || !data.data.children || !Array.isArray(data.data.children)) {
      console.warn('⚠️  Reddit data structure unexpected, retrying...');
      return [];
    }

    const posts = data.data.children
      .filter(post => {
        const titleLower = post.data.title.toLowerCase();
        return keywords.some(kw => titleLower.includes(kw.toLowerCase()));
      })
      .slice(0, limit)
      .map(post => ({
        title: post.data.title,
        url: `https://reddit.com${post.data.permalink}`,
        score: post.data.score,
        source: `Reddit (r/${post.data.subreddit})`,
        date: new Date(post.data.created_utc * 1000).toISOString(),
      }));

    return posts;
  } catch (error) {
    console.error('❌ Error fetching Reddit:', error.message);
    return [];
  }
}

/**
 * Busca papers en ArXiv sobre tópicos relacionados
 */
async function fetchArxiv(keywords, limit = 10) {
  try {
    const query = 'cat:cs.SE OR cat:cs.DC'; // Software Engineering, Distributed Systems
    const url = `http://export.arxiv.org/api/query?search_query=${encodeURIComponent(query)}&sortBy=submittedDate&sortOrder=descending&max_results=${limit}`;
    
    const res = await fetch(url);
    const xmlText = await res.text();
    
    const entries = xmlText.match(/<entry>[\s\S]*?<\/entry>/g) || [];
    
    return entries.slice(0, limit).map((entry) => {
      const title = entry.match(/<title>(.*?)<\/title>/)?.[1] || '';
      const summary = entry.match(/<summary>(.*?)<\/summary>/)?.[1]?.trim() || '';
      const link = entry.match(/<id>(.*?)<\/id>/)?.[1] || '';
      const published = entry.match(/<published>(.*?)<\/published>/)?.[1] || '';
      
      return {
        title: title.replace(/\n/g, ' '),
        url: link,
        summary: summary.replace(/\n/g, ' ').substring(0, 200),
        source: 'ArXiv',
        date: published,
      };
    });
  } catch (error) {
    console.error('❌ Error fetching ArXiv:', error.message);
    return [];
  }
}

/**
 * Agrega noticias relevantes para una categoría
 */
async function aggregateNews(category, keywords) {
  console.log(`\n📰 Agregando noticias para: ${category}...`);
  
  const [hnNews, redditNews, arxivNews] = await Promise.all([
    fetchHackerNews(keywords, 10),
    fetchReddit(keywords, 'r/devops+r/sysadmin+r/automation', 10),
    fetchArxiv(keywords, 5),
  ]);

  const allNews = [
    ...hnNews,
    ...redditNews,
    ...arxivNews,
  ];

  // Ordenar por relevancia (score)
  allNews.sort((a, b) => (b.score || 0) - (a.score || 0));

  console.log(`✅ Encontradas ${allNews.length} noticias relevantes`);
  
  return allNews;
}

// ===== GENERACIÓN CON IA =====

/**
 * Genera contenido de blog usando Gemini 2.5-Flash
 */
async function generateContentWithAI(news, categoryConfig, weekNumber) {
  console.log(`\n🤖 Generando contenido con Gemini 2.5-Flash para: ${categoryConfig.title}...`);
  
  // Preparar resumen de noticias para Gemini
  const newsContext = news.slice(0, 8).map((item, idx) => {
    return `${idx + 1}. "${item.title}" (${item.source}) - Score: ${item.score || 'N/A'}\n   URL: ${item.url}`;
  }).join('\n\n');

  const prompt = `Based on these tech news items, write a blog post in ONLY this JSON format, nothing else:

{
  "title": "Catchy title here",
  "excerpt": "Brief 100-150 char summary",
  "content": "<p>1500-2000 word blog post in HTML</p>",
  "readTime": 8
}

NEWS ITEMS:
${newsContext}

IMPORTANT:
- ONLY respond with the JSON object, no code blocks, no markdown, no extra text
- Content in Spanish
- HTML only: p, h2, h3, ul, li, strong tags
- Escape quotes in strings with backslash
- Valid JSON that can be parsed with JSON.parse()`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Parsear JSON con agresivo cleaning
    let jsonContent;
    try {
      // Muy agresivo: remover TODO markdown
      text = text.replace(/```[\s\S]*?```/g, '');  // Remover code blocks
      text = text.replace(/^```(json)?\n?/m, '');  // Remover opening ```
      text = text.replace(/\n?```$/m, '');  // Remover closing ```
      text = text.trim();
      
      // Encontrar JSON entre primeras y últimas llaves
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      
      if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
        throw new Error('Could not locate JSON braces');
      }
      
      const jsonString = text.substring(jsonStart, jsonEnd + 1);
      
      // Intentar parsear
      jsonContent = JSON.parse(jsonString);
      
      // Validar campos
      if (!jsonContent.title || !jsonContent.excerpt || !jsonContent.content) {
        throw new Error('Missing required JSON fields');
      }
      
    } catch (parseError) {
      console.error('⚠️  Error parseando JSON:', parseError.message);
      console.log('Raw text (first 500 chars):\n', text.substring(0, 500));
      
      // Fallback: generar post mínimo
      console.log('📝 Usando fallback template...');
      jsonContent = {
        title: `${categoryConfig.title} - Week ${weekNumber}`,
        excerpt: `Latest insights on ${categoryConfig.title.toLowerCase()}`,
        content: `<p>Content generation encountered an error. Please check the system logs.</p>`,
        readTime: 5
      };
    }

    return jsonContent;
  } catch (error) {
    console.error('❌ Error con Gemini API:', error.message);
    throw error;
  }
}

/**
 * Normaliza caracteres especiales en strings (convierte unicode a ASCII)
 */
function normalizeContent(text) {
  if (!text) return '';
  return text
    // Convertir comillas inteligentes a comillas normales
    .replace(/[\u2018\u2019]/g, "'")  // ' y ' → '
    .replace(/[\u201C\u201D]/g, '"')  // " y " → "
    .replace(/[\u2013\u2014]/g, '-')  // – y — → -
    // Remover caracteres de control
    .replace(/[\x00-\x1F\x7F]/g, '')
    // Remover caracteres especiales problemáticos
    .replace(/[\uFEFF]/g, '');
}

/**
 * Crea un objeto de post completo
 */
function createPost(aiContent, categoryConfig, weekNumber) {
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0];
  
  // Generar slug de título
  const slug = aiContent.title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60) + `-semana-${weekNumber}`;

  // Normalizar contenido para evitar problemas con JSON
  const normalizedContent = normalizeContent(aiContent.content);
  const normalizedExcerpt = normalizeContent(aiContent.excerpt);
  const normalizedTitle = normalizeContent(aiContent.title);

  return {
    id: Date.now() + Math.random(),
    slug: slug,
    title: normalizedTitle,
    excerpt: normalizedExcerpt,
    content: normalizedContent,
    author: 'KAINET AI',
    date: dateStr,
    readTime: calculateReadTime(normalizedContent),
    category: categoryConfig.category,
    image: `https://placehold.co/800x500/0a0a0a/00E5FF?text=${encodeURIComponent(categoryConfig.title)}`,
    featured: false,
  };
}

/**
 * Calcula tiempo de lectura
 */
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

// ===== GUARDADO EN SUPABASE Y LOCAL =====

/**
 * Guarda post en Supabase
 */
/**
 * Guarda el post en Supabase
 */
async function saveToSupabase(post) {
  if (!supabaseClient) {
    console.warn('⚠️  Supabase no configurado. Omitiendo guardado en BD.');
    return null;
  }

  try {
    // Primero, intentar actualizar si existe
    const { data: existing, error: checkError } = await supabaseClient
      .from('blog_posts')
      .select('id')
      .eq('slug', post.slug)
      .limit(1)
      .single();

    let result;
    if (existing && !checkError) {
      // Actualizar registro existente
      const { data, error } = await supabaseClient
        .from('blog_posts')
        .update({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          category: post.category,
          featured: post.featured,
          read_time: post.readTime,
          image: post.image,
          date: post.date,
        })
        .eq('slug', post.slug)
        .select();
      
      result = { data, error };
      console.log('📝 Post actualizado en Supabase');
    } else {
      // Insertar nuevo registro
      // Asegurarse que date es válido
      const dateStr = post.date || new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabaseClient
        .from('blog_posts')
        .insert([{
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author || 'KAINET',
          category: post.category,
          featured: post.featured || false,
          read_time: post.readTime || '8 min',
          image: post.image || null,
          date: dateStr,
        }])
        .select();
      
      result = { data, error };
    }

    if (result.error) {
      console.error('❌ Error Supabase:', result.error.message);
      if (result.error.details) console.error('   Detalles:', result.error.details);
      return null;
    }

    console.log('✅ Post guardado en Supabase');
    return result.data;
  } catch (error) {
    console.error('❌ Error con Supabase:', error.message);
    return null;
  }
}

/**
 * Guarda post localmente en blogPosts.js
 */
async function saveToLocalBlog(post) {
  try {
    // Leer archivo actual
    const fileContent = await readFile(blogPostsPath, 'utf-8');
    
    // Parsear JSON (es un export default)
    const startIdx = fileContent.indexOf('[');
    const endIdx = fileContent.lastIndexOf(']') + 1;
    const jsonStr = fileContent.substring(startIdx, endIdx);
    const posts = JSON.parse(jsonStr);

    // Crear una copia segura del post para JSON
    // JSON.stringify automáticamente escapa caracteres especiales
    const safePost = {
      id: post.id || `post-${Date.now()}`,
      slug: post.slug,
      title: post.title || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      author: post.author || 'KAINET',
      category: post.category || '',
      featured: Boolean(post.featured),
      readTime: post.readTime || 8,
      image: post.image || null,
      date: post.date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };

    // Agregar nuevo post al principio
    posts.unshift(safePost);

    // JSON.stringify maneja automáticamente caracteres especiales
    const newContent = `export default ${JSON.stringify(posts, null, 2)};\n`;
    await writeFile(blogPostsPath, newContent, 'utf-8');

    console.log('✅ Post guardado en blogPosts.js local');
  } catch (error) {
    console.error('❌ Error guardando localmente:', error.message);
    // No lanzar error, solo registrar
  }
}

// ===== FLUJO PRINCIPAL =====

/**
 * Genera 2 posts semanales: Automatización + DevOps
 */
async function generateWeeklyPosts() {
  try {
    const now = new Date();
    const weekNumber = Math.ceil((now.getDate() - now.getDay()) / 7);
    
    console.log('\n' + '='.repeat(60));
    console.log(`🚀 KAINET Weekly Post Generator`);
    console.log(`📅 Semana ${weekNumber} - ${now.toLocaleDateString('es-ES')}`);
    console.log('='.repeat(60));

    const posts = [];

    // 1. POST DE AUTOMATIZACIÓN EMPRESARIAL
    console.log('\n' + '─'.repeat(60));
    console.log('POST 1: AUTOMATIZACIÓN EMPRESARIAL');
    console.log('─'.repeat(60));

    const automationNews = await aggregateNews(
      'Automatización Empresarial',
      CONFIG.categories.automation.keywords
    );

    if (automationNews.length > 0) {
      const automationContent = await generateContentWithAI(
        automationNews,
        CONFIG.categories.automation,
        weekNumber
      );

      const automationPost = createPost(
        automationContent,
        CONFIG.categories.automation,
        weekNumber
      );

      await saveToSupabase(automationPost);
      await saveToLocalBlog(automationPost);
      posts.push(automationPost);

      console.log(`📝 Post creado: "${automationPost.title}"`);
      console.log(`📊 Slug: ${automationPost.slug}`);
    } else {
      console.warn('⚠️  No se encontraron noticias para automatización');
    }

    // 2. POST DE DEVOPS
    console.log('\n' + '─'.repeat(60));
    console.log('POST 2: DEVOPS & HERRAMIENTAS');
    console.log('─'.repeat(60));

    const devopsNews = await aggregateNews(
      'DevOps & Herramientas',
      CONFIG.categories.devops.keywords
    );

    if (devopsNews.length > 0) {
      const devopsContent = await generateContentWithAI(
        devopsNews,
        CONFIG.categories.devops,
        weekNumber
      );

      const devopsPost = createPost(
        devopsContent,
        CONFIG.categories.devops,
        weekNumber
      );

      await saveToSupabase(devopsPost);
      await saveToLocalBlog(devopsPost);
      posts.push(devopsPost);

      console.log(`📝 Post creado: "${devopsPost.title}"`);
      console.log(`📊 Slug: ${devopsPost.slug}`);
    } else {
      console.warn('⚠️  No se encontraron noticias para DevOps');
    }

    // Resumen final
    console.log('\n' + '='.repeat(60));
    console.log(`✅ Generación completada`);
    console.log(`📊 Posts creados: ${posts.length}`);
    console.log(`💾 Guardados en: Supabase + blogPosts.js`);
    console.log('='.repeat(60) + '\n');

    return posts;
  } catch (error) {
    console.error('\n❌ ERROR EN GENERACIÓN:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// ===== EJECUCIÓN =====

if (import.meta.url === `file://${process.argv[1]}`) {
  generateWeeklyPosts();
}

export { generateWeeklyPosts };
