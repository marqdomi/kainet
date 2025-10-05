// generate-automation-post.js
// Generador especializado para categoría AUTOMATIZACIÓN/HERRAMIENTAS
// Enfoque: DevOps, Coding Tools, Cloud Platforms, Enterprise Automation

import fetch from 'node-fetch';
import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

// ============================================
// CONFIGURACIÓN
// ============================================

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
const parser = new Parser({
  timeout: 15000,
  headers: { 'User-Agent': 'KAINET-AutomationBot/1.0' }
});

const CONFIG = {
  sources: {
    // AI/Cloud Platforms
    openai: { url: 'https://openai.com/blog/rss.xml', name: 'OpenAI Blog', priority: 'critical' },
    googleAI: { url: 'https://ai.googleblog.com/feeds/posts/default', name: 'Google AI Blog', priority: 'high' },
    googleCloudAI: { url: 'https://cloud.google.com/feeds/blog/topics/ai-machine-learning.xml', name: 'Google Cloud AI', priority: 'high' },
    awsML: { url: 'https://aws.amazon.com/blogs/machine-learning/feed/', name: 'AWS Machine Learning', priority: 'high' },
    
    // Hardware & Accelerators
    nvidiaDev: { url: 'https://developer.nvidia.com/blog/feed', name: 'NVIDIA Developer', priority: 'critical' },
    
    // Dev & Automation Tools
    githubChangelog: { url: 'https://github.blog/changelog/feed/', name: 'GitHub Changelog', priority: 'critical' },
    vscode: { url: 'https://code.visualstudio.com/feed.xml', name: 'VS Code Updates', priority: 'high' },
    docker: { url: 'https://www.docker.com/blog/feed/', name: 'Docker Blog', priority: 'medium' },
    hashicorp: { url: 'https://www.hashicorp.com/blog/feed', name: 'HashiCorp Blog', priority: 'medium' },
    kubernetes: { url: 'https://kubernetes.io/feed.xml', name: 'Kubernetes Blog', priority: 'medium' },
    airflow: { url: 'https://airflow.apache.org/blog/feed.xml', name: 'Apache Airflow', priority: 'low' },
    
    // Enterprise Automation
    servicenow: { url: 'https://www.servicenow.com/blogs.rss', name: 'ServiceNow Blog', priority: 'medium' },
    uipath: { url: 'https://www.uipath.com/blog/rss.xml', name: 'UiPath Blog', priority: 'medium' },
    
    // Communities & Indie AI
    huggingface: { url: 'https://huggingface.co/blog/feed', name: 'HuggingFace Blog', priority: 'high' },
  },
  
  keywords: [
    // DevOps & Infrastructure
    'devops', 'ci/cd', 'continuous integration', 'continuous deployment',
    'infrastructure as code', 'terraform', 'ansible', 'pulumi',
    'kubernetes', 'docker', 'containers', 'microservices',
    
    // Cloud Platforms
    'aws', 'azure', 'google cloud', 'gcp', 'cloud native',
    'serverless', 'lambda', 'cloud functions', 'azure functions',
    
    // Automation Tools
    'automation', 'workflow', 'orchestration', 'airflow', 'prefect',
    'rpa', 'robotic process automation', 'uipath', 'automation anywhere',
    
    // Developer Tools
    'github', 'gitlab', 'vscode', 'visual studio code', 'copilot',
    'code editor', 'ide', 'developer tools', 'productivity',
    
    // AI/ML Tools
    'langchain', 'llm', 'gpt', 'claude', 'gemini', 'huggingface',
    'machine learning', 'mlops', 'model deployment',
    
    // Monitoring & Observability
    'monitoring', 'observability', 'prometheus', 'grafana',
    'datadog', 'new relic', 'splunk', 'logging',
  ],
  
  dedupeWindowDays: 7,
  maxItemsPerSource: 20,
};

// ============================================
// UTILIDADES
// ============================================

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function getWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  return Math.ceil(diff / 604800000); // 7 días en ms
}

// ============================================
// FETCHING RSS FEEDS
// ============================================

