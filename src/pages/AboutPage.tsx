// src/pages/AboutPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SectionTitle, Card, Button } from '../components/ui';
import SEO from '../components/SEO';
import { 
  Brain, Network, Rocket, Linkedin, FileText, ExternalLink, 
  Award, Briefcase, GraduationCap, Code, Shield, Users,
  ChevronDown, ChevronUp, Eye, Calendar, MapPin
} from 'lucide-react';

// Animaciones
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Datos de certificaciones
const certifications = [
  {
    name: 'GitHub Copilot Certified',
    code: 'GH-300',
    issuer: 'Microsoft',
    year: '2025',
    icon: '🤖',
    color: 'var(--cyan-neon)',
    credentialUrl: 'https://learn.microsoft.com/en-us/users/marcodominguez/credentials/BFF1525711796263'
  },
  {
    name: 'Cisco Certified DevNet Associate',
    issuer: 'Cisco',
    year: '2024',
    icon: '💻',
    color: 'var(--cyan-neon)',
    credentialUrl: 'https://www.credly.com/badges/10604558-a966-4215-90a6-1516d6e4e06d'
  },
  {
    name: 'Cisco Certified Specialist: Enterprise Core',
    code: 'CCS-ECore',
    issuer: 'Cisco',
    year: '2023',
    icon: '🏢',
    color: 'var(--orange-accent)',
    credentialUrl: 'https://www.credly.com/badges/7f1f2b9a-25ee-4068-bc73-6a1faf46087f'
  },
  {
    name: 'Cisco Certified Specialist: Data Center Core',
    code: 'CCS-DCCore',
    issuer: 'Cisco',
    year: '2023',
    icon: '🖥️',
    color: 'var(--purple-neon)',
    credentialUrl: 'https://www.credly.com/badges/6aebaa9c-3689-4883-b49d-17b513eb4a07'
  },
  {
    name: 'Lean Six Sigma White Belt',
    issuer: 'International Six Sigma Institute',
    year: '2025',
    icon: '⚡',
    color: 'var(--cyan-neon)',
    credentialUrl: 'https://www.sixsigmacouncil.org/verify-certificate/?cert=a89c803b-0c3e-4cc1-8112-9006ba9660a5'
  }
];

// Experiencia laboral
const experience = [
  {
    title: 'Senior Network Engineer',
    company: 'Solera Holdings',
    period: '2021 - Presente',
    location: 'Ciudad de México',
    highlights: [
      'Diseñé y entregué workshops de Applied AI & NetDevOps a 30+ ingenieros',
      'Desarrollé herramienta full-stack de Certificate Management (Python, FastAPI, React, Docker) reduciendo 40% de trabajo manual',
      'Integré asistentes conversacionales con Azure AI Foundry para soporte técnico automatizado',
      'Lideré migración de data centers legacy a Cisco ACI, aumentando eficiencia 25%'
    ],
    technologies: ['Python', 'FastAPI', 'React', 'Docker', 'Azure AI', 'Cisco ACI']
  },
  {
    title: 'Technical Consulting Engineer (DNAC)',
    company: 'Cisco Systems, Inc.',
    period: '2019 - 2021',
    location: 'Ciudad de México',
    highlights: [
      'Construí y mantuve ambientes de laboratorio Cisco DNA para replicar escenarios de clientes',
      'Conduje sesiones de onboarding técnico para 20+ ingenieros con 4.5/5 de satisfacción',
      'Lideré iniciativa de automatización de backlog de TAC, mejorando productividad 15%'
    ],
    technologies: ['Cisco DNA', 'Python', 'Automation', 'Lab Design']
  },
  {
    title: 'Customer Engineer Support (ACI)',
    company: 'Cisco Systems, Inc.',
    period: '2016 - 2019',
    location: 'Ciudad de México',
    highlights: [
      'Soporté adopción de ACI para cientos de clientes globales',
      'Resolví incidentes de red complejos con 95% de satisfacción',
      'Reduje tiempos de implementación 20% mediante training personalizado'
    ],
    technologies: ['Cisco ACI', 'Data Center', 'Troubleshooting', 'Training']
  }
];

