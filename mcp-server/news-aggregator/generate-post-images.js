#!/usr/bin/env node

/**
 * GENERADOR DE IMÁGENES SVG PARA BLOG POSTS v2
 * 
 * Genera imágenes SVG estilizadas para los posts del blog de KAINET
 * con estilo cyberpunk futurista y minimalista.
 * 
 * Uso:
 *   node generate-post-images.js                 # Generar para posts sin imagen
 *   node generate-post-images.js --all           # Regenerar todas las imágenes
 *   node generate-post-images.js --slug=mi-post  # Generar para un post específico
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

// Directorio de imágenes
const IMAGES_DIR = path.join(__dirname, '../../public/images/blog');

// ============================================
// PLANTILLAS SVG POR CATEGORÍA
// ============================================

function generateIAPracticaSVG(title, seed) {
  return `<svg width="1792" height="1024" viewBox="0 0 1792 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a"/>
      <stop offset="50%" style="stop-color:#0d1117"/>
      <stop offset="100%" style="stop-color:#0a0a0a"/>
    </linearGradient>
    <filter id="glow${seed}">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="softGlow${seed}">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Fondo -->
  <rect width="100%" height="100%" fill="url(#bgGrad${seed})"/>
  
  <!-- Grid de fondo sutil -->
  <g opacity="0.08">
    <pattern id="grid${seed}" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00E5FF" stroke-width="0.5"/>
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid${seed})"/>
  </g>
  
  <!-- Cerebro IA central (círculos concéntricos) -->
  <g filter="url(#glow${seed})" transform="translate(896, 512)">
    <circle r="280" fill="none" stroke="#5227FF" stroke-width="1" opacity="0.2"/>
    <circle r="220" fill="none" stroke="#00E5FF" stroke-width="2" opacity="0.3"/>
    <circle r="160" fill="none" stroke="#5227FF" stroke-width="2" opacity="0.4"/>
    <circle r="100" fill="none" stroke="#00E5FF" stroke-width="3" opacity="0.6"/>
    <circle r="40" fill="#5227FF" opacity="0.3"/>
    <circle r="20" fill="#00E5FF" opacity="0.8"/>
  </g>
  
  <!-- Conexiones neuronales -->
  <g filter="url(#softGlow${seed})" opacity="0.6">
    <line x1="896" y1="392" x2="1250" y2="250" stroke="#00E5FF" stroke-width="2"/>
    <circle cx="1250" cy="250" r="8" fill="#00E5FF"/>
    
    <line x1="1016" y1="512" x2="1400" y2="450" stroke="#00E5FF" stroke-width="2"/>
    <circle cx="1400" cy="450" r="8" fill="#00E5FF"/>
    
    <line x1="896" y1="632" x2="1300" y2="800" stroke="#00E5FF" stroke-width="2"/>
    <circle cx="1300" cy="800" r="8" fill="#00E5FF"/>
    
    <line x1="776" y1="512" x2="400" y2="350" stroke="#5227FF" stroke-width="2"/>
    <circle cx="400" cy="350" r="8" fill="#5227FF"/>
    
    <line x1="896" y1="392" x2="550" y2="200" stroke="#5227FF" stroke-width="2"/>
    <circle cx="550" cy="200" r="8" fill="#5227FF"/>
    
    <line x1="896" y1="632" x2="500" y2="750" stroke="#5227FF" stroke-width="2"/>
    <circle cx="500" cy="750" r="8" fill="#5227FF"/>
  </g>
  
  <!-- Partículas flotantes -->
  <g filter="url(#glow${seed})">
    <circle cx="150" cy="200" r="3" fill="#00E5FF" opacity="0.5"/>
    <circle cx="300" cy="150" r="2" fill="#5227FF" opacity="0.4"/>
    <circle cx="200" cy="400" r="4" fill="#00E5FF" opacity="0.3"/>
    <circle cx="100" cy="600" r="3" fill="#5227FF" opacity="0.5"/>
    <circle cx="250" cy="800" r="2" fill="#00E5FF" opacity="0.4"/>
    <circle cx="1600" cy="180" r="3" fill="#5227FF" opacity="0.5"/>
    <circle cx="1500" cy="300" r="4" fill="#00E5FF" opacity="0.3"/>
    <circle cx="1650" cy="500" r="2" fill="#5227FF" opacity="0.4"/>
    <circle cx="1550" cy="700" r="3" fill="#00E5FF" opacity="0.5"/>
    <circle cx="1680" cy="850" r="4" fill="#5227FF" opacity="0.3"/>
  </g>
  
  <!-- Decoración esquinas -->
  <g opacity="0.4">
    <path d="M50 50 L150 50 L150 60 L60 60 L60 150 L50 150 Z" fill="#00E5FF"/>
    <path d="M1742 50 L1642 50 L1642 60 L1732 60 L1732 150 L1742 150 Z" fill="#5227FF"/>
    <path d="M50 974 L150 974 L150 964 L60 964 L60 874 L50 874 Z" fill="#5227FF"/>
    <path d="M1742 974 L1642 974 L1642 964 L1732 964 L1732 874 L1742 874 Z" fill="#00E5FF"/>
  </g>
</svg>`;
}

function generateAutomatizacionSVG(title, seed) {
  return `<svg width="1792" height="1024" viewBox="0 0 1792 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a"/>
      <stop offset="50%" style="stop-color:#0d1520"/>
      <stop offset="100%" style="stop-color:#0a0a0a"/>
    </linearGradient>
    <filter id="glow${seed}">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Fondo -->
  <rect width="100%" height="100%" fill="url(#bgGrad${seed})"/>
  
  <!-- Pipeline de CI/CD -->
  <g filter="url(#glow${seed})">
    <!-- Línea principal del pipeline -->
    <path d="M100 512 Q400 512 500 350 T900 400 T1300 550 T1692 512" 
          stroke="#00E5FF" stroke-width="4" fill="none" opacity="0.6"
          stroke-dasharray="10,5"/>
    
    <!-- Nodos del pipeline -->
    <g>
      <rect x="180" y="470" width="80" height="80" rx="10" fill="#0a0a0a" stroke="#00E5FF" stroke-width="2"/>
      <rect x="420" y="310" width="80" height="80" rx="10" fill="#0a0a0a" stroke="#00FF88" stroke-width="2"/>
      <rect x="700" y="360" width="80" height="80" rx="10" fill="#0a0a0a" stroke="#00E5FF" stroke-width="2"/>
      <rect x="1000" y="510" width="80" height="80" rx="10" fill="#0a0a0a" stroke="#5227FF" stroke-width="2"/>
      <rect x="1300" y="510" width="80" height="80" rx="10" fill="#0a0a0a" stroke="#00FF88" stroke-width="2"/>
    </g>
    
    <!-- Iconos dentro de los nodos -->
    <g opacity="0.8">
      <!-- Git icon -->
      <circle cx="220" cy="510" r="20" fill="none" stroke="#00E5FF" stroke-width="2"/>
      <circle cx="220" cy="510" r="8" fill="#00E5FF"/>
      
      <!-- Build icon (hammer) -->
      <polygon points="460,330 475,350 445,350" fill="#00FF88"/>
      <rect x="455" y="350" width="10" height="25" fill="#00FF88"/>
      
      <!-- Test icon (checkmark) -->
      <circle cx="740" cy="400" r="22" fill="none" stroke="#00E5FF" stroke-width="2"/>
      <path d="M728 400 L736 410 L758 388" stroke="#00E5FF" stroke-width="3" fill="none"/>
      
      <!-- Deploy icon (rocket) -->
      <path d="M1040,530 L1040,570 L1060,550 Z" fill="#5227FF"/>
      <circle cx="1040" cy="565" r="3" fill="#FF6B35"/>
      
      <!-- Cloud icon -->
      <path d="M1325,545 Q1325,530 1340,530 Q1355,520 1370,530 Q1385,530 1385,545 Q1385,560 1355,560 Q1325,560 1325,545 Z" 
            fill="none" stroke="#00FF88" stroke-width="2"/>
    </g>
  </g>
  
  <!-- Flechas de conexión -->
  <g fill="#00E5FF" opacity="0.6">
    <polygon points="265,510 275,505 275,515"/>
    <polygon points="505,350 515,345 515,355"/>
    <polygon points="785,400 795,395 795,405"/>
    <polygon points="1085,550 1095,545 1095,555"/>
  </g>
  
  <!-- Código flotante decorativo -->
  <g opacity="0.15" font-family="monospace" font-size="14" fill="#00E5FF">
    <text x="100" y="180">$ terraform apply</text>
    <text x="1450" y="150">$ docker build .</text>
    <text x="150" y="850">$ git push origin main</text>
    <text x="1350" y="880">$ kubectl apply -f</text>
  </g>
  
  <!-- Partículas -->
  <g filter="url(#glow${seed})">
    <circle cx="300" cy="200" r="2" fill="#00FF88" opacity="0.4"/>
    <circle cx="600" cy="150" r="3" fill="#00E5FF" opacity="0.3"/>
    <circle cx="900" cy="180" r="2" fill="#5227FF" opacity="0.4"/>
    <circle cx="1200" cy="200" r="3" fill="#00FF88" opacity="0.3"/>
    <circle cx="1500" cy="250" r="2" fill="#00E5FF" opacity="0.4"/>
    <circle cx="200" cy="700" r="3" fill="#5227FF" opacity="0.3"/>
    <circle cx="500" cy="750" r="2" fill="#00E5FF" opacity="0.4"/>
    <circle cx="800" cy="700" r="3" fill="#00FF88" opacity="0.3"/>
    <circle cx="1100" cy="750" r="2" fill="#5227FF" opacity="0.4"/>
    <circle cx="1600" cy="700" r="3" fill="#00E5FF" opacity="0.3"/>
  </g>
  
  <!-- Borde decorativo -->
  <rect x="30" y="30" width="1732" height="964" fill="none" stroke="#00E5FF" stroke-width="1" opacity="0.15" rx="20"/>
</svg>`;
}

function generateFullStackSVG(title, seed) {
  return `<svg width="1792" height="1024" viewBox="0 0 1792 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a"/>
      <stop offset="100%" style="stop-color:#111827"/>
    </linearGradient>
    <filter id="glow${seed}">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Fondo -->
  <rect width="100%" height="100%" fill="url(#bgGrad${seed})"/>
  
  <!-- Stack layers -->
  <g filter="url(#glow${seed})">
    <!-- Frontend Layer -->
    <g transform="translate(350, 130)">
      <rect width="420" height="180" rx="15" fill="#0a0a0a" stroke="#00E5FF" stroke-width="3"/>
      <text x="210" y="70" text-anchor="middle" fill="#00E5FF" font-family="system-ui" font-size="32" font-weight="bold">FRONTEND</text>
      <g transform="translate(60, 100)" fill="#00E5FF" opacity="0.5">
        <rect x="0" y="0" width="60" height="40" rx="6" fill="none" stroke="#00E5FF" stroke-width="2"/>
        <rect x="80" y="0" width="60" height="40" rx="6" fill="none" stroke="#00E5FF" stroke-width="2"/>
        <rect x="160" y="0" width="60" height="40" rx="6" fill="none" stroke="#00E5FF" stroke-width="2"/>
        <rect x="240" y="0" width="60" height="40" rx="6" fill="none" stroke="#00E5FF" stroke-width="2"/>
      </g>
      <text x="90" y="125" fill="#00E5FF" font-family="monospace" font-size="11" opacity="0.7">React</text>
      <text x="170" y="125" fill="#00E5FF" font-family="monospace" font-size="11" opacity="0.7">Vue</text>
      <text x="243" y="125" fill="#00E5FF" font-family="monospace" font-size="11" opacity="0.7">Next</text>
      <text x="323" y="125" fill="#00E5FF" font-family="monospace" font-size="11" opacity="0.7">Vite</text>
    </g>
    
    <!-- API Layer -->
    <g transform="translate(686, 400)">
      <rect width="420" height="180" rx="15" fill="#0a0a0a" stroke="#5227FF" stroke-width="3"/>
      <text x="210" y="70" text-anchor="middle" fill="#5227FF" font-family="system-ui" font-size="32" font-weight="bold">API</text>
      <g transform="translate(100, 90)" opacity="0.6">
        <path d="M0 30 L40 0 L80 30 L40 60 Z" fill="none" stroke="#5227FF" stroke-width="2"/>
        <path d="M120 30 L160 0 L200 30 L160 60 Z" fill="none" stroke="#5227FF" stroke-width="2"/>
      </g>
      <text x="145" y="145" fill="#5227FF" font-family="monospace" font-size="11" opacity="0.7">REST</text>
      <text x="260" y="145" fill="#5227FF" font-family="monospace" font-size="11" opacity="0.7">GraphQL</text>
    </g>
    
    <!-- Backend/Database Layer -->
    <g transform="translate(1022, 680)">
      <rect width="420" height="180" rx="15" fill="#0a0a0a" stroke="#FF6B35" stroke-width="3"/>
      <text x="210" y="70" text-anchor="middle" fill="#FF6B35" font-family="system-ui" font-size="32" font-weight="bold">DATABASE</text>
      <g transform="translate(130, 85)" fill="none" stroke="#FF6B35" stroke-width="2" opacity="0.6">
        <ellipse cx="80" cy="15" rx="70" ry="20"/>
        <path d="M10 15 L10 55"/>
        <path d="M150 15 L150 55"/>
        <ellipse cx="80" cy="55" rx="70" ry="20"/>
      </g>
    </g>
    
    <!-- Conexiones entre capas -->
    <g stroke-width="3" fill="none" opacity="0.4">
      <path d="M560 310 C620 350 660 380 686 490" stroke="url(#connGrad1${seed})"/>
      <path d="M1106 580 C1120 620 1130 650 1142 680" stroke="url(#connGrad2${seed})"/>
    </g>
    
    <defs>
      <linearGradient id="connGrad1${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#00E5FF"/>
        <stop offset="100%" style="stop-color:#5227FF"/>
      </linearGradient>
      <linearGradient id="connGrad2${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#5227FF"/>
        <stop offset="100%" style="stop-color:#FF6B35"/>
      </linearGradient>
    </defs>
    
    <!-- Flechas -->
    <g opacity="0.6">
      <polygon points="686,490 676,480 696,480" fill="#5227FF"/>
      <polygon points="1142,680 1132,670 1152,670" fill="#FF6B35"/>
    </g>
  </g>
  
  <!-- Código decorativo -->
  <g opacity="0.12" font-family="monospace" font-size="12" fill="#00E5FF">
    <text x="80" y="100">{"{ react: ^18 }"}</text>
    <text x="80" y="120">{"{ typescript: ^5 }"}</text>
    <text x="1550" y="380">async/await</text>
    <text x="1550" y="400">fetch()</text>
    <text x="80" y="920">SELECT * FROM</text>
    <text x="80" y="940">users WHERE</text>
  </g>
  
  <!-- Partículas flotantes -->
  <g filter="url(#glow${seed})">
    <circle cx="200" cy="500" r="3" fill="#00E5FF" opacity="0.4"/>
    <circle cx="1600" cy="300" r="4" fill="#5227FF" opacity="0.3"/>
    <circle cx="300" cy="700" r="3" fill="#FF6B35" opacity="0.4"/>
    <circle cx="1500" cy="800" r="4" fill="#00E5FF" opacity="0.3"/>
    <circle cx="150" cy="300" r="3" fill="#5227FF" opacity="0.4"/>
    <circle cx="1650" cy="600" r="4" fill="#FF6B35" opacity="0.3"/>
  </g>
</svg>`;
}

// Mapeo de categorías a generadores
const SVG_GENERATORS = {
  'ia-practica': generateIAPracticaSVG,
  'automatizacion-iac': generateAutomatizacionSVG,
  'full-stack': generateFullStackSVG,
  // Aliases
  'IA': generateIAPracticaSVG,
  'Automatización': generateAutomatizacionSVG,
  'DevOps': generateAutomatizacionSVG,
  'Full-Stack': generateFullStackSVG,
  'Desarrollo': generateFullStackSVG
};

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

/**
 * Generar SVG para un post
 */