async function fetchRSSFeeds() {
  console.log('Obteniendo artículos de feeds RSS...');
  
  const sevenDaysAgo = Date.now() - (CONFIG.dedupeWindowDays * 24 * 60 * 60 * 1000);
  const allArticles = [];
  
  for (const [sourceId, source] of Object.entries(CONFIG.sources)) {
    try {
      console.log(`   Procesando: ${source.name}...`);
      
      const feed = await parser.parseURL(source.url);
      
      if (feed && feed.items) {
        const recentItems = feed.items
          .filter(item => {
            const pubDate = new Date(item.pubDate || item.isoDate);
            const titleLower = (item.title || '').toLowerCase();
            const contentLower = (item.contentSnippet || item.content || '').toLowerCase();
            
            // Filtrar por keywords relevantes
            const isRelevant = CONFIG.keywords.some(kw => 
              titleLower.includes(kw.toLowerCase()) || 
              contentLower.includes(kw.toLowerCase())
            );
            
            return pubDate.getTime() > sevenDaysAgo && isRelevant;
          })
          .slice(0, CONFIG.maxItemsPerSource)
          .map(item => ({
            title: item.title,
            url: item.link,
            summary: item.contentSnippet || item.content?.substring(0, 300) || '',
            score: source.priority === 'critical' ? 200 : source.priority === 'high' ? 150 : 100,
            comments: 0,
            source: source.name,
            priority: source.priority,
            timestamp: Math.floor(new Date(item.pubDate || item.isoDate).getTime() / 1000),
          }));
        
        allArticles.push(...recentItems);
        console.log(`      ${recentItems.length} artículos relevantes`);
      }
    } catch (error) {
      console.log(`      Error en ${source.name}: ${error.message}`);
    }
    
    await delay(500); // No saturar servidores
  }
  
  console.log(`   ${allArticles.length} artículos totales de RSS feeds\n`);
  return allArticles;
}

// ============================================
// ANÁLISIS CON GEMINI
// ============================================

