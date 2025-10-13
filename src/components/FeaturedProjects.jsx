// src/components/FeaturedProjects.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Badge, Button, Skeleton } from './ui';
import HolographicCard from './effects/HolographicCard';
import useParallaxScroll from '../hooks/useParallaxScroll';

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching featured projects:', err);
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

  // Parallax wrapper component for project cards
  const ParallaxCard = ({ children, index }) => {
    const { offset, blur, ref } = useParallaxScroll({ 
      speed: 0.1 + (index * 0.05), // Different speeds for depth effect
      maxBlur: 1.5 
    });

    return (
      <div
        ref={ref}
        style={{
          transform: `translateY(${offset}px)`,
          filter: `blur(${blur}px)`,
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-transparent via-[var(--gray-900)]/30 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Proyectos Destacados<span className="text-[var(--cyan-neon)]">.</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            Casos de éxito que demuestran nuestro expertise en IA, automatización y desarrollo web
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

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
              >
                <ParallaxCard index={index}>
                  <HolographicCard className="h-full flex flex-col">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <Badge 
                        variant={
                          project.category === 'AI' ? 'purple' : 
                          project.category === 'Web' ? 'default' : 
                          project.category === 'Automation' ? 'success' : 
                          'warning'
                        }
                        size="md"
                      >
                        {project.category}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 line-clamp-2">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--text-secondary)] mb-6 flex-grow line-clamp-3">
                      {project.short_description}
                    </p>

                    {/* Tech Stack (first 3) */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech_stack?.slice(0, 3).map((tech, i) => (
                        <span 
                          key={i}
                          className="text-xs px-3 py-1 bg-[var(--gray-800)] text-[var(--cyan-neon)] rounded-full border border-[var(--gray-700)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Primary Metric */}
                    {project.metrics && (
                      <div className="mb-4 p-3 bg-[var(--gray-800)]/50 rounded-lg border border-[var(--gray-700)]">
                        {Object.entries(project.metrics).slice(0, 1).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <p className="text-2xl font-bold text-[var(--cyan-neon)] mb-1">
                              {value}
                            </p>
                            <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wide">
                              {key.replace(/_/g, ' ')}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Link */}
                    {project.live_url && (
                      <Button
                        as="a"
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="secondary"
                        size="sm"
                        className="w-full"
                      >
                        Ver Demo →
                      </Button>
                    )}
                  </HolographicCard>
                </ParallaxCard>
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
          <Link to="/projects">
            <Button variant="ghost" size="lg">
              Ver todos los proyectos →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
