#!/usr/bin/env node

/**
 * Script de prueba para simular el workflow de producción
 * Verifica que npm ci funcione correctamente
 */

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🧪 Simulando workflow de producción...\n');

try {
  // Simular el proceso que hace GitHub Actions
  console.log('1️⃣ Limpiando node_modules...');
  if (fs.existsSync('node_modules')) {
    execSync('rm -rf node_modules', { stdio: 'inherit' });
  }
  
  console.log('2️⃣ Ejecutando npm ci (como en producción)...');
  execSync('npm ci', { stdio: 'inherit' });
  
  console.log('3️⃣ Verificando configuración...');
  execSync('npm run verify', { stdio: 'inherit' });
  
  console.log('\n✅ ¡Simulación exitosa! El workflow de producción debería funcionar correctamente.');
  
} catch (error) {
  console.error('\n❌ Error en la simulación:', error.message);
  process.exit(1);
}