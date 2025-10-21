# ⚙️ Cómo Configurar la Base de Datos en Supabase

## 🔴 Problema Actual
La tabla `blog_posts` no está creada o mal configurada. Necesitas ejecutar el SQL para crearla correctamente.

## ✅ Solución

### Opción 1: Ejecutar en Supabase Dashboard (Recomendado)

1. **Abre Supabase**
   - Ve a https://app.supabase.com
   - Selecciona tu proyecto `kainet`

2. **Abre SQL Editor**
   - En el sidebar izquierdo, haz click en "SQL Editor"
   - O usa el atajo: Cmd+K

3. **Copia y pega el SQL**
   - Abre el archivo: `/supabase/create-blog-posts-table.sql`
   - Cópialo completamente

4. **En Supabase SQL Editor**
   - Pega el contenido
   - Haz click en "RUN" (o presiona Ctrl+Enter)
   - Espera a que se complete

5. **Verifica**
   ```sql
   SELECT * FROM blog_posts LIMIT 1;
   ```
   Si no hay error, ¡listo!

### Opción 2: Script Automatizado

```bash
cd mcp-server/news-aggregator
node setup-database.js
```

## 🔍 Verificar que está configurado correctamente

```bash
node test-supabase.js
```

Debe mostrar:
```
✅ ALL TESTS PASSED
✅ Your Supabase setup is working correctly!
```

## 📝 SQL que Necesita Ejecutarse

El archivo `/supabase/create-blog-posts-table.sql` contiene:

- **Tabla**: `blog_posts` con campos:
  - `id` (BIGSERIAL AUTO-INCREMENT)
  - `slug` (UNIQUE)
  - `title`, `excerpt`, `content`, `author`, `category`
  - `featured`, `read_time`, `image`, `date`
  - `created_at`, `updated_at` (timestamps)

- **Índices** para búsquedas rápidas
- **Triggers** para auto-actualizar timestamps
- **RLS Policies** para seguridad

## ❓ FAQ

**P: ¿Puedo ejecutar el SQL múltiples veces?**
R: Sí, incluye `IF NOT EXISTS` y `DROP IF EXISTS` para seguridad.

**P: ¿Qué pasa si falla?**
R: Borra la tabla con `DROP TABLE IF EXISTS blog_posts CASCADE;` e intenta de nuevo.

**P: ¿Cómo sé que funcionó?**
R: Ejecuta `node test-supabase.js` - debería insertar un registro de prueba exitosamente.

## 📌 Próximos Pasos

1. ✅ Ejecuta el SQL en Supabase
2. ✅ Verifica con `node test-supabase.js`
3. ✅ Corre el generador: `npm run generate-weekly`
4. ✅ Mira los posts en Supabase Dashboard > blog_posts

¡Listo! Los posts se guardarán automáticamente en Supabase.
