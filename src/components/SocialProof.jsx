// src/components/SocialProof.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Network, Cloud } from 'lucide-react';

const SocialProof = () => {
    // Métricas de experiencia técnica
    const metrics = [
        { value: '8+', label: 'Años de Experiencia', icon: '🎯' },
        { value: 'IA/ML', label: 'Enfoque Actual', icon: '🤖' },
        { value: 'NetDevOps', label: 'Automatización', icon: '🔧' },
        { value: 'Full-Stack', label: 'Desarrollo', icon: '💻' }
    ];

    // Tecnologías principales
    const techStack = [
        { name: 'Python', category: 'Backend' },
        { name: 'React', category: 'Frontend' },
        { name: 'Azure AI', category: 'AI/ML' },
        { name: 'Ansible', category: 'Network' },
        { name: 'Docker', category: 'DevOps' },
        { name: 'FastAPI', category: 'Backend' },
    ];

    return (
        <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Glassmorphic Card Container */}
                <div className="card-default backdrop-blur-md border rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-12">
                    {/* Section Title */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <h3 className="text-xl sm:text-2xl font-bold text-heading mb-2">
                            Experiencia <span className="text-[var(--cyan-neon)]">Técnica</span>
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)]">
                            Stack tecnológico y áreas de especialización
                        </p>
                    </motion.div>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12">
                        {metrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                                    {metric.icon}
                                </div>
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--cyan-neon)] mb-1 sm:mb-2">
                                    {metric.value}
                                </div>
                                <div className="text-sm text-[var(--text-secondary)]">
                                    {metric.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {techStack.map((tech, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="px-4 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full text-sm text-[var(--text-secondary)] hover:border-[var(--cyan-neon)]/50 hover:text-[var(--cyan-neon)] transition-all cursor-default"
                            >
                                {tech.name}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
