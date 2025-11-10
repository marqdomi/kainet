# 🔐 Configurar GitHub Secrets para el Workflow

## 🎯 Problema Identificado

El workflow genera los posts correctamente PERO no los guarda en Supabase porque faltan estos secrets en GitHub:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`

Por eso el log dice: **"SUPABASE_SERVICE_KEY no configurado. Guardando local solo."**

## ✅ Solución: Agregar Secrets en GitHub

### Paso 1: Ir a GitHub Secrets

1. **Abre**: https://github.com/marqdomi/kainet/settings/secrets/actions
2. O navega: Tu Repo → Settings → Secrets and variables → Actions

### Paso 2: Agregar SUPABASE_URL

1. Click en **"New repository secret"** (botón verde)
2. **Name**: `SUPABASE_URL`
3. **Secret**: 
   ```
   https://tqdencmzezjevnntifos.supabase.co
   ```
4. Click en **"Add secret"**

### Paso 3: Agregar SUPABASE_SERVICE_KEY

1. **Obtener el Service Key**:
   - Ve a: https://supabase.com/dashboard/project/tqdencmzezjevnntifos/settings/api
   - Busca la sección **"Project API keys"**
   - Copia el **"service_role"** key (el que dice "secret" - NO el "anon" key)
   - Es un string largo que empieza con `eyJ...`

2. **Agregar en GitHub**:
   - Click en **"New repository secret"**
   - **Name**: `SUPABASE_SERVICE_KEY`
   - **Secret**: Pega el service_role key que copiaste
   - Click en **"Add secret"**

### Paso 4: Verificar GEMINI_API_KEY

También verifica que tengas este secret (para generar posts):

1. **Name**: `GEMINI_API_KEY`
2. **Secret**: Tu API key de Google Gemini
   - Si no la tienes: https://aistudio.google.com/app/apikey

## 📋 Checklist de Secrets Necesarios

Después de agregar, deberías tener estos 4 secrets:

- [ ] `GEMINI_API_KEY` - Para generar contenido con IA
- [ ] `SUPABASE_URL` - Para conectar a Supabase
- [ ] `SUPABASE_SERVICE_KEY` - Para escribir en Supabase
- [ ] `RESEND_API_KEY` - Para enviar newsletters (opcional por ahora)

## 🧪 Probar que Funciona

### Opción 1: Re-ejecutar el Workflow

1. Ve a: https://github.com/marqdomi/kainet/actions
2. Click en "Generate Weekly Blog Posts"
3. Click en "Run workflow"
4. Selecciona "automation"
5. Click en "Run workflow"
6. Espera 2-3 minutos

### Opción 2: Verificar en los Logs

Cuando el workflow termine, revisa los logs:

**Antes (sin secrets):**
```
⚠️  SUPABASE_SERVICE_KEY no configurado. Guardando local solo.
✅ Post guardado en blogPosts.js local
```

**Después (con secrets):**
```
✅ Post guardado en Supabase exitosamente
✅ Post guardado en blogPosts.js local
```

## 🔍 Verificar en Supabase

Después de ejecutar el workflow con los secrets configurados:

1. Ve a: https://supabase.com/dashboard/project/tqdencmzezjevnntifos/editor
2. Selecciona la tabla **"blog_posts"**
3. Deberías ver el nuevo post con:
   - `title`: "La Revolución del Código: Automatización Inteligente..."
   - `category`: "Automatización"
   - `published`: true
   - `created_at`: Fecha de hoy

## 📊 Migrar Posts Existentes a Supabase

Si quieres que los posts que ya están en `blogPosts.js` también aparezcan en Supabase:

### Opción A: Script de Migración (Recomendado)

Puedo crear un script que lea `src/data/blogPosts.js` y los suba a Supabase.

### Opción B: Manual

1. Ve a Supabase Table Editor
2. Click en "Insert" → "Insert row"
3. Copia los datos de cada post manualmente

### Opción C: Dejar como está

Los posts en `blogPosts.js` seguirán funcionando. Los nuevos posts generados automáticamente irán a Supabase Y a `blogPosts.js`.

## 🎯 Resultado Final

Una vez configurados los secrets:

1. ✅ Posts generados automáticamente
2. ✅ Guardados en Supabase (base de datos)
3. ✅ Guardados en blogPosts.js (respaldo local)
4. ✅ Visibles en el blog inmediatamente
5. ✅ Commit automático al repo

## ⚠️ Importante: Service Role Key

El **service_role** key es SECRETO y tiene permisos completos:
- ✅ Úsalo solo en GitHub Secrets (servidor)
- ❌ NUNCA lo pongas en el código
- ❌ NUNCA lo pongas en variables de entorno del frontend
- ❌ NUNCA lo compartas públicamente

El **anon** key es público y tiene permisos limitados (ese sí va en el frontend).

## 🔗 Links Rápidos

- **GitHub Secrets**: https://github.com/marqdomi/kainet/settings/secrets/actions
- **Supabase API Keys**: https://supabase.com/dashboard/project/tqdencmzezjevnntifos/settings/api
- **Gemini API Key**: https://aistudio.google.com/app/apikey
- **GitHub Actions**: https://github.com/marqdomi/kainet/actions

---

## 📝 Resumen Ultra Rápido

1. **Ir a**: https://github.com/marqdomi/kainet/settings/secrets/actions
2. **Agregar**:
   - `SUPABASE_URL` = `https://tqdencmzezjevnntifos.supabase.co`
   - `SUPABASE_SERVICE_KEY` = [copiar de Supabase]
3. **Re-ejecutar workflow**: https://github.com/marqdomi/kainet/actions
4. **Verificar en Supabase**: Tabla blog_posts debe tener el nuevo post
5. ✅ ¡Listo!

---

**Tiempo**: ⏱️ 5 minutos
**Prioridad**: 🔴 ALTA
**Dificultad**: ⭐ Muy Fácil
