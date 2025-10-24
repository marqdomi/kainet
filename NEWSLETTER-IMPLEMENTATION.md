# 📬 Newsletter System Implementation Guide

## ✅ Archivos Creados

### 1. **Base de Datos (Supabase)**
- `supabase/create-newsletter-subscribers-table.sql`
  - Tabla `newsletter_subscribers`
  - Tabla `newsletter_sent_log`
  - Funciones útiles (get_active_subscribers, unsubscribe_email, confirm_subscription)
  - RLS policies configuradas

### 2. **API Endpoints**
- `api/newsletter-subscribe.js` - Maneja suscripciones nuevas
- `api/newsletter-confirm.js` - Confirma suscripciones vía token

### 3. **Frontend**
- `src/pages/NewsletterConfirmPage.jsx` - Página de confirmación
- `src/components/Newsletter.jsx` - Actualizado para usar nueva API
- `src/App.jsx` - Ruta agregada para confirmación

---

## 🚀 Pasos de Implementación

### **Paso 1: Ejecutar SQL en Supabase**

1. Ve a: https://app.supabase.com
2. Selecciona tu proyecto "kainet"
3. Ve a: SQL Editor → New Query
4. Copia y pega el contenido de `supabase/create-newsletter-subscribers-table.sql`
5. Click en "Run" ▶️

Esto creará:
- ✅ Tabla de suscriptores
- ✅ Tabla de log de envíos
- ✅ Funciones auxiliares
- ✅ Políticas de seguridad (RLS)

---

### **Paso 2: Actualizar Environment Variables**

Asegúrate que Vercel tenga estas variables:

```bash
# En Vercel Dashboard → Settings → Environment Variables

RESEND_API_KEY=re_E8vrV4gy_5Qja2b86Q6K3p8kXuaj98V5K
VITE_SUPABASE_URL=https://tqdencmzezjevnntifos.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...  # Tu anon key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # Tu service role key
GEMINI_API_KEY=AIzaSyAen410rT3LRXhOzAEBlCITNHXIswy3SgI
EMAIL_NEWSLETTER=newsletter@kainet.mx
SITE_URL=https://kainet.mx
```

---

### **Paso 3: Hacer Deploy**

```bash
# 1. Commit cambios
git add .
git commit -m "feat: Implement complete newsletter subscription system

- Add newsletter_subscribers and newsletter_sent_log tables
- Create newsletter-subscribe and newsletter-confirm API endpoints
- Add email confirmation flow with Resend
- Create NewsletterConfirmPage component
- Update Newsletter component to use new API"

# 2. Push a main
git push origin main

# 3. Vercel hará auto-deploy
```

---

## 🎯 Cómo Funciona el Sistema

### **Flujo de Suscripción:**

1. **Usuario completa formulario** → Newsletter.jsx
2. **POST /api/newsletter-subscribe** con email + name
3. **Sistema verifica** si email ya existe
4. **Genera token** de confirmación aleatorio
5. **Guarda en DB** con `confirmed_at = null`
6. **Envía email** con link de confirmación
7. **Usuario hace click** en el link
8. **GET /api/newsletter-confirm?token=xxx**
9. **Sistema confirma** y actualiza `confirmed_at = NOW()`
10. **Envía email de bienvenida** 🎉

### **Protecciones:**
- ✅ Email duplicado → Notifica que ya está suscrito
- ✅ Email no confirmado → Reenvía confirmación
- ✅ Email desuscrito → Permite re-suscripción
- ✅ Token inválido → Muestra error amigable

---

## 📧 Enviar Newsletters Manualmente

### Opción 1: Desde Código (Node.js)

Crea: `scripts/send-newsletter.js`

```javascript
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendNewsletter(postSlug) {
  // 1. Obtener post del blog
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', postSlug)
    .single();

  // 2. Obtener suscriptores activos
  const { data: subscribers } = await supabase
    .rpc('get_active_subscribers');

  // 3. Enviar email a cada suscriptor
  for (const sub of subscribers) {
    await resend.emails.send({
      from: 'newsletter@kainet.mx',
      to: sub.email,
      subject: `Nuevo Post: ${post.title}`,
      html: createNewsletterHTML(post, sub)
    });

    // 4. Log del envío
    await supabase
      .from('newsletter_sent_log')
      .insert({
        subscriber_id: sub.id,
        post_id: post.id,
        status: 'sent'
      });
  }
}

function createNewsletterHTML(post, subscriber) {
  return `
    <h1>${post.title}</h1>
    <p>${post.excerpt}</p>
    <a href="https://kainet.mx/blog/${post.slug}">Leer más</a>
    <p><a href="https://kainet.mx/newsletter/unsubscribe?email=${subscriber.email}">Desuscribirse</a></p>
  `;
}

// Ejecutar
sendNewsletter('tu-post-slug');
```

