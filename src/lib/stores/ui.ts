import { writable } from 'svelte/store';

export const aiPanelOpen = writable(false);
export const resumeModalOpen = writable(false);
export const toastState = writable<{ open: boolean; message: string; tone: 'success' | 'error' }>({
	open: false,
	message: '',
	tone: 'success'
});