function generateSVGForPost(post) {
  const { title, category, slug } = post;
  const seed = slug.replace(/-/g, '').substring(0, 8);
  
  // Obtener el generador adecuado
  const generator = SVG_GENERATORS[category] || generateIAPracticaSVG;
  
  return generator(title, seed);
}

/**
 * Guardar SVG en disco
 */
function saveSVG(slug, svgContent) {
  // Crear directorio si no existe
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    console.log(`📁 Directorio creado: ${IMAGES_DIR}`);
  }
  
  const filePath = path.join(IMAGES_DIR, `${slug}.svg`);
  fs.writeFileSync(filePath, svgContent, 'utf8');
  
  console.log(`💾 SVG guardado: ${filePath}`);
  return `/images/blog/${slug}.svg`;
}

/**
 * Actualizar post en Supabase con la URL de la imagen
 */
async function updatePostImage(slug, imageUrl) {
  const { error } = await supabase
    .from('blog_posts')
    .update({ image: imageUrl })
    .eq('slug', slug);
  
  if (error) {
    throw new Error(`Error actualizando post ${slug}: ${error.message}`);
  }
  
  console.log(`✅ Post actualizado en Supabase: ${slug}`);
}

/**
 * Obtener posts de Supabase
 */
async function getPosts(options = {}) {
  let query = supabase
    .from('blog_posts')
    .select('id, slug, title, category, image')
    .order('date', { ascending: false });
  
  if (options.slug) {
    query = query.eq('slug', options.slug);
  }
  
  if (!options.all && !options.slug) {
    // Solo posts sin imagen o con placeholder
    query = query.or('image.is.null,image.like.%placehold%');
  }
  
  const { data, error } = await query;
  
  if (error) {
    throw new Error(`Error obteniendo posts: ${error.message}`);
  }
  
  return data;
}

