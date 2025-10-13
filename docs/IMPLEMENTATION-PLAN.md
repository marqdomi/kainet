# 📋 KAINET v2.0 - Implementation Plan

## 🎯 Overview

**Goal:** Migrate KAINET from single-page app to scalable multi-page architecture  
**Timeline:** 6-8 weeks (phased rollout)  
**Approach:** Incremental migration with continuous deployment  
**Risk Level:** Medium (major architectural change)

---

## 📅 PHASED ROADMAP

### Phase 0: Preparation & Setup (Week 1)
**Status:** ✅ COMPLETED  
**Duration:** 5-7 days  
**Goal:** Set up development environment and tooling

#### Tasks:

**0.1 Documentation Review** ✅
- [x] Requirements document created
- [x] Design system defined
- [x] Implementation plan outlined

**0.2 Development Environment** ✅
- [x] Create `dev` branch from `main`
- [x] Set up Vercel preview deployments for `dev` branch
- [ ] Configure ESLint + Prettier for consistency (existing config working)
- [ ] Add VS Code workspace settings (optional)

**0.3 Database Preparation** ✅
- [x] Execute `insert-sample-posts.sql` in Supabase
- [x] Verify 6 blog posts loaded correctly
- [x] Create `projects` table (see schema in Requirements)
- [ ] Create `newsletter_subscribers` table (pending)
- [ ] Test Supabase RLS policies (pending)

**0.4 Font & Asset Setup** ✅
- [x] Add Google Fonts (Inter, Space Grotesk, JetBrains Mono)
- [x] Create `src/styles/variables.css` with design tokens
- [ ] Set up image optimization pipeline (WebP conversion) (pending)
- [ ] Audit and optimize existing assets (pending)

**Deliverables:** ✅
- ✅ `dev` branch with preview deployments
- ✅ Database with sample content (blog posts + projects)
- ✅ Design system CSS variables (240+ lines)
- ✅ Clean development environment

---

### Phase 1: Routing Migration (Week 2)
**Status:** ✅ COMPLETED  
**Duration:** 5-7 days  
**Goal:** Replace anchor-based navigation with proper routing

#### Decision Point: React Router vs Next.js

**Option A: React Router 6** ✅ SELECTED
- ✅ Keep existing Vite setup
- ✅ Minimal code changes
- ✅ Faster migration path
- ❌ Manual SEO optimization needed

**Option B: Next.js 14**
- ✅ Built-in SSR/SSG for SEO
- ✅ Better performance out-of-box
- ❌ Major refactor required
- ❌ Higher learning curve

**Decision:** ✅ React Router 6 implemented successfully

#### Tasks:

**1.1 Install Dependencies** ✅
```bash
npm install react-router-dom@6
```

**1.2 Create Layout Components** ✅
- [x] `src/layouts/MainLayout.jsx` (Navbar + Footer wrapper)
- [ ] `src/layouts/BlogLayout.jsx` (Blog-specific layout - not needed)
- [x] Update `Navbar.jsx` to use `<Link>` from React Router
- [x] Update `Footer.jsx` with proper links

**1.3 Set Up Router**
```jsx
// src/App.jsx (new structure)
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

**1.4 Create Placeholder Pages** ✅
- [x] `src/pages/Home.jsx` (temporary copy of current hero)
- [x] `src/pages/AboutPage.jsx` (copy from current About section)
- [x] `src/pages/ProjectsPage.jsx` (new listing page)
- [ ] `src/pages/ProjectDetail.jsx` (dynamic project pages - pending Phase 3)
- [x] `src/pages/BlogPage.jsx` (blog listing)
- [x] `src/pages/BlogPostPage.jsx` (existing component, moved to pages/)
- [x] `src/pages/ContactPage.jsx` (copy from current Contact section)
- [x] `src/pages/NotFound.jsx` (404 page)

**1.5 Update Navigation** ✅
- [x] Replace all `<a href="#section">` with `<Link to="/section">`
- [x] Remove scroll-based navigation logic
- [x] Add active link highlighting in Navbar
- [x] Test all navigation paths

**1.6 Configure Vercel for SPAs** ✅
```json
// vercel.json (simplified)
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**1.7 Testing** ✅
- [x] All routes load correctly
- [x] Browser back/forward buttons work
- [x] Direct URL access works (not just navigation)
- [x] No console errors

