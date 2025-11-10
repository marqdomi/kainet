#!/usr/bin/env node

/**
 * GENERADOR ESPECÍFICO: POST DE DEVOPS & HERRAMIENTAS
 * 
 * Genera solo posts sobre DevOps y herramientas:
 * - CI/CD, Kubernetes, Docker, Terraform
 * - GitHub Actions, GitLab CI, deployment automation
 * - Infrastructure as Code (IaC)
 */

import { 
  aggregateNews, 
  generateContentWithAI, 
  createPost, 
  saveToSupabase, 
  saveToLocalBlog,
  CONFIG 
} from './generate-weekly-post.js';

async function generateDevOpsPost() {
  const now = new Date();
  const weekNumber = Math.ceil((now.getDate() - now.getDay()) / 7);
  
  console.log('\n' + '='.repeat(60));
  console.log(`🔧 KAINET - DevOps & Herramientas`);
  console.log(`📅 Semana ${weekNumber} - ${now.toLocaleDateString('es-ES')}`);
  console.log('='.repeat(60));

  try {
    // Generar noticias de DevOps
    console.log('\n📰 Agregando noticias de DevOps y herramientas...');
    const devopsNews = await aggregateNews(
      'DevOps & Herramientas',
      CONFIG.categories.devops.keywords
    );

    if (devopsNews.length === 0) {
      console.warn('⚠️  No se encontraron noticias de DevOps');
      return;
    }

    console.log(`✅ Encontradas ${devopsNews.length} noticias relevantes`);

    // Generar contenido con IA
    console.log('\n🤖 Generando contenido con Gemini...');
    const devopsContent = await generateContentWithAI(
      devopsNews,
      CONFIG.categories.devops,
      weekNumber
    );

    // Crear post
    const devopsPost = await createPost(
      devopsContent,
      CONFIG.categories.devops,
      weekNumber
    );

    // Guardar SOLO en Supabase (única fuente de verdad)
    console.log('\n💾 Guardando post en Supabase...');
    await saveToSupabase(devopsPost);
    // await saveToLocalBlog(devopsPost); // DESHABILITADO: Supabase es la única fuente

    // Resumen
    console.log('\n' + '='.repeat(60));
    console.log(`✅ Post de DevOps & Herramientas creado exitosamente`);
    console.log(`📝 Título: "${devopsPost.title}"`);
    console.log(`📊 Slug: ${devopsPost.slug}`);
    console.log(`🏷️  Categoría: ${devopsPost.category}`);
    console.log(`💾 Guardado en: Supabase (única fuente de verdad)`);
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('❌ ERROR EN GENERACIÓN:', error);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  generateDevOpsPost();
}

export { generateDevOpsPost };