#!/usr/bin/env node

/**
 * KAINET News Aggregator MCP Server
 * 
 * Este servidor MCP agrega noticias de IA semanalmente y genera
 * posts de blog alineados con la visión de KAINET
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fetch from 'node-fetch';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

// ===== Configuración =====
const CONFIG = {
  sources: {
    hackerNews: 'https://hacker-news.firebaseio.com/v0',
    reddit: 'https://www.reddit.com/r/artificial+MachineLearning+LocalLLaMA.json',
    arxiv: 'http://export.arxiv.org/api/query',
  },
  keywords: [
    'artificial intelligence',
    'machine learning',
    'automation',
    'llm',
    'gpt',
    'claude',
    'neural network',
    'deep learning',
    'rag',
    'agents',
    'langchain',
    'autonomous',
  ],
  kainetVision: `
    KAINET se enfoca en:
    - IA aplicada a casos de uso reales
    - Automatización inteligente de procesos
    - Desarrollo web con visualizaciones 3D
    - Prototipos técnicos robustos
    - Machine Learning para negocios
    - DevOps y CI/CD moderno
  `,
};

// ===== Funciones de agregación de noticias =====

/**
 * Obtiene top stories de Hacker News
 */
async function fetchHackerNews() {
  try {
    const topStoriesRes = await fetch(`${CONFIG.sources.hackerNews}/topstories.json`);
    const topStoryIds = await topStoriesRes.json();
    
    // Obtener detalles de los primeros 30 stories
    const stories = await Promise.all(
      topStoryIds.slice(0, 30).map(async (id) => {
        const storyRes = await fetch(`${CONFIG.sources.hackerNews}/item/${id}.json`);
        return storyRes.json();
      })
    );

    // Filtrar por keywords de IA
    return stories.filter((story) => {
      if (!story || !story.title) return false;
      const titleLower = story.title.toLowerCase();
      return CONFIG.keywords.some((keyword) => titleLower.includes(keyword));
    }).map((story) => ({
      title: story.title,
      url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
      score: story.score,
      source: 'Hacker News',
      date: new Date(story.time * 1000).toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching Hacker News:', error);
    return [];
  }
}

/**
 * Obtiene posts de subreddits de IA
 */
async function fetchReddit() {
  try {
    const res = await fetch(CONFIG.sources.reddit, {
      headers: { 'User-Agent': 'KAINET-Bot/1.0' },
    });
    const data = await res.json();

    return data.data.children
      .filter((post) => {
        const titleLower = post.data.title.toLowerCase();
        return CONFIG.keywords.some((keyword) => titleLower.includes(keyword));
      })
      .slice(0, 15)
      .map((post) => ({
        title: post.data.title,
        url: post.data.url,
        score: post.data.score,
        source: `Reddit (r/${post.data.subreddit})`,
        date: new Date(post.data.created_utc * 1000).toISOString(),
      }));
  } catch (error) {
    console.error('Error fetching Reddit:', error);
    return [];
  }
}

/**
 * Busca papers recientes en ArXiv
 */
async function fetchArxiv() {
  try {
    const query = 'cat:cs.AI OR cat:cs.LG OR cat:cs.CL';
    const url = `${CONFIG.sources.arxiv}?search_query=${encodeURIComponent(query)}&sortBy=submittedDate&sortOrder=descending&max_results=20`;
    
    const res = await fetch(url);
    const xmlText = await res.text();
    
    // Parse XML simple (en producción usar xml2js)
    const entries = xmlText.match(/<entry>[\s\S]*?<\/entry>/g) || [];
    
    return entries.slice(0, 10).map((entry) => {
      const title = entry.match(/<title>(.*?)<\/title>/)?.[1] || '';
      const summary = entry.match(/<summary>(.*?)<\/summary>/)?.[1] || '';
      const link = entry.match(/<id>(.*?)<\/id>/)?.[1] || '';
      const published = entry.match(/<published>(.*?)<\/published>/)?.[1] || '';
      
      return {
        title: title.replace(/\s+/g, ' ').trim(),
        url: link,
        summary: summary.replace(/\s+/g, ' ').trim().slice(0, 200) + '...',
        source: 'ArXiv',
        date: published,
      };
    });
  } catch (error) {
    console.error('Error fetching ArXiv:', error);
    return [];
  }
}

/**
 * Agrega todas las noticias de la semana
 */
async function aggregateWeeklyNews() {
  console.error('🔍 Agregando noticias de la semana...');
  
  const [hnNews, redditNews, arxivPapers] = await Promise.all([
    fetchHackerNews(),
    fetchReddit(),
    fetchArxiv(),
  ]);

  const allNews = [
    ...hnNews,
    ...redditNews,
    ...arxivPapers,
  ];

  // Ordenar por score/relevancia
  allNews.sort((a, b) => (b.score || 0) - (a.score || 0));

  console.error(`✅ Encontradas ${allNews.length} noticias relevantes`);
  
  return allNews;
}

/**
 * Genera un post de blog usando las noticias agregadas
 * En producción, esto llamaría a Claude API para generar el contenido
 */
async function generateBlogPost(news, weekNumber) {
  const topNews = news.slice(0, 10); // Top 10 noticias
  
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0];
  const slug = `ia-semanal-semana-${weekNumber}-${date.getFullYear()}`;
  
  // Template del post
  const post = {
    id: Date.now(),
    slug,
    title: `IA Semanal: Lo Más Destacado en Inteligencia Artificial (Semana ${weekNumber})`,
    excerpt: `Resumen curado de las noticias, papers y desarrollos más importantes en IA y automatización de esta semana, alineado con la visión de KAINET.`,
    author: 'KAINET AI Bot',
    date: dateStr,
    readTime: '6 min',
    category: 'IA',
    image: `https://placehold.co/800x500/0a0a0a/00E5FF?text=IA+Semana+${weekNumber}`,
    featured: false,
    content: generateMarkdownContent(topNews, weekNumber),
  };

  return post;
}

/**
 * Genera el contenido markdown del post
 */
function generateMarkdownContent(news, weekNumber) {
  let markdown = `# Lo Más Destacado en IA - Semana ${weekNumber}\n\n`;
  markdown += `Esta semana en inteligencia artificial y automatización ha estado llena de desarrollos fascinantes. `;
  markdown += `Aquí te presentamos un resumen curado de las noticias más relevantes para KAINET.\n\n`;
  markdown += `---\n\n`;

  // Agrupar por fuente
  const bySource = news.reduce((acc, item) => {
    const source = item.source.split(' ')[0]; // "Hacker", "Reddit", "ArXiv"
    if (!acc[source]) acc[source] = [];
    acc[source].push(item);
    return acc;
  }, {});

  // Sección principal
  markdown += `## 🚀 Principales Desarrollos\n\n`;
  news.slice(0, 3).forEach((item, idx) => {
    markdown += `### ${idx + 1}. ${item.title}\n\n`;
    if (item.summary) {
      markdown += `${item.summary}\n\n`;
    }
    markdown += `**Fuente:** [${item.source}](${item.url})`;
    if (item.score) {
      markdown += ` • **Score:** ${item.score}`;
    }
    markdown += `\n\n---\n\n`;
  });

  // Papers académicos
  if (bySource.ArXiv && bySource.ArXiv.length > 0) {
    markdown += `## 📚 Papers Destacados de ArXiv\n\n`;
    bySource.ArXiv.slice(0, 3).forEach((paper) => {
      markdown += `- **[${paper.title}](${paper.url})**\n`;
      markdown += `  ${paper.summary}\n\n`;
    });
    markdown += `---\n\n`;
  }

  // Comunidad
  if (bySource.Hacker || bySource.Reddit) {
    markdown += `## 💬 Lo Más Comentado en la Comunidad\n\n`;
    const communityNews = [...(bySource.Hacker || []), ...(bySource.Reddit || [])];
    communityNews.slice(0, 5).forEach((item) => {
      markdown += `- **[${item.title}](${item.url})**\n`;
      markdown += `  *${item.source}* • ${item.score} puntos\n\n`;
    });
  }

  // Conclusión
  markdown += `---\n\n`;
  markdown += `## 🎯 Reflexión KAINET\n\n`;
  markdown += `Estos desarrollos reflejan la rápida evolución de la IA y la automatización. `;
  markdown += `En KAINET, seguimos de cerca estas tendencias para aplicarlas en soluciones prácticas `;
  markdown += `que generen valor real para nuestros clientes.\n\n`;
  markdown += `¿Qué te pareció más interesante esta semana? [Cuéntanos en LinkedIn](https://www.linkedin.com/in/marcdomibe/)\n\n`;
  markdown += `---\n\n`;
  markdown += `*Este resumen fue generado automáticamente por nuestro sistema de agregación de noticias.*\n`;

  return markdown;
}

// ===== MCP Server Setup =====

const server = new Server(
  {
    name: 'kainet-news-aggregator',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Lista de tools disponibles
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'aggregate_weekly_ai_news',
        description: 'Agrega noticias de IA de múltiples fuentes (HN, Reddit, ArXiv) de la última semana',
        inputSchema: {
          type: 'object',
          properties: {
            limit: {
              type: 'number',
              description: 'Número máximo de noticias a retornar (default: 20)',
              default: 20,
            },
          },
        },
      },
      {
        name: 'generate_weekly_blog_post',
        description: 'Genera un post de blog completo con resumen semanal de noticias de IA',
        inputSchema: {
          type: 'object',
          properties: {
            weekNumber: {
              type: 'number',
              description: 'Número de la semana del año',
              required: true,
            },
            autoPublish: {
              type: 'boolean',
              description: 'Si es true, guarda el post directamente en blogPosts.js',
              default: false,
            },
          },
          required: ['weekNumber'],
        },
      },
      {
        name: 'preview_blog_post',
        description: 'Genera una preview del post sin guardarlo',
        inputSchema: {
          type: 'object',
          properties: {
            weekNumber: {
              type: 'number',
              description: 'Número de la semana del año',
              required: true,
            },
          },
          required: ['weekNumber'],
        },
      },
    ],
  };
});

