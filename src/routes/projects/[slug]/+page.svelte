<script lang="ts">
	import Lightbox from '$lib/components/ui/Lightbox.svelte';
	import TechBadge from '$lib/components/ui/TechBadge.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { prefersReducedMotion } from '$lib/utils/animationHelpers';

	let { data } = $props();
	const project = $derived(data.project);
	const previousProject = $derived(data.previousProject);
	const nextProject = $derived(data.nextProject);
	let article = $state<HTMLElement | null>(null);
	let lightboxOpen = $state(false);
	let activeImage = $state('');
	const coverImage = $derived(project.images[0] ?? '');

	const gallery = $derived(
		project.images.map((src, index) => ({
			src,
			alt: index === 0 ? project.alt : `${project.alt} view ${index + 1}`
		}))
	);

	onMount(() => {
		activeImage = coverImage;
		if (prefersReducedMotion() || !article) return;

		const tween = gsap.fromTo(
			article,
			{ opacity: 0, filter: 'blur(8px)' },
			{ opacity: 1, filter: 'blur(0px)', duration: 0.6 }
		);

		return () => tween.kill();
	});

	const openLightbox = (src: string) => {
		activeImage = src;
		lightboxOpen = true;
	};

	const visitProject = () => {
		window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
	};

	import { PUBLIC_SITE_URL } from '$env/static/public';
	const siteUrl = PUBLIC_SITE_URL;
	const pageUrl = $derived(`${siteUrl}/projects/${project.slug}`);
	const ogImage = $derived(coverImage.startsWith('http') ? coverImage : `${siteUrl}${coverImage}`);
</script>

<svelte:head>
	<title>{project.title} — Robert Dominic</title>
	<meta name="description" content={project.description} />
	<meta property="og:title" content="{project.title} — Robert Dominic" />
	<meta property="og:description" content={project.description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:type" content="article" />
	<meta name="twitter:title" content="{project.title} — Robert Dominic" />
	<meta name="twitter:description" content={project.description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<main id="main-content" class="section-shell pb-20 pt-10">
	<article bind:this={article} class="space-y-8">

		<!-- Title + description -->
		<header class="space-y-3">
			<h1 class="text-2xl sm:text-3xl">{project.title}</h1>
			<p class="text-measure-tight">{project.description}</p>
		</header>

		<!-- Info card -->
		<div class="surface-card rounded-2xl p-6 sm:p-8 text-[1rem] leading-7 lg:text-[1.0625rem] lg:leading-8" style="font-family: 'Ubuntu', sans-serif;">
			<h2 class="text-[0.95rem] font-semibold sm:text-base lg:text-[1.1rem]">Description</h2>
			<div class="mt-3 space-y-4">
				{#each project.longDescription.split('\n\n') as paragraph}
					<p class="text-measure-tight text-[0.95rem] sm:text-base lg:text-[1.0625rem]">{paragraph}</p>
				{/each}
			</div>

			<h2 class="mt-8 text-[0.95rem] font-semibold sm:text-base lg:text-[1.1rem]">Technologies</h2>
			<div class="mt-3 flex flex-wrap gap-2">
				{#each project.tech as tech}
					<TechBadge label={tech} />
				{/each}
			</div>

			<div class="mt-8 grid gap-6 sm:grid-cols-3">
				<div>
					<p class="caption-text mb-1.5">Date</p>
					<p class="text-sm">{project.date}</p>
				</div>
				<div>
					<p class="caption-text mb-1.5">Type</p>
					<p class="text-sm">{project.type}</p>
				</div>
				<div>
					<p class="caption-text mb-1.5">Client</p>
					<p class="text-sm">{project.client}</p>
				</div>
			</div>
		</div>

		<!-- Actions row: Visit Project (left) + Prev/Next (right) -->
		<div class="flex items-center justify-between gap-4">
			<button
				type="button"
				onclick={visitProject}
				class="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-text)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] hover:opacity-80"
			>
				Visit Project
				<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
				</svg>
			</button>

			<div class="flex items-center gap-2">
				<a
					href={`/projects/${previousProject.slug}`}
					class="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium hover:bg-[var(--color-accent-soft)]"
				>
					<Icon name="chevron-left" class="h-4 w-4" />
					Prev
				</a>
				<a
					href={`/projects/${nextProject.slug}`}
					class="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium hover:bg-[var(--color-accent-soft)]"
				>
					Next
					<Icon name="chevron-right" class="h-4 w-4" />
				</a>
			</div>
		</div>

		<!-- Main large image -->
		<button
			type="button"
			class="w-full cursor-pointer overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1"
			aria-label={`View full image for ${project.title}`}
			onclick={() => openLightbox(gallery[0].src)}
		>
			<img
				src={gallery[0].src}
				alt={gallery[0].alt}
				width="960"
				height="600"
				class="w-full rounded-2xl object-cover"
			/>
		</button>

		<!-- 2-col gallery -->
		<div class="grid gap-4 sm:grid-cols-2">
			{#each gallery.slice(1) as image}
				<button
					type="button"
					class="cursor-pointer overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1"
					aria-label={`View image for ${project.title}`}
					onclick={() => openLightbox(image.src)}
				>
					<img
						src={image.src}
						alt={image.alt}
						width="960"
						height="720"
						class="h-52 w-full rounded-xl object-cover transition duration-200 hover:scale-[1.02]"
					/>
				</button>
			{/each}
		</div>

	</article>
</main>

<Lightbox open={lightboxOpen} src={activeImage} alt={project.alt} onClose={() => (lightboxOpen = false)} />
