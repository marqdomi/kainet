# ✅ PASO 6: Configurar Variables de Entorno en Vercel

## 🔑 Variables a Agregar en Vercel

Ve a: **https://vercel.com/dashboard** → Tu proyecto **kainet** → **Settings** → **Environment Variables**

Agrega estas **3 variables nuevas** (además de las que ya tienes de Resend):

### 1. VITE_SUPABASE_URL
```
https://tqdencmzezjevnntifos.supabase.co
```
- ✅ Production
- ✅ Preview
- ✅ Development

### 2. VITE_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZGVuY216ZXpqZXZubnRpZm9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyODU4NDQsImV4cCI6MjA3NTg2MTg0NH0.FxMGCcoybrJFFPS_qDO-xz0alQvyh5VDo4Q_OsFBcXA
```
- ✅ Production
- ✅ Preview  
- ✅ Development

### 3. SUPABASE_SERVICE_ROLE_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZGVuY216ZXpqZXZubnRpZm9zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDI4NTg0NCwiZXhwIjoyMDc1ODYxODQ0fQ.uxEZA601xL0j3auJBabMHfCsa17w43x6vJU9t7L-L2E
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
