<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';

	let { isDark = false, onToggle } = $props<{
		isDark?: boolean;
		onToggle: () => void;
	}>();
</script>

<button
	type="button"
	class="group relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-accent-soft)] text-[var(--color-text)]"
	aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
	onclick={onToggle}
>
	<span
		class={`absolute transition-all duration-300 ${isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}
	>
		<Icon name="sun" class="h-4 w-4" />
	</span>
	<span
		class={`absolute transition-all duration-300 ${isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`}
	>
		<Icon name="moon-star" class="h-4 w-4" />
	</span>
</button>
