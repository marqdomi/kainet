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
                            </motion.div>
                        ))}
                    </div>

                    {/* Testimonials Carousel */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mb-10 sm:mb-12"
                    >
                        <div className="relative max-w-3xl mx-auto">
                            {/* Quote Icon */}
                            <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[var(--cyan-neon)]/30" />
                            
                            {/* Testimonial Content */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTestimonial}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-center px-8 sm:px-12"
                                >
                                    {/* Stars */}
                                    <div className="flex justify-center gap-1 mb-4">
                                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    
                                    {/* Quote */}
                                    <blockquote className="text-lg sm:text-xl md:text-2xl text-body italic mb-6 leading-relaxed">
                                        "{testimonials[activeTestimonial].quote}"
                                    </blockquote>
                                    
                                    {/* Author */}
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--cyan-neon)] to-[var(--purple-neon)] flex items-center justify-center text-white font-bold">
                                            {testimonials[activeTestimonial].author.charAt(0)}
                                        </div>
                                        <div className="text-left">
                                            <p className="text-heading font-semibold">
                                                {testimonials[activeTestimonial].author}
                                            </p>
                                            <p className="text-sm text-[var(--text-secondary)]">
                                                {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevTestimonial}
                                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] hover:bg-[var(--cyan-neon)]/10 hover:border-[var(--cyan-neon)]/50 transition-all"
                                aria-label="Testimonio anterior"
                            >
                                <ChevronLeft className="w-5 h-5 text-heading" />
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] hover:bg-[var(--cyan-neon)]/10 hover:border-[var(--cyan-neon)]/50 transition-all"
                                aria-label="Siguiente testimonio"
                            >
                                <ChevronRight className="w-5 h-5 text-heading" />
                            </button>
                        </div>

                        {/* Dots Indicator */}
                        <div className="flex justify-center gap-2 mt-6">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        index === activeTestimonial
                                            ? 'w-6 bg-[var(--cyan-neon)]'
                                            : 'bg-white/30 hover:bg-white/50'
                                    }`}
                                    aria-label={`Ver testimonio ${index + 1}`}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Client Logos */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-center border-t border-white/10 pt-8"
                    >
                        <p className="text-sm text-[var(--text-secondary)] mb-6">
                            Empresas que confían en KAINET
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                            {clientLogos.map((client, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    className="w-28 sm:w-32 h-16 flex items-center justify-center opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer group"
                                >
                                    {client.logo ? (
                                        <img 
                                            src={client.logo} 
                                            alt={client.name} 
                                            className="max-h-10 max-w-full"
                                        />
                                    ) : (
                                        <div className="text-xs text-[var(--text-secondary)] font-mono border border-white/20 bg-black/20 backdrop-blur-sm px-4 py-2 rounded group-hover:border-[var(--cyan-neon)]/50 transition-colors">
                                            {client.name}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Note for future */}
                        <p className="text-xs text-[var(--text-tertiary)] mt-6 italic">
                            * Early Access - Comunidad en crecimiento
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
