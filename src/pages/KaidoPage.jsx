import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, SectionTitle, Badge, Card } from '../components/ui';
import GlitchText from '../components/effects/GlitchText';
import SEO from '../components/SEO';
import './KaidoPage.css';
import {
    Gamepad2, Accessibility, Building2, Palette, BookOpen,
    BarChart3, Handshake, Check, X, Trophy, Flame, Target,
    Eye, Ear, Hand, Brain, MousePointer, Languages,
    Monitor, Server, Database, Cloud, GitBranch, Activity,
    Code2, Layers, Shield, Users, Sparkles, ArrowRight
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   REAL DATA — sourced from marqdomi/accesslearn-inclusiv
   ═══════════════════════════════════════════════════════ */

const projectStats = [
    { value: '~45,000', label: 'Líneas de código TypeScript/React', color: 'var(--cyan-neon)' },
    { value: '150+', label: 'Componentes React', color: 'var(--purple-neon)' },
    { value: '50+', label: 'Endpoints REST API', color: 'var(--orange-accent)' },
    { value: '8+', label: 'Contenedores Cosmos DB', color: 'var(--cyan-neon)' },
    { value: '2,204', label: 'Líneas de traducción ES/EN', color: 'var(--purple-neon)' },
    { value: '120+', label: 'Archivos de documentación', color: 'var(--orange-accent)' },
];

const xpRewards = [
    { action: 'Completar lección', xp: 50 },
    { action: 'Completar curso', xp: 500 },
    { action: 'Obtener certificación', xp: 750 },
    { action: 'Quiz perfecto', xp: 100 },
    { action: 'Racha de 7 días', xp: 200 },
    { action: 'Responder en foro', xp: 25 },
];

const rankTiers = [
    { name: 'Novice', emoji: '🌱', level: '1' },
    { name: 'Apprentice', emoji: '📘', level: '5' },
    { name: 'Explorer', emoji: '🧭', level: '10' },
    { name: 'Specialist', emoji: '🔧', level: '20' },
    { name: 'Expert', emoji: '⭐', level: '35' },
    { name: 'Master', emoji: '🏅', level: '50' },
    { name: 'Grandmaster', emoji: '👑', level: '75' },
    { name: 'Legend', emoji: '🔥', level: '100' },
    { name: 'Mythic', emoji: '⚡', level: '150' },
    { name: 'Titan', emoji: '🌟', level: '200' },
    { name: 'Champion', emoji: '🏆', level: '300' },
    { name: 'Hero', emoji: '💎', level: '500' },
];

const a11yProfiles = [
    { name: 'Dislexia', icon: BookOpen, desc: 'Fuente OpenDyslexic, espaciado amplio, guía de lectura' },
    { name: 'Baja Visión', icon: Eye, desc: 'Texto ampliado, alto contraste, cursor grande' },
    { name: 'Daltonismo', icon: Palette, desc: 'Filtros deuteranopia, protanopia, tritanopia' },
    { name: 'Auditiva', icon: Ear, desc: 'Subtítulos, alertas visuales, sin dependencia de audio' },
    { name: 'Motora', icon: Hand, desc: 'Navegación por teclado 100%, áreas de click ampliadas' },
    { name: 'Cognitiva', icon: Brain, desc: 'Interfaz simplificada, menos animaciones, guías paso a paso' },
];

const techStackDetailed = [
    { category: 'Frontend', items: [
        { name: 'React 19', detail: 'Con TypeScript estricto' },
        { name: 'Vite', detail: 'Build tooling' },
        { name: 'Tailwind CSS v4', detail: 'Sistema de diseño' },
        { name: 'shadcn/ui', detail: 'Componentes base' },
        { name: 'Framer Motion', detail: 'Animaciones accesibles' },
        { name: 'Phosphor Icons', detail: 'Iconografía' },
    ]},
    { category: 'Backend', items: [
        { name: 'Node.js + Express', detail: 'API REST con TypeScript' },
        { name: 'JWT', detail: 'Autenticación + refresh tokens' },
        { name: 'Multer', detail: 'Upload de archivos' },
        { name: 'CORS + Helmet', detail: 'Seguridad' },
    ]},
    { category: 'Infraestructura', items: [
        { name: 'Azure Container Apps', detail: 'Frontend + Backend' },
        { name: 'Azure Cosmos DB', detail: 'NoSQL Serverless' },
        { name: 'Azure Blob Storage', detail: 'Archivos estáticos' },
        { name: 'Azure CDN', detail: 'Distribución global' },
        { name: 'GitHub Actions', detail: 'CI/CD automático' },
        { name: 'Application Insights', detail: 'Monitoreo + alertas' },
    ]},
];

const features = [
    {
        icon: Gamepad2,
        title: 'Gamificación RPG Completa',
        description: 'Sistema de XP con curva logarítmica infinita, 12 rangos (Novice → Hero), badges automáticos en 10 hitos, rachas y desafíos por equipos.',
        accent: 'var(--cyan-neon)',
    },
    {
        icon: Accessibility,
        title: 'Accesibilidad WCAG 2.1 AA',
        description: '35+ preferencias configurables, 6 perfiles de discapacidad preconfigurados, navegación 100% por teclado y soporte completo para screen readers.',
        accent: 'var(--purple-neon)',
    },
    {
        icon: Building2,
        title: 'Multi-Tenancy SaaS',
        description: 'Modelo database-per-tenant con middleware de resolución, branding personalizado por tenant y aislamiento completo de datos.',
        accent: 'var(--orange-accent)',
    },
    {
        icon: Palette,
        title: 'Arquitectura Dual Persona',
        description: 'Persona Learner (RPG gamificado con temas vibrantes) vs Persona Admin (SaaS profesional con diseño limpio). Dos sistemas de diseño coexistentes.',
        accent: 'var(--cyan-neon)',
    },
    {
        icon: BookOpen,
        title: 'Constructor de Cursos Profesional',
        description: 'Herramienta de autoría con asignación de XP/badges por acción, contenido rico, evaluaciones y vista previa en tiempo real.',
        accent: 'var(--purple-neon)',
    },
    {
        icon: Languages,
        title: 'Internacionalización Completa',
        description: '2,204 líneas de traducción ES/EN con sistema i18n integrado. Toda la interfaz es bilingüe desde el primer día.',
        accent: 'var(--orange-accent)',
    },
];

/* ═══════════════════════════════════════════════════════ */

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
};

