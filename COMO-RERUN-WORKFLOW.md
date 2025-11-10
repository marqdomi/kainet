# 🔄 Cómo Volver a Ejecutar el Workflow de GitHub Actions

## 📍 El Error es de Google Gemini (Sobrecarga)

El error que viste es porque la API de Google Gemini está sobrecargada temporalmente:
```
Error: The model is overloaded. Please try again later.
```

Esto es normal y se soluciona esperando unos minutos y volviendo a intentar.

## 🚀 Cómo Re-ejecutar el Workflow

### Opción 1: Re-run desde el Workflow Fallido

1. **Ir a GitHub Actions**:
   ```
   https://github.com/marqdomi/kainet/actions
   ```

2. **Encontrar el workflow fallido**:
   - Busca "Generate Weekly Blog Posts" con ❌ rojo
   - Haz clic en él

3. **Re-run el workflow**:
   - En la esquina superior derecha, verás un botón "Re-run jobs"
   - Haz clic en "Re-run failed jobs" o "Re-run all jobs"
   - Confirma

### Opción 2: Ejecutar Manualmente (Recomendado)

1. **Ir a GitHub Actions**:
   ```
   https://github.com/marqdomi/kainet/actions
   ```

2. **Seleccionar el workflow**:
   - En el lado izquierdo, haz clic en "Generate Weekly Blog Posts"

3. **Run workflow**:
   - Verás un botón azul "Run workflow" en la parte superior derecha
   - Haz clic en él

4. **Configurar opciones**:
   - **Branch**: main (dejar por defecto)
   - **Tipo de post a generar**: 
     - `automation` - Solo post de automatización ✅ (recomendado para probar)
     - `devops` - Solo post de DevOps
     - `both` - Ambos posts

5. **Ejecutar**:
   - Haz clic en el botón verde "Run workflow"
   - Espera 2-3 minutos

6. **Ver progreso**:
   - Verás un nuevo workflow ejecutándose
   - Haz clic en él para ver los logs en tiempo real

## ⏰ Cuándo Intentar de Nuevo

Si Gemini está sobrecargado:
- **Espera**: 5-10 minutos
- **Intenta de nuevo**: Re-run el workflow
- **Horarios menos congestionados**: 
  - Madrugada (2-6 AM hora de México)
  - Fines de semana
  - Evita horas pico (9 AM - 5 PM PST)

## 🎯 Pasos Visuales

```
1. GitHub.com → Tu Repo → Actions (pestaña superior)
                    ↓
2. "Generate Weekly Blog Posts" (lado izquierdo)
                    ↓
3. Botón "Run workflow" (azul, arriba a la derecha)
                    ↓
4. Seleccionar "automation" en el dropdown
                    ↓
5. Botón verde "Run workflow"
                    ↓
6. ✅ Ver el workflow ejecutándose
```

## 🔍 Monitorear el Workflow

Mientras corre, verás:
- ⏳ Amarillo = Ejecutando
- ✅ Verde = Éxito
- ❌ Rojo = Error

Haz clic en el workflow para ver:
- Logs en tiempo real
- Qué paso está ejecutando
- Si hay errores

## 📝 Qué Hace el Workflow

Cuando ejecutas "automation":

1. **Checkout code** - Descarga el código
2. **Setup Node.js** - Configura Node.js 18
3. **Install dependencies** - Instala paquetes npm
4. **Generate Automation post** - 🤖 Llama a Gemini para generar el post
5. **Commit and push** - Guarda el post en el repo

Si falla en el paso 4, es porque Gemini está sobrecargado.

## ⚠️ Si Sigue Fallando

Si después de 2-3 intentos sigue fallando:

### Opción A: Esperar más tiempo
- Gemini puede estar sobrecargado por horas
- Intenta en otro momento del día

### Opción B: Ejecutar localmente
```bash
cd mcp-server/news-aggregator
npm run generate-automation
```

Esto genera el post en tu máquina y luego puedes hacer commit manual.

### Opción C: Usar otro modelo
Si tienes acceso a Claude o GPT-4, puedes modificar temporalmente el script para usar otro modelo.

## 🎉 Cuando Funcione

Verás:
- ✅ Workflow completado exitosamente
- Un nuevo commit en tu repo: "🤖 Auto-generate: Automatización Empresarial post"
- El post aparecerá en tu blog automáticamente

## 📊 Verificar el Post Generado

Después de que el workflow termine exitosamente:

1. **Ver el commit**:
   ```
   https://github.com/marqdomi/kainet/commits/main
   ```

2. **Ver el post en Supabase**:
   ```
   https://supabase.com/dashboard/project/tqdencmzezjevnntifos/editor
   → Tabla: blog_posts
   ```

3. **Ver en el sitio**:
   ```
   https://kainet.mx/blog
   ```

## 🔗 Links Rápidos

- **GitHub Actions**: https://github.com/marqdomi/kainet/actions
- **Workflow específico**: https://github.com/marqdomi/kainet/actions/workflows/generate-weekly-posts.yml
- **Supabase Posts**: https://supabase.com/dashboard/project/tqdencmzezjevnntifos/editor

---

**TL;DR**: 
1. Ve a: https://github.com/marqdomi/kainet/actions
2. Click en "Generate Weekly Blog Posts" (izquierda)
3. Click en "Run workflow" (azul, arriba derecha)
4. Selecciona "automation"
5. Click en "Run workflow" (verde)
6. ✅ Espera 2-3 minutos
