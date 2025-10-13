-- Script SQL para migrar el post existente a Supabase
-- Ejecutar en: Supabase SQL Editor

INSERT INTO blog_posts (
  id,
  slug,
  title,
  excerpt,
  author,
  date,
  read_time,
  category,
  image,
  featured,
  content
) VALUES (
  1760112890655,
  'ia-semanal-semana-41-2025',
  'IA Esta Semana: Análisis y Perspectivas (Semana 41)',
  'Análisis curado de las noticias más importantes en inteligencia artificial. Más allá de los titulares, lo que realmente importa para quienes construyen con IA.',
  'KAINET AI Bot',
  '2025-10-10',
  '8 min',
  'IA',
  'https://placehold.co/800x500/0a0a0a/00E5FF?text=IA+%26+MLOps',
  false,
  '**Semana 41, 2025**

Análisis curado de tendencias en IA empresarial, automatización inteligente y MLOps. Más allá del hype: lo que importa para equipos que construyen y operan sistemas de producción.

## Historia Principal

*La noticia que está marcando la semana en IA*

<div class="featured-card">

<h3 class="card-title">A small number of samples can poison LLMs of any size</h3>

Un estudio colaborativo de Anthropic, UK AI Security Institute y The Alan Turing Institute revela que un número muy bajo de documentos maliciosos, tan pocos como **250**, es suficiente para introducir una vulnerabilidad de tipo "backdoor" en Large Language Models (LLMs), independientemente del tamaño del modelo o el volumen total de datos de entrenamiento.

<div class="card-meta">
**Fuente:** Hacker News • **Engagement:** 1,072 puntos • 392 comentarios
</div>

[Leer artículo completo →](https://www.anthropic.com/research/small-samples-poison)

</div>

## Otras Noticias Relevantes

[... contenido completo del post ...]

---

<div class="post-footer">

**Fuentes:** 54 artículos analizados • **Curado por:** KAINET AI Research

[Compartir feedback](/contact) • [Ver archivo completo](/blog)

</div>'
);

-- Verificar que se insertó correctamente
SELECT id, title, date, category FROM blog_posts ORDER BY date DESC LIMIT 5;
