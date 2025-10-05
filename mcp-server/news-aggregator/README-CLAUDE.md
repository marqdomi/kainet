# 🤖 Integración Claude API - Análisis Inteligente de Noticias

## ✅ Implementado

El generador de posts ahora usa **Claude 3.5 Haiku** para analizar el contenido real de cada artículo y generar resúmenes inteligentes y específicos.

---

## 🎯 Qué Hace

### Antes (Web Scraping Básico)
```
"192 personas están siguiendo esta noticia de cerca.
Los 79 comentarios ofrecen perspectivas valiosas..."
```
❌ Genérico, sin contexto específico del artículo

### Ahora (Claude API)
```
"Este nuevo antibiótico combina IA predictiva con microbiología tradicional.
El modelo anticipó cómo funcionaría la molécula antes de las pruebas de laboratorio,
reduciendo meses de experimentación. Los 79 comentarios debaten implicaciones
éticas del drug discovery asistido por IA..."
```
✅ Específico, informativo, valioso

---

## 🔧 Configuración

### 1. Ya tienes instalado
```json
{
  "@anthropic-ai/sdk": "^0.65.0",
  "dotenv": "^17.2.3"
}
```

### 2. Variable de entorno configurada
```bash
# .env
ANTHROPIC_API_KEY=sk-ant-api03-...
```

### 3. Listo para usar
```bash
npm run generate-post
```

---

## 📊 Modelo Usado

**Claude 3.5 Haiku** (claude-3-5-haiku-20241022)

### ¿Por qué Haiku?
- ⚡ **Rápido**: ~3 segundos por análisis
- 💰 **Económico**: ~$0.008 por artículo
- 🎯 **Preciso**: Excelente para resúmenes y análisis
- 🔋 **Eficiente**: Tu $5 gratis = ~625 artículos

### Costos Reales
| Frecuencia | Artículos/sem | Costo/mes | Duración $5 |
|-----------|---------------|-----------|-------------|
| Semanal   | 10            | ~$0.32    | **15 meses** |
| 2x/semana | 20            | ~$0.64    | **7 meses** |
| Diario    | 70            | ~$2.24    | **2 meses** |

👉 **Tu caso (semanal): Los $5 gratis te duran más de 1 año** 🎉

---

## 🚀 Cómo Funciona

### Workflow Completo

```mermaid
graph LR
    A[Hacker News API] --> B[Scraping Web]
    B --> C[Claude API]
    C --> D[Análisis Inteligente]
    D --> E[Post de Blog]
```

### Paso a Paso

1. **Agrega noticias** desde Hacker News, Reddit, ArXiv
2. **Extrae contenido** con JSDOM (scraping)
3. **Envía a Claude** con prompt especializado
4. **Recibe análisis** de 2-3 párrafos específicos
5. **Genera post** con resúmenes reales y valiosos

---

## 🎨 Prompt Optimizado

El prompt enviado a Claude:

```
Eres un analista experto en IA y tecnología empresarial.

ARTÍCULO: [título]
CONTENIDO: [primeros 3,500 caracteres]
ENGAGEMENT: [votos y comentarios]

TAREA:
1. QUÉ ES/ANUNCIA - Específico, no genérico
2. POR QUÉ IMPORTA - Impacto para empresas
3. INSIGHT CLAVE - Lección práctica

ESTILO: Directo, profesional, enfocado en valor práctico
FORMATO: 2-3 párrafos, 250 palabras máx
```

---

## 📈 Métricas y Logs

Durante la generación verás:

```bash
📝 Generando contenido del post...
   📄 Leyendo: https://healthsci.mcmaster.ca/new-antibiotic...
   🤖 Analizando con Claude: "New antibiotic targets IBD..."
   ✅ Análisis generado (287 caracteres)
   
   📄 Leyendo: https://github.com/DebarghaG/proofofthought...
   🤖 Analizando con Claude: "ProofOfThought: LLM-based..."
   ✅ Análisis generado (312 caracteres)
```

### Indicadores de Calidad
- ✅ `Análisis generado` = Claude funcionó
- ⚠️ `Error con Claude API` = Usó fallback básico
- ⚠️ `Contenido insuficiente` = No pudo scrapear, usó fallback

---

## 🛡️ Manejo de Errores

### Sistema de Fallback en Cascada

```
1. Intenta scrapear contenido
   ↓ (si falla)
2. Usa título como contenido
   ↓
3. Envía a Claude API
   ↓ (si falla)
4. Genera análisis básico sin IA
   ↓
5. Post se genera siempre, con el mejor análisis disponible
```

### Rate Limiting
- Delay de **1 segundo** entre análisis
- Previene saturar API
- ~10 artículos = ~15 segundos total

---

## 💡 Mejoras Futuras

### Posibles Optimizaciones

1. **Cache de análisis**
   - Guardar análisis anteriores
   - No re-analizar mismo artículo
   - Ahorro: ~50% tokens

2. **Análisis por batch**
   - Analizar múltiples artículos en un prompt
   - Más rápido, más barato
   - Requiere prompt diferente

3. **Selección inteligente**
   - Pre-filtrar artículos con Claude
   - Solo analizar los más relevantes
   - Mejor calidad, menor costo

4. **Modelo adaptativo**
   - Haiku para artículos simples
   - Sonnet para análisis complejos
   - Balance costo/calidad

---

## 🔍 Troubleshooting

### Error: "ANTHROPIC_API_KEY not found"
```bash
# Verifica que .env existe
ls -la .env

# Verifica que tiene la key
cat .env

# Debe mostrar:
# ANTHROPIC_API_KEY=sk-ant-api03-...
```

### Error: "Invalid API key"
- Revisa que copiaste la key completa
- No debe tener espacios antes/después
- Debe empezar con `sk-ant-`

### Análisis genéricos (no específicos)
- Puede ser que el scraping falló
- Revisa logs: ¿dice "Contenido insuficiente"?
- Algunos sitios bloquean scraping
- Claude usará título como fallback

### Muy lento
- Normal: ~3-4 segundos por artículo
- Con 10 artículos: ~30-40 segundos total
- Delay de 1 seg entre llamadas es intencional

---

## 📚 Recursos

- [Anthropic Console](https://console.anthropic.com) - Dashboard API
- [Pricing Calculator](https://anthropic.com/pricing) - Calcular costos
- [API Docs](https://docs.anthropic.com) - Documentación técnica
- [Rate Limits](https://docs.anthropic.com/en/api/rate-limits) - Límites de uso

---

## ✅ Checklist Pre-Ejecución

Antes de correr `npm run generate-post`:

- [x] API key en `.env`
- [x] Dependencias instaladas (`npm install`)
- [x] Créditos disponibles (check console.anthropic.com)
- [ ] Internet estable (para scraping + API)

---

**¿Dudas?** Revisa los logs - son muy detallados y muestran exactamente qué está pasando en cada paso.

**¿Todo funcionando?** Deberías ver análisis mucho más específicos y valiosos en tus posts! 🚀
