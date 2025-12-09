// src/components/Services.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Zap, Code2 } from 'lucide-react';
import { Button, Card } from './ui';
import { SectionTitle } from './ui';

const Services = () => {
  const services = [
    {
      icon: Brain,
      title: 'IA Aplicada y LLMs',
      description: 'Experimentación con pipelines RAG, Azure AI Foundry y Agentes Autónomos para fines educativos y de optimización.',
      technologies: ['OpenAI', 'Azure AI', 'LangChain', 'RAG'],
      features: [
        'Pipelines RAG avanzados',
        'Agentes autónomos con LLMs',
        'Integración Azure AI Foundry',
        'Fine-tuning y prompting'
      ],
      accent: 'var(--orange-accent)'
    },
    {
      icon: Code2,
      title: 'Ingeniería Full-Stack',
      description: 'Construcción de aplicaciones escalables usando Python (FastAPI), React y Next.js con enfoque en UX/UI intuitivo.',
      technologies: ['Python', 'FastAPI', 'React', 'Next.js'],
      features: [
        'APIs REST y GraphQL',
        'Aplicaciones React modernas',
        'Arquitectura de microservicios',
        'Diseño UX/UI centrado en usuario'
      ],
      accent: 'var(--pink-accent)'
    },
    {
      icon: Zap,
      title: 'Automatización de Redes',
      description: 'Uniendo NetDevOps con Infraestructura como Código (IaC) para resolver retos complejos en Centros de Datos.',
      technologies: ['Ansible', 'Terraform', 'Python', 'Docker'],
      features: [
        'NetDevOps y CI/CD',
        'Infraestructura como Código',
        'Automatización de Data Centers',
        'Monitoreo y observabilidad'
      ],
      accent: 'var(--purple-neon)'
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
          <SectionTitle>Competencias Técnicas</SectionTitle>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mt-4 px-2 sm:px-0">
            Áreas de investigación y dominio técnico que aplico en mis proyectos de I+D
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
                {/* Service Icon */}
                <div className="mb-3 sm:mb-4">
                  <service.icon 
                    size={48} 
                    style={{ color: service.accent }}
                    strokeWidth={1.5}
                  />
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
          <Link to="/proyectos">
            <Button variant="primary" size="lg">
              Ver Proyectos en Acción →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
