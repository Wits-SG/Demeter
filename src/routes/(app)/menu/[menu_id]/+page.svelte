<script lang="ts">
	import AddRecipe from '$lib/components/menu/AddRecipe.svelte';
	import CreateSection from '$lib/components/menu/CreateSection.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { Icon } from 'flowbite-svelte-icons';
	import DisplayRecipe from '$lib/components/menu/DisplayRecipe.svelte';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { Trash, MoveLeft, X } from 'lucide-svelte';

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
	async function deleteRecipe(sectionID: number, recipeID: string) {
		try {
			const response = await fetch('/api/menu/section/recipes', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ recipeID: recipeID, menuID: menuID, sectionID: sectionID })
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
	}

	const lastSectionIndex: number = data.menu_info.section_id.length - 1;
	//need a refresh of data
</script>

<div class="w-full h-fit grid grid-rows-1 grid-cols-[minmax(250px,_20%)_1fr] p-2">
	<div class="w-full h-fit col-start-1 flex flex-col justify-center items-center gap-2">
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
			{data.menu_info.name}
		</h1>

		<!-- This will contain all sections and recipes -->
		<div class="flex flex-col justify-center items-center w-9/12">
			{#each data.menu_info.section as section, i}
				<h2
					class="text-4xl text-emerald-800 dark:text-emerald-400 text-center w-full px-5 font-sans italic font-semibold justify-center items-center py-2 border-b-2 dark:border-sky-200 border-sky-800">
					{section}
				</h2>
				<!-- Displaying recipes under their sections -->
				<div class="flex flex-col w-full items-start">
					{#each data.recipe[i] as recipe}
						<div class="flex flex-col w-full">
							<div class="flex flex-row justify-between">
								<button class="text-2xl px-10 font-sans font-medium">
									<DisplayRecipe recipeID={recipe.id} recipeName={recipe.name} />
								</button>
								<!-- <a href="/recipe/{recipe.id}" class="text-2xl px-10 font-sans font-medium">{recipe.name}</a> -->
								<div class="flex flex-row items-center justify-center gap-1">
									<Icon name="clock-outline" class="h-5 w-5" />
									<p class="">
										~{recipe.cookingTime} Mins
									</p>
									<button
										use:melt={$trigger}
										on:click={() => deleteRecipe(i, recipe.id)}
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

					<button class="px-5"> <AddRecipe {menuID} sectionID={i} /></button>
				</div>
			{/each}
			<button
				class=" py-5 justify-start rounded-md text-4xl text-emerald-800 border-emerald-700 dark:text-emerald-400">
				<CreateSection sectionID={lastSectionIndex + 1} menuId={menuID} /></button>
		</div>
	</div>
</div>
