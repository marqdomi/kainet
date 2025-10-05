# Generador de Posts de Automatización/Herramientas

## 📋 Descripción

Generador automático de posts semanales para la categoría **Automatización** del blog KAINET. Cubre las novedades más importantes en:

- 🛠️ **DevOps & Infrastructure**: Terraform, Ansible, Kubernetes, Docker
- ☁️ **Cloud Platforms**: AWS, Azure, Google Cloud (AI/ML services)
- 🤖 **Enterprise Automation**: ServiceNow, UiPath, RPA tools
- 💻 **Developer Tools**: GitHub, VS Code, coding assistants
- 🧠 **AI/ML Tools**: HuggingFace, LangChain, model deployment platforms
- 📊 **Observability**: Monitoring, logging, tracing tools

## 🎯 Fuentes de Información

### AI/Cloud Platforms
- **OpenAI Blog** (Critical): Lanzamientos de GPT, API updates
- **Google AI Blog** (High): Research, TensorFlow, Gemini
- **Google Cloud AI** (High): Vertex AI, ML services
- **AWS Machine Learning** (High): SageMaker, AI services
- **NVIDIA Developer** (Critical): CUDA, GPU acceleration

### Dev & Automation Tools
- **GitHub Changelog** (Critical): Features, Copilot updates
- **VS Code Updates** (High): Editor features, extensions
- **Docker Blog** (Medium): Container updates, best practices
- **HashiCorp Blog** (Medium): Terraform, Vault, Consul
- **Kubernetes Blog** (Medium): K8s releases, patterns
- **Apache Airflow** (Low): Workflow orchestration updates

### Enterprise Automation
- **ServiceNow Blog** (Medium): ITSM, automation workflows
- **UiPath Blog** (Medium): RPA, process mining

### Communities
- **HuggingFace Blog** (High): Models, datasets, tools

## 🚀 Uso

### Generar Post Semanal

```bash
cd mcp-server/news-aggregator
npm run generate-automation
```

O directamente con node:

```bash
node generate-automation-post.js
```

### Qué Hace el Script

1. **Fetching (30-60s)**
   - Obtiene artículos de ~14 fuentes RSS
   - Filtra por keywords relevantes (DevOps, cloud, automation, etc.)
   - Descarta artículos > 7 días

2. **Análisis con Gemini (3-5min)**
   - Analiza top 12-15 artículos más relevantes
   - Genera resúmenes técnicos (280 palabras c/u)
   - Enfoque: impacto práctico, DX, ROI

3. **Perspectiva Editorial (1-2min)**
   - Gemini identifica tendencias de la semana
   - Conecta releases con necesidades de equipos
   - Recomendaciones pragmáticas

4. **Guardado**
   - Crea post en `/src/data/blogPosts.js`
   - Categoría: `Automatización`
   - Slug: `automation-tools-semana-{N}-2025`

## 📊 Estructura del Post

```markdown
**Semana N, 2025**
Intro contextual...

## Destacados de la Semana
<div class="news-grid">
  <!-- Top 3 artículos con análisis completo -->
</div>

## Actualizaciones Importantes
*Releases, features y cambios que importan para tu stack*
<div class="news-grid">
  <!-- Artículos 4-8 con análisis -->
</div>

## En el Radar
*Otras novedades que vale la pena monitorear*
<div class="community-grid">
  <!-- Artículos 9-15 solo con título/fuente -->
</div>

## Perspectiva KAINET
<div class="kainet-perspective">
  <!-- Análisis editorial: tendencias, impacto, recomendaciones -->
</div>
```

## 🎨 Diferencias con Posts de IA

| Aspecto | Posts de IA | Posts de Automatización |
|---------|-------------|-------------------------|
| **Enfoque** | Research, algorithms, enterprise AI strategy | Tools, workflows, developer productivity |
| **Fuentes** | Hacker News, Reddit, ArXiv, AI blogs | GitHub, cloud vendors, DevOps tools |
| **Audiencia** | ML engineers, AI architects | DevOps, SREs, platform engineers |
| **Tono Gemini** | "Senior AI Research Editor" | "Senior DevOps & Automation Editor" |
| **Keywords** | `ai`, `llm`, `mlops`, `neural network` | `devops`, `ci/cd`, `kubernetes`, `terraform` |
| **Engagement** | Papers académicos, startups de IA | Changelogs, breaking changes, DX improvements |

## 🔧 Configuración

### Variables de Entorno

Requiere `.env` con:

```env
GEMINI_API_KEY=tu_api_key_aqui
```

### Personalización de Keywords

Editar `CONFIG.keywords` en `generate-automation-post.js`:

```javascript
keywords: [
  // Agregar/quitar según interés
  'devops', 'ci/cd', 'terraform', 'kubernetes',
  'aws', 'azure', 'gcp',
  'github', 'vscode', 'copilot',
  // ...
]
```

### Ajustar Fuentes

```javascript
sources: {
  miTool: { 
    url: 'https://example.com/feed.xml', 
    name: 'Mi Tool Blog', 
    priority: 'high' // critical | high | medium | low
  },
}
```

**Prioridades:**
- `critical` (200 pts): OpenAI, GitHub, NVIDIA
- `high` (150 pts): VS Code, HuggingFace, cloud platforms
- `medium` (100 pts): Kubernetes, Docker, ServiceNow
- `low` (100 pts): Airflow, RPA tools

## 📅 Frecuencia Recomendada

- **IA Semanal**: Viernes (para capturar semana completa de research)
- **Automatización**: Lunes (lanzamientos suelen ser martes-jueves)

## 🎯 Ejemplos de Contenido Ideal

### Destacados de la Semana
- "GitHub Copilot Workspace: AI-native development environment"
- "Terraform 1.9 adds experimental config-driven import"
- "VS Code Profiles: Share settings across teams"

### En el Radar
- Breaking changes en Docker Desktop
- Kubernetes 1.31 deprecations
- AWS Lambda cold start improvements

## 🔍 Debugging

Si no se generan artículos:

1. Verificar que feeds RSS estén activos (algunos pueden morir)
2. Revisar keywords (demasiado específicas = 0 matches)
3. Aumentar `dedupeWindowDays` si hay poca actividad

## 📈 Métricas Esperadas

- **Artículos obtenidos**: 40-80 (según actividad de la semana)
- **Artículos analizados**: 12-15 (después de filtrado por relevancia)
- **Tiempo de ejecución**: 5-8 minutos
- **Palabras totales**: 3,500-4,500
- **Lectura estimada**: 7-9 min

## 🤝 Contribuir

Para agregar nuevas fuentes RSS o ajustar análisis Gemini, editar:

- `CONFIG.sources`: Agregar feeds
- `analyzeWithGemini()`: Ajustar prompt de análisis
- `generateKAINETPerspective()`: Modificar tono editorial

---

**Creado por**: KAINET AI Bot  
**Última actualización**: Octubre 2025
