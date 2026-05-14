<script lang="ts">
	import "@fontsource/geist/400.css";
	import "@fontsource/geist/500.css";
	import "@fontsource/geist/700.css";
	import "@fontsource/ubuntu/400.css";
	import "@fontsource/ubuntu/500.css";
	import "../app.css";
	import favicon from "$lib/assets/favicon.jpg";
	import AiPanel from "$lib/components/layout/AiPanel.svelte";
	import Footer from "$lib/components/layout/Footer.svelte";
	import MobileNav from "$lib/components/layout/MobileNav.svelte";
	import Navbar from "$lib/components/layout/Navbar.svelte";
	import ResumeModal from "$lib/components/layout/ResumeModal.svelte";
	import SkipLink from "$lib/components/layout/SkipLink.svelte";
	import Toast from "$lib/components/ui/Toast.svelte";
	import { aiPanelOpen, resumeModalOpen, toastState } from "$lib/stores/ui";
	import { prefersReducedMotion } from "$lib/utils/animationHelpers";
	import { onNavigate } from "$app/navigation";
	import { PUBLIC_SITE_URL } from "$env/static/public";
	import gsap from "gsap";
	import { get } from "svelte/store";

	let { children } = $props();
	let pageShell: HTMLElement | null = null;
	let isDark = $state(false);

	const openAiPanel = () => {
		aiPanelOpen.update((v) => !v);
	};

	const closeAiPanel = () => {
		aiPanelOpen.set(false);
	};

	const openResumeModal = () => {
		resumeModalOpen.set(true);
	};

	const closeResumeModal = () => {
		resumeModalOpen.set(false);
	};

	const showToastMessage = (
		message: string,
		tone: "success" | "error" = "success",
	) => {
		toastState.set({ open: true, message, tone });
	};

	const applyTheme = (theme: "light" | "dark") => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		document.documentElement.classList.toggle("light", theme === "light");
		localStorage.setItem("robertfolio-theme", theme);
		isDark = theme === "dark";
	};

	const toggleTheme = () => {
		applyTheme(isDark ? "light" : "dark");
	};

	$effect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const storedTheme = localStorage.getItem("robertfolio-theme");
		const theme =
			storedTheme ??
			(window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light");
		applyTheme(theme as "light" | "dark");
	});

	// SvelteKit's onNavigate fires before the new page renders.
	// Returning a Promise lets us fade out first, then resolve to fade in.
	onNavigate(() => {
		if (!pageShell || prefersReducedMotion()) {
			return;
		}

		return new Promise<() => void>((resolve) => {
			gsap.to(pageShell, {
				opacity: 0,
				duration: 0.2,
				ease: "power1.out",
				onComplete: () =>
					resolve(() => {
						if (!pageShell) {
							return;
						}

						gsap.fromTo(
							pageShell,
							{ opacity: 0 },
							{ opacity: 1, duration: 0.2, ease: "power1.out" },
						);
					}),
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preload" href="/images/photos/image-2.webp" as="image" type="image/webp" />
	<meta
		name="description"
		content="Robert Dominic is a self-taught full-stack frontend engineer building performant, thoughtful digital products."
	/>
	<!-- Open Graph defaults (overridden per page) -->
	<meta property="og:site_name" content="Robert Dominic" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Robert Dominic — Frontend Engineer" />
	<meta
		property="og:description"
		content="Robert Dominic is a self-taught full-stack frontend engineer building performant, thoughtful digital products."
	/>
	<meta property="og:image" content={`${PUBLIC_SITE_URL}/images/photos/image-1.jpg`} />
	<meta property="og:url" content={PUBLIC_SITE_URL} />
	<!-- Twitter / X card defaults -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Robert Dominic — Frontend Engineer" />
	<meta
		name="twitter:description"
		content="Robert Dominic is a self-taught full-stack frontend engineer building performant, thoughtful digital products."
	/>
	<meta name="twitter:image" content={`${PUBLIC_SITE_URL}/images/photos/image-1.jpg`} />
</svelte:head>

<SkipLink />

<Navbar
	{isDark}
	onToggleTheme={toggleTheme}
	onOpenAi={openAiPanel}
	onOpenResume={openResumeModal}
/>
<MobileNav
	{isDark}
	onToggleTheme={toggleTheme}
	onOpenAi={openAiPanel}
	onOpenResume={openResumeModal}
/>

<div bind:this={pageShell} class="min-h-screen">
	{@render children()}
</div>

<Footer />

<AiPanel open={$aiPanelOpen} onClose={closeAiPanel} />
<ResumeModal
	open={$resumeModalOpen}
	onClose={closeResumeModal}
	onToast={showToastMessage}
/>
<Toast
	message={$toastState.message}
	tone={$toastState.tone}
	open={$toastState.open}
	onClose={() => toastState.set({ ...get(toastState), open: false })}
/>
