#!/usr/bin/env node

/**
 * Script de debug para el workflow de GitHub Actions
 * Simula exactamente lo que debería pasar en el runner
 */

import fs from 'fs';
import path from 'path';

console.log('🔍 Debug del workflow de GitHub Actions\n');

// 1. Verificar directorio actual
console.log('📁 Directorio actual:', process.cwd());

// 2. Listar archivos en el directorio
console.log('\n📋 Archivos en mcp-server/news-aggregator:');
try {
  const files = fs.readdirSync('.');
  files.forEach(file => {
    const stats = fs.statSync(file);
    const type = stats.isDirectory() ? '📁' : '📄';
    console.log(`   ${type} ${file}`);
  });
} catch (error) {
  console.error('❌ Error listando archivos:', error.message);
}

// 3. Verificar archivos específicos
const requiredFiles = [
  'generate-weekly-post.js',
  'package.json',
  'package-lock.json',
  '.env'
];

console.log('\n🔍 Verificando archivos requeridos:');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - NO ENCONTRADO`);
  }
});

// 4. Verificar que el script sea ejecutable
console.log('\n🧪 Verificando script principal:');
try {
  const scriptPath = './generate-weekly-post.js';
  if (fs.existsSync(scriptPath)) {
    const stats = fs.statSync(scriptPath);
    console.log(`   📊 Tamaño: ${stats.size} bytes`);
    console.log(`   📅 Modificado: ${stats.mtime.toISOString()}`);
    
    // Verificar que sea un archivo válido de Node.js
    const content = fs.readFileSync(scriptPath, 'utf8');
    if (content.includes('#!/usr/bin/env node')) {
      console.log('   ✅ Shebang correcto');
    }
    if (content.includes('import')) {
      console.log('   ✅ Usa ES modules');
    }
    if (content.includes('generateWeeklyPosts')) {
      console.log('   ✅ Función principal encontrada');
    }
  }
} catch (error) {
  console.error('   ❌ Error verificando script:', error.message);
}

// 5. Verificar package.json
console.log('\n📦 Verificando package.json:');
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`   📛 Nombre: ${pkg.name}`);
  console.log(`   🔢 Versión: ${pkg.version}`);
  console.log(`   🎯 Tipo: ${pkg.type || 'commonjs'}`);
  
  if (pkg.scripts && pkg.scripts['generate-weekly']) {
    console.log('   ✅ Script npm disponible');
  }
} catch (error) {
  console.error('   ❌ Error leyendo package.json:', error.message);
}

console.log('\n🎯 Comando que debería ejecutar GitHub Actions:');
console.log('   node generate-weekly-post.js');

console.log('\n🔗 Si el workflow sigue fallando, verifica:');
console.log('   1. Que el archivo esté en el repositorio remoto');
console.log('   2. Que GitHub Actions use la versión más reciente');
console.log('   3. Que no haya problemas de cache en GitHub');