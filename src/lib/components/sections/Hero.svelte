<script lang="ts">
	import { goto } from "$app/navigation";
	import Icon from "$lib/components/ui/Icon.svelte";
	import SparkleButton from "$lib/components/ui/SparkleButton.svelte";
	const profileImg = "/images/photos/image-1.jpg";
	import { onMount } from "svelte";
	import gsap from "gsap";
	import { projects } from "$data/projects";
	import { resumeModalOpen } from "$lib/stores/ui";
	import { prefersReducedMotion } from "$lib/utils/animationHelpers";

	let profile: HTMLElement | null = null;
	let nameEl: HTMLElement | null = null;
	let descriptionEl: HTMLElement | null = null;
	let actionsEl: HTMLElement | null = null;
	let socialsEl: HTMLElement | null = null;
	let carouselEl: HTMLElement | null = null;
	let timeline: gsap.core.Timeline | undefined;

	const carouselProjects = [...projects, ...projects];

	onMount(() => {
		if (prefersReducedMotion()) {
			return;
		}

		timeline = gsap.timeline();
		timeline
			.from(profile, { opacity: 0, duration: 0.5 })
			.from(nameEl, { y: 24, opacity: 0, duration: 0.55 }, 0.1)
			.from(descriptionEl, { y: 24, opacity: 0, duration: 0.55 }, 0.25)
			.from(actionsEl, { y: 24, opacity: 0, duration: 0.55 }, 0.35)
			.from(socialsEl, { y: 24, opacity: 0, duration: 0.55 }, 0.45)
			.from(carouselEl, { opacity: 0, duration: 0.55 }, 0.6);

		return () => timeline?.kill();
	});

	const scrollToProjects = () => {
		document
			.getElementById("projects")
			?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	const openProject = (slug: string) => goto(`/projects/${slug}`);
</script>

<section id="home" class="section-shell pt-20 sm:pt-28">
	<!-- Profile image -->
	<div
		bind:this={profile}
		class="mb-8 h-20 w-20 overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)]"
	>
		<img
			src={profileImg}
			alt="Portrait of Robert Dominic"
			width="256"
			height="256"
			class="h-full w-full rounded-full object-cover"
		/>
	</div>

	<!-- Name + title as one heading block -->
	<div bind:this={nameEl}>
		<h1
			class="pb-2 text-[1.8rem] sm:text-3xl lg:text-4xl"
			style="max-width: 16ch;"
		>
			Hey, I'm Robert Dominic.<br />
			<span class="pt-2 text-[var(--color-text-soft)]"
				>Frontend Engineer.</span
			>
		</h1>
	</div>

	<!-- Description -->
	<div bind:this={descriptionEl} class="mt-6 max-w-xl">
		<p class="text-base leading-relaxed">
			Self-taught frontend engineer focused on building fast, readable
			interfaces with strong product instincts.
		</p>
	</div>

	<!-- CTA Buttons -->
	<div bind:this={actionsEl} class="mt-8 flex flex-wrap gap-3">
		<SparkleButton
			label="View My Work"
			variant="primary"
			onpress={scrollToProjects}
		/>
		<SparkleButton
			label="Download Resume"
			variant="secondary"
			onpress={() => resumeModalOpen.set(true)}
		/>
	</div>

	<!-- Social links below buttons -->
	<div bind:this={socialsEl} class="mt-5 flex items-center gap-1">
		<a
			href="https://x.com/_devrobert"
			target="_blank"
			rel="noopener noreferrer"
			class="rounded-full p-2.5 text-[var(--color-text-soft)] transition hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text)]"
			aria-label="Visit Robert on X"
		>
			<Icon name="twitter" class="h-4 w-4" />
		</a>
		<a
			href="https://github.com/robert-dominic"
			target="_blank"
			rel="noopener noreferrer"
			class="rounded-full p-2.5 text-[var(--color-text-soft)] transition hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text)]"
			aria-label="Visit Robert on GitHub"
		>
			<Icon name="github" class="h-4 w-4" />
		</a>
		<a
			href="mailto:devrobertcodes@gmail.com"
			class="rounded-full p-2.5 text-[var(--color-text-soft)] transition hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text)]"
			aria-label="Email Robert Dominic"
		>
			<Icon name="mail" class="h-4 w-4" />
		</a>
	</div>

	<!-- Project image carousel — no border, fades at edges -->
	<div bind:this={carouselEl} class="mt-16 overflow-hidden py-3">
		<div class="carousel-track flex w-max gap-5 px-4">
			{#each carouselProjects as project, index (`${project.slug}-${index}`)}
				<button
					type="button"
					class="group shrink-0 overflow-hidden rounded-2xl"
					aria-label={`Open ${project.title}`}
					onclick={() => openProject(project.slug)}
				>
					<img
						src={project.image}
						alt={project.alt}
						width="400"
						height="280"
						class="h-40 w-96 rounded-2xl object-cover transition duration-300 group-hover:scale-[1.03]"
					/>
				</button>
			{/each}
		</div>
	</div>
</section>
