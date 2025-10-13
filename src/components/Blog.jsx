// src/components/Blog.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../hoc/SectionWrapper';
import { getBlogPosts, getCategories } from '../lib/supabase';
import { calculateReadTime } from '../utils/readTime';
import LazyImage from './LazyImage';

// ---- Categorías dinámicas desde la base de datos ----
const defaultCategories = ['Todos', 'IA', 'Automatización', 'Tutoriales', 'DevOps'];

// ---- Animaciones ----
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ---- Featured Post Card (grande) ----
const FeaturedPost = ({ post }) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 mb-12"
  >
    <div className="grid md:grid-cols-2 gap-0">
      {/* Image */}
      <div className="relative overflow-hidden h-64 md:h-auto">
        <LazyImage
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          placeholderClassName="h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:hidden" />
      </div>

      {/* Content */}
      <div className="p-8 md:p-10 flex flex-col justify-center">
        <span className="inline-block w-fit px-3 py-1 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] text-xs font-medium mb-4">
          ⭐ Destacado
        </span>
        
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-[#00E5FF] transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-300 mb-6 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
          <span>{post.author}</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>•</span>
          <span>{calculateReadTime(post.content)} lectura</span>
        </div>

        <a
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-[#00E5FF] font-medium hover:gap-3 transition-all"
        >
          Leer artículo completo
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>

    {/* Glow effect */}
    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#00E5FF]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.article>
);

// ---- Regular Post Card ----
const PostCard = ({ post }) => (
  <motion.article
    variants={cardVariants}
    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
  >
    {/* Image */}
    <div className="relative overflow-hidden aspect-[16/10]">
      <LazyImage
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        placeholderClassName="aspect-[16/10]"
      />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white text-xs font-medium">
          {post.category}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00E5FF] transition-colors line-clamp-2">
        {post.title}
      </h3>
      
      <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{new Date(post.date).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })}</span>
        <span>{calculateReadTime(post.content)}</span>
      </div>

      <a
        href={`/blog/${post.slug}`}
        className="absolute inset-0"
        aria-label={`Leer: ${post.title}`}
      >
        <span className="sr-only">Leer artículo</span>
      </a>
    </div>

    {/* Hover border effect */}
    <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#00E5FF]/40 transition-all pointer-events-none" />
  </motion.article>
);

// ---- Category Filter ----
const CategoryFilter = ({ categories, active, onChange }) => (
  <div className="flex flex-wrap gap-3 justify-center mb-12">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => onChange(cat)}
        className={`px-5 py-2 rounded-full text-sm font-medium transition-all
          ${active === cat
            ? 'bg-[#00E5FF] text-black'
            : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/20'
          }`}
      >
        {cat}
      </button>
    ))}
  </div>
);

// ---- Newsletter CTA ----
const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Aquí integrarías con tu servicio de email (Mailchimp, ConvertKit, etc.)
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#00E5FF]/10 to-transparent p-10 text-center mt-16"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00E5FF]/20 rounded-full blur-3xl opacity-30" />
      
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          No te pierdas las novedades
        </h3>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Suscríbete a nuestra newsletter y recibe artículos sobre IA,
          automatización y desarrollo directamente en tu inbox.
        </p>

        {status === 'success' ? (
          <div className="text-[#00E5FF] font-medium">
            ✅ ¡Suscripción exitosa! Revisa tu email.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-black/40 text-white placeholder:text-gray-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/60"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-kainet px-6 py-3 disabled:opacity-60"
            >
              {status === 'sending' ? 'Enviando...' : 'Suscribirse'}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

// ---- Main Blog Component ----
const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const postsPerPage = 6;

  // 🚀 Cargar posts desde Supabase
  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        setError(null);
        
        // Cargar posts
        const allPosts = await getBlogPosts();
        setPosts(allPosts);
        
        // Cargar categorías dinámicas
        try {
          const dbCategories = await getCategories();
          if (dbCategories.length > 0) {
            setCategories(['Todos', ...dbCategories]);
          }
        } catch (catError) {
          console.warn('No se pudieron cargar categorías, usando predeterminadas', catError);
        }
        
      } catch (err) {
        console.error('Error cargando posts:', err);
        setError('No se pudieron cargar los posts. Por favor intenta más tarde.');
      } finally {
        setLoading(false);
      }
    }
    
    loadPosts();
  }, []);

  const featuredPost = useMemo(
    () => posts.find((p) => p.featured),
    [posts]
  );

  // 🚀 OPTIMIZADO: Filtrar y paginar posts
  const { paginatedPosts, totalPages } = useMemo(() => {
    const filtered = posts.filter((p) => 
      !p.featured && (selectedCategory === 'Todos' || p.category === selectedCategory)
    );
    
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginated = filtered.slice(startIndex, endIndex);
    const total = Math.ceil(filtered.length / postsPerPage);
    
    return { paginatedPosts: paginated, totalPages: total };
  }, [posts, selectedCategory, currentPage]);

  // Resetear página cuando cambie la categoría
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Estado de carga
  if (loading) {
    return (
      <section>
        <div className="mx-auto max-w-6xl px-6 text-center py-20">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#00E5FF] border-r-transparent"></div>
          <p className="mt-4 text-gray-300">Cargando posts...</p>
        </div>
      </section>
    );
  }

  // Estado de error
  if (error) {
    return (
      <section>
        <div className="mx-auto max-w-6xl px-6 text-center py-20">
          <div className="text-red-400 mb-4">⚠️ {error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-kainet"
          >
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mx-auto max-w-6xl px-6">
        
        {/* ===== HERO ===== */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Blog & <span className="text-[#00E5FF]">Noticias</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explorando el futuro de la IA, automatización y desarrollo web.
              Artículos, tutoriales y análisis profundos.
            </p>
          </motion.div>
        </div>

        {/* ===== FEATURED POST ===== */}
        {featuredPost && <FeaturedPost post={featuredPost} />}

        {/* ===== CATEGORY FILTER ===== */}
        <CategoryFilter
          categories={categories}
          active={selectedCategory}
          onChange={handleCategoryChange}
        />

        {/* ===== POSTS GRID ===== */}
        {paginatedPosts.length > 0 ? (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              key={`${selectedCategory}-${currentPage}`} // Key para forzar re-animación
            >
              {paginatedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </motion.div>

            {/* ===== PAGINACIÓN ===== */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ← Anterior
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg transition-all ${
                        currentPage === page
                          ? 'bg-[#00E5FF] text-black font-semibold'
                          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Siguiente →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No hay artículos en esta categoría todavía.
            </p>
          </div>
        )}

        {/* ===== NEWSLETTER CTA ===== */}
        <NewsletterCTA />
      </div>
    </section>
  );
};

export default SectionWrapper(Blog, 'blog');
