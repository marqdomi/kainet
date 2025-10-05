# 🤖 Sistema de Automatización de Blog con MCP

Sistema automatizado que genera posts semanales de noticias de IA para el blog de KAINET usando Model Context Protocol (MCP).

## 🎯 Características

- ✅ **Agregación Automática**: Obtiene noticias de Hacker News, Reddit y ArXiv
- ✅ **Filtrado Inteligente**: Solo noticias relevantes para IA y automatización
- ✅ **Curación Alineada**: Contenido alineado con la visión de KAINET
- ✅ **Publicación Semanal**: GitHub Actions ejecuta cada lunes automáticamente
- ✅ **Preview Manual**: Puedes revisar antes de publicar
- ✅ **MCP Compatible**: Funciona con Claude Desktop y otros clientes MCP

---

## 📋 Requisitos Previos

```bash
# Node.js 18+
node --version

# Git configurado
git --version
```

---

## 🚀 Instalación

### 1. Instalar dependencias del servidor MCP

```bash
cd mcp-server/news-aggregator
npm install
```

### 2. Probar el agregador

```bash
# Test rápido de las APIs
npm run test-aggregate
```

Deberías ver:
```
🧪 Probando agregador de noticias KAINET...

📰 1. Probando Hacker News API...
✅ Hacker News: 500 historias disponibles

🤖 2. Probando Reddit API...
✅ Reddit: 5 posts obtenidos
   Primer post: "New AI breakthrough..."

📚 3. Probando ArXiv API...
✅ ArXiv: 3 papers encontrados

✅ Todos los tests completados!
```

---

## 💻 Uso del Servidor MCP

### Opción 1: Configurar en Claude Desktop

Edita `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "kainet-news": {
      "command": "node",
      "args": [
        "/Users/marco.dominguez/Projects/kainet-final/mcp-server/news-aggregator/index.js"
      ]
    }
  }
}
```

Reinicia Claude Desktop y verás 3 nuevos tools:
- `aggregate_weekly_ai_news`
- `generate_weekly_blog_post`
- `preview_blog_post`

### Opción 2: Uso Manual (Script Node.js)

Crea `generate-post.js`:

```javascript
import { spawn } from 'child_process';

const weekNumber = Math.ceil((new Date() - new Date(new Date().getFullYear(), 0, 1)) / 604800000);

const mcp = spawn('node', ['index.js']);

// Enviar request al servidor MCP
const request = {
  jsonrpc: '2.0',
  method: 'tools/call',
  params: {
    name: 'generate_weekly_blog_post',
    arguments: {
      weekNumber,
      autoPublish: true
    }
  },
  id: 1
};

mcp.stdin.write(JSON.stringify(request) + '\n');

mcp.stdout.on('data', (data) => {
  console.log('Respuesta:', data.toString());
});
```

Ejecutar:
```bash
node generate-post.js
```

---

## ⚙️ Automatización con GitHub Actions

### Configuración

El workflow ya está configurado en `.github/workflows/weekly-ai-news.yml`

**Ejecuta automáticamente:**
- Cada lunes a las 9:00 AM UTC
- Agrega noticias de la semana
- Genera post markdown
- Hace commit y push al repo
- Vercel hace auto-deploy

### Ejecución Manual

1. Ve a tu repo en GitHub
2. Navega a **Actions** → **Weekly AI News Blog Post**
3. Click en **Run workflow**
4. Opciones:
   - **Week Number**: Número de semana (1-52) o vacío para auto-calcular
   - **Dry Run**: ✅ para solo preview, ❌ para publicar

### Ver Logs

```bash
# En GitHub Actions, verás:
📰 Weekly AI News Post

- Week Number: 40
- Dry Run: false
- Triggered by: schedule

✅ Post publicado y commiteado
```

---

## 📝 Estructura del Post Generado

```javascript
{
  id: 1728000000000,
  slug: 'ia-semanal-semana-40-2025',
  title: 'IA Semanal: Lo Más Destacado en Inteligencia Artificial (Semana 40)',
  excerpt: 'Resumen curado de las noticias más importantes...',
  author: 'KAINET AI Bot',
  date: '2025-10-04',
  readTime: '6 min',
  category: 'IA',
  image: 'https://placehold.co/800x500/0a0a0a/00E5FF?text=IA+Semana+40',
  featured: false,
  content: `
# Lo Más Destacado en IA - Semana 40

Esta semana en inteligencia artificial...

## 🚀 Principales Desarrollos

### 1. [Título de la noticia principal]
Descripción y análisis...

**Fuente:** [Hacker News](link) • Score: 450

---

## 📚 Papers Destacados de ArXiv

- **[Paper Title](link)**
  Abstract summary...

---

