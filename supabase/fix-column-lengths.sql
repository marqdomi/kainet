-- Fix: Aumentar límites de columnas en blog_posts
-- El generador de IA a veces crea títulos y slugs muy largos

-- Aumentar límite de title de 500 a 1000 caracteres
ALTER TABLE blog_posts 
ALTER COLUMN title TYPE VARCHAR(1000);

-- Aumentar límite de slug de 255 a 500 caracteres
ALTER TABLE blog_posts 
ALTER COLUMN slug TYPE VARCHAR(500);

-- Aumentar límite de image de 500 a 1000 caracteres (URLs largas)
ALTER TABLE blog_posts 
ALTER COLUMN image TYPE VARCHAR(1000);

-- Verificar cambios
SELECT 
  column_name, 
  data_type, 
  character_maximum_length 
FROM information_schema.columns 
WHERE table_name = 'blog_posts' 
  AND column_name IN ('title', 'slug', 'image')
ORDER BY column_name;
