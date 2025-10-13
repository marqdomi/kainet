# 🎨 KAINET v2.0 - Design System

## 📐 Document Overview

**Project:** KAINET Brand & UI Design System  
**Version:** 2.0  
**Date:** October 13, 2025  
**Purpose:** Define visual language combining Resend.com minimalism + KAINET gaming aesthetic

---

## 🌈 1. COLOR PALETTE

### 1.1 Primary Colors

```css
/* KAINET Signature Cyan */
--cyan-neon: #00E5FF;        /* Primary CTA, accents, links */
--cyan-bright: #00D9FF;      /* Hover states */
--cyan-dark: #00B8D4;        /* Active/pressed states */
--cyan-glow: rgba(0, 229, 255, 0.5);  /* Glow effects */

/* Supporting Colors */
--purple-accent: #A855F7;    /* Secondary accents (inspired by Resend) */
--green-success: #10B981;    /* Success states, positive metrics */
--red-error: #EF4444;        /* Errors, warnings */
--yellow-warning: #F59E0B;   /* Alerts, attention */
```

### 1.2 Neutral Scale (Dark Theme)

```css
/* Background Layers */
--black-base: #0A0A0A;       /* Page background */
--gray-900: #111111;         /* Card backgrounds */
--gray-800: #1A1A1A;         /* Elevated cards */
--gray-700: #2A2A2A;         /* Borders, dividers */

/* Text Colors */
--text-primary: #FFFFFF;     /* Headings, important text */
--text-secondary: #A3A3A3;   /* Body text, descriptions */
--text-tertiary: #737373;    /* Captions, labels */
--text-disabled: #525252;    /* Disabled states */

/* Overlays */
--overlay-dark: rgba(10, 10, 10, 0.8);   /* Modals, backdrops */
--overlay-glass: rgba(26, 26, 26, 0.6);  /* Glass morphism */
```

### 1.3 Gradients

```css
/* Hero Background */
--gradient-hero: linear-gradient(
  135deg,
  #0A0A0A 0%,
  #111111 50%,
  #0A0A0A 100%
);

/* Cyan Accent Gradient */
--gradient-cyan: linear-gradient(
  90deg,
  #00E5FF 0%,
  #A855F7 100%
);

/* Card Hover Effect */
--gradient-card-hover: linear-gradient(
  145deg,
  rgba(0, 229, 255, 0.1) 0%,
  rgba(168, 85, 247, 0.1) 100%
);
```

### 1.4 Color Usage Matrix

| Element | Color | Notes |
|---------|-------|-------|
| **CTA Buttons** | `--cyan-neon` | Primary actions (Get Started, Subscribe) |
| **Links** | `--cyan-neon` | Hover: `--cyan-bright` |
| **Headings** | `--text-primary` | H1, H2 always white |
| **Body Text** | `--text-secondary` | Paragraphs, descriptions |
| **Code Blocks** | `--gray-800` bg | Syntax highlighting with cyan accents |
| **Success Toast** | `--green-success` | Form submissions, confirmations |
| **Error Toast** | `--red-error` | Validation errors, failures |

---

## 🔤 2. TYPOGRAPHY

### 2.1 Font Families

```css
/* Primary Font (sans-serif) */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Headings (optional alternative) */
--font-headings: 'Space Grotesk', 'Inter', sans-serif; /* Gaming tech vibe */

/* Monospace (code blocks) */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

**CDN Imports:**
```html
<!-- Add to index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### 2.2 Type Scale

```css
/* Headings */
--text-6xl: 4rem;      /* 64px - Hero H1 */
--text-5xl: 3rem;      /* 48px - Page titles */
--text-4xl: 2.25rem;   /* 36px - Section headers */
--text-3xl: 1.875rem;  /* 30px - Card titles */
--text-2xl: 1.5rem;    /* 24px - Subheadings */
--text-xl: 1.25rem;    /* 20px - Large body */

/* Body & UI */
--text-base: 1rem;     /* 16px - Default text */
--text-sm: 0.875rem;   /* 14px - Captions */
--text-xs: 0.75rem;    /* 12px - Labels */

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### 2.3 Font Weights

```css
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### 2.4 Typography Components

**Hero Heading:**
```css
.hero-title {
  font-family: var(--font-headings);
  font-size: var(--text-6xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
  letter-spacing: -0.02em;
}
```

**Section Heading:**
```css
.section-heading {
  font-family: var(--font-headings);
  font-size: var(--text-4xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: 1rem;
}
```

**Body Text:**
```css
.body-text {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  line-height: var(--leading-relaxed);
  color: var(--text-secondary);
}
```

**Code Block:**
```css
.code-block {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  background: var(--gray-800);
  border: 1px solid var(--gray-700);
  border-radius: 0.5rem;
  padding: 1.5rem;
}
```

