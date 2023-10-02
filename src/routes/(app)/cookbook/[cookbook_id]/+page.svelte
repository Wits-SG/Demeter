<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import SmallRecipe from '$lib/components/small_recipe.svelte';
	import { Icon } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';
	export let data: PageData;

	let noRecipe = data.recipes.length == 0;
	let currentRecipeID: string = noRecipe ? '' : data.recipes[0].id;
	let currentRecipeIndex: number = 0;
	let userID: string = 'SmOouPpFdJViJaRq933q3iCt0Ho2';

	function prevPress() {
		if (data.recipes) currentRecipeIndex -= 1;
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

	async function deleteRecipe() {
		try {
			const response = await fetch('/api/cookbook/recipe', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ recipeId: currentRecipeID, cookbookId: cookbookID })
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

	const deleteCookbook = async () => {
		try {
			const response = await fetch('/api/cookbook', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ cookbook_id: cookbookID })
			});

			if (response.ok) {
				// Recipe deleted successfully
				// You can add additional logic here if needed
				//invalidateAll();
			} else {
				const errorMessage = await response.text();
				console.error(`Error deleting recipe: ${errorMessage}`);
			}
		} catch (error) {
			console.error('An error occurred while deleting the recipe:', error);
		}
	};
</script>

<div class="flex flex-row h-full w-full justify-center gap-10 p-3">
	<!-- div for index box  -->
	<div class=" flex flex-col border-4 border-emerald-700 h-fit w-1/6 text-center gap-5 p-5">
		<h2 class="text-3xl font-semibold text-emerald-700">INDEX</h2>
		<div class="flex flex-col gap-5">
			{#each data.recipes as recipe, index}
				<button
					on:click={() => {
						currentRecipeID = recipe.id;
						currentRecipeIndex = index;
					}}>{recipe.name}</button>
			{/each}

			<a href="/cookbook/">Back</a>
			<button on:click={deleteCookbook}>Delete</button>
		</div>
	</div>
	<!-- div for the small recipe box -->
	<div
		class="flex flex-col border-4 border-emerald-700 h-full max-h-[85vh] overflow-scroll w-4/5 text-center justify-center place-items-center">
		<div class="flex flex-row w-full justify-end px-5 py-5">
			<button
				on:click={deleteRecipe}
				class="rounded-md border-2 w-80 h-10 border-emerald-700 text-emerald-700 text-lg font-semibold gap-1"
				>Remove recipe from cookbook</button>
		</div>
		<div
			class="self-center flex flex-col border-2 border-emerald-700 h-5/6 w-11/12 max-h-fit overflow-hidden">
			<SmallRecipe recipeID={currentRecipeID} cookbook_id={cookbookID} />
		</div>
		<div class="flex flex-row h-1/9 w-11/12 gap-x-96 place-content-between">
			{#if !noRecipe}
				<button
					on:click={prevPress}
					class="mt-5 rounded-md border-2 w-20 h-10 border-emerald-700 text-emerald-700 text-lg font-semibold"
					>Prev</button>
				<button
					on:click={nextPress}
					class=" mt-5 rounded-md border-2 w-20 h-10 border-emerald-700 text-emerald-700 text-lg font-semibold"
					>Next</button>
			{/if}
		</div>
	</div>
</div>
