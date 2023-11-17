<script lang="ts">
	import AddRecipe from '$lib/components/menu/AddRecipe.svelte';
	import CreateSection from '$lib/components/menu/CreateSection.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { Icon } from 'flowbite-svelte-icons';
	import DisplayRecipe from '$lib/components/menu/DisplayRecipe.svelte';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { Trash, MoveLeft, X, Plus, Check } from 'lucide-svelte';
	import * as Select from '$lib/components/ui/select';
	import SelectRecipe from '$lib/components/menu/SelectRecipe.svelte';
	import { onMount } from 'svelte';

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: 'top'
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true
	});
	export let data: PageData;

	let menuID: string = data.menuInfo.id;

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
	async function deleteRecipe(sectionID: number, recipeID: string, recipeIdx: number) {
		try {
			const response = await fetch('/api/menu/section/recipes', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ recipeID: recipeID, menuID: menuID, sectionID: sectionID })
			});

			menuRecipes[sectionID].splice(recipeIdx, 1);

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
	}

	const lastSectionIndex: number = data.menuInfo.section_id.length - 1;
	//need a refresh of data

	let menuSections = data.menuInfo.section;
	let menuRecipes = data.recipe;
	let addedRecipe: { name: string; recipe_id: string }; // This is a binding for the recipe selected by the dropdown

	let menuCookbooks = data.menuCookbooks;
	let userCookbooks = data.userCookbooks;
	let addCookbookFlag: boolean = false;
	let selectedCookbook: any;

	let addRecipeSectionFlag: Array<boolean> = [];
	for (let _ of menuSections) {
		addRecipeSectionFlag.push(false);
	}

	let cookbookRecipes: Array<Array<{ name: string; recipe_id: string }>> = [];
	onMount(async () => {
		for (let mcb of menuCookbooks) {
			const result = await fetch(`/api/menu?cookbook_id=${mcb.id}`);
			const newRecipes = await result.json();
			cookbookRecipes.push(newRecipes);
		}
	});
</script>

