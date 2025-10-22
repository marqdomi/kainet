import React from 'react';
import { motion } from 'framer-motion';
import './TitleBackground.css';

/**
 * TitleBackground Component
 * 
 * Fondo animado para títulos de secciones
 * Usa gradientes y animaciones CSS para máximo rendimiento
 */
const TitleBackground = ({ children, className = '', animated = true }) => {
  return (
    <div className={`title-background-wrapper ${className}`}>
      {/* Fondo animado con gradientes */}
      <div className={`title-background-container ${animated ? 'animated' : ''}`}>
        <div className="title-gradient-blob blob-1"></div>
        <div className="title-gradient-blob blob-2"></div>
        <div className="title-gradient-blob blob-3"></div>
        
        {/* Grid de líneas para efecto cyberpunk */}
        <div className="title-grid"></div>
        
        {/* Contenido */}
        <motion.div 
          className="title-content relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default TitleBackground;
