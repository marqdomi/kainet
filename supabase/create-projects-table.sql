-- Crear tabla de proyectos
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  tech_stack TEXT[], -- Array of technologies
  category TEXT, -- AI, Web, Automation, MLOps
  featured_image TEXT,
  gallery JSONB, -- Array of image URLs
  live_url TEXT,
  github_url TEXT,
  metrics JSONB, -- {users: 1000, performance: "+40%"}
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published', -- draft, published
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insertar proyectos de ejemplo
INSERT INTO projects (slug, title, short_description, full_description, tech_stack, category, featured, live_url, github_url, metrics) VALUES

('kainet-resto', 
 'KAINET Resto - Sistema de Gestión para Restaurantes',
 'Plataforma web completa para gestión de restaurantes con menús digitales, órdenes en tiempo real y sistema de inventarios.',
 'Sistema integral desarrollado con React y Node.js que permite a los restaurantes gestionar todo su operación desde una interfaz moderna. Incluye menú digital con códigos QR, sistema de órdenes en tiempo real, control de inventarios, reportes de ventas y análisis de datos. Diseñado para escalar desde pequeños negocios hasta cadenas de restaurantes.',
 ARRAY['React', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Vite'],
 'Web',
 true,
 'https://kainet-resto.vercel.app',
 NULL,
 '{"tables": "50+", "orders_daily": "200+", "response_time": "< 2s"}'::jsonb
),

('news-aggregator-ai', 
 'Agregador de Noticias con IA',
 'Sistema automatizado que recopila, analiza y genera contenido periodístico usando Claude AI y Gemini.',
 'Plataforma de automatización que utiliza inteligencia artificial para agregar noticias de múltiples fuentes RSS, analizar tendencias y generar artículos de blog automáticamente. Implementa Claude AI para redacción de contenido y Gemini para análisis de sentimientos. Incluye sistema de scraping inteligente, detección de duplicados y programación de publicaciones.',
 ARRAY['Node.js', 'Claude AI', 'Gemini', 'RSS Parser', 'Cheerio', 'MCP', 'Supabase'],
 'AI',
 true,
 NULL,
 'https://github.com/marqdomi/kainet',
 '{"articles_generated": "100+", "accuracy": "95%", "automation_time_saved": "20hrs/week"}'::jsonb
),

('automation-workflows', 
 'Sistema de Workflows de Automatización',
 'Plataforma para crear y ejecutar workflows de automatización personalizados con integración a múltiples servicios.',
 'Framework de automatización que permite crear flujos de trabajo complejos mediante una interfaz visual tipo no-code/low-code. Integra con APIs populares (Resend, Supabase, Stripe), permite scheduling de tareas, manejo de webhooks y ejecución distribuida. Ideal para automatizar procesos empresariales repetitivos.',
 ARRAY['Node.js', 'TypeScript', 'Bull MQ', 'Redis', 'Docker', 'GitHub Actions'],
 'Automation',
 true,
 NULL,
 NULL,
 '{"workflows_created": "30+", "tasks_automated": "1000+/day", "error_rate": "< 1%"}'::jsonb
),

('mlops-pipeline', 
 'Pipeline MLOps para Modelos de Machine Learning',
 'Infraestructura completa para entrenar, versionar, desplegar y monitorear modelos de ML en producción.',
 'Sistema de MLOps end-to-end que automatiza el ciclo de vida completo de modelos de machine learning. Incluye versionado de datasets, experimentos con tracking, CI/CD para modelos, despliegue en contenedores, monitoreo de drift y A/B testing. Construido con mejores prácticas de la industria.',
 ARRAY['Python', 'MLflow', 'Docker', 'Kubernetes', 'FastAPI', 'TensorFlow', 'PostgreSQL'],
 'MLOps',
 false,
 NULL,
 NULL,
 '{"models_deployed": "12", "uptime": "99.9%", "inference_time": "< 100ms"}'::jsonb
),

('portfolio-personal', 
 'Portfolio Personal con Three.js',
 'Sitio web portfolio con efectos 3D interactivos y animaciones fluidas.',
 'Portfolio personal moderno que combina diseño minimalista con efectos 3D impresionantes usando Three.js. Incluye canvas interactivo con partículas, transiciones suaves con Framer Motion, blog técnico integrado y formulario de contacto. Optimizado para SEO y performance con Vite.',
 ARRAY['React', 'Three.js', 'Framer Motion', 'Vite', 'Tailwind CSS', 'Vercel'],
 'Web',
 false,
 'https://kainet.mx',
 'https://github.com/marqdomi/kainet',
 '{"lighthouse_score": "98", "load_time": "< 1.5s", "monthly_visits": "500+"}'::jsonb
),

('chatbot-soporte', 
 'Chatbot de Soporte con RAG',
 'Chatbot inteligente que responde preguntas usando Retrieval Augmented Generation sobre documentación interna.',
 'Sistema de chatbot empresarial que utiliza técnicas de RAG (Retrieval Augmented Generation) para proporcionar respuestas precisas basadas en la documentación de la empresa. Implementa embeddings con OpenAI, búsqueda vectorial con Pinecone y generación de respuestas con GPT-4. Incluye interfaz web responsive y API REST.',
 ARRAY['Python', 'FastAPI', 'OpenAI', 'Pinecone', 'LangChain', 'React', 'WebSockets'],
 'AI',
 false,
 NULL,
 NULL,
 '{"queries_handled": "5000+", "satisfaction_rate": "92%", "response_time": "< 3s"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  tech_stack = EXCLUDED.tech_stack,
  category = EXCLUDED.category,
  featured = EXCLUDED.featured,
  live_url = EXCLUDED.live_url,
  github_url = EXCLUDED.github_url,
  metrics = EXCLUDED.metrics,
  updated_at = NOW();

-- Verificar datos insertados
SELECT id, slug, title, category, featured, created_at 
FROM projects 
ORDER BY featured DESC, created_at DESC;