/**
 * Generar imágenes para posts
 */
async function generateImages(options = {}) {
  console.log('\n🎨 GENERADOR DE IMÁGENES SVG PARA BLOG - KAINET\n');
  console.log('='.repeat(50));
  
  try {
    // Obtener posts
    const posts = await getPosts(options);
    
    if (posts.length === 0) {
      console.log('✨ Todos los posts ya tienen imágenes.');
      return;
    }
    
    console.log(`📝 Posts a procesar: ${posts.length}\n`);
    
    for (const post of posts) {
      console.log(`\n🖼️  Procesando: "${post.title}"`);
      console.log(`   Categoría: ${post.category}`);
      
      // Generar SVG
      const svgContent = generateSVGForPost(post);
      
      // Guardar en disco
      const imageUrl = saveSVG(post.slug, svgContent);
      
      // Actualizar en Supabase
      await updatePostImage(post.slug, imageUrl);
    }
    
    console.log('\n' + '='.repeat(50));
    console.log(`✅ Proceso completado: ${posts.length} imágenes generadas`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// ============================================
// CLI
// ============================================

const args = process.argv.slice(2);
const options = {
  all: args.includes('--all'),
  slug: args.find(a => a.startsWith('--slug='))?.split('=')[1]
};

generateImages(options);
