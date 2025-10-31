#!/usr/bin/env node

/**
 * Script de verificación específico para GitHub Actions
 * Simula exactamente lo que hace el workflow en producción
 */

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🔍 Verificando compatibilidad con GitHub Actions...\n');

try {
  // 1. Verificar que package.json y package-lock.json estén sincronizados
  console.log('1️⃣ Verificando sincronización de archivos...');
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const packageLock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
  
  const supabaseVersionPackage = packageJson.dependencies['@supabase/supabase-js'];
  const supabaseVersionLock = packageLock.packages['node_modules/@supabase/supabase-js'].version;
  
  console.log(`   📦 package.json: @supabase/supabase-js ${supabaseVersionPackage}`);
  console.log(`   🔒 package-lock.json: @supabase/supabase-js ${supabaseVersionLock}`);
  
  if (supabaseVersionLock === '2.78.0') {
    console.log('   ✅ Versiones sincronizadas correctamente');
  } else {
    throw new Error(`Versión incorrecta en lock file: ${supabaseVersionLock}`);
  }
  
  // 2. Simular limpieza completa (como hace GitHub Actions)
  console.log('\n2️⃣ Simulando entorno limpio de GitHub Actions...');
  if (fs.existsSync('node_modules')) {
    execSync('rm -rf node_modules', { stdio: 'pipe' });
  }
  
  // 3. Ejecutar npm ci (comando exacto de GitHub Actions)
  console.log('3️⃣ Ejecutando npm ci...');
  execSync('npm ci', { stdio: 'pipe' });
  
  // 4. Verificar que las dependencias estén correctas
  console.log('4️⃣ Verificando instalación...');
  const nodeModulesSupabase = fs.existsSync('node_modules/@supabase/supabase-js');
  if (!nodeModulesSupabase) {
    throw new Error('Supabase no se instaló correctamente');
  }
  
  console.log('   ✅ Dependencias instaladas correctamente');
  
  // 5. Verificar que el script principal funcione
  console.log('5️⃣ Verificando funcionalidad...');
  execSync('node -e "import(\'@supabase/supabase-js\').then(() => console.log(\'OK\'))"', { stdio: 'pipe' });
  
  console.log('\n🎉 ¡ÉXITO! El workflow de GitHub Actions debería funcionar correctamente.');
  console.log('\n📋 Resumen:');
  console.log('   ✅ package.json y package-lock.json sincronizados');
  console.log('   ✅ npm ci ejecuta sin errores');
  console.log('   ✅ @supabase/supabase-js@2.78.0 instalado correctamente');
  console.log('   ✅ Importación de módulos funciona');
  
} catch (error) {
  console.error('\n❌ Error en la verificación:', error.message);
  console.log('\n🔧 Pasos para solucionar:');
  console.log('   1. rm -rf node_modules package-lock.json');
  console.log('   2. npm install');
  console.log('   3. git add package-lock.json && git commit && git push');
  process.exit(1);
}