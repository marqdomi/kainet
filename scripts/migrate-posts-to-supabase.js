#!/usr/bin/env node
// scripts/migrate-posts-to-supabase.js
// Migra posts existentes de blogPosts.js a Supabase

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Faltan variables de entorno');
  console.error('Necesitas: SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migratePosts() {
  console.log('\n🚀 Migrando posts a Supabase...\n');

  try {
    // Leer blogPosts.js
    const blogPostsPath = join(__dirname, '../src/data/blogPosts.js');
    const content = fs.readFileSync(blogPostsPath, 'utf-8');
    
    // Extraer el array de posts (esto es un hack simple)
    const match = content.match(/export const blogPosts = (\[[\s\S]*?\]);/);
    if (!match) {
      console.error('❌ No se pudo parsear blogPosts.js');
      process.exit(1);
    }

    // Evaluar el array (cuidado: solo funciona con datos seguros)
    const blogPosts = eval(match[1]);
    
    console.log(`📚 Encontrados ${blogPosts.length} posts en blogPosts.js\n`);

    // Verificar qué posts ya existen en Supabase
    const { data: existingPosts } = await supabase
      .from('blog_posts')
      .select('slug');

    const existingSlugs = new Set(existingPosts?.map(p => p.slug) || []);
    
    let migrated = 0;
    let skipped = 0;
    let errors = 0;

    for (const post of blogPosts) {
      // Generar slug si no existe
      const slug = post.slug || post.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Verificar si ya existe
      if (existingSlugs.has(slug)) {
        console.log(`⏭️  Saltando: "${post.title}" (ya existe)`);
        skipped++;
        continue;
      }

      // Preparar datos para Supabase
      const supabasePost = {
        title: post.title,
        slug: slug,
        excerpt: post.excerpt || post.description || '',
        content: post.content || '',
        category: post.category || 'General',
        tags: post.tags || [],
        image: post.image || '',
        author: post.author || 'KAINET',
        read_time: post.readTime || 5,
        published: post.published !== false,
        featured: post.featured || false,
        created_at: post.date || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Insertar en Supabase
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([supabasePost])
        .select()
        .single();

      if (error) {
        console.error(`❌ Error migrando "${post.title}":`, error.message);
        errors++;
      } else {
        console.log(`✅ Migrado: "${post.title}"`);
        migrated++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 Resumen de Migración:');
    console.log('='.repeat(60));
    console.log(`✅ Migrados: ${migrated}`);
    console.log(`⏭️  Saltados: ${skipped} (ya existían)`);
    console.log(`❌ Errores: ${errors}`);
    console.log('='.repeat(60) + '\n');

    if (migrated > 0) {
      console.log('🎉 Migración completada exitosamente!');
      console.log('\nVerifica en Supabase:');
      console.log('https://supabase.com/dashboard/project/tqdencmzezjevnntifos/editor\n');
    }

  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  }
}

// Ejecutar
migratePosts();
