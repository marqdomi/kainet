#!/usr/bin/env node

/**
 * Script para ejecutar el SQL de creación de tabla en Supabase
 * 
 * Instrucciones:
 * 1. Ve a https://app.supabase.com
 * 2. Selecciona tu proyecto
 * 3. Abre SQL Editor en el sidebar izquierdo
 * 4. Copia y pega el contenido de create-blog-posts-table.sql
 * 5. Haz click en "Run" o presiona Ctrl+Enter
 * 
 * O ejecuta este script:
 * npx dotenv -e .env node setup-database.js
 */

import { createClient } from '@supabase/supabase-js';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing env vars. Run: cp .env.example .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function setupDatabase() {
  try {
    console.log('📋 Setting up Supabase database...\n');

    // Leer SQL script
    const sqlPath = join(__dirname, '../../supabase/create-blog-posts-table.sql');
    const sqlContent = await readFile(sqlPath, 'utf-8');

    console.log('Ejecutando SQL statements...');

    // Split por ; y ejecutar cada statement
    const statements = sqlContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--'));

    for (const statement of statements) {
      console.log(`\n▶️  ${statement.substring(0, 60)}...`);
      
      const { error } = await supabase.rpc('exec_sql', { query: statement });
      
      if (error) {
        // RPC might not exist, try alternative approach
        console.warn('⚠️  Could not execute via RPC. Please execute SQL manually in Supabase dashboard.');
        console.log('\n📋 SQL to run in Supabase SQL Editor:\n');
        console.log(sqlContent);
        process.exit(1);
      }
      
      console.log('✅ Executed');
    }

    console.log('\n✅ Database setup complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n📋 Please run this SQL manually in your Supabase dashboard:\n');
    const sqlPath = join(__dirname, '../../supabase/create-blog-posts-table.sql');
    const sqlContent = await readFile(sqlPath, 'utf-8');
    console.log(sqlContent);
    process.exit(1);
  }
}

setupDatabase();
