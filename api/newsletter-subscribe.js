// api/newsletter-subscribe.js
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Cliente Supabase con service_role para bypass RLS
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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
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

    // Generar token de confirmación
    const confirmationToken = generateToken();

    // Verificar si el email ya existe
    const { data: existingSubscriber } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (existingSubscriber) {
      if (existingSubscriber.is_active && existingSubscriber.confirmed_at) {
        return res.status(200).json({
          message: 'Ya estás suscrito al newsletter',
          alreadySubscribed: true
        });
      }

      // Si existe pero no está confirmado, reenviar confirmación
      if (!existingSubscriber.confirmed_at) {
        await supabase
          .from('newsletter_subscribers')
          .update({
            confirmation_token: confirmationToken,
            updated_at: new Date().toISOString()
          })
          .eq('email', email.toLowerCase());

        await sendConfirmationEmail(email, name || 'Suscriptor', confirmationToken);

        return res.status(200).json({
          message: 'Hemos reenviado el email de confirmación',
          requiresConfirmation: true
        });
      }

      // Si está desuscrito, reactivar
      if (existingSubscriber.unsubscribed_at) {
        await supabase
          .from('newsletter_subscribers')
          .update({
            is_active: true,
            unsubscribed_at: null,
            confirmation_token: confirmationToken,
            updated_at: new Date().toISOString()
          })
          .eq('email', email.toLowerCase());

        await sendConfirmationEmail(email, name || 'Suscriptor', confirmationToken);

        return res.status(200).json({
          message: 'Por favor confirma tu suscripción revisando tu email',
          requiresConfirmation: true
        });
      }
    }

    // Crear nuevo suscriptor
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        {
          email: email.toLowerCase(),
          name: name || null,
          confirmation_token: confirmationToken,
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

    // Enviar email de confirmación
    await sendConfirmationEmail(email, name || 'Suscriptor', confirmationToken);

    return res.status(200).json({
      message: 'Suscripción exitosa! Revisa tu email para confirmar',
      requiresConfirmation: true,
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

// Función auxiliar: Generar token aleatorio
function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Función auxiliar: Enviar email de confirmación
async function sendConfirmationEmail(email, name, token) {
  const confirmUrl = `${process.env.SITE_URL || 'https://kainet.mx'}/newsletter/confirm?token=${token}`;

  try {
    await resend.emails.send({
      from: process.env.EMAIL_NEWSLETTER || 'newsletter@kainet.mx',
      to: email,
      subject: 'Confirma tu suscripción al Newsletter de KAINET',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirma tu suscripción</title>
        </head>
        <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #e5e7eb; background-color: #0a0e27; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 40px auto; background: linear-gradient(135deg, #0f1a3f 0%, #1a0f2e 100%); border: 1px solid #2d3748; border-radius: 12px; overflow: hidden;">
            
            <!-- Header -->
            <div style="background: linear-gradient(90deg, #00E5FF 0%, #5227FF 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">KAINET</h1>
              <p style="color: #e5e7eb; margin: 10px 0 0 0; font-size: 14px;">Automatización Inteligente</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #00E5FF; margin: 0 0 20px 0; font-size: 24px;">¡Hola ${name}! 👋</h2>
              
              <p style="margin: 0 0 20px 0; color: #cbd5e0;">
                Gracias por suscribirte al newsletter de KAINET. Para completar tu suscripción, necesitamos que confirmes tu email.
              </p>

              <p style="margin: 0 0 30px 0; color: #cbd5e0;">
                Recibirás actualizaciones semanales sobre:
              </p>

              <ul style="color: #cbd5e0; margin: 0 0 30px 0; padding-left: 20px;">
                <li style="margin-bottom: 10px;">🤖 Inteligencia Artificial y Machine Learning</li>
                <li style="margin-bottom: 10px;">⚡ Automatización empresarial</li>
                <li style="margin-bottom: 10px;">🛠️ Herramientas DevOps y Cloud</li>
                <li style="margin-bottom: 10px;">💻 Desarrollo web moderno</li>
              </ul>

              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="${confirmUrl}" 
                   style="display: inline-block; background: linear-gradient(90deg, #00E5FF 0%, #5227FF 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 229, 255, 0.3);">
                  Confirmar Suscripción
                </a>
              </div>

              <p style="margin: 30px 0 0 0; color: #a0aec0; font-size: 14px;">
                Si no solicitaste esta suscripción, puedes ignorar este email.
              </p>

              <p style="margin: 10px 0 0 0; color: #718096; font-size: 12px;">
                Link de confirmación: <a href="${confirmUrl}" style="color: #00E5FF; text-decoration: none;">${confirmUrl}</a>
              </p>
            </div>

            <!-- Footer -->
            <div style="background: #1a0f2e; padding: 20px 30px; border-top: 1px solid #2d3748;">
              <p style="margin: 0; color: #718096; font-size: 12px; text-align: center;">
                © ${new Date().getFullYear()} KAINET - Construyendo el futuro de la Automatización Inteligente
              </p>
              <p style="margin: 10px 0 0 0; color: #718096; font-size: 12px; text-align: center;">
                <a href="https://kainet.mx" style="color: #00E5FF; text-decoration: none;">kainet.mx</a>
              </p>
            </div>

          </div>
        </body>
        </html>
      `
    });
  } catch (error) {
    console.error('Error enviando email de confirmación:', error);
    throw error;
  }
}