const KaidoPage = () => {
    return (
        <>
            <SEO
                title="KAIDO — Plataforma LMS Corporativa Gamificada y Accesible | KAINET"
                description="KAIDO: plataforma SaaS multi-tenant de aprendizaje corporativo con gamificación RPG (XP, niveles, rangos) y accesibilidad WCAG 2.1 AA. React 19, TypeScript, Azure Cosmos DB. ~45,000 LOC."
                url="https://kainet.mx/kaido"
            />

            <div className="min-h-screen pt-20 pb-20">

                {/* ━━━ HERO ━━━ */}
                <section className="relative py-20 px-6 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--purple-neon)]/10 via-[var(--gray-900)] to-[var(--gray-900)]" />

                    <div className="max-w-7xl mx-auto relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                                <Badge variant="default" size="lg">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        PRODUCCIÓN ACTIVA — AZURE
                                    </span>
                                </Badge>
                                <Badge variant="purple" size="lg">
                                    SaaS MULTI-TENANT
                                </Badge>
                            </div>

                            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-4">
                                <GlitchText>
                                    KAIDO
                                </GlitchText>
                            </h1>
                            <p className="text-2xl md:text-3xl text-[var(--cyan-neon)] font-light mb-4">
                                Plataforma LMS Corporativa Gamificada
                            </p>
                            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto mb-10 leading-relaxed">
                                Plataforma SaaS multi-tenant de aprendizaje corporativo que combina un{' '}
                                <span className="text-white font-medium">sistema de gamificación RPG</span> con{' '}
                                <span className="text-white font-medium">accesibilidad WCAG 2.1 AA</span> de verdad.
                                <br /><br />
                                ~45,000 líneas de código TypeScript/React · 150+ componentes · 50+ endpoints · Desplegado en Azure Container Apps.
                            </p>

                            {/* Tech pills */}
                            <div className="flex flex-wrap gap-3 justify-center mb-10">
                                {[
                                    { icon: '⚛️', label: 'React 19' },
                                    { icon: '🔷', label: 'TypeScript' },
                                    { icon: '🟢', label: 'Node.js + Express' },
                                    { icon: '☁️', label: 'Azure Cosmos DB' },
                                    { icon: '🚀', label: 'Container Apps' },
                                    { icon: '🎨', label: 'Tailwind v4 + shadcn/ui' },
                                ].map((t) => (
                                    <span key={t.label} className="px-4 py-2 bg-black/30 border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-secondary)]">
                                        {t.icon} {t.label}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="#gamification">
                                    <Button variant="primary" size="lg" className="w-full sm:w-auto">
                                        Explorar Arquitectura
                                    </Button>
                                </a>
                                <Link to="/contact">
                                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                        Solicitar Demo →
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ━━━ PROJECT STATS ━━━ */}
                <section className="py-12 px-6 border-y border-[var(--gray-800)]">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {projectStats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    {...fadeInUp}
                                    transition={{ delay: i * 0.07 }}
                                    className="text-center"
                                >
                                    <div className="text-2xl md:text-3xl font-bold" style={{ color: stat.color }}>
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-[var(--text-secondary)] mt-1 leading-tight">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ━━━ THE PARADOX ━━━ */}
                <section className="py-20 px-6 bg-[var(--gray-800)]/30">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <SectionTitle>El Problema</SectionTitle>
                                <h3 className="text-3xl font-bold text-white mb-6">La Paradoja de la Inclusión</h3>
                                <div className="space-y-4 text-[var(--text-secondary)]">
                                    <p>En el mercado actual de software educativo existe una división fundamental:</p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" strokeWidth={2} />
                                            <div>
                                                <strong className="text-white">El software accesible suele ser aburrido.</strong>
                                                <br />Se centra tanto en el cumplimiento normativo que olvida la experiencia del usuario.
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" strokeWidth={2} />
                                            <div>
                                                <strong className="text-white">El software gamificado no es accesible.</strong>
                                                <br />Lleno de animaciones rápidas, bajo contraste y dependencias del ratón que excluyen a muchos usuarios.
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <Card variant="featured" hover padding="lg">
                                <div className="text-center space-y-6 py-8">
                                    <h3 className="text-2xl font-bold text-[var(--cyan-neon)]">La Solución KAIDO</h3>
                                    <div className="flex justify-center">
                                        <Handshake className="w-16 h-16 text-[var(--cyan-neon)]" strokeWidth={1.5} />
                                    </div>
                                    <p className="text-lg text-white">
                                        Un puente real donde <br />
                                        <span className="font-bold text-[var(--purple-neon)]">Gamificación RPG</span> y <span className="font-bold text-[var(--purple-neon)]">Accesibilidad Universal</span> conviven.
                                    </p>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        35+ preferencias de accesibilidad · 6 perfiles de discapacidad · Sistema XP con nivelación infinita
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* ━━━ SCREENSHOTS ━━━ */}
                <section className="py-20 px-6 bg-[var(--gray-800)]/20">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionTitle>En Acción</SectionTitle>
                            <h2 className="text-4xl font-bold text-white mt-4">Experiencia Visual</h2>
                            <p className="text-lg text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto">
                                Interfaz real del producto en producción — gamificación RPG con accesibilidad WCAG 2.1 AA.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
                                <Card variant="default" hover padding="none" className="overflow-hidden group cursor-pointer">
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src="/kaido/screenshots/dashboard.png"
                                            alt="Dashboard gamificado del estudiante — XP, niveles, logros, rachas y progreso de cursos"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--gray-900)] via-transparent to-transparent opacity-60" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-lg font-bold text-white mb-1">Dashboard Gamificado (Persona Learner)</h3>
                                            <p className="text-sm text-[var(--text-secondary)]">XP Widget, Game Stats, Level Badge, Streak Counter, Leaderboards</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }}>
                                <Card variant="default" hover padding="none" className="overflow-hidden group cursor-pointer">
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src="/kaido/screenshots/course-builder.png"
                                            alt="Constructor de cursos profesional — editor de lecciones, asignación de XP y badges, vista previa"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--gray-900)] via-transparent to-transparent opacity-60" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-lg font-bold text-white mb-1">Constructor de Cursos (Persona Admin)</h3>
                                            <p className="text-sm text-[var(--text-secondary)]">Editor rico, asignación de XP/badges por acción, evaluaciones</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.4 }} className="lg:col-span-2">
                                <Card variant="featured" hover padding="none" className="overflow-hidden group cursor-pointer">
                                    <div className="relative aspect-[21/9] overflow-hidden">
                                        <img
                                            src="/kaido/screenshots/accessibility.png"
                                            alt="AdvancedAccessibilityPanel — 35+ preferencias, 6 perfiles de discapacidad, WCAG 2.1 AA"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--gray-900)] via-transparent to-transparent opacity-60" />
                                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold text-white mb-1">Panel de Accesibilidad Avanzado</h3>
                                                <p className="text-sm text-[var(--text-secondary)]">35+ preferencias configurables · 6 perfiles preconfigurados · WCAG 2.1 AA</p>
                                            </div>
                                            <div className="px-3 py-1 bg-[var(--cyan-neon)]/20 border border-[var(--cyan-neon)]/50 rounded text-xs font-mono text-[var(--cyan-neon)] flex items-center gap-1">
                                                <Accessibility className="w-3 h-3" /> WCAG AA
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>

                        <div className="text-center mt-12">
                            <p className="text-[var(--text-secondary)] mb-4">
                                ¿Quieres ver el producto en acción?
                            </p>
                            <Link to="/contact">
                                <Button variant="secondary" size="md">
                                    Solicitar Demo Personalizada →
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ━━━ FEATURES GRID ━━━ */}
                <section id="features" className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionTitle>Capacidades</SectionTitle>
                            <h2 className="text-4xl font-bold text-white mt-4">Ingeniería de Producto Real</h2>
                            <p className="text-lg text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto">
                                Cada feature es funcional y está desplegado. No mockups — código en producción.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    {...fadeInUp}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card variant="default" hover padding="lg" className="h-full group">
                                        <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <feature.icon className="w-10 h-10" style={{ color: feature.accent }} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{feature.description}</p>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ━━━ GAMIFICATION DEEP-DIVE ━━━ */}
                <section id="gamification" className="py-20 px-6 bg-[var(--gray-800)]/30">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionTitle>Gamificación</SectionTitle>
                            <h2 className="text-4xl font-bold text-white mt-4">Sistema RPG Completo</h2>
                            <p className="text-lg text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto">
                                Curva de XP logarítmica infinita, 12 rangos, auto-badges en 10 hitos y sistema de rachas.
                                Implementado con <span className="text-white">GamificationFunctions.ts</span> en backend Cosmos DB.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* XP Rewards Table */}
                            <motion.div {...fadeInUp}>
                                <Card variant="default" padding="lg">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Sparkles className="w-6 h-6 text-[var(--cyan-neon)]" />
                                        <h3 className="text-xl font-bold text-white">Recompensas de XP</h3>
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)] mb-6">
                                        Fórmula de nivel: <code className="px-2 py-0.5 bg-black/40 rounded text-[var(--cyan-neon)] text-xs">level = ⌊log₂(xp / 100) + 1⌋</code> — escalado infinito sin techo.
                                    </p>
                                    <div className="space-y-3">
                                        {xpRewards.map((r) => (
                                            <div key={r.action} className="flex items-center justify-between py-2 border-b border-white/[0.05] last:border-0">
                                                <span className="text-sm text-[var(--text-secondary)]">{r.action}</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="kaido-xp-bar" style={{ width: `${(r.xp / 750) * 80}px` }} />
                                                    <span className="text-sm font-mono font-bold text-[var(--cyan-neon)] min-w-[50px] text-right">+{r.xp} XP</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>

                            {/* Rank Tiers */}
                            <motion.div {...fadeInUp} transition={{ delay: 0.15 }}>
                                <Card variant="default" padding="lg">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Trophy className="w-6 h-6 text-[var(--purple-neon)]" />
                                        <h3 className="text-xl font-bold text-white">12 Rangos de Progresión</h3>
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)] mb-6">
                                        Auto-badges al alcanzar niveles hito: 5, 10, 25, 50, 75, 100, 150, 200, 250, 500.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {rankTiers.map((rank) => (
                                            <div key={rank.name} className="kaido-rank-pill">
                                                <span>{rank.emoji}</span>
                                                <span className="text-white">{rank.name}</span>
                                                <span className="text-[var(--text-secondary)] text-[10px]">Lv.{rank.level}+</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-white/[0.06]">
                                        <p className="text-xs text-[var(--text-secondary)]">
                                            <span className="text-white font-medium">Componentes frontend:</span> XPWidget, GameStatsWidget, LevelBadge, LevelProgressDashboard, XPAnimation, LeaderboardCard
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ━━━ ACCESSIBILITY DEEP-DIVE ━━━ */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionTitle>Accesibilidad</SectionTitle>
                            <h2 className="text-4xl font-bold text-white mt-4">WCAG 2.1 AA — De Verdad</h2>
                            <p className="text-lg text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto">
                                No es un checkbox de marketing. Es un <span className="text-white">AdvancedAccessibilityPanel</span> de 822 líneas
                                con 35+ preferencias configurables y 6 perfiles de discapacidad preconfigurados.
                            </p>
                        </div>

                        {/* 6 Accessibility Profiles */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                            {a11yProfiles.map((profile, i) => (
                                <motion.div
                                    key={profile.name}
                                    {...fadeInUp}
                                    transition={{ delay: i * 0.08 }}
                                    className="kaido-a11y-profile"
                                >
                                    <div className="kaido-a11y-icon">
                                        <profile.icon className="w-5 h-5" strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-sm font-bold text-white">{profile.name}</h4>
                                    <p className="text-[10px] text-[var(--text-secondary)] leading-tight">{profile.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Accessibility features checklist */}
                        <motion.div {...fadeInUp}>
                            <Card variant="featured" padding="lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[
                                        'Navegación 100% por teclado',
                                        'Soporte completo screen reader',
                                        'Filtros daltonismo (deutan/protan/tritan)',
                                        'Modos alto contraste (claro y oscuro)',
                                        'Fuente OpenDyslexic integrada',
                                        'Guía de lectura (reading ruler)',
                                        'Control de velocidad de animaciones',
                                        'Áreas de click ampliadas (motor)',
                                        'Subtítulos y alertas visuales',
                                        'Tamaño de texto ajustable',
                                        'Espaciado de línea configurable',
                                        'Cursor personalizado de gran tamaño',
                                        'Focus indicators reforzados',
                                        'Reducción de movimiento (prefers-reduced-motion)',
                                        'Onboarding con setup de accesibilidad',
                                    ].map((item) => (
                                        <div key={item} className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0 mt-0.5" strokeWidth={2} />
                                            <span className="text-sm text-[var(--text-secondary)]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </section>

                {/* ━━━ DUAL PERSONA ARCHITECTURE ━━━ */}
                <section className="py-20 px-6 bg-[var(--gray-800)]/30">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionTitle>Arquitectura</SectionTitle>
                            <h2 className="text-4xl font-bold text-white mt-4">Dual Persona Design</h2>
                            <p className="text-lg text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto">
                                Dos experiencias radicalmente distintas coexistiendo en la misma plataforma,
                                con sistemas de diseño independientes.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Learner Persona */}
                            <motion.div {...fadeInUp}>
                                <div className="kaido-persona-card kaido-persona-learner bg-black/20">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-[var(--cyan-neon)]/10 flex items-center justify-center">
                                            <Gamepad2 className="w-5 h-5 text-[var(--cyan-neon)]" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">Persona Learner</h3>
                                            <p className="text-xs text-[var(--cyan-neon)]">Experiencia RPG Gamificada</p>
                                        </div>
                                    </div>
                                    <ul className="space-y-3">
                                        {[
                                            'Dashboard con XP, niveles, rachas y logros',
                                            'Interfaz vibrante con temas de juego',
                                            'Leaderboards con toggle visual/tabla',
                                            'Badges y certificados coleccionables',
                                            'Sistema de streaks y desafíos por equipo',
                                            'Foros Q&A con recompensas XP',
                                        ].map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                                <Sparkles className="w-3 h-3 text-[var(--cyan-neon)] flex-shrink-0 mt-1" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>

                            {/* Admin Persona */}
                            <motion.div {...fadeInUp} transition={{ delay: 0.15 }}>
                                <div className="kaido-persona-card kaido-persona-admin bg-black/20">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-[var(--purple-neon)]/10 flex items-center justify-center">
                                            <Shield className="w-5 h-5 text-[var(--purple-neon)]" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">Persona Admin</h3>
                                            <p className="text-xs text-[var(--purple-neon)]">SaaS Profesional</p>
                                        </div>
                                    </div>
                                    <ul className="space-y-3">
                                        {[
                                            'Constructor de cursos con editor rico',
                                            'GamificationHub: configurar XP y badges',
                                            'Gestión de usuarios y roles por tenant',
                                            'Analíticas de engagement y retención',
                                            'Branding personalizado por organización',
                                            'Certificaciones y reportes exportables',
                                        ].map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                                <ArrowRight className="w-3 h-3 text-[var(--purple-neon)] flex-shrink-0 mt-1" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ━━━ TECH STACK DETAILED ━━━ */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionTitle>Stack Técnico</SectionTitle>
                            <h2 className="text-4xl font-bold text-white mt-4">Construido con Tecnología de Punta</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {techStackDetailed.map((group, gi) => (
                                <motion.div key={group.category} {...fadeInUp} transition={{ delay: gi * 0.1 }}>
                                    <Card variant="default" padding="lg" className="h-full">
                                        <h3 className="text-lg font-bold text-white mb-1">{group.category}</h3>
                                        <div className="w-12 h-0.5 bg-gradient-to-r from-[var(--cyan-neon)] to-transparent mb-6" />
                                        <div className="space-y-3">
                                            {group.items.map((item) => (
                                                <div key={item.name} className="kaido-tech-item">
                                                    <div>
                                                        <div className="text-sm font-semibold text-white">{item.name}</div>
                                                        <div className="text-xs text-[var(--text-secondary)]">{item.detail}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Architecture layers */}
                        <motion.div {...fadeInUp} className="mt-12">
                            <Card variant="elevated" padding="lg">
                                <h3 className="text-lg font-bold text-white text-center mb-8">Arquitectura de Despliegue</h3>
                                <div className="max-w-md mx-auto space-y-0">
                                    {[
                                        { label: 'Azure CDN', detail: 'Distribución global', icon: Cloud },
                                        { label: 'Azure Container Apps', detail: 'Frontend React 19 + Backend Express', icon: Server },
                                        { label: 'Azure Cosmos DB', detail: 'NoSQL Serverless (8+ contenedores)', icon: Database },
                                        { label: 'Azure Blob Storage', detail: 'Archivos, imágenes, certificados', icon: Layers },
                                        { label: 'GitHub Actions', detail: 'CI/CD automático en push a main', icon: GitBranch },
                                        { label: 'Application Insights', detail: 'Monitoreo, logging, alertas', icon: Activity },
                                    ].map((layer, i, arr) => (
                                        <div key={layer.label}>
                                            <div className="kaido-arch-layer flex items-center gap-4">
                                                <layer.icon className="w-5 h-5 text-[var(--cyan-neon)] flex-shrink-0" strokeWidth={1.5} />
                                                <div>
                                                    <div className="text-sm font-semibold text-white">{layer.label}</div>
                                                    <div className="text-xs text-[var(--text-secondary)]">{layer.detail}</div>
                                                </div>
                                            </div>
                                            {i < arr.length - 1 && <div className="kaido-arch-connector" />}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </section>

                {/* ━━━ CTA ━━━ */}
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <Card variant="elevated" padding="lg" className="py-16 bg-gradient-to-b from-[var(--gray-900)] to-[var(--purple-neon)]/10">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                ¿Interesado en este proyecto?
                            </h2>
                            <p className="text-xl text-[var(--text-secondary)] mb-4">
                                KAIDO está en fase final de desarrollo. Si quieres conocer más sobre la
                                arquitectura, el proceso de desarrollo o solicitar una demo personalizada:
                            </p>
                            <p className="text-sm text-[var(--text-secondary)] mb-8">
                                ~45,000 LOC · 150+ componentes · 50+ endpoints · React 19 + TypeScript + Azure Cosmos DB
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/contact">
                                    <Button variant="primary" size="lg" className="text-lg px-10">
                                        Solicitar Demo
                                    </Button>
                                </Link>
                                <a href="https://www.linkedin.com/in/marcdomibe/" target="_blank" rel="noopener noreferrer">
                                    <Button variant="secondary" size="lg" className="text-lg px-10">
                                        Conectar en LinkedIn
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

export default KaidoPage;
