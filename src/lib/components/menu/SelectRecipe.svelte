<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import { Icon } from 'flowbite-svelte-icons';

	export let recipes: Array<{ name: string; recipe_id: string }> = [];
	export let selectedRecipes: { name: string; recipe_id: string };

	let recipe: string = '';
	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({ forceVisible: true });
</script>

<button
	use:melt={$trigger}
	class="h-8 w-full min-w-fit rounded-lg bg-zinc-200 flex justify-center items-center gap-5 text-lg p-2 hover:bg-zinc-400 overflow-scroll">
	<!-- <Icon name="book-outline" class="h-5 w-5 text-green-700" /> -->
	<p class="text-zinc-900">{recipe}</p>
	<Icon name="angle-down-outline" class="h-4 w-4 text-zinc-900" />
</button>

{#if $open}
	<div
		class="bg-zinc-200 dark:text-black p-2 flex flex-col justify-start items-start rounded-lg gap-3 overflow-scroll"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -10 }}>
		{#each recipes as recipe}
			<button
				class="flex flex-row justify-center items-center gap-5"
				use:melt={$item}
				on:click={() => {
					selectedRecipes = recipe;
				}}>
				{recipe.name}
			</button>
		{/each}
	</div>
{/if}
