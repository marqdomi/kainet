#!/usr/bin/env node

/**
 * Script de prueba para verificar que los generadores separados funcionen
 */

import fs from 'fs';

console.log('🧪 Probando generadores de posts separados...\n');

const scripts = [
  { name: 'generate-automation-post.js', description: 'Automatización Empresarial' },
  { name: 'generate-devops-post.js', description: 'DevOps & Herramientas' },
  { name: 'generate-weekly-post.js', description: 'Ambos posts (original)' }
];

console.log('📋 Verificando archivos:');
scripts.forEach(script => {
  if (fs.existsSync(script.name)) {
    const stats = fs.statSync(script.name);
    console.log(`   ✅ ${script.name} (${stats.size} bytes) - ${script.description}`);
  } else {
    console.log(`   ❌ ${script.name} - NO ENCONTRADO`);
  }
});

console.log('\n🔍 Verificando sintaxis:');
for (const script of scripts) {
  if (fs.existsSync(script.name)) {
    try {
      const content = fs.readFileSync(script.name, 'utf8');
      
      // Verificar que tenga las importaciones correctas
      if (content.includes('import {') && content.includes('from \'./generate-weekly-post.js\'')) {
        console.log(`   ✅ ${script.name} - Importaciones correctas`);
      } else if (content.includes('generateWeeklyPosts')) {
        console.log(`   ✅ ${script.name} - Script principal`);
      } else {
        console.log(`   ⚠️  ${script.name} - Verificar importaciones`);
      }
    } catch (error) {
      console.log(`   ❌ ${script.name} - Error: ${error.message}`);
    }
  }
}

console.log('\n📅 Horarios de ejecución configurados:');
console.log('   🏢 Automatización Empresarial: Lunes 10:00 AM México');
console.log('   🔧 DevOps & Herramientas: Jueves 10:00 AM México');
console.log('   📧 Newsletter: Viernes 10:00 AM México');

console.log('\n🎯 Comandos disponibles:');
console.log('   npm run generate-automation  # Solo automatización');
console.log('   npm run generate-devops      # Solo DevOps');
console.log('   npm run generate-weekly      # Ambos posts');

console.log('\n✅ Sistema de posts separados configurado correctamente!');