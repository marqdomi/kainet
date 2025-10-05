#!/usr/bin/env node

/**
 * Test rápido de Claude API
 * Ejecutar: node test-claude.js
 */

import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

async function testClaude() {
  console.log('🧪 Probando Claude API...\n');
  
  // Verificar API key
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ Error: ANTHROPIC_API_KEY no encontrada en .env');
    console.log('\n💡 Asegúrate de tener un archivo .env con:');
    console.log('   ANTHROPIC_API_KEY=sk-ant-api03-...\n');
    process.exit(1);
  }
  
  console.log('✅ API Key encontrada');
  console.log(`   Key: ${process.env.ANTHROPIC_API_KEY.substring(0, 20)}...\n`);
  
  // Inicializar cliente
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
  
  try {
    console.log('📡 Enviando mensaje de prueba a Claude...\n');
    
    const message = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: 'En una frase corta, explica qué es la inteligencia artificial.'
      }]
    });
    
    console.log('✅ Respuesta recibida de Claude:\n');
    console.log(`📝 "${message.content[0].text}"\n`);
    console.log('━'.repeat(60));
    console.log('✅ ¡Claude API funcionando correctamente!\n');
    console.log('Próximo paso:');
    console.log('  npm run generate-post\n');
    
  } catch (error) {
    console.error('❌ Error al llamar a Claude API:\n');
    console.error(`   ${error.message}\n`);
    
    if (error.status === 401) {
      console.log('💡 Posible problema: API key inválida');
      console.log('   Verifica tu key en https://console.anthropic.com\n');
    } else if (error.status === 429) {
      console.log('💡 Posible problema: Rate limit excedido');
      console.log('   Espera un momento y vuelve a intentar\n');
    } else {
      console.log('💡 Revisa la documentación: https://docs.anthropic.com\n');
    }
    
    process.exit(1);
  }
}

testClaude();
