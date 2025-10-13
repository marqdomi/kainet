# 📋 KAINET v2.0 - Requirements Document

## 📊 Document Overview

**Project:** KAINET Website Redesign & Architecture Migration  
**Version:** 2.0  
**Date:** October 13, 2025  
**Status:** Planning Phase  
**Author:** Marco Domínguez (KAINET Team)

---

## 🎯 Executive Summary

Transform KAINET from a single-page application to a **scalable multi-page architecture** that combines:
- The **modern minimalism** of Resend.com (clean design, excellent UX)
- The **unique identity** of KAINET (3D canvas, gaming aesthetic, cyan neon)

**Goal:** Create a professional, scalable platform to showcase multiple projects while maintaining brand personality.

---

## 1. BUSINESS REQUIREMENTS

### 1.1 Strategic Objectives

| ID | Objective | Success Metric | Priority |
|----|-----------|----------------|----------|
| BR-1 | **Scalability** | Add new projects without code restructure | 🔴 HIGH |
| BR-2 | **Professional Image** | Attract real clients for consulting/dev services | 🔴 HIGH |
| BR-3 | **Brand Consistency** | Maintain KAINET's unique tech/gaming aesthetic | 🟡 MEDIUM |
| BR-4 | **SEO Performance** | Improve search rankings with multi-page structure | 🟡 MEDIUM |
| BR-5 | **Monetization Ready** | Platform for showcasing paid services | 🟢 LOW |

### 1.2 Target Audience

**Primary:**
- **Startups & Tech Companies** seeking IA/Automation consulting
- **Developers** interested in technical blog content
- **Potential Clients** evaluating KAINET's portfolio

**Secondary:**
- **Recruiters** reviewing professional work
- **Collaborators** for open-source projects
- **Newsletter Subscribers** for weekly AI/DevOps content

### 1.3 Success Criteria

✅ **Performance:**
- Lighthouse Score > 90 (all categories)
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s

✅ **Usability:**
- Mobile navigation intuitive (no broken links)
- Blog posts load consistently (no blank pages)
- All forms functional (newsletter, contact)

✅ **Business:**
- 2+ client inquiries per month
- 500+ monthly blog visitors
- 100+ newsletter subscribers

---

## 2. FUNCTIONAL REQUIREMENTS

### 2.1 Site Architecture

```
KAINET v2.0 Structure
│
├── / (Home)                    ← Hero + Overview
├── /about                      ← About Us + Team + Philosophy
├── /services                   ← AI/Automation Consulting Offerings
│   ├── /services/ai-automation
│   ├── /services/web-development
│   └── /services/mlops
├── /projects                   ← Portfolio/Case Studies
│   ├── /projects/kainet-resto  ← Restaurant Management AI
│   ├── /projects/news-aggregator
│   └── /projects/[slug]        ← Dynamic project pages
├── /blog                       ← Blog Listing (paginated)
│   ├── /blog/[slug]            ← Individual posts
│   └── /blog/category/[cat]    ← Category filters
├── /playground                 ← Interactive demos
└── /contact                    ← Contact form + CTA
```

### 2.2 Core Features

#### FR-1: Navigation System
- **Multi-page navbar** (not anchor-based)
- Persistent across all pages
- Mobile hamburger menu with slide-in
- Active state indicators
- Smooth transitions between pages

#### FR-2: Home Page
- Hero section with 3D Torus (signature element)
- Services overview cards
- Featured blog posts (3 most recent)
- Newsletter CTA
- Client testimonials/logos

#### FR-3: Blog System
- **Listing page** with filters (category, date)
- **Individual post pages** with:
  - Syntax-highlighted code blocks
  - Reading progress bar
  - Related posts sidebar
  - Author info card
  - Social share buttons
- **Supabase backend** (already implemented)
- **RSS feed** for subscribers

#### FR-4: Projects Showcase
- Grid layout with hover effects
- Filterable by technology/category
- Each project page:
  - Problem statement
  - Solution approach
  - Tech stack used
  - Results/metrics
  - Screenshots/demos

#### FR-5: Contact & Forms
- Contact form (already functional with Resend)
- Newsletter subscription (needs debugging)
- Form validation with error messages
- Success states with animations

---

## 3. NON-FUNCTIONAL REQUIREMENTS

### 3.1 Performance

| Requirement | Target | Current Status |
|-------------|--------|----------------|
| **Page Load Time** | < 2s (3G) | ❓ To measure |
| **Lighthouse Performance** | > 90 | ❓ To measure |
| **Bundle Size** | < 500KB (JS) | ✅ Optimized with lazy loading |
| **Images** | WebP format, lazy loaded | ⚠️ Using placeholders currently |