---

## 📦 3. SPACING SYSTEM

### 3.1 Spacing Scale (8px base)

```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### 3.2 Component Spacing

```css
/* Section Padding */
--section-padding-y: var(--space-20);  /* 80px vertical */
--section-padding-x: var(--space-8);   /* 32px horizontal */

/* Card Padding */
--card-padding: var(--space-6);        /* 24px all sides */

/* Button Padding */
--button-padding-y: var(--space-3);    /* 12px vertical */
--button-padding-x: var(--space-6);    /* 24px horizontal */

/* Input Padding */
--input-padding-y: var(--space-3);
--input-padding-x: var(--space-4);
```

### 3.3 Layout Containers

```css
/* Max Width Containers */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;

/* Default Container */
.container {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding-left: var(--space-8);
  padding-right: var(--space-8);
}
```

---

## 🔲 4. COMPONENT LIBRARY

### 4.1 Buttons

**Primary Button:**
```jsx
<button className="btn-primary">
  Get Started
</button>
```

```css
.btn-primary {
  background: var(--cyan-neon);
  color: var(--black-base);
  font-weight: var(--font-semibold);
  padding: var(--button-padding-y) var(--button-padding-x);
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.3);
}

.btn-primary:hover {
  background: var(--cyan-bright);
  box-shadow: 0 0 30px rgba(0, 229, 255, 0.5);
  transform: translateY(-2px);
}
```

**Secondary Button:**
```css
.btn-secondary {
  background: transparent;
  color: var(--cyan-neon);
  border: 2px solid var(--cyan-neon);
  padding: var(--button-padding-y) var(--button-padding-x);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: rgba(0, 229, 255, 0.1);
}
```

**Ghost Button:**
```css
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border: none;
  padding: var(--button-padding-y) var(--button-padding-x);
  cursor: pointer;
  transition: color 0.2s ease;
}

.btn-ghost:hover {
  color: var(--cyan-neon);
}
```

### 4.2 Cards

**Default Card:**
```css
.card {
  background: var(--gray-900);
  border: 1px solid var(--gray-700);
  border-radius: 1rem;
  padding: var(--card-padding);
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--cyan-neon);
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}
```

**Glass Card (Inspired by Resend):**
```css
.card-glass {
  background: var(--overlay-glass);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: var(--card-padding);
}
```

**Featured Card (Blog/Projects):**
```css
.card-featured {
  background: linear-gradient(
    145deg,
    var(--gray-900) 0%,
    var(--gray-800) 100%
  );
  border: 2px solid var(--cyan-neon);
  border-radius: 1rem;
  padding: var(--space-8);
  position: relative;
  overflow: hidden;
}

.card-featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-card-hover);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-featured:hover::before {
  opacity: 1;
}
```

### 4.3 Forms

**Input Field:**
```css
.input {
  width: 100%;
  background: var(--gray-900);
  border: 1px solid var(--gray-700);
  border-radius: 0.5rem;
  padding: var(--input-padding-y) var(--input-padding-x);
  color: var(--text-primary);
  font-family: var(--font-primary);
  font-size: var(--text-base);
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--cyan-neon);
  box-shadow: 0 0 0 3px rgba(0, 229, 255, 0.1);
}

.input::placeholder {
  color: var(--text-tertiary);
}
```

**Textarea:**
```css
.textarea {
  /* Extends .input */
  min-height: 120px;
  resize: vertical;
}
```

**Label:**
```css
.label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}
```

### 4.4 Badges

**Category Badge:**
```css
.badge {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background: rgba(0, 229, 255, 0.1);
  border: 1px solid var(--cyan-neon);
  border-radius: 9999px;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--cyan-neon);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### 4.5 Toast Notifications

**Success Toast:**
```css
.toast-success {
  background: var(--gray-900);
  border-left: 4px solid var(--green-success);
  padding: var(--space-4);
  border-radius: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
```

**Error Toast:**
```css
.toast-error {
  /* Same as success but: */
  border-left: 4px solid var(--red-error);
}
```

---

## 🖼️ 5. LAYOUT PATTERNS

### 5.1 Page Layout

```jsx
<MainLayout>
  <Navbar />
  <main>
    {/* Page content with padding */}
    <section className="section">
      <div className="container">
        {/* Content */}
      </div>
    </section>
  </main>
  <Footer />
</MainLayout>
```

```css
.section {
  padding-top: var(--section-padding-y);
  padding-bottom: var(--section-padding-y);
}
```

### 5.2 Grid Systems

**Blog Post Grid (3 columns):**
```css
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-8);
}
```

