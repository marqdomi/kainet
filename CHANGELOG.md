# Changelog

Todos los cambios notables de KAINET serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [3.1.0] - 2024-12-06

### 🧹 Limpieza de Código
- Eliminados componentes japoneses no utilizados (Torii, Kanji, Sakura, MatrixRain)
- Nuevo `ModernLoader` - loader limpio y profesional
- Removidos 60+ archivos de documentación temporal
- Actualizado README con información actual del proyecto
- Desactivados feature flags de elementos culturales

### ✨ Mejoras
- Servicios ahora usan iconos Lucide (Brain, Zap, Code2) en lugar de kanji
- Background enterprise simplificado (sin gradientes cyan intensos)
- Skip-link optimizado para iOS Safari

---

## [3.0.0] - 2024-12-01

### 🎨 Design System v3.0
- Nuevo sistema de diseño inspirado en Vercel/Linear
- Tema dual (dark/light) con detección automática
- Variables CSS centralizadas
- Componentes UI refactorizados

### 🚀 Nuevas Características
- Página de privacidad (`/privacidad`)
- Newsletter con double opt-in
- Blog dinámico desde Supabase
- Formulario de contacto funcional

### ⚡ Performance
- Enterprise Background estático (mejor rendimiento)
- Lazy loading de componentes
- Code splitting por rutas

---

## [2.0.0] - 2024-10-13

### 🏗️ Arquitectura
- Migración de single-page a multi-page (React Router 6)
- Integración con Supabase para contenido dinámico
- API serverless en Vercel

### 📄 Nuevas Páginas
- `/nosotros` - Página de about
- `/productos` - Catálogo de productos
- `/servicios` - Servicios ofrecidos
- `/blog` - Blog técnico
- `/blog/:slug` - Posts individuales
- `/contact` - Formulario de contacto
- `/kaido` - Landing de producto

---

## [1.0.0] - 2024-08-01

### 🎉 Lanzamiento Inicial
- Single-page portfolio
- Hero con animación 3D
- Secciones de servicios y proyectos
- Diseño cyberpunk original
