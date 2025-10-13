# 🗄️ Setup de Base de Datos - Supabase para Blog

## 📋 Prerrequisitos

- Cuenta en Supabase (gratis): https://supabase.com
- Tu proyecto debe estar desplegado en Vercel

---

## 🚀 Paso 1: Crear Proyecto en Supabase

1. Ve a https://supabase.com y crea una cuenta
2. Click en "New Project"
3. Configura:
   - **Name:** kainet-blog
   - **Database Password:** (guarda esto en un lugar seguro)
   - **Region:** East US (más cercano a tu Vercel)
   - **Pricing Plan:** Free
4. Espera ~2 minutos a que se cree el proyecto

---

## 🔧 Paso 2: Crear Tabla de Posts

Ve a **SQL Editor** en Supabase y ejecuta este script:

```sql
-- Tabla principal de posts del blog
CREATE TABLE blog_posts (
  id BIGINT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author TEXT DEFAULT 'KAINET AI Bot',
  date DATE NOT NULL,
  read_time TEXT DEFAULT '8 min',
  category TEXT NOT NULL,
  image TEXT,
  featured BOOLEAN DEFAULT false,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_blog_posts_date ON blog_posts(date DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (seguridad)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede leer posts (público)
CREATE POLICY "Los posts son públicos para lectura"
  ON blog_posts FOR SELECT
  USING (true);

-- Política: Solo autenticados pueden insertar/actualizar (protección)
CREATE POLICY "Solo usuarios autenticados pueden escribir"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');
```

---

## 🔑 Paso 3: Obtener Credenciales

1. Ve a **Settings** → **API** en Supabase
2. Copia estas credenciales:
   - **Project URL:** `https://[tu-proyecto].supabase.co`
   - **anon public key:** `eyJ...` (larga)
   - **service_role key:** `eyJ...` (larga, SECRETA)

---

## 🌐 Paso 4: Configurar Variables de Entorno

### **A) En Local (.env.local):**

Agrega estas líneas a tu `.env.local`:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ... (tu anon key)
SUPABASE_SERVICE_ROLE_KEY=eyJ... (tu service role key - SOLO BACKEND)
```

### **B) En Vercel:**

Ve a: **Vercel Dashboard → Tu Proyecto → Settings → Environment Variables**

Agrega las mismas 3 variables para **Production, Preview, Development**.

---

## 📦 Paso 5: Instalar Dependencias

Ejecuta en tu terminal:

```bash
npm install @supabase/supabase-js
```

---

## 🎯 Siguiente Paso

Una vez completados estos pasos, confirma y procederemos a:
1. Crear el cliente de Supabase
2. Migrar los posts existentes
3. Actualizar el componente Blog para leer de la base de datos
4. Actualizar el script de automatización para guardar en Supabase

---

**Documentado:** 12 Oct 2025
