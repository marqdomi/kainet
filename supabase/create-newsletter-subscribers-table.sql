-- =====================================================
-- TABLA: newsletter_subscribers
-- Descripción: Almacena suscriptores del newsletter
-- =====================================================

-- Crear tabla de suscriptores
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  confirmation_token VARCHAR(255),
  confirmed_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  source VARCHAR(50) DEFAULT 'website',
  preferences JSONB DEFAULT '{"frequency": "weekly", "categories": ["all"]}'::jsonb,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON public.newsletter_subscribers(is_active);
CREATE INDEX IF NOT EXISTS idx_newsletter_confirmed ON public.newsletter_subscribers(confirmed_at);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_newsletter_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_newsletter_updated_at
  BEFORE UPDATE ON public.newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_newsletter_updated_at();

-- RLS (Row Level Security) Policies
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Cualquiera puede suscribirse (INSERT)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Solo admin puede ver todos los suscriptores (SELECT)
CREATE POLICY "Only authenticated users can view subscribers"
  ON public.newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Solo service_role puede actualizar/eliminar
CREATE POLICY "Service role can update subscribers"
  ON public.newsletter_subscribers
  FOR UPDATE
  TO service_role
  USING (true);

-- =====================================================
-- TABLA: newsletter_sent_log
-- Descripción: Log de newsletters enviados
-- =====================================================

CREATE TABLE IF NOT EXISTS public.newsletter_sent_log (
  id BIGSERIAL PRIMARY KEY,
  subscriber_id BIGINT REFERENCES public.newsletter_subscribers(id) ON DELETE CASCADE,
  post_id BIGINT REFERENCES public.blog_posts(id) ON DELETE SET NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  email_provider VARCHAR(50) DEFAULT 'resend',
  provider_message_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'sent', -- 'sent', 'delivered', 'opened', 'bounced', 'failed'
  error_message TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_newsletter_log_subscriber ON public.newsletter_sent_log(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_log_post ON public.newsletter_sent_log(post_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_log_status ON public.newsletter_sent_log(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_log_sent_at ON public.newsletter_sent_log(sent_at);

-- RLS
ALTER TABLE public.newsletter_sent_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only service role can access newsletter log"
  ON public.newsletter_sent_log
  FOR ALL
  TO service_role
  USING (true);

-- =====================================================
-- FUNCIONES ÚTILES
-- =====================================================

-- Función: Obtener suscriptores activos
CREATE OR REPLACE FUNCTION get_active_subscribers()
RETURNS TABLE (
  id BIGINT,
  email VARCHAR(255),
  name VARCHAR(255),
  preferences JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ns.id,
    ns.email,
    ns.name,
    ns.preferences
  FROM public.newsletter_subscribers ns
  WHERE ns.is_active = true 
    AND ns.confirmed_at IS NOT NULL
    AND ns.unsubscribed_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función: Marcar como desuscrito
CREATE OR REPLACE FUNCTION unsubscribe_email(subscriber_email VARCHAR(255))
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.newsletter_subscribers
  SET 
    is_active = false,
    unsubscribed_at = NOW()
  WHERE email = subscriber_email;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función: Confirmar suscripción
CREATE OR REPLACE FUNCTION confirm_subscription(token VARCHAR(255))
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.newsletter_subscribers
  SET 
    confirmed_at = NOW(),
    confirmation_token = NULL
  WHERE confirmation_token = token
    AND confirmed_at IS NULL;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- DATOS DE EJEMPLO (OPCIONAL - comentar en producción)
-- =====================================================

-- Insertar algunos suscriptores de prueba
-- INSERT INTO public.newsletter_subscribers (email, name, confirmed_at) VALUES
-- ('test1@example.com', 'Usuario Test 1', NOW()),
-- ('test2@example.com', 'Usuario Test 2', NOW()),
-- ('marco@kainet.mx', 'Marco Dominguez', NOW());

-- =====================================================
-- VERIFICACIÓN
-- =====================================================

-- Ver suscriptores activos
-- SELECT * FROM get_active_subscribers();

-- Ver todos los suscriptores
-- SELECT * FROM public.newsletter_subscribers;

-- Ver log de envíos
-- SELECT * FROM public.newsletter_sent_log ORDER BY sent_at DESC;
