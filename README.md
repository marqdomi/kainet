# KAINET - Portfolio & Product Showcase

![KAINET](https://img.shields.io/badge/KAINET-IA%20%26%20Automatizaci%C3%B3n-00E5FF?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)
![Three.js](https://img.shields.io/badge/Three.js-0.158-000000?style=for-the-badge&logo=three.js)
![Accessibility](https://img.shields.io/badge/WCAG-2.1%20AA-green?style=for-the-badge)

Página web profesional con experiencias 3D interactivas, efectos visuales cyberpunk-japoneses, showcase de productos y blog técnico sobre IA y automatización.

## ✨ Nuevas Características (v2.0)

### Efectos Visuales Japoneses-Cyberpunk
- **Partículas Kanji 3D**: Caracteres japoneses tech-themed que forman el torii del logo
- **Efectos Glitch**: Animaciones RGB split en textos y elementos interactivos
- **Tarjetas Holográficas**: Efecto shimmer que sigue el cursor con scanning lines
- **Líneas de Circuito**: Patrones decorativos con energía fluyendo
- **Transiciones Cinematográficas**: Wipe effects con motion blur entre páginas
- **Loader Personalizado**: Torii animado con mensajes rotativos en japonés/inglés

### Micro-interacciones
- **Ripple Effects**: Ondas expansivas en botones y tarjetas al hacer clic
- **Parallax Mejorado**: Múltiples capas con motion blur en scroll rápido
- **Tipografía Japonesa**: Prefijos kanji en títulos y comillas estilo japonés
- **Digital Counters**: Números con efecto monoespaciado y glow

### Easter Eggs Interactivos
- **Código Konami**: ↑↑↓↓←→←→BA activa Matrix Rain con caracteres japoneses
- **Triple-Click Logo**: Animación especial del torii con mensaje oculto
- **Fechas Especiales**: Efectos temáticos en Año Nuevo y aniversario
- **Alternativa Teclado**: Shift+K para activar easter eggs sin mouse

### Accesibilidad & Performance
- **Modo Alto Contraste**: Detección automática y ajustes visuales
- **Reduced Motion**: Respeto total a preferencias de movimiento reducido
- **Navegación por Teclado**: Todos los efectos accesibles por teclado
- **Degradación Elegante**: Ajuste automático según capacidad del dispositivo
- **Monitor de FPS**: Reducción automática de efectos si FPS < 45

## 🚀 Stack Tecnológico

- **Framework:** React 18.2 con Vite 5.0
- **3D/Visualización:** Three.js + React Three Fiber + Drei
- **Animaciones:** Framer Motion
- **Estilos:** Tailwind CSS 3.3 + CSS Animations
- **Post-procesamiento:** @react-three/postprocessing
- **Testing:** Vitest + React Testing Library
- **Deploy:** Vercel

## 🌐 Compatibilidad de Navegadores

| Navegador | Versión Mínima | Notas |
|-----------|----------------|-------|
| Chrome | 90+ | ✅ Soporte completo |
| Firefox | 88+ | ✅ Soporte completo |
| Safari | 14+ | ✅ Soporte completo (14.1+ para backdrop-filter) |
| Edge | 90+ | ✅ Soporte completo |
| Mobile Safari | iOS 14+ | ✅ Efectos optimizados para móvil |
| Chrome Android | 90+ | ✅ Efectos optimizados para móvil |

**Fallbacks implementados:**
- Safari < 14.1: Border sólido en lugar de backdrop-filter
- Dispositivos móviles: Reducción automática de partículas (200 → 80)
- GPU limitada: Desactivación de bloom y efectos pesados
- Reduced Motion: Fade simple en lugar de wipe transitions

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
│   │   ├── effects/                    # ✨ Efectos visuales
│   │   │   ├── CircuitLines.jsx        # Líneas de circuito animadas
│   │   │   ├── GlitchText.jsx          # Efecto glitch en texto
│   │   │   ├── HolographicCard.jsx     # Tarjetas holográficas
│   │   │   ├── KanjiParticle.jsx       # Partículas kanji 3D
│   │   │   ├── MatrixRain.jsx          # Easter egg Matrix
│   │   │   ├── PageTransition.jsx      # Transiciones de página
│   │   │   ├── SakuraPetals.jsx        # Easter egg pétalos
│   │   │   ├── Fireworks.jsx           # Easter egg fuegos artificiales
│   │   │   └── ToriiAnimation.jsx      # Easter egg torii
│   │   ├── loaders/                    # ✨ Estados de carga
│   │   │   ├── ToriiLoader.jsx         # Loader principal
│   │   │   └── ToriiLoaderMini.jsx     # Loader mini para botones
│   │   ├── ui/                         # Design system
│   │   │   ├── Badge.jsx               # ✨ Con kanji opcional
│   │   │   ├── Button.jsx              # ✨ Con ripple effect
│   │   │   ├── Card.jsx                # ✨ Variante holográfica
│   │   │   ├── DigitalCounter.jsx      # Contador digital
│   │   │   ├── Input.jsx
│   │   │   ├── SectionTitle.jsx
│   │   │   └── Skeleton.jsx
│   │   ├── About.jsx
│   │   ├── BackgroundCanvas.jsx        # ✨ Con partículas kanji
│   │   ├── Blog.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── KainetResto.jsx
│   │   ├── Logo3D.jsx
│   │   ├── Navbar.jsx
│   │   ├── Playground.jsx
│   │   └── Work.jsx
│   ├── config/                         # ✨ Configuración
│   │   └── features.js                 # Feature flags
│   ├── contexts/                       # ✨ Contextos React
│   │   └── EasterEggContext.jsx        # Estado de easter eggs
│   ├── data/
│   │   └── blogPosts.js
│   ├── hoc/
│   │   └── SectionWrapper.jsx
│   ├── hooks/                          # ✨ Custom hooks
│   │   ├── useEasterEggs.js            # Hook para easter eggs
│   │   ├── useParallax.js              # Parallax básico
│   │   ├── useParallaxScroll.js        # Parallax mejorado
│   │   └── useReducedMotion.js         # Detección reduced motion
│   ├── styles/                         # ✨ Estilos globales
│   │   ├── animations.css              # Keyframes CSS
│   │   └── variables.css               # Variables CSS
│   ├── utils/                          # ✨ Utilidades
│   │   ├── easterEggs.js               # Manager de easter eggs
│   │   ├── kanjiLibrary.js             # Biblioteca de kanji
│   │   ├── performanceMonitor.js       # Monitor de FPS
│   │   ├── readTime.js                 # Cálculo tiempo lectura
│   │   └── sectionKanji.js             # Mapeo kanji-secciones
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .kiro/                              # ✨ Especificaciones
│   └── specs/
│       └── japanese-cyberpunk-enhancements/
│           ├── requirements.md
│           ├── design.md
│           └── tasks.md
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── vitest.config.js                    # ✨ Configuración tests
└── vercel.json
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

## ⚡ Optimizaciones de Performance

### Métricas Objetivo
| Métrica | Objetivo | Crítico |
|---------|----------|---------|
| Lighthouse Score | 98+ | 95+ |
| FPS (Desktop) | 60 | 45+ |
| FPS (Mobile) | 55+ | 40+ |
| Bundle Size | <250KB | <300KB |
| Time to Interactive | <2s | <3s |
| First Contentful Paint | <1s | <1.5s |

### Técnicas Implementadas

**Code Splitting & Lazy Loading**
- ✅ Lazy loading de componentes de efectos con React.lazy()
- ✅ Suspense boundaries con fallbacks apropiados
- ✅ Code splitting automático con Vite
- ✅ Reducción de ~30KB en bundle inicial

**Optimización de Animaciones**
- ✅ Solo `transform` y `opacity` (GPU-accelerated)
- ✅ `will-change` hints para elementos animados
- ✅ RequestAnimationFrame para throttling a 60fps
- ✅ IntersectionObserver para animar solo elementos visibles

**Optimización 3D**
- ✅ InstancedMesh para partículas kanji (1 draw call vs 200)
- ✅ Reducción automática de partículas en móvil (200 → 80)
- ✅ Frustum culling para elementos fuera de cámara
- ✅ Texture memoization para kanji

**Degradación Automática**
- ✅ Monitor de FPS en tiempo real
- ✅ Reducción de efectos si FPS < 45 por 3 segundos
- ✅ Detección de GPU débil
- ✅ Desactivación de bloom en dispositivos limitados

**Accesibilidad**
- ✅ `prefers-reduced-motion` respetado en todos los efectos
- ✅ Fade simple en lugar de wipe si reduced motion
- ✅ Desactivación de parallax si reduced motion
- ✅ Partículas estáticas si reduced motion

## 🔒 Variables de Entorno

Crea `.env.local`:

```env
# Formularios
VITE_FORMSPREE_ENDPOINT=tu_endpoint_formspree
VITE_NEWSLETTER_API=tu_api_newsletter (opcional)

# Feature Flags (opcional - por defecto todos true)
VITE_FEATURE_KANJI=true              # Partículas kanji 3D
VITE_FEATURE_GLITCH=true             # Efectos glitch
VITE_FEATURE_HOLO=true               # Tarjetas holográficas
VITE_FEATURE_TRANSITIONS=true        # Transiciones de página
VITE_FEATURE_EASTER_EGGS=true        # Easter eggs interactivos
```

### Feature Flags

Los feature flags permiten habilitar/deshabilitar efectos sin redeployar:

```javascript
// src/config/features.js
export const features = {
  kanjiParticles: import.meta.env.VITE_FEATURE_KANJI === 'true',
  glitchEffects: import.meta.env.VITE_FEATURE_GLITCH === 'true',
  holographicCards: import.meta.env.VITE_FEATURE_HOLO === 'true',
  pageTransitions: import.meta.env.VITE_FEATURE_TRANSITIONS === 'true',
  easterEggs: import.meta.env.VITE_FEATURE_EASTER_EGGS === 'true'
};
```

Uso en componentes:

```jsx
import { features } from './config/features';

{features.glitchEffects && <GlitchText>KAINET</GlitchText>}
```

## ♿ Características de Accesibilidad

### WCAG 2.1 AA Compliance

**Navegación por Teclado**
- ✅ Tab order lógico en todos los elementos interactivos
- ✅ Focus indicators visibles (outline cyan 2px)
- ✅ Skip links para navegación rápida
- ✅ Alternativas de teclado para easter eggs (Shift+K)

**Soporte de Lectores de Pantalla**
- ✅ Elementos decorativos marcados con `aria-hidden="true"`
- ✅ Loaders con `role="status"` y `aria-live="polite"`
- ✅ Anuncios de cambio de página con `aria-live`
- ✅ Labels descriptivos en todos los controles

**Contraste de Color**
- ✅ Texto normal: 4.5:1 mínimo (actual: 19.56:1)
- ✅ Texto grande: 3:1 mínimo (actual: 11.23:1)
- ✅ Componentes UI: 3:1 mínimo (actual: 7.89:1)
- ✅ Modo alto contraste automático

**Preferencias de Usuario**
- ✅ `prefers-reduced-motion`: Desactiva animaciones
- ✅ `prefers-contrast: high`: Aumenta contraste y desactiva efectos sutiles
- ✅ Detección automática de preferencias del sistema

### Modo Alto Contraste

Activación automática cuando el usuario tiene configurado alto contraste en su sistema:

```css
@media (prefers-contrast: high) {
  :root {
    --cyan-neon: #00FFFF;
    --text-primary: #FFFFFF;
    --gray-700: #000000;
  }
  
  .glitch-effect,
  .holographic-overlay {
    display: none;
  }
  
  .card {
    border-width: 2px;
  }
}
```

### Testing de Accesibilidad

```bash
# Ejecutar tests de accesibilidad
npm run test:a11y

# Lighthouse audit
npm run lighthouse
```

## 📊 SEO

- ✅ Meta tags completos (OpenGraph, Twitter Cards)
- ✅ Sitemap.xml dinámico
- ✅ robots.txt configurado
- ✅ Semantic HTML
- ✅ Skip links para accesibilidad
- ✅ Structured data (JSON-LD)
- ✅ Alt text en todas las imágenes
- ✅ Heading hierarchy correcta (h1 → h2 → h3)

## 🐛 Troubleshooting

### Three.js no renderiza

**Síntoma:** Canvas 3D aparece negro o no se ve nada

**Soluciones:**
```bash
# 1. Verificar que WebGL esté disponible
# Abrir consola del navegador y ejecutar:
# const canvas = document.createElement('canvas');
# const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
# console.log(gl ? 'WebGL disponible' : 'WebGL no disponible');

# 2. Verificar errores en consola
# Buscar mensajes de error relacionados con Three.js o WebGL

# 3. Probar en otro navegador
# Safari a veces tiene problemas con WebGL 2.0
```

### Efectos visuales no se ven

**Síntoma:** Glitch, holográfico u otros efectos no funcionan

**Causas posibles:**
1. **Reduced Motion activado**: Verifica en Preferencias del Sistema
2. **Feature flags desactivados**: Revisa `.env.local`
3. **GPU limitada**: El sistema puede estar reduciendo efectos automáticamente
4. **FPS bajo**: Monitor de performance desactiva efectos si FPS < 45

**Soluciones:**
```bash
# Verificar feature flags
cat .env.local

# Forzar activación de efectos (desarrollo)
# En .env.local, asegurar que todos sean 'true'
VITE_FEATURE_KANJI=true
VITE_FEATURE_GLITCH=true
VITE_FEATURE_HOLO=true

# Reiniciar servidor de desarrollo
npm run dev
```

### Performance lenta / FPS bajo

**Síntoma:** Animaciones entrecortadas, scroll lento

**Soluciones:**
```bash
# 1. Verificar FPS en consola
# El monitor de performance imprime FPS cada segundo

# 2. Reducir manualmente partículas
# En BackgroundCanvas.jsx, cambiar:
# count={200} → count={100}

# 3. Desactivar efectos pesados
# En .env.local:
VITE_FEATURE_KANJI=false  # Desactiva partículas 3D

# 4. Verificar extensiones del navegador
# Algunas extensiones pueden afectar performance
# Probar en modo incógnito
```

### Build falla

**Síntoma:** `npm run build` termina con error

**Soluciones:**
```bash
# 1. Limpiar cache y reinstalar
rm -rf node_modules dist .vite
npm install
npm run build

# 2. Verificar versión de Node
node --version  # Debe ser 18+

# 3. Verificar errores de TypeScript/ESLint
npm run lint

# 4. Build con más información
npm run build -- --debug

# 5. Verificar espacio en disco
df -h  # Linux/Mac
```

### Easter eggs no funcionan

**Síntoma:** Código Konami o triple-click no activan efectos

**Verificaciones:**
1. **Feature flag**: `VITE_FEATURE_EASTER_EGGS=true` en `.env.local`
2. **Secuencia correcta**: ↑↑↓↓←→←→BA (usar flechas del teclado, luego B y A)
3. **Triple-click**: Hacer clic 3 veces rápido en el logo (< 500ms entre clicks)
4. **Alternativa teclado**: Shift+K para activar animación del torii

**Debug:**
```javascript
// En consola del navegador:
localStorage.getItem('kainet_easter_eggs')
// Debe mostrar array de easter eggs descubiertos
```

### Transiciones de página no funcionan

**Síntoma:** Cambio de página es instantáneo sin animación

**Causas:**
1. **Reduced Motion**: Sistema tiene `prefers-reduced-motion: reduce`
2. **Feature flag**: `VITE_FEATURE_TRANSITIONS=false`
3. **React Router**: Problema con configuración de rutas

**Soluciones:**
```bash
# Verificar que PageTransition esté envolviendo Routes
# En App.jsx debe haber:
# <PageTransition>
#   <Routes>...</Routes>
# </PageTransition>

# Verificar feature flag
grep VITE_FEATURE_TRANSITIONS .env.local
```

### Errores de hydration (SSR)

**Síntoma:** Warnings sobre mismatch entre servidor y cliente

**Solución:**
```javascript
// Usar useEffect para código que solo debe correr en cliente
useEffect(() => {
  // Código que usa window, document, etc.
}, []);

// O verificar si estamos en el navegador
if (typeof window !== 'undefined') {
  // Código del navegador
}
```

### Tests fallan

**Síntoma:** `npm run test` muestra errores

**Soluciones:**
```bash
# 1. Verificar que vitest esté instalado
npm list vitest

# 2. Ejecutar tests en modo watch para debug
npm run test -- --watch

# 3. Ejecutar test específico
npm run test -- src/components/effects/GlitchText.test.jsx

# 4. Limpiar cache de tests
npm run test -- --clearCache

# 5. Verificar setup de tests
cat src/test/setup.js
```

## 🎨 Uso de Componentes Nuevos

### GlitchText

Aplica efecto glitch cyberpunk a texto:

```jsx
import GlitchText from './components/effects/GlitchText';

// Glitch en hover
<GlitchText trigger="hover" intensity="medium">
  KAINET
</GlitchText>

// Glitch permanente
<GlitchText trigger="always" intensity="high" duration={500}>
  ERROR
</GlitchText>

// Glitch en click
<GlitchText trigger="once" intensity="low">
  Click me
</GlitchText>
```

### HolographicCard

Tarjeta con efecto holográfico que sigue el cursor:

```jsx
import HolographicCard from './components/effects/HolographicCard';

<HolographicCard 
  variant="featured" 
  holographic 
  scanningLine 
  rippleOnClick
>
  <h3>Project Title</h3>
  <p>Description</p>
</HolographicCard>
```

### CircuitLines

Líneas de circuito decorativas con partículas animadas:

```jsx
import CircuitLines from './components/effects/CircuitLines';

// Patrón grid
<CircuitLines pattern="grid" density="medium" animated />

// Patrón orgánico
<CircuitLines pattern="organic" density="high" animated />

// Patrón torii
<CircuitLines pattern="torii" density="low" animated={false} />
```

### ToriiLoader

Loader personalizado con torii animado:

```jsx
import ToriiLoader from './components/loaders/ToriiLoader';

// Loader grande con mensaje
<ToriiLoader size="lg" showMessage />

// Loader pequeño sin mensaje
<ToriiLoader size="sm" showMessage={false} />

// Loader con mensaje personalizado
<ToriiLoader size="md" message="Cargando datos..." />
```

### Badge con Kanji

Badge con prefijo kanji opcional:

```jsx
import Badge from './components/ui/Badge';

// Kanji automático basado en texto
<Badge variant="default" kanji>AI</Badge>

// Kanji específico por categoría
<Badge variant="purple" kanji="Automation">
  Automatización
</Badge>

// Badge destacado con glow
<Badge variant="default" featured>
  Featured
</Badge>
```

### Button con Efectos

Botón mejorado con ripple y loading state:

```jsx
import Button from './components/ui/Button';

// Botón primario con ripple
<Button variant="primary" onClick={handleClick}>
  Click me
</Button>

// Botón con loading state
<Button variant="secondary" loading>
  Guardando...
</Button>

// Botón ghost
<Button variant="ghost" size="sm">
  Cancel
</Button>
```

### Hooks Personalizados

**useParallaxScroll** - Parallax mejorado con motion blur:

```jsx
import useParallaxScroll from './hooks/useParallaxScroll';

const { offset, blur, ref } = useParallaxScroll({ 
  speed: 0.5,
  blurThreshold: 10,
  maxBlur: 3
});

<div 
  ref={ref}
  style={{ 
    transform: `translateY(${offset}px)`,
    filter: `blur(${blur}px)`
  }}
>
  Parallax content
</div>
```

**useReducedMotion** - Detecta preferencia de movimiento reducido:

```jsx
import useReducedMotion from './hooks/useReducedMotion';

const prefersReducedMotion = useReducedMotion();

if (prefersReducedMotion) {
  // Desactivar animaciones
}
```

**useEasterEggs** - Gestiona easter eggs:

```jsx
import { useEasterEggs } from './hooks/useEasterEggs';

const { 
  showMatrixRain, 
  showToriiAnimation,
  handleLogoClick 
} = useEasterEggs();

<Logo onClick={handleLogoClick} />
```

## 📈 Próximas Mejoras Sugeridas

- [ ] Migrar a TypeScript
- [x] ~~Implementar testing (Vitest + Testing Library)~~ ✅ Completado
- [ ] Agregar CMS headless (Sanity/Contentful)
- [ ] PWA capabilities
- [ ] Internacionalización (i18n)
- [ ] Analytics (Google Analytics / Plausible)
- [ ] Sistema de búsqueda en blog
- [ ] Vista individual de posts con Markdown
- [ ] Comentarios en blog (Disqus/Utterances)
- [ ] Dark/Light mode toggle (actualmente solo dark)
- [ ] Más easter eggs y achievements
- [ ] Exportar componentes como librería NPM

## 📄 Licencia

© 2025 KAINET. Todos los derechos reservados.

## 👤 Autor

**Marco Domínguez**
- LinkedIn: [linkedin.com/in/marcdomibe](https://www.linkedin.com/in/marcdomibe/)
- Email: contacto@kainet.mx

---

Construido con ❤️ usando React + Three.js

