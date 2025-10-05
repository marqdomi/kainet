#!/usr/bin/env node

/**
 * GENERADOR MEJORADO DE POSTS - VERSION 3.0
 * Con Gemini API para análisis inteligente de contenido real
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Parser from 'rss-parser';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Utilidad: Delay para rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// [... mantener las mismas funciones de fetch y config ...]
// Por brevedad, aquí solo muestro la función de generación mejorada

/**
 * Genera contenido markdown con formato profesional
 * Diseño unificado con cards para todas las secciones
 */
async function generateMarkdownContent(news, weekNumber) {
  const year = new Date().getFullYear();
  
  // Separar por categorías para diversidad
  const hackerNews = news.filter(n => n.source.includes('Hacker News'));
  const rssArticles = news.filter(n => !n.source.includes('Hacker News') && !n.source.includes('Reddit') && n.source !== 'ArXiv');
  const topPapers = news.filter(n => n.source === 'ArXiv' && n.title.trim()).slice(0, 3);
  const topDiscussions = news.filter(n => n.source.includes('Reddit')).slice(0, 3);
  
  // Mix: 2 HN + 3 RSS para historia principal y noticias
  const mixedTopNews = [
    ...hackerNews.slice(0, 2),
    ...rssArticles.slice(0, 3)
  ].sort((a, b) => b.score - a.score).slice(0, 5);

  let md = '';
  
  // INTRO
  md += `**Semana ${weekNumber}, ${year}**\n\n`;
  md += `Análisis curado de tendencias en IA empresarial, automatización inteligente y MLOps. `;
  md += `Más allá del hype: lo que importa para equipos que construyen y operan sistemas de producción.\n\n`;

  // HISTORIA PRINCIPAL - Card destacada
  if (mixedTopNews.length > 0) {
    const main = mixedTopNews[0];
    md += `## Historia Principal\n\n`;
    md += `*La noticia que está marcando la semana en IA*\n\n`;
    md += `<div class="featured-card">\n\n`;
    md += `<h3 class="card-title">${main.title}</h3>\n\n`;
    md += await analyzeStory(main) + `\n\n`;
    md += `<div class="card-meta">\n`;
    md += `**Fuente:** ${main.source} • **Engagement:** ${main.score.toLocaleString()} puntos`;
    if (main.comments > 0) md += ` • ${main.comments} comentarios`;
    md += `\n</div>\n\n`;
    md += `[Leer artículo completo →](${main.url})\n\n`;
    md += `</div>\n\n`;
  }

  // OTRAS NOTICIAS - Grid de cards
  if (mixedTopNews.length > 1) {
    md += `## Otras Noticias Relevantes\n\n`;
    md += `*Más desarrollos importantes en el ecosistema de IA*\n\n`;
    md += `<div class="news-grid">\n\n`;
    
    for (const item of mixedTopNews.slice(1)) {
      md += `<div class="news-card">\n\n`;
      md += `<h3 class="card-title">${item.title}</h3>\n\n`;
      md += await analyzeStory(item) + `\n\n`;
      md += `<div class="card-meta">\n`;
      md += `**Fuente:** ${item.source}\n\n`;
      md += `${item.score.toLocaleString()} puntos`;
      if (item.comments > 0) md += ` • ${item.comments} comentarios`;
      md += `\n\n[Leer más →](${item.url})\n`;
      md += `</div>\n\n`;
      md += `</div>\n\n`;
      
      await delay(1000);
    }
    
    md += `</div>\n\n`;
  }

  // INVESTIGACIÓN - Cards compactas
  if (topPapers.length > 0) {
    md += `## Investigación Destacada\n\n`;
    md += `*Papers recientes de interés para equipos de ML/AI en producción*\n\n`;
    md += `<div class="papers-grid">\n\n`;
    
    topPapers.forEach((paper, i) => {
      md += `<div class="paper-card">\n\n`;
      md += `**${i + 1}. ${paper.title}**\n\n`;
      md += `${paper.summary || analyzePaper()}\n\n`;
      md += `[Ver paper →](${paper.url})\n\n`;
      md += `</div>\n\n`;
    });
    
    md += `</div>\n\n`;
  }

  // COMUNIDAD - Cards simples
  if (topDiscussions.length > 0) {
    md += `## Pulso de la Comunidad\n\n`;
    md += `*Conversaciones relevantes en comunidades técnicas*\n\n`;
    md += `<div class="community-grid">\n\n`;
    
    topDiscussions.forEach((disc, i) => {
      md += `<div class="community-card">\n\n`;
      md += `**${disc.title}**\n\n`;
      md += `*${disc.source}* — ${disc.score.toLocaleString()} votos • ${disc.comments} comentarios\n\n`;
      md += `[Ver discusión →](${disc.url})\n\n`;
      md += `</div>\n\n`;
    });
    
    md += `</div>\n\n`;
  }

  // PERSPECTIVA KAINET - Generada por Gemini
  md += `## Perspectiva KAINET\n\n`;
  md += `<div class="kainet-perspective">\n\n`;
  md += await generateKAINETPerspective(mixedTopNews, weekNumber);
  md += `\n\n</div>\n\n`;
  md += `---\n\n`;
  
  // FOOTER
  md += `<div class="post-footer">\n\n`;
  md += `**Fuentes:** ${news.length} artículos analizados • **Curado por:** KAINET AI Research\n\n`;
  md += `[Compartir feedback](/contact) • [Ver archivo completo](/blog)\n\n`;
  md += `</div>\n\n`;

  return md;
}