**Deliverables:** ✅
- ✅ Fully functional React Router setup
- ✅ All pages accessible via URLs
- ✅ Navbar with active states
- ✅ Preview deployment working on Vercel

---

### Phase 2: Component Refactoring (Week 3)
**Status:** ✅ COMPLETED  
**Duration:** 5-7 days  
**Goal:** Extract reusable components and implement design system

#### Tasks:

**2.1 Create Base Components** ✅
- [x] `src/components/ui/Button.jsx` (Primary, Secondary, Ghost) + as prop for links
- [x] `src/components/ui/Card.jsx` (Default, Glass, Featured)
- [x] `src/components/ui/Input.jsx` (Text, Email, Textarea)
- [x] `src/components/ui/Badge.jsx` (Category, Status - 5 variants)
- [ ] `src/components/ui/Toast.jsx` (Success, Error, Info) - pending
- [ ] `src/components/ui/Modal.jsx` (Newsletter, Project details) - pending
- [x] `src/components/ui/Skeleton.jsx` (Loading states - 5 variants)
- [x] `src/components/ui/index.js` (Central export)

**2.2 Implement Design System** ✅
- [x] Create `src/styles/variables.css` with CSS custom properties (240+ lines)
- [x] Import variables in `src/index.css`
- [x] Design tokens: colors, typography, spacing, transitions, shadows, z-index
- [x] Test all components in isolation

**2.3 Refactor Existing Components** ✅
- [ ] Update `Hero.jsx` to use new Button component (pending)
- [ ] Update `Blog.jsx` to use Card component (replaced with new sections)
- [x] Update `Newsletter.jsx` to use Input + Button
- [x] Update `Contact.jsx` to use Input + Button + Card
- [x] Remove duplicate styles, use design system

**2.4 Create Shared Components** ⏳
- [ ] `src/components/PageHeader.jsx` (Reusable page title section) - pending
- [ ] `src/components/SectionContainer.jsx` (Consistent padding/margins) - pending
- [ ] `src/components/BackToTop.jsx` (Scroll-to-top button) - pending
- [ ] `src/components/Breadcrumbs.jsx` (Navigation aid) - pending

**2.5 Component Documentation** ✅
- [x] Add PropTypes to all UI components
- [x] Add JSDoc comments
- [ ] Create component usage examples in README - pending

**Deliverables:** ✅
- ✅ Complete UI component library (5 core components)
- ✅ Design system CSS variables (240+ lines)
- ✅ Refactored Newsletter & Contact components
- ✅ Component documentation with PropTypes

---

### Phase 3: Pages Implementation (Week 4-5)
**Status:** 🔵 IN PROGRESS (60% complete)  
**Duration:** 10-14 days  
**Goal:** Build out all pages with content and functionality

#### 3.1 Home Page (2 days) ✅ COMPLETED
- [x] Hero section with 3D Torus (existing, preserved)
- [x] Services overview (3 cards: AI, Automation, Web Dev)
- [x] Featured projects section (3 featured from Supabase)
- [x] Latest blog posts (3 cards from Supabase)
- [ ] Newsletter CTA section (exists in footer)
- [ ] Client testimonials/logos (optional)
- [x] Implement page animations (Framer Motion stagger)

#### 3.2 About Page (1 day) ⏳ PENDING
- [ ] Company story section
- [ ] "What We Do" (AI/Automation focus)
- [ ] Philosophy/Values cards
- [ ] Team section (Marco + collaborators)
- [ ] Tech stack showcase
- [ ] "Why KAINET" differentiators

#### 3.3 Services Page (2 days) ⏳ PENDING (covered in Home 3.1)
- [x] Service listing created in Home page (AI Automation, Web Dev, Automation)
- [ ] Dedicated /services page (optional)
- [ ] Pricing overview (if applicable)
- [ ] FAQ accordion

#### 3.4 Projects Page (2 days) ✅ COMPLETED
- [x] Project grid layout (2 columns desktop, 1 mobile)
- [x] Filter by technology/category (All, AI, Web, Automation, MLOps)
- [x] Each project card:
  - [x] Category badge with colors
  - [x] Title + short description
  - [x] Tech stack badges (first 4 shown)
  - [x] Metrics display in cards
  - [x] Links to demo/GitHub
- [x] "Featured" tag for key projects (⭐ badge)
- [x] Load projects from Supabase (6 projects loaded)
- [x] Loading states with Skeleton
- [x] Error handling with retry
- [x] CTA section at bottom

