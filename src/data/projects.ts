export type Project = {
	id: number;
	slug: string;
	title: string;
	description: string;
	longDescription: string;
	tech: string[];
	images: string[];
	alt: string;
	liveUrl: string;
	githubUrl?: string;
	date: string;
	type: string;
	client: string;
	featured: boolean;
};

export const projects: Project[] = [
	{
		id: 1,
		slug: 'robertfolio',
		title: 'Robertfolio',
		description:
			'A production-grade interactive developer portfolio built with SvelteKit, TailwindCSS, TypeScript, and GSAP. Designed to feel like an experience — not just a page.',
		longDescription:
			'Robertfolio is my personal developer portfolio built to showcase projects and skills through an immersive, animation-rich experience. It features a custom AI assistant (Nova) powered by Groq, a contact form with email integration via Resend, and carefully crafted GSAP animations that create a narrative flow as users scroll. The architecture uses SvelteKit with file-based routing, centralized project data, and a clean component structure separating layout, sections, and UI primitives. Performance was prioritized through self-hosted fonts, lazy-loaded images, compositor-thread animations, and proper cleanup of GSAP instances to prevent memory leaks. Accessibility is fully implemented with skip links, semantic HTML, visible focus states, ARIA labels, focus trapping in modals, and full reduced-motion support.',
		tech: ['SvelteKit', 'TypeScript', 'TailwindCSS', 'GSAP'],
		images: [
			'/images/projects/robertfolio-1.png',
			'/images/projects/robertfolio-2.png',
			'/images/projects/robertfolio-3.png'
		],
		alt: 'A developer portfolio interface with hero section, project previews, and animated elements',
		liveUrl: 'https://robert-dominic.vercel.app',
		githubUrl: 'https://github.com/robert-dominic/robertfolio',
		date: '2026',
		type: 'Frontend',
		client: 'Personal Project',
		featured: true
	},
	{
		id: 2,
		slug: 'scenehunt',
		title: 'SceneHunt',
		description:
			'A modern, responsive movie discovery app that lets you browse popular movies, search for your favorites, and manage a personal watchlist with persistent local storage.',
		longDescription:
			'SceneHunt is a movie discovery application built to provide a smooth browsing experience for film enthusiasts. It integrates with The Movie Database (TMDB) API to fetch real-time movie data including popular titles, search results, and detailed information with cast and backdrops. The app features debounced real-time search for performance, skeleton loading states for perceived speed, and a personal favorites system that persists across sessions using localStorage. The responsive design adapts seamlessly from desktop to mobile, with toast notifications providing color-coded feedback for user actions like adding or removing favorites. The component architecture separates concerns cleanly between layout, pages, and reusable UI components, making the codebase maintainable and extensible.',
		tech: ['React', 'TailwindCSS', 'Vite'],
		images: [
			'/images/projects/scenehunt-1.png',
			'/images/projects/scenehunt-2.png',
			'/images/projects/scenehunt-3.png'
		],
		alt: 'A movie discovery interface with popular movie cards, search bar, and featured banner',
		liveUrl: 'https://scene-hunt-movies.vercel.app/',
		githubUrl: 'https://github.com/robert-dominic/sceneHunt',
		date: '2025',
		type: 'Frontend',
		client: 'Personal Project',
		featured: false
	},
	{
		id: 3,
		slug: 'ducor-residences',
		title: 'Ducor Residences',
		description:
			'A luxury guest house demo website built to showcase a polished hospitality web experience for businesses in Monrovia, Liberia — premium, restrained, and conversion-focused.',
		longDescription:
			'Ducor Residences is a luxury hospitality demo website designed as a freelance sales tool for guest houses in Monrovia, Liberia. Named after the historic Ducor hill, the site delivers a premium, restrained experience with cinematic motion-driven storytelling, room listings with detail flows, amenities and policy pages, a masonry gallery with fullscreen lightbox, and a complete booking flow with validation and live pricing. The frontend is built entirely client-side with no backend or CMS — all content is sourced from local JSON files and forms are simulated to keep the project lightweight and easy to present. The implementation focuses on Next.js App Router conventions, a custom hospitality design system, mobile-first responsive layouts, and refined Framer Motion transitions that feel intentional rather than decorative.',
		tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
		images: [
			'/images/projects/ducor-1.png',
			'/images/projects/ducor-2.png',
			'/images/projects/ducor-3.png'
		],
		alt: 'A luxury guest house website with room listings, booking flow, and cinematic landing page',
		liveUrl: 'https://ducor-residences.vercel.app/',
		githubUrl: 'https://github.com/robert-dominic/ducor-residences',
		date: '2026',
		type: 'Full Stack',
		client: 'Ducor',
		featured: true
	},
	{
		id: 4,
		slug: 'maison-zola',
		title: 'Maison Zola',
		description:
			'A premium bespoke tailoring demo website for a Liberian-based West African luxury fashion house, built to attract high-end clients locally and across the diaspora with an editorial aesthetic.',
		longDescription:
			'Maison Zola is a bespoke tailoring demo website designed for a luxury fashion house based in Monrovia, Liberia. The site communicates craft, cultural depth, and quiet confidence through a premium editorial aesthetic aimed at diaspora clients and local high-end customers. It features a cinematic homepage with brand highlights and featured collections, a full lookbook with category filtering, individual piece detail pages with fabric information, a bespoke tailoring service page with process and pricing tiers, a brand story section, and a validated contact enquiry form. The implementation uses Next.js App Router with TypeScript, a refined design system built on Tailwind CSS and shadcn/ui primitives, and intentional Framer Motion transitions that enhance the sense of luxury without compromising performance.',
		tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
		images: [
			'/images/projects/zola-1.png',
			'/images/projects/zola-2.png',
			'/images/projects/zola-3.png'
		],
		alt: 'A luxury bespoke tailoring website with lookbook, collection details, and brand story',
		liveUrl: 'https://maison-zola.vercel.app/',
		githubUrl: 'https://github.com/robert-dominic/maison-zola',
		date: '2026',
		type: 'Frontend',
		client: 'Zola',
		featured: false
	},
	{
		id: 5,
		slug: 'paypath-finance',
		title: 'PayPath Finance',
		description:
			'A personal finance platform built for the Nigerian market — manual income and expense tracking in Naira, savings goals, a financial health score based on habits, and an AI financial coach.',
		longDescription:
			'PayPath Finance is a personal finance application designed specifically for Nigerian users, where Western banking infrastructure assumptions do not apply. The platform supports manual income and expense tracking in Naira, customizable savings goals, a financial health scoring system based on spending habits rather than credit bureau reports, and an AI financial coach powered by Groq LLaMA 3.3. Built during the Quest Hackathon 2026 as part of a 7-person team, the project required handling real-world constraints like offline-first data entry, local currency formatting, and culturally relevant financial guidance. The architecture uses Next.js with React and TypeScript on the frontend, Node.js with Express on the backend, and PostgreSQL with Prisma ORM for data persistence. The scoring engine evaluates user behavior patterns to generate actionable insights, while the AI coach provides conversational financial advice tailored to Nigerian economic realities.',
		tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Node.js', 'PostgreSQL'],
		images: [
			'/images/projects/paypath-1.png',
			'/images/projects/paypath-2.jpeg',
			'/images/projects/paypath-3.jpeg'
		],
		alt: 'A personal finance dashboard with expense tracking, savings goals, and AI financial coach interface',
		liveUrl: 'https://paypath-finance.vercel.app/',
		githubUrl: '',
		date: '2026',
		type: 'Full Stack',
		client: 'Quest Hackathon 2026',
		featured: true
	},
	{
		id: 6,
		slug: 'the-tutor',
		title: 'TheTutor',
		description:
			'An AI-powered learning platform that discovers real textbooks through a custom MCP pipeline and synthesizes structured courses grounded in actual published material — with quizzes, exercises, citations, and video resources.',
		longDescription:
			'TheTutor is an AI learning platform built for the Amazon Nova AI Hackathon 2026 that solves the problem of shallow, generic AI-generated educational content. Instead of hallucinating material, it discovers real textbooks through a custom MCP pipeline connected to OpenLibrary, Gutendex, and Standard Ebooks, then uses Amazon Nova to synthesize complete structured courses grounded in actual published sources. Every generated course includes modules, lessons, quizzes, exercises, source citations, and curated video resources. The platform features real-time course generation via Server-Sent Events with per-lesson progress updates, a crash-resilient two-pass parallel generation pipeline with automatic recovery, voice read-aloud with synchronized text highlighting via AWS Polly, an AI lesson assistant for contextual follow-up questions, AI-graded open-ended quizzes evaluated by Nova, downloadable course certificates, and a community learning hub where users can explore and enroll in courses published by others. Authentication is handled through one-click Google OAuth with secure JWT cookie auth.',
		tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Node.js', 'MongoDB'],
		images: [
			'/images/projects/tutor-1.png',
			'/images/projects/tutor-2.png',
			'/images/projects/tutor-3.png'
		],
		alt: 'An AI learning platform interface with course generation, lesson viewer, and quiz components',
		liveUrl: 'https://the-tutor-app.vercel.app/',
		githubUrl: '',
		date: '2026',
		type: 'Full Stack',
		client: 'Amazon Nova AI Hackathon 2026',
		featured: true
	}
];

export const featuredProjects = projects.filter((project) => project.featured);
