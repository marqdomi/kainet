// src/utils/readTime.js

/**
 * Calcula el tiempo estimado de lectura basado en el contenido
 * @param {string} content - Contenido del artículo (puede incluir HTML/Markdown)
 * @returns {string} - Tiempo de lectura formateado (ej: "5 min", "12 min")
 */
export const calculateReadTime = (content) => {
  if (!content) return '5 min';
  
  // Remover HTML tags
  const withoutHTML = content.replace(/<[^>]*>/g, ' ');
  
  // Remover Markdown (títulos, enlaces, negritas, etc.)
  const plainText = withoutHTML
    .replace(/[#*`_\[\]()]/g, '') // Remover markdown básico
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remover imágenes
    .replace(/\[.*?\]\(.*?\)/g, '') // Remover links
    .replace(/\n+/g, ' ') // Convertir saltos de línea en espacios
    .replace(/\s+/g, ' ') // Normalizar espacios
    .trim();
  
  // Contar palabras
  const words = plainText.split(/\s+/).filter(word => word.length > 0).length;
  
  // Velocidad promedio de lectura en español: 200-250 palabras/minuto
  // Usamos 225 como promedio
  const wordsPerMinute = 225;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  // Formatear resultado
  if (minutes < 1) return 'Menos de 1 min';
  if (minutes === 1) return '1 min';
  return `${minutes} min`;
};

/**
 * Obtiene el tiempo de lectura de un post
 * Prioriza el cálculo dinámico sobre el valor estático
 */
export const getReadTime = (post) => {
  if (!post) return '5 min';
  
  // Si tiene contenido, calcular dinámicamente
  if (post.content) {
    return calculateReadTime(post.content);
  }
  
  // Fallback al readTime estático si existe
  return post.readTime || '5 min';
};