// ============================================
// WEB SCRAPING - Extraer contenido real
// ============================================

/**
 * Extrae el contenido principal de un artículo
 */
async function fetchArticleContent(url) {
  try {
    console.log(`   Leyendo: ${url.substring(0, 60)}...`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      timeout: 5000
    });
    
    if (!response.ok) return null;
    
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Intentar extraer contenido de diferentes estructuras
    let content = '';
    
    // 1. Article tag
    const article = document.querySelector('article');
    if (article) {
      content = article.textContent;
    }
    
    // 2. Main content div (común en blogs)
    if (!content) {
      const main = document.querySelector('main, .post-content, .article-content, .entry-content, .markdown-body');
      if (main) content = main.textContent;
    }
    
    // 3. Paragraphs en el body
    if (!content) {
      const paragraphs = Array.from(document.querySelectorAll('p'));
      content = paragraphs.map(p => p.textContent).join(' ');
    }
    
    // Limpiar y limitar
    content = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .trim()
      .substring(0, 3000); // Primeros 3000 caracteres
    
    return content || null;
    
  } catch (error) {
    console.log(`   No se pudo leer el artículo: ${error.message}`);
    return null;
  }
}

/**
 * Extrae frases clave que contengan keywords específicas
 */
function extractKeyPhrases(content, keywords) {
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
  
  const relevantSentences = sentences
    .filter(s => keywords.some(kw => s.toLowerCase().includes(kw)))
    .slice(0, 2)
    .map(s => s.trim())
    .join(' ');
  
  return relevantSentences.substring(0, 200) + (relevantSentences.length > 200 ? '...' : '');
}

/**
 * Extrae las primeras N oraciones
 */
function extractFirstSentences(content, n = 2) {
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
  return sentences.slice(0, n).join(' ').trim().substring(0, 250) + '...';
}

/**
 * Analiza artículo con Gemini API usando rol de Senior Editor
 */
