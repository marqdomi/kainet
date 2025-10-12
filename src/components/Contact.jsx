// src/components/Contact.jsx
import React, { useState } from 'react';
import SectionWrapper from '../hoc/SectionWrapper';

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
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 flex flex-col items-center text-center">
              <img
                src="/logoletras.svg"
                alt="KAINET"
                className="h-16 w-auto mb-4"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold text-white">Pongamos manos a la obra</h3>
              <p className="mt-3 text-gray-300">
                En KAINET diseñamos prototipos robustos y experiencias sobrias centradas en
                la automatización inteligente.
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="flex">
            <form
              onSubmit={handleSubmit}
              className="relative w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8"
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
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-200">
                  Tu Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Marco Domínguez"
                  className="w-full rounded-lg bg-black/40 text-white placeholder:text-gray-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/60 px-4 py-3 transition"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-200">
                  Tu Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@correo.com"
                  className="w-full rounded-lg bg-black/40 text-white placeholder:text-gray-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/60 px-4 py-3 transition"
                />
              </div>

              {/* Asunto (opcional) */}
              <div className="mb-5">
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-200">
                  Asunto <span className="text-gray-500 font-normal">(opcional)</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Ej. Consulta sobre automatización"
                  className="w-full rounded-lg bg-black/40 text-white placeholder:text-gray-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/60 px-4 py-3 transition"
                />
              </div>

              {/* Mensaje */}
              <div className="mb-6">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-200">
                  Tu Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Cuéntanos brevemente sobre tu proyecto o idea…"
                  className="w-full rounded-lg bg-black/40 text-white placeholder:text-gray-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/60 px-4 py-3 transition resize-y"
                />
              </div>

              {/* Error */}
              {status === 'error' && (
                <p className="text-sm text-rose-400 mb-4">{errorMsg}</p>
              )}

              {/* Botón */}
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-kainet disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Enviando…' : 'Enviar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* MODAL de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-[#00E5FF]/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#00E5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">¡Mensaje enviado! ✓</h3>
            <p className="text-gray-300 mb-2">
              Gracias por escribirnos. Te responderemos pronto.
            </p>
            <p className="text-sm text-[#00E5FF] mb-6">
              contacto@kainet.mx
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="btn-kainet w-full"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SectionWrapper(Contact, 'contact');