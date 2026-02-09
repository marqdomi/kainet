// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import useParallaxScroll from '../hooks/useParallaxScroll';
import './Hero.css';

// Word-by-word stagger animation
const wordContainer = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: delay,
    },
  }),
};

const wordChild = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const AnimatedWords = ({ text, className, custom = 0, as: Tag = 'span' }) => (
  <Tag className={className}>
    <motion.span
      variants={wordContainer}
      initial="hidden"
      animate="visible"
      custom={custom}
      className="inline-flex flex-wrap justify-center gap-x-[0.3em]"
    >
      {text.split(' ').map((word, i) => (
        <motion.span key={i} variants={wordChild} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.span>
  </Tag>
);

const Hero = () => {
  const { offset, blur, ref } = useParallaxScroll({ speed: 0.3, maxBlur: 2 });

  return (
    <section id="top" className="relative w-full h-screen">
      {/* Overlay sutil para lectura con parallax */}
      <div
        ref={ref}
        className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black/10 via-black/5 to-transparent"
        style={{
          transform: `translateY(${offset}px)`,
          filter: `blur(${blur}px)`,
        }}
      />

      {/* Background con Mesh Gradient animado (aurora-style) */}
      <div className="absolute inset-0 z-0 hero-aurora">
        <div className="hero-aurora-blob hero-aurora-blob-1" />
        <div className="hero-aurora-blob hero-aurora-blob-2" />
        <div className="hero-aurora-blob hero-aurora-blob-3" />
      </div>

      {/* Subtle noise texture for depth */}
      <div
        className="absolute inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
      
      {/* Texto */}
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <div className="max-w-5xl relative">
          {/* Badge / Label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="hero-badge inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-black/30 backdrop-blur-md border border-[var(--cyan-neon)]/30 rounded-full text-[var(--cyan-neon)] text-xs sm:text-sm font-bold tracking-wider uppercase">
              <span className="hero-badge-dot" />
              Laboratorio de I+D Personal
            </span>
          </motion.div>

          {/* Main Headline - word-by-word reveal */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-kainet-white mb-4">
            <AnimatedWords text="Explorando la Frontera de la IA" custom={0.3} />
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 sm:mb-8">
            <AnimatedWords
              text="y la Automatización de Redes"
              className="hero-gradient-text"
              custom={0.7}
            />
          </h2>

          {/* Subtitle / Value Prop */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="text-base sm:text-lg md:text-xl text-body max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0"
          >
            Una iniciativa personal de I+D enfocada en{' '}
            <span className="text-heading font-semibold">arquitecturas inteligentes</span> y el desarrollo de{' '}
            <span className="text-heading font-semibold">plataformas educativas inclusivas</span>.
            Mi proyecto actual, <span className="text-[var(--cyan-neon)] font-bold">KAIDO</span>,
            está redefiniendo el aprendizaje corporativo.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
          >
            <a
              href="/proyectos"
              className="btn btn-lg btn-primary w-full sm:w-auto text-center group"
            >
              Ver Proyectos Técnicos
              <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="/servicios"
              className="btn btn-lg btn-secondary w-full sm:w-auto text-center"
            >
              Mi Stack Tecnológico
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-[0.2em]">Scroll</span>
        <div className="scroll-indicator">
          <div className="scroll-indicator-dot" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;