# 🔧 Solución al Problema del Formulario de Contacto

## 🎯 Problema

El formulario de contacto en https://kainet.mx no funciona porque las rutas de API están siendo bloqueadas por la configuración de Vercel.

## ✅ Cambios Realizados

### 1. Actualizado `vercel.json`

**Antes:**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Después:**
```json
{
  "rewrites": [
    { 
      "source": "/((?!api).*)", 
      "destination": "/" 
    }
  ]
}
```

Esto permite que las rutas `/api/*` funcionen correctamente.

### 2. Creado `api/package.json`

Nuevo archivo para que Vercel sepa cómo manejar las funciones serverless:

```json
{
  "type": "commonjs",
  "dependencies": {
    "resend": "^6.1.2"
  }
}
```

### 3. Agregados Headers CORS en `api/contact.js`

Para evitar problemas de CORS en producción.

## 🚀 Pasos para Desplegar

### 1. Hacer Commit y Push

```bash
git add .
git commit -m "fix: corregir formulario de contacto - configurar API routes"
git push origin main
```

### 2. Configurar Variables de Entorno en Vercel

Ve a: https://vercel.com/dashboard → Tu Proyecto → Settings → Environment Variables

Agrega estas variables (para **Production**, **Preview** y **Development**):

```
RESEND_API_KEY=re_E8vrV4gy_5Qja2b86Q6K3p8kXuaj98V5K
EMAIL_FROM=newsletter@kainet.mx
EMAIL_CONTACT=contacto@kainet.mx
EMAIL_NEWSLETTER=newsletter@kainet.mx
SITE_URL=https://kainet.mx
```

### 3. Verificar Dominio en Resend

1. Ve a: https://resend.com/domains
2. Verifica que `kainet.mx` esté verificado (con checkmark verde)
3. Si no está verificado, agrega los registros DNS que te indique Resend

### 4. Esperar el Deploy

Vercel automáticamente hará un nuevo deploy después del push. Espera a que termine (2-3 minutos).

## 🧪 Probar el Formulario

1. Ve a: https://kainet.mx/#contact
2. Llena el formulario:
   - **Nombre**: Tu nombre
   - **Email**: contacto@kainet.mx (o tu email)
   - **Asunto**: Prueba
   - **Mensaje**: Mensaje de prueba
3. Haz clic en **Enviar**
4. Deberías ver un modal de confirmación ✓
5. Revisa tu email en `contacto@kainet.mx`

## 📧 Qué Esperar

Cuando alguien envía el formulario:

1. **El cliente recibe**: Un email de confirmación automático
2. **Tú recibes en contacto@kainet.mx**: El mensaje completo con:
   - Nombre del cliente
   - Email del cliente
   - Asunto
   - Mensaje
   - Botón para responder directamente

## ⚠️ Si Algo Sale Mal

### Error 404 en `/api/contact`

- Verifica que `vercel.json` tenga la configuración correcta
- Haz un nuevo deploy

### Error 500

- Verifica las variables de entorno en Vercel
- Revisa los logs: Vercel Dashboard → Tu Deploy → Functions → `/api/contact`

### No llegan los emails

- Verifica que `RESEND_API_KEY` esté configurada
- Verifica que el dominio esté verificado en Resend
- Revisa la bandeja de spam

### Probar la API directamente

```bash
curl -X POST https://kainet.mx/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "message": "Mensaje de prueba desde curl"
  }'
```

Deberías recibir:
```json
{
  "success": true,
  "message": "¡Mensaje enviado exitosamente! Te responderemos pronto."
}
```

## 📝 Checklist

- [ ] Hacer commit y push de los cambios
- [ ] Configurar variables de entorno en Vercel
- [ ] Verificar dominio en Resend
- [ ] Esperar deploy de Vercel
- [ ] Probar formulario en https://kainet.mx
- [ ] Verificar que lleguen los emails

## 🎉 Resultado Final

Una vez completados estos pasos, los clientes podrán:

- ✅ Enviar mensajes desde el formulario de contacto
- ✅ Recibir confirmación automática por email
- ✅ Tú recibirás todos los mensajes en contacto@kainet.mx
- ✅ Podrás responder directamente desde tu email

---

**Tiempo estimado**: 10-15 minutos

**Dificultad**: Fácil ⭐

**Prioridad**: 🔴 ALTA (los clientes no pueden contactarte actualmente)
