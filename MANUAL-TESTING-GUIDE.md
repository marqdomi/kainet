# Guía de Testing Manual - Japanese Cyberpunk Enhancements

**Estado:** ✅ Todas las features habilitadas en `.env.local`  
**Comando:** `npm run dev`  
**URL:** http://localhost:5173

---

## 🎯 Checklist de Testing Rápido

### 1. Efectos Visuales Básicos (2 min)

#### Background Canvas con Kanji Particles
- [ ] **Qué ver:** Partículas de kanji flotando en el fondo
- [ ] **Cómo probar:** Mueve el cursor sobre las partículas
- [ ] **Esperado:** Las partículas se alejan del cursor (efecto magnético)
- [ ] **Feature flag:** `VITE_FEATURE_KANJI=true`

#### Circuit Lines
- [ ] **Qué ver:** Líneas de circuito animadas en el fondo
- [ ] **Cómo probar:** Observa las líneas moviéndose
- [ ] **Esperado:** Partículas viajando por las líneas
- [ ] **Feature flag:** `VITE_FEATURE_CIRCUITS=true`

---

### 2. Efectos de Texto (2 min)

#### Glitch Text
- [ ] **Dónde:** Títulos principales (Hero, secciones)
- [ ] **Qué ver:** Efecto de glitch RGB en hover
- [ ] **Cómo probar:** Pasa el cursor sobre los títulos
- [ ] **Esperado:** Separación RGB y clip-path animado
- [ ] **Feature flag:** `VITE_FEATURE_GLITCH=true`

#### Typography Enhancements
- [ ] **Dónde:** Títulos de sección
- [ ] **Qué ver:** Kanji decorativos antes de los títulos
- [ ] **Esperado:** Kanji relevante al contexto (技 para tech, 創 para creatividad)
- [ ] **Feature flag:** `VITE_FEATURE_TYPOGRAPHY=true`

---

### 3. Componentes Interactivos (3 min)

#### Holographic Cards
- [ ] **Dónde:** Cards de proyectos, servicios
- [ ] **Qué ver:** Efecto holográfico que sigue el cursor
- [ ] **Cómo probar:** 
  - Mueve el cursor sobre una card
  - Haz click en la card
- [ ] **Esperado:** 
  - Shimmer siguiendo el cursor
  - Efecto ripple al hacer click
- [ ] **Feature flag:** `VITE_FEATURE_HOLO=true`

#### Enhanced Buttons
- [ ] **Dónde:** Todos los botones del sitio
- [ ] **Qué ver:** Efectos mejorados
- [ ] **Cómo probar:** 
  - Hover sobre botones
  - Click en botones
- [ ] **Esperado:** 
  - Ripple effect al hacer click
  - Animaciones suaves
- [ ] **Feature flag:** `VITE_FEATURE_ENHANCED_UI=true`

#### Enhanced Badges
- [ ] **Dónde:** Tags de tecnologías, categorías
- [ ] **Qué ver:** Kanji prefijos en badges
- [ ] **Esperado:** Badges con estilo cyberpunk
- [ ] **Feature flag:** `VITE_FEATURE_ENHANCED_UI=true`

---

### 4. Transiciones de Página (2 min)

#### Page Transitions
- [ ] **Cómo probar:** Navega entre páginas (Home → About → Blog)
- [ ] **Esperado:** Efecto de wipe con gradiente al cambiar de página
- [ ] **Feature flag:** `VITE_FEATURE_TRANSITIONS=true`

---

### 5. Parallax Scrolling (2 min)

#### Enhanced Parallax
- [ ] **Dónde:** Todas las secciones
- [ ] **Cómo probar:** Scroll por la página
- [ ] **Esperado:** 
  - Elementos se mueven a diferentes velocidades
  - Motion blur sutil en elementos rápidos
- [ ] **Feature flag:** `VITE_FEATURE_PARALLAX=true`

#### Back to Top Button
- [ ] **Cómo probar:** 
  - Scroll hacia abajo
  - Click en el botón con ícono de torii
- [ ] **Esperado:** 
  - Botón aparece después de scroll
  - Animación suave al volver arriba
- [ ] **Feature flag:** `VITE_FEATURE_ENHANCED_UI=true`

---

### 6. Loaders (1 min)

#### Torii Loader
- [ ] **Dónde:** Al cargar páginas o contenido
- [ ] **Qué ver:** Loader con forma de torii
- [ ] **Esperado:** 
  - Animación de rotación
  - Mensajes rotativos en japonés/español
- [ ] **Feature flag:** `VITE_FEATURE_LOADERS=true`

---

### 7. Easter Eggs (5 min) 🥚

#### Konami Code
- [ ] **Cómo activar:** ↑ ↑ ↓ ↓ ← → ← → B A
- [ ] **Esperado:** Efecto Matrix Rain con caracteres japoneses
- [ ] **Cómo desactivar:** Presiona ESC o espera 30 segundos

#### Logo Triple Click
- [ ] **Cómo activar:** Triple click en el logo de Kainet
- [ ] **Esperado:** Animación de torii con partículas
- [ ] **Cómo desactivar:** Presiona ESC o espera 20 segundos

#### Sakura Petals (Fechas especiales)
- [ ] **Cuándo:** 1-15 de abril (Hanami)
- [ ] **Esperado:** Pétalos de sakura cayendo
- [ ] **Nota:** Para probar, cambia la fecha del sistema