// Skills técnicos
const skillCategories = [
  {
    name: 'Automation & Development',
    icon: Code,
    color: 'var(--cyan-neon)',
    skills: ['Python', 'FastAPI', 'React', 'JavaScript', 'Docker', 'Kubernetes', 'Git', 'CI/CD', 'NetDevOps']
  },
  {
    name: 'AI & Cloud',
    icon: Brain,
    color: 'var(--purple-neon)',
    skills: ['GitHub Copilot', 'Azure AI Foundry', 'LLM Integration', 'Chatbot Development', 'RAG', 'AWS Solutions Architecture']
  },
  {
    name: 'Networking & Security',
    icon: Shield,
    color: 'var(--orange-accent)',
    skills: ['Cisco ACI & DNA', 'F5 BIG-IP', 'VMware', 'Palo Alto', 'Fortigate', 'Data Center Architecture']
  },
  {
    name: 'Project Management',
    icon: Users,
    color: 'var(--pink-accent)',
    skills: ['Strategic Planning', 'Agile Methodologies', 'Cross-functional Leadership', 'Technical Mentoring']
  }
];

// Educación
const education = [
  {
    degree: "Master's in Engineering Management",
    institution: 'Tecnológico de Monterrey',
    period: '2024 - Presente',
    description: 'Enfoque en liderazgo estratégico y ejecución técnica con resultados de negocio'
  },
  {
    degree: "Bachelor's in Computer Engineering",
    institution: 'Universidad Autónoma Metropolitana',
    period: '2010 - 2015',
    description: 'Fundamentos sólidos en ingeniería de software y sistemas'
  }
];

