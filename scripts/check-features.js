#!/usr/bin/env node

/**
 * Script para verificar el estado de las feature flags
 * Uso: node scripts/check-features.js
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Feature flags disponibles
const features = {
  VITE_FEATURE_KANJI: 'Kanji Particles',
  VITE_FEATURE_GLITCH: 'Glitch Effects',
  VITE_FEATURE_HOLO: 'Holographic Cards',
  VITE_FEATURE_TRANSITIONS: 'Page Transitions',
  VITE_FEATURE_CIRCUITS: 'Circuit Lines',
  VITE_FEATURE_PARALLAX: 'Parallax Scrolling',
  VITE_FEATURE_TYPOGRAPHY: 'Typography Enhancements',
  VITE_FEATURE_LOADERS: 'Custom Loaders',
  VITE_FEATURE_EASTER_EGGS: 'Easter Eggs',
  VITE_FEATURE_ENHANCED_UI: 'Enhanced UI Components',
};

function readEnvFile(filename) {
  try {
    const envPath = join(rootDir, filename);
    const content = readFileSync(envPath, 'utf-8');
    const env = {};
    
    content.split('\n').forEach(line => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        env[key] = value;
      }
    });
    
    return env;
  } catch (error) {
    return null;
  }
}

function checkFeatureStatus() {
  console.log(`\n${colors.bright}${colors.cyan}🎌 Feature Flags Status Check${colors.reset}\n`);
  
  // Leer .env.local
  const envLocal = readEnvFile('.env.local');
  const envExample = readEnvFile('.env.local.example');
  
  if (!envLocal) {
    console.log(`${colors.red}❌ .env.local no encontrado${colors.reset}`);
    console.log(`${colors.yellow}💡 Crea .env.local basado en .env.local.example${colors.reset}\n`);
    return;
  }
  
  console.log(`${colors.green}✅ .env.local encontrado${colors.reset}\n`);
  
  // Verificar cada feature
  let enabledCount = 0;
  let disabledCount = 0;
  
  console.log(`${colors.bright}Feature Status:${colors.reset}\n`);
  
  Object.entries(features).forEach(([key, name]) => {
    const value = envLocal[key];
    const isEnabled = value === 'true';
    
    if (isEnabled) {
      enabledCount++;
      console.log(`  ${colors.green}✓${colors.reset} ${name.padEnd(30)} ${colors.green}ENABLED${colors.reset}`);
    } else {
      disabledCount++;
      console.log(`  ${colors.red}✗${colors.reset} ${name.padEnd(30)} ${colors.red}DISABLED${colors.reset}`);
    }
  });
  
  // Resumen
  console.log(`\n${colors.bright}Summary:${colors.reset}`);
  console.log(`  ${colors.green}Enabled:${colors.reset}  ${enabledCount}/${Object.keys(features).length}`);
  console.log(`  ${colors.red}Disabled:${colors.reset} ${disabledCount}/${Object.keys(features).length}`);
  
  // Recomendaciones
  console.log(`\n${colors.bright}${colors.blue}💡 Recommendations:${colors.reset}\n`);
  
  if (enabledCount === 0) {
    console.log(`  ${colors.yellow}⚠️  Todas las features están deshabilitadas${colors.reset}`);
    console.log(`  ${colors.cyan}→${colors.reset} Para testing, habilita features en .env.local`);
  } else if (enabledCount === Object.keys(features).length) {
    console.log(`  ${colors.green}✨ Todas las features están habilitadas${colors.reset}`);
    console.log(`  ${colors.cyan}→${colors.reset} Perfecto para testing completo`);
    console.log(`  ${colors.cyan}→${colors.reset} Ejecuta: npm run dev`);
  } else {
    console.log(`  ${colors.yellow}⚠️  Algunas features están deshabilitadas${colors.reset}`);
    console.log(`  ${colors.cyan}→${colors.reset} Para testing completo, habilita todas las features`);
  }
  
  // Comandos útiles
  console.log(`\n${colors.bright}${colors.blue}🔧 Useful Commands:${colors.reset}\n`);
  console.log(`  ${colors.cyan}npm run dev${colors.reset}           - Start development server`);
  console.log(`  ${colors.cyan}npm run build${colors.reset}         - Build for production`);
  console.log(`  ${colors.cyan}npm test -- --run${colors.reset}     - Run tests`);
  console.log(`  ${colors.cyan}node scripts/test-feature-flags.js${colors.reset} - Test feature flag system`);
  
  console.log('');
}

// Ejecutar
checkFeatureStatus();