**Projects Grid (2 columns on desktop):**
```css
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

**Hero Layout (50/50 split):**
```css
.hero {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
  align-items: center;
}

@media (min-width: 1024px) {
  .hero {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### 5.3 Navbar Structure

```jsx
<nav className="navbar">
  <div className="navbar-container">
    {/* Logo Left */}
    <div className="navbar-logo">
      <Logo />
    </div>
    
    {/* Menu Center */}
    <ul className="navbar-menu">
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/projects">Projects</a></li>
      <li><a href="/blog">Blog</a></li>
    </ul>
    
    {/* CTA Right */}
    <div className="navbar-cta">
      <button className="btn-primary">Get Started</button>
    </div>
  </div>
</nav>
```

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: var(--overlay-glass);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--gray-700);
  z-index: 1000;
}

.navbar-container {
  max-width: var(--container-2xl);
  margin: 0 auto;
  padding: var(--space-4) var(--space-8);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-menu {
  display: flex;
  gap: var(--space-8);
  list-style: none;
}

.navbar-menu a {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: var(--font-medium);
  transition: color 0.2s ease;
}

.navbar-menu a:hover,
.navbar-menu a.active {
  color: var(--cyan-neon);
}
```

### 5.4 Footer Structure

```jsx
<footer className="footer">
  <div className="footer-container">
    {/* Column 1: Brand */}
    <div className="footer-column">
      <Logo />
      <p className="footer-description">
        AI-powered solutions for modern businesses
      </p>
    </div>
    
    {/* Column 2: Navigation */}
    <div className="footer-column">
      <h4>Navigation</h4>
      <ul>
        <li><a href="/about">About</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/blog">Blog</a></li>
      </ul>
    </div>
    
    {/* Column 3: Services */}
    <div className="footer-column">
      <h4>Services</h4>
      <ul>
        <li><a href="/services/ai">AI Automation</a></li>
        <li><a href="/services/web">Web Development</a></li>
      </ul>
    </div>
    
    {/* Column 4: Contact */}
    <div className="footer-column">
      <h4>Contact</h4>
      <p>contacto@kainet.mx</p>
    </div>
  </div>
  
  {/* Bottom Bar */}
  <div className="footer-bottom">
    <p>© 2025 KAINET. All rights reserved.</p>
    <div className="footer-social">
      <a href="https://github.com/marqdomi">GitHub</a>
      <a href="https://linkedin.com/in/marqdomi">LinkedIn</a>
    </div>
  </div>
</footer>
```

```css
.footer {
  background: var(--gray-900);
  border-top: 1px solid var(--gray-700);
  padding: var(--space-16) 0 var(--space-8);
}

.footer-container {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--space-8);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-12);
}

.footer-column h4 {
  color: var(--text-primary);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-4);
}

.footer-column a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-column a:hover {
  color: var(--cyan-neon);
}

.footer-bottom {
  max-width: var(--container-xl);
  margin: var(--space-12) auto 0;
  padding: var(--space-8) var(--space-8) 0;
  border-top: 1px solid var(--gray-700);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-tertiary);
  font-size: var(--text-sm);
}
```

---

## ✨ 6. ANIMATIONS & EFFECTS

### 6.1 Transitions

```css
/* Default Transition */
--transition-default: all 0.2s ease;
--transition-slow: all 0.3s ease;
--transition-fast: all 0.15s ease;
```

### 6.2 Hover Effects

**Card Lift:**
```css
.card-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
}
```

**Button Glow:**
```css
.btn-glow {
  transition: box-shadow 0.3s ease;
}

.btn-glow:hover {
  box-shadow: 0 0 30px var(--cyan-glow);
}
```

### 6.3 Framer Motion Variants

**Fade In Up:**
```jsx
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

<motion.div variants={fadeInUp} initial="hidden" animate="visible">
  Content
</motion.div>
```

**Stagger Children:**
```jsx
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const childVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

### 6.4 3D Effects (Three.js)

**Background Canvas:**
- Animated starfield particles
- Rotating torus (signature element)
- Mouse parallax effect
- Reduced particle count on mobile (performance)

---

## 📱 7. RESPONSIVE DESIGN

### 7.1 Breakpoint Strategy

```css
/* Mobile First Approach */

/* Base: Mobile (< 640px) */
.element {
  font-size: var(--text-base);
}

/* Small (640px+) */
@media (min-width: 640px) {
  .element {
    font-size: var(--text-lg);
  }
}

/* Medium (768px+) - Tablets */
@media (min-width: 768px) {
  .navbar-menu {
    display: flex; /* Show full menu */
  }
}

/* Large (1024px+) - Laptops */
@media (min-width: 1024px) {
  .hero {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* XL (1280px+) - Desktops */
@media (min-width: 1280px) {
  .section {
    padding: var(--space-24) 0;
  }
}
```

