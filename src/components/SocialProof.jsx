// src/components/SocialProof.jsx
import React from 'react';
import { motion } from 'framer-motion';

const SocialProof = () => {
    // Métricas realistas para early access (placeholders)
    const metrics = [
        { value: '250+', label: 'Usuarios Beta' },
        { value: '1.2K+', label: 'Cursos Completados' },
        { value: '82%', label: 'Completion Rate' },
        { value: 'WCAG AA', label: 'Accesibilidad' }
    ];

    return (
        <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Glassmorphic Card Container */}
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12">
                    {/* Metrics Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        {metrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-[var(--cyan-neon)] mb-2">
                                    {metric.value}
                                </div>
                                <div className="text-sm text-[var(--text-secondary)]">
                                    {metric.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Client Logos Placeholder */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-center"
                    >
                        <p className="text-sm text-[var(--text-secondary)] mb-6">
                            Empresas que confían en KAINET
                        </p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                            {/* Placeholder logos - reemplazar con logos reales */}
                            {['Cliente Demo', 'Partner 1', 'Partner 2', 'Partner 3'].map((name, i) => (
                                <div
                                    key={i}
                                    className="w-28 h-16 flex items-center justify-center opacity-40 grayscale hover:opacity-60 hover:grayscale-0 transition-all"
                                >
                                    <div className="text-xs text-[var(--text-secondary)] font-mono border border-white/20 bg-black/20 backdrop-blur-sm px-4 py-2 rounded">
                                        {name}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Note for future */}
                        <p className="text-xs text-[var(--text-tertiary)] mt-6 italic">
                            * Early Access - Métricas en crecimiento
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
