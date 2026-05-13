// UI icons (stroke-based, from lucide)
import botRaw from '$lib/assets/icons/bot.svg?raw';
import checkCircle2Raw from '$lib/assets/icons/circle-check.svg?raw';
import chevronLeftRaw from '$lib/assets/icons/chevron-left.svg?raw';
import chevronRightRaw from '$lib/assets/icons/chevron-right.svg?raw';
import circleAlertRaw from '$lib/assets/icons/circle-alert.svg?raw';
import downloadRaw from '$lib/assets/icons/download.svg?raw';
import globeRaw from '$lib/assets/icons/globe.svg?raw';
import homeRaw from '$lib/assets/icons/home.svg?raw';
import loaderCircleRaw from '$lib/assets/icons/loader-circle.svg?raw';
import mailRaw from '$lib/assets/icons/mail.svg?raw';
import mailCheckRaw from '$lib/assets/icons/mail-check.svg?raw';
import moonStarRaw from '$lib/assets/icons/moon-star.svg?raw';
import sendRaw from '$lib/assets/icons/send.svg?raw';
import sunRaw from '$lib/assets/icons/sun.svg?raw';
import xRaw from '$lib/assets/icons/x.svg?raw';
import calendarRaw from '$lib/assets/icons/calendar.svg?raw';

// Brand icons (fill-based, from Simple Icons)
import chromeRaw from '$lib/assets/icons/chromewebstore.svg?raw';
import cssRaw from '$lib/assets/icons/css.svg?raw';
import gsapRaw from '$lib/assets/icons/gsap.svg?raw';
import shadcnRaw from '$lib/assets/icons/shadcnui.svg?raw';
import gitRaw from '$lib/assets/icons/git.svg?raw';
import githubRaw from '$lib/assets/icons/github.svg?raw';
import html5Raw from '$lib/assets/icons/html5.svg?raw';
import jsRaw from '$lib/assets/icons/javascript.svg?raw';
import nextRaw from '$lib/assets/icons/nextdotjs.svg?raw';
import nodeRaw from '$lib/assets/icons/nodedotjs.svg?raw';
import postgresRaw from '$lib/assets/icons/postgresql.svg?raw';
import reactRaw from '$lib/assets/icons/react.svg?raw';
import supabaseRaw from '$lib/assets/icons/supabase.svg?raw';
import svelteRaw from '$lib/assets/icons/svelte.svg?raw';
import tailwindRaw from '$lib/assets/icons/tailwindcss.svg?raw';
import twitterRaw from '$lib/assets/icons/twitter.svg?raw';
import tsRaw from '$lib/assets/icons/typescript.svg?raw';
import vueRaw from '$lib/assets/icons/vuedotjs.svg?raw';

// Strips <title> tags and adds fill="currentColor" so brand icons inherit text color
const brand = (svg: string) =>
	svg.replace(/<title>.*?<\/title>/g, '').replace('<svg ', '<svg fill="currentColor" ');

export const icons = {
	// UI
	bot: botRaw,
	'check-circle': checkCircle2Raw,
	'chevron-left': chevronLeftRaw,
	'chevron-right': chevronRightRaw,
	'circle-alert': circleAlertRaw,
	download: downloadRaw,
	globe: globeRaw,
	home: homeRaw,
	'loader-circle': loaderCircleRaw,
	mail: mailRaw,
	'mail-check': mailCheckRaw,
	'moon-star': moonStarRaw,
	send: sendRaw,
	sun: sunRaw,
	x: xRaw,
	calendar: calendarRaw,

	// Brand
	chrome: brand(chromeRaw),
	css: brand(cssRaw),
	gsap: brand(gsapRaw),
	shadcn: brand(shadcnRaw),
	git: brand(gitRaw),
	github: brand(githubRaw),
	html: brand(html5Raw),
	javascript: brand(jsRaw),
	next: brand(nextRaw),
	node: brand(nodeRaw),
	postgresql: brand(postgresRaw),
	react: brand(reactRaw),
	supabase: brand(supabaseRaw),
	svelte: brand(svelteRaw),
	tailwind: brand(tailwindRaw),
	twitter: brand(twitterRaw),
	typescript: brand(tsRaw),
	vue: brand(vueRaw),
} as const;

export type IconName = keyof typeof icons;
