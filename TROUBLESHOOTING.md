# 🔧 Guía de Troubleshooting - Sistema de Emails

## ❌ Problema 1: Newsletter no envía emails

### Diagnóstico paso a paso:

1. **Verificar variables de entorno en Vercel:**
   - Ve a: Vercel Dashboard → Tu Proyecto → Settings → Environment Variables
   - Confirma que existen TODAS estas variables:
     ```
     RESEND_API_KEY
     EMAIL_FROM
     EMAIL_NEWSLETTER
     EMAIL_CONTACT
     SITE_URL
     ```

2. **Verificar logs en Vercel:**
   - Ve a: Vercel Dashboard → Tu Proyecto → Deployments → Latest → Functions
   - Busca: `/api/newsletter`
   - Revisa errores en los logs

3. **Verificar dominio en Resend:**
   - Ve a: resend.com → Domains
   - Confirma que `kainet.mx` está "Verified" ✅
   - Verifica que `newsletter@kainet.mx` esté configurado

4. **Verificar que el frontend llame correctamente:**
   - Abre DevTools en tu navegador (F12)
   - Ve a la pestaña Network
   - Suscríbete al newsletter
   - Busca la petición a `/api/newsletter`
   - Revisa la respuesta (debería ser 200 OK)

### Soluciones:

**Si falta alguna variable de entorno:**
- Agrégala en Vercel y redeploya

**Si el dominio no está verificado:**
- Espera unos minutos (puede tomar hasta 24h)
- Verifica los registros DNS en tu proveedor

**Si hay error 500:**
- Revisa los logs de Vercel Functions
- Verifica que la API key de Resend sea correcta

**Si hay error 400:**
- El email enviado no es válido
- Revisa la consola del navegador para más detalles

---

## 📝 Problema 2: Posts del blog se pierden con cada deploy

### Causa raíz:
Los posts están en `src/data/blogPosts.js` (archivo estático), pero parece que se están **sobrescribiendo** en cada deploy automático.

### ¿Por qué pasa esto?
Si tienes un script automatizado que genera posts (como `mcp-server/news-aggregator/`), este probablemente está:
1. Generando un nuevo post cada semana
2. REEMPLAZANDO el archivo `blogPosts.js` completo
3. Perdiendo los posts anteriores

### Soluciones:

#### Opción 1: Base de datos (Recomendado para producción)
Migrar a una base de datos real:
- **Supabase** (PostgreSQL gratis)
- **MongoDB Atlas** (NoSQL gratis)
- **Vercel Postgres** (integración directa)
- **PlanetScale** (MySQL serverless)

#### Opción 2: CMS Headless (Fácil de usar)
- **Sanity.io** (gratis hasta 100k requests)
- **Strapi** (open source)
- **Contentful** (gratis para desarrollo)

#### Opción 3: Fix del script de automatización
Si usas el script `generate-automation-post.js`, modificarlo para:
1. Leer los posts existentes
2. Agregar el nuevo post al inicio del array
3. Guardar sin perder los anteriores

#### Opción 4: Git como base de datos (temporal)
- Hacer que el script haga commit de los nuevos posts
- No sobreescribir, sino agregar

---

## 🎯 Próximos pasos inmediatos:

1. ✅ Revisa los logs de Vercel Functions para el newsletter
2. ✅ Verifica las variables de entorno
3. ✅ Decide qué solución implementar para el blog (recomiendo Opción 1 o 2)

---

**Documentado:** 12 Oct 2025
