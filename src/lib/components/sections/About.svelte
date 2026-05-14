<script lang="ts">
	import { onMount } from "svelte";
	const img2 = "/images/photos/image-2.jpeg";
	const img3 = "/images/photos/image-3.jpg";
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import {
		prefersReducedMotion,
		registerGsapPlugins,
	} from "$lib/utils/animationHelpers";

	let section = $state<HTMLElement | null>(null);
	let trigger: ScrollTrigger | undefined;
	let hovered = $state(false);
	let isMobile = $state(false);

	const updateViewportState = () => {
		isMobile = window.innerWidth < 640;
		if (isMobile) {
			hovered = false;
		}
	};

	onMount(() => {
		updateViewportState();
		window.addEventListener("resize", updateViewportState);

		if (prefersReducedMotion()) {
			return () => window.removeEventListener("resize", updateViewportState);
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

		return () => {
			window.removeEventListener("resize", updateViewportState);
			trigger?.kill();
		};
	});
</script>

<section id="about" bind:this={section} class="section-shell mt-28">
	<h2 class="text-[1.5rem] font-[400] sm:text-3xl">About Me</h2>
	<div class="mt-6 space-y-4 text-measure-tight">
		<p>
			I like building solid, scalable products with smooth user
			experiences — stuff that feels fast, polished, and actually solves
			problems.
		</p>
		<p>
			I’m a self-taught frontend engineer who’s worked on marketing sites,
			dashboards, and internal product tooling. Most of my work happens
			around React, Next.js, TypeScript, chrome dev tools and Supabase.
		</p>
		<p>
			I care a lot about product feel just as much as the code itself —
			writing clean, maintainable code, refining motion until it feels
			natural, and building interfaces that look polished without becoming
			hard to maintain.
		</p>
	</div>

	<div
		role="presentation"
		class="relative mx-auto mt-15 select-none"
		style={`width: ${isMobile ? "232px" : "280px"}; height: ${isMobile ? "252px" : "300px"};`}
		onmouseenter={() => {
			if (!isMobile) hovered = true;
		}}
		onmouseleave={() => {
			hovered = false;
		}}
	>
		<!-- Back image — rotated left, spreads further left on hover -->
		<figure
			class="absolute inset-0 rounded-2xl bg-[var(--color-surface-card)] p-2.5 shadow-lg ring-1 ring-white/40"
			style={`transform: ${
				isMobile
					? "none"
					: `rotate(-5deg) ${!hovered ? "translateX(-22px) translateY(10px)" : "translateX(-50px) translateY(-12px)"}`
			}; transition: ${isMobile ? "none" : "transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)"}; z-index: ${isMobile ? 2 : 1};`}
		>
			<img
				src={img3}
				alt="Robert at a casual setting"
				width="400"
				height="500"
				class="h-full w-full rounded-xl object-cover"
			/>
		</figure>

		<!-- Front image — rotated right, spreads further right on hover -->
		<figure
			class="absolute inset-0 rounded-2xl bg-[var(--color-surface-card)] p-2.5"
			style={`transform: ${
				isMobile
					? "translateX(12px) translateY(12px)"
					: `rotate(5deg) ${!hovered ? "translateX(22px) translateY(10px)" : "translateX(50px) translateY(12px)"}`
			}; transition: ${isMobile ? "none" : "transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)"}; z-index: 2;`}
		>
			<img
				src={img2}
				alt="Robert at a desk setup"
				width="400"
				height="500"
				class="h-full w-full rounded-xl object-cover"
			/>
		</figure>
	</div>
</section>
