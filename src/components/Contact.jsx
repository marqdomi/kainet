// src/components/Contact.jsx
import React, { useState } from 'react';
import SectionWrapper from '../hoc/SectionWrapper';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Aquí iría tu lógica real (fetch/axios). Por ahora solo simulamos.
    setTimeout(() => {
      setSubmitting(false);
      // Limpiar formulario tras “enviar”
      setForm({ name: '', email: '', message: '' });
    }, 900);
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-6">
        {/* Cabecera */}
        <div className="mb-8 md:mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Hablemos<span className="text-[#00E5FF]"></span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            ¿Tienes una idea, un reto técnico o quieres colaborar? Cuéntanos brevemente tu
            objetivo y te responderemos pronto.
          </p>
        </div>

        {/* Layout 2 columnas en pantallas grandes */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Lado izquierdo: copy / info */}
          <div className="flex">
            <div
              className="
                relative w-full overflow-hidden rounded-2xl
                border border-white/10 bg-white/5 backdrop-blur-md
                p-8
              "
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
              <h3 className="text-xl font-semibold text-white">Pongamos manos a la obra</h3>
              <p className="mt-3 text-gray-300">
                En Kainet diseñamos prototipos robustos y experiencias sobrias centradas en
                la automatización inteligente. Escríbenos qué te gustaría construir o mejorar.
              </p>

              <ul className="mt-6 space-y-2 text-sm text-gray-300">
                <li>• Respuesta en 24–48 hrs hábiles</li>
                <li>• Enfoque: IA aplicada, automatización, visualización 3D</li>
                <li>• Diseño minimalista, performance y escalabilidad</li>
              </ul>
            </div>
          </div>

          {/* Lado derecho: formulario */}
          <div className="flex">
            <form
              onSubmit={handleSubmit}
              className="
                relative w-full rounded-2xl
                border border-white/10 bg-white/5 backdrop-blur-md
                p-8
              "
            >
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
                  className="
                    w-full rounded-lg
                    bg-black/40 text-white placeholder:text-gray-500
                    border border-white/10
                    focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/60 focus:border-[#00E5FF]
                    px-4 py-3 transition
                  "
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
                  className="
                    w-full rounded-lg
                    bg-black/40 text-white placeholder:text-gray-500
                    border border-white/10
                    focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/60 focus:border-[#00E5FF]
                    px-4 py-3 transition
                  "
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
                  className="
                    w-full rounded-lg
                    bg-black/40 text-white placeholder:text-gray-500
                    border border-white/10
                    focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/60 focus:border-[#00E5FF]
                    px-4 py-3 transition resize-y
                  "
                />
              </div>

              {/* Botón */}
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-kainet disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Enviando…' : 'Enviar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Contact, 'contact');