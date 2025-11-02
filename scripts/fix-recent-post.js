#!/usr/bin/env node

/**
 * Script para arreglar el post reciente y guardarlo en Supabase
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Leer variables de entorno manualmente
const envContent = readFileSync('.env', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  if (line.includes('=') && !line.startsWith('#')) {
    const [key, value] = line.split('=');
    envVars[key.trim()] = value.trim();
  }
});

const supabase = createClient(
  envVars.VITE_SUPABASE_URL,
  envVars.VITE_SUPABASE_ANON_KEY
);

// Leer blogPosts manualmente
const blogPostsContent = readFileSync('src/data/blogPosts.js', 'utf8');
const blogPostsMatch = blogPostsContent.match(/export default (\[[\s\S]*\]);/);
const blogPosts = JSON.parse(blogPostsMatch[1]);

async function fixRecentPost() {
  console.log('🔧 Arreglando post reciente...\n');
  
  // Obtener el post más reciente (el primero en el array)
  const recentPost = blogPosts[0];
  
  console.log(`📝 Post original: "${recentPost.title}"`);
  console.log(`📏 Longitud del título: ${recentPost.title.length} caracteres`);
  
  // Acortar el título si es muy largo
  let fixedTitle = recentPost.title;
  if (fixedTitle.length > 100) {
    fixedTitle = "Ciberseguridad y IA Declarativa: El Doble Filo de la Innovación Digital";
  }
  
  // Crear post arreglado
  const fixedPost = {
    ...recentPost,
    title: fixedTitle,
    slug: "ciberseguridad-ia-declarativa-doble-filo-innovacion-digital-semana-0"
  };
  
  console.log(`✅ Título arreglado: "${fixedPost.title}"`);
  console.log(`📏 Nueva longitud: ${fixedPost.title.length} caracteres`);
  
  // Intentar guardar en Supabase
  try {
    console.log('\n💾 Guardando en Supabase...');
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        slug: fixedPost.slug,
        title: fixedPost.title,
        excerpt: fixedPost.excerpt,
        content: fixedPost.content,
        category: fixedPost.category,
        author: fixedPost.author,
        date: fixedPost.date,
        read_time: fixedPost.readTime,
        image: fixedPost.image,
        featured: fixedPost.featured || false
      })
      .select();
    
    if (error) {
      console.error('❌ Error guardando en Supabase:', error.message);
      return false;
    }
    
    console.log('✅ Post guardado exitosamente en Supabase');
    console.log(`🆔 ID asignado: ${data[0].id}`);
    
    return true;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

async function testSupabaseConnection() {
  console.log('🔍 Probando conexión a Supabase...\n');
  
  console.log(`📡 URL: ${envVars.VITE_SUPABASE_URL}`);
  console.log(`🔑 Anon Key: ${envVars.VITE_SUPABASE_ANON_KEY ? 'Configurada' : 'NO configurada'}`);
  
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Error conectando:', error.message);
      return false;
    }
    
    console.log('✅ Conexión a Supabase exitosa');
    return true;
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Iniciando reparación de post...\n');
  
  // Probar conexión
  const connected = await testSupabaseConnection();
  if (!connected) {
    console.log('\n❌ No se puede conectar a Supabase. Verifica las variables de entorno.');
    return;
  }
  
  // Arreglar post
  const success = await fixRecentPost();
  
  if (success) {
    console.log('\n🎉 ¡Post arreglado y guardado exitosamente!');
    console.log('📋 Próximos pasos:');
    console.log('   1. Recarga la página web (localhost:3000/blog)');
    console.log('   2. El post debería aparecer ahora con la imagen generada');
    console.log('   3. Verifica que la imagen SVG se muestre correctamente');
  } else {
    console.log('\n❌ No se pudo arreglar el post. Revisa los errores arriba.');
  }
}

main().catch(console.error);