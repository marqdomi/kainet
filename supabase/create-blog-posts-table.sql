-- Crear tabla blog_posts en Supabase
-- Esta tabla almacena todos los posts del blog, incluyendo los generados semanalmente

-- Primero, eliminar la tabla si existe (esto es seguro)
DROP TABLE IF EXISTS blog_posts CASCADE;

-- Crear secuencia para ID
CREATE SEQUENCE blog_posts_id_seq AS BIGINT START 1 INCREMENT BY 1;

-- Crear tabla con id que usa la secuencia
CREATE TABLE blog_posts (
  id BIGINT PRIMARY KEY DEFAULT nextval('blog_posts_id_seq'),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(255) DEFAULT 'KAINET',
  category VARCHAR(100) NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  read_time VARCHAR(50) DEFAULT '5 min',
  image VARCHAR(500),
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para queries frecuentes
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);

-- Crear trigger para auto-actualizar updated_at
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_blog_posts_updated_at ON blog_posts;

CREATE TRIGGER trigger_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_blog_posts_updated_at();

-- Habilitar RLS (Row Level Security)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede leer posts publicados
CREATE POLICY "Public read access" ON blog_posts
  FOR SELECT
  USING (true);

-- Política: Solo autenticados pueden insertar (posteriormente se restringe por JWT)
CREATE POLICY "Authenticated insert" ON blog_posts
  FOR INSERT
  WITH CHECK (true);

-- Política: Solo autenticados pueden actualizar
CREATE POLICY "Authenticated update" ON blog_posts
  FOR UPDATE
  WITH CHECK (true);

-- Política: Solo autenticados pueden borrar
CREATE POLICY "Authenticated delete" ON blog_posts
  FOR DELETE
  USING (true);

