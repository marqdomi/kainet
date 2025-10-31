#!/usr/bin/env node

/**
 * Script de prueba para verificar variables de entorno del workflow
 * Simula el entorno de GitHub Actions
 */

import dotenv from 'dotenv';

// Cargar variables de entorno locales
dotenv.config();

console.log('🔍 Verificando variables de entorno para GitHub Actions...\n');

const requiredVars = {
  'GEMINI_API_KEY': process.env.GEMINI_API_KEY,
  'SUPABASE_URL': process.env.SUPABASE_URL,
  'SUPABASE_SERVICE_KEY': process.env.SUPABASE_SERVICE_KEY
};

let allOk = true;

Object.entries(requiredVars).forEach(([name, value]) => {
  if (value) {
    console.log(`✅ ${name}: Configurado (${value.substring(0, 10)}...)`);
  } else {
    console.log(`❌ ${name}: NO configurado`);
    allOk = false;
  }
});

if (allOk) {
  console.log('\n🎉 Todas las variables están configuradas correctamente!');
  console.log('\n📋 Para GitHub Actions, asegúrate de que estos secrets estén configurados:');
  console.log('   - GEMINI_API_KEY');
  console.log('   - SUPABASE_URL');
  console.log('   - SUPABASE_SERVICE_KEY');
  console.log('\n🔗 Configúralos en: https://github.com/marqdomi/kainet/settings/secrets/actions');
} else {
  console.log('\n❌ Faltan variables de entorno');
  process.exit(1);
}