// src/components/KainetResto.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../hoc/SectionWrapper';

// ---- Data de ejemplo (luego mover a un archivo separado) ----
const features = [
  {
    icon: '📊',
    title: 'Analytics en Tiempo Real',
    description: 'Dashboard completo con métricas de ventas, mesas activas y performance del equipo.',
  },
  {
    icon: '🍽️',
    title: 'Gestión de Mesas',
    description: 'Control visual de disponibilidad, reservas y tiempos de ocupación en tiempo real.',
  },
  {
    icon: '📦',
    title: 'Inventario Inteligente',
    description: 'Seguimiento automático de stock, alertas de reorden y análisis de costos.',
  },
  {
    icon: '🤖',
    title: 'IA Predictiva',
    description: 'Predicción de demanda basada en históricos, clima y eventos para optimizar compras.',
  },
  {
    icon: '💳',
    title: 'Pagos Integrados',
    description: 'Múltiples métodos de pago, división de cuentas y propinas automatizadas.',
  },
  {
    icon: '📱',
    title: 'App Móvil',
    description: 'Aplicación para meseros con toma de pedidos offline-first y sincronización.',
  },
];

const screenshots = [
  { id: 1, title: 'Dashboard Principal', src: 'https://placehold.co/1200x800/0a0a0a/00E5FF?text=Dashboard' },
  { id: 2, title: 'Gestión de Pedidos', src: 'https://placehold.co/1200x800/0a0a0a/00E5FF?text=Pedidos' },
  { id: 3, title: 'Control de Mesas', src: 'https://placehold.co/1200x800/0a0a0a/00E5FF?text=Mesas' },
  { id: 4, title: 'Reportes', src: 'https://placehold.co/1200x800/0a0a0a/00E5FF?text=Reportes' },
];

// ---- Animaciones ----
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ---- Componente de Feature Card ----
const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    variants={itemVariants}
    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6
               hover:bg-white/10 hover:border-[#00E5FF]/30 transition-all duration-300"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    
    {/* Glow effect on hover */}
    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#00E5FF]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

// ---- Componente Principal ----
const KainetResto = () => {
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* ===== HERO ===== */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-sm font-medium mb-4">
              🚀 Nuestro Producto Estrella
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Kainet <span className="text-[#00E5FF]">Resto</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Sistema de gestión integral para restaurantes. Optimiza operaciones,
              incrementa ventas y toma decisiones basadas en datos reales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowDemo(true)}
                className="btn-kainet px-8 py-3.5"
              >
                Ver Demo en Vivo
              </button>
              <a
                href="#contact"
                className="btn-kainet--outline px-8 py-3.5"
              >
                Solicitar Cotización
              </a>
            </div>
          </motion.div>
        </div>

        {/* ===== FEATURES GRID ===== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </motion.div>

        {/* ===== SCREENSHOTS SHOWCASE ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            Una mirada al <span className="text-[#00E5FF]">sistema</span>
          </h3>
          
          {/* Main Screenshot */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 mb-6">
            <img
              src={screenshots[activeScreenshot].src}
              alt={screenshots[activeScreenshot].title}
              className="w-full h-auto"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h4 className="text-white font-semibold text-lg">
                {screenshots[activeScreenshot].title}
              </h4>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {screenshots.map((screenshot, idx) => (
              <button
                key={screenshot.id}
                onClick={() => setActiveScreenshot(idx)}
                className={`relative rounded-lg overflow-hidden border-2 transition-all
                  ${activeScreenshot === idx 
                    ? 'border-[#00E5FF] scale-105' 
                    : 'border-white/10 hover:border-white/30'
                  }`}
              >
                <img
                  src={screenshot.src}
                  alt={screenshot.title}
                  className="w-full h-auto opacity-70 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* ===== STATS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { value: '50+', label: 'Restaurantes' },
            { value: '99.9%', label: 'Uptime' },
            { value: '10K+', label: 'Pedidos/día' },
            { value: '24/7', label: 'Soporte' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="text-4xl font-bold text-[#00E5FF] mb-2">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ===== CTA FINAL ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#00E5FF]/10 to-transparent p-12 text-center"
        >
          {/* Glow background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00E5FF]/20 rounded-full blur-3xl opacity-30" />
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para transformar tu restaurante?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Únete a decenas de restaurantes que ya optimizaron sus operaciones
              con Kainet Resto. Agenda una demo personalizada sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-kainet px-8 py-3.5">
                Agenda tu Demo
              </a>
              <a
                href="mailto:contacto@kainet.mx?subject=Consulta Kainet Resto"
                className="btn-kainet--outline px-8 py-3.5"
              >
                Contactar Ventas
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===== MODAL DE DEMO (opcional) ===== */}
      {showDemo && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowDemo(false)}
        >
          <div
            className="relative bg-black border border-white/10 rounded-2xl max-w-5xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-4 right-4 text-white hover:text-[#00E5FF] transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-4">Demo Interactiva</h3>
            
            {/* Aquí puedes poner un iframe, video o link */}
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">
                🎥 Aquí irá tu video demo o iframe de la app
              </p>
            </div>
            
            <p className="text-gray-300 mt-4 text-sm">
              💡 Tip: Puedes usar Loom, YouTube embed, o un iframe directo a tu app staging
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SectionWrapper(KainetResto, 'kainet-resto');
