#!/bin/bash

# Script para probar el endpoint de contacto localmente

echo "🧪 Probando endpoint de contacto..."
echo ""

# Verificar que las variables de entorno estén configuradas
if [ -z "$RESEND_API_KEY" ]; then
  echo "⚠️  RESEND_API_KEY no está configurada"
  echo "Cargando desde .env..."
  export $(cat .env | grep -v '^#' | xargs)
fi

echo "📧 Enviando mensaje de prueba..."
echo ""

# Hacer la petición
curl -X POST http://localhost:5173/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Prueba de contacto",
    "message": "Este es un mensaje de prueba para verificar que el sistema de contacto funciona correctamente."
  }' \
  -w "\n\nHTTP Status: %{http_code}\n"

echo ""
echo "✅ Prueba completada"
