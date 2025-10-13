// src/components/Services.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Button } from './ui';

const Services = () => {
  const services = [
    {
      icon: '🤖',
      title: 'Inteligencia Artificial',
      description: 'Desarrollamos soluciones de IA personalizadas: chatbots con RAG, análisis de datos, automatización de contenido con LLMs, y pipelines ML.',
      technologies: ['OpenAI', 'Claude', 'LangChain', 'TensorFlow'],
      features: [
        'Chatbots inteligentes con RAG',
        'Generación de contenido con IA',
        'Análisis predictivo y ML',
        'Integración de APIs de IA'
      ]
    },
    {
      icon: '⚡',
      title: 'Automatización',
      description: 'Optimizamos procesos empresariales con workflows inteligentes, scraping de datos, integración de APIs y sistemas de notificaciones automatizadas.',
      technologies: ['Node.js', 'Python', 'Redis', 'GitHub Actions'],
      features: [
        'Workflows personalizados',
        'Web scraping inteligente',
        'Integraciones API',
        'Notificaciones automatizadas'
      ]
    },
    {
      icon: '💻',
      title: 'Desarrollo Web',
      description: 'Creamos aplicaciones web modernas, rápidas y escalables con las últimas tecnologías: React, Next.js, Three.js y diseños 3D interactivos.',
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
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Nuestros Servicios<span className="text-[var(--cyan-neon)]">.</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
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
              <Card 
                hover 
                className="h-full flex flex-col"
              >
                {/* Icon */}
                <div className="text-6xl mb-4">{service.icon}</div>
                
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
                      <span className="text-[var(--cyan-neon)] mr-2">✓</span>
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
              </Card>
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
