<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import { Icon } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	let recipes: Array<{ name: string; recipe_id: string }> = [];
	export let selectedRecipes: Array<{ name: string; recipe_id: string }> = [
		{
			name: '',
			recipe_id: ''
		}
	];
	let recipe: string = '';
	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({ forceVisible: true });

	// Execute this code when the component is loaded into the DOM
	onMount(async () => {
		const fetchResult = await fetch('/api/menu');
		recipes = await fetchResult.json();
		recipe = recipes[0].name;
	});
</script>

<button
	use:melt={$trigger}
	class="h-8 w-64 min-w-fit rounded-lg bg-zinc-200 flex justify-center items-center gap-5 text-lg p-2 hover:bg-zinc-400 overflow-scroll">
	<!-- <Icon name="book-outline" class="h-5 w-5 text-green-700" /> -->
	<p class="text-zinc-900">{recipe}</p>
	<Icon name="angle-down-outline" class="h-4 w-4 text-zinc-900" />
</button>

{#if $open}
	<div
		class="bg-zinc-200 h-96 w-96 dark:text-black p-2 flex flex-col justify-center items-start rounded-lg gap-3 overflow-scroll"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -10 }}>
		{#each recipes as recipe}
			<button
				class="flex flex-row justify-center items-center gap-5"
				use:melt={$item}
				on:click={() => {
					selectedRecipes.push(recipe);
					console.log('Selected Recipes:', selectedRecipes);
				}}>
				{recipe.name}</button>
		{/each}
	</div>
{/if}