async function analyzeWithGemini(title, url, content, score, comments) {
  try {
    console.log(`   Analizando con Gemini: "${title.substring(0, 50)}..."`);
    
    const prompt = `Eres un Senior AI Research & Automation Editor para KAINET, especializado en IA empresarial, automatización inteligente, MLOps/LLMOps, AIOps y observabilidad.

**MISIÓN:**
Analizar artículos técnicos y producir análisis directo, pragmático, con foco en impacto empresarial (ROI, riesgo, time-to-value). Evita hype; da "cómo implementarlo" y "riesgos/limitaciones".

**TONO KAINET (español neutro, técnico y claro):**
- Directo y específico, sin abstracciones genéricas
- Profesional pero conversacional
- Enfocado en valor práctico para arquitectos y líderes técnicos
- Sin emojis ni elementos visuales decorativos
- Evita frases marketeras o exageraciones

**ARTÍCULO:**
Título: ${title}
URL: ${url}
Engagement: ${score.toLocaleString()} puntos, ${comments} comentarios

**CONTENIDO:**
${content.substring(0, 4000)}

**TAREA:**
Produce un análisis de 2-3 párrafos (máximo 300 palabras) que:

1. **QUÉ ES** - Explica específicamente de qué trata (tecnología, metodología, lanzamiento, caso de uso)
2. **POR QUÉ IMPORTA** - Identifica el impacto práctico para empresas:
   - ¿Qué problema resuelve?
   - ¿Qué riesgo reduce o qué costo optimiza?
   - ¿Dónde está el ROI o time-to-value?
3. **CONSIDERACIONES** - Menciona limitaciones, gotchas o riesgos si son relevantes

**RESTRICCIONES:**
- NO inventes métricas ni afirmaciones no presentes en el contenido
- Si el contenido no provee datos concretos, di "no reportado" o "no especificado"
- Menciona el engagement (${score.toLocaleString()} puntos, ${comments} comentarios) de forma natural
- Usa negritas (**texto**) para resaltar puntos clave técnicos
- Sin emojis
- Sin HTML (solo markdown simple)

**FORMATO:**
Escribe en markdown plano, 2-3 párrafos.
- **IMPORTANTE:** Separa cada párrafo con una línea en blanco (doble salto de línea \n\n)
- Cada párrafo debe tener 3-5 oraciones
- Usa negritas para términos técnicos clave
- Sin títulos de sección (###)
- Cada párrafo debe estar separado por una línea en blanco (doble salto de línea)
- Sin títulos de sección (###)
- Usa negritas para términos técnicos clave
- Párrafos de 3-5 oraciones cada uno

ANÁLISIS:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();
    
    console.log(`   Análisis generado (${analysis.length} caracteres)`);
    
    return analysis;

  } catch (error) {
    console.log(`   Error con Gemini API: ${error.message}`);
    
    // Fallback: análisis básico con el contenido extraído
    return generateBasicAnalysis(title, content, score, comments);
  }
}

/**
 * Análisis básico como fallback (sin IA)
 */
function generateBasicAnalysis(title, content, score, comments) {
  const summary = extractFirstSentences(content || title, 2);
  
  return `${summary}\n\n` +
         `**${score.toLocaleString()} personas** están siguiendo esta noticia de cerca, ` +
         `y los **${comments} comentarios** ofrecen perspectivas adicionales y debate constructivo.\n\n` +
         `**Por qué importa:** El nivel de engagement sugiere que esto toca temas relevantes ` +
         `para quienes construyen con IA en el mundo real.`;
}

/**
 * Análisis contextual de historia principal (CON Gemini API)
 */
async function analyzeStory(story) {
  const { title, url, score, comments } = story;
  
  // 1. Intentar extraer el contenido real del artículo
  const content = await fetchArticleContent(url);
  
  if (!content || content.length < 100) {
    console.log(`   Contenido insuficiente, usando fallback básico`);
    return generateBasicAnalysis(title, title, score, comments);
  }
  
  // 2. Analizar con Gemini API
  const analysis = await analyzeWithGemini(title, url, content, score, comments);
  
  return analysis;
}

/**
 * Insights para noticias secundarias
 */
function analyzeNews(item) {
  const insights = [
    `Muestra cómo la IA permea industrias tradicionales. La atención recibida indica aplicaciones prácticas, no solo hype.`,
    `La comunidad está debatiendo activamente. Señal de que toca nervios importantes: privacidad, ética, o viabilidad técnica.`,
    `El timing importa. Lo que la comunidad amplifica dice mucho sobre dónde está el foco de innovación.`,
    `Revela tensiones del momento: entre capacidad técnica y aplicabilidad, entre promesas y entregas.`
  ];
  
  return insights[Math.floor(Math.random() * insights.length)];
}

/**
 * Insights para papers académicos
 */
function analyzePaper() {
  const insights = [
    `Investigación que podría influir en la próxima generación de herramientas. Los papers de hoy son los productos de mañana.`,
    `Desafía asunciones comunes. La academia es donde se cocinan disrupciones reales.`,
    `Podría hacer más eficientes sistemas actuales. Optimización es el próximo campo de batalla.`,
    `Explora territorio inexplorado. La investigación fundamental sigue siendo crítica.`
  ];
  
  return insights[Math.floor(Math.random() * insights.length)];
}

/**
 * Insights de comunidad
 */
function analyzeCommunity(disc) {
  if (disc.comments > 100) {
    return `Alto volumen de comentarios indica conversación profunda. Los debates community-driven revelan problemas que artículos académicos no capturan.`;
  }
  if (disc.score > 300) {
    return `Alto engagement muestra resonancia. Lo que practitioners discuten es tan importante como lo que publican labs.`;
  }
  return `Conversación que vale seguir. Forums especializados procesan ruido y emergen señal.`;
}

/**
 * Perspectiva KAINET - análisis editorial generado por Gemini
 */
async function generateKAINETPerspective(publishedArticles, weekNumber) {
  try {
    console.log('   Generando Perspectiva KAINET con Gemini...');
    
    // Crear resumen de artículos publicados
    const articlesSummary = publishedArticles
      .map((art, i) => `${i + 1}. ${art.title} (${art.source})`)
      .join('\n');
    
    const prompt = `Eres el Chief AI Strategy Officer de KAINET, escribiendo la perspectiva editorial semanal para el blog.

**KAINET es:** Consultora especializada en IA empresarial, automatización inteligente y MLOps. Construimos prototipos funcionales que demuestran ROI antes de inversiones mayores. No vendemos hype, vendemos resultados medibles.

**CONTEXTO - Semana ${weekNumber}, Artículos Publicados:**
${articlesSummary}

**TAREA:**
Escribe un análisis editorial de 4-5 párrafos (máximo 400 palabras) que:

1. **TENDENCIA PRINCIPAL:** Identifica el tema/patrón común entre los artículos (¿qué está dominando la conversación esta semana?)

2. **IMPLICACIONES EMPRESARIALES:** 
   - ¿Qué significa esto para CTOs, arquitectos y líderes técnicos?
   - ¿Dónde está el ROI real vs el hype?
   - ¿Qué riesgos/limitaciones no se están discutiendo?

3. **PERSPECTIVA KAINET:**
   - ¿Cómo traducimos estos avances a valor operativo?
   - ¿Qué gap existe entre "capacidad técnica" y "producción rentable"?
   - ¿Qué experiencia necesitan los equipos para implementar esto correctamente?

4. **LLAMADO A LA ACCIÓN:**
   - Un insight accionable para equipos técnicos
   - Enfoque pragmático, no visionario
   - "Cómo" sobre "qué"

**TONO:**
- Español neutro, profesional pero directo
- Confianza basada en experiencia, no arrogancia
- Pragmático: ROI, riesgo, time-to-value
- Sin emojis, sin exageraciones
- Usa negritas (**texto**) para puntos clave

**RESTRICCIONES:**
- NO inventes métricas ni casos de éxito
- NO generalices ("la IA transformará todo") - sé específico
- SÍ menciona trade-offs y limitaciones reales
- SÍ conecta con los artículos específicos publicados

**FORMATO:**
Markdown simple, 4-5 párrafos. Primera línea debe ser un statement claro sobre la tendencia de la semana.

PERSPECTIVA EDITORIAL:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const perspective = response.text();
    
    console.log(`   Perspectiva KAINET generada (${perspective.length} caracteres)`);
    
    return perspective;

  } catch (error) {
    console.log(`   Error generando perspectiva con Gemini: ${error.message}`);
    
    // Fallback estático
    return `La semana ${weekNumber} confirma que la IA empresarial está madurando hacia implementaciones de producción.

Desde KAINET observamos estos desarrollos como constructores, no espectadores. Cada avance técnico plantea la pregunta crítica: **¿cómo se traduce esto en valor medible para operaciones reales?**

**El gap entre "la IA puede hacer X" y "implementamos X rentablemente en producción" sigue siendo enorme.** Ese es nuestro territorio: convertir posibilidad técnica en realidad operativa con ROI demostrable.

La pregunta no es "si" adoptar IA, sino **cómo hacerlo de forma rentable y estratégica**. Eso requiere experiencia en arquitectura, integración y operación continua, no solo acceso a APIs.`;
  }
}

