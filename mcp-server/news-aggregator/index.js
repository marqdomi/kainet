#!/usr/bin/env node

/**
 * KAINET News Aggregator MCP Server v2.0
 * 
 * MCP wrapper para generate-weekly-post.js
 * - Agrega noticias reales de HN, Reddit, ArXiv
 * - Genera 2 posts con Gemini 2.5-PRO
 * - Guarda automáticamente en Supabase
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { generateWeeklyPosts } from './generate-weekly-post.js';

// ===== MCP Server Setup =====

const server = new Server(
  {
    name: 'kainet-news-aggregator',
    version: '2.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Lista de tools disponibles en el MCP server
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'generate_weekly_blog_post',
        description: 'Genera 2 posts semanales con IA: Automatización Empresarial + DevOps. Busca noticias reales y estructura con Gemini 2.5-PRO. Guarda en Supabase automáticamente.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

/**
 * Handler para ejecutar tools
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request;

  try {
    if (name === 'generate_weekly_blog_post') {
      console.error('🚀 MCP Server: Iniciando generación semanal de posts...');
      
      const posts = await generateWeeklyPosts();

      return {
        content: [
          {
            type: 'text',
            text: `✅ Generación completada\n\nPosts creados: ${posts.length}\n\n${posts.map(p => `📝 "${p.title}"\n   Categoría: ${p.category}\n   Slug: ${p.slug}\n   Read time: ${p.readTime}\n`).join('\n')}`,
          },
        ],
      };
    }

    throw new Error(`Tool desconocido: ${name}`);
  } catch (error) {
    console.error(`❌ Error en MCP Server: ${error.message}`);
    return {
      content: [
        {
          type: 'text',
          text: `❌ Error: ${error.message}\n\nStack: ${error.stack}`,
        },
      ],
      isError: true,
    };
  }
});

/**
 * Inicia el servidor MCP
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('✅ KAINET News Aggregator MCP Server v2.0 iniciado');
}

main().catch((error) => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
