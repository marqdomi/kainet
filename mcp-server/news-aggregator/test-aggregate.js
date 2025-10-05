#!/usr/bin/env node

/**
 * Script de prueba para el agregador de noticias
 * Ejecutar: node test-aggregate.js
 */

import fetch from 'node-fetch';

// Simular las funciones principales
async function testAggregator() {
  console.log('🧪 Probando agregador de noticias KAINET...\n');

  // 1. Test Hacker News
  console.log('📰 1. Probando Hacker News API...');
  try {
    const hnRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const topIds = await hnRes.json();
    console.log(`✅ Hacker News: ${topIds.length} historias disponibles\n`);
  } catch (error) {
    console.error(`❌ Error en Hacker News: ${error.message}\n`);
  }

  // 2. Test Reddit
  console.log('🤖 2. Probando Reddit API...');
  try {
    const redditRes = await fetch(
      'https://www.reddit.com/r/artificial.json?limit=5',
      { headers: { 'User-Agent': 'KAINET-Test/1.0' } }
    );
    const redditData = await redditRes.json();
    console.log(`✅ Reddit: ${redditData.data.children.length} posts obtenidos`);
    console.log(`   Primer post: "${redditData.data.children[0].data.title.slice(0, 60)}..."\n`);
  } catch (error) {
    console.error(`❌ Error en Reddit: ${error.message}\n`);
  }

  // 3. Test ArXiv
  console.log('📚 3. Probando ArXiv API...');
  try {
    const arxivRes = await fetch(
      'http://export.arxiv.org/api/query?search_query=cat:cs.AI&max_results=3'
    );
    const arxivXml = await arxivRes.text();
    const entries = arxivXml.match(/<entry>/g) || [];
    console.log(`✅ ArXiv: ${entries.length} papers encontrados\n`);
  } catch (error) {
    console.error(`❌ Error en ArXiv: ${error.message}\n`);
  }

  // 4. Simulación de post generado
  console.log('📝 4. Ejemplo de post generado:\n');
  const examplePost = {
    id: Date.now(),
    slug: 'ia-semanal-semana-40-2025',
    title: 'IA Semanal: Lo Más Destacado en Inteligencia Artificial (Semana 40)',
    excerpt: 'Resumen curado de las noticias más importantes en IA...',
    category: 'IA',
    date: new Date().toISOString().split('T')[0],
  };
  console.log(JSON.stringify(examplePost, null, 2));
  console.log('\n✅ Todos los tests completados!\n');
}

testAggregator().catch(console.error);