#### 3.5 Project Detail Page (2 days) ⏳ PENDING
- [ ] Hero image/video
- [ ] Problem statement section
- [ ] Solution approach
- [ ] Tech stack detailed
- [ ] Results/metrics (if available)
- [ ] Screenshot gallery
- [ ] Links (Live demo, GitHub)
- [ ] Related projects
- [ ] CTA: "Work with us"

#### 3.6 Blog Page (2 days) ⏳ PENDING
- [ ] Blog post grid (3 columns desktop)
- [ ] Featured post at top (larger card)
- [ ] Category filters (IA, Automatización, Tutoriales, DevOps)
- [ ] Search bar (client-side filtering)
- [ ] Pagination (10 posts per page)
- [ ] Load from Supabase with loading states
- [ ] Empty state if no posts

#### 3.7 Blog Post Page (Already Done + Enhancements) ⏳
- [x] Already loads from Supabase
- [ ] Add reading progress bar
- [ ] Add table of contents (auto-generated from headings)
- [ ] Add social share buttons (Twitter, LinkedIn, Copy link)
- [ ] Add "Related Posts" section (by category)
- [ ] Add author card at bottom
- [ ] Add comment system (future: Giscus/GitHub Discussions)

#### 3.8 Contact Page (1 day) ✅ COMPLETED (refactored in Phase 2.3)
- [x] Contact form functional with design system
- [x] Company info displayed in card
- [x] Success modal with confirmation
- [ ] Map embed (optional)
- [x] Response time expectation (in modal message)
- [ ] Toast notifications (using modal currently)

**Deliverables:**
- 8 fully implemented pages
- Content loaded from Supabase
- Animations and interactions
- Mobile responsive

---

### Phase 4: Navigation & Footer (Week 5)
**Status:** 🔵 Not Started  
**Duration:** 3-5 days  
**Goal:** Professional navigation system inspired by Resend.com

#### 4.1 Navbar Enhancements
- [ ] Glass morphism background
- [ ] Logo on left (clickable to home)
- [ ] Navigation links center:
  - Home
  - About
  - Services (dropdown: AI, Web, MLOps)
  - Projects
  - Blog
- [ ] CTA button right ("Get Started" → /contact)
- [ ] Mobile hamburger menu with slide-in
- [ ] Active page highlighting
- [ ] Scroll-based hide/show (auto-hide when scrolling down)

#### 4.2 Dropdown Menus (Desktop)
```jsx
<NavDropdown label="Services">
  <NavItem to="/services/ai-automation">AI Automation</NavItem>
  <NavItem to="/services/web-development">Web Development</NavItem>
  <NavItem to="/services/mlops">MLOps</NavItem>
</NavDropdown>
```

#### 4.3 Mobile Menu
- [ ] Hamburger icon (animated to X)
- [ ] Full-screen overlay menu
- [ ] Slide-in animation
- [ ] Close on link click or backdrop click
- [ ] Touch-friendly spacing

#### 4.4 Footer Implementation
- [ ] 4-column layout (inspired by Resend):
  - Column 1: Logo + Tagline
  - Column 2: Navigation (Home, About, Projects, Blog)
  - Column 3: Services (AI, Web, MLOps)
  - Column 4: Contact (Email, Social links)
- [ ] Bottom bar:
  - Copyright © 2025 KAINET
  - Social icons (GitHub, LinkedIn, Twitter)
  - Legal links (Privacy, Terms - if applicable)
- [ ] Newsletter signup mini-form in footer

**Deliverables:**
- Professional navbar with dropdowns
- Mobile-optimized menu
- Comprehensive footer
- Smooth animations

---

### Phase 5: Forms & Integrations (Week 6)
**Status:** 🔵 Not Started  
**Duration:** 5-7 days  
**Goal:** Ensure all forms work correctly with validations

#### 5.1 Contact Form (Enhancement)
- [x] Already functional with Resend
- [ ] Add client-side validation (Yup or Zod)
- [ ] Add honeypot field (anti-spam)
- [ ] Add rate limiting (Vercel middleware)
- [ ] Improve error messages
- [ ] Add loading state during submission
- [ ] Add success toast notification
- [ ] Redirect to thank-you page (optional)

