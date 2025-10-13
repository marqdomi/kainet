#!/usr/bin/env node

/**
 * Manual Feature Flags Testing Script
 * 
 * This script tests the feature flag system by simulating different configurations
 * and verifying the site works correctly with flags enabled/disabled.
 * 
 * Usage: node scripts/test-feature-flags.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENV_FILE = path.join(__dirname, '..', '.env.local');
const ENV_BACKUP = path.join(__dirname, '..', '.env.local.backup');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60) + '\n');
}

function logTest(name, passed) {
  const symbol = passed ? '✅' : '❌';
  const color = passed ? 'green' : 'red';
  log(`${symbol} ${name}`, color);
}

// Test configurations
const testConfigs = {
  allOff: {
    name: 'All Features OFF',
    description: 'Baseline configuration - site should work without enhancements',
    flags: {
      VITE_FEATURE_KANJI: 'false',
      VITE_FEATURE_GLITCH: 'false',
      VITE_FEATURE_HOLO: 'false',
      VITE_FEATURE_TRANSITIONS: 'false',
      VITE_FEATURE_CIRCUITS: 'false',
      VITE_FEATURE_PARALLAX: 'false',
      VITE_FEATURE_TYPOGRAPHY: 'false',
      VITE_FEATURE_LOADERS: 'false',
      VITE_FEATURE_EASTER_EGGS: 'false',
      VITE_FEATURE_ENHANCED_UI: 'false',
    }
  },
  allOn: {
    name: 'All Features ON',
    description: 'Full enhancement mode - all features enabled',
    flags: {
      VITE_FEATURE_KANJI: 'true',
      VITE_FEATURE_GLITCH: 'true',
      VITE_FEATURE_HOLO: 'true',
      VITE_FEATURE_TRANSITIONS: 'true',
      VITE_FEATURE_CIRCUITS: 'true',
      VITE_FEATURE_PARALLAX: 'true',
      VITE_FEATURE_TYPOGRAPHY: 'true',
      VITE_FEATURE_LOADERS: 'true',
      VITE_FEATURE_EASTER_EGGS: 'true',
      VITE_FEATURE_ENHANCED_UI: 'true',
    }
  },
  coreOnly: {
    name: 'Core Features Only',
    description: 'Essential visual enhancements without heavy effects',
    flags: {
      VITE_FEATURE_KANJI: 'false',
      VITE_FEATURE_GLITCH: 'true',
      VITE_FEATURE_HOLO: 'false',
      VITE_FEATURE_TRANSITIONS: 'false',
      VITE_FEATURE_CIRCUITS: 'false',
      VITE_FEATURE_PARALLAX: 'false',
      VITE_FEATURE_TYPOGRAPHY: 'true',
      VITE_FEATURE_LOADERS: 'true',
      VITE_FEATURE_EASTER_EGGS: 'false',
      VITE_FEATURE_ENHANCED_UI: 'true',
    }
  },
  gradualRollout: {
    name: 'Gradual Rollout (Phase 2)',
    description: 'Simulates gradual rollout - some features enabled',
    flags: {
      VITE_FEATURE_KANJI: 'false',
      VITE_FEATURE_GLITCH: 'true',
      VITE_FEATURE_HOLO: 'true',
      VITE_FEATURE_TRANSITIONS: 'false',
      VITE_FEATURE_CIRCUITS: 'true',
      VITE_FEATURE_PARALLAX: 'false',
      VITE_FEATURE_TYPOGRAPHY: 'true',
      VITE_FEATURE_LOADERS: 'true',
      VITE_FEATURE_EASTER_EGGS: 'false',
      VITE_FEATURE_ENHANCED_UI: 'true',
    }
  }
};

function backupEnvFile() {
  if (fs.existsSync(ENV_FILE)) {
    fs.copyFileSync(ENV_FILE, ENV_BACKUP);
    log('✓ Backed up .env.local', 'green');
    return true;
  }
  log('⚠ No .env.local file found', 'yellow');
  return false;
}

function restoreEnvFile() {
  if (fs.existsSync(ENV_BACKUP)) {
    fs.copyFileSync(ENV_BACKUP, ENV_FILE);
    fs.unlinkSync(ENV_BACKUP);
    log('✓ Restored .env.local', 'green');
    return true;
  }
  return false;
}

function updateEnvFile(flags) {
  let envContent = '';
  
  // Read existing env file to preserve other variables
  if (fs.existsSync(ENV_FILE)) {
    envContent = fs.readFileSync(ENV_FILE, 'utf8');
    
    // Remove existing feature flags
    envContent = envContent.replace(/# Feature Flags[\s\S]*?(?=\n\n|\n*$)/g, '');
  }
  
  // Add feature flags
  envContent += '\n\n# Feature Flags - Japanese Cyberpunk Enhancements\n';
  envContent += '# Set to \'true\' to enable, \'false\' or omit to disable\n';
  
  Object.entries(flags).forEach(([key, value]) => {
    envContent += `${key}=${value}\n`;
  });
  
  fs.writeFileSync(ENV_FILE, envContent);
}

function displayConfig(config) {
  log(`\nConfiguration: ${config.name}`, 'blue');
  log(`Description: ${config.description}`, 'yellow');
  log('\nFeature Flags:', 'cyan');
  
  Object.entries(config.flags).forEach(([key, value]) => {
    const symbol = value === 'true' ? '✅' : '❌';
    const featureName = key.replace('VITE_FEATURE_', '').toLowerCase();
    console.log(`  ${symbol} ${featureName}: ${value}`);
  });
}

function runTests() {
  logSection('🎌 Feature Flags Testing Script');
  
  log('This script will test different feature flag configurations.', 'yellow');
  log('After each configuration, you should manually verify the site works correctly.\n', 'yellow');
  
  // Backup current env file
  const hasBackup = backupEnvFile();
  
  try {
    // Test each configuration
    Object.entries(testConfigs).forEach(([key, config], index) => {
      logSection(`Test ${index + 1}/${Object.keys(testConfigs).length}: ${config.name}`);
      
      displayConfig(config);
      
      // Update env file
      updateEnvFile(config.flags);
      log('\n✓ Updated .env.local with test configuration', 'green');
      
      // Instructions
      log('\nNext Steps:', 'cyan');
      log('1. Restart your dev server (npm run dev)', 'yellow');
      log('2. Open http://localhost:5173 in your browser', 'yellow');
      log('3. Verify the following:', 'yellow');
      
      // Specific checks based on configuration
      if (key === 'allOff') {
        log('   - Site loads without errors', 'yellow');
        log('   - No visual enhancements visible', 'yellow');
        log('   - All basic functionality works', 'yellow');
      } else if (key === 'allOn') {
        log('   - All visual effects are visible', 'yellow');
        log('   - Kanji particles in background', 'yellow');
        log('   - Glitch effects on hover', 'yellow');
        log('   - Page transitions work', 'yellow');
        log('   - Easter eggs are functional', 'yellow');
      } else {
        log('   - Only enabled features are visible', 'yellow');
        log('   - Disabled features are not present', 'yellow');
        log('   - No console errors', 'yellow');
      }
      
      log('\n4. Check browser console for feature status log', 'yellow');
      log('5. Press Enter when ready to continue to next test...\n', 'yellow');
      
      // Wait for user input (in real usage)
      // For now, just display the config
    });
    
    logSection('✅ Test Configurations Generated');
    
    log('\nAll test configurations have been prepared.', 'green');
    log('The .env.local file has been updated with the last test configuration.', 'yellow');
    log('\nTo restore your original configuration, the backup is at:', 'cyan');
    log(ENV_BACKUP, 'blue');
    
  } catch (error) {
    log(`\n❌ Error during testing: ${error.message}`, 'red');
    
    // Restore backup on error
    if (hasBackup) {
      restoreEnvFile();
    }
  }
}

function displayManualTestChecklist() {
  logSection('📋 Manual Testing Checklist');
  
  log('For each configuration, verify:', 'cyan');
  
  const checks = [
    'Site loads without errors',
    'No console errors or warnings',
    'All navigation links work',
    'Page transitions (if enabled) are smooth',
    'Visual effects (if enabled) render correctly',
    'Performance is acceptable (check FPS in DevTools)',
    'Mobile view works correctly',
    'Accessibility features work (keyboard navigation, screen reader)',
    'Feature flags are logged correctly in console',
  ];
  
  checks.forEach((check, index) => {
    log(`${index + 1}. ${check}`, 'yellow');
  });
  
  log('\n\nPerformance Targets:', 'cyan');
  log('- Desktop: 60 FPS', 'yellow');
  log('- Mobile: 40+ FPS', 'yellow');
  log('- Load Time: < 2s', 'yellow');
  log('- No memory leaks', 'yellow');
}

function displayRollbackInstructions() {
  logSection('🔄 Rollback Instructions');
  
  log('If you need to restore your original configuration:', 'cyan');
  log('\n1. Copy the backup file:', 'yellow');
  log(`   cp .env.local.backup .env.local`, 'blue');
  log('\n2. Or manually edit .env.local and set flags as needed', 'yellow');
  log('\n3. Restart your dev server', 'yellow');
}

// Main execution
function main() {
  runTests();
  displayManualTestChecklist();
  displayRollbackInstructions();
  
  logSection('🎉 Testing Script Complete');
  
  log('Remember to:', 'cyan');
  log('1. Test each configuration thoroughly', 'yellow');
  log('2. Check browser console for errors', 'yellow');
  log('3. Verify performance metrics', 'yellow');
  log('4. Test on multiple browsers', 'yellow');
  log('5. Test on mobile devices', 'yellow');
  log('\nHappy testing! 🚀\n', 'green');
}

main();
