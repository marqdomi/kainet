// api/newsletter-confirm.js
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

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
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.method === 'GET' ? req.query.token : req.body.token;

    if (!token) {
      return res.status(400).json({ 
        error: 'Token requerido',
        message: 'No se proporcionó token de confirmación'
      });
    }

    // Buscar suscriptor con ese token
    const { data: subscriber, error: findError } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('confirmation_token', token)
      .single();

    if (findError || !subscriber) {
      return res.status(404).json({
        error: 'Token inválido',
        message: 'El token de confirmación no es válido o ya expiró'
      });
    }

    // Si ya está confirmado
    if (subscriber.confirmed_at) {
      return res.status(200).json({
        message: 'Tu suscripción ya estaba confirmada',
        alreadyConfirmed: true
      });
    }

    // Confirmar suscripción
    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({
        confirmed_at: new Date().toISOString(),
        confirmation_token: null,
        is_active: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriber.id);

    if (updateError) {
      console.error('Error confirmando suscripción:', updateError);
      return res.status(500).json({
        error: 'Error al confirmar',
        message: 'Hubo un problema al confirmar tu suscripción'
      });
    }

    // Enviar email de bienvenida
    await sendWelcomeEmail(subscriber.email, subscriber.name || 'Suscriptor');

    return res.status(200).json({
      message: '¡Suscripción confirmada exitosamente!',
      confirmed: true,
      subscriber: {
        email: subscriber.email,
        name: subscriber.name
      }
    });

  } catch (error) {
    console.error('Error en newsletter confirm:', error);
    return res.status(500).json({
      error: 'Error interno',
      message: 'Hubo un problema al procesar tu confirmación'
    });
  }
}

async function sendWelcomeEmail(email, name) {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_NEWSLETTER || 'newsletter@kainet.mx',
      to: email,
      subject: '¡Bienvenido al Newsletter de KAINET! 🚀',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Inter', sans-serif; line-height: 1.6; color: #e5e7eb; background-color: #0a0e27; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 40px auto; background: linear-gradient(135deg, #0f1a3f 0%, #1a0f2e 100%); border: 1px solid #2d3748; border-radius: 12px; overflow: hidden;">
            
            <!-- Header -->
            <div style="background: linear-gradient(90deg, #00E5FF 0%, #5227FF 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">KAINET</h1>
              <p style="color: #e5e7eb; margin: 10px 0 0 0; font-size: 14px;">¡Bienvenido a bordo! 🚀</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #00E5FF; margin: 0 0 20px 0; font-size: 24px;">¡Hola ${name}!</h2>
              
              <p style="margin: 0 0 20px 0; color: #cbd5e0; font-size: 16px;">
                Tu suscripción ha sido confirmada exitosamente. ¡Gracias por unirte a la comunidad KAINET! 🎉
              </p>

              <p style="margin: 0 0 20px 0; color: #cbd5e0;">
                Cada semana recibirás contenido curado sobre:
              </p>

              <div style="background: rgba(0, 229, 255, 0.1); border-left: 4px solid #00E5FF; padding: 20px; margin: 20px 0; border-radius: 4px;">
                <ul style="color: #cbd5e0; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 10px;">🤖 <strong>IA y ML:</strong> Últimos avances en Claude, GPT, Gemini</li>
                  <li style="margin-bottom: 10px;">⚡ <strong>Automatización:</strong> Tools, workflows y best practices</li>
                  <li style="margin-bottom: 10px;">🛠️ <strong>DevOps:</strong> Cloud, CI/CD, infraestructura</li>
                  <li style="margin-bottom: 10px;">💻 <strong>Desarrollo:</strong> Frameworks, librerías, tutoriales</li>
                </ul>
              </div>

              <p style="margin: 30px 0 20px 0; color: #cbd5e0;">
                Mientras tanto, puedes:
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://kainet.mx/blog" 
                   style="display: inline-block; background: linear-gradient(90deg, #00E5FF 0%, #5227FF 100%); color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: 600; margin: 0 10px 10px 0;">
                  Explorar Blog
                </a>
                <a href="https://kainet.mx/services" 
                   style="display: inline-block; background: transparent; border: 2px solid #00E5FF; color: #00E5FF; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; margin: 0 0 10px 0;">
                  Ver Servicios
                </a>
              </div>

              <p style="margin: 30px 0 0 0; color: #a0aec0; font-size: 14px;">
                ¡Nos vemos pronto en tu bandeja de entrada! 📬
              </p>
            </div>

            <!-- Footer -->
            <div style="background: #1a0f2e; padding: 20px 30px; border-top: 1px solid #2d3748;">
              <p style="margin: 0 0 10px 0; color: #718096; font-size: 12px; text-align: center;">
                Si no quieres recibir más emails, puedes 
                <a href="https://kainet.mx/newsletter/unsubscribe?email=${encodeURIComponent(email)}" 
                   style="color: #00E5FF; text-decoration: none;">
                  desuscribirte aquí
                </a>
              </p>
              <p style="margin: 0; color: #718096; font-size: 12px; text-align: center;">
                © ${new Date().getFullYear()} KAINET - Construyendo el futuro de la Automatización Inteligente
              </p>
            </div>

          </div>
        </body>
        </html>
      `
    });
  } catch (error) {
    console.error('Error enviando email de bienvenida:', error);
  }
}