async function analyzeWithGemini(title, url, content, source) {
  try {
    console.log(`   Analizando con Gemini: "${title.substring(0, 50)}..."`);
    
    const prompt = `Eres un Senior DevOps & Automation Editor para KAINET, especializado en herramientas de desarrollo, automatización empresarial, cloud platforms y productividad.

**MISIÓN:**
Analizar lanzamientos de herramientas, updates de plataformas y tendencias en DevOps/Automation. Enfócate en **impacto práctico**: qué problemas resuelve, cómo mejora workflows, riesgos de adopción.

**TONO KAINET (español neutro, técnico y claro):**
- Directo y específico, sin marketing fluff
- Profesional pero conversacional
- Enfocado en valor para DevOps engineers, SREs y arquitectos
- Sin emojis ni elementos decorativos
- Evita exageraciones, da contexto real

**ARTÍCULO:**
Título: ${title}
URL: ${url}
Fuente: ${source}

**CONTENIDO:**
${content.substring(0, 4000)}

**TAREA:**
Produce un análisis de 2-3 párrafos (máximo 280 palabras) que:

1. **QUÉ ES** - Explica específicamente el lanzamiento/update/cambio:
   - ¿Nueva feature, breaking change, mejora de performance?
   - ¿Qué tecnología/herramienta afecta?

2. **POR QUÉ IMPORTA** - Identifica el impacto para equipos:
   - ¿Qué workflow mejora o qué problema resuelve?
   - ¿Reduce complejidad, costos, time-to-deploy?
   - ¿Afecta DX (developer experience)?

3. **CONSIDERACIONES** - Menciona:
   - Compatibilidad, breaking changes, migration path
   - Limitaciones o gotchas conocidos
   - Cuándo vale la pena adoptarlo

**RESTRICCIONES:**
- NO inventes features ni métricas no mencionadas
- Si faltan datos técnicos, di "no especificado" o "pendiente documentación"
- Menciona la fuente (${source}) de forma natural
- Usa negritas (**texto**) para términos técnicos clave
- Sin emojis, sin HTML (solo markdown simple)

**FORMATO:**
- 2-3 párrafos separados por doble salto de línea (\\n\\n)
- Cada párrafo: 3-5 oraciones
- Negritas para términos clave
- Sin títulos de sección (###)

ANÁLISIS:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();
    
    console.log(`   Análisis generado (${analysis.length} caracteres)`);
    
    return analysis;

  } catch (error) {
    console.log(`   Error con Gemini API: ${error.message}`);
    return generateBasicSummary(title, content, source);
  }
}

function generateBasicSummary(title, content, source) {
  const summary = content.substring(0, 250) + '...';
  return `${summary}\n\n**Fuente:** ${source}. Actualización importante para equipos que trabajan con estas herramientas.`;
}

// ============================================
// PERSPECTIVA KAINET
// ============================================

async function generateKAINETPerspective(topArticles, weekNumber) {
  try {
    console.log('Generando Perspectiva KAINET con Gemini...');
    
    const articlesContext = topArticles.slice(0, 10).map((a, i) => 
      `${i + 1}. "${a.title}" (${a.source})\n   ${a.summary.substring(0, 150)}...`
    ).join('\n\n');
    
    const prompt = `Eres el Chief Technology Officer de KAINET, escribiendo el análisis editorial semanal sobre tendencias en DevOps, Automation y Developer Tools.

**ARTÍCULOS PUBLICADOS ESTA SEMANA:**
${articlesContext}

**TAREA:**
Escribe un análisis editorial de **3-4 párrafos** (350-450 palabras) que:

1. **TENDENCIA DOMINANTE** - Identifica el patrón principal de la semana:
   - ¿Hay foco en una tecnología específica? (ej: AI-powered dev tools, serverless evolution, etc.)
   - ¿Múltiples vendors lanzando features similares?
   - ¿Cambios importantes en plataformas mainstream?

2. **IMPACTO PARA EQUIPOS** - Conecta los puntos:
   - ¿Qué implica esto para equipos de DevOps/SRE?
   - ¿Hacia dónde va la industria de automation/tooling?
   - ¿Qué gaps de productividad se están cerrando?

3. **SEÑALES DE ADOPCIÓN** - Pragmatismo:
   - ¿Qué vale la pena explorar ahora vs. qué es hype?
   - ¿Qué riesgos de vendor lock-in emergen?
   - ¿Dónde están las oportunidades reales de eficiencia?

4. **RECOMENDACIÓN KAINET** - Cierre táctico:
   - ¿Qué deberían probar/monitorear los equipos técnicos?
   - ¿Qué conversaciones deben tener con stakeholders?

**TONO:**
- Voz de CTO experimentado, no de marketing
- Conecta tendencias técnicas con ROI/eficiencia
- Admite incertidumbre cuando corresponde
- Usa negritas para conceptos clave
- Sin emojis, sin listas de bullets

**RESTRICCIONES:**
- NO inventes tendencias no presentes en los artículos
- Cita tecnologías/vendors específicos mencionados
- Máximo 450 palabras
- Párrafos separados por doble salto de línea (\\n\\n)
- Sin títulos de sección (###)

PERSPECTIVA EDITORIAL:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const perspective = response.text();
    
    console.log(`   Perspectiva generada (${perspective.length} caracteres)\n`);
    
    return perspective;

  } catch (error) {
    console.log(`   Error generando perspectiva: ${error.message}\n`);
    return `Esta semana vimos ${topArticles.length} actualizaciones importantes en el ecosistema de herramientas de desarrollo y automatización. Desde mejoras en plataformas cloud hasta nuevos releases de herramientas DevOps, el foco está en **productividad y eficiencia operacional**.\n\nLas tendencias apuntan hacia mayor integración de IA en developer workflows y simplificación de pipelines de CI/CD. Vale la pena monitorear cómo estas herramientas evolucionan.`;
  }
}

// ============================================
// GENERADOR DE CONTENIDO MARKDOWN
// ============================================

async function generateMarkdownContent(articles, weekNumber) {
  const year = new Date().getFullYear();
  
  // Ordenar por prioridad y score
  const sortedArticles = articles.sort((a, b) => {
    const priorityWeight = { critical: 3, high: 2, medium: 1, low: 0 };
    const aPriority = priorityWeight[a.priority] || 0;
    const bPriority = priorityWeight[b.priority] || 0;
    
    if (aPriority !== bPriority) return bPriority - aPriority;
    return b.score - a.score;
  });
  
  // Seleccionar top 12-15 artículos
  const topArticles = sortedArticles.slice(0, 15);
  
  let md = '';
  
  // INTRO
  md += `**Semana ${weekNumber}, ${year}**\n\n`;
  md += `Análisis curado de las novedades más importantes en DevOps, herramientas de desarrollo, `;
  md += `cloud platforms y automatización empresarial. Lo que realmente mueve la aguja en productividad y eficiencia operacional.\n\n`;

  // DESTACADOS PRINCIPALES (Top 3)
  md += `## Destacados de la Semana\n\n`;
  md += `*Las novedades más importantes en DevOps, tools y cloud platforms*\n\n`;
  md += `<div class="news-grid">\n\n`;
  
  for (const article of topArticles.slice(0, 3)) {
    md += `<div class="news-card">\n\n`;
    md += `<h3 class="card-title">${article.title}</h3>\n\n`;
    md += await analyzeWithGemini(article.title, article.url, article.summary, article.source) + `\n\n`;
    md += `<div class="card-meta">\n`;
    md += `**Fuente:** ${article.source}\n\n`;
    md += `[Leer más →](${article.url})\n`;
    md += `</div>\n\n`;
    md += `</div>\n\n`;
    
    await delay(2000); // Rate limit Gemini
  }
  
  md += `</div>\n\n`;

  // ACTUALIZACIONES IMPORTANTES (4-8)
  if (topArticles.length > 3) {
    md += `## Actualizaciones Importantes\n\n`;
    md += `*Releases, features y cambios que importan para tu stack*\n\n`;
    md += `<div class="news-grid">\n\n`;
    
    for (const article of topArticles.slice(3, 8)) {
      md += `<div class="news-card">\n\n`;
      md += `<h3 class="card-title">${article.title}</h3>\n\n`;
      md += await analyzeWithGemini(article.title, article.url, article.summary, article.source) + `\n\n`;
      md += `<div class="card-meta">\n`;
      md += `**Fuente:** ${article.source}\n\n`;
      md += `[Leer más →](${article.url})\n`;
      md += `</div>\n\n`;
      md += `</div>\n\n`;
      
      await delay(2000);
    }
    
    md += `</div>\n\n`;
  }

  // EN EL RADAR (9-15)
  if (topArticles.length > 8) {
    md += `## En el Radar\n\n`;
    md += `*Otras novedades que vale la pena monitorear*\n\n`;
    md += `<div class="community-grid">\n\n`;
    
    for (const article of topArticles.slice(8, 15)) {
      md += `<div class="community-card">\n\n`;
      md += `**${article.title}**\n\n`;
      md += `*${article.source}*\n\n`;
      md += `[Ver →](${article.url})\n\n`;
      md += `</div>\n\n`;
    }
    
    md += `</div>\n\n`;
  }

  // PERSPECTIVA KAINET
  md += `## Perspectiva KAINET\n\n`;
  md += `<div class="kainet-perspective">\n\n`;
  md += await generateKAINETPerspective(topArticles, weekNumber);
  md += `\n\n</div>\n\n`;
  
  return md;
}

// ============================================
// GUARDAR EN blogPosts.js
// ============================================

async function saveToBlogPosts(post) {
  const blogPostsPath = path.join(process.cwd(), '../../src/data/blogPosts.js');
  
  let content = fs.readFileSync(blogPostsPath, 'utf-8');
  
  // Buscar el array de posts
  const arrayMatch = content.match(/export const blogPosts = \[([\s\S]*)\];/);
  
  if (!arrayMatch) {
    throw new Error('No se pudo encontrar el array blogPosts');
  }
  
  // Construir el nuevo post
  const newPostStr = `  {
    id: ${post.id},
    slug: '${post.slug}',
    title: '${post.title}',
    excerpt: \`${post.excerpt}\`,
    author: '${post.author}',
    date: '${post.date}',
    readTime: '${post.readTime}',
    category: '${post.category}',
    image: '${post.image}',
    featured: ${post.featured},
    content: \`${post.content.replace(/`/g, '\\`')}\`,
  }`;
  
  // Insertar al inicio del array
  const existingPosts = arrayMatch[1].trim();
  const newArray = existingPosts 
    ? `${newPostStr},\n${existingPosts}`
    : newPostStr;
  
  content = content.replace(
    /export const blogPosts = \[([\s\S]*)\];/,
    `export const blogPosts = [\n${newArray}\n];`
  );
  
  fs.writeFileSync(blogPostsPath, content, 'utf-8');
  console.log(`   Post guardado en blogPosts.js\n`);
}

