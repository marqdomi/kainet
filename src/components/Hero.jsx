// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import useParallaxScroll from '../hooks/useParallaxScroll';

const Hero = () => {
  console.log('[Hero] Component rendering');
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

      {/* Background con Mesh Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 229, 255, 0.08), transparent),
            radial-gradient(ellipse 60% 40% at 80% 50%, rgba(168, 85, 247, 0.05), transparent),
            radial-gradient(ellipse 50% 30% at 20% 70%, rgba(255, 107, 53, 0.04), transparent)
          `
        }}
      />

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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-black/30 backdrop-blur-md border border-[var(--cyan-neon)]/30 rounded-full text-[var(--cyan-neon)] text-xs sm:text-sm font-bold tracking-wider uppercase">
              Mexican Tech Startup
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, type: 'spring', stiffness: 110 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-kainet-white mb-4"
          >
            Construimos SaaS de Clase Mundial
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, type: 'spring', stiffness: 110 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-kainet-cyan mb-6 sm:mb-8"
          >
            para el Mercado Latino
          </motion.h2>

          {/* Subtitle / Value Prop */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-base sm:text-lg md:text-xl text-body max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0"
          >
            Combinamos <span className="text-heading font-semibold">gamificación extrema</span> con{' '}
            <span className="text-heading font-semibold">accesibilidad universal</span>.
            Nuestro producto insignia, <span className="text-[var(--cyan-neon)] font-bold">KAIDO</span>,
            está transformando el aprendizaje corporativo.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
          >
            <a
              href="/kaido"
              className="btn btn-lg btn-primary w-full sm:w-auto text-center group"
            >
              Explorar KAIDO
              <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#about"
              className="btn btn-lg btn-secondary w-full sm:w-auto text-center"
            >
              El Manifiesto
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;