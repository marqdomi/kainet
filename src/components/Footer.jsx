// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-16 md:mt-20 bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className="
            relative overflow-hidden rounded-3xl
            border border-white/10 bg-black/50 backdrop-blur-md
            p-6 md:p-8
          "
        >
          {/* Glow sutil */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#00E5FF]/8 blur-3xl"
          />

          {/* Contenido principal */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Logo + texto */}
            <div className="flex items-center gap-5 min-w-0">
              <img
                src="/logo.svg"
                alt="KAINET"
                className="h-16 md:h-20 w-auto opacity-95"
                loading="lazy"
                decoding="async"
              />
              <div className="hidden md:block">
                <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight">
                  Construyamos algo serio
                </h3>
                <p className="text-gray-400 mt-1.5 leading-relaxed">
                  Prototipos robustos, visuales 3D y experiencias premium impulsadas por IA.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 md:self-center">
              <a href="mailto:contacto@kainet.mx" className="btn-kainet">
                Escríbeme
              </a>
              <a
                href="https://www.linkedin.com/in/marcdomibe/"
                target="_blank"
                rel="me noopener noreferrer"
                className="btn-kainet--outline"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Texto visible en mobile */}
          <div className="mt-4 md:hidden">
            <h3 className="text-lg font-semibold text-white">
              Construyamos algo serio
            </h3>
            <p className="text-gray-400 mt-1">
              Prototipos robustos, visuales 3D y experiencias premium impulsadas por IA.
            </p>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="py-6 border-t border-white/10 mt-6 text-xs text-gray-500">
          © {new Date().getFullYear()} KAINET. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;