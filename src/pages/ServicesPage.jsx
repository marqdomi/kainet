import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, SectionTitle, Badge } from '../components/ui';
import HolographicCard from '../components/effects/HolographicCard';
import SEO from '../components/SEO';
import { Bot, Code, Cloud, Palette, Check } from 'lucide-react';

const ServicesPage = () => {
    const services = [
        {
            icon: Bot,
            title: 'Automatización Inteligente',
            description: 'Optimizamos procesos empresariales con IA y automatización custom. Reducimos tiempos operativos hasta en un 70%.',
            features: ['Workflows automatizados', 'Integraciones API', 'RPA & AI', 'Dashboards en tiempo real']
        },
        {
            icon: Code,
            title: 'Desarrollo Web Premium',
            description: 'Aplicaciones web de alto rendimiento con React, Next.js y tecnologías modernas. Diseño responsivo y accesible.',
            features: ['React/Next.js', 'UI/UX Premium', 'Performance optimizada', 'WCAG compliant']
        },
        {
            icon: Cloud,
            title: 'Consultoría Cloud & DevOps',
            description: 'Arquitectura cloud-native, CI/CD y estrategias de deployment escalables en Azure, AWS y GCP.',
            features: ['Azure/AWS/GCP', 'CI/CD Pipelines', 'Kubernetes', 'Monitoreo y alertas']
        },
        {
            icon: Palette,
            title: 'SaaS MVPs',
            description: 'Construimos MVPs de productos SaaS en 8-12 semanas. De la idea al mercado rápidamente.',
            features: ['Arquitectura multi-tenant', 'Auth & Billing', 'Admin panels', 'Analytics integradas']
        }
    ];

    return (
        <>
            <SEO
                title="Servicios - Automatización y Desarrollo Premium"
                description="Servicios de automatización inteligente, desarrollo web y consultoría cloud de KAINET. Transformamos empresas mexicanas con tecnología de punta."
                url="https://kainet.mx/servicios"
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
                            <Badge variant="default" size="lg" className="mb-6">
                                El Motor - Flujo de caja y aprendizaje
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-shadow-xl">
                                Servicios de Consultoría
                            </h1>
                            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-8 text-shadow-md">
                                Transformación digital de alto nivel para PyMEs y corporativos.
                                Utilizamos nuestra experiencia en productos SaaS para impulsar tu empresa.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-12 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <HolographicCard className="h-full hover:border-[var(--cyan-neon)]/50 transition-all">
                                        <div className="mb-4">
                                            <service.icon className="w-12 h-12 text-[var(--cyan-neon)]" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                                        <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                                            {service.description}
                                        </p>

                                        <div className="space-y-2">
                                            {service.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm">
                                                    <Check className="w-4 h-4 text-[var(--cyan-neon)]" />
                                                    <span className="text-[var(--text-secondary)]">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </HolographicCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-20 px-6 bg-[var(--gray-800)]/20">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionTitle kanji="証">Por Qué Elegirnos</SectionTitle>
                            <h2 className="text-4xl font-bold text-white mt-4 text-shadow-lg">Experiencia que Cuenta</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <HolographicCard className="text-center">
                                <div className="text-4xl font-bold text-[var(--cyan-neon)] mb-2">100%</div>
                                <div className="text-lg font-semibold text-white mb-2">Enfoque en Resultados</div>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    No solo código, sino soluciones que impactan tu negocio
                                </p>
                            </HolographicCard>

                            <HolographicCard className="text-center">
                                <div className="text-4xl font-bold text-[var(--purple-neon)] mb-2">8-12</div>
                                <div className="text-lg font-semibold text-white mb-2">Semanas para MVP</div>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Desarrollo ágil sin sacrificar calidad
                                </p>
                            </HolographicCard>

                            <HolographicCard className="text-center">
                                <div className="text-4xl font-bold text-[var(--cyan-neon)] mb-2">24/7</div>
                                <div className="text-lg font-semibold text-white mb-2">Soporte Post-Launch</div>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Acompañamiento continuo después del despliegue
                                </p>
                            </HolographicCard>
                        </div>
                    </div>
                </section>

                {/* Process */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionTitle kanji="流">Nuestro Proceso</SectionTitle>
                            <h2 className="text-4xl font-bold text-white mt-4 text-shadow-lg">De la Consulta al Deployment</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { num: '01', title: 'Consulta', desc: 'Entendemos tus necesidades y objetivos' },
                                { num: '02', title: 'Propuesta', desc: 'Plan técnico detallado y cotización' },
                                { num: '03', title: 'Desarrollo', desc: 'Sprints ágiles con demos semanales' },
                                { num: '04', title: 'Launch', desc: 'Deployment y entrenamiento de equipo' }
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <HolographicCard className="text-center h-full">
                                        <div className="text-5xl font-bold text-[var(--cyan-neon)]/20 mb-3">{step.num}</div>
                                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                        <p className="text-sm text-[var(--text-secondary)]">{step.desc}</p>
                                    </HolographicCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <HolographicCard className="py-16 bg-gradient-to-b from-[var(--gray-900)] to-[var(--cyan-neon)]/10">
                            <h2 className="text-4xl font-bold text-white mb-6">
                                ¿Listo para transformar tu empresa?
                            </h2>
                            <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                                Agenda una consulta gratuita de 30 minutos. Sin compromiso.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/contact">
                                    <Button variant="primary" size="lg">
                                        Agendar Consulta Gratuita
                                    </Button>
                                </Link>
                                <Link to="/proyectos">
                                    <Button variant="secondary" size="lg">
                                        Ver Proyectos Realizados
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

export default ServicesPage;
