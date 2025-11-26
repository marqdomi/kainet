import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, SectionTitle, Badge } from '../components/ui';
import HolographicCard from '../components/effects/HolographicCard';
import GlitchText from '../components/effects/GlitchText';
import SEO from '../components/SEO';

const ProductsPage = () => {
    return (
        <>
            <SEO
                title="Productos SaaS - Plataformas de Clase Mundial"
                description="Descubre los productos SaaS de KAINET. Kaido: la plataforma de aprendizaje corporativo gamificada y accesible que está transformando la educación."
                url="https://kainet.mx/productos"
            />

            <div className="min-h-screen pt-20 pb-20">

                {/* Hero Section */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Badge variant="purple" size="lg" className="mb-6">
                                🌟 El Faro - 80% de nuestro enfoque
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                                Productos SaaS
                            </h1>
                            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-8">
                                Plataformas de clase mundial construidas con tecnología de punta.
                                Aquí es donde innovamos y construimos nuestra autoridad técnica.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Kaido - Flagship Product */}
                <section className="py-12 px-6">
                    <div className="max-w-7xl mx-auto">
                        <HolographicCard className="border-[var(--cyan-neon)]/30 bg-black/40 backdrop-blur-md">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                                {/* Content */}
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--cyan-neon)]/10 border border-[var(--cyan-neon)]/30 text-[var(--cyan-neon)] text-xs font-bold tracking-wider uppercase">
                                        <span className="w-2 h-2 rounded-full bg-[var(--cyan-neon)] animate-pulse" />
                                        Producto Insignia
                                    </div>

                                    <GlitchText
                                        className="text-6xl md:text-8xl font-bold tracking-tighter text-white"
                                    >
                                        KAIDO
                                    </GlitchText>

                                    <p className="text-2xl text-[var(--cyan-neon)] font-light">
                                        El Camino del Cambio
                                    </p>

                                    <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                                        La primera plataforma SaaS de educación corporativa que resuelve la
                                        <span className="text-white font-semibold"> Paradoja de la Inclusión</span>.
                                        Gamificación extrema + Accesibilidad WCAG 2.1 AA.
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 pt-4">
                                        <div className="bg-[var(--gray-800)]/50 rounded-lg p-4 border border-[var(--gray-700)]">
                                            <div className="text-3xl font-bold text-[var(--cyan-neon)]">WCAG</div>
                                            <div className="text-sm text-[var(--text-secondary)]">AA Level</div>
                                        </div>
                                        <div className="bg-[var(--gray-800)]/50 rounded-lg p-4 border border-[var(--gray-700)]">
                                            <div className="text-3xl font-bold text-[var(--purple-neon)]">SaaS</div>
                                            <div className="text-sm text-[var(--text-secondary)]">Multi-tenant</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 pt-6">
                                        <Link to="/kaido">
                                            <Button variant="primary" size="lg" className="group">
                                                Ver Detalles Completos
                                                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                            </Button>
                                        </Link>
                                        <Link to="/contact">
                                            <Button variant="secondary" size="lg">
                                                Solicitar Demo
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Screenshot */}
                                <div className="relative">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan-neon)]/20 to-[var(--purple-neon)]/20 blur-3xl opacity-50" />
                                        <div className="relative rounded-lg overflow-hidden border-2 border-[var(--cyan-neon)]/30 shadow-2xl shadow-[var(--cyan-neon)]/20">
                                            <img
                                                src="/kaido/screenshots/dashboard.png"
                                                alt="Kaido Dashboard"
                                                className="w-full h-auto"
                                                loading="lazy"
                                            />
                                        </div>
                                    </motion.div>
                                </div>

                            </div>
                        </HolographicCard>
                    </div>
                </section>

                {/* Future Products */}
                <section className="py-20 px-6 bg-[var(--gray-800)]/20">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionTitle kanji="未">Próximamente</SectionTitle>
                            <h2 className="text-4xl font-bold text-white mt-4">Productos en el Pipeline</h2>
                            <p className="text-lg text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto">
                                Estamos desarrollando más soluciones SaaS para resolver problemas complejos.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Placeholder for future product 1 */}
                            <HolographicCard className="opacity-60">
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🚀</div>
                                    <h3 className="text-2xl font-bold text-white mb-3">Producto en Desarrollo</h3>
                                    <p className="text-[var(--text-secondary)] mb-6">
                                        Pronto anunciaremos nuestra siguiente innovación en el ecosistema SaaS.
                                    </p>
                                    <Badge variant="default" size="md">Coming Soon</Badge>
                                </div>
                            </HolographicCard>

                            {/* Placeholder for future product 2 */}
                            <HolographicCard className="opacity-60">
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">💡</div>
                                    <h3 className="text-2xl font-bold text-white mb-3">Innovación Continua</h3>
                                    <p className="text-[var(--text-secondary)] mb-6">
                                        Nuestro equipo está constantemente explorando nuevas oportunidades de mercado.
                                    </p>
                                    <Badge variant="default" size="md">In Research</Badge>
                                </div>
                            </HolographicCard>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <HolographicCard className="py-16">
                            <h2 className="text-4xl font-bold text-white mb-6">
                                ¿Interesado en nuestros productos?
                            </h2>
                            <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                                Explora Kaido en detalle o contáctanos para una demostración personalizada.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/kaido">
                                    <Button variant="primary" size="lg">
                                        Explorar Kaido
                                    </Button>
                                </Link>
                                <Link to="/contact">
                                    <Button variant="secondary" size="lg">
                                        Hablar con Ventas
                                    </Button>
                                </Link>
                            </div>
                        </HolographicCard>
                    </div>
                </section>

            </div>
        </>
    );
};

export default ProductsPage;
