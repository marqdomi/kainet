// api/newsletter.js
// Vercel Serverless Function para manejar suscripciones al newsletter

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Función de validación de email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Método no permitido',
      message: 'Solo se permite POST' 
    });
  }

  try {
    const { email, name } = req.body;

    // Validaciones
    if (!email) {
      return res.status(400).json({ 
        error: 'Email requerido',
        message: 'Por favor proporciona un email' 
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        error: 'Email inválido',
        message: 'Por favor proporciona un email válido' 
      });
    }

    // Preparar datos del email
    const emailData = {
      from: `Kainet Newsletter <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: '¡Bienvenido a Kainet! 🚀',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenido a Kainet</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a;">
            
            <!-- Header con gradiente -->
            <div style="background: linear-gradient(135deg, #00E5FF 0%, #0099CC 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 32px; font-weight: bold; margin: 0;">
                ¡Bienvenido a Kainet! 🚀
              </h1>
            </div>

            <!-- Contenido -->
            <div style="padding: 40px 30px; background-color: #1a1a1a; color: #e0e0e0;">
              <p style="font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
                ${name ? `Hola ${name},` : 'Hola,'}
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                ¡Gracias por suscribirte a nuestro newsletter! Ahora formas parte de nuestra comunidad de innovadores y apasionados por la tecnología.
              </p>

              <div style="background-color: #00E5FF15; border-left: 4px solid #00E5FF; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <p style="font-size: 16px; line-height: 1.6; margin: 0; color: #00E5FF;">
                  <strong>¿Qué recibirás?</strong>
                </p>
                <ul style="margin: 15px 0 0 0; padding-left: 20px; color: #e0e0e0;">
                  <li style="margin-bottom: 10px;">📚 Artículos sobre IA y automatización</li>
                  <li style="margin-bottom: 10px;">💡 Tutoriales y tips de desarrollo</li>
                  <li style="margin-bottom: 10px;">🚀 Novedades y proyectos de Kainet</li>
                  <li style="margin-bottom: 10px;">🎯 Contenido exclusivo para suscriptores</li>
                </ul>
              </div>

              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                Mientras tanto, te invito a explorar nuestro blog y conocer más sobre nuestros proyectos.
              </p>

              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.SITE_URL || 'https://kainet.mx'}/blog" 
                   style="display: inline-block; background-color: #00E5FF; color: #0a0a0a; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                  Explorar el Blog
                </a>
              </div>

              <p style="font-size: 14px; line-height: 1.6; color: #888; margin-top: 40px;">
                ¿Tienes alguna pregunta? Responde a este email o contáctanos en 
                <a href="mailto:${process.env.EMAIL_CONTACT}" style="color: #00E5FF; text-decoration: none;">
                  ${process.env.EMAIL_CONTACT}
                </a>
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #0a0a0a; padding: 30px; text-align: center; border-top: 1px solid #333;">
              <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
                © ${new Date().getFullYear()} Kainet. Construyendo el futuro de la automatización.
              </p>
              <p style="font-size: 12px; color: #666; margin: 10px 0;">
                <a href="${process.env.SITE_URL || 'https://kainet.mx'}" style="color: #00E5FF; text-decoration: none; margin: 0 10px;">
                  Sitio Web
                </a>
                |
                <a href="${process.env.SITE_URL || 'https://kainet.mx'}/blog" style="color: #00E5FF; text-decoration: none; margin: 0 10px;">
                  Blog
                </a>
              </p>
              <p style="font-size: 11px; color: #555; margin-top: 20px;">
                Estás recibiendo este email porque te suscribiste a nuestro newsletter en kainet.mx
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
      text: `
¡Bienvenido a Kainet! 🚀

${name ? `Hola ${name},` : 'Hola,'}

¡Gracias por suscribirte a nuestro newsletter! Ahora formas parte de nuestra comunidad de innovadores y apasionados por la tecnología.

¿Qué recibirás?
- Artículos sobre IA y automatización
- Tutoriales y tips de desarrollo
- Novedades y proyectos de Kainet
- Contenido exclusivo para suscriptores

Mientras tanto, te invito a explorar nuestro blog: ${process.env.SITE_URL || 'https://kainet.mx'}/blog

¿Tienes alguna pregunta? Contáctanos en ${process.env.EMAIL_CONTACT}

© ${new Date().getFullYear()} Kainet. Construyendo el futuro de la automatización.

Estás recibiendo este email porque te suscribiste a nuestro newsletter en kainet.mx
      `
    };

    // Enviar email de bienvenida
    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('Error enviando email:', error);
      return res.status(500).json({ 
        error: 'Error al enviar email',
        message: 'Hubo un problema al procesar tu suscripción. Por favor intenta de nuevo.' 
      });
    }

    // También enviar notificación a newsletter@kainet.mx
    try {
      await resend.emails.send({
        from: `Kainet Sistema <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_NEWSLETTER,
        subject: `Nueva suscripción al newsletter`,
        html: `
          <h2>Nueva suscripción al newsletter</h2>
          <p><strong>Email:</strong> ${email}</p>
          ${name ? `<p><strong>Nombre:</strong> ${name}</p>` : ''}
          <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-MX')}</p>
        `,
      });
    } catch (notificationError) {
      console.error('Error enviando notificación:', notificationError);
      // No fallar si la notificación falla
    }

    // Respuesta exitosa
    return res.status(200).json({ 
      success: true,
      message: '¡Suscripción exitosa! Revisa tu email.',
      emailId: data?.id
    });

  } catch (error) {
    console.error('Error en newsletter endpoint:', error);
    return res.status(500).json({ 
      error: 'Error del servidor',
      message: 'Hubo un problema al procesar tu solicitud. Por favor intenta de nuevo más tarde.' 
    });
  }
}
