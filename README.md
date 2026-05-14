# Robertfolio

A production-grade interactive developer portfolio built with SvelteKit, TailwindCSS, TypeScript, and GSAP. Designed to feel like an experience — not just a page.

**Live URL:** https://robert-dominic.vercel.app

---

## Setup

```bash
npm install
cp .env.example .env   # fill in your environment variables
npm run dev
```

## Environment Variables

| Variable | Purpose |
|---|---|
| `GROQ_API_KEY` | Groq API key for the Nova AI chat assistant |
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `PUBLIC_SITE_URL` | Your deployed site URL (used for OG meta tags) |

## Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run check` | Type check with svelte-check |
| `npm run preview` | Preview production build locally |

---

## Architecture

Robertfolio is built on SvelteKit with a file-based routing structure. The application has three main routes:

- `/` — Single scrollable home page containing the Hero, About, Projects Preview, and Contact sections
- `/projects` — Paginated grid of all projects (6 per page)
- `/projects/[slug]` — Individual project detail page with prev/next navigation

Project data is centralized in `src/data/projects.ts` — a typed TypeScript array that acts as the single source of truth for all project content across every route. This means adding a new project requires updating one file only.

Component architecture follows a clear separation: `layout/` components handle structural elements (Navbar, Footer, AI Panel), `sections/` components map to page sections (Hero, About, Projects, Contact), and `ui/` components are reusable primitives (ProjectCard, TechBadge, Toast, Lightbox).

The AI assistant (Nova) communicates through a SvelteKit server endpoint at `/api/chat` which proxies requests to the Groq API. The API key never touches the client — it lives exclusively in server-side environment variables accessed via `$env/static/private`.

---

## Animation Decisions

Animations are intentional and minimal. Every animation has a reason — nothing is decorative for its own sake.

**GSAP** is used for:
- Hero entrance sequence (staggered fade-up on name, title, description, buttons)
- Section reveal on viewport entry via ScrollTrigger
- Stacked card scroll effect on the projects section
- Flying paper airplane animation on contact form submission
- Page load blur reveal on individual project pages

**CSS animations** are used for:
- Infinite auto-scrolling project image carousel in the hero
- Infinite tech stack marquee in the about section
- Sparkle particle burst on primary button clicks
- Theme toggle transition
- Side panel slide-in for the Nova AI assistant

The reason for this split: CSS animations are more performant for continuous looping effects (carousel, marquee) since they run on the compositor thread without JavaScript involvement. GSAP is reserved for sequenced, scroll-driven, or stateful animations that need precise control.

**Reduced motion:** All GSAP animations are wrapped in a `prefers-reduced-motion` check and skipped entirely for users who have enabled reduced motion in their OS. CSS animations are disabled via `@media (prefers-reduced-motion: reduce)`.

All GSAP ScrollTrigger instances and timelines are killed inside Svelte's `onDestroy` lifecycle to prevent memory leaks between route navigations.

---

## Performance Optimizations

- **Fonts:** Geist and Ubuntu are loaded via `@fontsource` packages (self-hosted). No external font requests, no render-blocking network calls.
- **Images:** All below-the-fold images use `loading="lazy"` with explicit `width` and `height` attributes to prevent cumulative layout shift (CLS).
- **CSS:** TailwindCSS is purged in production — only used utility classes are included in the final bundle.
- **Animations:** All animations use `transform` and `opacity` only. No layout-triggering properties (width, height, top, left) are animated, keeping all animations on the compositor thread.
- **Carousel and marquee:** Driven by CSS `@keyframes` rather than JavaScript `setInterval` to avoid main thread involvement during continuous motion.
- **Memory:** All GSAP instances, ScrollTrigger registrations, and event listeners are cleaned up in `onDestroy` to prevent memory leaks during client-side navigation.
- **Server routes:** The `/api/chat` endpoint handles AI requests server-side, keeping the client bundle lean.

---

## Accessibility

- **Skip link:** A visually hidden "Skip to main content" link sits at the top of every page and becomes visible on keyboard focus, allowing keyboard users to bypass navigation.
- **Semantic HTML:** All pages use proper landmark elements — `nav`, `main`, `section`, `footer` — with a clear heading hierarchy (h1 → h2 → h3) on every route.
- **Focus states:** Visible focus styles are applied to every focusable element. `outline: none` is never used without a styled replacement.
- **ARIA labels:** All icon-only buttons and links have descriptive `aria-label` attributes.
- **Forms:** Every input has an associated `<label>` element with matching `for`/`id`, `aria-required`, and `aria-describedby` pointing to inline error messages.
- **Modals and panels:** Focus is trapped inside the resume modal and Nova AI panel when open. ESC key closes both. Background scroll is locked while they are open.
- **Reduced motion:** All animations respect `prefers-reduced-motion` at both the GSAP and CSS levels.
- **Color contrast:** Both light and dark themes maintain WCAG AA contrast ratios across all text and interactive elements.

---

## Trade-offs

- **No backend database:** Project data lives in a static TypeScript file (`src/data/projects.ts`) rather than a database or CMS. This keeps the architecture simple and the site fast, but means adding projects requires a code change and redeployment. For a portfolio this size, the trade-off is acceptable.
- **Contact form via Resend:** Rather than building a full backend, the contact form uses Resend's API through a SvelteKit server endpoint. This is reliable for low-volume portfolio contact but would need replacing for high-volume use.
- **Groq for AI:** Groq was chosen over other providers for its free tier and fast inference speed. The Nova assistant is stateless per session on the server — chat history is persisted client-side in localStorage rather than a database, which keeps infrastructure simple but means history is device-specific.
- **Placeholder images:** Project images are currently placeholders. Real screenshots will be added before final submission without any architectural changes required.
- **Cal.com scheduling:** The scheduling link is an external Cal.com URL rather than an embedded widget, keeping bundle size down at the cost of a context switch for the user.
