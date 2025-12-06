// src/components/Contact.jsx
import React, { useState } from 'react';
import SectionWrapper from '../hoc/SectionWrapper';
import { Button, Input, SectionTitle, Card } from './ui';
import { Mail, MapPin, Clock, Send, Check } from 'lucide-react';

const CONTACT_ENDPOINT = '/api/contact';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', company: '' });
  const [status, setStatus] = useState('idle');
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

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contacto@kainet.mx',
      link: 'mailto:contacto@kainet.mx'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      value: 'Ciudad de México',
      link: null
    },
    {
      icon: Clock,
      title: 'Respuesta',
      value: '< 24 horas',
      link: null
    }
  ];

  return (
    <section>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Hero Section */}
        <div className="text-center mb-10 md:mb-14">
          <SectionTitle>Hablemos</SectionTitle>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-heading mt-4 mb-4">
            ¿Tienes un proyecto en mente?
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Cuéntanos tu idea o reto técnico. Nuestro equipo te responderá en menos de 24 horas para explorar cómo podemos ayudarte.
          </p>
        </div>

        {/* Centered Form Card */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card variant="default" padding="lg">
            <form onSubmit={handleSubmit} noValidate>
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

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
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

              {/* Subject */}
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

              {/* Message */}
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

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={status === 'sending'}
                loading={status === 'sending'}
                variant="primary"
                className="w-full sm:w-auto"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensaje
              </Button>
            </form>
          </Card>
        </div>

        {/* Contact Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl card-subtle border hover:border-[var(--cyan-neon)]/30 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--cyan-neon)]/10 flex items-center justify-center">
                <info.icon className="w-5 h-5 text-[var(--cyan-neon)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">{info.title}</p>
                {info.link ? (
                  <a href={info.link} className="text-heading hover:text-[var(--cyan-neon)] transition-colors font-medium">
                    {info.value}
                  </a>
                ) : (
                  <p className="text-heading font-medium">{info.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn p-4">
          <Card variant="default" className="max-w-sm w-full">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[var(--cyan-neon)]/20 flex items-center justify-center">
                  <Check className="w-8 h-8 text-[var(--cyan-neon)]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">¡Mensaje enviado!</h3>
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