#### 5.2 Newsletter Form (Fix)
- [ ] Debug why `/api/newsletter` not executing
- [ ] Verify Newsletter.jsx calls endpoint correctly
- [ ] Add email validation (regex + DNS check)
- [ ] Add double opt-in (send confirmation email)
- [ ] Store subscribers in Supabase `newsletter_subscribers` table
- [ ] Add success toast: "Check your email to confirm"
- [ ] Add unsubscribe link in emails

#### 5.3 Form Validation Library
```bash
npm install react-hook-form zod
```

Example:
```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message too short')
});

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema)
  });
  
  // ...
}
```

#### 5.4 Analytics Integration
- [ ] Install analytics library (Plausible or Google Analytics)
- [ ] Track page views
- [ ] Track form submissions
- [ ] Track CTA clicks
- [ ] Privacy-compliant (GDPR-friendly)

**Deliverables:**
- Fully functional contact form with validation
- Working newsletter with confirmation emails
- Analytics tracking
- Anti-spam measures

---

### Phase 6: Content & SEO (Week 6-7)
**Status:** 🔵 Not Started  
**Duration:** 5-7 days  
**Goal:** Optimize for search engines and performance

#### 6.1 SEO Meta Tags
- [ ] Install `react-helmet-async` for dynamic meta tags
- [ ] Add to all pages:
  - `<title>` (unique per page)
  - `<meta name="description">`
  - Open Graph tags (og:title, og:image, og:description)
  - Twitter Card tags
  - Canonical URLs
- [ ] Generate dynamic OG images (og-image.vercel.app)

#### 6.2 Structured Data (JSON-LD)
```jsx
// Example for Blog Post
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "author": {
    "@type": "Person",
    "name": "Marco Domínguez"
  },
  "datePublished": "2025-10-13",
  "image": "https://kainet.mx/og-image.jpg"
}
</script>
```

#### 6.3 Sitemap & Robots
- [ ] Generate dynamic sitemap.xml (include all pages + blog posts)
- [ ] Update robots.txt to reference sitemap
- [ ] Submit sitemap to Google Search Console

#### 6.4 Performance Optimization
- [ ] Lazy load images (native `loading="lazy"`)
- [ ] Convert images to WebP
- [ ] Code splitting (React.lazy for routes)
- [ ] Preload critical fonts
- [ ] Minify CSS/JS (Vite handles this)
- [ ] Run Lighthouse audit, fix issues

#### 6.5 Accessibility Audit
- [ ] Test with screen reader (NVDA or VoiceOver)
- [ ] Ensure keyboard navigation works
- [ ] Add skip navigation link
- [ ] Fix any color contrast issues
- [ ] Add ARIA labels where needed
- [ ] Run aXe DevTools, fix violations

**Deliverables:**
- SEO-optimized pages with meta tags
- Structured data for rich snippets
- Updated sitemap
- Lighthouse score > 90
- WCAG AA compliance

---

### Phase 7: Testing & Launch (Week 7-8)
**Status:** 🔵 Not Started  
**Duration:** 7-10 days  
**Goal:** Final testing, bug fixes, and production launch

#### 7.1 Cross-Browser Testing
- [ ] Test on Chrome (Windows, Mac, Linux)
- [ ] Test on Firefox
- [ ] Test on Safari (Mac, iOS)
- [ ] Test on Edge
- [ ] Fix any browser-specific bugs

#### 7.2 Device Testing
- [ ] Test on iPhone (Safari, Chrome)
- [ ] Test on Android (Chrome)
- [ ] Test on iPad
- [ ] Test on desktop (1920x1080, 1366x768)
- [ ] Test on ultrawide (3440x1440)

#### 7.3 User Testing
- [ ] Ask 3-5 people to test the site
- [ ] Collect feedback on:
  - Navigation clarity
  - Loading speed
  - Mobile usability
  - Content readability
- [ ] Fix critical issues

#### 7.4 Performance Testing
- [ ] Run Lighthouse on all major pages
- [ ] Ensure scores > 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Test with slow 3G connection
- [ ] Optimize any slow pages

#### 7.5 Security Checklist
- [ ] No API keys exposed in client code
- [ ] Supabase RLS policies tested
- [ ] HTTPS enforced
- [ ] CORS configured correctly
- [ ] Rate limiting on API endpoints
- [ ] Honeypot on forms

