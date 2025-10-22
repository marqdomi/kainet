# 🔧 Solución: Error "duplicate key value" en SQL

## ❌ Error que Recibiste

```sql
ERROR:  23505: duplicate key value violates unique constraint "projects_slug_key"
DETAIL:  Key (slug)=(kainet-resto) already exists.
```

## 🎯 Causa

El script SQL intentaba **insertar** proyectos/posts que ya existían en la tabla. Los slugs son únicos, por lo que falla.

```
Primera ejecución: ✅ Funciona (tabla vacía)
Segunda ejecución: ❌ ERROR (slugs ya existen)
```

## ✅ Solución Aplicada

He actualizado ambos scripts SQL para ser **idempotentes** usando `ON CONFLICT`:

### Nuevo Patrón SQL

```sql
INSERT INTO table (columns) VALUES (...)
ON CONFLICT (unique_column) DO UPDATE SET
  column1 = EXCLUDED.column1,
  column2 = EXCLUDED.column2,
  updated_at = NOW();
```

**¿Qué hace?**
- ✅ Si el registro NO existe → **Inserta** (INSERT)
- ✅ Si el registro YA existe → **Actualiza** (UPDATE)
- ✅ Nunca falla por duplicate key ✓

---

## 📁 Scripts Actualizados

### 1. `supabase/create-blog-posts-table.sql`

**Antes:**
```sql
DELETE FROM blog_posts WHERE TRUE;  -- ❌ Borra todo
INSERT INTO blog_posts (...) VALUES (...)
-- ❌ Falla si ya existe
```

**Después:**
```sql
INSERT INTO blog_posts (...) VALUES (...)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  ...
  updated_at = NOW();
-- ✅ Funciona siempre
```

### 2. `supabase/create-projects-table.sql`

**Ahora también usa:**
```sql
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  ...
  updated_at = NOW();
```

---

## 🚀 Cómo Ejecutar Ahora

Simplemente **ejecuta el mismo script de nuevo**, sin problemas:

```bash
1. Ve a Supabase Dashboard
2. SQL Editor → Pega el script
3. Execute
4. ✅ Funciona (inserta nuevos o actualiza existentes)
5. Ejecuta de nuevo si quieres → ✅ También funciona
```

---

## ✅ Verificación

Después de ejecutar el script:

```sql
-- Ver todos los posts
SELECT COUNT(*) as total FROM blog_posts;
-- Result: 6 ✓

-- Ver todos los proyectos
SELECT COUNT(*) as total FROM projects;
-- Result: 6 ✓

-- Ver que no hay errores
SELECT slug, updated_at FROM blog_posts ORDER BY updated_at DESC LIMIT 3;
-- Deberías ver timestamps recientes ✓
```

---

## 🔍 Diferencia Clave

### ❌ Método Antiguo (Error)
```sql
INSERT INTO projects (slug, title, ...) VALUES
('kainet-resto', 'KAINET Resto', ...),
('news-aggregator-ai', 'News Aggregator', ...)
-- ❌ Si alguno existe → ERROR completo
```

### ✅ Método Nuevo (Seguro)
```sql
INSERT INTO projects (slug, title, ...) VALUES
('kainet-resto', 'KAINET Resto', ...),
('news-aggregator-ai', 'News Aggregator', ...)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  ...
-- ✅ Si existen → actualiza, sino → inserta
-- ✅ Si no existen → inserta normalmente
```

---

## 💡 Beneficios

| Aspecto | Antes | Después |
|---------|-------|---------|
| **Primera ejecución** | ✅ Funciona | ✅ Funciona |
| **Segunda ejecución** | ❌ ERROR | ✅ Funciona |
| **Tercera ejecución** | ❌ ERROR | ✅ Funciona |
| **Actualizar datos** | Falla | ✅ Automático |
| **Idempotente** | ❌ No | ✅ Sí |

---

## 🎯 Próximos Pasos

1. ✅ Ejecuta el script **create-blog-posts-table.sql** (actualizado)
2. ✅ Ejecuta el script **create-projects-table.sql** (actualizado)
3. ✅ Verifica que funciona ambos
4. ✅ Ejecuta de nuevo si quieres → Todo bien

---

## 📊 Antes vs Después

```
ANTES:
1. Ejecutar SQL ✅ → Funciona
2. Ejecutar SQL ❌ → Error: duplicate key
3. Ejecutar SQL ❌ → Error: duplicate key

DESPUÉS:
1. Ejecutar SQL ✅ → Inserta 6 registros
2. Ejecutar SQL ✅ → Actualiza 6 registros
3. Ejecutar SQL ✅ → Actualiza 6 registros
```

---

## 🔗 Commits

```
Commit anterior: 099f874, dc78943, 1778ffe (Supabase fix)
Cambios actuales: 
  - create-blog-posts-table.sql (actualizado con ON CONFLICT)
  - create-projects-table.sql (actualizado con ON CONFLICT)
```

---

**Status:** ✅ Ready to Execute
**Safe to run:** Multiple times
**Tested:** ✅ Local SQL

---

*Ahora el script es seguro y reutilizable - Oct 21, 2025*
