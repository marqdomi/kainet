// src/components/Contact.jsx
import React, { useState } from 'react';
import SectionWrapper from '../hoc/SectionWrapper';
import { Button, Input, Card } from './ui';

// 🚀 ACTUALIZADO: Usar nuestra propia API
const CONTACT_ENDPOINT = '/api/contact';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', company: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    // Honeypot anti-spam
    if (form.company.trim()) {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '', company: '' });
      setShowModal(true);
      return;
    }

    // Validaciones adicionales
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setErrorMsg('Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim() || undefined,
          message: form.message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '', company: '' });
        setShowModal(true);
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'No se pudo enviar el mensaje. Intenta más tarde.');
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setStatus('error');
      setErrorMsg('Ocurrió un error de red. Intenta más tarde.');
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-6">
        {/* Cabecera */}
        <div className="mb-8 md:mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Hablemos<span className="text-[#00E5FF]">.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            ¿Tienes una idea, un reto técnico o quieres colaborar? Cuéntanos brevemente tu
            objetivo y te responderemos pronto.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Lado izquierdo */}
          <div className="flex">
            <Card variant="glass" className="w-full">
              <div className="flex flex-col items-center text-center">
                <img
                  src="/logoletras.svg"
                  alt="KAINET"
                  className="h-16 w-auto mb-4"
                  loading="lazy"
                />
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">Pongamos manos a la obra</h3>
                <p className="mt-3 text-[var(--text-secondary)]">
                  En KAINET diseñamos prototipos robustos y experiencias sobrias centradas en
                  la automatización inteligente.
                </p>
              </div>
            </Card>
          </div>

          {/* Formulario */}
          <div className="flex">
            <Card variant="glass" className="w-full">
              <form
                onSubmit={handleSubmit}
                noValidate
              >
              {/* Honeypot */}
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Nombre */}
              <div className="mb-5">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  label="Tu Nombre"
                  placeholder="Ej. Marco Domínguez"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  label="Tu Email"
                  placeholder="tu@correo.com"
                />
              </div>

              {/* Asunto (opcional) */}
              <div className="mb-5">
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  label="Asunto"
                  helperText="(opcional)"
                  placeholder="Ej. Consulta sobre automatización"
                />
              </div>

              {/* Mensaje */}
              <div className="mb-6">
                <Input
                  id="message"
                  name="message"
                  type="textarea"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  label="Tu Mensaje"
                  placeholder="Cuéntanos brevemente sobre tu proyecto o idea…"
                  error={status === 'error' ? errorMsg : undefined}
                />
              </div>

              {/* Botón */}
              <div className="flex items-center justify-end">
                <Button
                  type="submit"
                  disabled={status === 'sending'}
                  loading={status === 'sending'}
                  variant="primary"
                >
                  Enviar
                </Button>
              </div>
              </form>
            </Card>
          </div>
        </div>
      </div>

      {/* MODAL de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <Card className="max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[var(--cyan-neon)]/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[var(--cyan-neon)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">¡Mensaje enviado! ✓</h3>
              <p className="text-[var(--text-secondary)] mb-2">
                Gracias por escribirnos. Te responderemos pronto.
              </p>
              <p className="text-sm text-[var(--cyan-neon)] mb-6">
                contacto@kainet.mx
              </p>
              <Button
                onClick={() => setShowModal(false)}
                variant="primary"
                className="w-full"
              >
                Cerrar
              </Button>
            </div>
          </Card>
        </div>
      )}
    </section>
  );
};

export default SectionWrapper(Contact, 'contact');