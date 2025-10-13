// scripts/migrate-posts-to-supabase.js
// Script para migrar posts existentes de blogPosts.js a Supabase

import { createClient } from '@supabase/supabase-js';
import { blogPosts } from '../src/data/blogPosts.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Cliente de Supabase con service_role key (permisos completos)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // ⚠️ Solo usar en backend
);

async function migratePosts() {
  console.log('\n🔄 Iniciando migración de posts a Supabase...\n');
  console.log(`📊 Total de posts a migrar: ${blogPosts.length}\n`);

  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  for (const post of blogPosts) {
    try {
      // Insertar post en Supabase
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          author: post.author,
          date: post.date,
          read_time: post.readTime,
          category: post.category,
          image: post.image,
          featured: post.featured,
          content: post.content,
        }])
        .select();

      if (error) {
        // Si ya existe (duplicate), intentar actualizar
        if (error.code === '23505') {
          console.log(`   ⚠️  Post "${post.title}" ya existe, actualizando...`);
          
          const { error: updateError } = await supabase
            .from('blog_posts')
            .update({
              title: post.title,
              excerpt: post.excerpt,
              content: post.content,
              image: post.image,
              featured: post.featured,
            })
            .eq('id', post.id);

          if (updateError) {
            throw updateError;
          }
          console.log(`   ✅ Actualizado: ${post.title}`);
        } else {
          throw error;
        }
      } else {
        console.log(`   ✅ Migrado: ${post.title}`);
      }

      successCount++;
    } catch (err) {
      errorCount++;
      errors.push({ post: post.title, error: err.message });
      console.log(`   ❌ Error en "${post.title}": ${err.message}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN DE MIGRACIÓN');
  console.log('='.repeat(60));
  console.log(`✅ Exitosos: ${successCount}/${blogPosts.length}`);
  console.log(`❌ Errores: ${errorCount}/${blogPosts.length}`);
  
  if (errors.length > 0) {
    console.log('\n⚠️  Detalles de errores:');
    errors.forEach(({ post, error }) => {
      console.log(`   - ${post}: ${error}`);
    });
  }

  console.log('\n✨ Migración completada!\n');
}

// Ejecutar migración
migratePosts().catch(console.error);