// ============================================
// MAIN
// ============================================

async function main() {
  try {
    const weekNumber = getWeekNumber();
    
    console.log(`\nGenerando post de Automatización/Herramientas (Semana ${weekNumber})`);
    console.log('━'.repeat(60));
    
    // 1. Agregar artículos de RSS
    const articles = await fetchRSSFeeds();
    
    if (articles.length === 0) {
      console.log('No se encontraron artículos relevantes. Abortando.\n');
      return;
    }
    
    console.log(`\nTotal de artículos relevantes: ${articles.length}`);
    console.log('━'.repeat(60));
    
    // 2. Generar contenido markdown
    console.log('\nGenerando contenido del post...\n');
    const content = await generateMarkdownContent(articles, weekNumber);
    console.log('   Contenido generado\n');
    
    // 3. Crear objeto de post
    const post = {
      id: Date.now(),
      slug: `automation-tools-semana-${weekNumber}-2025`,
      title: `Automatización Esta Semana: DevOps, Tools & Cloud (Semana ${weekNumber})`,
      excerpt: `Las novedades más importantes en herramientas de desarrollo, DevOps, cloud platforms y automatización empresarial. ` +
               `Todo lo que necesitas saber para mantener tu stack actualizado.`,
      author: 'KAINET Automation Bot',
      date: new Date().toISOString().split('T')[0],
      readTime: '7 min',
      category: 'Automatización',
      image: `https://placehold.co/800x500/0a0a0a/00E5FF?text=DevOps+%26+Tools`,
      featured: false,
      content: content,
    };
    
    // 4. Guardar en blogPosts.js
    console.log('Guardando en blogPosts.js...');
    await saveToBlogPosts(post);
    
    console.log('━'.repeat(60));
    console.log('✅ POST GENERADO CON ÉXITO');
    console.log('━'.repeat(60));
    console.log(`Título: ${post.title}`);
    console.log(`Slug: ${post.slug}`);
    console.log(`Categoría: ${post.category}`);
    console.log(`Artículos analizados: ${articles.length}`);
    console.log(`URL: /blog/${post.slug}\n`);
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