// Handler para ejecutar tools
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === 'aggregate_weekly_ai_news') {
      const news = await aggregateWeeklyNews();
      const limit = args.limit || 20;
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(news.slice(0, limit), null, 2),
          },
        ],
      };
    }

    if (name === 'generate_weekly_blog_post') {
      const news = await aggregateWeeklyNews();
      const post = await generateBlogPost(news, args.weekNumber);

      if (args.autoPublish) {
        // Guardar en blogPosts.js
        const blogPostsPath = join(process.cwd(), 'src/data/blogPosts.js');
        const content = await readFile(blogPostsPath, 'utf-8');
        
        // Insertar nuevo post al inicio del array
        const newPostStr = JSON.stringify(post, null, 2);
        const updatedContent = content.replace(
          /export const blogPosts = \[/,
          `export const blogPosts = [\n  ${newPostStr},`
        );
        
        await writeFile(blogPostsPath, updatedContent);
        
        return {
          content: [
            {
              type: 'text',
              text: `✅ Post publicado exitosamente!\n\nSlug: ${post.slug}\nTítulo: ${post.title}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(post, null, 2),
          },
        ],
      };
    }

    if (name === 'preview_blog_post') {
      const news = await aggregateWeeklyNews();
      const post = await generateBlogPost(news, args.weekNumber);

      return {
        content: [
          {
            type: 'text',
            text: `# PREVIEW DEL POST\n\n${post.content}`,
          },
        ],
      };
    }

    throw new Error(`Tool desconocido: ${name}`);
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Iniciar servidor
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('KAINET News Aggregator MCP Server iniciado');
}

main().catch((error) => {
  console.error('Error fatal:', error);
  process.exit(1);
});
