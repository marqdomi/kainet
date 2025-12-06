// src/pages/PrivacyPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, Card } from '../components/ui';
import SEO from '../components/SEO';
import { Shield, Eye, Lock, Database, Cookie, Mail, FileText } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  const lastUpdated = '6 de diciembre de 2025';

  return (
    <>
      <SEO
        title="Política de Privacidad - KAINET"
        description="Conoce cómo KAINET recopila, usa y protege tu información personal. Transparencia y seguridad en el manejo de tus datos."
        url="https://kainet.mx/privacidad"
      />

      <div className="min-h-screen pt-20 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <SectionTitle>Privacidad</SectionTitle>
            <h1 className="text-4xl md:text-5xl font-bold text-heading mt-4 mb-4">
              Política de Privacidad
            </h1>
            <p className="text-muted">
              Última actualización: {lastUpdated}
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card variant="default" padding="lg" className="mb-8">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-[var(--cyan-neon)] flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-heading mb-3">
                    Nuestro Compromiso
                  </h2>
                  <p className="text-body leading-relaxed">
                    En KAINET, respetamos y protegemos tu privacidad. Esta política describe cómo 
                    recopilamos, usamos, almacenamos y protegemos tu información personal cuando 
                    visitas nuestro sitio web o utilizas nuestros servicios.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Sections */}
          <div className="space-y-6">
            {/* Information We Collect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card variant="default" padding="lg">
                <div className="flex items-start gap-4">
                  <Database className="w-6 h-6 text-[var(--cyan-neon)] flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold text-heading mb-4">
                      1. Información que Recopilamos
                    </h2>
                    <div className="space-y-4 text-body">
                      <div>
                        <h3 className="font-medium text-heading mb-2">Información proporcionada voluntariamente:</h3>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Nombre y correo electrónico (al suscribirte al newsletter)</li>
                          <li>Información de contacto (al enviar un mensaje)</li>
                          <li>Datos de empresa (al solicitar nuestros servicios)</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium text-heading mb-2">Información recopilada automáticamente:</h3>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Dirección IP y ubicación aproximada</li>
                          <li>Tipo de navegador y dispositivo</li>
                          <li>Páginas visitadas y tiempo de permanencia</li>
                          <li>Fuente de referencia (cómo llegaste a nosotros)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* How We Use Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card variant="default" padding="lg">
                <div className="flex items-start gap-4">
                  <Eye className="w-6 h-6 text-[var(--cyan-neon)] flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold text-heading mb-4">
                      2. Cómo Usamos tu Información
                    </h2>
                    <ul className="space-y-3 text-body">
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--cyan-neon)]">•</span>
                        <span>Responder a tus consultas y solicitudes de información</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--cyan-neon)]">•</span>
                        <span>Enviarte nuestro newsletter (solo si te suscribes)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--cyan-neon)]">•</span>
                        <span>Mejorar la experiencia de usuario en nuestro sitio</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--cyan-neon)]">•</span>
                        <span>Analizar patrones de uso para optimizar nuestros servicios</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--cyan-neon)]">•</span>
                        <span>Cumplir con obligaciones legales aplicables</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card variant="default" padding="lg">
                <div className="flex items-start gap-4">
                  <Cookie className="w-6 h-6 text-[var(--cyan-neon)] flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold text-heading mb-4">
                      3. Cookies y Tecnologías Similares
                    </h2>
                    <div className="space-y-4 text-body">
                      <p>
                        Utilizamos cookies para mejorar tu experiencia de navegación. Las cookies son 
                        pequeños archivos de texto que se almacenan en tu dispositivo.
                      </p>
                      <div>
                        <h3 className="font-medium text-heading mb-2">Tipos de cookies que usamos:</h3>
                        <ul className="space-y-2 ml-2">
                          <li>
                            <strong className="text-heading">Necesarias:</strong> Esenciales para el funcionamiento 
                            del sitio (preferencias de tema, sesión).
                          </li>
                          <li>
                            <strong className="text-heading">Analíticas:</strong> Nos ayudan a entender cómo 
                            interactúas con el sitio (Google Analytics, si aplica).
                          </li>
                          <li>
                            <strong className="text-heading">Marketing:</strong> Permiten mostrarte contenido 
                            personalizado (solo con tu consentimiento explícito).
                          </li>
                        </ul>
                      </div>
                      <p>
                        Puedes gestionar tus preferencias de cookies en cualquier momento usando el 
                        banner de cookies que aparece en la parte inferior del sitio.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Data Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card variant="default" padding="lg">
                <div className="flex items-start gap-4">
                  <Lock className="w-6 h-6 text-[var(--cyan-neon)] flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold text-heading mb-4">
                      4. Seguridad de tus Datos
                    </h2>
                    <div className="space-y-3 text-body">
                      <p>
                        Implementamos medidas de seguridad técnicas y organizativas para proteger 
                        tu información personal:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Conexiones cifradas (HTTPS/TLS)</li>
                        <li>Acceso restringido a datos personales</li>
                        <li>Almacenamiento seguro en proveedores certificados</li>
                        <li>Monitoreo continuo de posibles vulnerabilidades</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card variant="featured" padding="lg">
                <div className="flex items-start gap-4">
                  <FileText className="w-6 h-6 text-[var(--cyan-neon)] flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold text-heading mb-4">
                      5. Tus Derechos
                    </h2>
                    <div className="space-y-3 text-body">
                      <p>Tienes derecho a:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-[var(--cyan-neon)] font-bold">→</span>
                          <span><strong className="text-heading">Acceso:</strong> Solicitar una copia de tus datos personales</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[var(--cyan-neon)] font-bold">→</span>
                          <span><strong className="text-heading">Rectificación:</strong> Corregir datos inexactos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[var(--cyan-neon)] font-bold">→</span>
                          <span><strong className="text-heading">Eliminación:</strong> Solicitar que eliminemos tus datos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[var(--cyan-neon)] font-bold">→</span>
                          <span><strong className="text-heading">Portabilidad:</strong> Recibir tus datos en formato estructurado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[var(--cyan-neon)] font-bold">→</span>
                          <span><strong className="text-heading">Oposición:</strong> Oponerte al procesamiento de tus datos</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card variant="default" padding="lg">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[var(--cyan-neon)] flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold text-heading mb-4">
                      6. Contacto
                    </h2>
                    <div className="space-y-3 text-body">
                      <p>
                        Si tienes preguntas sobre esta política de privacidad o deseas ejercer 
                        tus derechos, contáctanos:
                      </p>
                      <div className="bg-[var(--card-bg)] rounded-lg p-4 border border-[var(--border-color)]">
                        <p className="font-medium text-heading">KAINET</p>
                        <p>Email: <a href="mailto:privacidad@kainet.mx" className="text-[var(--cyan-neon)] hover:underline">privacidad@kainet.mx</a></p>
                        <p>Sitio web: <a href="https://kainet.mx" className="text-[var(--cyan-neon)] hover:underline">kainet.mx</a></p>
                      </div>
                      <p className="text-sm text-muted">
                        Responderemos a tu solicitud en un plazo máximo de 30 días hábiles.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Changes to Policy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center text-muted text-sm"
            >
              <p>
                Nos reservamos el derecho de actualizar esta política de privacidad. 
                Te notificaremos de cambios significativos a través de nuestro sitio web o por email.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
