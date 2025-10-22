# 📰 KAINET Weekly Post Generator

Generador automático de posts de blog semanales con inteligencia artificial.

**Genera 2 posts semanales:**
1. 🏢 **Automatización Empresarial** - Noticias de automatización global
2. 🔧 **DevOps & Herramientas** - Tendencias en deployment y infrastructure

---

## 🚀 Características

✅ **Noticias Reales**
- Agrega de Hacker News, Reddit, ArXiv
- Filtrado automático por tópico
- Búsqueda por keywords relevantes

✅ **IA Inteligente**
- Usa Gemini 2.5-PRO (gratis con Google AI Studio)
- Análisis profundo de noticias
- Contenido original y de calidad

✅ **Guardado Automático**
- Primario: Supabase (BD PostgreSQL)
- Fallback: `blogPosts.js` local
- Sin intervención manual

✅ **MCP Server Compatible**
- Se integra con `index.js` (MCP Server)
- Puede ejecutarse como script standalone

---

## 📋 Requisitos Previos

### 1. Google AI Studio (Gemini API)

Gratis - Google da tokens ilimitados:

1. Ve a https://aistudio.google.com/app/apikeys
2. Crea una nueva API Key
3. Copia la key

### 2. Supabase

Para guardar posts automáticamente en BD:

1. Tu proyecto Supabase: `https://tqdencmzezjevnntifos.supabase.co`
2. Ve a: **Settings > API > Service Role Key**
3. Copia la Service Role Key

### 3. Variables de Entorno

Crea archivo `.env` en `mcp-server/news-aggregator/`:

```bash
# Copiar desde .env.example y completar
cp .env.example .env
```

Edita `.env` con tus keys:

```env
GEMINI_API_KEY=tu-key-de-gemini
SUPABASE_URL=https://tqdencmzezjevnntifos.supabase.co
SUPABASE_SERVICE_KEY=tu-service-role-key
```

### 4. Dependencias Instaladas

```bash
cd mcp-server/news-aggregator
npm install
```

---

## 💾 Setup Supabase (Una sola vez)

Antes de generar posts, ejecuta los SQL scripts:

### 1. Tabla `blog_posts`

En Supabase SQL Editor:

```sql
-- Copiar y pegar desde:
-- /supabase/create-blog-posts-table.sql
```

### 2. Tabla `projects` (Opcional)

```sql
-- Copiar y pegar desde:
-- /supabase/create-projects-table.sql
```

---

## 🏃 Uso

### Generar 2 Posts Semanales

```bash
cd mcp-server/news-aggregator
npm run generate-weekly
```

**Output esperado:**

```
============================================================
🚀 KAINET Weekly Post Generator
📅 Semana 43 - 21/10/2025
============================================================

────────────────────────────────────────────────────────────
POST 1: AUTOMATIZACIÓN EMPRESARIAL
────────────────────────────────────────────────────────────

📰 Agregando noticias para: Automatización Empresarial...
✅ Encontradas 15 noticias relevantes

🤖 Generando contenido con Gemini 2.5-PRO...
✅ Post guardado en Supabase
✅ Post guardado en blogPosts.js local
📝 Post creado: "RPA en 2025: Automatización Inteligente..."
📊 Slug: rpa-en-2025-automatizacion-inteligente-semana-43

────────────────────────────────────────────────────────────
POST 2: DEVOPS & HERRAMIENTAS
────────────────────────────────────────────────────────────

📰 Agregando noticias para: DevOps & Herramientas...
✅ Encontradas 12 noticias relevantes

🤖 Generando contenido con Gemini 2.5-PRO...
✅ Post guardado en Supabase
✅ Post guardado en blogPosts.js local
📝 Post creado: "Kubernetes 2025: Tendencias en Orquestación..."
📊 Slug: kubernetes-2025-tendencias-en-orquestacion-semana-43

============================================================
✅ Generación completada
📊 Posts creados: 2
💾 Guardados en: Supabase + blogPosts.js
============================================================
```

---

## 🔗 Integración con MCP Server

El `index.js` (MCP Server) puede llamar a `generate-weekly-post.js`:

```javascript
// En index.js handler para "generate_weekly_blog_post"
import { generateWeeklyPosts } from './generate-weekly-post.js';

// Cuando se llama el tool
const posts = await generateWeeklyPosts();
```

Esto permite que el MCP server genere posts bajo demanda.

---

## 🧪 Testing Local

### Ver Posts Generados

```bash
# Los posts se agregan a:
cat src/data/blogPosts.js
```

### Verificar en npm run dev

```bash
# Terminal 1: Dev server
npm run dev

# Terminal 2: Generar posts
cd mcp-server/news-aggregator
npm run generate-weekly

# Luego abre http://localhost:5173/blog
# Deberías ver los 2 nuevos posts
```

