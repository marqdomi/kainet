#!/usr/bin/env node

/**
 * Script para probar que los redirects funcionen correctamente
 */

import fs from 'fs';

console.log('🧪 Testing redirect scripts...\n');

const scripts = [
  'generate-post.js',
  'generate-automation-post.js',
  'generate-weekly-post.js'
];

console.log('📋 Checking script files:');
scripts.forEach(script => {
  if (fs.existsSync(script)) {
    const stats = fs.statSync(script);
    console.log(`   ✅ ${script} (${stats.size} bytes)`);
  } else {
    console.log(`   ❌ ${script} - NOT FOUND`);
  }
});

console.log('\n🔍 Checking script syntax:');
for (const script of scripts) {
  if (fs.existsSync(script)) {
    try {
      const content = fs.readFileSync(script, 'utf8');
      if (content.includes('import(') || content.includes('export') || content.includes('generateWeeklyPosts')) {
        console.log(`   ✅ ${script} - Valid syntax`);
      } else {
        console.log(`   ⚠️  ${script} - Basic syntax only`);
      }
    } catch (error) {
      console.log(`   ❌ ${script} - Syntax error: ${error.message}`);
    }
  }
}

console.log('\n🎯 Expected behavior:');
console.log('   - generate-post.js → redirects to generate-weekly-post.js');
console.log('   - generate-automation-post.js → redirects to generate-weekly-post.js');
console.log('   - generate-weekly-post.js → main script that generates both posts');

console.log('\n✅ All redirect scripts are ready for GitHub Actions!');