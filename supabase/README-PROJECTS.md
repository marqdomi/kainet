# 📊 Setup de Base de Datos - Proyectos

## Instrucciones para Supabase

### 1. Acceder a Supabase SQL Editor

1. Ve a [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto **kainet**
3. En el menú lateral, click en **SQL Editor**

### 2. Ejecutar el Script

1. Click en **+ New query**
2. Copia todo el contenido del archivo `create-projects-table.sql`
3. Pégalo en el editor
4. Click en **Run** (o presiona `Ctrl/Cmd + Enter`)

### 3. Verificar la Tabla

Deberías ver un mensaje de éxito y la última query SELECT mostrará los 6 proyectos insertados:

```
✅ Table 'projects' created
✅ Indexes created
✅ Trigger created
✅ 6 projects inserted
```

### 4. Verificar desde el Table Editor

1. En el menú lateral, click en **Table Editor**
2. Busca la tabla **projects**
3. Deberías ver 6 filas con los proyectos de ejemplo

## Proyectos incluidos:

1. ⭐ **KAINET Resto** (Featured) - Sistema de gestión para restaurantes
2. ⭐ **News Aggregator AI** (Featured) - Agregador con IA
3. ⭐ **Automation Workflows** (Featured) - Sistema de workflows
4. **MLOps Pipeline** - Infraestructura ML
5. **Portfolio Personal** - Sitio con Three.js
6. **Chatbot RAG** - Chatbot inteligente

## Columnas de la tabla:

- `id`: ID autoincremental
- `slug`: URL amigable (único)
- `title`: Título del proyecto
- `short_description`: Descripción corta para cards
- `full_description`: Descripción completa
- `tech_stack`: Array de tecnologías
- `category`: AI, Web, Automation, MLOps
- `featured`: Boolean para destacar
- `live_url`: URL del sitio en vivo
- `github_url`: URL del repositorio
- `metrics`: JSON con métricas del proyecto
- `status`: draft o published
- `created_at`: Fecha de creación
- `updated_at`: Fecha de actualización (auto-update)

## Notas:

- Los proyectos featured aparecen primero
- El filtro por categoría funciona con el campo `category`
- El campo `status` permite tener proyectos en draft
- El trigger `update_projects_updated_at` actualiza automáticamente `updated_at`

## Troubleshooting:

Si hay errores:

1. **Error "relation already exists"**: La tabla ya existe, puedes borrarla con:
   ```sql
   DROP TABLE IF EXISTS projects CASCADE;
   ```
   Y luego volver a ejecutar el script.

2. **Error de permisos**: Asegúrate de estar usando el SQL Editor como admin.

3. **RLS (Row Level Security)**: Por defecto está deshabilitado para la tabla. Si quieres habilitarlo:
   ```sql
   ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
   
   -- Permitir SELECT a todos
   CREATE POLICY "Allow public read access" ON projects
   FOR SELECT USING (status = 'published');
   ```
