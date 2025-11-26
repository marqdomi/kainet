// src/components/FinalCTA.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './ui';
import HolographicCard from './effects/HolographicCard';

const FinalCTA = () => {
    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        ¿Qué necesitas?
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Elige tu camino: SaaS listo para usar o desarrollo personalizado
                    </p>
                </motion.div>

                {/* Dual CTAs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Productos CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <HolographicCard className="h-full p-8 text-center card-depth bg-gradient-to-b from-[var(--gray-900)] to-[var(--cyan-neon)]/5">
                            <div className="text-5xl mb-4">🚀</div>
                            <h3 className="text-2xl font-bold text-white mb-3">
                                Plataforma SaaS
                            </h3>
                            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                                Kaido está listo para transformar tu educación corporativa.
                                Gamificación + Accesibilidad en una sola plataforma.
                            </p>

                            {/* Benefits list */}
                            <ul className="text-left space-y-2 mb-6 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--cyan-neon)]">✓</span>
                                    <span className="text-[var(--text-secondary)]">Setup en días, no meses</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--cyan-neon)]">✓</span>
                                    <span className="text-[var(--text-secondary)]">Pricing por usuario</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--cyan-neon)]">✓</span>
                                    <span className="text-[var(--text-secondary)]">Early Access pricing</span>
                                </li>
                            </ul>

                            <Link to="/kaido">
                                <Button variant="primary" size="lg" className="w-full">
                                    Explorar Kaido →
                                </Button>
                            </Link>
                        </HolographicCard>
                    </motion.div>

                    {/* Servicios CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <HolographicCard className="h-full p-8 text-center card-depth bg-gradient-to-b from-[var(--gray-900)] to-[var(--purple-neon)]/5">
                            <div className="text-5xl mb-4">⚙️</div>
                            <h3 className="text-2xl font-bold text-white mb-3">
                                Desarrollo Custom
                            </h3>
                            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                                ¿Necesitas algo específico? Construimos soluciones de IA,
                                automatización y web a tu medida.
                            </p>

                            {/* Benefits list */}
                            <ul className="text-left space-y-2 mb-6 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--purple-neon)]">✓</span>
                                    <span className="text-[var(--text-secondary)]">Consultoría incluida</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--purple-neon)]">✓</span>
                                    <span className="text-[var(--text-secondary)]">Desarrollo ágil (sprints)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--purple-neon)]">✓</span>
                                    <span className="text-[var(--text-secondary)]">Soporte post-launch</span>
                                </li>
                            </ul>

                            <Link to="/servicios">
                                <Button variant="secondary" size="lg" className="w-full">
                                    Ver Servicios →
                                </Button>
                            </Link>
                        </HolographicCard>
                    </motion.div>
                </div>

                {/* Bottom note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-8"
                >
                    <p className="text-sm text-[var(--text-tertiary)]">
                        ¿No estás seguro? <Link to="/contact" className="text-[var(--cyan-neon)] hover:underline">Contáctanos</Link> y te ayudamos a elegir
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default FinalCTA;
