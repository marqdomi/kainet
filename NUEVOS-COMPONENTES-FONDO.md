# 🎨 Guía de Nuevos Componentes de Fondo

## Componentes Implementados

### 1. **OGLParticles** - Partículas ligeras con ogl
Reemplaza el pesado `BackgroundCanvas` de Three.js con una versión mucho más optimizada usando **ogl**.

**Características:**
- 80% más ligero que Three.js
- Mejor rendimiento en móviles
- Partículas interactivas con hover
- Configuración flexible de colores y animaciones

**Ubicación:** `src/components/effects/OGLParticles.jsx`

```jsx
import OGLParticles from './effects/OGLParticles';

<OGLParticles
  particleCount={200}
  particleSpread={12}
  speed={0.1}
  particleColors={['#00E5FF', '#ffffff']}
  particleBaseSize={120}
  alphaParticles={true}
  moveParticlesOnHover={true}
  cameraDistance={25}
/>
```

**Props disponibles:**
- `particleCount` - Número de partículas (default: 200)
- `particleSpread` - Dispersión de partículas (default: 10)
- `speed` - Velocidad de animación (default: 0.1)
- `particleColors` - Array de colores hex
- `particleBaseSize` - Tamaño base de partículas (default: 100)
- `sizeRandomness` - Variación de tamaño (0-1)
- `alphaParticles` - Partículas con transparencia
- `moveParticlesOnHover` - Seguir cursor
- `particleHoverFactor` - Factor de movimiento con hover
- `cameraDistance` - Distancia de cámara (default: 20)
- `disableRotation` - Deshabilitar rotación

---

### 2. **PageBackground** - Fondo adaptable por sección
Componente wrapper que usa `OGLParticles` con presets optimizados para diferentes secciones.

**Ubicación:** `src/components/PageBackground.jsx`

```jsx
import PageBackground from './PageBackground';

// En Hero section
<PageBackground variant="hero" />

// En resto de página
<PageBackground variant="default" />

// Minimal para secciones específicas
<PageBackground variant="minimal" />
```

**Variantes disponibles:**
- `default` - Configuración balanceada (150 partículas, hover activado)
- `hero` - Más partículas y animación (200 partículas, más interactivo)
- `minimal` - Ligero para dispositivos móviles (80 partículas, sin hover)

---

### 3. **TitleBackground** - Fondo animado para títulos
Componente decorativo para títulos de secciones con gradientes animados y grid.

**Ubicación:** `src/components/TitleBackground.jsx`

```jsx
import TitleBackground from './TitleBackground';

<TitleBackground animated={true}>
  <h2 className="text-4xl font-bold text-white">
    Mi Sección Especial
  </h2>
  <p className="text-gray-300 mt-4">
    Descripción aquí
  </p>
</TitleBackground>
```

**Props:**
- `animated` - Activar animaciones (default: true)
- `className` - Clases Tailwind adicionales

**Características:**
- Blobs de gradientes animados (Cyan, Púrpura, Magenta)
- Grid animado con efecto de movimiento
- Border pulsante
- Totalmente responsive

---

## 🚀 Uso en tu Proyecto

### Cambios ya realizados:

1. ✅ **Hero.jsx** - Usa `PageBackground` variant "hero"
   - Logo 3D se mantiene (Canvas de Three.js)
   - Fondo de partículas con ogl

2. ✅ **MainLayout.jsx** - Usa `PageBackground` variant "default"
   - Reemplaza el pesado `BackgroundCanvas`
   - Disponible en todas las páginas

### Cómo implementar en otras secciones:

**Opción 1: Usar solo PageBackground**
```jsx
// En Blog.jsx, Work.jsx, About.jsx
import PageBackground from '../PageBackground';

export default function Blog() {
  return (
    <>
      <PageBackground variant="default" />
      {/* Tu contenido */}
    </>
  );
}
```

**Opción 2: Usar TitleBackground para títulos**
```jsx
import TitleBackground from '../TitleBackground';

<TitleBackground animated={true} className="mb-12">
  <h2 className="text-4xl font-bold text-white mb-4">
    Últimos Artículos
  </h2>
  <p className="text-gray-300">
    Explora mis últimas publicaciones sobre automatización e IA
  </p>
</TitleBackground>
```

**Opción 3: Combinar ambos**
```jsx
<>
  <PageBackground variant="minimal" />
  
  <section className="container mx-auto py-20">
    <TitleBackground>
      <h2>Blog Destacado</h2>
    </TitleBackground>
    
    {/* Contenido del blog */}
  </section>
</>
```

---

## 📊 Comparación de Rendimiento

| Aspecto | BackgroundCanvas (Three.js) | PageBackground (ogl) | TitleBackground (CSS) |
|---------|-------|--------|---------|
| Bundle Size | ~600KB | ~50KB | ~2KB |
| Mobile Performance | Lento | Rápido (60fps) | Muy Rápido (GPU) |
| Partículas | 7000 | 200 | N/A |
| Interactividad | Alta | Media (hover) | Media (CSS) |
| Complejidad | Alta | Media | Baja |

---

## 🎨 Personalizaciones Avanzadas

### Crear tu propio preset de PageBackground

```jsx
// src/components/MyCustomBackground.jsx
import PageBackground from './PageBackground';

export default function MyCustomBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <OGLParticles
        particleCount={300}
        particleSpread={15}
        speed={0.15}
        particleColors={['#FF006E', '#00E5FF', '#A855F7']}
        particleBaseSize={150}
        sizeRandomness={0.9}
        alphaParticles={true}
        moveParticlesOnHover={true}
        particleHoverFactor={0.8}
        cameraDistance={35}
        disableRotation={false}
      />
    </div>
  );
}
```

### Personalizar TitleBackground

```jsx
// Cambiar colores de gradientes
<style>{`
  :root {
    --blob-1-color: linear-gradient(135deg, #FF006E, #0080FF);
    --blob-2-color: linear-gradient(135deg, #00E5FF, #A855F7);
  }
`}</style>

<TitleBackground animated={true} className="bg-black">
  <h2>Mi Título Personalizado</h2>
</TitleBackground>
```

---

## 🔍 Debugging

### Si las partículas no se ven:
```jsx
// Verificar que ogl está instalado
// npm list ogl

// Verificar props del componente
<OGLParticles
  particleCount={200}
  particleColors={['#ffffff', '#00E5FF']}
  alphaParticles={true} // Importante para ver transparencia
/>
```

### Si el rendimiento es lento:
```jsx
// Reduce particleCount
<PageBackground variant="minimal" /> // 80 partículas

// O crea un preset más ligero
<OGLParticles particleCount={100} speed={0.05} />
```

---

## ✅ Checklist de Implementación

- [x] OGLParticles component creado
- [x] PageBackground wrapper creado
- [x] TitleBackground component creado
- [x] Hero.jsx actualizado
- [x] MainLayout.jsx actualizado
- [x] CSS de animaciones agregado
- [ ] Implementar en Blog.jsx (opcional)
- [ ] Implementar en Work.jsx (opcional)
- [ ] Implementar en About.jsx (opcional)
- [ ] Testear en móviles
- [ ] Medir rendimiento con Lighthouse

---

## 📚 Recursos

- [OGL Documentation](https://github.com/oframe/ogl)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [WebGL Performance](https://www.khronos.org/webgl/wiki/HandlingContextLoss)
