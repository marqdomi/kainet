// src/components/Newsletter.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Card } from './ui';

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
      >
        <Card variant="featured" className="my-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              ¿Te gustó este artículo?
            </h3>
            <p className="text-[var(--text-secondary)]">
              Suscríbete a nuestro newsletter para recibir más contenido sobre IA, automatización y desarrollo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre (opcional)"
              disabled={status === 'sending' || status === 'success'}
            />
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com *"
                required
                disabled={status === 'sending' || status === 'success'}
                error={status === 'error' ? message : undefined}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                loading={status === 'sending'}
                variant="primary"
              >
                {status === 'success' ? '✓ Suscrito' : 'Suscribirse'}
              </Button>
            </div>

            {message && status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-center text-[var(--green-success)]"
              >
                {message}
              </motion.p>
            )}
          </form>
        </Card>
      </motion.div>
    );
  }

  // Variante por defecto para footer
  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          disabled={status === 'sending' || status === 'success'}
          error={status === 'error' ? message : undefined}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={status === 'sending' || status === 'success'}
          loading={status === 'sending'}
          variant="primary"
          className="whitespace-nowrap"
        >
          {status === 'success' ? '✓' : 'Suscribirse'}
        </Button>
      </form>

      {message && status === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-[var(--green-success)]"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default Newsletter;
