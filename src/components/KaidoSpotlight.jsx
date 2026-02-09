import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Card } from './ui';
import GlitchText from './effects/GlitchText';
import { Gamepad2, Accessibility, Building2, Code2, Server, Database } from 'lucide-react';

const techStack = [
    { icon: '⚛️', label: 'React 19' },
    { icon: '🔷', label: 'TypeScript' },
    { icon: '🟢', label: 'Node.js + Express' },
    { icon: '☁️', label: 'Azure Cosmos DB' },
    { icon: '🚀', label: 'Azure Container Apps' },
    { icon: '🎨', label: 'Tailwind CSS v4' },
];

const stats = [
    { value: '45K+', label: 'Líneas de código', color: 'var(--cyan-neon)' },
    { value: '150+', label: 'Componentes React', color: 'var(--purple-neon)' },
    { value: '50+', label: 'Endpoints API', color: 'var(--orange-accent)' },
    { value: '2,200+', label: 'Líneas i18n ES/EN', color: 'var(--cyan-neon)' },
];

const KaidoSpotlight = () => {
    return (
        <section className="py-20 px-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--cyan-neon)]/5 to-transparent opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <Card variant="featured" padding="lg" className="relative overflow-hidden">
                    {/* Subtle animated gradient border accent */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--cyan-neon)] via-[var(--purple-neon)] to-[var(--orange-accent)]" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Content Side */}
                        <div className="space-y-6 z-10">
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold tracking-wider uppercase">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    PRODUCCIÓN ACTIVA
                                </div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--purple-neon)]/10 border border-[var(--purple-neon)]/30 text-[var(--purple-neon)] text-xs font-bold tracking-wider uppercase">
                                    SaaS MULTI-TENANT
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-lg text-[var(--cyan-neon)] font-medium tracking-wide">
                                    Proyecto Destacado:
                                </p>
                                <GlitchText
                                    text="KAIDO"
                                    as="h2"
                                    className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
                                />
                                <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light">
                                    Plataforma LMS Corporativa Gamificada
                                </p>
                            </div>

                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                                Plataforma SaaS multi-tenant de aprendizaje corporativo con <span className="text-white font-medium">sistema de gamificación RPG</span> (XP, niveles infinitos, 12 rangos, badges) y <span className="text-white font-medium">accesibilidad WCAG 2.1 AA</span> con 35+ preferencias y 6 perfiles de discapacidad.
                            </p>

                            {/* Real Tech Stack */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {techStack.map((tech) => (
                                    <span
                                        key={tech.label}
                                        className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-secondary)] hover:border-[var(--cyan-neon)]/40 transition-colors"
                                    >
                                        {tech.icon} {tech.label}
                                    </span>
                                ))}
                            </div>

                            {/* Key Features Inline */}
                            <div className="grid grid-cols-3 gap-3 pt-2">
                                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                    <Gamepad2 className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" strokeWidth={1.5} />
                                    <span>Gamificación RPG</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                    <Accessibility className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" strokeWidth={1.5} />
                                    <span>WCAG 2.1 AA</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                    <Building2 className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" strokeWidth={1.5} />
                                    <span>Multi-tenant</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link to="/kaido">
                                    <Button variant="primary" size="lg" className="group">
                                        Explorar Proyecto
                                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Visual Side - Screenshot + Stats */}
                        <div className="relative h-full min-h-[400px] lg:min-h-[500px] flex flex-col items-center justify-center gap-6">
                            {/* Screenshot Container */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative w-full flex-1"
                            >
                                {/* Glow effect behind screenshot */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan-neon)]/20 via-[var(--purple-neon)]/15 to-[var(--orange-accent)]/10 blur-3xl opacity-50" />

                                {/* Screenshot */}
                                <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-[var(--cyan-neon)]/30 shadow-2xl shadow-[var(--cyan-neon)]/20">
                                    <img
                                        src="/kaido/screenshots/dashboard.png"
                                        alt="KAIDO Dashboard — Interfaz gamificada con sistema de XP, niveles, logros y accesibilidad WCAG 2.1 AA"
                                        className="w-full h-full object-cover object-center"
                                        loading="lazy"
                                    />

                                    {/* Status badge */}
                                    <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-green-400/50 rounded-lg flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-xs font-mono text-green-400">DEPLOYED ON AZURE</span>
                                    </div>
                                </div>

                                {/* Floating metrics — real project data */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="absolute -left-4 top-1/4 bg-black/60 backdrop-blur-md border border-[var(--cyan-neon)]/30 rounded-lg p-3 shadow-xl"
                                >
                                    <div className="text-2xl font-bold text-[var(--cyan-neon)]">45K+</div>
                                    <div className="text-xs text-[var(--text-secondary)]">Lines of Code</div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                    className="absolute -right-4 top-1/2 bg-black/60 backdrop-blur-md border border-[var(--purple-neon)]/30 rounded-lg p-3 shadow-xl"
                                >
                                    <div className="text-2xl font-bold text-[var(--purple-neon)]">150+</div>
                                    <div className="text-xs text-[var(--text-secondary)]">Components</div>
                                </motion.div>
                            </motion.div>

                            {/* Mini Stats Bar */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                                className="w-full grid grid-cols-4 gap-2"
                            >
                                {stats.map((stat) => (
                                    <div key={stat.label} className="text-center px-2 py-2 rounded-lg bg-black/30 border border-white/[0.06]">
                                        <div className="text-sm font-bold" style={{ color: stat.color }}>{stat.value}</div>
                                        <div className="text-[10px] text-[var(--text-secondary)] leading-tight">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                    </div>
                </Card>
            </div>
        </section>
    );
};

export default KaidoSpotlight;
