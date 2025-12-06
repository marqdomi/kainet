// src/components/FinalCTA.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './ui';
import HolographicCard from './effects/HolographicCard';
import { Rocket, Settings, Check } from 'lucide-react';

const FinalCTA = () => {
    return (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                        ¿Qué necesitas?
                    </h2>
                    <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto px-2 sm:px-0">
                        Elige tu camino: SaaS listo para usar o desarrollo personalizado
                    </p>
                </motion.div>

                {/* Dual CTAs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    {/* Productos CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <HolographicCard className="h-full p-5 sm:p-6 md:p-8 text-center card-depth bg-black/40 backdrop-blur-md">
                            <div className="flex justify-center mb-3 sm:mb-4">
                                <Rocket className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--cyan-neon)]" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                                Plataforma SaaS
                            </h3>
                            <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-4 sm:mb-6 leading-relaxed">
                                Kaido está listo para transformar tu educación corporativa.
                                Gamificación + Accesibilidad en una sola plataforma.
                            </p>

                            {/* Benefits list */}
                            <ul className="text-left space-y-2 mb-6 text-sm">
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-[var(--cyan-neon)] mt-0.5 flex-shrink-0" />
                                    <span className="text-[var(--text-secondary)]">Setup en días, no meses</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-[var(--cyan-neon)] mt-0.5 flex-shrink-0" />
                                    <span className="text-[var(--text-secondary)]">Pricing por usuario</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-[var(--cyan-neon)] mt-0.5 flex-shrink-0" />
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
                        <HolographicCard className="h-full p-5 sm:p-6 md:p-8 text-center card-depth bg-black/40 backdrop-blur-md">
                            <div className="flex justify-center mb-3 sm:mb-4">
                                <Settings className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--purple-neon)]" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                                Desarrollo Custom
                            </h3>
                            <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-4 sm:mb-6 leading-relaxed">
                                ¿Necesitas algo específico? Construimos soluciones de IA,
                                automatización y web a tu medida.
                            </p>

                            {/* Benefits list */}
                            <ul className="text-left space-y-2 mb-6 text-sm">
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-[var(--purple-neon)] mt-0.5 flex-shrink-0" />
                                    <span className="text-[var(--text-secondary)]">Consultoría incluida</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-[var(--purple-neon)] mt-0.5 flex-shrink-0" />
                                    <span className="text-[var(--text-secondary)]">Desarrollo ágil (sprints)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-[var(--purple-neon)] mt-0.5 flex-shrink-0" />
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
