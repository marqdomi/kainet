-- Fix COMPLETO: Aumentar TODOS los límites de columnas en blog_posts
-- Para evitar errores de "value too long"

-- Aumentar límites generosamente
ALTER TABLE blog_posts 
ALTER COLUMN title TYPE TEXT; -- Sin límite

ALTER TABLE blog_posts 
ALTER COLUMN slug TYPE TEXT; -- Sin límite

ALTER TABLE blog_posts 
ALTER COLUMN excerpt TYPE TEXT; -- Sin límite (ya era TEXT pero por si acaso)

ALTER TABLE blog_posts 
ALTER COLUMN content TYPE TEXT; -- Sin límite (ya era TEXT pero por si acaso)

ALTER TABLE blog_posts 
ALTER COLUMN image TYPE TEXT; -- Sin límite

ALTER TABLE blog_posts 
ALTER COLUMN author TYPE VARCHAR(500); -- Aumentar de 255 a 500

ALTER TABLE blog_posts 
ALTER COLUMN category TYPE VARCHAR(200); -- Aumentar de 100 a 200

ALTER TABLE blog_posts 
ALTER COLUMN read_time TYPE VARCHAR(100); -- Aumentar de 50 a 100

-- Verificar cambios
SELECT 
  column_name, 
  data_type,
  character_maximum_length 
FROM information_schema.columns 
WHERE table_name = 'blog_posts' 
ORDER BY column_name;

-- Resultado esperado:
-- author: varchar(500)
-- category: varchar(200)
-- content: text (sin límite)
-- excerpt: text (sin límite)
-- image: text (sin límite)
-- read_time: varchar(100)
-- slug: text (sin límite)
-- title: text (sin límite)
