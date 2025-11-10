# 📧 Guía Rápida: Email de Bienvenida del Newsletter

## ✅ Problema Solucionado

Ahora cuando alguien se suscribe al newsletter **SÍ recibe un email de bienvenida inmediatamente**.

## 🚀 Pasos para Activar (5 minutos)

### 1. Hacer Deploy

```bash
git add .
git commit -m "feat: agregar email de bienvenida al newsletter"
git push origin main
```

### 2. Configurar Variable en Vercel

Ve a: https://vercel.com/dashboard → Tu Proyecto → Settings → Environment Variables

**Agrega esta variable SI NO LA TIENES:**

```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: [tu service role key de Supabase]
```

Para obtener el service role key:
1. Ve a: https://supabase.com/dashboard/project/tqdencmzezjevnntifos/settings/api
2. Copia el **service_role** key (el secreto, NO el anon key)
3. Pégalo en Vercel

**Marca:** Production, Preview, Development

### 3. Esperar Deploy (2-3 minutos)

Vercel hará el deploy automáticamente.

### 4. Probar

Ve a: https://kainet.mx (scroll hasta el footer o ve al blog)

Suscríbete con tu email y **revisa tu bandeja de entrada**.

## 📬 Qué Recibirá el Usuario

Email con:
- 🎉 Bienvenida personalizada
- 📋 Descripción del contenido (IA, Automatización, DevOps)
- 🔗 Links al blog y servicios
- 📅 Frecuencia (cada lunes)
- ✉️ Link para desuscribirse

## ⚠️ Si No Llega el Email

### 1. Revisar Spam

Los emails pueden llegar a spam/promociones la primera vez.

### 2. Verificar Dominio en Resend

Ve a: https://resend.com/domains

El dominio `kainet.mx` debe tener ✅ verde.

Si NO está verificado:
1. Clic en el dominio
2. Copia los registros DNS
3. Agrégalos en tu proveedor de DNS (GoDaddy, Cloudflare, etc.)
4. Espera 5-10 minutos
5. Clic en "Verify"

### 3. Verificar Variables en Vercel

Asegúrate de tener:
- ✅ RESEND_API_KEY
- ✅ EMAIL_NEWSLETTER
- ✅ SUPABASE_SERVICE_ROLE_KEY
- ✅ VITE_SUPABASE_URL

### 4. Ver Logs

Vercel Dashboard → Tu Deploy → Functions → `/api/newsletter-subscribe-direct`

## 🧪 Probar con curl

```bash
curl -X POST https://kainet.mx/api/newsletter-subscribe-direct \
  -H "Content-Type: application/json" \
  -d '{"email":"tu@email.com","name":"Tu Nombre"}'
```

Deberías ver:
```json
{
  "success": true,
  "message": "¡Suscripción exitosa! Revisa tu email de bienvenida."
}
```

## ✅ Checklist Rápido

- [ ] Push a GitHub
- [ ] Agregar SUPABASE_SERVICE_ROLE_KEY en Vercel
- [ ] Verificar dominio en Resend (✅ verde)
- [ ] Esperar deploy
- [ ] Probar con tu email
- [ ] Verificar que llegó el email
- [ ] ✅ ¡Funciona!

## 📞 Ayuda

Si después de seguir todos los pasos NO funciona:

1. Revisa los logs en Vercel
2. Verifica que el dominio esté verificado en Resend
3. Prueba con otro email
4. Revisa spam/promociones

---

**Tiempo**: ⏱️ 5 minutos
**Prioridad**: 🔴 ALTA
**Dificultad**: ⭐ Muy Fácil
