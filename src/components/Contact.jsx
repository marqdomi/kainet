// src/components/Contact.jsx
import React, { useEffect, useRef, useState } from 'react';
import SectionWrapper from '../hoc/SectionWrapper';
import { Button, Input, SectionTitle, Card } from './ui';
import { Mail, MapPin, Clock, Send, Check, Linkedin } from 'lucide-react';

const CONTACT_ENDPOINT = '/api/contact';
const LINKEDIN_URL = 'https://www.linkedin.com/in/marcdomibe/';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialForm = { name: '', email: '', subject: '', message: '', company: '' };

const validateForm = (form) => {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = 'Por favor escribe tu nombre';
  }

  if (!form.email.trim()) {
    errors.email = 'Por favor escribe tu email';
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Por favor proporciona un email válido';
  }

  if (!form.message.trim()) {
    errors.message = 'Por favor escribe tu mensaje';
  } else if (form.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres';
  }

  return errors;
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const modalRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  useEffect(() => {
    let active = true;

    const fetchCsrfToken = async () => {
      try {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          credentials: 'same-origin',
        });

        if (!res.ok) return;

        const data = await res.json();
        if (active && data?.csrfToken) {
          setCsrfToken(data.csrfToken);
        }
      } catch (error) {
        console.warn('No se pudo obtener CSRF token:', error);
      }
    };

    fetchCsrfToken();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!showModal) return;

    previousActiveElementRef.current = document.activeElement;

    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    const focusFirstElement = () => {
      const focusableElements = modalRef.current?.querySelectorAll(focusableSelector);
      if (focusableElements?.length) {
        focusableElements[0].focus();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowModal(false);
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = modalRef.current?.querySelectorAll(focusableSelector);
      if (!focusableElements || focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    setTimeout(focusFirstElement, 0);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousActiveElementRef.current?.focus?.();
    };
  }, [showModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }

    if (errorMsg) {
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    setFieldErrors({});

    // Honeypot anti-spam
    if (form.company.trim()) {
      setStatus('success');
      setForm(initialForm);
      setShowModal(true);
      return;
    }

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setStatus('error');
      setFieldErrors(validationErrors);
      setErrorMsg('Revisa los campos marcados en rojo.');
      return;
    }

    if (!csrfToken) {
      setStatus('error');
      setErrorMsg('No se pudo validar la solicitud. Recarga la página e intenta de nuevo.');
      return;
    }

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
          'X-Requested-With': 'fetch'
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim() || undefined,
          message: form.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus('success');
        setForm(initialForm);
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
          <SectionTitle>Conectar</SectionTitle>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-heading mt-4 mb-4">
            ¿Interesado en mi perfil?
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Si tienes preguntas sobre mis proyectos de I+D o quieres conectar profesionalmente, 
            puedes escribirme directamente o conectar en LinkedIn.
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              as="a"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              Conectar en LinkedIn
            </Button>
          </div>
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
                  error={fieldErrors.name}
                  autoComplete="name"
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
                  error={fieldErrors.email}
                  autoComplete="email"
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
                  autoComplete="off"
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
                  error={fieldErrors.message}
                />
              </div>

              {status === 'error' && errorMsg && (
                <p className="mb-4 text-sm text-[var(--red-error)]" role="alert">
                  {errorMsg}
                </p>
              )}

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
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn p-4"
          onClick={() => setShowModal(false)}
        >
          <Card variant="default" className="max-w-sm w-full" padding="default">
            <div
              ref={modalRef}
              className="text-center"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-success-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[var(--cyan-neon)]/20 flex items-center justify-center">
                  <Check className="w-8 h-8 text-[var(--cyan-neon)]" />
                </div>
              </div>
              <h3 id="contact-success-title" className="text-xl font-semibold text-[var(--text-primary)] mb-2">¡Mensaje enviado!</h3>
              <p className="text-[var(--text-secondary)] mb-2">
                Gracias por escribirme. Te responderé pronto.
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