# 🎨 Sistema de Generación Automática de Imágenes para Blog

## ✨ Características

- **Generación automática** con OpenAI DALL-E 3
- **Estilo cyberpunk/futurista** consistente con KAINET
- **Prompts optimizados** por categoría (Automatización, DevOps, IA)
- **Dimensiones perfectas** para blog headers (1792x1024 - 16:10)
- **Fallback inteligente** a placeholders si falla la generación

## 🚀 Cómo Funciona

### 1. **Generación Automática**
Cada vez que se crea un post, el sistema:
1. Analiza el título y contenido
2. Genera un prompt optimizado según la categoría
3. Llama a DALL-E 3 para crear la imagen
4. Asigna la URL de la imagen al post

### 2. **Estilos por Categoría**

#### 🏢 Automatización Empresarial
- **Estilo**: Conceptos de automatización empresarial, cyberpunk
- **Elementos**: Brazos robóticos, diagramas de workflow, interfaces digitales
- **Colores**: #00E5FF, #5227FF, azul oscuro, cian neón

#### 🔧 DevOps & Herramientas  
- **Estilo**: Infraestructura moderna, estética cyberpunk
- **Elementos**: Racks de servidores, pipelines de código, símbolos de cloud
- **Colores**: #00E5FF, #5227FF, azul eléctrico, verde neón

#### 🤖 IA
- **Estilo**: Inteligencia artificial, redes neuronales futuristas
- **Elementos**: Redes neuronales, cerebro IA, flujos de datos
- **Colores**: #00E5FF, #5227FF, púrpura neón, cian eléctrico

## 📋 Configuración

### 1. **API Key de OpenAI**

#### Local (desarrollo):
```bash
# En mcp-server/news-aggregator/.env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

#### Producción (GitHub Secrets):
Ve a: https://github.com/marqdomi/kainet/settings/secrets/actions
- Agrega: `OPENAI_API_KEY` con tu API key de OpenAI

### 2. **Obtener API Key**
1. Ve a: https://platform.openai.com/api-keys
2. Crea una nueva API key
3. Asegúrate de tener créditos para DALL-E 3

## 🧪 Pruebas

### Probar Generación Local:
```bash
cd mcp-server/news-aggregator
npm run test-images
```

### Probar Posts Completos:
```bash
# Solo automatización (con imagen)
npm run generate-automation

# Solo DevOps (con imagen)  
npm run generate-devops

# Ambos posts (con imágenes)
npm run generate-weekly
```

## 📊 Costos Estimados

- **DALL-E 3 Standard**: ~$0.040 por imagen (1792x1024)
- **Posts semanales**: 2 imágenes/semana = ~$0.08/semana
- **Costo mensual**: ~$0.32/mes
- **Costo anual**: ~$4/año

## 🔧 Personalización

### Modificar Prompts:
Edita `mcp-server/news-aggregator/generate-blog-images.js`:

```javascript
const IMAGE_STYLES = {
  'Automatización': {
    basePrompt: 'Tu prompt personalizado aquí...',
    keywords: ['tus', 'keywords', 'aquí'],
    colors: 'tus colores preferidos'
  }
}
```

### Cambiar Dimensiones:
```javascript
size: "1792x1024", // 16:10 para blog headers
// Otras opciones: "1024x1024", "1024x1792"
```

## 🎯 Resultado

### Antes:
- Placeholders genéricos con texto
- Apariencia básica y repetitiva

### Después:
- Imágenes únicas y atractivas para cada post
- Estilo cyberpunk consistente con la marca
- Headers visualmente impactantes
- Mejor engagement y profesionalismo

## 🚨 Fallbacks

Si la generación falla:
1. **Error de API**: Usa placeholder personalizado
2. **Sin API key**: Usa placeholder con texto
3. **Sin créditos**: Usa placeholder y registra error
4. **Timeout**: Usa placeholder y continúa

## 📈 Beneficios

- ✅ **Automatización completa**: Sin intervención manual
- ✅ **Consistencia visual**: Estilo unificado en todos los posts
- ✅ **Profesionalismo**: Imágenes de alta calidad
- ✅ **SEO mejorado**: Imágenes únicas mejoran el engagement
- ✅ **Escalabilidad**: Funciona para cualquier volumen de posts

---

**¡Tu blog ahora genera automáticamente imágenes futuristas y profesionales para cada post!** 🎨✨