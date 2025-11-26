// src/components/Hero.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlitchText from './effects/GlitchText';
import useParallaxScroll from '../hooks/useParallaxScroll';

const Hero = () => {
  const [showHint, setShowHint] = useState(true);
  const { offset, blur, ref } = useParallaxScroll({ speed: 0.3, maxBlur: 2 });

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 2500);
    const onScroll = () => setShowHint(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <section id="top" className="relative w-full h-screen">
      {/* Overlay sutil para lectura con parallax */}
      <div
        ref={ref}
        className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black/20 via-black/10 to-transparent"
        style={{
          transform: `translateY(${offset}px)`,
          filter: `blur(${blur}px)`,
        }}
      />

      {/* Background con Mesh Gradient (Fase 3.5) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 229, 255, 0.12), transparent),
            radial-gradient(ellipse 60% 40% at 80% 50%, rgba(168, 85, 247, 0.08), transparent),
            radial-gradient(ellipse 50% 30% at 20% 70%, rgba(255, 107, 53, 0.06), transparent),
            #0A0A0A
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
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-5xl">
          {/* Badge / Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-[var(--cyan-neon)]/10 border border-[var(--cyan-neon)]/30 rounded-full text-[var(--cyan-neon)] text-sm font-bold tracking-wider uppercase">
              Mexican Tech Startup
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, type: 'spring', stiffness: 110 }}
          >
            <GlitchText
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-kainet-white mb-4"
              as="h1"
            >
              Construimos SaaS de Clase Mundial
            </GlitchText>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, type: 'spring', stiffness: 110 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-kainet-cyan mb-8"
          >
            para el Mercado Latino
          </motion.h2>

          {/* Subtitle / Value Prop */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Combinamos <span className="text-white font-semibold">gamificación extrema</span> con{' '}
            <span className="text-white font-semibold">accesibilidad universal</span>.
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
              className="group px-8 py-4 bg-[var(--cyan-neon)] text-[var(--gray-900)] rounded-lg font-bold text-lg shadow-lg shadow-[var(--cyan-neon)]/30 hover:shadow-[var(--cyan-neon)]/50 hover:scale-105 transition-all duration-300"
            >
              Explorar KAIDO
              <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#about"
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white rounded-lg font-bold text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              El Manifiesto
            </a>
          </motion.div>
        </div>

        {/* Hint de scroll (auto-ocultable) */}
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.4 }}
            className="absolute bottom-6 flex flex-col items-center text-gray-300 pointer-events-auto"
          >
            <span className="text-xs text-gray-300 mb-2">Scroll</span>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-7 h-11 rounded-full border border-gray-500 flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 rounded-full bg-gray-300" />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Fondo de partículas fluido (LiquidEther en MainLayout) */}

      {/* Solo contenido de texto, sin Canvas 3D */}
    </section>
  );
};

export default Hero;