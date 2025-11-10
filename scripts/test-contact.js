// scripts/test-contact.js
// Script para probar el endpoint de contacto

const handler = require('../api/contact.js');

// Mock de request y response
const mockReq = {
  method: 'POST',
  body: {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Prueba de contacto',
    message: 'Este es un mensaje de prueba para verificar que el sistema de contacto funciona correctamente.'
  }
};

const mockRes = {
  status: function(code) {
    this.statusCode = code;
    return this;
  },
  json: function(data) {
    console.log('\n📧 RESPUESTA DEL SERVIDOR:');
    console.log('Status Code:', this.statusCode);
    console.log('Response:', JSON.stringify(data, null, 2));
    return this;
  }
};

console.log('🧪 Probando endpoint de contacto...\n');
console.log('📝 Datos de prueba:');
console.log(JSON.stringify(mockReq.body, null, 2));
console.log('\n⏳ Enviando...\n');

handler(mockReq, mockRes)
  .then(() => {
    console.log('\n✅ Prueba completada');
  })
  .catch((error) => {
    console.error('\n❌ Error en la prueba:', error);
    process.exit(1);
  });
