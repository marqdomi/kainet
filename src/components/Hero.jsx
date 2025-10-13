// src/components/Hero.jsx
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import Logo3D from './Logo3D';
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

      {/* Texto */}
      <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, type: 'spring', stiffness: 110 }}
            className="text-5xl md:text-7xl font-bold leading-tight text-kainet-white"
          >
            Construyendo el Futuro
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, type: 'spring', stiffness: 110 }}
            className="text-5xl md:text-7xl font-bold leading-tight text-kainet-cyan"
          >
            de la Automatización
          </motion.h1>
        </div>

        {/* Hint de scroll (auto-ocultable) */}
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.0 }}
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

      {/* Canvas 3D de fondo (render continuo) */}
      <Canvas camera={{ position: [0, 0, 8] }} className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Logo3D />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Hero;