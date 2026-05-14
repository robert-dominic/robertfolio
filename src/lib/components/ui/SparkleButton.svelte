<script lang="ts">
	type Particle = { id: number; style: string };

	let {
		label,
		variant = "primary",
		type = "button",
		href,
		ariaLabel,
		disabled = false,
		class: extraClass = "",
		onpress,
	} = $props<{
		label: string;
		variant?: "primary" | "secondary";
		type?: "button" | "submit";
		href?: string;
		ariaLabel?: string;
		disabled?: boolean;
		class?: string;
		onpress?: (event: MouseEvent) => void;
	}>();

	let particles = $state<Particle[]>([]);

	const baseClass = $derived(
		`relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-xl px-4 py-3 text-sm font-medium hover:px-6 disabled:cursor-not-allowed disabled:opacity-50 ${
			variant === "primary"
				? "bg-[var(--color-text)] text-[var(--color-bg)]"
				: "border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-accent-soft)]"
		} ${extraClass}`,
	);

	const burst = (event: MouseEvent) => {
		particles = Array.from({ length: 8 }, (_, index) => {
			const angle = (Math.PI * 2 * index) / 8;
			return {
				id: Date.now() + index,
				style: `--x:${Math.cos(angle) * 12}px; --y:${Math.sin(angle) * 12}px;`,
			};
		});
		window.setTimeout(() => {
			particles = [];
			onpress?.(event);
		}, 180);
	};
</script>

{#if href}
	<a {href} class={baseClass} aria-label={ariaLabel ?? label} onclick={burst}>
		<span>{label}</span>
		{#each particles as particle (particle.id)}
			<span
				class="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-white/90"
				style={`animation: sparkle-burst 480ms ease-out forwards; ${particle.style}`}
			></span>
		{/each}
	</a>
{:else}
	<button
		{type}
		{disabled}
		class={baseClass}
		aria-label={ariaLabel ?? label}
		onclick={burst}
	>
		<span>{label}</span>
		{#each particles as particle (particle.id)}
			<span
				class="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-white/90"
				style={`animation: sparkle-burst 480ms ease-out forwards; ${particle.style}`}
			></span>
		{/each}
	</button>
{/if}