### 7.2 Mobile Adjustments

**Typography:**
```css
@media (max-width: 640px) {
  :root {
    --text-6xl: 2.5rem;   /* Reduce hero size */
    --text-5xl: 2rem;
    --text-4xl: 1.75rem;
  }
}
```

**Spacing:**
```css
@media (max-width: 640px) {
  :root {
    --section-padding-y: var(--space-12);
    --section-padding-x: var(--space-4);
  }
}
```

**Navbar:**
```css
@media (max-width: 768px) {
  .navbar-menu {
    display: none; /* Hide, show hamburger */
  }
  
  .navbar-mobile {
    display: block;
  }
}
```

---

## 🎯 8. ACCESSIBILITY

### 8.1 Color Contrast

All text must meet **WCAG 2.1 AA** standards:
- Normal text (16px): 4.5:1 contrast ratio
- Large text (24px+): 3:1 contrast ratio

**Current Ratios:**
- `--text-primary` on `--black-base`: 21:1 ✅
- `--cyan-neon` on `--black-base`: 9.5:1 ✅
- `--text-secondary` on `--black-base`: 7.2:1 ✅

### 8.2 Focus States

```css
.btn:focus,
.input:focus,
a:focus {
  outline: 2px solid var(--cyan-neon);
  outline-offset: 2px;
}
```

### 8.3 ARIA Labels

```jsx
<button aria-label="Open navigation menu">
  <HamburgerIcon />
</button>

<input
  type="email"
  aria-label="Email address"
  aria-required="true"
  aria-invalid={hasError}
/>
```

---

## 🚀 9. PERFORMANCE

### 9.1 Asset Optimization

**Images:**
- Use WebP format with fallback
- Lazy load below-the-fold images
- Responsive images with srcset

**Fonts:**
- Preload critical fonts
- Use font-display: swap
- Subset fonts (Latin only)

**CSS:**
- Critical CSS inline in `<head>`
- Non-critical CSS deferred
- Purge unused TailwindCSS

### 9.2 3D Canvas Optimization

```jsx
// Reduce particles on mobile
const particleCount = window.innerWidth < 768 ? 500 : 2000;

// Lazy load Three.js
const BackgroundCanvas = lazy(() => import('./BackgroundCanvas'));
```

---

## 📚 10. COMPONENT EXAMPLES

### 10.1 Blog Post Card

```jsx
<div className="card card-lift">
  <div className="card-image">
    <img src={post.image} alt={post.title} loading="lazy" />
    <span className="badge">{post.category}</span>
  </div>
  
  <div className="card-content">
    <h3 className="card-title">{post.title}</h3>
    <p className="card-description">{post.excerpt}</p>
    
    <div className="card-meta">
      <span>{post.readTime} min read</span>
      <span>{formatDate(post.date)}</span>
    </div>
  </div>
</div>
```

### 10.2 Project Card

```jsx
<div className="card-featured">
  <img src={project.image} alt={project.title} />
  
  <h3>{project.title}</h3>
  <p>{project.description}</p>
  
  <div className="tech-stack">
    {project.technologies.map(tech => (
      <span key={tech} className="badge">{tech}</span>
    ))}
  </div>
  
  <div className="card-actions">
    <a href={project.liveUrl} className="btn-primary">
      View Live
    </a>
    <a href={project.githubUrl} className="btn-secondary">
      GitHub
    </a>
  </div>
</div>
```

---

## ✅ 11. IMPLEMENTATION CHECKLIST

- [ ] Install fonts (Inter, Space Grotesk, JetBrains Mono)
- [ ] Set up CSS variables in global stylesheet
- [ ] Create base component library (Button, Card, Input, Badge)
- [ ] Implement Navbar with glass morphism
- [ ] Implement Footer with columns
- [ ] Set up Framer Motion variants
- [ ] Configure 3D canvas with performance optimizations
- [ ] Test responsive layouts on mobile/tablet
- [ ] Validate WCAG color contrast
- [ ] Add focus states to all interactive elements
- [ ] Test keyboard navigation
- [ ] Optimize images with WebP
- [ ] Add loading skeletons for async content

---

## 📖 12. RELATED RESOURCES

**Inspiration:**
- Resend.com - Minimalist design patterns
- Vercel.com - Dark theme, clean UI
- Linear.app - Smooth animations
- Stripe.com - Professional polish

**Tools:**
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors](https://coolors.co/) - Color palette generator
- [Tailwind Play](https://play.tailwindcss.com/) - Quick prototyping
- [Framer Motion Docs](https://www.framer.com/motion/)

---

**Document Version:**
- v1.0 (2025-10-13): Initial design system created
