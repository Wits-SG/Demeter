<script lang="ts">
	import { onMount } from 'svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { Star, X } from 'lucide-svelte';
	import { createSeparator, type CreateSeparatorProps } from '@melt-ui/svelte';

	const {
		elements: { root: horizontal }
	} = createSeparator({
		orientation: 'horizontal',
		decorative: true
	});

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});

	let recipeID: string;
	let recipeName: string;
	let recipeDescription: string;
	let recipeImg: string;

	let recipeData: any;

	const getRecipeData = async () => {
		try {
			const recipeData_result = await fetch('/api/recipe/recipe_of_the_day', {
				method: 'GET'
			});

			const recipe_data: JSON = await recipeData_result.json();
			return recipe_data;
		} catch (recipeData_err: any) {
			console.error('Failed to fetch recipe data');
		}
	};

	onMount(async () => {
		recipeData = await getRecipeData();
		recipeID = recipeData.recipe.id;
		recipeName = recipeData.recipe.name;
		recipeDescription = recipeData.recipe.description;
		recipeImg = recipeData.recipe.imageUrl;
	});
</script>

<button
	use:melt={$trigger}
	class="p-2 h-9 gap-1 flex flex-row justify-center items-center dark:bg-emerald-700 border-emerald-500 border-2 bg-emerald-100 hover:bg-emerald-300 dark:hover:bg-emerald-800 rounded-lg">
	<Star />
	Recipe of the Day
</button>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
              max-w-[700px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
              p-6 shadow-lg flex flex-col"
			use:melt={$content}>
			<div class="flex flex-row justify-center items-center gap-5">
				<h2 use:melt={$title} class="text-3xl font-medium text-emerald-700">
					RECIPE OF THE DAY
				</h2>
			</div>

			<div
				use:melt={$horizontal}
				class="mt-4 items-center justify-center h-[3px] w-full bg-teal-600 dark:bg-teal-400" />

			<section class="flex flex-row justify-center items-center gap-10 p-5">
				<div class="flex flex-col justify-center items-center w-1/2">
					<section class="container md:mx-auto w-full">
						<img alt="" src={recipeImg} class="object-cover rounded-md" />
					</section>
				</div>
				<section class="flex flex-col justify-center items-center gap-10 w-1/2">
					<div class="text-xl font-semibold font-small text-black">
						{recipeName}
					</div>
					<div class="text-xl font-small text-black">
						{recipeDescription}
					</div>
				</section>
			</section>

			<div class="mt-6 flex justify-end items-end gap-4">
				<a
					use:melt={$close}
					href="/recipe/{recipeID}"
					class="inline-flex h-8 items-center justify-center rounded-sm
                    bg-teal-600 px-4 font-medium leading-none text-zinc-50 hover:bg-emerald-600">
					View Recipe
				</a>
				<button
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
                      bg-teal-600 px-4 font-medium leading-none text-zinc-50 hover:bg-emerald-600">
					<X />
				</button>
			</div>
		</div>
	{/if}
</div>
