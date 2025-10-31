#!/usr/bin/env node

/**
 * Script de prueba para la generación de imágenes
 */

import { generateBlogImage, generateImagePrompt } from './generate-blog-images.js';
import dotenv from 'dotenv';

dotenv.config();

async function testImageGeneration() {
  console.log('🧪 Probando generación de imágenes para blog...\n');
  
  // Verificar API key
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key-here') {
    console.log('⚠️  OPENAI_API_KEY no configurada');
    console.log('📋 Para configurar:');
    console.log('   1. Ve a: https://platform.openai.com/api-keys');
    console.log('   2. Crea una nueva API key');
    console.log('   3. Actualiza OPENAI_API_KEY en .env');
    console.log('   4. También agrégala a GitHub Secrets para producción');
    return;
  }
  
  console.log('✅ OPENAI_API_KEY configurada');
  
  // Post de prueba
  const testPost = {
    title: 'Automatización Empresarial con IA: El Futuro del Trabajo',
    category: 'Automatización',
    content: 'La automatización empresarial está revolucionando la forma en que trabajamos. Con herramientas como RPA, Zapier y Make, las empresas pueden automatizar procesos complejos y mejorar su productividad. En este artículo exploramos las últimas tendencias en automatización y cómo implementarlas en tu organización.',
    slug: 'automatizacion-empresarial-ia-futuro-trabajo'
  };
  
  console.log(`📝 Post de prueba: "${testPost.title}"`);
  console.log(`🏷️  Categoría: ${testPost.category}`);
  
  // Generar prompt
  console.log('\n🎨 Generando prompt para DALL-E...');
  const prompt = generateImagePrompt(testPost.title, testPost.category, testPost.content);
  console.log(`📝 Prompt generado:\n${prompt}\n`);
  
  // Generar imagen
  console.log('🖼️  Generando imagen con DALL-E 3...');
  try {
    const postWithImage = await generateBlogImage(testPost, false);
    
    console.log('\n✅ ¡Imagen generada exitosamente!');
    console.log(`🔗 URL: ${postWithImage.image}`);
    console.log('\n📋 Post completo:');
    console.log(JSON.stringify(postWithImage, null, 2));
    
    console.log('\n🎯 Próximos pasos:');
    console.log('   1. Verifica que la imagen se vea bien en el navegador');
    console.log('   2. Ajusta los prompts si es necesario');
    console.log('   3. Agrega OPENAI_API_KEY a GitHub Secrets');
    console.log('   4. ¡Las imágenes se generarán automáticamente en producción!');
    
  } catch (error) {
    console.error('\n❌ Error generando imagen:', error.message);
    
    if (error.message.includes('insufficient_quota')) {
      console.log('\n💳 Problema de cuota:');
      console.log('   - Verifica que tengas créditos en tu cuenta OpenAI');
      console.log('   - Ve a: https://platform.openai.com/usage');
    } else if (error.message.includes('invalid_api_key')) {
      console.log('\n🔑 Problema con API key:');
      console.log('   - Verifica que la API key sea correcta');
      console.log('   - Asegúrate de que tenga permisos para DALL-E');
    }
  }
}

testImageGeneration().catch(console.error);