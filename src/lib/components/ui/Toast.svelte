<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import { browser } from '$app/environment';

	let { message = '', open = false, tone = 'success', onClose } = $props<{
		message?: string;
		open?: boolean;
		tone?: 'success' | 'error';
		onClose: () => void;
	}>();

	let timeoutId: number | undefined;

	$effect(() => {
		if (!browser || !open) {
			return;
		}

		timeoutId = window.setTimeout(() => onClose(), 3000);

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	});
</script>

{#if open}
	<div
		role="status"
		aria-live="polite"
		class="glass-panel fixed bottom-24 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-3 rounded-full px-4 py-3 text-sm text-[var(--color-text)] lg:bottom-8"
	>
		{#if tone === 'success'}
			<Icon name="check-circle" class="h-4 w-4 text-emerald-500" />
		{:else}
			<Icon name="circle-alert" class="h-4 w-4 text-rose-500" />
		{/if}
		<span>{message}</span>
	</div>
{/if}
