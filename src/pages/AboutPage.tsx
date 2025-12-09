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
                      <span className="text-white font-semibold">
                        KAIDO es ambas cosas: Una experiencia de aprendizaje altamente gamificada (XP, niveles, progreso)
                        diseñada desde cero para cumplir con los estándares más estrictos de accesibilidad (WCAG 2.1 Level AA).
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <a
                    href="/kaido"
                    className="btn btn-lg btn-primary"
                  >
                    Conocer KAIDO →
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Team / Contact */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto">
            <Card variant="default" padding="lg" className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">El Equipo</h2>
              <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                KAINET fue fundado por ingenieros y diseñadores mexicanos apasionados por la tecnología de punta
                y el impacto social.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.linkedin.com/in/marcdomibe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white rounded-lg font-semibold hover:bg-[#006399] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
                  </svg>
                  Conectar en LinkedIn
                </a>
                <a
                  href="/contact"
                  className="inline-block px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Contacto
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
