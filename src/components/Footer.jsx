// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/marcdomibe/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.98 0h3.83v2.2h.05c.53-1 1.82-2.2 3.75-2.2 4.01 0 4.75 2.64 4.75 6.07V24h-4v-6.9c0-1.64-.03-3.74-2.28-3.74-2.29 0-2.64 1.78-2.64 3.62V24h-4V8z" />
        </svg>
      ),
      label: 'Síguenos en LinkedIn'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/kainet.mx',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      label: 'Síguenos en Instagram'
    },
    // Preparado para el futuro:
    // {
    //   name: 'Facebook',
    //   url: 'https://facebook.com/kainet.mx',
    //   icon: (
    //     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    //       <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/>
    //     </svg>
    //   ),
    //   label: 'Síguenos en Facebook'
    // },
    // {
    //   name: 'TikTok',
    //   url: 'https://tiktok.com/@kainet.mx',
    //   icon: (
    //     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    //       <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    //     </svg>
    //   ),
    //   label: 'Síguenos en TikTok'
    // }
  ];

  return (
    <footer className="mt-16 md:mt-20 bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        {/* Footer Principal */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl card-default border backdrop-blur-md p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3 md:gap-8 items-start">
            {/* Columna 1: Logo + Descripción */}
            <div className="md:col-span-1 text-center md:text-left">
              <img
                src="/logo.svg"
                alt="KAINET"
                className="h-16 sm:h-20 w-auto mb-4 opacity-95 mx-auto md:mx-0"
                loading="lazy"
                decoding="async"
              />
              <p className="text-muted text-sm leading-relaxed">
                Prototipos robustos, visuales 3D y experiencias premium impulsadas por IA.
              </p>
            </div>

            {/* Columna 2: Contacto */}
            <div className="md:col-span-1 text-center md:text-left">
              <h3 className="text-heading font-semibold mb-4 text-lg">Contacto</h3>
              <div className="space-y-3 inline-flex flex-col items-center md:items-start">
                <a
                  href="mailto:contacto@kainet.mx"
                  className="flex items-center gap-2 text-muted hover:text-[var(--cyan-neon)] transition-colors text-sm group py-2 min-h-[44px]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="group-hover:underline">contacto@kainet.mx</span>
                </a>
                <div className="pt-2">
                  <a
                    href="/contact"
                    className="btn btn-sm btn-primary"
                  >
                    Enviar mensaje
                  </a>
                </div>
              </div>
            </div>

            {/* Columna 3: Redes Sociales */}
            <div className="md:col-span-1 text-center md:text-left">
              <h3 className="text-heading font-semibold mb-4 text-lg">Síguenos</h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center gap-2 px-4 py-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--cyan-neon)]/10 hover:border-[var(--cyan-neon)]/50 transition-all group min-h-[44px]"
                  >
                    <span className="text-muted group-hover:text-[var(--cyan-neon)] transition-colors">
                      {social.icon}
                    </span>
                    <span className="text-sm text-muted group-hover:text-heading transition-colors">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>

              {/* Nota para futuras redes */}
              <p className="text-xs text-muted mt-4">
                Próximamente en Facebook y TikTok
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 text-center">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} KAINET. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;