### 3.2 Accessibility

- **WCAG 2.1 AA Compliance**
  - Keyboard navigation for all interactive elements
  - ARIA labels on components
  - Sufficient color contrast (4.5:1 for text)
  - Skip navigation links
  - Screen reader tested

### 3.3 SEO

- **Meta Tags:** Title, description, OG tags on all pages
- **Structured Data:** JSON-LD for blog posts, organization
- **Sitemap:** Auto-generated, updated weekly
- **Robots.txt:** Configured correctly
- **Canonical URLs:** Set on all pages

### 3.4 Browser Support

- **Modern Browsers:** Last 2 versions (Chrome, Firefox, Safari, Edge)
- **Mobile:** iOS Safari 14+, Chrome Android
- **Graceful Degradation:** Core content accessible without JS

### 3.5 Security

- **HTTPS:** Enforced on all pages
- **API Keys:** Never exposed in client code
- **Forms:** CSRF protection, rate limiting
- **Database:** Row Level Security (RLS) on Supabase
- **Email:** SPF, DKIM, DMARC configured (via Resend)

---

## 4. TECHNICAL REQUIREMENTS

### 4.1 Technology Stack

**Frontend:**
- React 18.2.0 (keep existing)
- Vite 5.4.19 (faster than CRA)
- Framer Motion 10.16.4 (animations)
- Three.js 0.158.0 (3D canvas - signature element)
- TailwindCSS 3.x (styling)

**Backend/Services:**
- Supabase (PostgreSQL + Auth + Storage)
- Resend (transactional emails)
- Vercel (hosting + serverless functions)

**Routing:**
- ⚠️ **UPGRADE NEEDED:** React Router v6+ or Next.js 14+
  - Current: Manual routing in App.jsx
  - Target: Proper routing with nested layouts

### 4.2 Database Schema

**Existing Tables:**
- ✅ `blog_posts` (id, slug, title, content, category, featured, etc.)

**New Tables Needed:**
```sql
-- Projects/Portfolio
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  tech_stack TEXT[], -- Array of technologies
  featured_image TEXT,
  gallery JSONB, -- Array of image URLs
  live_url TEXT,
  github_url TEXT,
  metrics JSONB, -- {users: 1000, performance: "+40%"}
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active', -- active, unsubscribed
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  metadata JSONB -- {source: "blog-cta", referrer: "/blog"}
);

-- Contact Form Submissions (for tracking)
CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- new, responded, archived
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);
```

### 4.3 API Requirements

**Existing Endpoints:**
- ✅ `/api/contact` (Resend integration)
- ⚠️ `/api/newsletter` (created but not executing)

**New Endpoints Needed:**
```javascript
// Projects
GET /api/projects → List all projects
GET /api/projects/:slug → Get single project

// Analytics (optional)
POST /api/analytics/track → Track page views, events
```

---

## 5. UI/UX REQUIREMENTS

### 5.1 Design Principles

**Borrowed from Resend.com:**
1. ✅ **Generous Whitespace** - Content breathes, not cramped
2. ✅ **Clear Typography Hierarchy** - H1 > H2 > Body obvious
3. ✅ **Subtle Animations** - Enhance, don't distract
4. ✅ **Glass Morphism Cards** - Blur + borders for depth
5. ✅ **Professional Code Blocks** - Syntax highlighting, copy button

**Uniquely KAINET:**
1. ✅ **3D Background Canvas** - Animated stars/particles (keep)
2. ✅ **Rotating Torus** - Signature 3D element (keep)
3. ✅ **Cyan Neon Accent** - #00E5FF as primary color
4. ✅ **Dark Theme First** - Black base with subtle gradients
5. ✅ **Gaming Aesthetic** - Subtle tech/gaming vibes

### 5.2 Responsive Breakpoints

```css
/* Mobile First */
sm: 640px   /* Small phones */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### 5.3 Component Library

**Core Components:**
- Button (primary, secondary, ghost)
- Card (default, featured, hover-lift)
- Input (text, email, textarea)
- Badge (category, status)
- Modal (newsletter, project details)
- Toast (success, error, info)
- Skeleton Loaders (blog, projects)

---

## 6. MIGRATION REQUIREMENTS

### 6.1 Data Migration

- ✅ **Blog Posts:** Already in Supabase (1 post, need to add 6 samples)
- 🔄 **Static Content:** Convert About/Hero text to CMS-manageable
- 📦 **Images:** Move to Supabase Storage or CDN

### 6.2 Code Migration

**Phase 1: Routing (Week 1-2)**
- Install React Router or migrate to Next.js
- Convert anchor-based navigation to proper routing
- Implement layouts (MainLayout, BlogLayout)

**Phase 2: Pages (Week 3-4)**
- Split App.jsx into separate page components
- Implement /about, /services, /projects, /contact
- Maintain existing blog functionality

**Phase 3: Polish (Week 5-6)**
- Add animations/transitions
- Implement Resend-inspired design tweaks
- Performance optimization

### 6.3 Backwards Compatibility

- ⚠️ **URL Structure Change:** 
  - Old: `/#blog` → New: `/blog`
  - Need 301 redirects or server-side routing

