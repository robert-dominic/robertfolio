<script lang="ts">
	import { icons, type IconName } from "$lib/utils/icons";

	let { name, class: className = "h-4 w-4" } = $props<{
		name: IconName;
		class?: string;
	}>();
</script>

<span
	class="inline-flex shrink-0 {className} [&>svg]:h-full [&>svg]:w-full"
	aria-hidden="true"
>
	{@html icons[name as IconName]}
</span>
