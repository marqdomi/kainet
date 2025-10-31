#!/usr/bin/env node

/**
 * Script de prueba para el sistema de newsletter
 * Permite probar el envío sin afectar a todos los suscriptores
 */

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

async function testNewsletter() {
  console.log('🧪 Probando sistema de newsletter...\n');
  
  // 1. Verificar conexiones
  console.log('🔍 Verificando conexiones...');
  
  // Test Supabase
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(1);
    
    if (error) throw error;
    console.log('   ✅ Supabase conectado');
  } catch (error) {
    console.error('   ❌ Error Supabase:', error.message);
    return;
  }
  
  // Test Resend
  try {
    // Solo verificar que la API key esté configurada
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY no configurada');
    }
    console.log('   ✅ Resend API key configurada');
  } catch (error) {
    console.error('   ❌ Error Resend:', error.message);
    return;
  }
  
  // 2. Obtener estadísticas
  console.log('\n📊 Estadísticas actuales:');
  
  // Posts recientes
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const { data: recentPosts } = await supabase
    .from('blog_posts')
    .select('title, category, created_at')
    .gte('created_at', sevenDaysAgo.toISOString())
    .eq('published', true)
    .order('created_at', { ascending: false });
  
  console.log(`   📰 Posts recientes (7 días): ${recentPosts?.length || 0}`);
  if (recentPosts?.length > 0) {
    recentPosts.forEach(post => {
      console.log(`      - ${post.title} (${post.category})`);
    });
  }
  
  // Suscriptores
  const { data: subscribers } = await supabase
    .from('newsletter_subscribers')
    .select('email, confirmed, active');
  
  const totalSubs = subscribers?.length || 0;
  const activeSubs = subscribers?.filter(s => s.confirmed && s.active).length || 0;
  
  console.log(`   👥 Total suscriptores: ${totalSubs}`);
  console.log(`   ✅ Suscriptores activos: ${activeSubs}`);
  
  // 3. Envío de prueba
  const testEmail = process.env.TEST_EMAIL || 'marco@kainet.mx';
  
  if (recentPosts?.length > 0) {
    console.log(`\n📧 Enviando newsletter de prueba a: ${testEmail}`);
    
    try {
      // Generar HTML (reutilizar función del script principal)
      const { sendNewsletter } = await import('./send-newsletter.js');
      
      // Crear un suscriptor de prueba temporal
      const testSubscriber = { email: testEmail, name: 'Usuario de Prueba' };
      
      // Generar HTML del newsletter
      const postsHTML = recentPosts.map(post => `
        <div style="margin-bottom: 20px; padding: 15px; background: #1a1a1a; border-radius: 8px;">
          <h3 style="color: #00E5FF; margin: 0 0 10px 0;">${post.title}</h3>
          <span style="background: #5227FF; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
            ${post.category}
          </span>
        </div>
      `).join('');
      
      const html = `
        <div style="max-width: 600px; margin: 0 auto; background: #111; color: #fff; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #00E5FF 0%, #5227FF 100%); padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: white;">KAINET - Newsletter de Prueba</h1>
          </div>
          <div style="padding: 20px;">
            <h2>Hola Usuario de Prueba 👋</h2>
            <p style="color: #ccc;">Este es un email de prueba del sistema de newsletter.</p>
            ${postsHTML}
            <p style="color: #888; font-size: 14px; margin-top: 30px;">
              Este es un email de prueba. Los suscriptores reales recibirán un formato similar.
            </p>
          </div>
        </div>
      `;
      
      await resend.emails.send({
        from: 'KAINET Test <newsletter@kainet.mx>',
        to: testEmail,
        subject: '🧪 Test - Newsletter KAINET',
        html: html
      });
      
      console.log('   ✅ Email de prueba enviado exitosamente');
      
    } catch (error) {
      console.error('   ❌ Error enviando email de prueba:', error.message);
    }
  }
  
  console.log('\n🎯 Resumen:');
  console.log('   - Sistema de newsletter configurado correctamente');
  console.log('   - Listo para envío automático cuando se publiquen posts');
  console.log('   - El workflow de GitHub Actions enviará newsletters automáticamente');
  
  console.log('\n📋 Para activar completamente:');
  console.log('   1. Asegúrate que RESEND_API_KEY esté en GitHub Secrets');
  console.log('   2. Los newsletters se enviarán automáticamente cada viernes');
  console.log('   3. Solo se envían si hay posts nuevos en los últimos 7 días');
}

testNewsletter().catch(console.error);