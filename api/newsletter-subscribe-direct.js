// api/newsletter-subscribe-direct.js
// Versión DIRECTA sin confirmación - suscripción inmediata con email de bienvenida

import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export default async function handler(req, res) {
  // CORS headers - restringido a kainet.mx
  const allowedOrigins = [
    'https://kainet.mx',
    'https://www.kainet.mx',
    'http://localhost:3000',
    'http://localhost:5173'
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name } = req.body;

    // Validación básica
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        error: 'Email inválido',
        message: 'Por favor proporciona un email válido'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Verificar si el email ya existe
    const { data: existingSubscriber } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', normalizedEmail)
      .single();

    if (existingSubscriber) {
      // Si ya está activo y confirmado
      if (existingSubscriber.is_active && existingSubscriber.confirmed_at) {
        return res.status(200).json({
          success: true,
          message: '¡Ya estás suscrito! Recibirás nuestro próximo newsletter.',
          alreadySubscribed: true
        });
      }

      // Si está desuscrito, reactivar
      if (existingSubscriber.unsubscribed_at || !existingSubscriber.is_active) {
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({
            is_active: true,
            unsubscribed_at: null,
            confirmed_at: new Date().toISOString(),
            name: name || existingSubscriber.name,
            updated_at: new Date().toISOString()
          })
          .eq('email', normalizedEmail);

        if (updateError) {
          console.error('Error reactivando suscriptor:', updateError);
          return res.status(500).json({
            error: 'Error al procesar suscripción',
            message: 'Hubo un problema. Intenta de nuevo.'
          });
        }

        // Enviar email de bienvenida
        await sendWelcomeEmail(normalizedEmail, name || existingSubscriber.name || 'Suscriptor');

        return res.status(200).json({
          success: true,
          message: '¡Suscripción reactivada! Revisa tu email.',
          reactivated: true
        });
      }

      // Si existe pero no está confirmado, confirmar ahora
      const { error: confirmError } = await supabase
        .from('newsletter_subscribers')
        .update({
          confirmed_at: new Date().toISOString(),
          is_active: true,
          name: name || existingSubscriber.name,
          updated_at: new Date().toISOString()
        })
        .eq('email', normalizedEmail);

      if (confirmError) {
        console.error('Error confirmando suscriptor:', confirmError);
        return res.status(500).json({
          error: 'Error al procesar suscripción',
          message: 'Hubo un problema. Intenta de nuevo.'
        });
      }

      await sendWelcomeEmail(normalizedEmail, name || existingSubscriber.name || 'Suscriptor');

      return res.status(200).json({
        success: true,
        message: '¡Suscripción confirmada! Revisa tu email.',
        confirmed: true
      });
    }

    // Crear nuevo suscriptor (YA CONFIRMADO)
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        {
          email: normalizedEmail,
          name: name || null,
          confirmed_at: new Date().toISOString(), // ✅ Confirmado inmediatamente
          is_active: true,
          source: 'website',
          preferences: {
            frequency: 'weekly',
            categories: ['all']
          }
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error al crear suscriptor:', error);
      return res.status(500).json({
        error: 'Error al procesar suscripción',
        message: 'Hubo un problema al registrar tu suscripción. Intenta de nuevo.'
      });
    }

    // Enviar email de bienvenida inmediato
    await sendWelcomeEmail(normalizedEmail, name || 'Suscriptor');

    return res.status(200).json({
      success: true,
      message: '¡Suscripción exitosa! Revisa tu email de bienvenida.',
      subscriber: {
        email: data.email,
        name: data.name
      }
    });

  } catch (error) {
    console.error('Error en newsletter subscribe:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Hubo un problema al procesar tu solicitud'
    });
  }
}