#### Fireworks (Año Nuevo)
- [ ] **Cuándo:** 31 dic - 2 ene
- [ ] **Esperado:** Fuegos artificiales
- [ ] **Nota:** Para probar, cambia la fecha del sistema

**Feature flag:** `VITE_FEATURE_EASTER_EGGS=true`

---

## 🎨 Testing de Accesibilidad (5 min)

### Reduced Motion
- [ ] **Cómo probar:** 
  - Abre DevTools
  - Cmd+Shift+P → "Emulate CSS prefers-reduced-motion"
  - Selecciona "prefers-reduced-motion: reduce"
- [ ] **Esperado:** 
  - Animaciones se reducen o eliminan
  - Funcionalidad se mantiene

### High Contrast Mode
- [ ] **Cómo probar:** 
  - Abre DevTools
  - Cmd+Shift+P → "Emulate CSS prefers-contrast"
  - Selecciona "prefers-contrast: more"
- [ ] **Esperado:** 
  - Colores más contrastados
  - Texto más legible

### Keyboard Navigation
- [ ] **Cómo probar:** Usa solo el teclado (Tab, Enter, Escape)
- [ ] **Esperado:** 
  - Todos los elementos interactivos accesibles
  - Focus indicators visibles
  - Easter eggs se pueden cerrar con ESC

---

## 📱 Testing Responsive (3 min)

### Mobile View
- [ ] **Cómo probar:** 
  - Abre DevTools
  - Toggle device toolbar (Cmd+Shift+M)
  - Prueba iPhone, iPad, Android
- [ ] **Esperado:** 
  - Efectos optimizados para móvil
  - Performance mantenido (55+ FPS)
  - Touch interactions funcionando

---

## 🔧 Testing de Performance (3 min)

### Lighthouse
- [ ] **Cómo probar:** 
  - Abre DevTools → Lighthouse
  - Run analysis
- [ ] **Esperado:** 
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 90+

### FPS Monitor
- [ ] **Cómo probar:** 
  - Abre DevTools → Performance
  - Record mientras scrolleas
- [ ] **Esperado:** 
  - Desktop: 60 FPS constante
  - Mobile: 55+ FPS

---

## 🐛 Bugs Conocidos a Verificar

### No Críticos
1. **Feature Flag Tests:** 9 tests fallan (configuración, no código)
2. **HolographicCard Tests:** Warnings en tests (no afecta producción)

---

## 📊 Checklist de Verificación Final

### Funcionalidad
- [ ] Todas las animaciones funcionan
- [ ] No hay errores en consola
- [ ] Transiciones suaves entre páginas
- [ ] Easter eggs se activan correctamente

### Performance
- [ ] Página carga en < 2 segundos
- [ ] Scroll suave sin lag
- [ ] Animaciones a 60 FPS

### Accesibilidad
- [ ] Navegación por teclado funciona
- [ ] Reduced motion respetado
- [ ] Contraste adecuado

### Responsive
- [ ] Se ve bien en móvil
- [ ] Se ve bien en tablet
- [ ] Se ve bien en desktop

---

## 🎮 Comandos Útiles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Ver en red local (para probar en móvil)
npm run dev -- --host

# Build de producción
npm run build

# Preview del build
npm run preview

# Ejecutar tests
npm test -- --run

# Ver coverage de tests
npm test -- --coverage
```

---

## 🔍 Dónde Buscar Cada Feature

### Home Page
- ✅ Background Canvas (kanji particles)
- ✅ Circuit Lines
- ✅ Glitch Text (título hero)
- ✅ Holographic Cards (servicios, proyectos)
- ✅ Enhanced Buttons (CTAs)
- ✅ Typography Enhancements (títulos de sección)
- ✅ Parallax Scrolling
- ✅ Back to Top button

### About Page
- ✅ Page Transitions (al navegar)
- ✅ Glitch Text
- ✅ Typography Enhancements

### Blog Page
- ✅ Holographic Cards (posts)
- ✅ Enhanced Badges (categorías)
- ✅ Torii Loader (al cargar)

### Contact Page
- ✅ Enhanced Buttons (submit)
- ✅ Form interactions

### Everywhere
- ✅ Easter Eggs (Konami code, logo click)
- ✅ Reduced Motion support
- ✅ High Contrast support

---

## 💡 Tips de Testing

1. **Abre la consola:** Verás logs de feature flags al cargar
2. **Usa DevTools:** Performance tab para ver FPS
3. **Prueba en incógnito:** Para ver experiencia de usuario nuevo
4. **Cambia feature flags:** Desactiva features individuales para comparar
5. **Graba video:** Para reportar bugs más fácilmente

---

## 📝 Reportar Issues

Si encuentras bugs, documenta:
- [ ] Qué feature estaba activa
- [ ] Qué acción realizaste
- [ ] Qué esperabas vs qué pasó
- [ ] Browser y versión
- [ ] Screenshots/video si es posible
- [ ] Errores en consola

---

## ✅ Testing Completado

Una vez que hayas probado todo:
1. Documenta cualquier bug encontrado
2. Toma screenshots de las features funcionando
3. Verifica performance en Lighthouse
4. Confirma que estás listo para producción

**¡Disfruta probando las nuevas features! 🎌✨**
