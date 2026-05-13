# Robertfolio

**Live URL:** <!-- add deployed URL here -->
**GitHub:** <!-- add repo URL here -->

---

## Setup

```bash
npm install
cp .env.example .env   # fill in GROQ_API_KEY, RESEND_API_KEY, PUBLIC_CAL_URL, PUBLIC_SITE_URL
npm run dev
```

## Environment Variables

| Variable | Purpose |
|---|---|
| `GROQ_API_KEY` | Groq API key for the AI chat assistant |
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `PUBLIC_CAL_URL` | Your Cal.com scheduling link |
| `PUBLIC_SITE_URL` | Your deployed site URL (used for OG tags) |

## Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run check` | Type check with svelte-check |
| `npm run preview` | Preview production build locally |

---

## Architecture

<!-- Describe your architecture decisions here -->

## Animation Decisions

<!-- Describe your GSAP vs CSS choices, reduced motion handling, etc. -->

## Performance Optimizations

<!-- Describe font loading, lazy images, CSS-only animations, bundle strategy, etc. -->

## Accessibility

<!-- Describe skip link, focus trapping, ARIA usage, keyboard nav, reduced motion, etc. -->

## Trade-offs

<!-- Describe any intentional trade-offs or known limitations -->
