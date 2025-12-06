# KAINET - Soluciones de IA y Automatización

![KAINET](https://img.shields.io/badge/KAINET-IA%20%26%20Automatización-00E5FF?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)

Sitio web profesional de KAINET - empresa mexicana especializada en IA aplicada, automatización y desarrollo de software de alto rendimiento.

🌐 **Live:** [https://kainet.mx](https://kainet.mx)

---

## ✨ Características

### Diseño
- **Design System v3.1** - Sistema de diseño moderno inspirado en Vercel/Linear
- **Tema dual** - Soporte para modo oscuro y claro con detección automática de preferencias
- **Responsivo** - Optimizado para desktop, tablet y móvil
- **Accesible** - WCAG 2.1 AA compliant

### Funcionalidades
- **Blog técnico** - Posts dinámicos desde Supabase
- **Newsletter** - Suscripción con confirmación por email (Resend)
- **Formulario de contacto** - Con validación y notificaciones
- **SEO optimizado** - Meta tags, Open Graph, sitemap

### Performance
- **Lazy loading** - Carga diferida de componentes pesados
- **Code splitting** - División de código por rutas
- **Optimización de assets** - Imágenes y fuentes optimizadas
- **Core Web Vitals** - Puntuación alta en Lighthouse

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|------------|
| **Framework** | React 18.2 + TypeScript |
| **Build** | Vite 5.4 |
| **Estilos** | Tailwind CSS 3.4 + CSS Variables |
| **Animaciones** | Framer Motion |
| **Routing** | React Router 6 |
| **Base de datos** | Supabase (PostgreSQL) |
| **Email** | Resend API |
| **Deploy** | Vercel |
| **Testing** | Vitest + React Testing Library |

---

## 📁 Estructura del Proyecto

```
kainet/
├── api/                    # Serverless functions (Vercel)
│   ├── contact.js          # Formulario de contacto
│   ├── newsletter.js       # Suscripción newsletter
│   └── newsletter-confirm.js
├── docs/                   # Documentación del proyecto
│   ├── DESIGN-SYSTEM.md    # Sistema de diseño
│   ├── REQUIREMENTS.md     # Requerimientos
│   └── PROJECT-VISION.md   # Visión del proyecto
├── public/                 # Assets estáticos
│   ├── blog/               # Imágenes de blog
│   ├── projects/           # Imágenes de proyectos
│   └── *.svg               # Logos
├── scripts/                # Scripts de utilidad
│   ├── migrate-posts-to-supabase.js
│   └── send-newsletter.js
├── src/
│   ├── components/         # Componentes React
│   │   ├── effects/        # Efectos visuales
│   │   ├── loaders/        # Estados de carga
│   │   └── ui/             # Design system (Button, Card, etc.)
│   ├── config/             # Configuración
│   │   └── features.ts     # Feature flags
│   ├── contexts/           # React contexts
│   │   ├── ThemeContext.tsx
│   │   └── EasterEggContext.tsx
│   ├── hooks/              # Custom hooks
│   ├── layouts/            # Layouts de página
│   ├── lib/                # Utilidades externas
│   │   └── supabase.js     # Cliente Supabase
│   ├── pages/              # Páginas de la app
│   ├── styles/             # Estilos globales
│   │   ├── variables.css   # Variables CSS
│   │   ├── buttons.css     # Estilos de botones
│   │   ├── cards.css       # Estilos de tarjetas
│   │   └── motion.css      # Animaciones
│   ├── types/              # TypeScript types
│   └── utils/              # Funciones utilitarias
├── supabase/               # Configuración Supabase
│   └── migrations/         # Migraciones SQL
└── package.json
```

---

## 🚀 Desarrollo Local

### Prerrequisitos
- Node.js 18+
- npm o pnpm

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/marqdomi/kainet.git
cd kainet

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Iniciar servidor de desarrollo
npm run dev
```

### Variables de Entorno

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Resend (para emails)
RESEND_API_KEY=your_resend_key

# Feature Flags
VITE_FEATURE_TRANSITIONS=true
VITE_FEATURE_EASTER_EGGS=true
```

### Scripts Disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run preview   # Preview del build
npm run build     # Build de producción
npm run lint      # Linting con ESLint
npm run test      # Tests con Vitest
```

---

## 📄 Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home - Hero, servicios, proyectos destacados |
| `/nosotros` | Sobre KAINET |
| `/productos` | Productos y soluciones |
| `/servicios` | Servicios ofrecidos |
| `/blog` | Blog técnico |
| `/blog/:slug` | Post individual |
| `/contact` | Formulario de contacto |
| `/kaido` | Landing de producto Kaido |
| `/privacidad` | Política de privacidad |

---

## 🎨 Design System

El proyecto utiliza un sistema de diseño consistente basado en:

### Colores
- **Primary:** Cyan (#00E5FF) - Acento principal
- **Purple:** (#A855F7) - Acento secundario
- **Neutrals:** Escala de grises para texto y fondos

### Componentes UI
- `Button` - Variantes: primary, secondary, outline, ghost
- `Card` - Contenedor con efecto glass
- `Badge` - Etiquetas y tags
- `Input` - Campos de formulario
- `SectionTitle` - Títulos de sección
- `Skeleton` - Estados de carga

### Tipografía
- **Inter** - Fuente principal
- **Poppins** - Títulos y headings

---

## 🔒 Seguridad

- API keys protegidas con variables de entorno
- CORS configurado en Vercel
- Rate limiting en endpoints de API
- Validación de inputs en formularios
- RLS (Row Level Security) en Supabase

---

## 📈 Roadmap

- [ ] Sistema de autenticación para admin
- [ ] Dashboard de analytics
- [ ] Más productos en catálogo
- [ ] Internacionalización (i18n)
- [ ] PWA support

---

## 👨‍💻 Autor

**Marco Domínguez** - [@marqdomi](https://github.com/marqdomi)

---

## 📝 Licencia

Este proyecto es privado y propiedad de KAINET.

---

<p align="center">
  <strong>KAINET</strong> - IA, Automatización y Software de Alto Rendimiento
  <br>
  <a href="https://kainet.mx">kainet.mx</a>
</p>

