// src/pages/ProjectsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Badge, Button, Skeleton, SectionTitle } from '../components/ui';
import HolographicCard from '../components/effects/HolographicCard';
import GlitchText from '../components/effects/GlitchText';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'AI', 'Web', 'Automation', 'MLOps'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'published')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <SectionTitle kanji="作" title="Proyectos" align="center" />
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mt-4">
            Soluciones innovadoras en IA, automatización y desarrollo web que transforman ideas en realidad
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-[var(--cyan-neon)] text-[var(--gray-900)] shadow-lg shadow-[var(--cyan-neon)]/30'
                  : 'bg-[var(--gray-800)] text-[var(--text-secondary)] hover:bg-[var(--gray-700)] border border-[var(--gray-700)]'
              }`}
            >
              {category === 'all' ? 'Todos' : category}
            </button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <HolographicCard key={i}>
                <Skeleton variant="card" />
              </HolographicCard>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <HolographicCard className="text-center py-12">
            <p className="text-[var(--text-danger)] mb-4">Error al cargar proyectos: {error}</p>
            <Button onClick={fetchProjects} variant="primary">
              Reintentar
            </Button>
          </HolographicCard>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredProjects.length === 0 ? (
              <HolographicCard className="col-span-full text-center py-12">
                <p className="text-[var(--text-secondary)] text-lg">
                  No hay proyectos en la categoría "{selectedCategory}"
                </p>
              </HolographicCard>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <HolographicCard className="h-full flex flex-col">
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="mb-4">
                        <Badge variant="default" size="sm">
                          Destacado
                        </Badge>
                      </div>
                    )}

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
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--text-secondary)] mb-6 flex-grow">
                      {project.short_description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech_stack?.slice(0, 4).map((tech, i) => (
                        <span 
                          key={i}
                          className="text-xs px-3 py-1 bg-[var(--gray-800)] text-[var(--cyan-neon)] rounded-full border border-[var(--gray-700)]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech_stack?.length > 4 && (
                        <span className="text-xs px-3 py-1 bg-[var(--gray-800)] text-[var(--text-secondary)] rounded-full">
                          +{project.tech_stack.length - 4} más
                        </span>
                      )}
                    </div>

                    {/* Metrics */}
                    {project.metrics && (
                      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-[var(--gray-800)]/50 rounded-lg border border-[var(--gray-700)]">
                        {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                          <div key={key}>
                            <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wide mb-1">
                              {key.replace(/_/g, ' ')}
                            </p>
                            <p className="text-sm font-bold text-[var(--cyan-neon)]">
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.live_url && (
                        <Button
                          as="a"
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="primary"
                          size="sm"
                          className="flex-1"
                        >
                          Ver Demo →
                        </Button>
                      )}
                      {project.github_url && (
                        <Button
                          as="a"
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="secondary"
                          size="sm"
                          className="flex-1"
                        >
                          GitHub
                        </Button>
                      )}
                      {!project.live_url && !project.github_url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled
                          className="flex-1"
                        >
                          Próximamente
                        </Button>
                      )}
                    </div>
                  </HolographicCard>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* CTA Section */}
        {!loading && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16"
          >
            <HolographicCard className="text-center py-12">
              <GlitchText
                text="¿Tienes un proyecto en mente?"
                className="text-3xl font-bold text-[var(--text-primary)] mb-4"
                as="h3"
              />
              <p className="text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
                Trabajemos juntos para crear algo extraordinario. Especialistas en IA, automatización y desarrollo web.
              </p>
              <Link to="/contact">
                <Button variant="primary" size="lg">
                  Hablemos →
                </Button>
              </Link>
            </HolographicCard>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
