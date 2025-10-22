#!/usr/bin/env node

/**
 * Script para verificar configuración de Supabase
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de Supabase...\n');

// Leer .env.local
const envLocalPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envLocalPath, 'utf-8');

// Extraer variables
const urlMatch = envContent.match(/VITE_SUPABASE_URL=(.+)/);
const keyMatch = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/);

const url = urlMatch ? urlMatch[1].trim() : null;
const key = keyMatch ? keyMatch[1].trim() : null;

console.log('📋 Variables encontradas:\n');

if (url) {
  console.log(`✅ VITE_SUPABASE_URL:`);
  console.log(`   ${url}\n`);
} else {
  console.log(`❌ VITE_SUPABASE_URL: NO ENCONTRADA\n`);
}

if (key) {
  console.log(`✅ VITE_SUPABASE_ANON_KEY:`);
  console.log(`   ${key.substring(0, 50)}...\n`);
  console.log(`   Longitud: ${key.length} caracteres\n`);
} else {
  console.log(`❌ VITE_SUPABASE_ANON_KEY: NO ENCONTRADA\n`);
}

// Validaciones
console.log('🔐 Validaciones:\n');

if (url && url.includes('supabase.co')) {
  console.log('✅ URL de Supabase válida');
} else {
  console.log('❌ URL de Supabase inválida o vacía');
}

if (key && key.startsWith('eyJ')) {
  console.log('✅ API Key comienza con eyJ (formato JWT válido)');
} else {
  console.log('❌ API Key no tiene formato JWT válido');
}

if (key && key.length > 200) {
  console.log('✅ API Key tiene longitud adecuada');
} else {
  console.log('⚠️  API Key podría estar incompleta');
}

console.log('\n📝 Para obtener las keys correctas:');
console.log('   1. Ve a https://app.supabase.com');
console.log('   2. Selecciona tu proyecto');
console.log('   3. Settings → API');
console.log('   4. Copia "Project URL" y "anon/public" key');
console.log('   5. Actualiza .env.local\n');

// Resumen
const isValid = url && key && url.includes('supabase.co') && key.startsWith('eyJ');
console.log(isValid 
  ? '✅ Configuración parece válida' 
  : '❌ Hay problemas con la configuración'
);
