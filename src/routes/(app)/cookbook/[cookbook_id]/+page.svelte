<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import SmallRecipe from '$lib/components/small_recipe.svelte';

	import type { PageData } from './$types';
	export let data: PageData;

	let currentRecipeID: string = data.recipes[0].id;
	let currentRecipeIndex: number = 0;

	function prevPress() {
		currentRecipeIndex -= 1;
		if (currentRecipeIndex < 0) {
			currentRecipeID = data.recipes[lastIndex].id;
			currentRecipeIndex = lastIndex;
		} else {
			currentRecipeID = data.recipes[currentRecipeIndex].id;
		}
	}
	let lastIndex = data.recipes.length - 1;
	function nextPress(): void {
		currentRecipeIndex += 1;
		if (currentRecipeIndex > lastIndex) {
			currentRecipeID = data.recipes[0].id;
			currentRecipeIndex = 0;
		} else {
			currentRecipeID = data.recipes[currentRecipeIndex].id;
		}
	}

	let cookbookName: string = data.cookbook_info.name;

	let cookbookID: string = data.cookbook_info.id;
	console.log(cookbookName);
	console.log(cookbookID);

	async function deleteRecipe() {
		try {
			const response = await fetch('/cookbook/cookbok_id', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ recipeId: currentRecipeID, cookbook_id: cookbookID })
			});

			if (response.ok) {
				// Recipe deleted successfully
				// You can add additional logic here if needed
				invalidateAll();
			} else {
				const errorMessage = await response.text();
				console.error(`Error deleting recipe: ${errorMessage}`);
			}
		} catch (error) {
			console.error('An error occurred while deleting the recipe:', error);
		}
	}
</script>

<div class="flex flex-row h-full w-full justify-center gap-20">
	<!-- div for index box  -->
	<div class=" mt-24 flex flex-col border-4 border-emerald-700 h-3/4 w-1/6 text-center gap-10">
		<h2 class="text-3xl font-semibold text-emerald-700 mt-5">INDEX</h2>
		<div class="flex flex-col gap-5">
			{#each data.recipes as recipe, index}
				<button
					class="border-4"
					on:click={() => {
						currentRecipeID = recipe.id;
						currentRecipeIndex = index;
					}}>{recipe.name}</button>
			{/each}
			<a href="/cookbook/">Back</a>
		</div>
	</div>
	<!-- div for the small recipe box -->
	<div
		class=" mt-24 flex flex-col border-4 border-emerald-700 h-3/4 overflow-scroll w-2/3 text-center justify-center items-end">
		<button
			on:click={deleteRecipe}
			class="rounded-md border-2 w-80 h-10 border-emerald-700 text-emerald-700 text-lg font-semibold justify-items-end gap-1"
			>Remove recipe from cookbook</button>
		<div
			class="mt-10 self-center flex flex-col border-2 border-emerald-700 h-5/6 w-11/12 overflow-hidden">
			<SmallRecipe recipeID={currentRecipeID} />
		</div>
		<div class="mt-10 flex flex-row space-x-96 h-1/9 w-11/12 justify-between">
			<button
				on:click={prevPress}
				class="ml-20 rounded-md border-2 w-20 h-10 border-emerald-700 text-emerald-700 text-lg font-semibold"
				>Prev</button>
			<button
				on:click={nextPress}
				class="mr-2 rounded-md border-2 w-20 h-10 border-emerald-700 text-emerald-700 text-lg font-semibold"
				>Next</button>
		</div>
	</div>
</div>