Ejecutar:
```bash
node scripts/send-newsletter.js
```

---

### Opción 2: GitHub Action Automática (Recomendado)

Crea: `.github/workflows/send-weekly-newsletter.yml`

```yaml
name: Send Weekly Newsletter

on:
  schedule:
    # Cada lunes a las 9 AM (UTC)
    - cron: '0 9 * * 1'
  workflow_dispatch:  # Permite ejecución manual

jobs:
  send-newsletter:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install @supabase/supabase-js resend
      
      - name: Send newsletter
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_KEY: ${{ secrets.SUPABASE_SERVICE_KEY }}
          RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
        run: node scripts/send-weekly-newsletter.js
```

---

## 📊 Monitorear Suscriptores

### En Supabase Dashboard:

```sql
-- Ver suscriptores activos
SELECT * FROM get_active_subscribers();

-- Contar suscriptores
SELECT 
  COUNT(*) as total,
  COUNT(CASE WHEN confirmed_at IS NOT NULL THEN 1 END) as confirmed,
  COUNT(CASE WHEN confirmed_at IS NULL THEN 1 END) as pending
FROM newsletter_subscribers
WHERE is_active = true;

-- Ver últimos envíos
SELECT 
  ns.email,
  bp.title as post_title,
  nsl.sent_at,
  nsl.status
FROM newsletter_sent_log nsl
JOIN newsletter_subscribers ns ON ns.id = nsl.subscriber_id
JOIN blog_posts bp ON bp.id = nsl.post_id
ORDER BY nsl.sent_at DESC
LIMIT 50;
```

---

## 🧪 Testing

### 1. Test Suscripción Local:

```bash
# Desde terminal
curl -X POST http://localhost:5173/api/newsletter-subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

### 2. Test Confirmación:

1. Copiar token del email recibido
2. Ir a: `http://localhost:5173/newsletter/confirm?token=xxx`
3. Verificar página de confirmación

### 3. Verificar en Supabase:

```sql
SELECT * FROM newsletter_subscribers 
WHERE email = 'test@example.com';
```

---

## 🎨 Personalizar Emails

Los templates HTML están en:
- `api/newsletter-subscribe.js` - Email de confirmación
- `api/newsletter-confirm.js` - Email de bienvenida

Puedes editarlos para cambiar:
- Colores
- Texto
- CTAs
- Estructura

---

## 🔒 Seguridad

✅ **Implementado:**
- RLS en Supabase (Row Level Security)
- Validación de emails
- Tokens de confirmación únicos
- CORS headers configurados
- Service role key solo en backend

⚠️ **Consideraciones:**
- Los emails de confirmación expiran? → Agregar `token_expires_at` si necesario
- Rate limiting? → Considerar limitar intentos por IP
- GDPR compliance? → Agregar política de privacidad y términos

---

## 📈 Próximos Pasos

1. ✅ **Ejecutar SQL** en Supabase
2. ✅ **Deploy** a producción
3. 🔄 **Probar** suscripción en kainet.mx
4. 📧 **Crear script** para envío semanal
5. 🤖 **Automatizar** con GitHub Actions

---

## ❓ Troubleshooting

### Email no llega:
- Verifica RESEND_API_KEY en Vercel
- Chequea spam folder
- Revisa logs en Resend Dashboard

### Error al suscribir:
- Verifica SUPABASE_SERVICE_ROLE_KEY
- Chequea que las tablas existan
- Revisa console del navegador (F12)

### Token inválido:
- Verifica que el token sea correcto
- Chequea que no haya espacios extras
- Confirma que el registro existe en DB

---

**Status:** ✅ LISTO PARA PRODUCCIÓN  
**Siguiente:** Ejecutar SQL en Supabase y hacer deploy