// ============================================
// AGREGACIÓN DE NOTICIAS
// ============================================

const CONFIG = {
  sources: {
    hackerNews: 'https://hacker-news.firebaseio.com/v0',
    reddit: 'https://www.reddit.com/r/artificial+MachineLearning+LocalLLaMA+MLOps+AutomateYourself.json',
    arxiv: 'http://export.arxiv.org/api/query',
    
    // Newsletters y curadores
    bensBites: 'https://www.bensbites.co/feed',
    tldrAI: 'https://tldr.tech/ai/feed',
    
    // Medios tecnológicos
    ventureBeatAI: 'https://venturebeat.com/category/ai/feed/',
    theVergeAI: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml',
    
    // Vendors AI Core
    openAIBlog: 'https://openai.com/blog/rss.xml',
    microsoftAI: 'https://blogs.microsoft.com/ai/feed/',
    googleAI: 'https://blog.google/technology/ai/rss/',
    awsML: 'https://aws.amazon.com/blogs/machine-learning/feed/',
    
    // MLOps / LLMOps
    databricks: 'https://www.databricks.com/blog/rss.xml',
    snowflake: 'https://www.snowflake.com/blog/rss/',
    nvidiaDev: 'https://developer.nvidia.com/blog/feed/',
    
    // Automatización empresarial (RPA / ITSM)
    uipath: 'https://www.uipath.com/blog/rss.xml',
    automationAnywhere: 'https://www.automationanywhere.com/rss/blog',
    serviceNow: 'https://www.servicenow.com/blogs/rss.xml',
    
    // AIOps / Observabilidad
    datadog: 'https://www.datadoghq.com/blog/rss.xml',
    dynatrace: 'https://www.dynatrace.com/news/blog/feed/',
    splunk: 'https://www.splunk.com/en_us/blog/rss/all.xml',
    
    // Automatización de redes
    ciscoBlog: 'https://blogs.cisco.com/networking/feed',
    juniperMist: 'https://www.juniper.net/us/en/blog/rss.xml',
  },
  keywords: [
    // Core AI/ML
    'ai', 'artificial intelligence', 'machine learning', 'deep learning',
    'llm', 'gpt', 'claude', 'gemini', 'neural network',
    
    // Enterprise AI
    'enterprise ai', 'ai adoption', 'ai strategy', 'ai governance',
    'responsible ai', 'ai ethics', 'ai compliance',
    
    // Automation & AIOps
    'automation', 'intelligent automation', 'agentic automation',
    'aiops', 'observability', 'monitoring', 'incident management',
    'self-healing', 'anomaly detection',
    
    // MLOps & LLMOps
    'mlops', 'llmops', 'ml engineering', 'model deployment',
    'model monitoring', 'feature store', 'ml pipeline',
    'mlflow', 'kubeflow', 'vertex ai',
    
    // RPA & ITSM
    'rpa', 'robotic process automation', 'itsm', 'servicenow',
    'workflow automation', 'process mining',
    
    // Network & Infrastructure
    'network automation', 'infrastructure as code', 'terraform',
    'ansible', 'kubernetes', 'devops', 'platform engineering',
    
    // Vendors & Platforms
    'openai', 'anthropic', 'google ai', 'microsoft ai', 'aws ai',
    'azure ai', 'databricks', 'datadog', 'splunk'
  ],
};