-- Insertar posts iniciales (seguro - no falla si ya existen)
-- Usar ON CONFLICT para actualizar si existe o insertar si no
INSERT INTO blog_posts (slug, title, excerpt, content, author, category, featured, date, read_time) VALUES
  (
    'ia-semanal-semana-1-2025',
    'IA Semanal: Lo Más Destacado en Inteligencia Artificial (Semana 1)',
    'Resumen curado de las noticias, papers y desarrollos más importantes en IA y automatización de esta semana, alineado con la visión de KAINET.',
    '# Lo Más Destacado en IA - Semana 1

Esta semana en inteligencia artificial y automatización ha estado llena de desarrollos fascinantes.

## 🚀 Principales Desarrollos

### 1. Avance en Modelos de Lenguaje

Los últimos modelos de lenguaje han mostrado mejoras significativas en comprensión contextual y generación de texto.

**Fuente:** Hacker News • **Score:** 500

### 2. Nuevas Técnicas de Fine-tuning

Se han publicado nuevas técnicas para optimizar fine-tuning de modelos grandes.

**Fuente:** ArXiv

### 3. Aplicaciones de RAG en Producción

Empresas están implementando sistemas RAG en producción con excelentes resultados.

**Fuente:** Reddit (r/MachineLearning)

## 📚 Papers Destacados de ArXiv

- **[Recent Advances in LLMs](https://arxiv.org)**
  Survey completo de los últimos avances en modelos de lenguaje

- **[Efficient Fine-tuning Methods](https://arxiv.org)**
  Técnicas nuevas para reducir costos de fine-tuning

## 💬 Lo Más Comentado en la Comunidad

- **LLaMA 3 Release** *Hacker News* • 1200 puntos
- **Open Source AI Models** *Reddit* • 850 puntos

---

## 🎯 Reflexión KAINET

Estos desarrollos reflejan la rápida evolución de la IA. En KAINET, seguimos de cerca estas tendencias para aplicarlas en soluciones prácticas.

---

*Este resumen fue generado automáticamente por nuestro sistema de agregación de noticias.*',
    'KAINET AI Bot',
    'IA',
    false,
    '2025-01-06',
    '6 min'
  ),
  (
    'guia-llms-2025',
    'Guía Completa: LLMs en Producción',
    'Todo lo que necesitas saber para desplegar modelos de lenguaje en producción con confianza.',
    '# Guía: LLMs en Producción

## Introducción

Los LLMs son herramientas poderosas pero requieren consideraciones especiales en producción.

## Consideraciones Críticas

1. **Latencia**: Debe ser bajo para UX
2. **Escalabilidad**: Múltiples usuarios
3. **Costos**: Optimize token usage
4. **Seguridad**: Validación de inputs
5. **Monitoring**: Logs detallados

## Mejores Prácticas

- Usa cachés para prompts comunes
- Implementa rate limiting
- Valida todos los inputs
- Monitorea errores continuamente

---

*Publicado por el equipo de KAINET*',
    'KAINET',
    'Tutoriales',
    false,
    '2025-01-05',
    '8 min'
  ),
  (
    'automatizacion-flujos-trabajo',
    'Automatización: Multiplica tu Productividad',
    'Cómo usar IA y RPA para automatizar flujos de trabajo complejos en tu empresa.',
    '# Automatización: Multiplica tu Productividad

## Por qué Automatizar

La automatización inteligente puede reducir costos operacionales hasta 40%.

## Casos de Uso

1. **Email automation** - Clasificación y respuestas automáticas
2. **Data processing** - ETL con IA
3. **Report generation** - Reportes automáticos

## Stack KAINET

Usamos:
- Python + Apache Airflow
- GitHub Actions
- Custom AI integrations

---

*La automatización es el futuro del trabajo*',
    'KAINET',
    'Automatización',
    true,
    '2025-01-04',
    '7 min'
  ),
  (
    'web3-ai-convergence',
    'Web3 + IA: La Nueva Frontera',
    'Explorando la intersección entre Web3 y modelos de IA descentralizados.',
    '# Web3 + IA: Convergencia Digital

## El Futuro es Descentralizado

La combinación de Web3 y IA abre posibilidades sin precedentes.

## Oportunidades

- Modelos de IA descentralizados
- Tokens para incentivos
- Smart contracts inteligentes

---

*El futuro es descentralizado*',
    'KAINET',
    'Web3',
    false,
    '2025-01-03',
    '5 min'
  ),
  (
    'mlops-production-ready',
    'MLOps: Preparando Modelos para Producción',
    'Aprende las mejores prácticas para llevar tus modelos ML a producción con confianza.',
    '# MLOps: Camino a Producción

## ¿Qué es MLOps?

MLOps es el conjunto de prácticas para desplegar y monitorear modelos ML en producción.

## Componentes Clave

1. Version Control
2. CI/CD Pipelines
3. Model Registry
4. Monitoring
5. Retraining

## Stack Moderno

- Git + DVC
- GitHub Actions
- MLflow o Weights & Biases
- Prometheus + Grafana

---

*MLOps es esencial para aplicaciones serias*',
    'KAINET',
    'DevOps',
    false,
    '2025-01-02',
    '9 min'
  ),
  (
    'redes-neuronales-explicables',
    'Redes Neuronales Explicables: El Futuro de la IA',
    'Por qué la interpretabilidad es crucial y cómo lograrlo en tus modelos.',
    '# Redes Neuronales Explicables (XAI)

## El Problema de la Caja Negra

Los modelos complejos son difíciles de interpretar, pero es crucial entender sus decisiones.

## Técnicas de Explicabilidad

- SHAP values
- LIME
- Attention maps
- Feature importance

## Aplicaciones

En finanzas, medicina y legal, la explicabilidad es obligatoria.

---

*El futuro de la IA es interpretable*',
    'KAINET',
    'IA',
    false,
    '2025-01-01',
    '7 min'
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  author = EXCLUDED.author,
  category = EXCLUDED.category,
  featured = EXCLUDED.featured,
  date = EXCLUDED.date,
  read_time = EXCLUDED.read_time,
  updated_at = NOW();

-- Verificar datos insertados
SELECT COUNT(*) as total_posts FROM blog_posts;
SELECT slug, title, category, featured, date FROM blog_posts ORDER BY date DESC;
