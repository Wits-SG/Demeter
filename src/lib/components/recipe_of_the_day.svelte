<script lang="ts">
	import { onMount } from 'svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { Star, X } from 'lucide-svelte';
	import { createSeparator, type CreateSeparatorProps } from '@melt-ui/svelte';

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

	let userId: string;
	let userDisplayname: string;

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
		userId = recipeData.user.id;
		userDisplayname = recipeData.user.displayName;
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
              max-w-[700px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-neutral-100 dark:bg-neutral-800
              p-6 shadow-lg flex flex-col"
			use:melt={$content}>
			<h2
				use:melt={$title}
				class="text-4xl w-full text-center border-b-4 pb-4 border-emerald-500 font-medium text-black dark:text-white">
				RECIPE OF THE DAY
			</h2>

			<section class="flex flex-row justify-center items-start gap-3 p-2">
				<img
					alt=""
					src={recipeImg}
					class="object-cover rounded-md max-w-[65vh] max-h-[60vh] h-fit w-fit" />

				<div class="flex flex-col justify-start items-start gap-2 w-full">
					<h2 class="text-2xl font-semibold font-small text-black dark:text-white">
						{recipeName}
					</h2>

					<a href="/profile/{userId}" class="italic text-neutral-500"
						>{userDisplayname}</a>

					<p class="text-md font-small text-black dark:text-white">
						{recipeDescription}
					</p>
				</div>
			</section>

			<div class="flex justify-end items-end gap-4">
				<a
					use:melt={$close}
					href="/recipe/{recipeID}"
					class="inline-flex h-8 items-center justify-center rounded-sm
                    px-4 font-medium leading-none dark:text-white text-black border-2 border-emerald-500 bg-emerald-100 hover:bg-emerald-300 dark:bg-emerald-700 dark:hover:bg-emerald-900">
					View Recipe
				</a>
				<button
					use:melt={$close}
					class="inline-flex h-8 items-center justify-center rounded-sm
                      px-4 font-medium leading-none dark:text-white text-black hover:bg-red-400 bg-red-300 border-2 border-red-500">
					<X />
				</button>
			</div>
		</div>
	{/if}
</div>
