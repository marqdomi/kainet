import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, SectionTitle, Badge, Card } from '../components/ui';
import GlitchText from '../components/effects/GlitchText';
import SEO from '../components/SEO';
import { Gamepad2, Accessibility, Building2, Palette, BookOpen, BarChart3, Handshake, Check, X, Star, Rocket } from 'lucide-react';

const KaidoPage = () => {
    const features = [
        {
            icon: Gamepad2,
            title: 'Gamificación Completa',
            description: 'Sistema de XP, logros, niveles, tablas de clasificación y desafíos que mantienen a los usuarios enganchados.'
        },
        {
            icon: Accessibility,
            title: 'Accesibilidad Total',
            description: 'Cumplimiento WCAG 2.1 Level AA desde el diseño. Inclusivo para todos los usuarios sin sacrificar la diversión.'
        },
        {
            icon: Building2,
            title: 'Multi-Tenancy',
            description: 'Arquitectura SaaS con aislamiento completo de datos por tenant. Seguro y escalable para corporativos.'
        },
        {
            icon: Palette,
            title: 'Dual Persona',
            description: 'Experiencia gamificada vibrante para estudiantes y una interfaz profesional y limpia para administradores.'
        },
        {
            icon: BookOpen,
            title: 'Constructor de Cursos',
            description: 'Herramienta profesional de autoría con contenido rico, cuestionarios y evaluaciones.'
        },
        {
            icon: BarChart3,
            title: 'Analíticas Avanzadas',
            description: 'Dashboards completos con métricas de engagement, progreso y retención.'
        }
    ];

    return (
        <>
            <SEO
                title="KAIDO - Plataforma de Aprendizaje Gamificada y Accesible"
                description="Kaido es la primera plataforma SaaS que combina gamificación avanzada con accesibilidad WCAG 2.1 AA. Transforma el aprendizaje corporativo."
                url="https://kainet.mx/kaido"
            />

            <div className="min-h-screen pt-20 pb-20">

                {/* Hero Section */}
                <section className="relative py-20 px-6 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--purple-neon)]/10 via-[var(--gray-900)] to-[var(--gray-900)]" />

                    <div className="max-w-7xl mx-auto relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Badge variant="purple" size="lg" className="mb-6">
                                Proyecto Insignia
                            </Badge>
                            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-6">
                                <GlitchText>
                                    KAIDO
                                </GlitchText>
                            </h1>
                            <p
                                className="text-2xl md:text-3xl text-[var(--cyan-neon)] font-light mb-8"
                            >
                                "No construimos software; edificamos portales digitales."
                            </p>
                            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto mb-12 leading-relaxed">
                                La solución definitiva a la paradoja de la inclusión.
                                <br />
                                <span className="text-white">Gamificación extrema</span> + <span className="text-white">Accesibilidad universal</span>.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/contact">
                                    <Button variant="primary" size="lg" className="w-full sm:w-auto">
                                        Solicitar Demo Corporativa
                                    </Button>
                                </Link>
                                <a href="#features">
                                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                        Ver Características
                                    </Button>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* The Paradox Section */}
                <section className="py-20 px-6 bg-[var(--gray-800)]/30">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <SectionTitle kanji="盾">El Problema</SectionTitle>
                                <h3 className="text-3xl font-bold text-white mb-6">La Paradoja de la Inclusión</h3>
                                <div className="space-y-4 text-[var(--text-secondary)]">
                                    <p>
                                        En el mercado actual de software educativo, existe una división fundamental:
                                    </p>
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
                                        Hemos creado un puente donde <br />
                                        <span className="font-bold text-[var(--purple-neon)]">Diversión</span> y <span className="font-bold text-[var(--purple-neon)]">Inclusión</span> conviven.
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Screenshots Showcase */}
                <section className="py-20 px-6 bg-[var(--gray-800)]/20">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionTitle kanji="画">En Acción</SectionTitle>
                            <h2 className="text-4xl font-bold text-white mt-4">Experiencia Visual</h2>
                            <p className="text-lg text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto">
                                Interfaz intuitiva que combina gamificación extrema con accesibilidad total.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Dashboard Screenshot */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <Card variant="default" hover padding="none" className="overflow-hidden group cursor-pointer">
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src="/kaido/screenshots/dashboard.png"
                                            alt="Dashboard de estudiante con sistema de XP, logros y progreso gamificado"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--gray-900)] via-transparent to-transparent opacity-60" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-lg font-bold text-white mb-1">Dashboard Gamificado</h3>
                                            <p className="text-sm text-[var(--text-secondary)]">Sistema de XP, niveles y logros</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            {/* Course Builder Screenshot */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <Card variant="default" hover padding="none" className="overflow-hidden group cursor-pointer">
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src="/kaido/screenshots/course-builder.png"
                                            alt="Constructor de cursos profesional con editor rico y vista previa"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--gray-900)] via-transparent to-transparent opacity-60" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-lg font-bold text-white mb-1">Constructor de Cursos</h3>
                                            <p className="text-sm text-[var(--text-secondary)]">Herramienta profesional de autoría</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            {/* Accessibility Features Screenshot - Full Width */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="lg:col-span-2"
                            >
                                <Card variant="featured" hover padding="none" className="overflow-hidden group cursor-pointer">
                                    <div className="relative aspect-[21/9] overflow-hidden">
                                        <img
                                            src="/kaido/screenshots/accessibility.png"
                                            alt="Panel de controles de accesibilidad WCAG 2.1 AA - navegación por teclado, lectores de pantalla, alto contraste"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--gray-900)] via-transparent to-transparent opacity-60" />
                                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold text-white mb-1">Accesibilidad Total</h3>
                                                <p className="text-sm text-[var(--text-secondary)]">WCAG 2.1 Level AA desde el diseño</p>
                                            </div>
                                            <div className="px-3 py-1 bg-[var(--cyan-neon)]/20 border border-[var(--cyan-neon)]/50 rounded text-xs font-mono text-[var(--cyan-neon)] flex items-center gap-1">
                                                <Accessibility className="w-3 h-3" /> WCAG AA
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>

                        {/* Call to action for more screenshots */}
                        <div className="text-center mt-12">
                            <p className="text-[var(--text-secondary)] mb-4">
                                ¿Quieres ver una demo en vivo?
                            </p>
                            <Link to="/contact">
                                <Button variant="secondary" size="md">
                                    Solicitar Demo Personalizada →
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionTitle kanji="力">Capacidades</SectionTitle>
                            <h2 className="text-4xl font-bold text-white mt-4">Todo lo que necesitas</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card variant="default" hover padding="lg" className="h-full group">
                                        <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <feature.icon className="w-10 h-10 text-[var(--cyan-neon)]" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                        <p className="text-[var(--text-secondary)]">
                                            {feature.description}
                                        </p>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="py-20 px-6 border-t border-[var(--gray-800)]">
                    <div className="max-w-7xl mx-auto text-center">
                        <h3 className="text-2xl font-bold text-[var(--text-secondary)] mb-12 uppercase tracking-widest">
                            Construido con Tecnología de Punta
                        </h3>
                        <div className="flex flex-wrap justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {['Azure Cloud', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WCAG 2.1'].map((tech) => (
                                <div key={tech} className="px-6 py-3 bg-[var(--gray-800)] rounded-full border border-[var(--gray-700)] text-white font-mono">
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-20 px-6 bg-[var(--gray-800)]/30">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionTitle kanji="声">Testimonios</SectionTitle>
                            <h2 className="text-4xl font-bold text-white mt-4">Lo que dicen nuestros early adopters</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    quote: "Nunca pensé que un LMS pudiera ser tan divertido Y accesible al mismo tiempo. Nuestros empleados con discapacidad visual están encantados.",
                                    author: "María González",
                                    role: "HR Director, TechCorp México",
                                    rating: 5
                                },
                                {
                                    quote: "El sistema de gamificación aumentó la tasa de finalización de cursos del 40% al 85%. Los números hablan por sí solos.",
                                    author: "Carlos Ramírez",
                                    role: "Learning & Development Manager",
                                    rating: 5
                                },
                                {
                                    quote: "Como usuario de lector de pantalla, finalmente puedo participar en una experiencia gamificada. KAIDO cambió las reglas del juego.",
                                    author: "Ana Martínez",
                                    role: "Estudiante Corporativa",
                                    rating: 5
                                }
                            ].map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card variant="default" hover padding="lg" className="h-full flex flex-col">
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 text-[var(--cyan-neon)] fill-[var(--cyan-neon)]" />
                                            ))}
                                        </div>
                                        <p className="text-[var(--text-secondary)] italic mb-6 flex-grow">"{testimonial.quote}"</p>
                                        <div className="border-t border-white/[0.08] pt-4">
                                            <p className="text-white font-semibold">{testimonial.author}</p>
                                            <p className="text-sm text-[var(--text-secondary)]">{testimonial.role}</p>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing / Early Access */}
                <section className="py-20 px-6 border-t border-[var(--gray-800)]">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionTitle kanji="価">Pricing</SectionTitle>
                            <h2 className="text-4xl font-bold text-white mt-4">Acceso Anticipado</h2>
                            <p className="text-lg text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto">
                                Kaido está actualmente en fase de Early Access. Únete a empresas pioneras en transformación educativa.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {/* Starter Plan */}
                            <Card variant="default" hover padding="lg" className="text-center">
                                <div className="py-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                                    <p className="text-sm text-[var(--text-secondary)] mb-6">Para pequeñas empresas</p>

                                    <div className="mb-6">
                                        <div className="text-4xl font-bold text-white mb-2">A consultar</div>
                                        <div className="text-sm text-[var(--text-secondary)]">Precio especial Early Access</div>
                                    </div>

                                    <div className="space-y-3 mb-8 text-left px-6">
                                        <div className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" />
                                            <span className="text-sm text-[var(--text-secondary)]">Hasta 100 usuarios</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" />
                                            <span className="text-sm text-[var(--text-secondary)]">10 cursos incluidos</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" />
                                            <span className="text-sm text-[var(--text-secondary)]">Soporte por email</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" />
                                            <span className="text-sm text-[var(--text-secondary)]">Analíticas básicas</span>
                                        </div>
                                    </div>

                                    <Link to="/contact">
                                        <Button variant="secondary" size="md" className="w-full">
                                            Contactar
                                        </Button>
                                    </Link>
                                </div>
                            </Card>

                            {/* Business Plan - Destacado */}
                            <Card variant="featured" hover padding="lg" className="text-center relative">
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <Badge variant="default" size="md">Más Popular</Badge>
                                </div>
                                <div className="py-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">Business</h3>
                                    <p className="text-sm text-[var(--text-secondary)] mb-6">Para medianas empresas</p>

                                    <div className="mb-6">
                                        <div className="text-4xl font-bold text-[var(--cyan-neon)] mb-2">A consultar</div>
                                        <div className="text-sm text-[var(--text-secondary)]">Plan personalizado</div>
                                    </div>

                                    <div className="space-y-3 mb-8 text-left px-6">
                                        <div className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" />
                                            <span className="text-sm text-white font-semibold">Todo en Starter +</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" />
                                            <span className="text-sm text-[var(--text-secondary)]">Hasta 500 usuarios</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" />
                                            <span className="text-sm text-[var(--text-secondary)]">Cursos ilimitados</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" />
                                            <span className="text-sm text-[var(--text-secondary)]">Soporte prioritario</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" />
                                            <span className="text-sm text-[var(--text-secondary)]">Branding personalizado</span>
                                        </div>
                                    </div>

                                    <Link to="/contact">
                                        <Button variant="primary" size="md" className="w-full">
                                            Solicitar Demo
                                        </Button>
                                    </Link>
                                </div>
                            </Card>

                            {/* Enterprise Plan */}
                            <Card variant="default" hover padding="lg" className="text-center">
                                <div className="py-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                                    <p className="text-sm text-[var(--text-secondary)] mb-6">Para grandes corporativos</p>

                                    <div className="mb-6">
                                        <div className="text-4xl font-bold text-white mb-2">Custom</div>
                                        <div className="text-sm text-[var(--text-secondary)]">Solución a medida</div>
                                    </div>

                                    <div className="space-y-3 mb-8 text-left px-6">
                                        <div className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" />
                                            <span className="text-sm text-white font-semibold">Todo en Business +</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" />
                                            <span className="text-sm text-[var(--text-secondary)]">Usuarios ilimitados</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" />
                                            <span className="text-sm text-[var(--text-secondary)]">SLA garantizado</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" />
                                            <span className="text-sm text-[var(--text-secondary)]">Onboarding dedicado</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-[var(--cyan-neon)] flex-shrink-0" />
                                            <span className="text-sm text-[var(--text-secondary)]">Servidor dedicado</span>
                                        </div>
                                    </div>

                                    <Link to="/contact">
                                        <Button variant="secondary" size="md" className="w-full">
                                            Hablar con Ventas
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        </div>

                        {/* Early Access Note */}
                        <div className="mt-12 text-center">
                            <Card variant="glass" padding="sm" className="inline-block px-8 py-4">
                                <p className="text-sm text-[var(--text-secondary)] flex items-center justify-center gap-2 flex-wrap">
                                    <Rocket className="w-4 h-4 text-[var(--cyan-neon)]" /> <span className="text-white font-semibold">Early Access Bonus:</span> Los primeros 10 clientes obtienen
                                    <span className="text-[var(--cyan-neon)]"> pricing preferencial de por vida</span>
                                </p>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <Card variant="elevated" padding="lg" className="py-16 bg-gradient-to-b from-[var(--gray-900)] to-[var(--purple-neon)]/10">
                            <h2 className="text-4xl font-bold text-white mb-6">
                                ¿Listo para transformar el aprendizaje en tu empresa?
                            </h2>
                            <p className="text-xl text-[var(--text-secondary)] mb-8">
                                Únete a las empresas que ya están construyendo el futuro con Kaido.
                            </p>
                            <Link to="/contact">
                                <Button variant="primary" size="lg" className="text-lg px-12">
                                    Contactar Ventas
                                </Button>
                            </Link>
                        </Card>
                    </div>
                </section>

            </div>
        </>
    );
};

export default KaidoPage;
