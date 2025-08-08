// src/components/Work.jsx
import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../hoc/SectionWrapper';

// ---- Datos de ejemplo (reemplázalos con tus proyectos reales) ----
const projects = [
  {
    name: 'Oráculo de Incidentes',
    description:
      'Asistente de IA que prioriza y sugiere remediaciones en tiempo real a partir de telemetría de red y logs.',
    image:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width=\"1600\" height=\"900\"><defs><linearGradient id=\"g\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop stop-color=\"%23000\"/><stop offset=\"1\" stop-color=\"%230a0a0a\"/></linearGradient></defs><rect width=\"100%\" height=\"100%\" fill=\"url(%23g)\"/><circle cx=\"200\" cy=\"200\" r=\"160\" fill=\"%2300E5FF\" fill-opacity=\"0.08\"/><text x=\"64\" y=\"120\" font-family=\"Arial\" font-size=\"64\" fill=\"%23EAEAEA\" fill-opacity=\"0.9\">KAINET</text></svg>',
    tags: ['React', 'IA', 'Framer Motion'],
  },
  {
    name: 'Panel 3D de Topología',
    description:
      'Visualizador interactivo en 3D para infra de red; nodos, enlaces y métricas con animaciones en tiempo real.',
    image:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width=\"1600\" height=\"900\"><rect width=\"100%\" height=\"100%\" fill=\"%23000000\"/><rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"%2300E5FF\" opacity=\"0.04\"/><text x=\"64\" y=\"120\" font-family=\"Arial\" font-size=\"64\" fill=\"%23EAEAEA\" fill-opacity=\"0.9\">TOPO 3D</text></svg>',
    tags: ['Three.js', 'R3F', 'Drei'],
  },
  {
    name: 'Pipeline de Datos',
    description:
      'Ingesta, limpieza y features para modelos de predicción de capacidad y latencia con dashboards.',
    image:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width=\"1600\" height=\"900\"><rect width=\"100%\" height=\"100%\" fill=\"%23000000\"/><path d=\"M0 780 Q 300 700, 600 780 T 1200 780 T 1600 780\" fill=\"none\" stroke=\"%2300E5FF\" stroke-opacity=\"0.35\" stroke-width=\"8\"/><text x=\"64\" y=\"120\" font-family=\"Arial\" font-size=\"64\" fill=\"%23EAEAEA\" fill-opacity=\"0.9\">DATA</text></svg>',
    tags: ['Vite', 'Tailwind', 'APIs'],
  },
];

// ---- Variantes de animación ----
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.12 },
  },
};

const card = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

// ---- Tarjeta de Proyecto ----
const ProjectCard = ({ image, name, description, tags }) => (
  <motion.article
    variants={card}
    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
  >
    {/* Imagen */}
    <div className="aspect-[16/9] overflow-hidden">
      <img
        src={image}
        alt={`Portada del proyecto ${name}`}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
      />
    </div>

    {/* Contenido */}
    <div className="p-5">
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-300">{description}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-200"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>

    {/* Borde cian sutil al hover */}
    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-[#00E5FF]/40" />
  </motion.article>
);

// ---- Sección Work ----
const Work = () => {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6">
        {/* Encabezado */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Nuestros <span className="text-[#00E5FF]">Proyectos</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-gray-300">
            Una selección de exploraciones técnicas y prototipos que construimos para
            llevar la automatización inteligente al siguiente nivel. Todo enfocado en
            performance, diseño minimalista y resultados medibles.
          </p>
        </div>

        {/* Rejilla de proyectos */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 md:mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(Work, 'work');