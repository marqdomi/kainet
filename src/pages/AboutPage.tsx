// src/pages/AboutPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SectionTitle, Card, Button } from '../components/ui';
import SEO from '../components/SEO';
import { Brain, Network, Rocket, Linkedin, FileText } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Sobre Mí - Marco Domínguez"
        description="Ingeniero de Software Senior especializado en IA, Automatización de Redes y Desarrollo Full-Stack. Construyendo el futuro de la tecnología educativa."
        url="https://kainet.mx/nosotros"
      />

      <div className="min-h-screen pt-20 pb-20 px-6">

        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SectionTitle>Sobre Mí</SectionTitle>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 mt-6">
                Marco Domínguez
              </h1>
              <p className="text-2xl text-[var(--cyan-neon)] font-light">
                Senior Software Engineer · Builder · Investigador
              </p>
            </motion.div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto">
            <Card variant="default" padding="lg">
              <h2 className="text-3xl font-bold text-white mb-6">Mi Enfoque</h2>

              <div className="space-y-6 text-[var(--text-secondary)]">
                <p className="leading-relaxed text-lg">
                  Soy un ingeniero de software con más de 8 años de experiencia en el desarrollo de soluciones tecnológicas
                  de alto impacto. Mi trayectoria abarca desde la <span className="text-white font-semibold">automatización
                  de redes en centros de datos</span> hasta la <span className="text-white font-semibold">investigación
                  activa en IA y LLMs</span>.
                </p>

                <p className="leading-relaxed">
                  Actualmente, mi investigación se centra en la intersección de la inteligencia artificial con la educación
                  inclusiva, trabajando en <span className="text-[var(--cyan-neon)] font-semibold">KAIDO</span>, un prototipo
                  de LMS gamificado que busca democratizar el acceso a habilidades de ingeniería.
                </p>

                <p className="leading-relaxed">
                  Este sitio es mi <span className="text-white font-semibold">laboratorio personal de I+D</span>: un espacio
                  para experimentar con nuevas tecnologías, documentar mis aprendizajes y compartir mis proyectos con la
                  comunidad técnica.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Areas of Focus */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto">
            <Card variant="default" padding="lg">
              <h2 className="text-3xl font-bold text-white mb-8">Áreas de Investigación</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Brain className="w-12 h-12 text-[var(--cyan-neon)] mx-auto mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-white mb-2">IA Aplicada</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    LLMs, RAG pipelines, agentes autónomos y Azure AI Foundry
                  </p>
                </div>

                <div className="text-center">
                  <Network className="w-12 h-12 text-[var(--purple-neon)] mx-auto mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-white mb-2">NetDevOps</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Automatización de redes, IaC y CI/CD para infraestructura
                  </p>
                </div>

                <div className="text-center">
                  <Rocket className="w-12 h-12 text-[var(--orange-accent)] mx-auto mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-white mb-2">EdTech</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Plataformas educativas, gamificación y accesibilidad WCAG
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Current Project */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto">
            <Card variant="featured" padding="lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[var(--purple-neon)]/20 border border-[var(--purple-neon)]/30 rounded-full text-[var(--purple-neon)] text-xs font-bold tracking-wider uppercase">
                  PROTOTIPO I+D
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Enfoque Actual: KAIDO</h2>

              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                <strong className="text-[var(--cyan-neon)]">KAIDO</strong> es un ecosistema de gestión de aprendizaje (LMS)
                gamificado e inclusivo, diseñado para democratizar el acceso a habilidades de ingeniería mediante
                personalización con IA.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-secondary)]">
                  🐍 Python
                </span>
                <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-secondary)]">
                  ⚛️ React
                </span>
                <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-secondary)]">
                  🐳 Docker
                </span>
                <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-secondary)]">
                  🤖 OpenAI API
                </span>
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
          <div className="max-w-4xl mx-auto text-center">
            <Card variant="default" padding="lg" className="py-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                ¿Interesado en mi perfil?
              </h2>
              <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
                Siempre abierto a discutir oportunidades técnicas, colaboraciones de investigación o simplemente conectar profesionalmente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://www.linkedin.com/in/marcdomibe/" target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="lg">
                    <Linkedin className="w-5 h-5 mr-2" />
                    Conectar en LinkedIn
                  </Button>
                </a>
                <a href="/cv-marco-dominguez.pdf" download>
                  <Button variant="secondary" size="lg">
                    <FileText className="w-5 h-5 mr-2" />
                    Descargar CV
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </section>

      </div>
    </>
  );
};

export default AboutPage;
