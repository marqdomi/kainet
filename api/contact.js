// api/contact.js
// Vercel Serverless Function para manejar formulario de contacto

const { Resend } = require('resend');
const crypto = require('crypto');

const resend = new Resend(process.env.RESEND_API_KEY);
const CSRF_SECRET = process.env.CSRF_SECRET || process.env.RESEND_API_KEY || 'kainet-dev-csrf-secret';
const CSRF_TTL_MS = 1000 * 60 * 60 * 2; // 2 horas
const RATE_LIMIT_WINDOW_MS = 1000 * 60 * 10; // 10 minutos
const RATE_LIMIT_MAX_REQUESTS = 5;

const globalRef = globalThis;
if (!globalRef.__contactRateLimiterStore) {
  globalRef.__contactRateLimiterStore = new Map();
}
const rateLimiterStore = globalRef.__contactRateLimiterStore;

// Función de validación de email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }

  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
};

const isRateLimited = (ip) => {
  const now = Date.now();
  const timestamps = rateLimiterStore.get(ip) || [];
  const recent = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterMs = RATE_LIMIT_WINDOW_MS - (now - recent[0]);
    rateLimiterStore.set(ip, recent);
    return { limited: true, retryAfterMs };
  }

  recent.push(now);
  rateLimiterStore.set(ip, recent);
  return { limited: false, retryAfterMs: 0 };
};

const signCsrfPayload = (payload) => {
  return crypto.createHmac('sha256', CSRF_SECRET).update(payload).digest('hex');
};

const generateCsrfToken = () => {
  const timestamp = String(Date.now());
  const nonce = crypto.randomBytes(16).toString('hex');
  const payload = `${timestamp}.${nonce}`;
  const signature = signCsrfPayload(payload);
  return `${payload}.${signature}`;
};

const verifyCsrfToken = (token) => {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [timestamp, nonce, signature] = parts;
  if (!timestamp || !nonce || !signature) return false;

  const issuedAt = Number(timestamp);
  if (!Number.isFinite(issuedAt)) return false;
  if (Date.now() - issuedAt > CSRF_TTL_MS) return false;

  const payload = `${timestamp}.${nonce}`;
  const expectedSignature = signCsrfPayload(payload);

  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch {
    return false;
  }
};

