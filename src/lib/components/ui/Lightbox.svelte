<script lang="ts">
	import { browser } from "$app/environment";
	import { createFocusTrap } from "$lib/utils/focusTrap";
	import Icon from "$lib/components/ui/Icon.svelte";
	import { tick } from "svelte";

	let {
		open = false,
		src = "",
		alt = "",
		onClose,
	} = $props<{
		open?: boolean;
		src?: string;
		alt?: string;
		onClose: () => void;
	}>();

	let dialog = $state<HTMLElement | null>(null);
	let cleanupTrap: (() => void) | undefined;

	$effect(() => {
		if (!browser || !open) {
			cleanupTrap?.();
			return;
		}

		let active = true;
		tick().then(() => {
			if (!active || !dialog) {
				return;
			}

			cleanupTrap = createFocusTrap(dialog, onClose);
		});

		return () => {
			active = false;
			cleanupTrap?.();
		};
	});
</script>

{#if open}
	<div class="fixed inset-0 z-[110] bg-black/90 p-4">
		<div
			bind:this={dialog}
			class="relative flex h-full w-full items-center justify-center"
			role="dialog"
			aria-modal="true"
			aria-label="Project image lightbox"
		>
			<button
				type="button"
				class="absolute right-0 top-0 rounded-full bg-white/10 p-3 text-white"
				aria-label="Close image viewer"
				onclick={onClose}
			>
				<Icon name="x" class="h-5 w-5" />
			</button>
			<img
				{src}
				{alt}
				width="1600"
				height="1200"
				class="max-h-[85vh] max-w-full rounded-2xl object-contain"
			/>
		</div>
	</div>
{/if}
