# ✅ PASO 6: Configurar Variables de Entorno en Vercel

## 🔑 Variables a Agregar en Vercel

Ve a: **https://vercel.com/dashboard** → Tu proyecto **kainet** → **Settings** → **Environment Variables**

Agrega estas **3 variables nuevas** (además de las que ya tienes de Resend):

### 1. VITE_SUPABASE_URL
```
https://[TU-PROJECT-ID].supabase.co
```
- ✅ Production
- ✅ Preview
- ✅ Development

### 2. VITE_SUPABASE_ANON_KEY
```
eyJ... (obtener de Supabase → Settings → API)
```
- ✅ Production
- ✅ Preview  
- ✅ Development

### 3. SUPABASE_SERVICE_ROLE_KEY
```
eyJ... (obtener de Supabase → Settings → API)
⚠️ IMPORTANTE: Esta key es SECRETA - nunca la compartas públicamente
```
- ✅ Production
- ✅ Preview
- ✅ Development

---

## ⚠️ Variables Existentes (verificar que estén):

- ✅ RESEND_API_KEY
- ✅ EMAIL_FROM
- ✅ EMAIL_CONTACT
- ✅ EMAIL_NEWSLETTER
- ✅ EMAIL_PERSONAL
- ✅ SITE_URL

---

## 📝 PASO 7: Migrar el Post a Supabase

1. Ve a **Supabase Dashboard**
2. Click en **SQL Editor**
3. Click en **"New query"**
4. Copia y pega el contenido del archivo `scripts/insert-post-supabase.sql`
5. Click **"Run"** o presiona `Ctrl/Cmd + Enter`
6. Deberías ver: **"Success. 1 row(s) affected"**
7. Verifica con el SELECT al final que el post esté ahí

---

## ✅ Cuando hayas terminado ambos pasos, avísame para hacer el deploy!
