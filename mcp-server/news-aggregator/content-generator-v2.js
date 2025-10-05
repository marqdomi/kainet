#!/usr/bin/env node

/**
 * GENERADOR MEJORADO DE POSTS - VERSION 2.0
 * Con análisis crítico, formato profesional y mejor UX
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// [... mantener las mismas funciones de fetch y config ...]
// Por brevedad, aquí solo muestro la función de generación mejorada

/**
 * Genera contenido markdown con formato profesional
 */
function generateMarkdownContent(news, weekNumber) {
  const year = new Date().getFullYear();
  
  const topNews = news.filter(n => n.source.includes('Hacker News')).slice(0, 3);
  const topPapers = news.filter(n => n.source === 'ArXiv' && n.title.trim()).slice(0, 2);
  const topDiscussions = news.filter(n => n.source.includes('Reddit')).slice(0, 3);

  let md = '';
  
  // INTRO destacada con blockquote
  md += `> **Semana ${weekNumber}, ${year}** — Esta semana en IA nos trae desde movimientos corporativos que reshape el mercado, hasta investigación que podría cambiar cómo construimos sistemas inteligentes.\n\n`;

  // HISTORIA PRINCIPAL - con highlight box
  if (topNews.length > 0) {
    const main = topNews[0];
    md += `## 🌟 Historia de la Semana\n\n`;
    md += `### ${main.title}\n\n`;
    md += `<div class="highlight-box">\n\n`;
    md += analyzeStory(main) + `\n\n`;
    md += `**📊 Engagement:** ${main.score.toLocaleString()} puntos • ${main.comments} comentarios en Hacker News\n\n`;
    md += `</div>\n\n`;
    md += `**[📖 Leer artículo completo ↗](${main.url})**\n\n`;
    md += `---\n\n`;
  }

  // OTRAS NOTICIAS - grid de cards
  if (topNews.length > 1) {
    md += `## 📰 Otras Noticias que Importan\n\n`;
    md += `<div class="news-grid">\n\n`;
    
    topNews.slice(1).forEach(item => {
      md += `<div class="news-card">\n\n`;
      md += `### ${item.title}\n\n`;
      md += analyzeNews(item) + `\n\n`;
      md += `<div class="meta">\n\n`;
      md += `**[Leer más ↗](${item.url})** • ${item.score.toLocaleString()} ↑ ${item.comments} 💬\n\n`;
      md += `</div>\n\n`;
      md += `</div>\n\n`;
    });
    
    md += `</div>\n\n`;
    md += `---\n\n`;
  }

  // INVESTIGACIÓN
  if (topPapers.length > 0) {
    md += `## 🔬 Investigación Destacada\n\n`;
    md += `*La academia empujando fronteras*\n\n`;
    
    topPapers.forEach((paper, i) => {
      md += `**${i + 1}. [${paper.title}](${paper.url})**\n\n`;
      md += analyzePaper() + `\n\n`;
    });
    
    md += `---\n\n`;
  }

  // COMUNIDAD
  if (topDiscussions.length > 0) {
    md += `## 💬 Pulso de la Comunidad\n\n`;
    
    topDiscussions.forEach((disc, i) => {
      md += `**${i + 1}. [${disc.title}](${disc.url})**\n\n`;
      md += `> *${disc.source}* — **${disc.score}** votos, **${disc.comments}** comentarios\n\n`;
      md += analyzeCommunity(disc) + `\n\n`;
    });
    
    md += `---\n\n`;
  }

  // PERSPECTIVA KAINET
  md += `## 🎯 Nuestra Perspectiva\n\n`;
  md += `<div class="kainet-perspective">\n\n`;
  md += generatePerspective(topNews, weekNumber);
  md += `\n\n</div>\n\n`;
  
  // FOOTER
  md += `---\n\n`;
  md += `<div class="post-footer">\n\n`;
  md += `**📊 Fuentes:** ${news.length} artículos analizados • **✍️ Curado por:** KAINET AI Bot\n\n`;
  md += `*¿Te pareció útil? [Comparte tu feedback](/contact)*\n\n`;
  md += `</div>\n`;

  return md;
}

/**
 * Análisis contextual de historia principal
 */
function analyzeStory(story) {
  const title = story.title.toLowerCase();
  
  const analyses = {
    corporate: `Las grandes tech siguen dominando titulares. Con ${story.score.toLocaleString()} puntos y ${story.comments} comentarios, esta noticia muestra el pulso de la comunidad.\n\n**¿Por qué importa?** Los movimientos corporativos definen qué herramientas tendremos, a qué precio, y bajo qué términos. Para quienes construimos con IA, entender estas dinámicas es tan crítico como dominar los modelos.`,
    
    models: `Los avances en modelos continúan acelerándose. El engagement (${story.score.toLocaleString()} puntos) muestra fascinación con mejoras que podrían tener impactos masivos.\n\n**Nuestra lectura:** Cada generación trae capacidades impresionantes, pero la brecha entre "impresionante en demos" y "útil en producción" persiste. El valor real está en identificar casos de uso específicos donde estos avances resuelven problemas reales.`,
    
    opensource: `Open source en IA gana tracción. Esta iniciativa refleja democratización de herramientas antes exclusivas de gigantes tech.\n\n**Por qué nos interesa:** El futuro de IA empresarial está en soluciones que puedes controlar, auditar y adaptar. Open source no es solo filosofía—es ventaja competitiva.`,
    
    default: `Esta noticia resonó fuertemente (${story.score.toLocaleString()} puntos, ${story.comments} comentarios), tocando temas fundamentales sobre la evolución de IA.\n\n**Análisis:** Los comentarios revelan entusiasmo y escepticismo saludable—exactamente la mezcla necesaria para construir sistemas responsables y efectivos.`
  };
  
  if (title.includes('openai') || title.includes('anthropic') || title.includes('google') || title.includes('meta')) {
    return analyses.corporate;
  } else if (title.includes('model') || title.includes('llm') || title.includes('gpt')) {
    return analyses.models;
  } else if (title.includes('open source') || title.includes('open-source')) {
    return analyses.opensource;
  }
  
  return analyses.default;
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
 * Perspectiva KAINET personalizada
 */
function generatePerspective(topNews, weekNumber) {
  return `**Semana ${weekNumber}** nos deja reflexiones sobre el estado de la IA.

En KAINET observamos estas tendencias como constructores, no espectadores. Cada avance plantea: *¿cómo se traduce en valor real?*

Las grandes noticias corporativas son interesantes, pero estamos enfocados en lo aplicable: usar estos avances para automatizar procesos, mejorar decisiones, y crear experiencias antes imposibles.

El gap entre "la IA puede hacer X" y "implementamos X rentablemente en producción" es enorme. Ahí vivimos—convirtiendo posibilidad en realidad operativa.

**¿La lección?** La IA madura. Las conversaciones se mueven de "qué es posible" a "cómo lo hacemos sostenible, seguro y escalable". Exactamente donde queremos estar.`;
}

// Exportar para uso en otros scripts si es necesario
export {
  generateMarkdownContent,
  analyzeStory,
  analyzeNews,
  analyzePaper,
  analyzeCommunity,
  generatePerspective
};