---

## 🔍 Troubleshooting

### ❌ "GEMINI_API_KEY not found"

**Solución:** Crea `.env` en `mcp-server/news-aggregator/` con tu key

```bash
cp .env.example .env
# Edita .env y pega tu key
```

### ❌ "Invalid JSON from Gemini"

**Solución:** Gemini puede devolver formato no esperado ocasionalmente
- Ejecuta nuevamente
- Verifica la API key está correcta
- Revisa que no excedas rate limit

### ❌ "Supabase: 23505 duplicate key"

**Solución:** Ya existe un post con ese slug
- Los posts con el mismo slug se actualizan (no se duplican)
- Esto es comportamiento esperado gracias a `ON CONFLICT`

### ⚠️ "SUPABASE_SERVICE_KEY not configured"

**Solución:** Posts se guardan solo localmente
- Es OK para testing
- Para producción, configura la Service Key
- Verifica que `blog_posts` tabla existe en Supabase

---

## 📊 Categorías de Posts

### 🏢 Automatización Empresarial

**Keywords:** automation, rpa, workflow, zapier, make, n8n, integración

Noticias sobre:
- Enterprise RPA (UiPath, Blue Prism, Automation Anywhere)
- Workflow automation (Zapier, Make, n8n)
- Business process automation (BPA)
- Integración de sistemas

### 🔧 DevOps & Herramientas

**Keywords:** devops, ci/cd, kubernetes, docker, terraform, ansible, github actions

Noticias sobre:
- Infrastructure as Code (Terraform, Ansible)
- Container orchestration (Kubernetes)
- CI/CD pipelines (GitHub Actions, GitLab CI)
- Deployment automation
- Monitoring & observability

---

## 🎯 Próximos Pasos

1. **Setup Supabase** (una sola vez)
   - Ejecuta SQL scripts en Supabase dashboard
   - Configura Service Key

2. **Configura variables** (`.env`)
   - GEMINI_API_KEY
   - SUPABASE_SERVICE_KEY

3. **Prueba local**
   - `npm run generate-weekly`
   - Verifica posts en `/blog` con `npm run dev`

4. **Automatiza** (Opcional)
   - Cron job para ejecutar `generate-weekly` semanalmente
   - GitHub Actions para automatización
   - Vercel cron functions

---

## 📁 Estructura de Archivos

```
mcp-server/news-aggregator/
├── package.json
├── .env                         (Tu config local - NO commitear)
├── .env.example                 (Plantilla)
├── index.js                     (MCP Server)
├── generate-weekly-post.js      (Generator con IA - EL PRINCIPAL)
├── README.md                    (Este archivo)
└── node_modules/
```

---

## 🛠️ API Referencia

### `generateWeeklyPosts()`

Genera 2 posts semanales

```javascript
import { generateWeeklyPosts } from './generate-weekly-post.js';

const posts = await generateWeeklyPosts();
// Retorna array con 2 posts generados
```

---

## 📝 Formato de Posts

Cada post tiene:

```javascript
{
  id: 1729500000123,
  slug: "titulo-del-post-semana-43",
  title: "Título atractivo del post",
  excerpt: "Resumen de 150-200 caracteres",
  content: "Contenido en Markdown (1500-2000 palabras)",
  author: "KAINET AI",
  date: "2025-10-21",
  readTime: "8 min",
  category: "Automatización" | "DevOps",
  image: "https://placehold.co/800x500...",
  featured: false
}
```

---

## ⚙️ Configuración Avanzada

### Cambiar Modelo de Gemini

En `generate-weekly-post.js` línea 38:

```javascript
// De PRO a FLASH (más rápido, menos caro)
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// O usar el última disponible
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
```

### Agregar Más Fuentes

Edita `CONFIG.categories` en `generate-weekly-post.js`:

```javascript
news_category: {
  keywords: ['keyword1', 'keyword2'],
  sources: ['Hacker News', 'Reddit'],
  title: 'Category Title',
  category: 'CategorySlug',
}
```

### Cambiar Número de Posts

En función `generateWeeklyPosts()`:

```javascript
// Para agregar una 3ª categoría (ej: Machine Learning)
const mlNews = await aggregateNews('ML', CONFIG.categories.ml.keywords);
// ... generar y guardar
```

---

## 📞 Soporte

Para problemas:

1. Revisa los logs en consola
2. Verifica `.env` está correcto
3. Valida que Supabase table existe
4. Prueba con `gemini-2.5-flash` si tiene problemas con PRO

---

**Última actualización:** Oct 21, 2025  
**Versión:** 2.0 - Consolidada con IA  
**Autor:** Marco Domínguez (KAINET)

---

*Generador de posts completamente automatizado con Gemini 2.5-PRO* ✨
