<script lang="ts">
	import { techIcons, getTechIconColor } from '$lib/utils/techIcons';

	let { label } = $props<{ label: string }>();

	const icon = $derived(techIcons[label] ?? null);
	const color = $derived(getTechIconColor(label));
</script>

<span class="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-medium text-[var(--color-text)]">
	{#if icon}
		<span
			class="h-3 w-3 shrink-0 [&>svg]:h-full [&>svg]:w-full"
			style={color ? `color: ${color}` : undefined}
		>
			{@html icon}
		</span>
	{/if}
	{label}
</span>