// Componente de Certificación
const CertificationBadge: React.FC<{ cert: typeof certifications[0], index: number }> = ({ cert, index }) => (
  <motion.div
    variants={fadeUp(index * 0.05)}
    className="group relative p-4 rounded-xl border border-gray-800 bg-gray-900/60 
               hover:border-gray-600 hover:bg-gray-900/80 transition-all duration-300"
  >
    <div className="flex items-start gap-3">
      <span className="text-2xl">{cert.icon}</span>
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-semibold text-sm leading-tight">
          {cert.name}
          {cert.code && <span className="text-gray-500 ml-1">({cert.code})</span>}
        </h4>
        <p className="text-gray-400 text-xs mt-1">
          {cert.issuer} · {cert.year}
        </p>
      </div>
      {cert.credentialUrl && (
        <a 
          href={cert.credentialUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-shrink-0 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 
                     text-gray-400 hover:text-white transition-colors"
          title="Ver credencial"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
    <div 
      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full opacity-50"
      style={{ backgroundColor: cert.color }}
    />
  </motion.div>
);

// Componente de Timeline de Experiencia
const ExperienceCard: React.FC<{ exp: typeof experience[0], index: number }> = ({ exp, index }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div
      variants={fadeUp(index * 0.1)}
      className="relative pl-8 pb-8 last:pb-0"
    >
      {/* Línea de timeline */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--cyan-neon)] to-transparent" />
      
      {/* Punto del timeline */}
      <div className="absolute left-0 top-0 w-2 h-2 -translate-x-[3px] rounded-full bg-[var(--cyan-neon)] shadow-[0_0_10px_var(--cyan-neon)]" />
      
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h4 className="text-white font-bold text-lg">{exp.title}</h4>
            <p className="text-[var(--cyan-neon)] font-medium">{exp.company}</p>
          </div>
          <div className="text-right text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {exp.period}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {exp.location}
            </div>
          </div>
        </div>
        
        {/* Highlights */}
        <ul className={`space-y-2 text-gray-400 text-sm ${!expanded ? 'line-clamp-2' : ''}`}>
          {exp.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[var(--cyan-neon)] mt-1">▸</span>
              {highlight}
            </li>
          ))}
        </ul>
        
        {exp.highlights.length > 2 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[var(--cyan-neon)] text-sm mt-3 hover:underline"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {expanded ? 'Ver menos' : 'Ver más'}
          </button>
        )}
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-4">
          {exp.technologies.map((tech) => (
            <span 
              key={tech}
              className="px-2 py-1 text-xs bg-gray-800 border border-gray-700 rounded-md text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Modal del CV Viewer
const CVViewerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl h-[85vh] bg-gray-900 rounded-2xl overflow-hidden border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900/95">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[var(--cyan-neon)]" />
            <span className="text-white font-semibold">CV - Marco Domínguez</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 px-2 py-1 bg-gray-800 rounded">Solo lectura</span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
        
        {/* PDF Viewer - usando iframe con configuración para prevenir descarga */}
        <div className="w-full h-[calc(100%-60px)] bg-gray-950">
          <iframe
            src="/Marco_Dominguez_Becerra_Resume.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
            className="w-full h-full"
            title="CV Marco Domínguez"
            style={{ 
              pointerEvents: 'auto',
              userSelect: 'none'
            }}
          />
          {/* Overlay para prevenir click derecho en el PDF */}
          <div 
            className="absolute inset-0 top-[60px]" 
            onContextMenu={(e) => e.preventDefault()}
            style={{ pointerEvents: 'none' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const AboutPage: React.FC = () => {
  const [showCVModal, setShowCVModal] = useState(false);

  return (
    <>
      <SEO
        title="Sobre Mí - Marco Domínguez | Senior Network Engineer & AI Developer"
        description="Senior Network Engineer con 10+ años de experiencia en Data Center, NetDevOps y AI. Fundador de KAINET. Especializado en Cisco ACI, Azure AI Foundry y automatización."
        url="https://kainet.mx/nosotros"
      />

      <div className="min-h-screen pt-20 pb-20 px-6">

        {/* Hero Section */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row items-center gap-10"
            >
              {/* Foto de perfil */}
              <div className="relative">
                <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-[var(--cyan-neon)]/20 to-[var(--purple-neon)]/20 
                              border border-gray-700 flex items-center justify-center overflow-hidden">
                  {/* Foto de perfil - reemplazar /images/profile/marco-dominguez.jpg */}
                  <img 
                    src="/images/profile/marco-dominguez.jpg" 
                    alt="Marco Domínguez"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback al emoji si no existe la imagen
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<span class="text-6xl">👨‍💻</span>';
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-green-500/20 border border-green-500/30 
                              rounded-full text-green-400 text-xs font-bold">
                  Disponible
                </div>
              </div>
              
              <div className="text-center lg:text-left flex-1">
                <SectionTitle>Sobre Mí</SectionTitle>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 mt-4">
                  Marco Domínguez
                </h1>
                <p className="text-xl text-[var(--cyan-neon)] font-light mb-4">
                  Senior Network Engineer & Technical Training Developer
                </p>
                <p className="text-gray-400 flex items-center justify-center lg:justify-start gap-2 mb-6">
                  <MapPin className="w-4 h-4" />
                  Ciudad de México, México
                </p>
                
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <a href="https://www.linkedin.com/in/marcdomibe/" target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" size="md">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </a>
                  <Button variant="secondary" size="md" onClick={() => setShowCVModal(true)}>
                    <Eye className="w-4 h-4 mr-2" />
                    Ver CV
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto">
            <Card variant="default" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-[var(--cyan-neon)]" />
                Resumen Profesional
              </h2>

              <div className="space-y-4 text-[var(--text-secondary)]">
                <p className="leading-relaxed text-lg">
                  <span className="text-white font-semibold">Senior Network Engineer & Technical Training Developer</span> con 
                  más de <span className="text-[var(--cyan-neon)] font-bold">10 años de experiencia</span> transformando 
                  infraestructura de Data Centers complejos (Cisco ACI, Cloud) mediante NetDevOps y automatización de software.
                </p>

                <p className="leading-relaxed">
                  Experto comprobado en construir <span className="text-white font-semibold">ecosistemas inteligentes</span> usando 
                  un enfoque full-stack (Python, FastAPI, React). Apasionado por la intersección de la tecnología y la accesibilidad.
                </p>

                <p className="leading-relaxed">
                  Fundador de <span className="text-[var(--cyan-neon)] font-semibold">KAINET</span>, un laboratorio personal de I+D 
                  donde desarrollo <span className="text-white font-semibold">"Kaido"</span>, una plataforma de aprendizaje gamificada 
                  e inclusiva diseñada para democratizar el conocimiento técnico mediante IA.
                </p>

                <p className="leading-relaxed">
                  Actualmente cursando una <span className="text-white font-semibold">Maestría en Gestión de Ingeniería</span> en el 
                  Tecnológico de Monterrey para fortalecer el liderazgo estratégico e innovación educativa.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Core Competencies */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Code className="w-6 h-6 text-[var(--cyan-neon)]" />
              Competencias Técnicas
            </h2>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  variants={fadeUp(index * 0.1)}
                  className="p-6 rounded-xl border border-gray-800 bg-gray-900/60 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <category.icon className="w-6 h-6" style={{ color: category.color }} />
                    <h3 className="text-white font-bold">{category.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1.5 text-sm rounded-lg border"
                        style={{ 
                          borderColor: `${category.color}30`,
                          backgroundColor: `${category.color}10`,
                          color: category.color
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Award className="w-6 h-6 text-[var(--cyan-neon)]" />
              Certificaciones & Credenciales
            </h2>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {certifications.map((cert, index) => (
                <CertificationBadge key={cert.name} cert={cert} index={index} />
              ))}
            </motion.div>
            
            <p className="text-center text-gray-500 text-sm mt-6">
              Haz clic en <ExternalLink className="w-3 h-3 inline mx-1" /> para verificar las credenciales en Credly/Cisco
            </p>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-[var(--cyan-neon)]" />
              Experiencia Profesional
            </h2>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {experience.map((exp, index) => (
                <ExperienceCard key={exp.company + exp.period} exp={exp} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Education */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-[var(--cyan-neon)]" />
              Educación
            </h2>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  variants={fadeUp(index * 0.1)}
                  className="p-6 rounded-xl border border-gray-800 bg-gray-900/60"
                >
                  <div className="flex items-center gap-2 text-[var(--cyan-neon)] text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4" />
                    {edu.period}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{edu.degree}</h3>
                  <p className="text-gray-400 mb-3">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">{edu.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Current Project - KAIDO */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto">
            <Card variant="featured" padding="lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[var(--purple-neon)]/20 border border-[var(--purple-neon)]/30 rounded-full text-[var(--purple-neon)] text-xs font-bold tracking-wider uppercase">
                  PROTOTIPO I+D
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Proyecto Actual: KAIDO</h2>

              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                <strong className="text-[var(--cyan-neon)]">KAIDO</strong> es un ecosistema de gestión de aprendizaje (LMS)
                gamificado e inclusivo, diseñado para democratizar el acceso a habilidades de ingeniería mediante
                personalización con IA. Combina retroalimentación en tiempo real con currículum generado automáticamente.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {['Python', 'FastAPI', 'React', 'Docker', 'Azure AI Foundry', 'LLMs'].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-secondary)]">
                    {tech}
                  </span>
                ))}
              </div>

              <Link to="/kaido">
                <Button variant="primary" size="lg">
                  Ver Detalles del Proyecto →
                </Button>
              </Link>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto text-center">
            <Card variant="default" padding="lg" className="py-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                ¿Interesado en Colaborar?
              </h2>
              <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
                Siempre abierto a discutir oportunidades técnicas, colaboraciones de investigación, 
                capacitaciones corporativas o simplemente conectar profesionalmente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://www.linkedin.com/in/marcdomibe/" target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="lg">
                    <Linkedin className="w-5 h-5 mr-2" />
                    Conectar en LinkedIn
                  </Button>
                </a>
                <Link to="/contacto">
                  <Button variant="secondary" size="lg">
                    Enviar Mensaje
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>

      </div>

      {/* CV Viewer Modal */}
      <CVViewerModal isOpen={showCVModal} onClose={() => setShowCVModal(false)} />
    </>
  );
};

export default AboutPage;
