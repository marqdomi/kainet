#!/usr/bin/env node

/**
 * GENERADOR DE POSTS ESTRATÉGICOS - KAINET Blog
 * 
 * Genera contenido de alto valor alineado con la filosofía de KAINET:
 * - Tutoriales prácticos de IA/LLMs
 * - Guías de automatización con IaC
 * - Architecture deep-dives de proyectos reales
 * 
 * NO genera resúmenes genéricos de noticias semanales
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// ===== CONFIGURACIÓN =====

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Configuración de reintentos
const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 2000,
  maxDelay: 30000,
  backoffMultiplier: 2
};

const MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-1.5-flash'];

// ===== TEMAS DE CONTENIDO =====

const CONTENT_THEMES = {
  'ia-practica': {
    title: 'IA Práctica y LLMs',
    category: 'IA',
    format: 'Tutorial hands-on',
    tone: 'Educativo, práctico, paso a paso',
    topics: [
      'Construir agente RAG con Azure AI Foundry y LangChain',
      'Integrar OpenAI Assistants API en aplicación React',
      'Fine-tuning de modelos GPT para casos empresariales',
      'Sistema Multi-Agente con LangGraph y OpenAI',
      'Implementar búsqueda semántica con embeddings',
      'Optimizar costos en aplicaciones LLM (caching, streaming)',
      'Debug y monitoring de Agentes LLM en producción',
      'Patrones de prompting avanzados: Chain-of-Thought, ReAct',
      'Vector Database: Pinecone vs ChromaDB vs Qdrant',
      'Construir chatbot con memoria usando Supabase + OpenAI'
    ],
    structure: [
      'Problema real que resuelve',
      'Prerequisitos y setup inicial',
      'Implementación paso a paso con código',
      'Testing y troubleshooting',
      'Deploy a producción',
      'Next steps y recursos'
    ],
    keywords: ['RAG', 'LangChain', 'OpenAI', 'Azure AI', 'Agents', 'LLM', 'embeddings'],
    readTime: 10
  },
  
  'automatizacion-iac': {
    title: 'Automatización con IaC',
    category: 'Automatización',
    format: 'Guía práctica',
    tone: 'Técnico, orientado a resultados',
    topics: [
      'Terraform + GitHub Actions para deploy automático en Azure',
      'Ansible para backup automático de configuraciones de red',
      'CI/CD para infraestructura: GitOps con ArgoCD',
      'Docker Compose para ambientes de desarrollo locales',
      'Monitoring con Prometheus + Grafana en 30 minutos',
      'Automatizar certificados SSL con Let\'s Encrypt + Nginx',
      'Infrastructure testing con Terratest',
      'Secrets management: Azure Key Vault + Terraform',
      'NetDevOps: Automatizar Cisco/Juniper con Python + Netmiko',
      'Kubernetes local con k3d para development'
    ],
    structure: [
      'Problema / proceso manual actual',
      'Solución propuesta con IaC',
      'Configuración y código paso a paso',
      'Validación y testing',
      'Resultados y métricas de mejora',
      'Mantenimiento y mejoras futuras'
    ],
    keywords: ['Terraform', 'Ansible', 'Docker', 'CI/CD', 'NetDevOps', 'IaC', 'Azure'],
    readTime: 8
  },
  
  'full-stack': {
    title: 'Full-Stack Moderno',
    category: 'Desarrollo',
    format: 'Architecture deep-dive',
    tone: 'Profesional, con fundamentos',
    topics: [
      'Arquitectura de KAINET.mx: React Router + Supabase + Vercel',
      'API REST escalable con FastAPI: De MVP a producción',
      'React Server Components vs Client Components: Guía práctica',
      'Autenticación moderna con Supabase Auth + RLS',
      'Optimización de Core Web Vitals en React',
      'Real-time features con Supabase Realtime',
      'Arquitectura de microservicios con FastAPI + Docker',
      'State management en 2026: Zustand vs Context vs Tanstack Query',
      'Deploy estratégico: Vercel Edge Functions + Supabase',
      'Testing strategy: Vitest + React Testing Library + Playwright'
    ],
    structure: [
      'Contexto del proyecto / decisión arquitectónica',
      'Alternativas evaluadas',
      'Solución implementada (con diagramas)',
      'Trade-offs y lecciones aprendidas',
      'Código de ejemplo funcionando',
      'Recursos y referencias'
    ],
    keywords: ['React', 'FastAPI', 'Next.js', 'Supabase', 'Architecture', 'Performance', 'Vercel'],
    readTime: 9
  }
};

// ===== FUNCIONES DE REINTENTOS =====

async function retryWithBackoff(fn, retryCount = 0) {
  try {
    return await fn();
  } catch (error) {
    const isRetryableError = error.status === 503 || error.status === 429;
    const canRetry = retryCount < RETRY_CONFIG.maxRetries;
    
    if (isRetryableError && canRetry) {
      const delay = Math.min(
        RETRY_CONFIG.baseDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, retryCount),
        RETRY_CONFIG.maxDelay
      );
      
      console.log(`⏳ Reintento ${retryCount + 1}/${RETRY_CONFIG.maxRetries} en ${delay/1000}s...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      return retryWithBackoff(fn, retryCount + 1);
    }
    
    throw error;
  }
}

async function tryMultipleModels(fn) {
  for (let i = 0; i < MODELS.length; i++) {
    try {
      const modelInstance = genAI.getGenerativeModel({ model: MODELS[i] });
      console.log(`🔄 Usando modelo: ${MODELS[i]}`);
      return await fn(modelInstance);
    } catch (error) {
      console.log(`❌ ${MODELS[i]} falló:`, error.message);
      
      if (i === MODELS.length - 1) {
        throw error;
      }
      
      console.log(`🔁 Intentando con siguiente modelo...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

// ===== GENERACIÓN DE CONTENIDO =====

async function generatePost(theme, topicIndex = null) {
  const config = CONTENT_THEMES[theme];
  
  if (!config) {
    throw new Error(`Tema desconocido: ${theme}`);
  }
  
  // Seleccionar topic aleatorio o específico
  const topic = topicIndex !== null 
    ? config.topics[topicIndex]
    : config.topics[Math.floor(Math.random() * config.topics.length)];
  
  console.log(`\n🎯 Generando: "${topic}"`);
  console.log(`📚 Tema: ${config.title}`);
  console.log(`🎨 Formato: ${config.format}\n`);
  
  const prompt = `Eres un ingeniero senior de KAINET especializado en ${config.title}.

Escribe un blog post completo sobre: "${topic}"

FORMATO: Solo responde con JSON válido (sin markdown, sin code blocks):
{
  "title": "Título atractivo y SEO-friendly",
  "excerpt": "Descripción breve de 120-150 caracteres",
  "content": "<p>Contenido completo en HTML</p>",
  "readTime": ${config.readTime}
}

ESTRUCTURA REQUERIDA:
${config.structure.map((s, i) => `${i + 1}. ${s}`).join('\n')}

DIRECTRICES:
- Contenido 100% original (NO copies de documentación)
- Incluye bloques de código funcionales con syntax highlighting hints
- Usa ejemplos reales y prácticos
- Explica el "por qué", no solo el "cómo"
- Incluye sección de troubleshooting con errores comunes
- Links a documentación oficial cuando sea relevante
- Admite limitaciones y trade-offs
- Tono: ${config.tone}
- Longitud: 2000-2500 palabras
- HTML: usa <h2>, <h3>, <p>, <ul>, <li>, <strong>, <code>, <pre>
- Escapa comillas en JSON con backslash

KEYWORDS A INCLUIR: ${config.keywords.join(', ')}

IMPORTANTE: 
- El contenido debe ser educativo y ACCIONABLE
- Incluye comandos/código que el lector pueda ejecutar
- Formato HTML limpio y válido
- JSON parseable con JSON.parse()`;

  try {
    const result = await retryWithBackoff(async () => {
      return await tryMultipleModels(async (modelInstance) => {
        return await modelInstance.generateContent(prompt);
      });
    });
    
    const response = await result.response;
    let text = response.text();
    
    // Limpiar respuesta
    text = text.replace(/```[\s\S]*?```/g, '');
    text = text.replace(/^```(json)?\n?/m, '');
    text = text.replace(/\n?```$/m, '');
    text = text.trim();
    
    // Extraer JSON
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('No se pudo encontrar JSON en la respuesta');
    }
    
    const jsonString = text.substring(jsonStart, jsonEnd + 1);
    const postData = JSON.parse(jsonString);
    
    // Validar campos requeridos
    if (!postData.title || !postData.excerpt || !postData.content) {
      throw new Error('JSON incompleto - faltan campos requeridos');
    }
    
    // Agregar metadata
    postData.category = config.category;
    postData.topic = topic;
    postData.theme = theme;
    
    return postData;
    
  } catch (error) {
    console.error('❌ Error generando contenido:', error.message);
    throw error;
  }
}

// ===== GUARDAR EN SUPABASE =====

async function saveToSupabase(postData) {
  console.log('\n💾 Guardando en Supabase...');
  
  const now = new Date().toISOString();
  const slug = postData.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  const post = {
    title: postData.title,
    slug: slug,
    excerpt: postData.excerpt,
    content: postData.content,
    category: postData.category,
    author: 'Marco Domínguez',
    read_time: `${postData.readTime} min`,
    date: now.split('T')[0], // Solo la fecha YYYY-MM-DD
    image: `/images/blog/${slug}.jpg`,
    featured: false
  };
  
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([post])
    .select();
  
  if (error) {
    console.error('❌ Error guardando en Supabase:', error.message);
    throw error;
  }
  
  console.log('✅ Post guardado exitosamente');
  console.log(`📝 Título: ${post.title}`);
  console.log(`🔗 Slug: ${post.slug}`);
  console.log(`📂 Categoría: ${post.category}\n`);
  
  return data[0];
}

// ===== EJECUCIÓN PRINCIPAL =====

async function main() {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║  🚀 KAINET - Generador de Posts Estratégicos  ║');
  console.log('╚════════════════════════════════════════════╝\n');
  
  // Obtener tema desde argumentos o seleccionar aleatorio
  const themes = Object.keys(CONTENT_THEMES);
  const themeArg = process.argv[2];
  const theme = themes.includes(themeArg) 
    ? themeArg 
    : themes[Math.floor(Math.random() * themes.length)];
  
  console.log(`🎲 Tema seleccionado: ${theme}\n`);
  
  try {
    // Generar contenido
    const postData = await generatePost(theme);
    
    // Guardar en Supabase
    await saveToSupabase(postData);
    
    console.log('🎉 ¡Post generado y publicado exitosamente!\n');
    process.exit(0);
    
  } catch (error) {
    console.error('\n💥 Error fatal:', error.message);
    process.exit(1);
  }
}

main();
