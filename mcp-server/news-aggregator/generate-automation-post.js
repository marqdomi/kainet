#!/usr/bin/env node

/**
 * REDIRECT SCRIPT - generate-automation-post.js
 * 
 * Este archivo es un redirect al script principal.
 * GitHub Actions está buscando este archivo, así que lo creamos
 * para que redirija al script correcto.
 */

console.log('🔄 Redirecting to generate-weekly-post.js...');

// Importar y ejecutar el script principal
import('./generate-weekly-post.js')
  .then(() => {
    console.log('✅ Weekly posts generation completed via redirect');
  })
  .catch((error) => {
    console.error('❌ Error in redirect script:', error);
    process.exit(1);
  });