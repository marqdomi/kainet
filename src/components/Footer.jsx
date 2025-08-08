// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-16 md:mt-20 pb-10 border-t border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-8 md:py-10 grid gap-6 md:grid-cols-2 items-center">
        <div>
          <img src="/logo.svg" alt="KAINET" className="h-10 w-auto mb-3 opacity-90" loading="lazy" />
          <h3 className="text-xl font-semibold text-white">Construyamos algo serio</h3>
          <p className="text-gray-400 mt-2">
            Prototipos robustos, visuales 3D y experiencias premium impulsadas por IA
          </p>
        </div>
        <div className="flex items-center gap-3 md:justify-end">
          <a
            href="mailto:contacto@kainet.dev"
            className="btn-kainet"
          >
            Escríbeme
          </a>
          <a
            href="https://www.linkedin.com/in/marcdomibe/"
            target="_blank" rel="me noopener noreferrer"
            className="btn-kainet--outline"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 text-xs text-gray-500">
        © {new Date().getFullYear()} KAINET. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;