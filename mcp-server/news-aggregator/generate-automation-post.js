#!/usr/bin/env node

/**
 * GENERADOR ESPECÍFICO: POST DE AUTOMATIZACIÓN EMPRESARIAL
 * 
 * Genera solo posts sobre automatización empresarial:
 * - RPA, workflow automation, business process
 * - Herramientas como Zapier, Make, n8n
 * - Casos de uso empresariales
 */

import { 
  aggregateNews, 
  generateContentWithAI, 
  createPost, 
  saveToSupabase, 
  saveToLocalBlog,
  CONFIG 
} from './generate-weekly-post.js';

async function generateAutomationPost() {
  const now = new Date();
  const weekNumber = Math.ceil((now.getDate() - now.getDay()) / 7);
  
  console.log('\n' + '='.repeat(60));
  console.log(`🏢 KAINET - Automatización Empresarial`);
  console.log(`📅 Semana ${weekNumber} - ${now.toLocaleDateString('es-ES')}`);
  console.log('='.repeat(60));

  try {
    // Generar noticias de automatización empresarial
    console.log('\n📰 Agregando noticias de automatización empresarial...');
    const automationNews = await aggregateNews(
      'Automatización Empresarial',
      CONFIG.categories.automation.keywords
    );

    if (automationNews.length === 0) {
      console.warn('⚠️  No se encontraron noticias de automatización empresarial');
      return;
    }

    console.log(`✅ Encontradas ${automationNews.length} noticias relevantes`);

    // Generar contenido con IA
    console.log('\n🤖 Generando contenido con Gemini...');
    const automationContent = await generateContentWithAI(
      automationNews,
      CONFIG.categories.automation,
      weekNumber
    );

    // Crear post
    const automationPost = createPost(
      automationContent,
      CONFIG.categories.automation,
      weekNumber
    );

    // Guardar en Supabase y archivo local
    console.log('\n💾 Guardando post...');
    await saveToSupabase(automationPost);
    await saveToLocalBlog(automationPost);

    // Resumen
    console.log('\n' + '='.repeat(60));
    console.log(`✅ Post de Automatización Empresarial creado exitosamente`);
    console.log(`📝 Título: "${automationPost.title}"`);
    console.log(`📊 Slug: ${automationPost.slug}`);
    console.log(`🏷️  Categoría: ${automationPost.category}`);
    console.log(`💾 Guardado en: Supabase + blogPosts.js`);
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('❌ ERROR EN GENERACIÓN:', error);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAutomationPost();
}

export { generateAutomationPost };