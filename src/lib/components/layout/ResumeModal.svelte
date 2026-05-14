<script lang="ts">
	import { browser } from "$app/environment";
	import Icon from "$lib/components/ui/Icon.svelte";
	import SparkleButton from "$lib/components/ui/SparkleButton.svelte";
	import { tick } from "svelte";
	import { createFocusTrap } from "$lib/utils/focusTrap";

	let {
		open = false,
		onClose,
		onToast,
	} = $props<{
		open?: boolean;
		onClose: () => void;
		onToast: (message: string) => void;
	}>();

	let dialog = $state<HTMLElement | null>(null);
	let cleanupTrap: (() => void) | undefined;

	const handleDownload = () => {
		if (!browser) {
			return;
		}

		const link = document.createElement("a");
		link.href = "/resume/robert-dominic-resume.pdf";
		link.download = "robert-dominic-resume.pdf";
		link.click();
		onClose();
		onToast("Resume downloaded successfully \u2713");
	};

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
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4"
	>
		<div
			bind:this={dialog}
			role="dialog"
			aria-modal="true"
			aria-labelledby="resume-modal-title"
			class="surface-card w-full max-w-md rounded-[1.75rem] p-6 text-[var(--color-text)]"
		>
			<div class="mb-6 flex items-start justify-between gap-4">
				<div class="space-y-2">
					<h2 id="resume-modal-title" class="text-[1.5rem] font-[400]">
						Download Resume
					</h2>
					<p class="max-w-sm text-sm">
						You're about to download Robert Dominic's resume.
					</p>
				</div>
				<button
					type="button"
					class="rounded-full p-2"
					aria-label="Close resume modal"
					onclick={onClose}
				>
					<Icon name="x" class="h-5 w-5" />
				</button>
			</div>
			<div class="flex flex-col gap-3 sm:flex-row">
				<SparkleButton
					label="Go Ahead"
					variant="primary"
					class="rounded-full"
					onpress={handleDownload}
				/>
				<SparkleButton
					label="Cancel"
					variant="secondary"
					class="rounded-full"
					onpress={onClose}
				/>
			</div>
		</div>
	</div>
{/if}
