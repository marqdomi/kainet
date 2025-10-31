#!/usr/bin/env node

/**
 * GENERADOR DE IMÁGENES PARA BLOG POSTS
 * 
 * Genera imágenes automáticamente usando OpenAI DALL-E 3
 * para los posts del blog con estilo futurista/cyberpunk
 */

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configuración de estilos por categoría
const IMAGE_STYLES = {
  'Automatización': {
    basePrompt: 'Futuristic business automation concept, cyberpunk style, dark background with neon blue and purple accents',
    keywords: ['robotic arms', 'workflow diagrams', 'digital interfaces', 'automation symbols', 'corporate tech'],
    colors: '#00E5FF, #5227FF, dark blue, neon cyan'
  },
  'DevOps': {
    basePrompt: 'Modern DevOps and cloud infrastructure, cyberpunk aesthetic, dark tech environment',
    keywords: ['server racks', 'code pipelines', 'cloud symbols', 'deployment flows', 'terminal interfaces'],
    colors: '#00E5FF, #5227FF, electric blue, neon green'
  },
  'IA': {
    basePrompt: 'Artificial Intelligence and machine learning, futuristic cyberpunk style, neural networks',
    keywords: ['neural networks', 'AI brain', 'data flows', 'machine learning', 'digital consciousness'],
    colors: '#00E5FF, #5227FF, neon purple, electric cyan'
  }
};

/**
 * Generar prompt optimizado para DALL-E 3
 */
function generateImagePrompt(title, category, content) {
  const style = IMAGE_STYLES[category] || IMAGE_STYLES['IA'];
  
  // Extraer conceptos clave del título y contenido
  const titleWords = title.toLowerCase().split(' ').filter(word => word.length > 3);
  const contentKeywords = extractKeywords(content);
  
  // Combinar keywords específicas de la categoría
  const relevantKeywords = style.keywords.slice(0, 2).join(', ');
  
  const prompt = `
${style.basePrompt}, featuring ${relevantKeywords}.
Theme: ${titleWords.slice(0, 3).join(' ')}.
Style: Minimalist cyberpunk design, clean composition, professional tech aesthetic.
Colors: ${style.colors}.
Lighting: Dramatic neon lighting, dark background with glowing elements.
Composition: Wide aspect ratio (16:10), suitable for blog header.
Quality: High-tech, modern, visually striking but not overwhelming.
No text or typography in the image.
  `.trim();
  
  return prompt;
}

/**
 * Extraer keywords relevantes del contenido
 */
function extractKeywords(content) {
  const techKeywords = [
    'kubernetes', 'docker', 'ci/cd', 'automation', 'ai', 'machine learning',
    'devops', 'cloud', 'terraform', 'ansible', 'github actions', 'pipeline',
    'rpa', 'workflow', 'zapier', 'make', 'n8n', 'integration'
  ];
  
  const contentLower = content.toLowerCase();
  return techKeywords.filter(keyword => contentLower.includes(keyword));
}

/**
 * Generar imagen con DALL-E 3
 */
async function generateImage(prompt, filename) {
  console.log(`🎨 Generando imagen: ${filename}`);
  console.log(`📝 Prompt: ${prompt.substring(0, 100)}...`);
  
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1792x1024", // Aspect ratio 16:10, perfecto para blog headers
      quality: "standard", // o "hd" para mayor calidad
      style: "vivid" // o "natural" para estilo más realista
    });
    
    const imageUrl = response.data[0].url;
    console.log(`✅ Imagen generada: ${imageUrl}`);
    
    return imageUrl;
    
  } catch (error) {
    console.error(`❌ Error generando imagen:`, error.message);
    
    // Fallback a placeholder personalizado
    const fallbackUrl = `https://placehold.co/1792x1024/0a0a0a/00E5FF?text=${encodeURIComponent(filename)}`;
    console.log(`🔄 Usando fallback: ${fallbackUrl}`);
    
    return fallbackUrl;
  }
}

/**
 * Descargar imagen y guardarla localmente (opcional)
 */
async function downloadImage(imageUrl, filename) {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    
    // Crear directorio si no existe
    const imagesDir = path.join(__dirname, '../../public/images/blog');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    // Guardar imagen
    const imagePath = path.join(imagesDir, `${filename}.png`);
    fs.writeFileSync(imagePath, Buffer.from(buffer));
    
    console.log(`💾 Imagen guardada: ${imagePath}`);
    return `/images/blog/${filename}.png`;
    
  } catch (error) {
    console.error(`❌ Error descargando imagen:`, error.message);
    return imageUrl; // Retornar URL original si falla la descarga
  }
}

/**
 * Generar imagen para un post específico
 */
async function generateBlogImage(post, saveLocally = false) {
  const { title, category, content, slug } = post;
  
  console.log(`\n🖼️  Generando imagen para: "${title}"`);
  
  // Generar prompt optimizado
  const prompt = generateImagePrompt(title, category, content);
  
  // Generar imagen con DALL-E
  const imageUrl = await generateImage(prompt, slug);
  
  // Opcionalmente descargar y guardar localmente
  let finalImageUrl = imageUrl;
  if (saveLocally && imageUrl.includes('oaidalleapiprodscus')) {
    finalImageUrl = await downloadImage(imageUrl, slug);
  }
  
  return {
    ...post,
    image: finalImageUrl,
    imagePrompt: prompt // Guardar prompt para referencia
  };
}

/**
 * Función principal para generar imágenes de múltiples posts
 */
async function generateImagesForPosts(posts, saveLocally = false) {
  console.log(`🎨 Generando imágenes para ${posts.length} posts...\n`);
  
  const postsWithImages = [];
  
  for (const post of posts) {
    try {
      const postWithImage = await generateBlogImage(post, saveLocally);
      postsWithImages.push(postWithImage);
      
      // Pausa entre generaciones para no saturar la API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ Error procesando post "${post.title}":`, error.message);
      
      // Agregar post sin imagen en caso de error
      postsWithImages.push({
        ...post,
        image: `https://placehold.co/1792x1024/0a0a0a/00E5FF?text=${encodeURIComponent(post.title.substring(0, 20))}`
      });
    }
  }
  
  console.log(`\n✅ Generación completada: ${postsWithImages.length} posts procesados`);
  return postsWithImages;
}

// Exportar funciones
export { 
  generateBlogImage, 
  generateImagesForPosts, 
  generateImagePrompt 
};

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('🎨 Generador de imágenes para blog - Modo de prueba');
  console.log('Para usar este módulo, impórtalo en tus scripts de generación de posts.');
}