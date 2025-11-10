#!/usr/bin/env node
// scripts/test-newsletter-direct.js
// Script para probar la suscripción directa al newsletter

const testEmail = process.argv[2] || 'test@example.com';
const testName = process.argv[3] || 'Test User';

console.log('🧪 Probando suscripción directa al newsletter...\n');
console.log('📧 Email:', testEmail);
console.log('👤 Nombre:', testName);
console.log('');

const testData = {
  email: testEmail,
  name: testName
};

console.log('📤 Enviando solicitud...\n');

fetch('http://localhost:5173/api/newsletter-subscribe-direct', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
  .then(res => {
    console.log('📊 Status:', res.status, res.statusText);
    return res.json();
  })
  .then(data => {
    console.log('\n📬 Respuesta:');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n✅ ¡Éxito! Revisa el email:', testEmail);
      console.log('');
      console.log('Verifica:');
      console.log('1. Bandeja de entrada');
      console.log('2. Carpeta de spam/promociones');
      console.log('3. Asunto: "¡Bienvenido al Newsletter de KAINET! 🚀"');
    } else {
      console.log('\n❌ Error:', data.message || data.error);
    }
  })
  .catch(error => {
    console.error('\n❌ Error de red:', error.message);
    console.log('\nAsegúrate de que:');
    console.log('1. El servidor de desarrollo esté corriendo (npm run dev)');
    console.log('2. Las variables de entorno estén configuradas');
  });
