<script lang="ts">
	import { page } from "$app/state";
</script>

<main
	id="main-content"
	class="section-shell flex min-h-[70vh] flex-col justify-center py-20"
>
	<p class="caption-text mb-4">Error</p>
	<h1 class="text-5xl">This page could not be found.</h1>
	<p class="mt-5 text-measure-tight">
		The requested route returned {page.status}. Try heading back to the home
		page or the project archive.
	</p>
	<div class="mt-8 flex gap-3">
		<a
			href="/"
			class="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white"
			>Home</a
		>
		<a
			href="/projects"
			class="rounded-full border border-[var(--color-border)] px-5 py-3 text-sm font-medium"
			>Projects</a
		>
	</div>
</main>