async function fetchHackerNews() {
  try {
    console.log('Obteniendo noticias de Hacker News...');
    const topRes = await fetch(`${CONFIG.sources.hackerNews}/topstories.json`);
    const topIds = await topRes.json();
    
    const stories = [];
    // Aumentar de 30 a 100 artículos para mejor cobertura
    for (let i = 0; i < Math.min(100, topIds.length); i++) {
      const itemRes = await fetch(`${CONFIG.sources.hackerNews}/item/${topIds[i]}.json`);
      const item = await itemRes.json();
      
      if (item && item.url && item.title) {
        const titleLower = item.title.toLowerCase();
        const isRelevant = CONFIG.keywords.some(kw => titleLower.includes(kw.toLowerCase()));
        
        // Bajar threshold de 100 a 50 para capturar más contenido relevante
        if (isRelevant && item.score > 50) {
          stories.push({
            title: item.title,
            url: item.url,
            score: item.score || 0,
            comments: item.descendants || 0,
            source: 'Hacker News',
            timestamp: item.time,
          });
        }
      }
    }
    
    console.log(`   ${stories.length} noticias relevantes encontradas`);
    // Retornar top 20 en lugar de 10
    return stories.sort((a, b) => b.score - a.score).slice(0, 20);
  } catch (error) {
    console.error(`   Error: ${error.message}`);
    return [];
  }
}

