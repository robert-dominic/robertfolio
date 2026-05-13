/**
 * Traps keyboard focus within a container element.
 * Used by modals, the AI panel, and the lightbox to prevent focus from escaping.
 * Returns a cleanup function that removes the listener.
 */
export function createFocusTrap(container: HTMLElement, onClose?: () => void) {
	const focusableSelectors = [
		'a[href]',
		'button:not([disabled])',
		'textarea:not([disabled])',
		'input:not([disabled])',
		'select:not([disabled])',
		'[tabindex]:not([tabindex="-1"])'
	].join(', ');

	const getFocusableElements = () =>
		Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter(
			(element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden')
		);

	const keydownHandler = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			onClose?.();
			return;
		}

		if (event.key !== 'Tab') {
			return;
		}

		const focusableElements = getFocusableElements();

		if (!focusableElements.length) {
			event.preventDefault();
			return;
		}

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];
		const currentElement = document.activeElement as HTMLElement | null;

		// Wrap backwards from first → last
		if (event.shiftKey && currentElement === firstElement) {
			event.preventDefault();
			lastElement.focus();
		}

		// Wrap forwards from last → first
		if (!event.shiftKey && currentElement === lastElement) {
			event.preventDefault();
			firstElement.focus();
		}
	};

	// Auto-focus the first focusable element on mount
	const focusableElements = getFocusableElements();
	focusableElements[0]?.focus();
	container.addEventListener('keydown', keydownHandler);

	return () => {
		container.removeEventListener('keydown', keydownHandler);
	};
}
