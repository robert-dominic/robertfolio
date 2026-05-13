export type Project = {
	id: number;
	slug: string;
	title: string;
	description: string;
	longDescription: string;
	tech: string[];
	image: string;
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
		slug: 'ducor-residences',
		title: 'Ducor Residences',
		description:
			'A polished luxury property marketing platform focused on immersive storytelling, reservations, and lead capture.',
		longDescription:
			'Ducor Residences is a premium real estate experience built to showcase luxury apartments with elegant layouts, rich media, and conversion-focused booking flows. The product balances visual refinement with fast interactions, accessible content structure, and a clean CMS-friendly architecture that makes future updates straightforward.\n\nThe frontend was designed around modular sections, responsive image presentation, and smooth motion that enhances the sense of quality without affecting performance. It also leaves room for future integrations like CRM syncing, virtual tour booking, and resident concierge features.',
		tech: ['SvelteKit', 'TypeScript', 'TailwindCSS', 'GSAP'],
		image: '/images/projects/placeholder.jpg',
		alt: 'A luxury property showcase interface with editorial image cards and booking call to action',
		liveUrl: 'https://example.com/ducor-residences',
		githubUrl: 'https://github.com/example/ducor-residences',
		date: '2024',
		type: 'Frontend',
		client: 'Private Client',
		featured: true
	},
	{
		id: 2,
		slug: 'pulse-ops-dashboard',
		title: 'Pulse Ops Dashboard',
		description:
			'A real-time operations dashboard for monitoring metrics, alerts, and workflow health across multiple teams.',
		longDescription:
			'Pulse Ops Dashboard helps teams track live system activity, operational performance, and critical status updates from a single interface. The experience was built to support rapid scanning, dependable contrast, and clear information hierarchy for time-sensitive use cases.\n\nThe application architecture emphasizes reusable chart containers, filter states, and responsive grid patterns that translate well from desktop control rooms to smaller tablet workstations. It was also planned with room for role-based access and server-driven analytics expansion.',
		tech: ['React', 'TypeScript', 'Supabase', 'TailwindCSS'],
		image: '/images/projects/placeholder.jpg',
		alt: 'A real-time analytics dashboard with metric cards, trend graphs, and alert panels',
		liveUrl: 'https://example.com/pulse-ops-dashboard',
		githubUrl: 'https://github.com/example/pulse-ops-dashboard',
		date: '2023',
		type: 'Full Stack',
		client: 'Internal Product',
		featured: true
	},
	{
		id: 3,
		slug: 'stacklane-marketplace',
		title: 'Stacklane Marketplace',
		description:
			'A marketplace platform for digital products with vendor onboarding, listings, and conversion-focused discovery.',
		longDescription:
			'Stacklane Marketplace is a modern commerce interface for creators selling developer-focused resources and tooling. The project combines product browsing, clean taxonomy navigation, and a confident visual system meant to support trust and quick evaluation.\n\nThe codebase was structured to keep UI primitives reusable across listing, detail, and checkout-adjacent experiences. That foundation makes it practical to extend into richer personalization, saved collections, or analytics-backed merchandising without rewriting the front end.',
		tech: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'],
		image: '/images/projects/placeholder.jpg',
		alt: 'A developer marketplace browsing page with product cards and category filters',
		liveUrl: 'https://example.com/stacklane-marketplace',
		githubUrl: 'https://github.com/example/stacklane-marketplace',
		date: '2024',
		type: 'Full Stack',
		client: 'Startup Product',
		featured: false
	},
	{
		id: 4,
		slug: 'nova-onboarding',
		title: 'Nova Onboarding',
		description:
			'A multi-step onboarding flow for a SaaS platform with progress tracking, field validation, and role selection.',
		longDescription:
			'Nova Onboarding was built to reduce activation friction for new SaaS users. The interface uses a step-by-step flow with clear progress indication, inline validation, and adaptive field presentation based on role selection.\n\nThe component architecture treats each onboarding step as an independent unit, making it easy to reorder, gate, or A/B test steps without touching the surrounding shell. The design system ensures visual consistency with the rest of the product while keeping the onboarding experience focused and distraction-free.',
		tech: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
		image: '/images/projects/placeholder.jpg',
		alt: 'A multi-step onboarding interface with a progress bar and form fields',
		liveUrl: 'https://example.com/nova-onboarding',
		githubUrl: '',
		date: '2024',
		type: 'Frontend',
		client: 'SaaS Client',
		featured: false
	},
	{
		id: 5,
		slug: 'filedrop-app',
		title: 'FileDrop',
		description:
			'A clean file storage and sharing interface with drag-and-drop uploads, folder organization, and link generation.',
		longDescription:
			'FileDrop is a minimal file management product built around the drag-and-drop interaction model. Users can upload files instantly, organize them into nested folders, and generate shareable links with optional expiry settings.\n\nThe frontend was optimized for handling large upload feedback states without freezing the UI, using streaming progress indicators and background queue management. The overall aesthetic keeps the experience clean and fast, reducing cognitive load during file management tasks.',
		tech: ['SvelteKit', 'Supabase', 'TypeScript', 'TailwindCSS'],
		image: '/images/projects/placeholder.jpg',
		alt: 'A file storage interface with drag-and-drop upload zones and folder grid',
		liveUrl: 'https://example.com/filedrop',
		githubUrl: 'https://github.com/example/filedrop',
		date: '2023',
		type: 'Full Stack',
		client: 'Personal Project',
		featured: false
	},
	{
		id: 6,
		slug: 'devlog-blog',
		title: 'DevLog Blog Platform',
		description:
			'A developer-focused blogging platform with markdown support, syntax highlighting, and tag-based filtering.',
		longDescription:
			'DevLog is a content publishing platform built for developers who want to write and share technical articles without fighting a complex CMS. Articles are written in markdown, rendered with syntax-highlighted code blocks, and organized through a flexible tag system.\n\nThe architecture separates content authoring from presentation cleanly, allowing the same content to be served across RSS, the web, and potential future channels without modification. Reader experience was prioritized — fast load times, comfortable line lengths, and a typographic hierarchy that makes long-form reading comfortable.',
		tech: ['Next.js', 'MDX', 'TypeScript', 'TailwindCSS'],
		image: '/images/projects/placeholder.jpg',
		alt: 'A developer blog platform with article cards and tag-based filtering',
		liveUrl: 'https://example.com/devlog',
		githubUrl: 'https://github.com/example/devlog',
		date: '2023',
		type: 'Frontend',
		client: 'Open Source',
		featured: false
	},
	{
		id: 7,
		slug: 'cartwave-ecommerce',
		title: 'CartWave',
		description:
			'A high-conversion e-commerce storefront with product filtering, cart management, and optimized checkout flow.',
		longDescription:
			'CartWave is a performance-focused e-commerce frontend built to support high-volume product catalogs without compromising page speed. The storefront features faceted filtering, persistent cart state, and a streamlined checkout experience that reduces drop-off at payment.\n\nThe product listing architecture uses virtualized rendering for large catalogs and optimistic UI updates for cart interactions, keeping the perceived performance snappy even on slower connections. The checkout flow was designed around reducing friction — minimal fields, clear progress, and error recovery that guides rather than blocks.',
		tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'Stripe'],
		image: '/images/projects/placeholder.jpg',
		alt: 'An e-commerce product listing page with filter sidebar and product grid',
		liveUrl: 'https://example.com/cartwave',
		githubUrl: 'https://github.com/example/cartwave',
		date: '2024',
		type: 'Full Stack',
		client: 'E-commerce Client',
		featured: false
	},
	{
		id: 8,
		slug: 'meetroom-scheduling',
		title: 'MeetRoom',
		description:
			'A meeting room booking platform with calendar sync, real-time availability, and occupancy analytics.',
		longDescription:
			'MeetRoom was designed to remove the friction from office space coordination. Users can browse available rooms by capacity, time slot, and floor — then book in seconds with calendar integration that syncs across Google and Outlook.\n\nThe real-time availability layer uses WebSocket connections to keep all users seeing live occupancy without manual refreshes. An admin dashboard tracks utilization patterns and surfaces underused rooms, helping facilities teams make data-informed space decisions.',
		tech: ['React', 'Node.js', 'Supabase', 'TypeScript'],
		image: '/images/projects/placeholder.jpg',
		alt: 'A room booking interface with a calendar grid and availability indicators',
		liveUrl: 'https://example.com/meetroom',
		githubUrl: 'https://github.com/example/meetroom',
		date: '2023',
		type: 'Full Stack',
		client: 'Enterprise Client',
		featured: false
	},
	{
		id: 9,
		slug: 'codespace-editor',
		title: 'CodeSpace Editor',
		description:
			'A browser-based code editor with live preview, multi-file tabs, and shareable sandbox environments.',
		longDescription:
			'CodeSpace is an in-browser development environment built for quick prototyping and educational demonstrations. Users write HTML, CSS, and JavaScript across split-pane tabs and see live preview output update in real time without manual runs.\n\nThe editor supports syntax highlighting, basic autocomplete, and error display in the output panel. Sandboxes can be saved and shared via URL, making it useful for tutorials, interview exercises, and frontend experimentation without any local setup.',
		tech: ['SvelteKit', 'TypeScript', 'CodeMirror', 'TailwindCSS'],
		image: '/images/projects/placeholder.jpg',
		alt: 'A browser code editor with split panes for code and live preview',
		liveUrl: 'https://example.com/codespace',
		githubUrl: 'https://github.com/example/codespace',
		date: '2024',
		type: 'Frontend',
		client: 'Open Source',
		featured: false
	},
	{
		id: 10,
		slug: 'flare-analytics',
		title: 'Flare Analytics',
		description:
			'A lightweight web analytics dashboard with session tracking, funnel visualization, and event breakdown.',
		longDescription:
			'Flare Analytics provides product teams with clear insight into user behavior without the complexity of enterprise analytics tools. The dashboard surfaces session counts, top pages, conversion funnels, and custom event breakdowns in a clean, scannable layout.\n\nThe visualization layer was built with performance in mind — charts render from pre-aggregated data to keep load times under a second even for high-traffic sites. The design uses careful color restraint and information grouping to make dense data readable without overwhelming the viewer.',
		tech: ['React', 'TypeScript', 'D3.js', 'TailwindCSS'],
		image: '/images/projects/placeholder.jpg',
		alt: 'An analytics dashboard with funnel charts, session graphs, and event tables',
		liveUrl: 'https://example.com/flare-analytics',
		githubUrl: 'https://github.com/example/flare-analytics',
		date: '2024',
		type: 'Frontend',
		client: 'Startup Product',
		featured: false
	},
	{
		id: 11,
		slug: 'trailhead-events',
		title: 'Trailhead Events',
		description:
			'An event discovery and ticketing platform with map-based browsing, group RSVPs, and organizer dashboards.',
		longDescription:
			'Trailhead Events was built to make discovering and attending local events feel natural. The map-first browsing experience lets users find events nearby, filter by category, and RSVP with a single click — with automatic calendar export included.\n\nOrganizers get a dedicated dashboard for managing event listings, tracking attendance, and communicating with registrants. The ticketing flow handles both free and paid events, with Stripe integration for payment processing and PDF ticket generation handled server-side.',
		tech: ['Next.js', 'Supabase', 'TypeScript', 'Mapbox'],
		image: '/images/projects/placeholder.jpg',
		alt: 'An event discovery interface with a map view and event cards grid',
		liveUrl: 'https://example.com/trailhead',
		githubUrl: 'https://github.com/example/trailhead',
		date: '2023',
		type: 'Full Stack',
		client: 'Community Platform',
		featured: false
	},
	{
		id: 12,
		slug: 'nexus-crm',
		title: 'Nexus CRM',
		description:
			'A lightweight CRM interface for small sales teams with pipeline management, contact tracking, and activity logs.',
		longDescription:
			'Nexus CRM was designed for small sales teams that need structure without the overhead of enterprise tools. The pipeline view gives reps a clear overview of deal stages, and the contact detail page surfaces every interaction — emails, calls, notes — in a unified timeline.\n\nThe activity logging system captures user actions automatically where possible, reducing the manual overhead that causes CRM data to go stale. The interface was built around keyboard shortcuts and fast navigation, letting power users move between records and update deal stages without ever reaching for the mouse.',
		tech: ['SvelteKit', 'Supabase', 'TypeScript', 'TailwindCSS'],
		image: '/images/projects/placeholder.jpg',
		alt: 'A CRM pipeline view with kanban-style deal columns and contact cards',
		liveUrl: 'https://example.com/nexus-crm',
		githubUrl: 'https://github.com/example/nexus-crm',
		date: '2024',
		type: 'Full Stack',
		client: 'B2B Startup',
		featured: false
	}
];

export const featuredProjects = projects.filter((project) => project.featured);
