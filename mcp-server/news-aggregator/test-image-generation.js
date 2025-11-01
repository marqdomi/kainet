#!/usr/bin/env node

/**
 * Script de prueba para la generación de imágenes
 */

import { generateBlogImage, generateImagePrompt } from './generate-blog-images.js';
import dotenv from 'dotenv';

dotenv.config();

async function testImageGeneration() {
  console.log('🧪 Probando generación de imágenes para blog con Gemini...\n');
  
  // Verificar API key
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'TU_NUEVA_API_KEY_AQUI') {
    console.log('⚠️  GEMINI_API_KEY no configurada');
    console.log('📋 Para configurar:');
    console.log('   1. Ve a: https://aistudio.google.com/app/apikeys');
    console.log('   2. Usa tu API key existente (ya la tienes configurada)');
    console.log('   3. Verifica que esté en .env');
    return;
  }
  
  console.log('✅ GEMINI_API_KEY configurada (usando Google AI Studio)');
  
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
  console.log('🖼️  Generando imagen SVG con Gemini...');
  try {
    const postWithImage = await generateBlogImage(testPost, true);
    
    console.log('\n✅ ¡Imagen SVG generada exitosamente!');
    console.log(`🔗 URL: ${postWithImage.image.substring(0, 100)}...`);
    console.log('\n📋 Post completo:');
    console.log(JSON.stringify({
      ...postWithImage,
      image: postWithImage.image.substring(0, 100) + '...[SVG truncado]'
    }, null, 2));
    
    console.log('\n🎯 Próximos pasos:');
    console.log('   1. Verifica que la imagen SVG se vea bien en el navegador');
    console.log('   2. Ajusta los prompts si es necesario');
    console.log('   3. ¡Las imágenes se generarán automáticamente con tu API key existente!');
    console.log('   4. Sin costos adicionales - usa tu Gemini API key gratuita');
    
  } catch (error) {
    console.error('\n❌ Error generando imagen:', error.message);
    
    if (error.message.includes('API_KEY_INVALID')) {
      console.log('\n🔑 Problema con API key:');
      console.log('   - Verifica que la GEMINI_API_KEY sea correcta');
      console.log('   - Ve a: https://aistudio.google.com/app/apikeys');
    } else if (error.message.includes('quota')) {
      console.log('\n📊 Problema de cuota:');
      console.log('   - Verifica tu uso en Google AI Studio');
      console.log('   - El tier gratuito tiene límites diarios');
    }
  }
}

testImageGeneration().catch(console.error);