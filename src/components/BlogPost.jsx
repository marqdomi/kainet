// src/components/BlogPost.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';
import { getPostBySlug, getBlogPosts } from '../lib/supabase';
import SectionWrapper from '../hoc/SectionWrapper';
import { calculateReadTime } from '../utils/readTime';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [readTime, setReadTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        setError(null);

        if (slug) {
          // 🚀 Cargar post desde Supabase
          const foundPost = await getPostBySlug(slug);

          if (!foundPost) {
            setError('Post no encontrado');
            setLoading(false);
            return;
          }

          setPost(foundPost);

          // Calcular tiempo de lectura real
          if (foundPost.content) {
            const calculatedTime = calculateReadTime(foundPost.content);
            setReadTime(calculatedTime);
          }

          // Posts relacionados (misma categoría)
          try {
            const allPosts = await getBlogPosts();
            const related = allPosts
              .filter((p) => p.category === foundPost.category && p.id !== foundPost.id)
              .slice(0, 3);
            setRelatedPosts(related);
          } catch (err) {
            console.warn('No se pudieron cargar posts relacionados', err);
          }
        }

        // Scroll to top cuando cambia el post
        window.scrollTo(0, 0);
      } catch (err) {
        console.error('Error cargando post:', err);
        setError('Error al cargar el post');
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  // Estado de carga
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#00E5FF] border-r-transparent mb-4"></div>
          <p className="text-gray-300">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  // Estado de error o post no encontrado
  if (error || !post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-heading mb-4">
            {error || 'Post no encontrado'}
          </h2>
          <a
            href="/blog"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            ← Volver al blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Header del Post */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-6 mb-12"
      >
        {/* Breadcrumb */}
        <div className="mb-6">
          <a
            href="/blog"
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
          >
            ← Volver al blog
          </a>
        </div>

        {/* Categoría */}
        <span className="inline-block px-4 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-sm font-medium mb-4">
          {post.category}
        </span>

        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-muted text-sm mb-8">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>{post.author}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{formatDate(post.date)}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{readTime || post.readTime}</span>
          </div>
        </div>

        {/* Imagen destacada */}
        {post.image && (
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-2xl mb-12"
          />
        )}
      </motion.div>

      {/* Contenido del Post */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-4xl mx-auto px-6"
      >
        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-body mb-12 leading-relaxed italic border-l-4 border-cyan-400 pl-6">
            {post.excerpt}
          </p>
        )}

        {/* Contenido principal - renderizar markdown como HTML */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-heading prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
            prose-p:text-body prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
            prose-strong:text-heading prose-strong:font-bold
            prose-ul:text-body prose-ul:my-6
            prose-ol:text-body prose-ol:my-6
            prose-li:mb-2
            prose-code:text-cyan-400 prose-code:bg-cyan-400/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-[var(--card-bg)] prose-pre:border prose-pre:border-[var(--border-color)]
            prose-blockquote:border-l-4 prose-blockquote:border-cyan-400 prose-blockquote:pl-6 prose-blockquote:italic
            prose-hr:border-[var(--border-color)] prose-hr:my-12
          "
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(renderMarkdown(post.content)) }}
        />
      </motion.article>

      {/* Posts Relacionados */}
      {relatedPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-6xl mx-auto px-6 mt-20"
        >
          <h2 className="text-3xl font-bold text-heading mb-8">
            Artículos Relacionados
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <a
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="group"
              >
                <div className="card-default border rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <span className="text-xs text-cyan-400 font-medium">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-lg font-bold text-heading mt-2 mb-3 group-hover:text-cyan-400 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="text-xs text-muted">
                      {relatedPost.readTime}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {/* CTA Final */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="max-w-4xl mx-auto px-6 mt-20 text-center"
      >
        <div className="card-featured border rounded-2xl p-12">
          <h3 className="text-2xl font-bold text-heading mb-4">
            ¿Te gustó este artículo?
          </h3>
          <p className="text-body mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter para recibir más contenido sobre IA,
            automatización y desarrollo de prototipos técnicos.
          </p>
          <a
            href="/contact"
            className="btn btn-lg btn-primary"
          >
            Contactar a KAINET
          </a>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
}

// Renderizador mejorado de Markdown a HTML
function renderMarkdown(markdown) {
  if (!markdown) return '';

  let html = markdown;

  // Si ya contiene HTML (divs, etc), preservarlo
  const hasHTML = /<div|<h[1-6]|<p>|<ul>|<blockquote/.test(html);

  if (hasHTML) {
    // Ya tiene HTML, pero aún necesitamos procesar markdown de headers
    // Headers (procesar primero)
    html = html.replace(/^## (.+)$/gim, '<h2>$1</h2>');
    html = html.replace(/^### (.+)$/gim, '<h3>$1</h3>');
    html = html.replace(/^#### (.+)$/gim, '<h4>$1</h4>');

    // Párrafos con solo cursiva (subtítulos descriptivos)
    html = html.replace(/^\*(.+?)\*$/gim, '<p><em>$1</em></p>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic (que no sea línea completa)
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      const isExternal = url.startsWith('http');
      const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${url}"${target}>${text}</a>`;
    });

    // Code inline
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    return html;
  }

  // Si NO tiene HTML, renderizar markdown completo
  // Headers
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Blockquotes (antes de otros patterns)
  html = html.replace(/^> (.+)$/gim, '<blockquote>$1</blockquote>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links con mejor handling
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    // Detectar si es link externo
    const isExternal = url.startsWith('http');
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${url}"${target}>${text}</a>`;
  });

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr>');

  // Lists (mejorado)
  // Primero marcar items
  html = html.replace(/^- (.+)$/gim, '<li>$1</li>');
  html = html.replace(/^\d+\. (.+)$/gim, '<li>$1</li>');

  // Luego envolver en ul/ol
  html = html.replace(/(<li>.*?<\/li>\s*)+/gs, (match) => {
    return `<ul>${match}</ul>`;
  });

  // Code (inline)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Line breaks y párrafos
  html = html.replace(/\n\n+/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');

  // Wrap en párrafos
  html = `<p>${html}</p>`;

  // Limpiar párrafos vacíos y mal formados
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>(<h[1-6])/g, '$1');
  html = html.replace(/<\/h([1-6])><\/p>/g, '</h$1>');
  html = html.replace(/<p>(<hr)/g, '$1');
  html = html.replace(/(<\/hr>)<\/p>/g, '$1');
  html = html.replace(/<p>(<div)/g, '$1');
  html = html.replace(/(<\/div>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul)/g, '$1');
  html = html.replace(/(<\/ul>)<\/p>/g, '$1');
  html = html.replace(/<p>(<blockquote)/g, '$1');
  html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');

  // Limpiar br duplicados
  html = html.replace(/(<br\s*\/?>\s*){2,}/g, '<br>');

  return html;
}

export default SectionWrapper(BlogPost, 'blogpost');
