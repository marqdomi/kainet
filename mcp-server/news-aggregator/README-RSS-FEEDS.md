# Integración de Fuentes RSS Profesionales

## Cambios Realizados

### ✅ Fuentes Agregadas (25 feeds profesionales)

#### Newsletters y Curadores
- Ben's Bites
- TLDR AI

#### Medios Tecnológicos
- VentureBeat AI
- The Verge AI

#### Vendors AI Core
- OpenAI Blog
- Microsoft AI Blog
- Google AI Blog
- AWS Machine Learning Blog

#### MLOps / LLMOps
- Databricks Blog
- Snowflake Blog
- NVIDIA Developer Blog

#### Automatización Empresarial (RPA/ITSM)
- UiPath Blog
- Automation Anywhere Blog
- ServiceNow Blog

#### AIOps / Observabilidad
- Datadog Blog
- Dynatrace Blog
- Splunk Blog

#### Automatización de Redes (KAINET Focus)
- Cisco Networking & Automation
- Juniper Mist AI

## Instalación

```bash
cd mcp-server/news-aggregator
npm install rss-parser
```

## Funcionamiento

1. **Fetch de RSS Feeds:** Se obtienen los últimos 5 artículos de cada fuente (últimos 7 días)
2. **Priorización:** Los artículos RSS tienen score fijo de 100 (priorizados sobre HN genérico)
3. **Mix Inteligente:** 
   - Historia principal: Top 1 de mix (HN + RSS)
   - Noticias destacadas: 2 HN + 3 RSS
   - Total: ~40-60 artículos analizados por semana

## Mejoras en Generación de Contenido

### Análisis con Gemini 2.5 Flash
- Prompt de Senior AI Editor
- Enfoque en ROI, riesgo, aplicabilidad
- Sin hype, sin emojis
- Máximo 300 palabras por análisis

### Estructura del Post
```markdown
**Semana N, 2025**
Intro técnica

## Historia Principal
[Análisis IA + fuente + engagement]

## Otras Noticias Relevantes
[4 artículos con análisis completo]

## Investigación Destacada
[3 papers ArXiv]

## Pulso de la Comunidad
[3 discusiones Reddit]

## Perspectiva KAINET
[Análisis editorial sobre ROI/implementación]
```

## Rate Limiting

- 500ms delay entre fuentes RSS
- 1s delay entre análisis con Gemini
- Total: ~45-60 segundos por generación completa

## Ejecución

```bash
npm run generate-post
```

El post generado se guardará automáticamente en:
```
src/data/blogPosts.js
```

## Fuentes de Datos

| Categoría | Cantidad | Score Base |
|-----------|----------|------------|
| RSS Feeds | ~100 artículos/semana | 100 |
| Hacker News | ~20 top stories | 50-500+ |
| Reddit | ~10 discusiones | 30-600+ |
| ArXiv | ~10 papers | 0 |

**Total agregado:** 140+ artículos/semana
**Publicados en post:** Top 10-15 con análisis completo

## Calidad del Contenido

✅ **Sin emojis** - Tono profesional
✅ **Análisis técnico** - ROI, riesgo, implementación
✅ **Fuentes verificadas** - Vendors oficiales + medios tech
✅ **Diversidad** - Mix de noticias, investigación, opinión
✅ **SEO-ready** - Markdown limpio, títulos claros

## Próximos Pasos

Para usar este sistema:

1. Instalar dependencia: `npm install rss-parser`
2. Verificar API key Gemini en `.env`
3. Ejecutar: `npm run generate-post`
4. Revisar resultado en blog local
5. Ajustar fuentes si es necesario (editar CONFIG.sources)

---

**Última actualización:** Octubre 4, 2025