async function fetchReddit() {
  try {
    console.log('Obteniendo discusiones de Reddit...');
    const res = await fetch(CONFIG.sources.reddit, {
      headers: { 'User-Agent': 'KAINET-NewsBot/1.0' }
    });
    const data = await res.json();
    
    const posts = data.data.children
      .map(child => ({
        title: child.data.title,
        url: child.data.url,
        score: child.data.ups || 0,
        comments: child.data.num_comments || 0,
        source: `Reddit r/${child.data.subreddit}`,
        timestamp: child.data.created_utc,
      }))
      // Bajar threshold de 50 a 30 para más contenido
      .filter(p => p.score > 30)
      .sort((a, b) => b.score - a.score)
      // Aumentar de 5 a 10 posts
      .slice(0, 10);
    
    console.log(`   ${posts.length} discusiones relevantes encontradas`);
    return posts;
  } catch (error) {
    console.error(`   Error: ${error.message}`);
    return [];
  }
}

async function fetchArxiv() {
  try {
    console.log('Obteniendo papers de ArXiv...');
    const query = 'cat:cs.AI OR cat:cs.LG OR cat:cs.CL OR cat:cs.DC';
    const url = `${CONFIG.sources.arxiv}?search_query=${encodeURIComponent(query)}&max_results=10&sortBy=submittedDate&sortOrder=descending`;
    
    const res = await fetch(url);
    const xml = await res.text();
    
    const papers = [];
    const entries = xml.split('<entry>').slice(1);
    
    for (const entry of entries) {
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);
      const linkMatch = entry.match(/<id>(.*?)<\/id>/);
      const summaryMatch = entry.match(/<summary>(.*?)<\/summary>/);
      
      if (titleMatch && linkMatch) {
        papers.push({
          title: titleMatch[1].trim(),
          url: linkMatch[1].trim(),
          summary: summaryMatch ? summaryMatch[1].trim().substring(0, 200) : '',
          score: 0,
          comments: 0,
          source: 'ArXiv',
          timestamp: Math.floor(Date.now() / 1000),
        });
      }
    }
    
    console.log(`   ${papers.length} papers encontrados`);
    return papers;
  } catch (error) {
    console.error(`   Error: ${error.message}`);
    return [];
  }
}

/**
 * Fetch RSS feeds de fuentes profesionales
 */
