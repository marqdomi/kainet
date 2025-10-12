// api/contact.js
// Vercel Serverless Function para manejar formulario de contacto

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
    const { name, email, subject, message } = req.body;

    // Validaciones
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Campos requeridos',
        message: 'Por favor completa todos los campos obligatorios' 
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        error: 'Email inválido',
        message: 'Por favor proporciona un email válido' 
      });
    }

    if (message.length < 10) {
      return res.status(400).json({ 
        error: 'Mensaje muy corto',
        message: 'Por favor proporciona más detalles en tu mensaje (mínimo 10 caracteres)' 
      });
    }

    const finalSubject = subject || 'Nuevo mensaje de contacto';

    // 1. Enviar email a contacto@kainet.mx (TU EMAIL)
    const { data: contactData, error: contactError } = await resend.emails.send({
      from: `Kainet Contacto <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_CONTACT,
      replyTo: email, // Para que puedas responder directamente
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
                  <strong>Nombre:</strong> ${name}
                </p>
                <p style="margin: 10px 0; color: #555; font-size: 14px;">
                  <strong>Email:</strong> 
                  <a href="mailto:${email}" style="color: #00E5FF; text-decoration: none;">
                    ${email}
                  </a>
                </p>
                ${subject ? `
                  <p style="margin: 10px 0; color: #555; font-size: 14px;">
                    <strong>Asunto:</strong> ${subject}
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
${message}
                </div>
              </div>

              <!-- Botón de respuesta rápida -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(finalSubject)}" 
                   style="display: inline-block; background-color: #00E5FF; color: #0a0a0a; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">
                  Responder a ${name}
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
- Nombre: ${name}
- Email: ${email}
${subject ? `- Asunto: ${subject}` : ''}
- Fecha: ${new Date().toLocaleString('es-MX')}

Mensaje:
${message}

---
Responder a: ${email}
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
        from: `Kainet <${process.env.EMAIL_CONTACT}>`,
        to: email,
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
                  Hola ${name},
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
                    ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}
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

Hola ${name},

Hemos recibido tu mensaje y te responderemos lo antes posible, generalmente en menos de 24 horas.

Tu mensaje:
${message.substring(0, 200)}${message.length > 200 ? '...' : ''}

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
