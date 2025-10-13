# 🚀 Guía Rápida de Testing - Inicio Rápido

## ✅ Todo Listo para Probar

**Estado:** Todas las features habilitadas  
**Archivo:** `.env.local` creado con todas las flags en `true`

---

## 🎯 Inicio Rápido (30 segundos)

### 1. Verifica el estado de las features
```bash
node scripts/check-features.js
```

### 2. Inicia el servidor de desarrollo
```bash
npm run dev
```

### 3. Abre tu navegador
```
http://localhost:5173
```

---

## 🎨 ¿Qué Verás Inmediatamente?

### En la Página Principal (Home)

#### 🌟 Background Animado
- **Partículas de kanji** flotando en el fondo
- **Líneas de circuito** con partículas viajando
- **Mueve el cursor:** Las partículas se alejan (efecto magnético)

#### ✨ Títulos con Efectos
- **Pasa el cursor sobre títulos:** Efecto glitch RGB
- **Kanji decorativos** antes de cada sección
  - 技 (tech) para tecnología
  - 創 (sou) para creatividad
  - 未 (mi) para futuro

#### 💎 Cards Holográficas
- **Mueve el cursor sobre cards:** Efecto shimmer holográfico
- **Haz click en cards:** Efecto ripple desde el punto de click
- **Mira los proyectos y servicios:** Todos tienen el efecto

#### 🎯 Botones Mejorados
- **Hover:** Animaciones suaves
- **Click:** Efecto ripple
- **Todos los botones** tienen los efectos

---

## 🥚 Easter Eggs - ¡Pruébalos!

### 1. Konami Code (Matrix Rain)
```
Presiona: ↑ ↑ ↓ ↓ ← → ← → B A
```
**Resultado:** Lluvia de caracteres Matrix en japonés  
**Cerrar:** Presiona ESC

### 2. Logo Triple Click
```
Haz triple click en el logo "Kainet"
```
**Resultado:** Animación de torii con partículas  
**Cerrar:** Presiona ESC

### 3. Sakura Petals (Solo en abril)
```
Cambia la fecha del sistema a 1-15 de abril
```
**Resultado:** Pétalos de sakura cayendo

### 4. Fireworks (Solo en Año Nuevo)
```
Cambia la fecha del sistema a 31 dic - 2 ene
```
**Resultado:** Fuegos artificiales

---

## 🔄 Transiciones de Página

### Cómo Probar
1. Navega a diferentes páginas usando el menú
2. Observa el efecto de transición

**Esperado:** Efecto de wipe con gradiente al cambiar de página

---

## 📱 Prueba en Móvil

### Opción 1: DevTools
```
1. Abre DevTools (F12)
2. Click en el ícono de dispositivo móvil
3. Selecciona iPhone o Android
```

### Opción 2: Tu Teléfono Real
```bash
# Inicia el servidor en red local
npm run dev -- --host

# Luego abre en tu móvil:
http://[tu-ip-local]:5173
```

**Esperado:** Efectos optimizados, performance mantenido

---

## ♿ Prueba de Accesibilidad

### Reduced Motion
```
1. Abre DevTools (F12)
2. Cmd+Shift+P (Mac) o Ctrl+Shift+P (Windows)
3. Escribe: "Emulate CSS prefers-reduced-motion"
4. Selecciona: "prefers-reduced-motion: reduce"
```

**Esperado:** Animaciones reducidas pero funcionalidad intacta

### Navegación por Teclado
```
1. Usa Tab para navegar
2. Enter para activar
3. ESC para cerrar modales/easter eggs
```

**Esperado:** Todo accesible sin mouse

---

## 🎮 Controles de Features

### Deshabilitar una Feature Específica

Edita `.env.local` y cambia a `false`:
```bash
# Ejemplo: Deshabilitar glitch effects
VITE_FEATURE_GLITCH=false
```

Luego reinicia el servidor:
```bash
# Ctrl+C para detener
npm run dev
```

### Deshabilitar Todas las Features
```bash
# Copia el ejemplo que tiene todo en false
cp .env.local.example .env.local
npm run dev
```

---

## 📊 Verificar Performance

### Lighthouse
```
1. Abre DevTools (F12)
2. Tab "Lighthouse"
3. Click "Analyze page load"
```

**Target:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+

### FPS Monitor
```
1. Abre DevTools (F12)
2. Tab "Performance"
3. Click Record
4. Scrollea por la página
5. Stop recording
```

**Target:**
- Desktop: 60 FPS
- Mobile: 55+ FPS

---

## 🐛 Si Algo No Funciona

### 1. Verifica las Features
```bash
node scripts/check-features.js
```

### 2. Revisa la Consola del Browser
```
F12 → Console
```
Busca errores en rojo

### 3. Limpia y Reinicia
```bash
# Detén el servidor (Ctrl+C)
rm -rf node_modules/.vite
npm run dev
```

### 4. Verifica el Build
```bash
npm run build
```
Si el build falla, hay un error de código

---

## 📝 Checklist de Testing Completo

### Efectos Visuales
- [ ] Partículas de kanji se mueven
- [ ] Líneas de circuito animadas
- [ ] Glitch effect en títulos (hover)
- [ ] Holographic cards (hover + click)
- [ ] Transiciones entre páginas

### Interactividad
- [ ] Botones con ripple effect
- [ ] Cards responden al cursor
- [ ] Scroll parallax funciona
- [ ] Back to top button aparece

### Easter Eggs
- [ ] Konami code activa Matrix Rain
- [ ] Triple click en logo activa torii
- [ ] ESC cierra los easter eggs

### Accesibilidad
- [ ] Reduced motion funciona
- [ ] Navegación por teclado OK
- [ ] Sin errores en consola

### Performance
- [ ] Página carga rápido (< 2s)
- [ ] Scroll suave sin lag
- [ ] Animaciones fluidas

### Responsive
- [ ] Se ve bien en móvil
- [ ] Se ve bien en tablet
- [ ] Se ve bien en desktop

---

## 💡 Tips Pro

1. **Abre la consola:** Verás logs de feature flags al cargar
2. **Graba video:** Útil para reportar bugs
3. **Prueba en incógnito:** Experiencia de usuario nuevo
4. **Compara con/sin features:** Cambia flags para ver diferencias
5. **Usa diferentes browsers:** Chrome, Firefox, Safari

---

## 🎯 Próximos Pasos

Una vez que hayas probado todo:

1. ✅ Documenta bugs encontrados
2. ✅ Toma screenshots de features funcionando
3. ✅ Verifica Lighthouse scores
4. ✅ Prueba en diferentes dispositivos
5. ✅ Confirma que todo funciona como esperado

---

## 📚 Documentación Adicional

- **Guía completa:** `MANUAL-TESTING-GUIDE.md`
- **Feature flags:** `FEATURE-FLAGS-TEST-GUIDE.md`
- **Easter eggs:** `EASTER-EGGS-TEST-GUIDE.md`
- **Accesibilidad:** `ACCESSIBILITY-TEST-GUIDE.md`
- **High contrast:** `HIGH-CONTRAST-MODE-TEST-GUIDE.md`

---

## 🚀 ¡Listo para Empezar!

```bash
npm run dev
```

**Abre:** http://localhost:5173

**¡Disfruta explorando las nuevas features! 🎌✨**