<div class="w-full h-fit grid grid-rows-1 grid-cols-[minmax(250px,_20%)_1fr] p-2">
	<div
		class="w-full h-fit col-start-1 flex flex-col justify-center items-center gap-5 place-self-stretch">
		<section class="flex flex-col justify-center items-start gap-2 w-5/6 min-w-[100px] py-2">
			<h2 class="text-2xl border-b-2 border-sky-500">Cookbooks</h2>

			{#each menuCookbooks as mcb, i}
				<p
					class="w-full border-sky-500 border-b-2 text-lg flex flex-row justify-between items-center">
					{mcb.name}
					<button
						on:click={async () => {
							const removedCookbook = menuCookbooks.splice(i, 1)[0];
							cookbookRecipes.splice(i, 1); // remove the removed cookbook's recipes
							menuCookbooks = menuCookbooks;

							fetch('/api/menu/cookbook', {
								method: 'DELETE',
								body: JSON.stringify({
									menuId: menuID,
									cookbookId: removedCookbook.id
								})
							});
						}}
						class="text-md text-red-500 flex justify-center items-center">
						<X /></button>
				</p>
			{/each}

			{#if !addCookbookFlag}
				<button
					on:click={() => (addCookbookFlag = true)}
					class="w-full border-sky-500 hover:bg-neutral-200 dark:hover:bg-neutral-900 border-b-2 text-lg flex flex-row justify-between items-center">
					Add a Cookbook
					<Plus />
				</button>
			{:else}
				<span
					class="w-full py-2 border-sky-500 border-b-2 flex flex-row justify-between items-center gap-2">
					<Select.Root bind:selected={selectedCookbook}>
						<Select.Trigger>
							<Select.Value placeholder="Select cookbook" />
						</Select.Trigger>
						<Select.Content>
							{#each userCookbooks as ucb, i}
								<Select.Item value={i}>{ucb.name}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>

					<button
						on:click={async () => {
							addCookbookFlag = false;
							const newMenuCookbook = {
								//@ts-ignore
								name: userCookbooks[selectedCookbook.value].name,
								id: userCookbooks[selectedCookbook.value].id
							};

							if (!menuCookbooks.some((val) => val.name == newMenuCookbook.name)) {
								menuCookbooks.push(newMenuCookbook);
								menuCookbooks = menuCookbooks;

								await fetch('/api/menu/cookbook', {
									method: 'POST',
									body: JSON.stringify({
										menuId: menuID,
										cookbookId: newMenuCookbook.id
									})
								});

								const result = await fetch(
									`/api/menu?cookbook_id=${newMenuCookbook.id}`
								);
								const newRecipes = await result.json();
								cookbookRecipes.push(newRecipes);
							}
						}}
						class="text-md text-green-500 flex justify-center items-center">
						<Check />
					</button>
					<button
						on:click={() => (addCookbookFlag = false)}
						class="text-md text-red-500 flex justify-center items-center">
						<X />
					</button>
				</span>
			{/if}
		</section>

		<section class="flex flex-col justify-center items-start gap-2 w-1/2 min-w-[100px]">
			<a
				class="w-full items-center justify-start flex flex-row rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 py-1 px-2 dark:hover:bg-emerald-800 hover:bg-emerald-300 text-lg gap-2"
				href="/collections/menus">
				<MoveLeft />
				Back
			</a>

			<button
				on:click={deleteMenu}
				class="text-lg py-1 px-2 w-full rounded-md flex flex-row justify-start items-center hover: dark:text-white text-black hover:bg-red-300 bg-red-400 border-2 border-red-600 gap-2">
				<Trash />
				Delete Menu
			</button>
		</section>
	</div>

	<div
		class="w-full h-fit overflow-y-auto col-start-2 flex flex-col items-center justify-evenly border-emerald-500 dark:border-emerald-300 border-4 p-2 gap-8 max-w-[70vw] place-self-center">
		<h1
			class="flex flex-col py-2 text-emerald-700 dark:text-emerald-300 text-6xl w-10/12 text-center font-serif italic font-bold border-dashed border-4 border-emerald-500">
			{data.menuInfo.name}
		</h1>

		<!-- This will contain all sections and recipes -->
		<div class="flex flex-col justify-center items-center w-9/12">
			{#each menuSections as section, i}
				<h2
					class="text-4xl text-emerald-800 dark:text-emerald-400 text-center w-full px-5 font-sans italic font-semibold justify-center items-center py-2 border-b-2 dark:border-sky-200 border-sky-800">
					{section}
				</h2>
				<!-- Displaying recipes under their sections -->
				<div class="flex flex-col w-full items-start">
					{#each menuRecipes[i] as recipe, recipeIdx}
						<div class="flex flex-col w-full">
							<div
								class="flex flex-row justify-between italic dark:text-emerald-300 text-emerald-800">
								<a
									href="/recipe/{recipe.id}"
									class="text-2xl px-10 font-sans font-medium">
									{recipe.name}
								</a>
								<!-- <a href="/recipe/{recipe.id}" class="text-2xl px-10 font-sans font-medium">{recipe.name}</a> -->
								<div class="flex flex-row items-center justify-center gap-1">
									<Icon name="clock-outline" class="h-5 w-5" />
									<p class="">
										~{recipe.cookingTime} Mins
									</p>
									<button
										use:melt={$trigger}
										on:click={() => deleteRecipe(i, recipe.id, recipeIdx)}
										class="text-md px-5 text-red-500 flex justify-center items-center"
										><X /></button>
									{#if $open}
										<div
											use:melt={$content}
											transition:fade={{ duration: 100 }}
											class="z-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 shadow">
											<div use:melt={$arrow} />
											<p class="px-4 py-1 text-black dark:text-white">
												Delete recipe
											</p>
										</div>
									{/if}
								</div>
							</div>
							<p class="text-md px-20">{recipe.description}</p>
						</div>
					{/each}

					{#if !addRecipeSectionFlag[i]}
						<button
							on:click={() => (addRecipeSectionFlag[i] = true)}
							class="px-5 text-md hover:bg-neutral-900 text-emerald-500"
							>+ Recipe</button>
					{:else}
						<span
							class="w-1/3 py-2 px-1 flex flex-row justify-between items-center gap-2">
							<SelectRecipe
								recipes={cookbookRecipes.flat()}
								bind:selectedRecipes={addedRecipe} />

							<button
								on:click={async () => {
									addRecipeSectionFlag[i] = false;

									// If the recipe already exists, in the section then don't add it
									if (
										!menuRecipes[i].some(
											(val) => val.id == addedRecipe.recipe_id
										)
									) {
										const res = await fetch(
											`/api/recipe?recipe_id=${addedRecipe.recipe_id}`
										);
										const { recipe: recipeJson } = await res.json();
										menuRecipes[i].push({
											id: addedRecipe.recipe_id,
											name: addedRecipe.name,
											postId: recipeJson.postId,
											description: recipeJson.description,
											servingSize: recipeJson.servingSize,
											cookingTime: recipeJson.cookingTime,
											skillLevel: '',
											instructions: [],
											ingredients: [],
											imageUrl: ''
										});
										menuRecipes[i] = menuRecipes[i];

										await fetch('/api/menu/section/recipes', {
											method: 'POST',
											body: JSON.stringify({
												recipeID: addedRecipe.recipe_id,
												menuID: menuID,
												sectionID: i
											})
										});
									}
								}}
								class="text-md text-green-500 flex justify-center items-center">
								<Check />
							</button>
							<button
								on:click={() => (addRecipeSectionFlag[i] = false)}
								class="text-md text-red-500 flex justify-center items-center">
								<X />
							</button>
						</span>
					{/if}
				</div>
			{/each}
			<button
				on:click={() => addRecipeSectionFlag.push(false)}
				class=" py-5 justify-start rounded-md text-4xl text-emerald-800 border-emerald-700 dark:text-emerald-400">
				<CreateSection sectionID={lastSectionIndex + 1} menuId={menuID} /></button>
		</div>
	</div>
</div>
