// src/components/LatestPosts.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Badge, Button, Skeleton, SectionTitle } from './ui';
import HolographicCard from './effects/HolographicCard';
import { calculateReadTime } from '../utils/readTime';

const LatestPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const fetchLatestPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching latest posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <SectionTitle kanji="記" title="Últimas Publicaciones" align="center" />
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mt-4">
            Artículos sobre IA, automatización, desarrollo web y las últimas tendencias tech
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <HolographicCard key={i}>
                <Skeleton variant="card" />
              </HolographicCard>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {!loading && posts.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {posts.map((post) => (
              <motion.div
                key={post.id}
                variants={cardVariants}
              >
                <Link to={`/blog/${post.slug}`}>
                  <HolographicCard className="h-full flex flex-col group">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <Badge variant="purple" size="sm">
                        {post.category || 'General'}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 line-clamp-2 group-hover:text-[var(--cyan-neon)] transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[var(--text-secondary)] mb-6 flex-grow line-clamp-3">
                      {post.excerpt || post.content?.substring(0, 150) + '...'}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-[var(--text-secondary)] pt-4 border-t border-[var(--gray-700)]">
                      <span>{formatDate(post.created_at)}</span>
                      <span>{calculateReadTime(post.content)} min</span>
                    </div>
                  </HolographicCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link to="/blog">
            <Button variant="ghost" size="lg">
              Ver todos los artículos →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestPosts;
