// src/pages/AboutPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, Card } from '../components/ui';
import SEO from '../components/SEO';
import { Star, Settings, X, Check } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Nosotros - El Manifiesto KAINET"
        description="Conoce la visión, misión y filosofía de KAINET. Somos una startup mexicana que construye SaaS de clase mundial."
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
              <SectionTitle kanji="道">El Manifiesto</SectionTitle>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 mt-6">
                KAINET
              </h1>
              <p className="text-2xl text-[var(--cyan-neon)] font-light italic">
                "No construimos software; edificamos portales digitales hacia el futuro."
              </p>
            </motion.div>
          </div>
        </section>

        {/* Identidad y Propósito */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto">
            <Card variant="default" padding="lg">
              <h2 className="text-3xl font-bold text-white mb-6">1. Identidad y Propósito</h2>

              <div className="space-y-6 text-[var(--text-secondary)]">
                <div>
                  <h3 className="text-xl font-bold text-[var(--cyan-neon)] mb-3">¿Quiénes somos?</h3>
                  <p className="leading-relaxed">
                    KAINET es una <span className="text-white font-semibold">Startup de Tecnología Mexicana</span> enfocada
                    en la innovación de productos propios y la transformación digital de alto nivel. Somos el punto donde la
                    estructura y la disciplina (el <em>Torii</em>) se encuentran con la velocidad y la conectividad del mundo
                    digital (el <em>Circuito</em>).
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--cyan-neon)] mb-3">Nuestra Visión (El Futuro)</h3>
                  <p className="leading-relaxed">
                    Ser la referencia de ingeniería de software en México, demostrando que la tecnología más avanzada — desde
                    la arquitectura Cloud Native hasta la Inteligencia Artificial — puede ser, al mismo tiempo, robusta,
                    accesible y profundamente humana. Queremos ser el <strong className="text-white">"puente de confianza"</strong>
                    para empresas y usuarios que entran a la nueva era digital.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[var(--cyan-neon)] mb-3">Nuestra Misión (El Día a Día)</h3>
                  <p className="leading-relaxed">
                    Desarrollar plataformas SaaS de clase mundial que resuelvan paradojas complejas (como la inclusión vs.
                    gamificación) y utilizar esa experiencia de vanguardia para ofrecer servicios de automatización y desarrollo
                    que impulsen a las empresas mexicanas.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Modelo Estratégico */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto">
            <Card variant="default" padding="lg">
              <h2 className="text-3xl font-bold text-white mb-6">2. Modelo Estratégico: El Faro y el Motor</h2>

              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                Operamos bajo un modelo híbrido diseñado para la innovación sostenible:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-10 h-10 text-[var(--cyan-neon)]" strokeWidth={1.5} />
                    <div>
                      <h3 className="text-xl font-bold text-[var(--cyan-neon)]">El Faro</h3>
                      <p className="text-sm text-[var(--text-secondary)]">80% Foco - Nuestro Prestigio</p>
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    El desarrollo de nuestros propios productos SaaS. Aquí es donde innovamos, tomamos riesgos y construimos
                    nuestra autoridad técnica y de marca a largo plazo.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="w-10 h-10 text-[var(--purple-neon)]" strokeWidth={1.5} />
                    <div>
                      <h3 className="text-xl font-bold text-[var(--purple-neon)]">El Motor</h3>
                      <p className="text-sm text-[var(--text-secondary)]">20% Foco - Nuestro Flujo</p>
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    Servicios de consultoría, desarrollo web y automatización para clientes selectos (PyMEs y corporativos).
                    Esto nos genera flujo de caja inmediato y nos mantiene conectados con el mercado.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Producto Insignia */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto">
            <Card variant="featured" padding="lg">
              <h2 className="text-3xl font-bold text-white mb-6">3. Producto Insignia: KAIDO</h2>

              <div className="space-y-6 text-[var(--text-secondary)]">
                <div className="bg-[var(--cyan-neon)]/10 border border-[var(--cyan-neon)]/20 rounded-lg p-6">
                  <p className="text-sm text-[var(--text-secondary)] mb-2">Anteriormente conocido como:</p>
                  <p className="text-lg font-mono text-[var(--cyan-neon)]">Proyecto AccessLearn</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Concepto</h3>
                  <p className="leading-relaxed mb-4">
                    <strong className="text-[var(--cyan-neon)]">KAIDO</strong> ("El Camino del Cambio") es la primera
                    plataforma SaaS de educación corporativa que resuelve la "paradoja de la inclusión".
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" strokeWidth={2} />
                      <span>La mayoría del software accesible es aburrido.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" strokeWidth={2} />
                      <span>La mayoría del software gamificado no es accesible.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-[var(--cyan-neon)] mt-1 flex-shrink-0" strokeWidth={2} />
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
