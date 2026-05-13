<script lang="ts">
	import Icon from "$lib/components/ui/Icon.svelte";
	import ThemeToggle from "$lib/components/ui/ThemeToggle.svelte";
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

	const isHome = () => page.url.pathname === "/";

	const itemCls = (active = false) =>
		`inline-flex items-center justify-center rounded-xl p-2.5 transition-all duration-200 cursor-pointer
		${
			active
				? "bg-[var(--color-text)] text-[var(--color-bg)]"
				: "text-[var(--color-text-soft)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text)] hover:p-3.5"
		}`;
</script>

<nav
	aria-label="Mobile navigation"
	class="glass-panel fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl px-3 py-2 md:hidden"
	style="padding-bottom: max(0.5rem, calc(env(safe-area-inset-bottom) + 0.5rem));"
>
	<ul class="flex items-center justify-between">
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
				href="https://github.com/"
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
		<li
			class="border-l border-[var(--color-border)] pl-2 pt-2.5 cursor-pointer"
		>
			<ThemeToggle {isDark} onToggle={onToggleTheme} />
		</li>
	</ul>
</nav>
