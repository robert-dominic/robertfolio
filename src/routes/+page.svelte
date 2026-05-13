<script lang="ts">
	import About from "$lib/components/sections/About.svelte";
	import Contact from "$lib/components/sections/Contact.svelte";
	import Hero from "$lib/components/sections/Hero.svelte";
	import ProjectsPreview from "$lib/components/sections/ProjectsPreview.svelte";
</script>

<svelte:head>
	<title>Robert Dominic — Frontend Engineer</title>
	<meta property="og:title" content="Robert Dominic — Frontend Engineer" />
	<meta property="og:url" content="https://robertfolio.vercel.app" />
	<meta name="twitter:title" content="Robert Dominic — Frontend Engineer" />
</svelte:head>

<main id="main-content" class="pb-16">
	<Hero />
	<About />
	<ProjectsPreview />
	<Contact />
</main>
