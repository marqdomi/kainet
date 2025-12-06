import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../hoc/SectionWrapper';
import { SectionTitle } from './ui';
import GlitchText from './effects/GlitchText';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

const ProcessStep = ({ title, description, index }) => (
  <motion.div
    variants={fadeUp(0.1 + index * 0.15)}
    className="w-full p-6 rounded-2xl border border-gray-800 bg-gray-900/60
               hover:bg-gray-900/80 hover:border-gray-700 transition-colors"
  >
    <h3 className="text-white text-xl font-semibold">{title}</h3>
    <p className="mt-2 text-gray-400">{description}</p>
  </motion.div>
);

const About = () => {
  const steps = [
    { title: 'Investigación', description: 'Levantamiento de problemas, benchmarking técnico y definición de hipótesis.' },
    { title: 'Diseño de Solución', description: 'Arquitectura, modelos de datos y criterios de éxito medibles.' },
    { title: 'Prototipo Funcional', description: 'MVPs técnicamente sólidos para validar factibilidad y performance.' },
    { title: 'Validación', description: 'Pruebas controladas, métricas y aprendizaje para la siguiente iteración.' },
  ];

  return (
    <section>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp(0)}
          className="text-center"
        >
          <SectionTitle>Nuestro Proceso</SectionTitle>
          <div className="mt-6">
            <GlitchText className="text-3xl md:text-4xl font-bold text-white" as="h3">
              De la Idea a la Realidad
            </GlitchText>
          </div>
          <p className="mt-4 text-gray-400 max-w-3xl mx-auto text-balance">
            Creemos en la investigación profunda y el desarrollo iterativo. Nuestro trabajo se centra en explorar los límites de la IA para resolver problemas complejos, sentando las bases para aplicaciones robustas y escalables
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 md:mt-12 grid grid-cols-1 gap-6"
        >
          {steps.map((s, i) => (
            <ProcessStep key={s.title} index={i} {...s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(About, 'about');