async function fetchRSSFeeds() {
  const parser = new Parser({
    timeout: 10000,
    headers: {
      'User-Agent': 'KAINET-NewsBot/2.0 (AI Research)',
    },
  });

  const rssSources = [
    // Newsletters
    { name: "Ben's Bites", url: CONFIG.sources.bensBites },
    { name: 'TLDR AI', url: CONFIG.sources.tldrAI },
    
    // Medios tech
    { name: 'VentureBeat AI', url: CONFIG.sources.ventureBeatAI },
    { name: 'The Verge AI', url: CONFIG.sources.theVergeAI },
    
    // Vendors AI
    { name: 'OpenAI Blog', url: CONFIG.sources.openAIBlog },
    { name: 'Microsoft AI', url: CONFIG.sources.microsoftAI },
    { name: 'Google AI', url: CONFIG.sources.googleAI },
    { name: 'AWS ML Blog', url: CONFIG.sources.awsML },
    
    // MLOps
    { name: 'Databricks', url: CONFIG.sources.databricks },
    { name: 'Snowflake', url: CONFIG.sources.snowflake },
    { name: 'NVIDIA Dev', url: CONFIG.sources.nvidiaDev },
    
    // RPA/ITSM
    { name: 'UiPath', url: CONFIG.sources.uipath },
    { name: 'Automation Anywhere', url: CONFIG.sources.automationAnywhere },
    { name: 'ServiceNow', url: CONFIG.sources.serviceNow },
    
    // AIOps
    { name: 'Datadog', url: CONFIG.sources.datadog },
    { name: 'Dynatrace', url: CONFIG.sources.dynatrace },
    { name: 'Splunk', url: CONFIG.sources.splunk },
    
    // Network Automation
    { name: 'Cisco Networking', url: CONFIG.sources.ciscoBlog },
    { name: 'Juniper Mist AI', url: CONFIG.sources.juniperMist },
  ];

  console.log('Obteniendo artículos de RSS feeds profesionales...');
  
  const allArticles = [];
  const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);

  for (const source of rssSources) {
    try {
      console.log(`   Procesando: ${source.name}...`);
      const feed = await parser.parseURL(source.url);
      
      if (feed && feed.items) {
        const recentItems = feed.items
          .filter(item => {
            const pubDate = new Date(item.pubDate || item.isoDate);
            return pubDate.getTime() > sevenDaysAgo;
          })
          .slice(0, 5) // Top 5 por fuente
          .map(item => ({
            title: item.title,
            url: item.link,
            summary: item.contentSnippet || item.content?.substring(0, 200) || '',
            score: 100, // Score fijo para RSS (priorizados)
            comments: 0,
            source: source.name,
            timestamp: Math.floor(new Date(item.pubDate || item.isoDate).getTime() / 1000),
          }));
        
        allArticles.push(...recentItems);
        console.log(`      ${recentItems.length} artículos recientes`);
      }
    } catch (error) {
      console.log(`      Error en ${source.name}: ${error.message}`);
    }
    
    // Delay para no saturar servidores
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`   ${allArticles.length} artículos totales de RSS feeds`);
  return allArticles;
}

async function aggregateNews() {
  console.log('\nAgregando noticias...\n');
  
  const [hn, reddit, arxiv, rssArticles] = await Promise.all([
    fetchHackerNews(),
    fetchReddit(),
    fetchArxiv(),
    fetchRSSFeeds(),
  ]);
  
  // Combinar todas las fuentes y ordenar por score/timestamp
  const all = [...hn, ...reddit, ...arxiv, ...rssArticles]
    .sort((a, b) => {
      // Priorizar por score primero, luego por timestamp
      if (b.score !== a.score) return b.score - a.score;
      return b.timestamp - a.timestamp;
    });
  
  console.log(`\nTotal: ${all.length} noticias agregadas`);
  console.log(`   Hacker News: ${hn.length}`);
  console.log(`   Reddit: ${reddit.length}`);
  console.log(`   ArXiv: ${arxiv.length}`);
  console.log(`   RSS Feeds: ${rssArticles.length}\n`);
  
  return all;
}

// ============================================
// MAIN - Generar Post
// ============================================

