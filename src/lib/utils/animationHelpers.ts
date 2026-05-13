import { browser } from '$app/environment';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Prevents double-registration across hot reloads
let registered = false;

/** Registers GSAP plugins once. Must be called inside onMount or $effect. */
export function registerGsapPlugins() {
	if (!browser || registered) {
		return;
	}

	gsap.registerPlugin(ScrollTrigger);
	registered = true;
}

/**
 * Returns true if the user has requested reduced motion.
 * SSR-safe — returns true on the server so animations are skipped by default.
 */
export function prefersReducedMotion(): boolean {
	if (!browser) {
		return true;
	}

	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Kills an array of GSAP tweens, timelines, or ScrollTrigger instances. */
export function killAll(items: Array<gsap.core.Tween | gsap.core.Timeline | ScrollTrigger | undefined>) {
	for (const item of items) {
		item?.kill();
	}
}
