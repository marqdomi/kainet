#!/usr/bin/env node

/**
 * GENERADOR DE IMÁGENES PARA BLOG POSTS
 * 
 * Genera imágenes automáticamente usando Google Gemini (AI Studio)
 * para los posts del blog con estilo futurista/cyberpunk
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar Google AI (Gemini)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

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
 * Generar imagen SVG dinámica con Gemini
 */
async function generateImage(prompt, filename, category) {
  console.log(`🎨 Generando imagen SVG: ${filename}`);
  console.log(`📝 Prompt: ${prompt.substring(0, 100)}...`);
  
  try {
    // Usar Gemini para generar código SVG
    const svgPrompt = `
Genera código SVG para una imagen de blog con estas especificaciones:

TEMA: ${prompt}

REQUISITOS TÉCNICOS:
- Dimensiones: 1792x1024 (aspect ratio 16:10)
- Estilo: Cyberpunk futurista, minimalista
- Colores: Fondo negro/gris oscuro (#0a0a0a, #111111)
- Acentos: Cian neón (#00E5FF), Púrpura (#5227FF)
- Sin texto visible en la imagen

ELEMENTOS VISUALES:
- Formas geométricas abstractas
- Líneas de circuito o conexiones
- Gradientes sutiles
- Efectos de brillo/glow
- Composición equilibrada

RESPONDE SOLO CON EL CÓDIGO SVG COMPLETO, sin explicaciones adicionales.
    `;
    
    const result = await model.generateContent(svgPrompt);
    const response = await result.response;
    let svgCode = response.text();
    
    // Limpiar el código SVG (remover markdown si existe)
    svgCode = svgCode.replace(/```svg\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Asegurar que tenga las dimensiones correctas
    if (!svgCode.includes('width="1792"') || !svgCode.includes('height="1024"')) {
      svgCode = svgCode.replace(/<svg[^>]*>/, '<svg width="1792" height="1024" viewBox="0 0 1792 1024" xmlns="http://www.w3.org/2000/svg">');
    }
    
    // Crear data URL del SVG
    const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgCode)}`;
    
    console.log(`✅ Imagen SVG generada con Gemini`);
    
    return svgDataUrl;
    
  } catch (error) {
    console.error(`❌ Error generando imagen con Gemini:`, error.message);
    
    // Fallback a SVG predefinido por categoría
    const fallbackSvg = generateFallbackSVG(category, filename);
    console.log(`🔄 Usando SVG fallback para categoría: ${category}`);
    
    return fallbackSvg;
  }
}

/**
 * Generar SVG fallback por categoría
 */
function generateFallbackSVG(category, filename) {
  const styles = {
    'Automatización': {
      bg: '#0a0a0a',
      primary: '#00E5FF',
      secondary: '#5227FF',
      elements: `
        <circle cx="300" cy="200" r="80" fill="none" stroke="#00E5FF" stroke-width="3" opacity="0.6"/>
        <circle cx="1400" cy="800" r="120" fill="none" stroke="#5227FF" stroke-width="2" opacity="0.4"/>
        <path d="M200 400 Q600 300 1000 500 T1600 600" stroke="#00E5FF" stroke-width="2" fill="none" opacity="0.5"/>
        <rect x="100" y="100" width="60" height="60" fill="#5227FF" opacity="0.3" rx="8"/>
        <rect x="1500" y="700" width="80" height="80" fill="#00E5FF" opacity="0.2" rx="12"/>
      `
    },
    'DevOps': {
      bg: '#0a0a0a',
      primary: '#00E5FF',
      secondary: '#5227FF',
      elements: `
        <rect x="200" y="300" width="200" height="100" fill="none" stroke="#00E5FF" stroke-width="2" opacity="0.6" rx="8"/>
        <rect x="1200" y="500" width="300" height="150" fill="none" stroke="#5227FF" stroke-width="2" opacity="0.4" rx="12"/>
        <line x1="100" y1="200" x2="1600" y2="800" stroke="#00E5FF" stroke-width="1" opacity="0.3"/>
        <circle cx="800" cy="400" r="50" fill="#5227FF" opacity="0.2"/>
        <polygon points="1400,200 1500,300 1400,400 1300,300" fill="#00E5FF" opacity="0.3"/>
      `
    },
    'IA': {
      bg: '#0a0a0a',
      primary: '#00E5FF',
      secondary: '#5227FF',
      elements: `
        <circle cx="896" cy="512" r="200" fill="none" stroke="#5227FF" stroke-width="2" opacity="0.4"/>
        <circle cx="896" cy="512" r="100" fill="none" stroke="#00E5FF" stroke-width="3" opacity="0.6"/>
        <path d="M400 200 Q896 400 1400 200" stroke="#00E5FF" stroke-width="2" fill="none" opacity="0.5"/>
        <path d="M400 800 Q896 600 1400 800" stroke="#5227FF" stroke-width="2" fill="none" opacity="0.4"/>
        <circle cx="400" cy="200" r="20" fill="#00E5FF" opacity="0.8"/>
        <circle cx="1400" cy="200" r="20" fill="#5227FF" opacity="0.8"/>
      `
    }
  };
  
  const style = styles[category] || styles['IA'];
  
  const svg = `
    <svg width="1792" height="1024" viewBox="0 0 1792 1024" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${style.bg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#111111;stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <g filter="url(#glow)">
        ${style.elements}
      </g>
    </svg>
  `;
  
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Guardar SVG localmente (opcional)
 */
async function saveSVGLocally(svgDataUrl, filename) {
  try {
    // Extraer el código SVG del data URL
    const svgCode = decodeURIComponent(svgDataUrl.replace('data:image/svg+xml;utf8,', ''));
    
    // Crear directorio si no existe
    const imagesDir = path.join(__dirname, '../../public/images/blog');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    // Guardar SVG
    const svgPath = path.join(imagesDir, `${filename}.svg`);
    fs.writeFileSync(svgPath, svgCode, 'utf8');
    
    console.log(`💾 SVG guardado: ${svgPath}`);
    return `/images/blog/${filename}.svg`;
    
  } catch (error) {
    console.error(`❌ Error guardando SVG:`, error.message);
    return svgDataUrl; // Retornar data URL original si falla
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
  
  // Generar imagen SVG con Gemini
  const imageUrl = await generateImage(prompt, slug, category);
  
  // Opcionalmente guardar SVG localmente
  let finalImageUrl = imageUrl;
  if (saveLocally && imageUrl.startsWith('data:image/svg+xml')) {
    finalImageUrl = await saveSVGLocally(imageUrl, slug);
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