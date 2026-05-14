<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { projects } from "$data/projects";
	import ProjectCard from "$lib/components/ui/ProjectCard.svelte";
	import SparkleButton from "$lib/components/ui/SparkleButton.svelte";
	import { prefersReducedMotion } from "$lib/utils/animationHelpers";
	import gsap from "gsap";

	const perPage = 4;
	const activeType = $derived(page.url.searchParams.get("type") ?? "all");
	const currentPage = $derived(
		Number(page.url.searchParams.get("page") ?? "1"),
	);

	const filteredProjects = $derived(
		activeType === "all"
			? projects
			: projects.filter((p) => p.type === activeType),
	);
	const totalPages = $derived(
		Math.max(1, Math.ceil(filteredProjects.length / perPage)),
	);
	const safePage = $derived(Math.min(Math.max(currentPage, 1), totalPages));
	const paginatedProjects = $derived(
		filteredProjects.slice((safePage - 1) * perPage, safePage * perPage),
	);

	let grid = $state<HTMLElement | null>(null);

	$effect(() => {
		const _dep = safePage + activeType;
		if (!grid || prefersReducedMotion()) return;
		gsap.fromTo(grid, { opacity: 0 }, { opacity: 1, duration: 0.25 });
	});

	const makePageUrl = (nextPage: number) =>
		`/projects?type=${activeType}&page=${nextPage}`;

	const onFilterChange = (e: Event) => {
		const type = (e.target as HTMLSelectElement).value;
		goto(`/projects?type=${type}&page=1`, { replaceState: false });
	};
</script>

<svelte:head>
	<title>All Projects — Robert Dominic</title>
	<meta property="og:title" content="All Projects — Robert Dominic" />
	<meta
		property="og:description"
		content="A broader look at Robert's product work across frontend systems, dashboards, platforms, and editorial experiences."
	/>
	<meta property="og:url" content="https://robertfolio.vercel.app/projects" />
	<meta name="twitter:title" content="All Projects — Robert Dominic" />
	<meta
		name="twitter:description"
		content="A broader look at Robert's product work across frontend systems, dashboards, platforms, and editorial experiences."
	/>
</svelte:head>

<main id="main-content" class="section-shell pb-20 pt-12 sm:pt-16">
	<p class="caption-text mb-4">Archive</p>
	<div class="flex items-center justify-between gap-4">
		<h1 class="text-[1.5rem] font-[400] sm:text-3xl">All Projects</h1>
		<div class="flex items-center gap-2.5">
			<label
				for="type-filter"
				class="caption-text hidden sm:block shrink-0">Filter by</label
			>
			<div class="relative">
				<select
					id="type-filter"
					value={activeType}
					onchange={onFilterChange}
					class="appearance-none cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] py-2 pl-3.5 pr-8 text-sm font-medium text-[var(--color-text)] shadow-[var(--shadow-card)] transition hover:border-[var(--color-text-soft)] outline-none"
				>
					<option
						value="all"
						style="background: var(--color-bg); color: var(--color-text);"
						>All</option
					>
					<option
						value="Frontend"
						style="background: var(--color-bg); color: var(--color-text);"
						>Frontend</option
					>
					<option
						value="Full Stack"
						style="background: var(--color-bg); color: var(--color-text);"
						>Full Stack</option
					>
				</select>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-soft)]"
					aria-hidden="true"
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</div>
		</div>
	</div>
	<p class="mt-5 text-measure-tight">
		Here are some of the projects I’ve designed, built, and refined across
		products, dashboards, tools, and web experiences.
	</p>

	{#if filteredProjects.length === 0}
		<div class="surface-card mt-10 rounded-[2rem] p-8">
			<p>No projects available yet.</p>
		</div>
	{:else}
		<div bind:this={grid} class="mt-8 grid gap-6 md:grid-cols-2">
			{#each paginatedProjects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	{/if}

	<div class="mt-10 flex items-center gap-3">
		<SparkleButton
			label="Prev"
			variant="secondary"
			href={safePage > 1 ? makePageUrl(safePage - 1) : undefined}
			ariaLabel="Go to previous page"
			class={`py-2 px-4 ${safePage === 1 ? "pointer-events-none opacity-40" : ""}`}
		/>
		<p class="text-sm text-[var(--color-text-soft)]">
			Page {safePage} of {totalPages}
		</p>
		<SparkleButton
			label="Next"
			variant="secondary"
			href={safePage < totalPages ? makePageUrl(safePage + 1) : undefined}
			ariaLabel="Go to next page"
			class={`py-2 px-4 ${safePage === totalPages ? "pointer-events-none opacity-40" : ""}`}
		/>
	</div>
</main>
