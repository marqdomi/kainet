#!/usr/bin/env node

/**
 * Script para enviar newsletter automáticamente cuando se publican nuevos posts
 * Se ejecuta desde GitHub Actions después de generar posts semanales
 */

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Obtener posts recientes (últimos 7 días)
 */
async function getRecentPosts() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .gte('created_at', sevenDaysAgo.toISOString())
    .eq('published', true)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
  
  return posts || [];
}

/**
 * Obtener suscriptores activos
 */
async function getActiveSubscribers() {
  const { data: subscribers, error } = await supabase
    .from('newsletter_subscribers')
    .select('email, name')
    .eq('confirmed', true)
    .eq('active', true);
    
  if (error) {
    console.error('Error fetching subscribers:', error);
    return [];
  }
  
  return subscribers || [];
}

/**
 * Generar HTML del newsletter
 */
function generateNewsletterHTML(posts, subscriberName) {
  const postsHTML = posts.map(post => `
    <div style="margin-bottom: 30px; padding: 20px; background: #1a1a1a; border-radius: 8px; border-left: 4px solid #00E5FF;">
      <h3 style="color: #00E5FF; margin: 0 0 10px 0; font-size: 18px;">
        ${post.title}
      </h3>
      <p style="color: #cccccc; margin: 0 0 15px 0; line-height: 1.6;">
        ${post.excerpt || post.content.substring(0, 200) + '...'}
      </p>
      <div style="margin-bottom: 10px;">
        <span style="background: #5227FF; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 8px;">
          ${post.category}
        </span>
        <span style="color: #888; font-size: 14px;">
          ${new Date(post.created_at).toLocaleDateString('es-ES')}
        </span>
      </div>
      <a href="https://kainet.mx/blog/${post.slug}" 
         style="color: #00E5FF; text-decoration: none; font-weight: 500;">
        Leer artículo completo →
      </a>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>KAINET - Nuevos Artículos</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background: #111111; color: #ffffff;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #00E5FF 0%, #5227FF 100%); padding: 30px 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">
            KAINET
          </h1>
          <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">
            Nuevos artículos sobre IA y Automatización
          </p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px 20px;">
          <h2 style="color: #ffffff; margin: 0 0 20px 0;">
            Hola ${subscriberName || 'Suscriptor'} 👋
          </h2>
          
          <p style="color: #cccccc; line-height: 1.6; margin: 0 0 30px 0;">
            Tenemos nuevos artículos que creemos te van a interesar. Aquí tienes un resumen de lo más reciente:
          </p>
          
          ${postsHTML}
          
          <div style="margin-top: 40px; padding: 20px; background: #1a1a1a; border-radius: 8px; text-align: center;">
            <p style="color: #cccccc; margin: 0 0 15px 0;">
              ¿Te gusta nuestro contenido?
            </p>
            <a href="https://kainet.mx/blog" 
               style="display: inline-block; background: linear-gradient(135deg, #00E5FF 0%, #5227FF 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
              Ver todos los artículos
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="padding: 20px; background: #0a0a0a; text-align: center; border-top: 1px solid #333;">
          <p style="color: #888; font-size: 14px; margin: 0 0 10px 0;">
            Recibiste este email porque te suscribiste a nuestro newsletter.
          </p>
          <p style="color: #888; font-size: 12px; margin: 0;">
            <a href="https://kainet.mx/newsletter/unsubscribe" style="color: #888;">Cancelar suscripción</a> |
            <a href="https://kainet.mx" style="color: #888;">Visitar sitio web</a>
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `;
}

/**
 * Enviar newsletter a todos los suscriptores
 */
async function sendNewsletter() {
  console.log('📬 Iniciando envío de newsletter...\n');
  
  // 1. Obtener posts recientes
  console.log('📰 Obteniendo posts recientes...');
  const recentPosts = await getRecentPosts();
  
  if (recentPosts.length === 0) {
    console.log('ℹ️  No hay posts recientes para enviar.');
    return;
  }
  
  console.log(`✅ Encontrados ${recentPosts.length} posts recientes:`);
  recentPosts.forEach(post => {
    console.log(`   - ${post.title} (${post.category})`);
  });
  
  // 2. Obtener suscriptores
  console.log('\n👥 Obteniendo suscriptores activos...');
  const subscribers = await getActiveSubscribers();
  
  if (subscribers.length === 0) {
    console.log('ℹ️  No hay suscriptores activos.');
    return;
  }
  
  console.log(`✅ Encontrados ${subscribers.length} suscriptores activos`);
  
  // 3. Enviar emails
  console.log('\n📧 Enviando newsletters...');
  let successCount = 0;
  let errorCount = 0;
  
  for (const subscriber of subscribers) {
    try {
      const html = generateNewsletterHTML(recentPosts, subscriber.name);
      
      await resend.emails.send({
        from: 'KAINET Newsletter <newsletter@kainet.mx>',
        to: subscriber.email,
        subject: `🚀 Nuevos artículos de KAINET - ${recentPosts.length} posts esta semana`,
        html: html
      });
      
      successCount++;
      console.log(`   ✅ Enviado a ${subscriber.email}`);
      
      // Pequeña pausa para no saturar la API
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      errorCount++;
      console.error(`   ❌ Error enviando a ${subscriber.email}:`, error.message);
    }
  }
  
  // 4. Registrar en log
  try {
    await supabase
      .from('newsletter_sent_log')
      .insert({
        posts_count: recentPosts.length,
        subscribers_count: subscribers.length,
        success_count: successCount,
        error_count: errorCount,
        post_titles: recentPosts.map(p => p.title)
      });
  } catch (error) {
    console.error('Error logging newsletter send:', error);
  }
  
  // 5. Resumen final
  console.log('\n📊 Resumen del envío:');
  console.log(`   ✅ Exitosos: ${successCount}`);
  console.log(`   ❌ Errores: ${errorCount}`);
  console.log(`   📰 Posts enviados: ${recentPosts.length}`);
  console.log('\n🎉 Newsletter enviado exitosamente!');
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  sendNewsletter().catch(console.error);
}

export { sendNewsletter };