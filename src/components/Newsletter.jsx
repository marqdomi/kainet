// src/components/Newsletter.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 🚀 ACTUALIZADO: Usar nuestra propia API
const NEWSLETTER_ENDPOINT = '/api/newsletter';

const Newsletter = ({ variant = 'default' }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Por favor, ingresa un email válido');
      return;
    }

    setStatus('sending');
    setMessage('');

    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message || '¡Gracias! Revisa tu email para confirmar.');
        setEmail('');
        setName('');
        
        // Reset después de 6 segundos
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 6000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Algo salió mal. Por favor, intenta nuevamente.');
      }
    } catch (err) {
      console.error('Error submitting newsletter:', err);
      setStatus('error');
      setMessage('Error de conexión. Intenta más tarde.');
    }
  };

  // Variante compacta para blog post
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-cyan-400/10 via-gray-900/50 to-blue-500/10 border-2 border-cyan-400/30 rounded-2xl p-8 my-8"
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">
            ¿Te gustó este artículo?
          </h3>
          <p className="text-gray-300">
            Suscríbete a nuestro newsletter para recibir más contenido sobre IA, automatización y desarrollo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre (opcional)"
            disabled={status === 'sending' || status === 'success'}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
          />
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com *"
              required
              disabled={status === 'sending' || status === 'success'}
              className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? '⏳ Enviando...' : status === 'success' ? '✓ Suscrito' : 'Suscribirse'}
            </button>
          </div>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm text-center ${
                status === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message}
            </motion.p>
          )}
        </form>
      </motion.div>
    );
  }

  // Variante por defecto (para footer o secciones standalone)
  return (
    <div className="bg-gradient-to-br from-cyan-400/5 via-transparent to-blue-500/5 border border-cyan-400/20 rounded-xl p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">
            Newsletter Semanal
          </h3>
          <p className="text-gray-400 text-sm">
            Análisis curado de IA empresarial, MLOps y automatización
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 max-w-md w-full">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              disabled={status === 'sending' || status === 'success'}
              className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className="px-4 py-2 bg-cyan-400 text-gray-900 font-semibold rounded-lg hover:bg-cyan-300 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === 'sending' ? '⏳' : status === 'success' ? '✓' : 'Suscribirse'}
            </button>
          </div>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-2 text-xs ${
                status === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message}
            </motion.p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
