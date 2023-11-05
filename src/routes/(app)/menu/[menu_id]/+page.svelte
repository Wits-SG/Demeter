<script lang="ts">
	import AddRecipe from '$lib/components/menu/AddRecipe.svelte';
	import CreateSection from '$lib/components/menu/CreateSection.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { Icon } from 'flowbite-svelte-icons';
	import DisplayRecipe from '$lib/components/menu/DisplayRecipe.svelte';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

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

<div class="flex justify-center items-center h-full">
	<div
		class="flex flex-col justify-evenly w-full max-w-[95vh] h-full border-4 border-emerald-700 dark:border-emerald-300">
		<h1
			class="flex flex-col text-emerald-700 dark:text-emerald-300 text-6xl text-center font-serif italic font-bold outline-dotted">
			{data.menu_info.name}
		</h1>

		<!-- This will contain all sections and recipes -->
		<div class="flex flex-col justify-center items-center py-5">
			{#each data.menu_info.section as section, i}
				<h2
					class="text-4xl text-emerald-800 dark:text-emerald-400 px-5 font-sans italic font-semibold justify-center items-center py-2">
					{section}
				</h2>
				<!-- Displaying recipes under their sections -->
				<div
					class="flex flex-col w-full items-start outline-dotted outline-sky-900 outline-4">
					{#each data.recipe[i] as recipe}
						<div class="flex flex-col w-full">
							<div class="flex flex-row justify-between w-11/12 min-w-[85vh]">
								<button class="text-2xl px-10 font-sans font-medium">
									<DisplayRecipe recipeID={recipe.id} recipeName={recipe.name} />
								</button>
								<div class="flex flex-row items-center justify center gap-1">
									<Icon name="clock-outline" class="h-5 w-5" />
									<p class="">
										~{recipe.cookingTime} Mins
									</p>
									<button
										use:melt={$trigger}
										on:click={() => deleteRecipe(i, recipe.id)}
										class="text-md px-5 text-red-600">X</button>
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
		<div
			class="flex flex-row text-emerald-700 dark:text-emerald-300 justify-center items-center text-xl py-1">
			<a href="/collections/menus">Back</a>
		</div>

		<div class="flex flex-col justify-center items-center py-5">
			<button
				on:click={deleteMenu}
				class=" rounded-md border-2 w-40 h-10 border-emerald-700 text-emerald-700 dark:text-emerald-300 text-lg font-semibold">
				Delete Menu
			</button>
		</div>
	</div>
</div>
