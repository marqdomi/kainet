# 🚀 Variables de Entorno para Producción

## ⚠️ IMPORTANTE
Este archivo contiene las variables de entorno que debes configurar en tu plataforma de hosting (Vercel, Netlify, etc.) para habilitar todas las features en producción.

**NO COMMITEAR ESTE ARCHIVO CON VALORES REALES**

---

## 📋 Variables Requeridas

### Feature Flags - Japanese Cyberpunk Enhancements
```bash
# Todas las features habilitadas para producción
VITE_FEATURE_KANJI=true
VITE_FEATURE_GLITCH=true
VITE_FEATURE_HOLO=true
VITE_FEATURE_TRANSITIONS=true
VITE_FEATURE_CIRCUITS=true
VITE_FEATURE_PARALLAX=true
VITE_FEATURE_TYPOGRAPHY=true
VITE_FEATURE_LOADERS=true
VITE_FEATURE_EASTER_EGGS=true
VITE_FEATURE_ENHANCED_UI=true
```

### Supabase Configuration (Frontend)
```bash
# Variables para el frontend (con prefijo VITE_)
VITE_SUPABASE_URL=https://tqdencmzezjevnntifos.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZGVuY216ZXpqZXZubnRpZm9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyODU4NDQsImV4cCI6MjA3NTg2MTg0NH0.Ql8Ql8Ql8Ql8Ql8Ql8Ql8Ql8Ql8Ql8Ql8Ql8Ql8
```

### Email Configuration (Resend)
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=newsletter@kainet.mx
EMAIL_CONTACT=contacto@kainet.mx
EMAIL_NEWSLETTER=newsletter@kainet.mx
EMAIL_PERSONAL=marcdomi@kainet.mx
```

### Site Configuration
```bash
SITE_URL=https://kainet.mx
```

---

## 🔧 Cómo Configurar en Vercel

### Opción 1: Dashboard Web
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega cada variable una por una:
   - Name: `VITE_FEATURE_KANJI`
   - Value: `true`
   - Environment: Production (y Preview si quieres)
4. Click "Save"
5. Repite para todas las variables

### Opción 2: Vercel CLI
```bash
# Instala Vercel CLI si no lo tienes
npm i -g vercel

# Login
vercel login

# Configura las variables
vercel env add VITE_FEATURE_KANJI production
# Cuando pregunte el valor, escribe: true

# Repite para todas las variables
```

### Opción 3: Archivo .env (más rápido)
```bash
# Crea un archivo temporal con todas las variables
cat > temp-env.txt << 'EOF'
VITE_FEATURE_KANJI=true
VITE_FEATURE_GLITCH=true
VITE_FEATURE_HOLO=true
VITE_FEATURE_TRANSITIONS=true
VITE_FEATURE_CIRCUITS=true
VITE_FEATURE_PARALLAX=true
VITE_FEATURE_TYPOGRAPHY=true
VITE_FEATURE_LOADERS=true
VITE_FEATURE_EASTER_EGGS=true
VITE_FEATURE_ENHANCED_UI=true
RESEND_API_KEY=tu_api_key_aqui
EMAIL_FROM=newsletter@kainet.mx
EMAIL_CONTACT=contacto@kainet.mx
EMAIL_NEWSLETTER=newsletter@kainet.mx
EMAIL_PERSONAL=marcdomi@kainet.mx
SITE_URL=https://kainet.mx
EOF

# Luego copia y pega en Vercel Dashboard
# O usa el CLI para cada línea
```

---

## 🔧 Cómo Configurar en Netlify

### Dashboard Web
1. Ve a tu sitio en Netlify
2. Site settings → Environment variables
3. Click "Add a variable"
4. Agrega cada variable:
   - Key: `VITE_FEATURE_KANJI`
   - Value: `true`
   - Scopes: Production (y Deploy previews si quieres)
5. Click "Create variable"
6. Repite para todas las variables

### Netlify CLI
```bash
# Instala Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Link al sitio
netlify link

