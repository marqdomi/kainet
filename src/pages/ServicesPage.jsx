import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button, SectionTitle, Badge, Card } from '../components/ui';
import SEO from '../components/SEO';
import { Brain, Code, Cloud, Network, Check, Server, Database } from 'lucide-react';

const ServicesPage = () => {
    const competencies = [
        {
            icon: Brain,
            title: 'IA Aplicada y LLMs',
            description: 'Experimentación con pipelines RAG, Azure AI Foundry y Agentes Autónomos para fines educativos y de optimización.',
            skills: ['OpenAI GPT-4', 'Azure AI Foundry', 'LangChain', 'RAG Pipelines', 'Prompt Engineering', 'Fine-tuning']
        },
        {
            icon: Code,
            title: 'Ingeniería Full-Stack',
            description: 'Construcción de aplicaciones escalables usando Python (FastAPI), React y Next.js con enfoque en UX/UI intuitivo.',
            skills: ['Python/FastAPI', 'React/Next.js', 'TypeScript', 'PostgreSQL', 'GraphQL', 'REST APIs']
        },
        {
            icon: Network,
            title: 'Automatización de Redes',
            description: 'Uniendo NetDevOps con Infraestructura como Código (IaC) para resolver retos complejos en Centros de Datos.',
            skills: ['Ansible', 'Terraform', 'Python Netmiko', 'NAPALM', 'CI/CD Pipelines', 'Network Testing']
        },
        {
            icon: Cloud,
            title: 'Cloud & DevOps',
            description: 'Arquitectura cloud-native en Azure con enfoque en observabilidad, seguridad y escalabilidad.',
            skills: ['Azure', 'Docker', 'Kubernetes', 'GitHub Actions', 'Prometheus/Grafana', 'Datadog']
        }
    ];

    const tools = [
        { category: 'Lenguajes', items: ['Python', 'TypeScript', 'Go', 'SQL'] },
        { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
        { category: 'Backend', items: ['FastAPI', 'Node.js', 'PostgreSQL', 'Redis'] },
        { category: 'AI/ML', items: ['OpenAI', 'LangChain', 'Azure AI', 'Hugging Face'] },
        { category: 'Networking', items: ['Ansible', 'Terraform', 'Netmiko', 'NAPALM'] },
        { category: 'DevOps', items: ['Docker', 'Kubernetes', 'GitHub Actions', 'Azure DevOps'] }
    ];

    return (
        <>
            <SEO
                title="Competencias Técnicas - Marco Domínguez"
                description="Stack tecnológico y áreas de especialización: IA/LLMs, Ingeniería Full-Stack, Automatización de Redes y DevOps."
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
                                Stack Tecnológico
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                                Competencias Técnicas
                            </h1>
                            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-8">
                                Áreas de investigación y dominio técnico que aplico en mis proyectos de I+D.
                                Enfocado en construir soluciones escalables y de alto impacto.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Competencies Grid */}
                <section className="py-12 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {competencies.map((comp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card variant="default" hover padding="lg" className="h-full">
                                        <div className="mb-4">
                                            <comp.icon className="w-12 h-12 text-[var(--cyan-neon)]" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">{comp.title}</h3>
                                        <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                                            {comp.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {comp.skills.map((skill, i) => (
                                                <span 
                                                    key={i} 
                                                    className="px-3 py-1 text-xs bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full text-[var(--text-secondary)]"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tools & Technologies */}
                <section className="py-20 px-6 bg-[var(--gray-800)]/20">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionTitle>Herramientas</SectionTitle>
                            <h2 className="text-4xl font-bold text-white mt-4">Stack Tecnológico</h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {tools.map((toolGroup, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card variant="default" hover className="h-full">
                                        <h3 className="text-sm font-bold text-[var(--cyan-neon)] mb-3 uppercase tracking-wider">
                                            {toolGroup.category}
                                        </h3>
                                        <ul className="space-y-1.5">
                                            {toolGroup.items.map((item, i) => (
                                                <li key={i} className="text-sm text-[var(--text-secondary)]">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Experience Highlights */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionTitle>Experiencia</SectionTitle>
                            <h2 className="text-4xl font-bold text-white mt-4">Trayectoria Técnica</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card variant="default" hover className="text-center">
                                <div className="text-4xl font-bold text-[var(--cyan-neon)] mb-2">8+</div>
                                <div className="text-lg font-semibold text-white mb-2">Años en Tecnología</div>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Desarrollo de software, automatización y arquitectura de sistemas
                                </p>
                            </Card>

                            <Card variant="default" hover className="text-center">
                                <div className="text-4xl font-bold text-[var(--purple-neon)] mb-2">Data Centers</div>
                                <div className="text-lg font-semibold text-white mb-2">Networking Enterprise</div>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Experiencia en automatización de redes para centros de datos
                                </p>
                            </Card>

                            <Card variant="default" hover className="text-center">
                                <div className="text-4xl font-bold text-[var(--cyan-neon)] mb-2">AI/ML</div>
                                <div className="text-lg font-semibold text-white mb-2">Enfoque Actual</div>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Investigación activa en LLMs, RAG y agentes autónomos
                                </p>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <Card variant="featured" padding="lg" className="py-16 text-center">
                            <h2 className="text-4xl font-bold text-white mb-6">
                                ¿Interesado en colaborar?
                            </h2>
                            <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                                Siempre abierto a discutir proyectos técnicos interesantes y oportunidades de colaboración.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="https://www.linkedin.com/in/marcdomibe/" target="_blank" rel="noopener noreferrer">
                                    <Button variant="primary" size="lg">
                                        Conectar en LinkedIn
                                    </Button>
                                </a>
                                <Link to="/proyectos">
                                    <Button variant="secondary" size="lg">
                                        Ver Proyectos
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    </div>
                </section>

            </div>
        </>
    );
};

export default ServicesPage;
