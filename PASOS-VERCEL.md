# 🚀 Pasos para Configurar Variables de Entorno en Vercel

## ⚡ Acción Inmediata Requerida

Los cambios ya están desplegados, pero **DEBES configurar las variables de entorno** para que el formulario funcione.

## 📋 Paso a Paso

### 1. Ir a Vercel Dashboard

Abre: https://vercel.com/dashboard

### 2. Seleccionar tu Proyecto

Busca y haz clic en: **kainet-final** (o como se llame tu proyecto)

### 3. Ir a Settings

En el menú lateral izquierdo, haz clic en: **Settings**

### 4. Ir a Environment Variables

En el menú de Settings, haz clic en: **Environment Variables**

### 5. Agregar las Variables

Haz clic en el botón **Add New** y agrega cada una de estas variables:

#### Variable 1: RESEND_API_KEY
```
Name: RESEND_API_KEY
Value: re_E8vrV4gy_5Qja2b86Q6K3p8kXuaj98V5K
```
✅ Marca: Production, Preview, Development

#### Variable 2: EMAIL_FROM
```
Name: EMAIL_FROM
Value: newsletter@kainet.mx
```
✅ Marca: Production, Preview, Development

#### Variable 3: EMAIL_CONTACT
```
Name: EMAIL_CONTACT
Value: contacto@kainet.mx
```
✅ Marca: Production, Preview, Development

#### Variable 4: EMAIL_NEWSLETTER
```
Name: EMAIL_NEWSLETTER
Value: newsletter@kainet.mx
```
✅ Marca: Production, Preview, Development

#### Variable 5: SITE_URL (opcional)
```
Name: SITE_URL
Value: https://kainet.mx
```
✅ Marca: Production, Preview, Development

### 6. Guardar

Haz clic en **Save** después de agregar cada variable.

### 7. Redeploy (Opcional)

Si el deploy automático ya terminó, puedes forzar un nuevo deploy:

1. Ve a la pestaña **Deployments**
2. Haz clic en los tres puntos (...) del último deployment
3. Selecciona **Redeploy**
4. Confirma

## ⏱️ Tiempo de Espera

- El deploy automático tarda: **2-3 minutos**
- Después de configurar las variables: **1-2 minutos** más

## ✅ Verificar que Funciona

### Opción 1: Desde el Navegador

1. Ve a: https://kainet.mx/#contact
2. Llena el formulario
3. Envía
4. Deberías ver el modal de confirmación
5. Revisa tu email en contacto@kainet.mx

### Opción 2: Con curl (Terminal)

```bash
curl -X POST https://kainet.mx/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "contacto@kainet.mx",
    "message": "Mensaje de prueba"
  }'
```

Deberías ver:
```json
{
  "success": true,
  "message": "¡Mensaje enviado exitosamente! Te responderemos pronto."
}
```

## 🔍 Verificar Dominio en Resend

**IMPORTANTE**: También necesitas verificar que tu dominio esté configurado en Resend:

1. Ve a: https://resend.com/domains
2. Busca: `kainet.mx`
3. Debe tener un ✅ verde (verificado)

Si NO está verificado:
1. Haz clic en el dominio
2. Copia los registros DNS que te muestra
3. Agrégalos en tu proveedor de DNS (GoDaddy, Cloudflare, etc.)
4. Espera 5-10 minutos
5. Haz clic en "Verify" en Resend

## 🆘 Si Algo Sale Mal

### Ver Logs en Vercel

1. Ve a tu proyecto en Vercel
2. Haz clic en el último deployment
3. Ve a la pestaña **Functions**
4. Busca `/api/contact`
5. Haz clic para ver los logs

### Errores Comunes

**Error: "RESEND_API_KEY is not defined"**
- Solución: Configura la variable en Vercel y redeploy

**Error: "Domain not verified"**
- Solución: Verifica el dominio en Resend

**Error 404: "Not Found"**
- Solución: Espera a que termine el deploy (puede tardar 2-3 min)

## 📞 Contacto de Emergencia

Si después de seguir todos los pasos sigue sin funcionar:

1. Revisa los logs en Vercel (paso anterior)
2. Verifica que todas las variables estén configuradas
3. Verifica que el dominio esté verificado en Resend
4. Espera 5 minutos y prueba de nuevo

---

## ⏰ Checklist Rápido (5 minutos)

- [ ] Abrir Vercel Dashboard
- [ ] Ir a Settings → Environment Variables
- [ ] Agregar RESEND_API_KEY
- [ ] Agregar EMAIL_FROM
- [ ] Agregar EMAIL_CONTACT
- [ ] Agregar EMAIL_NEWSLETTER
- [ ] Agregar SITE_URL
- [ ] Guardar todo
- [ ] Esperar 2-3 minutos
- [ ] Probar formulario en https://kainet.mx/#contact
- [ ] ✅ ¡Listo!

---

**Prioridad**: 🔴 CRÍTICA
**Tiempo**: ⏱️ 5 minutos
**Dificultad**: ⭐ Muy Fácil
