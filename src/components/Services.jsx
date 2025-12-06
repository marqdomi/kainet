// src/components/Services.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Card } from './ui';
import { SectionTitle } from './ui';

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
      ],
      accent: 'var(--orange-accent)'
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
      ],
      accent: 'var(--purple-neon)'
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
      ],
      accent: 'var(--pink-accent)'
    }
  ];

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
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <SectionTitle kanji="技">Nuestros Servicios</SectionTitle>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mt-4 px-2 sm:px-0">
            Transformamos ideas en soluciones tecnológicas que impulsan tu negocio hacia el futuro
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
            >
              <Card 
                variant="default" 
                hover 
                padding="lg"
                className="h-full flex flex-col min-h-0 sm:min-h-[400px] lg:min-h-[420px]"
              >
                {/* Kanji Icon */}
                <div
                  className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4 font-bold"
                  style={{ color: service.accent }}
                >
                  {service.kanji}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2 sm:mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-4 sm:mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm text-[var(--text-secondary)]"
                    >
                      <span className="mr-2" style={{ color: service.accent }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                  {service.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-white/[0.05] text-[var(--cyan-neon)] rounded-full border border-white/[0.08]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
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
