<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import type { stringify } from 'postcss';
	import { onMount } from 'svelte';
	//@ts-ignore
	import { v4 as uuidv4 } from 'uuid';
	import SelectRecipes from './SelectRecipe.svelte';
	//import RecipePreview from '../recipe_preview.svelte';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});

	export let menuID: string = '';

	let selectedRecipes: Array<{ recipe_id: string; name: string }> = [];
	export let sectionID: number = 0;

	let recipeID: string;

	//check recipe doesnt already exist in the menu?
	const AddRecipes = async (menuId: string, recipeID: string, sectionID: number) => {
		try {
			const response = await fetch('/api/menu/section/recipes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					menuID: menuId,
					recipeID: recipeID,
					sectionID: sectionID
				})
			});
		} catch (e) {
			console.error('An error occurred:', e);
		}
	};

	function addRecipe() {
		for (let i = 0; i < selectedRecipes.length; i++) {
			recipeID = selectedRecipes[i].recipe_id;
			sectionID = sectionID;
			menuID = menuID;
			AddRecipes(menuID, recipeID, sectionID);
		}
		selectedRecipes = [];
	}
</script>

<button
	use:melt={$trigger}
	class="px-5 py-1 text-lg font-xl font-sans italic text-emerald-600 dark:text-emerald-300 font-medium"
	>+ Recipe
</button>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
              max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
              p-6 shadow-lg"
			use:melt={$content}>
			<h2 use:melt={$title} class=" text-lg font-medium text-black">Select Recipes.</h2>
			<p use:melt={$description} class="mb-5 mt-2 leading-normal text-zinc-600">
				Choose the recipes that you would like to save in this section.
			</p>

			<SelectRecipes bind:selectedRecipes />
			<div class="flex items-start justify-start gap-10 pl-10">
				<ul class="list-disc list-inside">
					{#each selectedRecipes as section}
						<li class="mb-2 text-zinc-900">
							{section.name}
						</li>
					{/each}
				</ul>
			</div>
			<div class="mt-6 flex justify-end gap-4">
				<button
					on:click={() => (selectedRecipes = [])}
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
                      bg-teal-600 px-4 font-medium leading-none text-zinc-50 hover:bg-emerald-600">
					Cancel
				</button>
				<button
					on:click={addRecipe}
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
					bg-teal-600 px-4 font-medium leading-none text-zinc-50 hover:bg-emerald-600">
					Save
				</button>
			</div>
		</div>
	{/if}
</div>