#### 7.6 Pre-Launch Tasks
- [ ] Final code review
- [ ] Update README.md with new architecture
- [ ] Document deployment process
- [ ] Create backup of current production site
- [ ] Set up monitoring (Sentry or similar)

#### 7.7 Launch Checklist
- [ ] Merge `dev` branch to `main`
- [ ] Verify Vercel production deployment
- [ ] Test all URLs on kainet.mx
- [ ] Monitor for errors (first 24 hours)
- [ ] Post announcement (social media, blog post)

**Deliverables:**
- Production-ready site on kainet.mx
- No critical bugs
- Monitoring in place
- Launch announcement

---

## 🛠️ TECHNICAL TASKS BREAKDOWN

### Critical Path Tasks (Must Complete in Order)
1. ✅ Documentation (Requirements, Design System, Plan)
2. 🔵 Set up `dev` branch + preview deployments
3. 🔵 Populate database (insert-sample-posts.sql)
4. 🔵 Install React Router
5. 🔵 Create page structure
6. 🔵 Migrate navigation
7. 🔵 Implement pages with content
8. 🔵 Test and launch

### Parallel Tasks (Can Do Simultaneously)
- Design system implementation (while building pages)
- Component library creation (while refactoring)
- SEO optimization (after pages exist)
- Analytics setup (anytime)

---

## 📊 PROGRESS TRACKING

### Overall Progress: 0% Complete

| Phase | Status | Progress | ETA |
|-------|--------|----------|-----|
| Phase 0: Preparation | 🔵 Not Started | 20% (docs done) | Week 1 |
| Phase 1: Routing | 🔵 Not Started | 0% | Week 2 |
| Phase 2: Components | 🔵 Not Started | 0% | Week 3 |
| Phase 3: Pages | 🔵 Not Started | 0% | Week 4-5 |
| Phase 4: Navigation | 🔵 Not Started | 0% | Week 5 |
| Phase 5: Forms | 🔵 Not Started | 0% | Week 6 |
| Phase 6: SEO | 🔵 Not Started | 0% | Week 6-7 |
| Phase 7: Testing | 🔵 Not Started | 0% | Week 7-8 |

### Legend:
- 🔵 Not Started
- 🟡 In Progress
- 🟢 Completed
- 🔴 Blocked

---

## ⚠️ RISKS & MITIGATION

### Risk 1: Migration Breaks Existing Features
**Probability:** Medium  
**Impact:** High  
**Mitigation:**
- Use `dev` branch with preview deployments
- Test thoroughly before merging to `main`
- Keep rollback plan (revert commit ready)

