<script lang="ts">
	import { onMount } from "svelte";
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { featuredProjects } from "$data/projects";
	import ProjectCard from "$lib/components/ui/ProjectCard.svelte";
	import SparkleButton from "$lib/components/ui/SparkleButton.svelte";
	import {
		prefersReducedMotion,
		registerGsapPlugins,
	} from "$lib/utils/animationHelpers";
	import { icons, type IconName } from "$lib/utils/icons";

	const techIcons: { label: string; icon: IconName }[] = (
		[
			{ label: "SvelteKit", icon: "svelte" },
			{ label: "React", icon: "react" },
			{ label: "TypeScript", icon: "typescript" },
			{ label: "Next.js", icon: "next" },
			{ label: "Node.js", icon: "node" },
		] as { label: string; icon: IconName }[]
	).filter(({ icon }) => icon in icons);

	const techTicker = [...techIcons, ...techIcons];

	let section = $state<HTMLElement | null>(null);
	let trigger: ScrollTrigger | undefined;

	onMount(() => {
		if (prefersReducedMotion()) {
			return;
		}

		registerGsapPlugins();
		gsap.set(section, { opacity: 0, y: 24 });
		trigger = ScrollTrigger.create({
			trigger: section,
			start: "top 78%",
			onEnter: () => {
				if (!section) return;
				gsap.to(section, { opacity: 1, y: 0, duration: 0.7 });
			},
		});

		return () => trigger?.kill();
	});
</script>

<section id="projects" bind:this={section} class="section-shell mt-28">
	<!-- Infinite tech ticker — non-interactive, fades at edges -->
	<div class="mb-8 flex justify-center" aria-hidden="true">
		<div
			class="relative overflow-hidden"
			style="width: 280px; mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);"
		>
			<div
				class="marquee-track flex w-max gap-3 py-1"
				style="pointer-events: none;"
			>
				{#each techTicker as item, i (`${item.label}-${i}`)}
					<span
						class="flex items-center justify-center rounded-full border border-[var(--color-border)] p-2.5 text-[var(--color-text-soft)]"
					>
						<span
							class="h-4 w-4 [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-current"
						>
							{@html icons[item.icon]}
						</span>
					</span>
				{/each}
			</div>
		</div>
	</div>

	<h2 class="text-xl sm:text-3xl mt-15">What I've Been Working On</h2>

	<div class="mt-10 grid gap-6 md:grid-cols-2">
		{#each featuredProjects as project, index}
			<ProjectCard {project} eager={index === 0} />
		{/each}
	</div>

	<div class="mt-10 flex justify-center">
		<SparkleButton
			label="View All Projects"
			variant="primary"
			href="/projects"
			class="rounded-full py-2.5"
		/>
	</div>
</section>