---

## 7. DEPLOYMENT REQUIREMENTS

### 7.1 Hosting

- **Platform:** Vercel (current, keep)
- **Domain:** kainet.mx (already configured)
- **SSL:** Auto-managed by Vercel
- **Env Variables:** Configured in Vercel Dashboard

### 7.2 CI/CD

- **Git Workflow:** 
  - `main` branch → Production (kainet.mx)
  - `dev` branch → Preview deployments
- **Auto-deploy:** On push to main
- **Build Checks:** ESLint, TypeScript (if migrating)

### 7.3 Monitoring

- **Analytics:** Google Analytics or Plausible
- **Error Tracking:** Sentry or LogRocket
- **Uptime:** Vercel built-in or UptimeRobot
- **Performance:** Lighthouse CI on each deploy

---

## 8. CONSTRAINTS & ASSUMPTIONS

### 8.1 Constraints

- **Budget:** $0-50/month (Vercel Free + Supabase Free + Resend Free tier)
- **Timeline:** 6-8 weeks for full migration
- **Resources:** Solo developer (Marco) + AI assistance
- **Tech Debt:** Current app is SPA with manual routing

### 8.2 Assumptions

- User has basic React/JavaScript knowledge
- Supabase account is already set up and functional
- Resend domain (kainet.mx) is verified
- Vercel deployment process is understood

---

## 9. OUT OF SCOPE (v2.0)

**Not included in initial release:**
- ❌ User authentication/login
- ❌ Admin dashboard for content management
- ❌ E-commerce/payment integration
- ❌ Multi-language support (i18n)
- ❌ Dark/Light mode toggle (dark only for now)
- ❌ Comments system on blog posts
- ❌ Real-time chat/support widget

**Potential for v2.1+:**
- Headless CMS integration (Sanity, Strapi)
- Advanced analytics dashboard
- AI chatbot for visitor questions

---

## 10. ACCEPTANCE CRITERIA

### 10.1 Must Have (MVP)

- ✅ Multi-page architecture implemented
- ✅ All navigation links work correctly
- ✅ Blog posts load from Supabase consistently
- ✅ Contact form sends emails successfully
- ✅ Newsletter form captures emails
- ✅ Mobile responsive on all pages
- ✅ Lighthouse score > 80 on all metrics

### 10.2 Should Have

- Projects showcase page with 3+ case studies
- About page with team/philosophy content
- Services page with offerings
- Testimonials section
- RSS feed for blog

### 10.3 Nice to Have

- Animated page transitions
- Blog post reading progress bar
- Project filtering by technology
- Newsletter archive page
- Interactive playground demos

---

## 11. RISKS & MITIGATION

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **Routing Migration Breaks Site** | Medium | High | Phased rollout with preview deployments |
| **SEO Drop During Migration** | Medium | Medium | Implement 301 redirects, keep URLs similar |
| **3D Canvas Performance Issues** | Low | Medium | Lazy load, reduce particle count on mobile |
| **Database Costs Exceed Budget** | Low | Low | Monitor Supabase usage, optimize queries |
| **Time Overrun (>8 weeks)** | High | Low | Prioritize MVP features, defer nice-to-haves |

---

## 12. APPROVAL & SIGN-OFF

**Reviewed By:** Marco Domínguez (KAINET)  
**Date:** October 13, 2025  
**Status:** ✅ Approved for Design Phase

**Next Steps:**
1. Create Design System document
2. Create Implementation Plan with tasks
3. Set up dev branch and project board
4. Begin Phase 1: Routing migration

---

## 13. APPENDIX

### 13.1 Related Documents
- `DESIGN-SYSTEM.md` - Visual design specifications
- `IMPLEMENTATION-PLAN.md` - Phased task breakdown
- `MEJORAS-RESEND-INSPIRATION.md` - Resend.com analysis

### 13.2 References
- Resend.com: https://resend.com
- Current KAINET: https://kainet.mx
- Supabase Docs: https://supabase.com/docs
- React Router: https://reactrouter.com

---

**Document Version History:**
- v1.0 (2025-10-13): Initial requirements document created