### Risk 2: SEO Drop During URL Change
**Probability:** Medium  
**Impact:** Medium  
**Mitigation:**
- Implement 301 redirects (/#blog → /blog)
- Keep URL structure similar
- Submit new sitemap immediately
- Monitor Google Search Console

### Risk 3: 3D Canvas Slows Down Site
**Probability:** Low  
**Impact:** Medium  
**Mitigation:**
- Lazy load Three.js library
- Reduce particle count on mobile
- Add toggle to disable animations
- Use Intersection Observer to pause when not visible

### Risk 4: Time Overrun (>8 weeks)
**Probability:** High  
**Impact:** Low  
**Mitigation:**
- Prioritize MVP features (Phases 1-3)
- Defer nice-to-haves to v2.1
- Set weekly milestones
- Adjust scope if needed

### Risk 5: Database Costs Exceed Budget
**Probability:** Low  
**Impact:** Low  
**Mitigation:**
- Monitor Supabase usage dashboard
- Optimize queries (add indexes)
- Stay within free tier limits
- Cache frequent queries

---

## 🚀 DEPLOYMENT STRATEGY

### Development Workflow
```bash
# Feature branches
git checkout -b feature/navbar-redesign
# Make changes
git commit -m "feat: add dropdown menus to navbar"
git push origin feature/navbar-redesign

# Merge to dev (preview deployment)
git checkout dev
git merge feature/navbar-redesign
git push origin dev
# → Triggers Vercel preview at dev.kainet.mx

# After testing, merge to main (production)
git checkout main
git merge dev
git push origin main
# → Triggers production deployment at kainet.mx
```

### Vercel Configuration
```json
// vercel.json
{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "dev": true
    }
  },
  "github": {
    "silent": false
  }
}
```

### Environment Variables
```env
# Vercel Dashboard → Settings → Environment Variables

# Production + Preview
VITE_SUPABASE_URL=https://tqdencmzezjevnntifos.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Serverless Functions Only
RESEND_API_KEY=re_your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 📈 SUCCESS METRICS

### Technical Metrics
- **Lighthouse Scores:** All pages > 90 in all categories
- **Build Time:** < 3 minutes
- **Bundle Size:** < 500KB (JS), < 100KB (CSS)
- **Page Load Time:** < 2s on 3G

### Business Metrics
- **Client Inquiries:** 2+ per month (from contact form)
- **Blog Traffic:** 500+ monthly visitors
- **Newsletter Subscribers:** 100+ in first 3 months
- **Bounce Rate:** < 50%
- **Avg. Session Duration:** > 2 minutes

### User Experience Metrics
- **Mobile Usability:** No broken layouts on iOS/Android
- **Navigation Clarity:** Users can find pages in < 3 clicks
- **Form Conversion:** > 5% of visitors submit contact/newsletter forms
- **Accessibility:** WCAG AA compliant (aXe DevTools 0 critical issues)

---

## 🔄 POST-LAUNCH ROADMAP (v2.1)

**Potential Features for Future Releases:**
- [ ] Admin dashboard for content management (Supabase + React Admin)
- [ ] Comments system on blog posts (Giscus/GitHub Discussions)
- [ ] Multi-language support (i18n with react-i18next)
- [ ] Dark/Light mode toggle (currently dark-only)
- [ ] Interactive playground demos (CodeSandbox embeds)
- [ ] Newsletter archive page with past issues
- [ ] Case studies with detailed metrics
- [ ] Client testimonials with video
- [ ] Job board for collaborators/hiring
- [ ] Headless CMS migration (Sanity or Strapi)

---

## 📚 RESOURCES & REFERENCES

**Documentation:**
- React Router: https://reactrouter.com/docs
- Framer Motion: https://www.framer.com/motion/
- Supabase: https://supabase.com/docs
- Resend: https://resend.com/docs

**Tools:**
- Lighthouse CI: https://github.com/GoogleChrome/lighthouse-ci
- aXe DevTools: https://www.deque.com/axe/devtools/
- React DevTools: https://react.dev/learn/react-developer-tools
- Vercel CLI: https://vercel.com/docs/cli

**Design Inspiration:**
- Resend.com - Clean multi-page architecture
- Vercel.com - Dark theme, professional polish
- Linear.app - Smooth animations
- Stripe.com - Clear navigation

---

## ✅ NEXT STEPS (Immediate Actions)

1. **Create `dev` branch:**
   ```bash
   git checkout -b dev
   git push origin dev
   ```

2. **Set up Vercel preview for `dev` branch:**
   - Go to Vercel Dashboard → Settings → Git
   - Enable deployments for `dev` branch

3. **Run sample posts SQL:**
   - Open Supabase SQL Editor
   - Copy contents of `scripts/insert-sample-posts.sql`
   - Execute
   - Verify 6 posts appear in `blog_posts` table

4. **Install fonts:**
   - Add Google Fonts link to `index.html`
   - Update CSS with font variables

5. **Begin Phase 1 (Routing):**
   - Install `react-router-dom`
   - Create `src/layouts/MainLayout.jsx`
   - Create page components in `src/pages/`

---

## 💬 COMMUNICATION PLAN

**Weekly Check-ins:**
- Review completed tasks
- Identify blockers
- Adjust timeline if needed

**Milestone Demos:**
- End of Phase 1: Routing working
- End of Phase 3: All pages implemented
- End of Phase 7: Production launch

**Tools:**
- GitHub Projects for task tracking
- Git commits with conventional commit messages
- This document as single source of truth

---

**Document Version:**
- v1.0 (2025-10-13): Initial implementation plan created
- Next Update: End of Phase 1 (routing complete)

---

## 🎉 FINAL THOUGHTS

This is an ambitious project, but by breaking it into manageable phases, we can systematically migrate KAINET to a professional, scalable architecture.

**Key Principles:**
- ✅ **Incremental Progress:** Ship small, test often
- ✅ **Maintain Quality:** Don't sacrifice UX for speed
- ✅ **Stay Flexible:** Adjust plan based on learnings
- ✅ **Preserve Identity:** Keep KAINET's unique 3D aesthetic

**Let's build something amazing! 🚀**
