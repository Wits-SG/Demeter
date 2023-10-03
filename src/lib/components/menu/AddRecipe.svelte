<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import type { stringify } from 'postcss';
	import { onMount } from 'svelte';
	//@ts-ignore
	import { v4 as uuidv4 } from 'uuid';
	import SelectRecipes from './SelectRecipes.svelte';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});

	export let menuID: string = '';
	let selectedRecipe: { name: string; recipe_id: string } = {
		name: '',
		recipe_id: ''
	};

	let sectionName: string;
	export let sectionID: number = 0;
	export let menuId: string;
	const AddRecipe = async () => {
		await fetch('/api/menu/section/recipe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				menuID: menuId,
				recipeID: selectedRecipe.recipe_id,
				sectionID: sectionID
			})
		});
	};
</script>

<button
	use:melt={$trigger}
	class="inline-flex justify-start items-start rounded-md px-10 py-1
  font-medium leading-none text-magnum-700 shadow hover:opacity-75"
	>+ recipe
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
			<SelectRecipes />
			<div class="mt-6 flex justify-end gap-4">
				<button
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
                      bg-teal-600 px-4 font-medium leading-none text-zinc-50 hover:bg-emerald-600">
					Cancel
				</button>
				<button
					on:click={async () => {
						// Check if the recipe already exists in the selected cookbook
						const response = await fetch('/api/cookbook/recipe/check', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								recipeId: recipeID,
								cookbookId: selectedCookbook.cookbook_id
							})
						});

						if (response.ok) {
							const data = await response.json();
							if (data.exists) {
								// Recipe already exists in the cookbook, show an alert
								alert('Recipe already exists in this cookbook.');
							} else {
								// Recipe doesn't exist, proceed to save it
								await fetch('/api/cookbook/recipe', {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json'
									},
									body: JSON.stringify({
										recipeId: recipeID,
										cookbookId: selectedCookbook.cookbook_id
									})
								});
							}
						} else {
							// Handle the API error as needed
							console.error('API error:', response.statusText);
						}
					}}
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
					bg-teal-600 px-4 font-medium leading-none text-zinc-50 hover:bg-emerald-600">
					Save
				</button>
			</div>
		</div>
	{/if}
</div>
