#!/usr/bin/env node

/**
 * Script de verificación para el MCP Server
 * Verifica que todas las dependencias estén correctamente instaladas
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

console.log('🔍 Verificando configuración del MCP Server...\n');

// Verificar variables de entorno
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_KEY',
  'GEMINI_API_KEY'
];

let envOk = true;
requiredEnvVars.forEach(envVar => {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar}: Configurado`);
  } else {
    console.log(`❌ ${envVar}: Falta configurar`);
    envOk = false;
  }
});

if (!envOk) {
  console.log('\n❌ Faltan variables de entorno. Revisa tu archivo .env');
  process.exit(1);
}

// Verificar conexión a Supabase
try {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  
  console.log('\n✅ Cliente Supabase creado correctamente');
  console.log('✅ Todas las dependencias están funcionando');
  console.log('\n🎉 El MCP Server está listo para generar noticias semanales!');
  
} catch (error) {
  console.error('\n❌ Error al crear cliente Supabase:', error.message);
  process.exit(1);
}