// Función para enviar email de bienvenida
async function sendWelcomeEmail(email, name) {
  try {
    const { data, error } = await resend.emails.send({
      from: `KAINET Newsletter <${process.env.EMAIL_NEWSLETTER || 'newsletter@kainet.mx'}>`,
      to: email,
      subject: '¡Bienvenido al Newsletter de KAINET! 🚀',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenido a KAINET</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #e5e7eb; background-color: #0a0a0a; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f1a3f 0%, #1a0f2e 100%); border: 1px solid #2d3748;">
            
            <!-- Header con gradiente -->
            <div style="background: linear-gradient(90deg, #00E5FF 0%, #5227FF 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 2px;">KAINET</h1>
              <p style="color: #e5e7eb; margin: 15px 0 0 0; font-size: 16px; font-weight: 500;">Automatización Inteligente</p>
            </div>

            <!-- Contenido principal -->
            <div style="padding: 40px 30px;">
              
              <!-- Saludo -->
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
                <h2 style="color: #00E5FF; margin: 0 0 10px 0; font-size: 28px; font-weight: 600;">¡Bienvenido ${name}!</h2>
                <p style="color: #cbd5e0; font-size: 18px; margin: 0;">Tu suscripción está activa</p>
              </div>

              <!-- Mensaje principal -->
              <div style="background: rgba(0, 229, 255, 0.05); border-left: 4px solid #00E5FF; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <p style="margin: 0 0 15px 0; color: #cbd5e0; font-size: 16px; line-height: 1.8;">
                  Gracias por unirte a la comunidad KAINET. Cada semana recibirás contenido curado sobre las últimas tendencias en tecnología y automatización.
                </p>
              </div>

              <!-- Qué recibirás -->
              <h3 style="color: #00E5FF; margin: 30px 0 20px 0; font-size: 20px;">📬 Qué recibirás:</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 15px; background: rgba(0, 229, 255, 0.05); border-radius: 8px; margin-bottom: 10px;">
                    <div style="font-size: 24px; margin-bottom: 5px;">🤖</div>
                    <strong style="color: #00E5FF; font-size: 16px;">Inteligencia Artificial</strong>
                    <p style="color: #a0aec0; font-size: 14px; margin: 5px 0 0 0;">Últimos avances en Claude, GPT, Gemini y más</p>
                  </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 15px; background: rgba(0, 229, 255, 0.05); border-radius: 8px;">
                    <div style="font-size: 24px; margin-bottom: 5px;">⚡</div>
                    <strong style="color: #00E5FF; font-size: 16px;">Automatización</strong>
                    <p style="color: #a0aec0; font-size: 14px; margin: 5px 0 0 0;">Tools, workflows y best practices</p>
                  </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 15px; background: rgba(0, 229, 255, 0.05); border-radius: 8px;">
                    <div style="font-size: 24px; margin-bottom: 5px;">🛠️</div>
                    <strong style="color: #00E5FF; font-size: 16px;">DevOps & Cloud</strong>
                    <p style="color: #a0aec0; font-size: 14px; margin: 5px 0 0 0;">CI/CD, infraestructura, herramientas</p>
                  </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 15px; background: rgba(0, 229, 255, 0.05); border-radius: 8px;">
                    <div style="font-size: 24px; margin-bottom: 5px;">💻</div>
                    <strong style="color: #00E5FF; font-size: 16px;">Desarrollo Web</strong>
                    <p style="color: #a0aec0; font-size: 14px; margin: 5px 0 0 0;">Frameworks, librerías, tutoriales</p>
                  </td>
                </tr>
              </table>

              <!-- CTAs -->
              <div style="text-align: center; margin: 40px 0 30px 0;">
                <p style="color: #cbd5e0; margin-bottom: 20px;">Mientras tanto, explora:</p>
                <a href="${process.env.SITE_URL || 'https://kainet.mx'}/blog" 
                   style="display: inline-block; background: linear-gradient(90deg, #00E5FF 0%, #5227FF 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 0 5px 10px 5px; box-shadow: 0 4px 6px rgba(0, 229, 255, 0.3);">
                  📚 Ver Blog
                </a>
                <a href="${process.env.SITE_URL || 'https://kainet.mx'}/services" 
                   style="display: inline-block; background: transparent; border: 2px solid #00E5FF; color: #00E5FF; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 0 5px 10px 5px;">
                  🚀 Servicios
                </a>
              </div>

              <!-- Nota final -->
              <div style="background: rgba(82, 39, 255, 0.1); border-radius: 8px; padding: 20px; margin-top: 30px; text-align: center;">
                <p style="color: #cbd5e0; margin: 0; font-size: 15px;">
                  📅 <strong>Próximo newsletter:</strong> Cada lunes en tu bandeja de entrada
                </p>
              </div>

            </div>

            <!-- Footer -->
            <div style="background: #1a0f2e; padding: 30px; border-top: 1px solid #2d3748;">
              <p style="margin: 0 0 15px 0; color: #718096; font-size: 13px; text-align: center;">
                ¿No quieres recibir más emails? 
                <a href="${process.env.SITE_URL || 'https://kainet.mx'}/newsletter/unsubscribe?email=${encodeURIComponent(email)}" 
                   style="color: #00E5FF; text-decoration: none;">
                  Desuscribirse
                </a>
              </p>
              <p style="margin: 0; color: #718096; font-size: 12px; text-align: center;">
                © ${new Date().getFullYear()} KAINET - Construyendo el futuro de la Automatización Inteligente
              </p>
              <p style="margin: 10px 0 0 0; color: #718096; font-size: 12px; text-align: center;">
                <a href="${process.env.SITE_URL || 'https://kainet.mx'}" style="color: #00E5FF; text-decoration: none;">kainet.mx</a>
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
      text: `
¡Bienvenido a KAINET, ${name}! 🎉

Tu suscripción está activa. Gracias por unirte a nuestra comunidad.

Cada semana recibirás contenido curado sobre:

🤖 Inteligencia Artificial - Últimos avances en Claude, GPT, Gemini
⚡ Automatización - Tools, workflows y best practices  
🛠️ DevOps & Cloud - CI/CD, infraestructura, herramientas
💻 Desarrollo Web - Frameworks, librerías, tutoriales

Próximo newsletter: Cada lunes en tu bandeja de entrada

Explora más:
- Blog: ${process.env.SITE_URL || 'https://kainet.mx'}/blog
- Servicios: ${process.env.SITE_URL || 'https://kainet.mx'}/services

---
¿No quieres recibir más emails? Desuscríbete aquí:
${process.env.SITE_URL || 'https://kainet.mx'}/newsletter/unsubscribe?email=${encodeURIComponent(email)}

© ${new Date().getFullYear()} KAINET - kainet.mx
      `
    });

    if (error) {
      console.error('Error enviando email de bienvenida:', error);
      throw error;
    }

    console.log('✅ Email de bienvenida enviado:', data);
    return data;

  } catch (error) {
    console.error('Error en sendWelcomeEmail:', error);
    throw error;
  }
}
