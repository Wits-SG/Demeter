<script lang="ts">
	import picture from '$lib/assets/images/penne-alla-vodka.jpg';
	import picture2 from '$lib/assets/images/pavs.jpg';
	import logo from '$lib/assets/images/logo.png';
	import { Icon } from 'flowbite-svelte-icons';
	import { createAccordion, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	export let recipeID: string = '';

	let smallRecipeData: any;

	const getSmallRecipeData = async () => {
		try {
			const smallRecipe_res = await fetch(`/api/small_recipe?recipe_id=${recipeID}`, {
				method: 'GET'
			});

			const recipe_data: JSON = await smallRecipe_res.json();
			//console.log(recipe_data);
			return recipe_data;
		} catch (recipePreview_err: any) {
			console.log('error occured in fetch');
		}
	};
	let recipeTitle = 'NONE';
	let recipeImageURL = 'NONE';
	let Description = 'NONE';
	let recipeCookingTime = 'NONE';
	let recipeServingSize = 'NONE';
	let recipeIngredients = 'NONE';
	let recipeInstructions = 'NONE';
	$: recipeID && refreshRecipe();

	const refreshRecipe = async () => {
		smallRecipeData = await getSmallRecipeData();
		recipeTitle = smallRecipeData.recipe.name;
		Description = smallRecipeData.recipe.description;
		recipeImageURL = smallRecipeData.recipe.imageURL;
		recipeCookingTime = smallRecipeData.recipe.cookingTime;
		recipeServingSize = smallRecipeData.recipe.servingSize;
		recipeIngredients = smallRecipeData.recipe.ingredients;
		recipeInstructions = smallRecipeData.recipe.instructions;
	};

	const {
		elements: { content, item, trigger, root },
		helpers: { isSelected }
	} = createAccordion({
		defaultValue: ['Description'],
		multiple: true
	});
	import { createSeparator, type CreateSeparatorProps } from '@melt-ui/svelte';

	export let orientation: CreateSeparatorProps['orientation'] = 'vertical';

	const {
		elements: { root: vertical }
	} = createSeparator({
		orientation
	});

	let items: any;
	$: items = [
		{
			id: 'description',
			title: 'DESCRIPTION',
			description: Description
		},
		{
			id: 'ingredients',
			title: 'INGREDIENTS',
			description: recipeIngredients
		}
	];
</script>

<!-- Contains the recipe name, ingredients, description, time and serving size -->
<div class="flex flex-row h-full w-full">
	<div class="flex flex-col w-1/2">
		<div class="grid grid-cols-3 w-full h-1/5 items-center">
			<!-- This will contain the picture and the name of the recipe -->
			<div class="container md:mx-auto w-2/3">
				<img alt="" src={recipeImageURL} class="object-cover" />
			</div>
			<h1 class="text-5xl font-serif col-span-2">{recipeTitle}</h1>
		</div>

		<div class="flex flex-col h-4/5 w-full overflow-hidden">
			<div class="flex flex-col h-4/5 w-full justify-center gap-5 overflow-hidden">
				<!-- this will contain the description and the ingredients -->
				<div class="w-4/5 mx-auto max-w-full rounded-xl bg-white shadow-lg {root}">
					{#each items as { id, title, description }, i}
						<div
							use:melt={$item(id)}
							class="overflow-hidden transition-colors first:rounded-t-xl
                            last:rounded-b-xl">
							<h2 class="flex">
								<button
									use:melt={$trigger(id)}
									class="flex flex-1 cursor-pointer items-center justify-center
                            bg-emerald-700 px-5 py-5 text-lg leading-none
                            text-white transition-colors hover:bg-emerald-300 focus:!ring-0
                            focus-visible:text-magnum-800
                            i !== 0 && 'border-t border-t-neutral-300">
									{title}
								</button>
							</h2>
							{#if $isSelected(id)}
								<div
									class="content
                            overflow-hidden bg-neutral-100 text-md text-neutral-600"
									use:melt={$content(id)}
									transition:slide>
									<div class="px-5 py-4">
										{#if title == 'INGREDIENTS'}
											<div>
												<ul class="list-disc text-md">
													{#each description as descriptions}
														<li class="box-content">
															{descriptions}
														</li>
													{/each}
												</ul>
											</div>
										{:else}
											{description}
										{/if}
									</div>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
			<div class="flex flex-row h-1/5 gap-20 justify-center">
				<!-- this will contain the serving size and time to cook -->
				<div class="flex flex-row items-center justify-center gap-5">
					<Icon name="users-group-outline" class="h-10 w-10" />
					<p class="">
						{recipeServingSize} Person
					</p>
				</div>
				<div class="flex flex-row items-center justify center gap-5">
					<Icon name="clock-outline" class="h-10 w-10" />
					<p class="">
						~{recipeCookingTime} Mins
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- This contains the instructions for the recipe -->
	<div class="flex flex-col w-1/2 h-full flex-wrap items-center justify-center">
		<div use:melt={$vertical} class="h-full w-[3px] bg-emerald-700" />
		<h1 class="text-3xl font-serif text-center">INSTRUCTIONS</h1>
		<!-- <div class="flex flex-col flex-wrap justify-between"> -->
		<div class="flex flex-col overflow-scroll">
			<ol class="list-decimal list-inside text-md">
				{#each recipeInstructions as instruction}
					<li
						class="ml-5 mt-2 box-content shadow-lg shadow-emerald-500 hover:bg-zinc-500 p-3 border-2 mb-2">
						{instruction}
					</li>
				{/each}
			</ol>
		</div>
		<!-- </div> -->
	</div>
</div>
