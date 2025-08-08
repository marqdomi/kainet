import { motion } from 'framer-motion';

// Esta es una función que "envuelve" a otros componentes para darles animación
const SectionWrapper = (Component, idName) => 
  function HOC() {
    return (
      <motion.section
        variants={{
          hidden: { opacity: 0, y: 100 },
          show: { 
            opacity: 1, 
            y: 0,
            transition: {
              type: 'spring',
              duration: 1.25,
              delay: 0.2,
            }
          }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-0 max-w-7xl mx-auto sm:px-16 px-6 py-8 md:py-12 lg:py-16 scroll-mt-28 lg:scroll-mt-36"
      >
        {/* Este span es un truco para poder navegar a la sección con links */}
        <span className="hash-span" id={idName}>&nbsp;</span>
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;