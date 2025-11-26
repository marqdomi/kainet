// src/components/Services.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './ui';
import { SectionTitle } from './ui';
import HolographicCard from './effects/HolographicCard';

const Services = () => {
  const services = [
    {
      kanji: '知',
      title: 'Inteligencia Artificial',
      description: 'Soluciones de IA que transforman datos en decisiones inteligentes. Chatbots con RAG, análisis predictivo, automatización con LLMs y pipelines ML optimizados.',
      technologies: ['OpenAI', 'Claude', 'LangChain', 'TensorFlow'],
      features: [
        'Chatbots inteligentes con RAG',
        'Generación de contenido con IA',
        'Análisis predictivo y ML',
        'Integración de APIs de IA'
      ]
    },
    {
      kanji: '速',
      title: 'Automatización',
      description: 'Automatización inteligente que libera tu tiempo para lo que importa. Workflows personalizados, scraping avanzado, integraciones API y notificaciones en tiempo real.',
      technologies: ['Node.js', 'Python', 'Redis', 'GitHub Actions'],
      features: [
        'Workflows personalizados',
        'Web scraping inteligente',
        'Integraciones API',
        'Notificaciones automatizadas'
      ]
    },
    {
      kanji: '創',
      title: 'Desarrollo Web',
      description: 'Experiencias web que combinan diseño impactante con tecnología de vanguardia. React, Next.js, Three.js y efectos 3D que cautivan a tus usuarios.',
      technologies: ['React', 'Next.js', 'Three.js', 'Tailwind CSS'],
      features: [
        'Apps web modernas y rápidas',
        'Efectos 3D interactivos',
        'Diseño responsive optimizado',
        'SEO y performance'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <SectionTitle kanji="技">Nuestros Servicios</SectionTitle>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mt-4">
            Transformamos ideas en soluciones tecnológicas que impulsan tu negocio hacia el futuro
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
            >
              <HolographicCard className="h-full flex flex-col card-depth min-h-[420px]">
                {/* Kanji Icon with color variety */}
                <div
                  className="text-6xl mb-4 font-bold"
                  style={{
                    color: index === 0 ? 'var(--orange-accent)' :
                      index === 1 ? 'var(--purple-neon)' :
                        'var(--pink-accent)'
                  }}
                >
                  {service.kanji}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--text-secondary)] mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm text-[var(--text-secondary)]"
                    >
                      <span
                        className="mr-2"
                        style={{
                          color: index === 0 ? 'var(--orange-accent)' :
                            index === 1 ? 'var(--purple-neon)' :
                              'var(--pink-accent)'
                        }}
                      >
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--gray-700)]">
                  {service.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-[var(--gray-800)] text-[var(--cyan-neon)] rounded-full border border-[var(--gray-700)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link to="/contact">
            <Button variant="primary" size="lg">
              Hablemos de tu proyecto →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
