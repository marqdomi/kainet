#!/usr/bin/env node

/**
 * Test rápido de Gemini API
 * Ejecutar: node test-gemini.js
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

async function testGemini() {
  console.log('🧪 Probando Gemini API...\n');
  
  // Verificar API key
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ Error: GEMINI_API_KEY no encontrada en .env');
    console.log('\n💡 Asegúrate de tener un archivo .env con:');
    console.log('   GEMINI_API_KEY=tu-key-aqui\n');
    process.exit(1);
  }
  
  console.log('✅ API Key encontrada');
  console.log(`   Key: ${process.env.GEMINI_API_KEY.substring(0, 20)}...\n`);
  
  // Inicializar cliente
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
  try {
    console.log('📡 Enviando mensaje de prueba a Gemini...\n');
    
    const result = await model.generateContent(
      'En una frase corta, explica qué es la inteligencia artificial.'
    );
    
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Respuesta recibida de Gemini:\n');
    console.log(`📝 "${text}"\n`);
    console.log('━'.repeat(60));
    console.log('✅ ¡Gemini API funcionando correctamente!\n');
    console.log('Próximo paso:');
    console.log('  npm run generate-post\n');
    
  } catch (error) {
    console.error('❌ Error al llamar a Gemini API:\n');
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes('API_KEY_INVALID')) {
      console.log('💡 Posible problema: API key inválida');
      console.log('   Verifica tu key en https://makersuite.google.com/app/apikey\n');
    } else if (error.message.includes('RATE_LIMIT')) {
      console.log('💡 Posible problema: Rate limit excedido');
      console.log('   Espera un momento y vuelve a intentar\n');
    } else {
      console.log('💡 Revisa la documentación: https://ai.google.dev/docs\n');
    }
    
    process.exit(1);
  }
}

testGemini();