## 💬 Lo Más Comentado en la Comunidad

- **[Discussion Title](link)**
  *Reddit (r/MachineLearning)* • 350 puntos

---

## 🎯 Reflexión KAINET

Estos desarrollos reflejan...
  `
}
```

---

## 🎨 Personalización

### Cambiar Fuentes de Noticias

Edita `mcp-server/news-aggregator/index.js`:

```javascript
const CONFIG = {
  sources: {
    hackerNews: 'https://hacker-news.firebaseio.com/v0',
    reddit: 'https://www.reddit.com/r/artificial+MachineLearning.json',
    // Agregar más fuentes:
    producthunt: 'https://api.producthunt.com/...',
    devto: 'https://dev.to/api/articles?tag=ai',
  },
  keywords: [
    'artificial intelligence',
    'machine learning',
    // Agregar más keywords
    'transformer',
    'diffusion',
  ],
};
```

### Cambiar Frecuencia de Publicación

Edita `.github/workflows/weekly-ai-news.yml`:

```yaml
on:
  schedule:
    # Cada 3 días a las 10:00 AM
    - cron: '0 10 */3 * *'
    
    # Cada lunes y jueves
    - cron: '0 9 * * 1,4'
```

### Personalizar Template del Post

Edita la función `generateMarkdownContent()` en `index.js`:

```javascript
function generateMarkdownContent(news, weekNumber) {
  let markdown = `# Tu título personalizado\n\n`;
  // ... personalizar estructura
  return markdown;
}
```

---

## 🔧 Troubleshooting

### Error: "Rate limit exceeded"

**Problema:** APIs tienen límites de requests

**Solución:** Agregar delays entre requests

```javascript
await new Promise(resolve => setTimeout(resolve, 1000));
```

### Error: "No news found"

**Problema:** Keywords muy restrictivos

**Solución:** Ampliar lista de keywords en CONFIG

### Posts duplicados

**Problema:** Workflow ejecutó 2 veces

**Solución:** Verificar en `blogPosts.js` y remover duplicado manualmente

---

## 🚀 Mejoras Futuras

### Integración con Claude API

Para generar resúmenes más inteligentes:

```javascript
import Anthropic from '@anthropic-ai/sdk';

async function generateAISummary(news) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const prompt = `
Eres un curador de contenido para KAINET, empresa enfocada en IA aplicada y automatización.

Noticias de la semana:
${JSON.stringify(news, null, 2)}

Genera un post de blog en español que:
1. Resuma las 3 noticias más importantes
2. Explique su impacto práctico
3. Conecte con la visión de KAINET
4. Sea técnico pero accesible
  `;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  return message.content[0].text;
}
```

### Análisis de Sentimiento

```javascript
// Analizar si las noticias son positivas/negativas
import Sentiment from 'sentiment';

const sentiment = new Sentiment();
const analysis = sentiment.analyze(news.title);
// analysis.score > 0 = positivo
```

### Imágenes Generadas con IA

```javascript
// Generar imagen de portada con DALL-E o Stable Diffusion
const imageUrl = await generateOGImage(post.title);
post.image = imageUrl;
```

---

## 📊 Métricas

Para trackear el impacto de los posts automáticos:

```javascript
// Agregar al final de cada post
markdown += `
<!-- Analytics -->
<img src="https://analytics.kainet.mx/track?post=${slug}" width="1" height="1" />
`;
```

---

## 🔐 Seguridad

### Variables de Entorno

Si agregas APIs con autenticación:

```bash
# .env
ANTHROPIC_API_KEY=sk-ant-xxx
REDDIT_CLIENT_ID=xxx
REDDIT_CLIENT_SECRET=xxx
```

En GitHub Actions:
1. Settings → Secrets → Actions
2. Add secret: `ANTHROPIC_API_KEY`

En workflow:
```yaml
env:
  ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

---

## 📚 Recursos

- [MCP Documentation](https://modelcontextprotocol.io)
- [GitHub Actions Docs](https://docs.github.com/actions)
- [Hacker News API](https://github.com/HackerNews/API)
- [Reddit API](https://www.reddit.com/dev/api)
- [ArXiv API](https://arxiv.org/help/api)

---

## 🎯 Checklist de Setup

- [ ] Instalar dependencias MCP server
- [ ] Ejecutar test-aggregate exitosamente
- [ ] Configurar GitHub Actions (ya está)
- [ ] Hacer primer run manual (dry run)
- [ ] Verificar que el post se genera correctamente
- [ ] Activar publicación automática
- [ ] (Opcional) Configurar Claude Desktop MCP
- [ ] (Opcional) Integrar Claude API para mejores resúmenes

---

**¿Dudas o mejoras?** Abre un issue o PR en el repo 🚀
