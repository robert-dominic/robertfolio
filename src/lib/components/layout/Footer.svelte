<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import { convertToRoman } from '$lib/utils/romanNumerals';

	const year = convertToRoman(new Date().getFullYear());
</script>

<footer class="mt-20 w-full pb-28 pt-8 lg:pb-10">
	<div class="border-t border-[var(--color-border)]"></div>
	<div class="flex flex-col items-center pt-8">
		<p class="text-sm text-[var(--color-text-soft)]">
			© {year} · Robert Dominic · All rights reserved
		</p>
		<div class="mt-4 flex items-center gap-2">
			<a
				href="https://x.com/_devrobert"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Visit Robert on X"
				class="rounded-full p-2 text-[var(--color-text-soft)] transition hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text)]"
			>
				<Icon name="twitter" class="h-4 w-4" />
			</a>
			<a
				href="https://github.com/robert-dominic"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Visit Robert on GitHub"
				class="rounded-full p-2 text-[var(--color-text-soft)] transition hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text)]"
			>
				<Icon name="github" class="h-4 w-4" />
			</a>
			<a
				href="mailto:devrobertcodes@gmail.com"
				aria-label="Email Robert Dominic"
				class="rounded-full p-2 text-[var(--color-text-soft)] transition hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text)]"
			>
				<Icon name="mail" class="h-4 w-4" />
			</a>
		</div>
	</div>
</footer>
