<script lang="ts">
	import AddRecipe from '$lib/components/menu/AddRecipe.svelte';
	import CreateSection from '$lib/components/menu/CreateSection.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;
	console.log(data.menu_info);
	let menuID: string = data.menu_info.id;

	const deleteMenu = async () => {
		try {
			const response = await fetch('/api/menu', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ menu_id: menuID })
			});

			if (response.ok) {
				goto('/cookbook');
			} else {
				const errorMessage = await response.text();
				console.error(`Error deleting menu: ${errorMessage}`);
			}
		} catch (error) {
			console.error('An error occurred while deleting the menu:', error);
		}
	};
	const recipeID = data.recipes;
	const recipe_info = data.recipes;
	console.log(recipe_info);
	console.log('Menu', data.menu_info);
	const lastSectionIndex: number = data.menu_info.section_id.length - 1;
	//need a refresh of data
</script>

<div class="flex justify-center items-center">
	<div class="flex flex-col border-4 w-3/4">
		<h1
			class="flex flex-col border-4 border-emerald-700 text-emerald-700 dark:text-emerald-300 text-4xl text-center">
			{data.menu_info.name}
		</h1>
		<!-- This will contain all sections and recipes -->
		<div class="flex flex-col border-4 border-emerald-300 items-start">
			{#each data.menu_info.section as section, i}
				<h2 class="text-3xl text-emerald-700 px-5">{section}</h2>
				<!-- Displaying the recipes and adding recipe to section, need to check if a recipe exists first -->
				<!-- Need to make recipes with section_id -->

				<a class="flex flex-col border-4 border-emerald-100 px-10" href="" />
				<button
					class=" px-10 rounded-md text-md text-emerald-700 border-emerald-700 dark:text-emerald-300 darkborder-emerald-300">
					<AddRecipe {menuID} /></button>
			{/each}
			<button
				class=" justify-start rounded-md text-3xl text-emerald-700 border-emerald-700 dark:text-emerald-300 darkborder-emerald-300">
				<CreateSection sectionID={lastSectionIndex + 1} menuId={menuID} /></button>
		</div>

		<div
			class="flex flex-col border-2 dark:border-emerald-300 border-emerald-300 justify-center items-center p-1">
			<button
				on:click={deleteMenu}
				class="rounded-full border-2 w-40 h-10 border-emerald-700 text-emerald-700 dark:text-emerald-300 text-lg font-semibold">
				Delete Menu
			</button>
		</div>
	</div>
</div>
<!--
	@ Ashlea if you want to make Menu centered in the page with 3/4 width so that is looks like our original page design
	you can put all currenct code into this div:

	<div class="flex justify-center items-center">
		...exisiting code but set width -> w-3/4 in the class of this top div
	</div>
-->
