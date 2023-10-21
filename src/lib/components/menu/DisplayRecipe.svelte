<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import SmallRecipe from '../small_recipe.svelte';

	//PopUp
	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});
	export let recipeID: string = '';
	export let recipeName: string = '';
</script>

<button
	use:melt={$trigger}
	class="inline-flex justify-start items-start italic text-emerald-600 dark:text-emerald-300"
	>{recipeName}
</button>
<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 h-5/6 w-11/12 max-h-[60vh]
              max-w-[95vh] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
              p-6 shadow-lg overflow-hidden"
			use:melt={$content}>
			<SmallRecipe {recipeID} />
		</div>
	{/if}
</div>
