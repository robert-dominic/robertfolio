<script lang="ts">
	import Icon from "$lib/components/ui/Icon.svelte";
	import SparkleButton from "$lib/components/ui/SparkleButton.svelte";
	import { PUBLIC_CAL_URL } from '$env/static/public';
	import gsap from "gsap";
	import { tick } from "svelte";
	import { prefersReducedMotion } from "$lib/utils/animationHelpers";

	type FormValues = {
		fullName: string;
		email: string;
		message: string;
	};

	type Errors = Partial<Record<keyof FormValues, string>>;

	const initialValues: FormValues = {
		fullName: "",
		email: "",
		message: "",
	};

	let values = $state<FormValues>({ ...initialValues });
	let errors = $state<Errors>({});
	let touched = $state<Record<keyof FormValues, boolean>>({
		fullName: false,
		email: false,
		message: false,
	});
	let sending = $state(false);
	let success = $state(false);
	let failureMessage = $state("");

	let formEl = $state<HTMLElement | null>(null);
	let planeEl = $state<HTMLElement | null>(null);
	let successIcon = $state<HTMLElement | null>(null);
	let successHeading = $state<HTMLElement | null>(null);
	let successBody = $state<HTMLElement | null>(null);
	let successBtn = $state<HTMLElement | null>(null);

	let cruiseTl: gsap.core.Timeline | undefined;

	const sanitize = (value: string) => value.replace(/[<>]/g, "").trim();

	const validate = (fieldValues = values): Errors => {
		const nextErrors: Errors = {};
		if (sanitize(fieldValues.fullName).length < 2)
			nextErrors.fullName = "Full name must be at least 2 characters.";
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitize(fieldValues.email)))
			nextErrors.email = "Enter a valid email address.";
		if (sanitize(fieldValues.message).length < 10)
			nextErrors.message = "Message must be at least 10 characters.";
		return nextErrors;
	};

	const handleBlur = (field: keyof FormValues) => {
		if (values[field].trim().length > 0) {
			touched[field] = true;
			errors = validate();
		}
	};

	const resetForm = () => {
		values = { ...initialValues };
		errors = {};
		touched = { fullName: false, email: false, message: false };
		success = false;
		failureMessage = "";
	};

	// Reveal the plane and start the cruise loop
	const startCruise = () => {
		if (!planeEl) return;
		gsap.set(planeEl, {
			display: "flex",
			opacity: 1,
			x: 0,
			y: 0,
			rotate: 0,
			scale: 1,
		});
		cruiseTl = gsap.timeline({ repeat: -1 });
		cruiseTl
			.to(planeEl, {
				x: 55,
				y: -45,
				rotate: -18,
				duration: 0.85,
				ease: "sine.inOut",
			})
			.to(planeEl, {
				x: 15,
				y: -75,
				rotate: 6,
				duration: 0.7,
				ease: "sine.inOut",
			})
			.to(planeEl, {
				x: -45,
				y: -45,
				rotate: 24,
				duration: 0.8,
				ease: "sine.inOut",
			})
			.to(planeEl, {
				x: 0,
				y: 0,
				rotate: 0,
				duration: 0.85,
				ease: "sine.inOut",
			});
	};

	// Successful delivery — plane exits top-right, then success panel builds in
	const exitSuccess = async () => {
		cruiseTl?.kill();
		if (planeEl) {
			await gsap.to(planeEl, {
				x: 200,
				y: -220,
				rotate: -30,
				scale: 1.4,
				opacity: 0,
				duration: 0.65,
				ease: "power3.out",
			});
			gsap.set(planeEl, { display: "none" });
		}
		success = true;
		await tick();
		gsap.timeline()
			.fromTo(
				successIcon,
				{ scale: 0.4, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
			)
			.fromTo(
				successHeading,
				{ y: 18, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
				"-=0.2",
			)
			.fromTo(
				successBody,
				{ y: 12, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
				"-=0.15",
			)
			.fromTo(
				successBtn,
				{ y: 8, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
				"-=0.1",
			);
	};

	// Connection / server error — plane tumbles and crashes downward
	const crashPlane = async () => {
		cruiseTl?.kill();
		if (planeEl) {
			await gsap
				.timeline()
				.to(planeEl, {
					rotate: "+=100",
					x: "-=15",
					y: "+=15",
					duration: 0.22,
					ease: "power2.in",
				})
				.to(planeEl, {
					y: "+=200",
					rotate: "+=400",
					x: "-=25",
					opacity: 0,
					duration: 0.55,
					ease: "power3.in",
				});
			gsap.set(planeEl, { display: "none" });
		}
		// Bounce the form back in
		await tick();
		if (formEl) {
			gsap.fromTo(
				formEl,
				{ opacity: 0, y: 14 },
				{ opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
			);
		}
	};

	const sendMessage = async () => {
		errors = validate();
		touched = { fullName: true, email: true, message: true };
		if (Object.keys(errors).length > 0 || sending) return;

		values = {
			fullName: sanitize(values.fullName),
			email: sanitize(values.email),
			message: sanitize(values.message),
		};
		failureMessage = "";
		sending = true;

		const reduced = prefersReducedMotion();

		// Fade the form out and launch the plane immediately
		if (!reduced && formEl) {
			await gsap.to(formEl, {
				opacity: 0,
				y: -10,
				duration: 0.25,
				ease: "power2.in",
			});
			startCruise();
		}

		let apiOk = false;
		// Run the API call and a 3s minimum timer in parallel so the plane
		// animation always plays fully before we show the outcome either way.
		await Promise.all([
			(async () => {
				try {
					const res = await fetch('/api/contact', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(values)
					});
					apiOk = res.ok;
					if (!res.ok) {
						const data = await res.json().catch(() => ({}));
						failureMessage = data.error ?? 'Failed to send. Please try again.';
					}
				} catch {
					apiOk = false;
					failureMessage = 'Failed to send. Please try again.';
				}
			})(),
			new Promise<void>((resolve) => setTimeout(resolve, 3000)),
		]);

		if (apiOk) {
			if (reduced) {
				success = true;
			} else {
				await exitSuccess();
			}
		} else {
			failureMessage = "Failed to send. Please try again.";
			if (reduced) {
				// nothing to animate — form is still visible
			} else {
				await crashPlane();
			}
		}

		sending = false;
	};
</script>

<section id="contact" class="section-shell mt-28">
	<h2 class="mx-auto max-w-2xl text-2xl sm:text-3xl">Let's Talk</h2>
	<p class="mx-auto mt-5 max-w-2xl text-measure-tight">
		I'm always interested in exploring new opportunities, collaborating, or
		exchanging ideas with like-minded builders. Feel free to reach out if
		you'd like to discuss a potential project or just say hello.
	</p>

	<div class="relative mt-8 max-w-2xl mx-auto text-left">
		<!-- Paper plane — hidden until send is triggered -->
		<div
			bind:this={planeEl}
			class="pointer-events-none absolute inset-0 hidden items-center justify-center"
			aria-hidden="true"
		>
			<span class="text-[var(--color-text)]">
				<Icon name="send" class="h-10 w-10" />
			</span>
		</div>

		{#if !success}
			<div bind:this={formEl}>
				<form
					class="space-y-4"
					onsubmit={(e) => {
						e.preventDefault();
						sendMessage();
					}}
				>
					<div class="grid gap-4 sm:grid-cols-2">
						<div>
							<input
								id="full-name"
								bind:value={values.fullName}
								type="text"
								placeholder="Full Name"
								required
								aria-label="Full Name"
								aria-describedby={touched.fullName &&
								errors.fullName
									? "full-name-error"
									: undefined}
								class="w-full rounded-2xl bg-[var(--color-surface-strong)] px-5 py-3.5 text-sm placeholder:text-[var(--color-text-soft)] focus:outline-2 focus:outline-[var(--color-accent)]"
								onblur={() => handleBlur("fullName")}
							/>
							{#if touched.fullName && errors.fullName}
								<p
									id="full-name-error"
									class="mt-1.5 text-xs text-rose-500"
								>
									{errors.fullName}
								</p>
							{/if}
						</div>
						<div>
							<input
								id="email-address"
								bind:value={values.email}
								type="email"
								placeholder="Email Address"
								required
								aria-label="Email Address"
								aria-describedby={touched.email && errors.email
									? "email-address-error"
									: undefined}
								class="w-full rounded-2xl bg-[var(--color-surface-strong)] px-5 py-3.5 text-sm placeholder:text-[var(--color-text-soft)] focus:outline-2 focus:outline-[var(--color-accent)]"
								onblur={() => handleBlur("email")}
							/>
							{#if touched.email && errors.email}
								<p
									id="email-address-error"
									class="mt-1.5 text-xs text-rose-500"
								>
									{errors.email}
								</p>
							{/if}
						</div>
					</div>

					<div>
						<textarea
							id="message"
							bind:value={values.message}
							placeholder="Write your Message"
							required
							rows="6"
							aria-label="Message"
							aria-describedby={touched.message && errors.message
								? "message-error"
								: undefined}
							class="w-full rounded-2xl bg-[var(--color-surface-strong)] px-5 py-3.5 text-sm placeholder:text-[var(--color-text-soft)] focus:outline-2 focus:outline-[var(--color-accent)]"
							onblur={() => handleBlur("message")}
						></textarea>
						{#if touched.message && errors.message}
							<p
								id="message-error"
								class="mt-1.5 text-xs text-rose-500"
							>
								{errors.message}
							</p>
						{/if}
					</div>

					{#if failureMessage}
						<p class="text-sm text-rose-500">{failureMessage}</p>
					{/if}

					<SparkleButton
						type="submit"
						label={sending ? "Sending..." : "Send Message"}
						variant="primary"
						disabled={sending}
						class="w-full rounded-2xl py-4"
					/>

					<div class="flex items-center gap-3 mt-4">
						<span class="h-px flex-1 bg-[var(--color-border)]"></span>
						<span class="text-xs text-[var(--color-text-soft)]">or</span>
						<span class="h-px flex-1 bg-[var(--color-border)]"></span>
					</div>

					<a
						href={PUBLIC_CAL_URL}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center justify-center gap-2 text-sm text-[var(--color-text-soft)] hover:text-[var(--color-text)] transition"
					>
						<Icon name="calendar" class="h-4 w-4" />
						Schedule a call instead
					</a>
				</form>
			</div>
		{:else}
			<div class="flex flex-col items-start py-10">
				<div
					bind:this={successIcon}
					class="mb-5 rounded-full bg-emerald-500/10 p-4 text-emerald-500"
				>
					<Icon name="mail-check" class="h-6 w-6" />
				</div>
				<h3 bind:this={successHeading} class="text-2xl">
					Message Received!
				</h3>
				<p bind:this={successBody} class="mt-3">
					I'll get back to you within 24 hours.
				</p>
				<button
					bind:this={successBtn}
					type="button"
					class="mt-6 text-sm font-medium text-[var(--color-accent)]"
					onclick={resetForm}
				>
					Send another message
				</button>
			</div>
		{/if}
	</div>
</section>
