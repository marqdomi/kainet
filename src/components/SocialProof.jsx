// src/components/SocialProof.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Count-up hook — animates from 0 to target number
const useCountUp = (target, inView, duration = 1.5) => {
    const [count, setCount] = useState(0);
    const hasRun = useRef(false);

    useEffect(() => {
        if (!inView || hasRun.current) return;
        hasRun.current = true;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / (duration * 1000), 1);
            // ease-out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [inView, target, duration]);

    return count;
};

// Animated metric component
const AnimatedMetric = ({ value, label, icon, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    // Determine if value is numeric (like "8+") or text (like "IA/ML")
    const numericMatch = value.match(/^(\d+)(.*)$/);
    const numericTarget = numericMatch ? parseInt(numericMatch[1], 10) : null;
    const suffix = numericMatch ? numericMatch[2] : '';
    const animatedNumber = useCountUp(numericTarget ?? 0, isInView && numericTarget !== null);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, type: 'spring', stiffness: 120, damping: 18 }}
            className="text-center group"
        >
            <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">
                {icon}
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--cyan-neon)] mb-1 sm:mb-2 tabular-nums">
                {numericTarget !== null ? `${animatedNumber}${suffix}` : value}
            </div>
            <div className="text-sm text-[var(--text-secondary)]">
                {label}
            </div>
        </motion.div>
    );
};

const SocialProof = () => {
    const metrics = [
        { value: '8+', label: 'Años de Experiencia', icon: '🎯' },
        { value: 'IA/ML', label: 'Enfoque Actual', icon: '🤖' },
        { value: 'NetDevOps', label: 'Automatización', icon: '🔧' },
        { value: 'Full-Stack', label: 'Desarrollo', icon: '💻' }
    ];

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

                    {/* Metrics Bar — with count-up animation */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12">
                        {metrics.map((metric, index) => (
                            <AnimatedMetric key={index} {...metric} index={index} />
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
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06, type: 'spring', stiffness: 200 }}
                                whileHover={{ scale: 1.08, borderColor: 'rgba(0, 229, 255, 0.5)' }}
                                className="px-4 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full text-sm text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] transition-colors cursor-default"
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
