<script lang="ts">
	import Icon from "$lib/components/ui/Icon.svelte";
	import ThemeToggle from "$lib/components/ui/ThemeToggle.svelte";
	import { onMount } from "svelte";
	import { page } from "$app/state";

	let {
		isDark = false,
		onToggleTheme,
		onOpenAi,
		onOpenResume,
	} = $props<{
		isDark?: boolean;
		onToggleTheme: () => void;
		onOpenAi: () => void;
		onOpenResume: () => void;
	}>();

	let activeHome = $state(false);

	onMount(() => {
		if (page.url.pathname !== "/") {
			return;
		}
		const hero = document.getElementById("home");
		if (!hero) {
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				activeHome = entries[0]?.isIntersecting ?? false;
			},
			{ threshold: 0.55 },
		);
		observer.observe(hero);
		return () => observer.disconnect();
	});

	const isHome = () => activeHome || page.url.pathname === "/";

	const itemCls = (active = false) =>
		`inline-flex items-center justify-center rounded-xl p-2.5 transition-all duration-200 cursor-pointer
		${
			active
				? "bg-[var(--color-text)] text-[var(--color-bg)]"
				: "text-[var(--color-text-soft)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text)] hover:p-3.5"
		}`;
</script>

<nav
	aria-label="Desktop navigation"
	class="glass-panel fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 rounded-2xl p-2 md:block"
>
	<ul class="flex flex-col items-center gap-1">
		<li>
			<a href="/" class={itemCls(isHome())} aria-label="Home">
				<Icon name="home" class="h-[17px] w-[17px]" />
			</a>
		</li>
		<li>
			<a
				href="https://x.com/"
				target="_blank"
				rel="noopener noreferrer"
				class={itemCls()}
				aria-label="Visit Robert on X"
			>
				<Icon name="twitter" class="h-[17px] w-[17px]" />
			</a>
		</li>
		<li>
			<a
				href="https://github.com/robert-dominic"
				target="_blank"
				rel="noopener noreferrer"
				class={itemCls()}
				aria-label="Visit Robert on GitHub"
			>
				<Icon name="github" class="h-[17px] w-[17px]" />
			</a>
		</li>
		<li>
			<button
				type="button"
				class={itemCls()}
				aria-label="Download resume"
				onclick={onOpenResume}
			>
				<Icon name="download" class="h-[17px] w-[17px]" />
			</button>
		</li>
		<li>
			<button
				type="button"
				class={itemCls()}
				aria-label="Open AI assistant"
				onclick={onOpenAi}
			>
				<Icon name="bot" class="h-[17px] w-[17px]" />
			</button>
		</li>
		<li class="mt-1 border-t border-[var(--color-border)] pt-2">
			<ThemeToggle {isDark} onToggle={onToggleTheme} />
		</li>
	</ul>
</nav>
