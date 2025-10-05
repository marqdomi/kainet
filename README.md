# KAINET - Portfolio & Product Showcase

![KAINET](https://img.shields.io/badge/KAINET-IA%20%26%20Automatizaci%C3%B3n-00E5FF?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)
![Three.js](https://img.shields.io/badge/Three.js-0.158-000000?style=for-the-badge&logo=three.js)

Página web profesional con experiencias 3D interactivas, showcase de productos y blog técnico sobre IA y automatización.

## 🚀 Stack Tecnológico

- **Framework:** React 18.2 con Vite 5.0
- **3D/Visualización:** Three.js + React Three Fiber + Drei
- **Animaciones:** Framer Motion
- **Estilos:** Tailwind CSS 3.3
- **Post-procesamiento:** @react-three/postprocessing
- **Deploy:** Vercel

## 📁 Estructura del Proyecto

```
kainet-final/
├── public/
│   ├── logo.svg
│   ├── logoletras.svg
│   ├── onlylogo.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── About.jsx              # Sobre nosotros
│   │   ├── BackgroundCanvas.jsx   # Canvas 3D de fondo
│   │   ├── Blog.jsx               # 🆕 Sección de blog
│   │   ├── Contact.jsx            # Formulario de contacto
│   │   ├── Footer.jsx             # Footer con CTAs
│   │   ├── Hero.jsx               # Hero section con logo 3D
│   │   ├── KainetResto.jsx        # 🆕 Showcase de producto
│   │   ├── Logo3D.jsx             # Logo torii animado
│   │   ├── Navbar.jsx             # Navegación principal
│   │   ├── Playground.jsx         # Arte generativo IA
│   │   └── Work.jsx               # Portfolio de proyectos
│   ├── data/
│   │   └── blogPosts.js           # 🆕 Data para blog
│   ├── hoc/
│   │   └── SectionWrapper.jsx     # HOC para animaciones
│   ├── App.jsx                    # App principal
│   ├── App.css
│   ├── index.css                  # Estilos globales
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vercel.json                    # Configuración de rutas
```

## 🎯 Secciones Principales

### 1. **Hero** - Landing con Logo 3D Animado
Torii japonés renderizado con partículas, interactivo con mouse.

### 2. **About** - Proceso de Trabajo
Metodología iterativa y enfoque en prototipos técnicos.

### 3. **Work** - Portfolio de Proyectos
Casos de uso de IA aplicada y visualizaciones 3D.

### 4. **Kainet Resto** 🆕 - Product Showcase
- Features grid animado
- Screenshots carousel
- Demo interactiva
- Estadísticas y CTAs
- Testimonios (opcional)

### 5. **Blog** 🆕 - Noticias & Tutoriales
- Post destacado
- Filtrado por categorías
- Newsletter subscription
- Sistema de posts con data local

### 6. **Playground** - Arte Generativo IA
Generación determinista de visualizaciones 3D basadas en keywords.

### 7. **Contact** - Formulario
Integrado con Formspree, honeypot anti-spam.

## 🛠️ Instalación y Desarrollo

### Prerequisitos
- Node.js 18+ 
- npm o pnpm

### Setup

```bash
# Clonar repositorio
git clone https://github.com/marqdomi/kainet.git
cd kainet-final

# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview de build
npm run preview

# Linting
npm run lint
```

## 📝 Cómo Agregar Contenido

### Agregar un Artículo al Blog

Edita `src/data/blogPosts.js`:

```javascript
export const blogPosts = [
  {
    id: 7, // ID único
    slug: 'mi-nuevo-articulo', // URL-friendly
    title: 'Mi Nuevo Artículo',
    excerpt: 'Descripción breve...',
    author: 'Marco Domínguez',
    date: '2025-10-15',
    readTime: '5 min',
    category: 'IA', // IA | Automatización | Tutoriales | DevOps
    image: '/blog/mi-imagen.jpg', // o placeholder
    featured: false, // solo UN artículo debe ser true
  },
  // ...resto de posts
];
```

### Actualizar Features de Kainet Resto

Edita el array `features` en `src/components/KainetResto.jsx`:

```javascript
const features = [
  {
    icon: '🎯', // Emoji o componente
    title: 'Nueva Feature',
    description: 'Descripción de la funcionalidad...',
  },
  // ...
];
```

### Cambiar Screenshots

Reemplaza URLs en el array `screenshots`:

```javascript
const screenshots = [
  { 
    id: 1, 
    title: 'Dashboard', 
    src: '/screenshots/dashboard.png' // Ruta local o URL
  },
  // ...
];
```

## 🎨 Personalización de Estilos

Colores principales en `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'kainet-black': '#000000',
      'kainet-white': '#EAEAEA',
      'kainet-cyan': '#00E5FF',   // Color principal
      'kainet-blue': '#0D1B3E',
    },
  },
}
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Con Vercel CLI
vercel

# O push a main y auto-deploy
git push origin main
```

### Otras plataformas

```bash
# Build
npm run build

# Los archivos estarán en /dist
```

## ⚡ Optimizaciones Implementadas

- ✅ Lazy loading de componentes pesados (Playground)
- ✅ Code splitting automático con Vite
- ✅ Intersection Observer para carga diferida
- ✅ Suspense boundaries para 3D
- ✅ `prefers-reduced-motion` para accesibilidad
- ✅ Optimización de partículas según device capabilities

## 🔒 Variables de Entorno

Crea `.env.local`:

```env
VITE_FORMSPREE_ENDPOINT=tu_endpoint_formspree
VITE_NEWSLETTER_API=tu_api_newsletter (opcional)
```

## 📊 SEO

- ✅ Meta tags completos (OpenGraph, Twitter Cards)
- ✅ Sitemap.xml dinámico
- ✅ robots.txt configurado
- ✅ Semantic HTML
- ✅ Skip links para accesibilidad
- ✅ Structured data (JSON-LD)

## 🐛 Troubleshooting

### Three.js no renderiza
```bash
# Verificar que WebGL esté disponible
# Abrir consola del navegador y buscar errores de WebGL
```

### Build falla
```bash
# Limpiar cache
rm -rf node_modules dist
npm install
npm run build
```

## 📈 Próximas Mejoras Sugeridas

- [ ] Migrar a TypeScript
- [ ] Implementar testing (Vitest + Testing Library)
- [ ] Agregar CMS headless (Sanity/Contentful)
- [ ] PWA capabilities
- [ ] Internacionalización (i18n)
- [ ] Analytics (Google Analytics / Plausible)
- [ ] Sistema de búsqueda en blog
- [ ] Vista individual de posts con Markdown
- [ ] Comentarios en blog (Disqus/Utterances)

## 📄 Licencia

© 2025 KAINET. Todos los derechos reservados.

## 👤 Autor

**Marco Domínguez**
- LinkedIn: [linkedin.com/in/marcdomibe](https://www.linkedin.com/in/marcdomibe/)
- Email: contacto@kainet.mx

---

Construido con ❤️ usando React + Three.js

