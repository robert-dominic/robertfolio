<script lang="ts">
	import Icon from "$lib/components/ui/Icon.svelte";
	import type { Project } from "$data/projects";

	let { project, eager = false } = $props<{
		project: Project;
		eager?: boolean;
	}>();
</script>

<article
	class="surface-card group flex h-full flex-col overflow-hidden rounded-2xl cursor-pointer"
>
	<a href={`/projects/${project.slug}`} class="overflow-hidden block">
		<img
			src={project.image}
			alt={project.alt}
			width="960"
			height="720"
			loading={eager ? "eager" : "lazy"}
			class="h-52 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
		/>
	</a>
	<div class="flex flex-1 flex-col p-5">
		<div class="flex items-start justify-between gap-3">
			<h3 class="text-lg font-semibold leading-snug">{project.title}</h3>
			<div class="flex shrink-0 items-center gap-1">
				<a
					href={project.liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-lg p-1.5 text-[var(--color-text-soft)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text)]"
					aria-label={`Live site for ${project.title}`}
					onclick={(e) => e.stopPropagation()}
				>
					<Icon name="globe" class="h-[15px] w-[15px]" />
				</a>
				{#if project.githubUrl}
				<a
					href={project.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-lg p-1.5 text-[var(--color-text-soft)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text)]"
					aria-label={`GitHub repo for ${project.title}`}
					onclick={(e) => e.stopPropagation()}
				>
					<Icon name="github" class="h-[15px] w-[15px]" />
				</a>
				{/if}
			</div>
		</div>
		<p class="mt-2 line-clamp-2 text-sm">{project.description}</p>
		<div class="mt-5">
			<a
				href={`/projects/${project.slug}`}
				class="inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-accent-soft)]"
			>
				View Project
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="13"
					height="13"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</a>
		</div>
	</div>
</article>