# Configura variables
netlify env:set VITE_FEATURE_KANJI true
netlify env:set VITE_FEATURE_GLITCH true
# ... etc
```

---

## 🔧 Otras Plataformas

### Railway
```bash
# Settings → Variables
# Add New Variable para cada una
```

### Render
```bash
# Environment → Environment Variables
# Add Environment Variable para cada una
```

### Cloudflare Pages
```bash
# Settings → Environment variables
# Add variable para cada una
```

---

## ✅ Verificación Post-Deployment

Después de configurar las variables y hacer deploy:

### 1. Verifica en la Consola del Browser
```javascript
// Abre DevTools → Console
// Deberías ver:
console.log('🎌 Feature Flags Status');
// Con todas las features en true
```

### 2. Verifica Visualmente
- [ ] Partículas de kanji en el fondo
- [ ] Líneas de circuito animadas
- [ ] Efecto glitch en títulos (hover)
- [ ] Cards holográficas (hover)
- [ ] Transiciones entre páginas
- [ ] Easter eggs funcionando

### 3. Verifica Performance
```bash
# Lighthouse en producción
# Target: Performance 90+
```

---

## 🔄 Rollback Rápido

Si algo sale mal, puedes deshabilitar features rápidamente:

### Deshabilitar Todas las Features
```bash
# En tu plataforma de hosting, cambia todas a:
VITE_FEATURE_KANJI=false
VITE_FEATURE_GLITCH=false
VITE_FEATURE_HOLO=false
VITE_FEATURE_TRANSITIONS=false
VITE_FEATURE_CIRCUITS=false
VITE_FEATURE_PARALLAX=false
VITE_FEATURE_TYPOGRAPHY=false
VITE_FEATURE_LOADERS=false
VITE_FEATURE_EASTER_EGGS=false
VITE_FEATURE_ENHANCED_UI=false
```

### Deshabilitar Features Específicas
Si solo una feature causa problemas, deshabilita solo esa:
```bash
# Ejemplo: Deshabilitar solo glitch effects
VITE_FEATURE_GLITCH=false
```

---

## 📊 Monitoreo Post-Deployment

### Métricas a Vigilar
- **Error Rate:** Debe mantenerse < 0.1%
- **Performance:** Lighthouse score 90+
- **FPS:** 60fps en desktop, 55+ en mobile
- **Load Time:** < 2 segundos

### Herramientas
- Vercel Analytics (si usas Vercel)
- Google Analytics
- Lighthouse CI
- Browser DevTools

---

## 🎯 Checklist de Deployment

- [ ] Variables de entorno configuradas en plataforma
- [ ] Build exitoso localmente
- [ ] Push a main completado
- [ ] Deployment automático iniciado
- [ ] Verificar que el sitio carga
- [ ] Verificar features visualmente
- [ ] Verificar consola sin errores
- [ ] Verificar performance con Lighthouse
- [ ] Probar en móvil
- [ ] Probar easter eggs
- [ ] Verificar accesibilidad

---

## 💡 Tips

1. **Deployment Gradual:** Si prefieres, puedes habilitar features una por una
2. **Preview Deployments:** Prueba primero en preview antes de producción
3. **Monitoring:** Configura alertas para errores
4. **Backup:** Guarda el commit hash actual por si necesitas rollback
5. **Documentation:** Documenta cualquier issue encontrado

---

## 🆘 Troubleshooting

### Features no se ven
```bash
# Verifica que las variables estén configuradas
# En Vercel: Settings → Environment Variables
# Deben estar en "Production"
```

### Build falla
```bash
# Verifica que todas las dependencias estén instaladas
# Vercel/Netlify lo hace automáticamente
# Si falla, revisa los logs de build
```

### Performance bajo
```bash
# Deshabilita features pesadas temporalmente:
VITE_FEATURE_CIRCUITS=false
VITE_FEATURE_PARALLAX=false
```

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de deployment
2. Verifica la consola del browser
3. Compara con el build local
4. Revisa la documentación de tu plataforma

---

**¡Listo para producción! 🚀**