async function main() {
  try {
    const weekNumber = Math.ceil((Date.now() - new Date(new Date().getFullYear(), 0, 1)) / 604800000);
    
    console.log(`\nGenerando post de IA Semanal (Semana ${weekNumber})`);
    console.log('━'.repeat(60));
    
    // 1. Agregar noticias
    const news = await aggregateNews();
    
    if (news.length === 0) {
      console.log('No se encontraron noticias. Abortando.\n');
      return;
    }
    
    // 2. Generar contenido markdown
    console.log('Generando contenido del post...');
    const content = await generateMarkdownContent(news, weekNumber);
    console.log('   Contenido generado\n');
    
    // 3. Crear objeto de post
    const post = {
      id: Date.now(),
      slug: `ia-semanal-semana-${weekNumber}-2025`,
      title: `IA Esta Semana: Análisis y Perspectivas (Semana ${weekNumber})`,
      excerpt: `Análisis curado de las noticias más importantes en inteligencia artificial. ` +
               `Más allá de los titulares, lo que realmente importa para quienes construyen con IA.`,
      author: 'KAINET AI Bot',
      date: new Date().toISOString().split('T')[0],
      readTime: '8 min',
      category: 'IA',
      image: `https://placehold.co/800x500/0a0a0a/00E5FF?text=IA+%26+MLOps`,
      featured: false,
      content: content,
    };
    
    // 4. Guardar en blogPosts.js
    console.log('Guardando en blogPosts.js...');
    const blogPostsPath = join(__dirname, '../../src/data/blogPosts.js');
    
    try {
      const currentData = await readFile(blogPostsPath, 'utf-8');
      
      // Extraer el header del archivo (comentarios antes del export)
      const headerMatch = currentData.match(/(\/\/.*?\n)*\/\*\*[\s\S]*?\*\/[\s\S]*?(?=export)/);
      const header = headerMatch ? headerMatch[0] : `// src/data/blogPosts.js\n\n`;
      
      // Extraer el array de posts existente
      const postsMatch = currentData.match(/export const blogPosts = (\[[\s\S]*?\]);/);
      
      if (postsMatch) {
        // Parsear posts existentes (con manejo cuidadoso de JSON)
        let postsStr = postsMatch[1]
          .replace(/'/g, '"')
          .replace(/(\w+):/g, '"$1":')
          .replace(/,(\s*[}\]])/g, '$1'); // remover trailing commas
        
        let posts;
        try {
          posts = JSON.parse(postsStr);
        } catch {
          // Si falla el parse, empezar con array vacío más post existente manual
          console.log('   No se pudo parsear posts existentes, creando nuevo array');
          posts = [];
        }
        
        // Agregar nuevo post al inicio
        posts.unshift(post);
        
        // Generar archivo completo con header y export
        const newContent = `${header}export const blogPosts = ${JSON.stringify(posts, null, 2)};\n`;
        
        await writeFile(blogPostsPath, newContent, 'utf-8');
        console.log('   Post guardado correctamente\n');
      } else {
        // Si no se encuentra el patrón, crear archivo nuevo
        const newContent = `${header}export const blogPosts = ${JSON.stringify([post], null, 2)};\n`;
        await writeFile(blogPostsPath, newContent, 'utf-8');
        console.log('   Archivo blogPosts.js creado con el nuevo post\n');
      }
    } catch (error) {
      console.log(`   No se pudo actualizar blogPosts.js: ${error.message}`);
      console.log('   Post generado (copia y pega manualmente):\n');
      console.log(JSON.stringify(post, null, 2));
    }
    
    console.log('━'.repeat(60));
    console.log('¡Proceso completado!\n');
    console.log('Próximos pasos:');
    console.log('  1. Instala jsdom: cd mcp-server/news-aggregator && npm install');
    console.log('  2. Ejecuta: npm run dev (en la raíz del proyecto)');
    console.log('  3. Abre: http://localhost:5173/blog\n');
    
  } catch (error) {
    console.error('\nError fatal:', error);
    process.exit(1);
  }
}

// Ejecutar si es el script principal
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

// Exportar para uso en otros scripts
export {
  generateMarkdownContent,
  analyzeStory,
  analyzeNews,
  analyzePaper,
  analyzeCommunity,
  generateKAINETPerspective,
  aggregateNews,
  fetchArticleContent
};
