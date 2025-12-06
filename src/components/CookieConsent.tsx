// src/components/CookieConsent.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check, Settings } from 'lucide-react';
// @ts-expect-error - Button is a JS component
import { Button } from './ui';

const CONSENT_KEY = 'kainet-cookie-consent';
const CONSENT_VERSION = '1.0'; // Update when privacy policy changes

interface ConsentSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  version: string;
  timestamp: string;
}

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ConsentSettings>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    version: CONSENT_VERSION,
    timestamp: '',
  });

  useEffect(() => {
    // Check if user has already consented
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent) as ConsentSettings;
        // Check if consent version matches
        if (parsed.version === CONSENT_VERSION) {
          setSettings(parsed);
          return; // Don't show banner
        }
      } catch {
        // Invalid consent, show banner
      }
    }
    
    // Show banner after a short delay
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const saveConsent = (newSettings: ConsentSettings) => {
    const settingsWithMeta = {
      ...newSettings,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem(CONSENT_KEY, JSON.stringify(settingsWithMeta));
    setSettings(settingsWithMeta);
    setIsVisible(false);
    
    // Dispatch event for analytics tools
    window.dispatchEvent(new CustomEvent('cookieConsent', { 
      detail: settingsWithMeta 
    }));
  };

  const acceptAll = () => {
    saveConsent({
      ...settings,
      analytics: true,
      marketing: true,
    });
  };

  const acceptNecessary = () => {
    saveConsent({
      ...settings,
      analytics: false,
      marketing: false,
    });
  };

  const saveCustomSettings = () => {
    saveConsent(settings);
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="card-elevated backdrop-blur-xl border rounded-2xl p-5 sm:p-6 shadow-2xl cookie-banner">
              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-[var(--cyan-neon)] transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              {!showSettings ? (
                /* Main Banner */
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Icon & Text */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Cookie className="w-6 h-6 text-[var(--cyan-neon)]" />
                      <h3 className="text-lg font-semibold text-heading">
                        🍪 Tu privacidad es importante
                      </h3>
                    </div>
                    <p className="text-sm text-body leading-relaxed">
                      Usamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar contenido.
                      Al continuar navegando, aceptas nuestra{' '}
                      <a 
                        href="/privacidad" 
                        className="text-[var(--cyan-neon)] hover:underline"
                        target="_blank"
                      >
                        política de privacidad
                      </a>.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setShowSettings(true)}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-body hover:text-[var(--cyan-neon)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--cyan-neon)]/10 transition-all"
                    >
                      <Settings className="w-4 h-4" />
                      Configurar
                    </button>
                    <button
                      onClick={acceptNecessary}
                      className="px-4 py-2 text-sm text-body hover:text-[var(--cyan-neon)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--cyan-neon)]/10 transition-all"
                    >
                      Solo necesarias
                    </button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={acceptAll}
                      className="whitespace-nowrap"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Aceptar todo
                    </Button>
                  </div>
                </div>
              ) : (
                /* Settings Panel */
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => setShowSettings(false)}
                      className="p-1 text-muted hover:text-[var(--cyan-neon)] transition-colors"
                      aria-label="Volver"
                    >
                      ←
                    </button>
                    <h3 className="text-lg font-semibold text-heading">
                      Configuración de cookies
                    </h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Necessary Cookies */}
                    <div className="flex items-start justify-between p-4 bg-[var(--card-bg)] rounded-lg">
                      <div className="flex-1 mr-4">
                        <h4 className="text-heading font-medium mb-1">Cookies necesarias</h4>
                        <p className="text-sm text-muted">
                          Esenciales para el funcionamiento del sitio. No se pueden desactivar.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="px-3 py-1 text-xs bg-[var(--cyan-neon)]/20 text-[var(--cyan-neon)] rounded-full">
                          Siempre activas
                        </span>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-start justify-between p-4 bg-[var(--card-bg)] rounded-lg">
                      <div className="flex-1 mr-4">
                        <h4 className="text-heading font-medium mb-1" id="analytics-label">Cookies de análisis</h4>
                        <p className="text-sm text-muted">
                          Nos ayudan a entender cómo usas el sitio para mejorarlo.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.analytics}
                          onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
                          className="sr-only peer"
                          aria-labelledby="analytics-label"
                          title="Activar cookies de análisis"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--cyan-neon)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--cyan-neon)]"></div>
                      </label>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-start justify-between p-4 bg-[var(--card-bg)] rounded-lg">
                      <div className="flex-1 mr-4">
                        <h4 className="text-heading font-medium mb-1" id="marketing-label">Cookies de marketing</h4>
                        <p className="text-sm text-muted">
                          Permiten mostrarte contenido personalizado y ofertas relevantes.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.marketing}
                          onChange={(e) => setSettings({ ...settings, marketing: e.target.checked })}
                          className="sr-only peer"
                          aria-labelledby="marketing-label"
                          title="Activar cookies de marketing"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--cyan-neon)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--cyan-neon)]"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowSettings(false)}
                      className="px-4 py-2 text-sm text-body hover:text-[var(--cyan-neon)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--cyan-neon)]/10 transition-all"
                    >
                      Cancelar
                    </button>
                    <Button variant="primary" size="sm" onClick={saveCustomSettings}>
                      Guardar preferencias
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
