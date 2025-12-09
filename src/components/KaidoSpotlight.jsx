import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Card } from './ui';
import GlitchText from './effects/GlitchText';

const KaidoSpotlight = () => {
    return (
        <section className="py-20 px-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--cyan-neon)]/5 to-transparent opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <Card variant="featured" padding="lg" className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Content Side */}
                        <div className="space-y-6 z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--purple-neon)]/10 border border-[var(--purple-neon)]/30 text-[var(--purple-neon)] text-xs font-bold tracking-wider uppercase">
                                <span className="w-2 h-2 rounded-full bg-[var(--purple-neon)] animate-pulse" />
                                PROTOTIPO I+D / EN DESARROLLO
                            </div>

                            <div className="space-y-2">
                                <p className="text-lg text-[var(--cyan-neon)] font-medium tracking-wide">
                                    Enfoque Actual:
                                </p>
                                <GlitchText
                                    text="KAIDO"
                                    as="h2"
                                    className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
                                />
                                <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light">
                                    Plataforma de Aprendizaje
                                </p>
                            </div>

                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                                Un ecosistema de gestión de aprendizaje (LMS) <span className="text-white font-medium">gamificado e inclusivo</span>,
                                diseñado para democratizar el acceso a habilidades de ingeniería mediante personalización con IA.
                            </p>

                            {/* Stack Visual */}
                            <div className="flex flex-wrap gap-3 pt-2">
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

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link to="/kaido">
                                    <Button variant="primary" size="lg" className="group">
                                        Ver Detalles del Proyecto
                                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex items-center gap-6 pt-6 text-sm text-[var(--text-secondary)]">
                                <div className="flex items-center gap-2">
                                    <span className="text-[var(--cyan-neon)]">✓</span> WCAG 2.1 AA
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[var(--cyan-neon)]">✓</span> Gamificación XP
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[var(--cyan-neon)]">✓</span> Multi-tenant
                                </div>
                            </div>
                        </div>

                        {/* Visual Side - Screenshot */}
                        <div className="relative h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
                            {/* Screenshot Container */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative w-full h-full"
                            >
                                {/* Glow effect behind screenshot - usando nueva paleta */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan-neon)]/20 via-[var(--purple-neon)]/15 to-[var(--orange-accent)]/10 blur-3xl opacity-50" />

                                {/* Screenshot */}
                                <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-[var(--cyan-neon)]/30 shadow-2xl shadow-[var(--cyan-neon)]/20">
                                    <img
                                        src="/kaido/screenshots/dashboard.png"
                                        alt="Kaido Dashboard - Gamified learning platform with XP, achievements and accessibility features"
                                        className="w-full h-full object-cover object-center"
                                        loading="lazy"
                                    />

                                    {/* Overlay badge */}
                                    <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-[var(--cyan-neon)]/50 rounded-lg">
                                        <span className="text-xs font-mono text-[var(--cyan-neon)]">LIVE PREVIEW</span>
                                    </div>
                                </div>

                                {/* Floating metrics */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="absolute -left-4 top-1/4 bg-black/50 backdrop-blur-md border border-[var(--cyan-neon)]/30 rounded-lg p-3 shadow-xl"
                                >
                                    <div className="text-2xl font-bold text-[var(--cyan-neon)]">85%</div>
                                    <div className="text-xs text-[var(--text-secondary)]">Completion</div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                    className="absolute -right-4 top-1/2 bg-black/50 backdrop-blur-md border border-[var(--purple-neon)]/30 rounded-lg p-3 shadow-xl"
                                >
                                    <div className="text-2xl font-bold text-[var(--purple-neon)]">WCAG</div>
                                    <div className="text-xs text-[var(--text-secondary)]">AA Level</div>
                                </motion.div>
                            </motion.div>
                        </div>

                    </div>
                </Card>
            </div>
        </section>
    );
};

export default KaidoSpotlight;