module.exports = async function handler(req, res) {
  // Configurar CORS headers - restringido a kainet.mx
  const allowedOrigins = [
    'https://kainet.mx',
    'https://www.kainet.mx',
    'http://localhost:3000', // Para desarrollo local
    'http://localhost:5173'
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, X-CSRF-Token, X-Requested-With'
  );

  // Manejar preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Entregar token CSRF para clientes same-origin
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      csrfToken: generateCsrfToken()
    });
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método no permitido',
      message: 'Solo se permite GET y POST'
    });
  }

  // Protección CSRF / cross-site básica
  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({
      error: 'Origen no permitido',
      message: 'Solicitud bloqueada por política de seguridad'
    });
  }

  const referer = req.headers.referer || '';
  if (referer && !allowedOrigins.some((allowedOrigin) => referer.startsWith(allowedOrigin))) {
    return res.status(403).json({
      error: 'Referer no permitido',
      message: 'Solicitud bloqueada por política de seguridad'
    });
  }

  const fetchSite = req.headers['sec-fetch-site'];
  if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) {
    return res.status(403).json({
      error: 'Contexto de navegación inválido',
      message: 'Solicitud bloqueada por política CSRF'
    });
  }

  const csrfToken = req.headers['x-csrf-token'];
  if (!verifyCsrfToken(csrfToken)) {
    return res.status(403).json({
      error: 'Token CSRF inválido',
      message: 'No se pudo validar la solicitud'
    });
  }

  const requestedWith = req.headers['x-requested-with'];
  if (requestedWith !== 'fetch') {
    return res.status(403).json({
      error: 'Header requerido ausente',
      message: 'Solicitud rechazada por seguridad'
    });
  }

  const clientIp = getClientIp(req);
  const rateLimitCheck = isRateLimited(clientIp);
  if (rateLimitCheck.limited) {
    const retryAfter = Math.ceil(rateLimitCheck.retryAfterMs / 1000);
    res.setHeader('Retry-After', String(retryAfter));
    return res.status(429).json({
      error: 'Demasiadas solicitudes',
      message: `Has excedido el límite de intentos. Intenta nuevamente en ${retryAfter} segundos.`
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, email, subject, message } = body || {};

    const cleanName = String(name || '').trim();
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanSubject = String(subject || '').trim();
    const cleanMessage = String(message || '').trim();

    // Validaciones
    if (!cleanName || !cleanEmail || !cleanMessage) {
      return res.status(400).json({
        error: 'Campos requeridos',
        message: 'Por favor completa todos los campos obligatorios'
      });
    }

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({
        error: 'Email inválido',
        message: 'Por favor proporciona un email válido'
      });
    }

    if (cleanMessage.length < 10) {
      return res.status(400).json({
        error: 'Mensaje muy corto',
        message: 'Por favor proporciona más detalles en tu mensaje (mínimo 10 caracteres)'
      });
    }

    if (cleanName.length > 120 || cleanSubject.length > 180 || cleanMessage.length > 5000) {
      return res.status(400).json({
        error: 'Campos inválidos',
        message: 'Uno o más campos exceden la longitud permitida'
      });
    }

    const finalSubject = cleanSubject || 'Nuevo mensaje de contacto';
    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeSubject = escapeHtml(cleanSubject);
    const safeMessage = escapeHtml(cleanMessage);

    // 1. Enviar email a contacto@kainet.mx (TU EMAIL)
    const { data: contactData, error: contactError } = await resend.emails.send({
      from: `Kainet Contacto <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_CONTACT,
      replyTo: cleanEmail, // Para que puedas responder directamente
      subject: `📬 ${finalSubject}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nuevo mensaje de contacto</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #00E5FF 0%, #0099CC 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0;">
                📬 Nuevo Mensaje de Contacto
              </h1>
            </div>

            <!-- Contenido -->
            <div style="padding: 30px;">
              
              <!-- Info del remitente -->
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="font-size: 18px; color: #333; margin: 0 0 15px 0;">Información del contacto:</h2>
                <p style="margin: 10px 0; color: #555; font-size: 14px;">
                  <strong>Nombre:</strong> ${safeName}
                </p>
                <p style="margin: 10px 0; color: #555; font-size: 14px;">
                  <strong>Email:</strong> 
                  <a href="mailto:${cleanEmail}" style="color: #00E5FF; text-decoration: none;">
                    ${safeEmail}
                  </a>
                </p>
                ${cleanSubject ? `
                  <p style="margin: 10px 0; color: #555; font-size: 14px;">
                    <strong>Asunto:</strong> ${safeSubject}
                  </p>
                ` : ''}
                <p style="margin: 10px 0; color: #555; font-size: 14px;">
                  <strong>Fecha:</strong> ${new Date().toLocaleString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
                </p>
              </div>

              <!-- Mensaje -->
              <div style="background-color: #ffffff; border-left: 4px solid #00E5FF; padding: 20px; margin-bottom: 20px;">
                <h3 style="font-size: 16px; color: #333; margin: 0 0 15px 0;">Mensaje:</h3>
                <div style="color: #333; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
${safeMessage}
                </div>
              </div>

              <!-- Botón de respuesta rápida -->
              <div style="text-align: center; margin-top: 30px;">
                 <a href="mailto:${cleanEmail}?subject=Re: ${encodeURIComponent(finalSubject)}" 
                   style="display: inline-block; background-color: #00E5FF; color: #0a0a0a; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">
                  Responder a ${safeName}
                </a>
              </div>

            </div>

            <!-- Footer -->
            <div style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="font-size: 12px; color: #666; margin: 0;">
                Este mensaje fue enviado desde el formulario de contacto en kainet.mx
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
      text: `
Nuevo Mensaje de Contacto

Información del contacto:
    - Nombre: ${cleanName}
    - Email: ${cleanEmail}
    ${cleanSubject ? `- Asunto: ${cleanSubject}` : ''}
- Fecha: ${new Date().toLocaleString('es-MX')}

Mensaje:
    ${cleanMessage}

---
    Responder a: ${cleanEmail}
Este mensaje fue enviado desde el formulario de contacto en kainet.mx
      `
    });

    if (contactError) {
      console.error('Error enviando email de contacto:', contactError);
      return res.status(500).json({
        error: 'Error al enviar mensaje',
        message: 'Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.'
      });
    }

    // 2. Enviar confirmación al usuario
    try {
      await resend.emails.send({
        from: `Kainet <${process.env.EMAIL_FROM}>`,
        to: cleanEmail,
        subject: 'Hemos recibido tu mensaje 📬',
        html: `
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mensaje recibido</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a;">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #00E5FF 0%, #0099CC 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0;">
                  ¡Gracias por contactarnos! 📬
                </h1>
              </div>

              <!-- Contenido -->
              <div style="padding: 40px 30px; background-color: #1a1a1a; color: #e0e0e0;">
                <p style="font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
                  Hola ${safeName},
                </p>
                
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  Hemos recibido tu mensaje y te responderemos lo antes posible, generalmente en menos de 24 horas.
                </p>

                <!-- Resumen del mensaje -->
                <div style="background-color: #00E5FF15; border-left: 4px solid #00E5FF; padding: 20px; margin: 30px 0; border-radius: 4px;">
                  <p style="font-size: 14px; color: #00E5FF; margin: 0 0 10px 0;">
                    <strong>Tu mensaje:</strong>
                  </p>
                  <p style="font-size: 14px; line-height: 1.6; margin: 0; color: #e0e0e0;">
                    ${escapeHtml(cleanMessage.substring(0, 200))}${cleanMessage.length > 200 ? '...' : ''}
                  </p>
                </div>

                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  Mientras tanto, te invito a conocer más sobre nuestros proyectos y servicios.
                </p>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 40px 0;">
                  <a href="${process.env.SITE_URL || 'https://kainet.mx'}" 
                     style="display: inline-block; background-color: #00E5FF; color: #0a0a0a; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                    Visitar Kainet
                  </a>
                </div>

                <p style="font-size: 14px; line-height: 1.6; color: #888; margin-top: 40px;">
                  Si tienes alguna pregunta adicional, no dudes en escribirnos nuevamente.
                </p>
              </div>

              <!-- Footer -->
              <div style="background-color: #0a0a0a; padding: 30px; text-align: center; border-top: 1px solid #333;">
                <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
                  © ${new Date().getFullYear()} Kainet. Construyendo el futuro de la automatización.
                </p>
                <p style="font-size: 12px; color: #666; margin: 10px 0;">
                  <a href="mailto:${process.env.EMAIL_CONTACT}" style="color: #00E5FF; text-decoration: none;">
                    ${process.env.EMAIL_CONTACT}
                  </a>
                </p>
              </div>

            </div>
          </body>
          </html>
        `,
        text: `
¡Gracias por contactarnos! 📬

      Hola ${cleanName},

Hemos recibido tu mensaje y te responderemos lo antes posible, generalmente en menos de 24 horas.

Tu mensaje:
      ${cleanMessage.substring(0, 200)}${cleanMessage.length > 200 ? '...' : ''}

Mientras tanto, te invito a conocer más sobre nuestros proyectos y servicios en ${process.env.SITE_URL || 'https://kainet.mx'}

Si tienes alguna pregunta adicional, no dudes en escribirnos nuevamente.

© ${new Date().getFullYear()} Kainet
${process.env.EMAIL_CONTACT}
        `
      });
    } catch (confirmationError) {
      console.error('Error enviando confirmación:', confirmationError);
      // No fallar si la confirmación falla
    }

    // Respuesta exitosa
    return res.status(200).json({
      success: true,
      message: '¡Mensaje enviado exitosamente! Te responderemos pronto.',
      emailId: contactData?.id
    });

  } catch (error) {
    console.error('Error en contact endpoint:', error);
    return res.status(500).json({
      error: 'Error del servidor',
      message: 'Hubo un problema al procesar tu solicitud. Por favor intenta de nuevo más tarde.'
    });
  }
}
