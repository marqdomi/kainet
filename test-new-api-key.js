#!/usr/bin/env node

import { GoogleGenerativeAI } from '@google/generative-ai';

async function testApiKey() {
  console.log('🔍 Probando nueva API key de Gemini...\n');
  
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY no encontrada');
    console.log('💡 Ejecuta: export GEMINI_API_KEY="tu-nueva-api-key"');
    process.exit(1);
  }
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    console.log('📡 Enviando petición de prueba a Gemini 2.5-Flash...');
    
    const result = await model.generateContent('Di "¡Hola KAINET!"');
    const response = result.response;
    const text = response.text();
    
    console.log('\n✅ ¡API key funcionando correctamente!');
    console.log('🤖 Respuesta de Gemini:', text);
    console.log('\n🎉 Todo listo para generar posts de blog\n');
    
  } catch (error) {
    console.error('\n❌ Error al probar la API key:', error.message);
    
    if (error.status === 403) {
      console.log('\n⚠️  La API key está suspendida o inválida');
      console.log('💡 Genera una nueva en: https://aistudio.google.com/app/apikey');
    } else if (error.status === 429) {
      console.log('\n⚠️  Límite de cuota excedido');
      console.log('💡 Espera unos minutos o verifica tu cuota en Google Cloud');
    }
    
    process.exit(1);
  }
}

testApiKey();
