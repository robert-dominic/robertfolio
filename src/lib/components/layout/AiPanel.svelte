<script lang="ts">
	import { browser } from "$app/environment";
	import { createFocusTrap } from "$lib/utils/focusTrap";
	import Icon from "$lib/components/ui/Icon.svelte";
	import { tick } from "svelte";

	type ChatMessage = {
		role: "user" | "assistant";
		content: string;
	};

	let { open = false, onClose } = $props<{
		open?: boolean;
		onClose: () => void;
	}>();

	let panel = $state<HTMLElement | null>(null);
	let chatContainer = $state<HTMLDivElement | null>(null);
	let message = $state("");
	let loading = $state(false);
	let errorMessage = $state("");
	let chatHistory = $state<ChatMessage[]>([]);
	let cleanupTrap: (() => void) | undefined;
	let showScrollBtn = $state(false);

	const storageKey = "robertfolio-chat";

	const sanitize = (value: string) => value.replace(/[<>]/g, "").trim();

	const persistChat = () => {
		if (!browser) {
			return;
		}
		localStorage.setItem(storageKey, JSON.stringify(chatHistory));
	};

	const scrollToBottom = async () => {
		await tick();
		chatContainer?.scrollTo({
			top: chatContainer.scrollHeight,
			behavior: "smooth",
		});
	};

	const onChatScroll = () => {
		if (!chatContainer) return;
		const distFromBottom =
			chatContainer.scrollHeight -
			chatContainer.scrollTop -
			chatContainer.clientHeight;
		showScrollBtn = distFromBottom > 80;
	};

	$effect(() => {
		if (!browser || !open) {
			cleanupTrap?.();
			document.body.style.overflow = "";
			return;
		}

		// Prevent page scroll while panel is open
		document.body.style.overflow = "hidden";

		let active = true;
		const savedHistory = localStorage.getItem(storageKey);
		chatHistory = savedHistory ? JSON.parse(savedHistory) : [];

		tick().then(() => {
			if (!active || !panel) {
				return;
			}

			cleanupTrap = createFocusTrap(panel, onClose);
			scrollToBottom();
		});

		return () => {
			active = false;
			cleanupTrap?.();
			document.body.style.overflow = "";
		};
	});

	const sendMessage = async () => {
		const sanitizedMessage = sanitize(message);
		if (!sanitizedMessage || loading) {
			return;
		}

		errorMessage = "";
		chatHistory = [
			...chatHistory,
			{ role: "user", content: sanitizedMessage },
		];
		message = "";
		persistChat();
		scrollToBottom();
		loading = true;

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages: chatHistory }),
			});

			if (!response.ok) {
				throw new Error("Unable to reach the AI assistant right now.");
			}

			const data = await response.json();
			const assistantMessage = sanitize(
				data.message ?? "I could not generate a reply.",
			);
			chatHistory = [
				...chatHistory,
				{ role: "assistant", content: assistantMessage },
			];
			persistChat();
			scrollToBottom();
		} catch (error) {
			errorMessage =
				error instanceof Error
					? error.message
					: "Something went wrong.";
		} finally {
			loading = false;
		}
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	};
</script>

<div
	class={`fixed inset-y-0 right-0 z-[95] w-full max-w-md transition-transform duration-300 ease-out lg:inset-y-6 lg:right-6 lg:h-[calc(100vh-3rem)] ${
		open
			? "translate-y-0 translate-x-0"
			: "translate-y-full lg:translate-y-0 lg:translate-x-[110%]"
	}`}
>
	<div
		bind:this={panel}
		class="glass-panel flex h-full w-full flex-col rounded-t-[1rem] px-4 pb-4 pt-5 text-[var(--color-text)] lg:rounded-[1rem]"
		role="dialog"
		aria-modal="true"
		aria-labelledby="ai-panel-title"
	>
		<div
			class="mb-4 flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4"
		>
			<div>
				<h2 id="ai-panel-title" class="text-xl">Ask Nova</h2>
				<p class="mt-1 text-sm">about skills, projects, or approach.</p>
			</div>
			<button
				type="button"
				class="cursor-pointer rounded-xl p-2"
				aria-label="Close AI assistant"
				onclick={onClose}
			>
				<Icon name="x" class="h-5 w-5" />
			</button>
		</div>

		<div class="relative flex-1 overflow-hidden">
			<div
				bind:this={chatContainer}
				class="h-full space-y-4 overflow-y-auto pr-1"
				onscroll={onChatScroll}
			>
				{#if chatHistory.length === 0}
					<div
						class="rounded-xl border border-dashed border-[var(--color-border)] p-4 text-sm"
					>
						Nova can summarize experience, tools, and project
						highlights about Robert.
					</div>
				{/if}

				{#each chatHistory as entry}
					<div
						class={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}
					>
						<div
							class={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${
								entry.role === "user"
									? "bg-[var(--color-accent)] text-[var(--color-bg)]"
									: "surface-card text-[var(--color-text)]"
							}`}
						>
							{entry.content}
						</div>
					</div>
				{/each}

				{#if loading}
					<div
						class="flex items-center gap-2 text-sm text-[var(--color-text-soft)]"
					>
						<Icon
							name="loader-circle"
							class="h-4 w-4 animate-spin"
						/>
						<span>Thinking…</span>
					</div>
				{/if}
			</div>

			{#if showScrollBtn}
				<button
					type="button"
					onclick={scrollToBottom}
					aria-label="Scroll to latest message"
					class="absolute bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-soft)] shadow-[var(--shadow-card)] hover:text-[var(--color-text)] transition"
				>
					<Icon name="chevron-right" class="h-3 w-3 rotate-90" />
					Scroll to bottom
				</button>
			{/if}
		</div>

		{#if errorMessage}
			<p class="mt-3 text-sm text-rose-500">{errorMessage}</p>
		{/if}

		<div class="mt-4 flex items-end gap-3">
			<label class="sr-only" for="ai-message">Message</label>
			<textarea
				id="ai-message"
				bind:value={message}
				rows="2"
				class="surface-card min-h-[3.5rem] flex-1 rounded-xl px-4 py-3 text-sm"
				placeholder="Ask about Robert's work..."
				onkeydown={handleKeydown}
			></textarea>
			<button
				type="button"
				class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-bg)]"
				aria-label="Send message"
				onclick={sendMessage}
				disabled={loading}
			>
				<Icon name="send" class="h-4 w-4" />
			</button>
		</div>
	</div>
</div>
