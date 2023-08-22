<script lang="ts">
	import picture from '$lib/assets/images/penne-alla-vodka.jpg';
	import picture2 from '$lib/assets/images/pavs.jpg';
	import logo from '$lib/assets/images/logo.png';
	import { Icon } from 'flowbite-svelte-icons';
	import { createAccordion, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';

	const {
		elements: { content, item, trigger, root },
		helpers: { isSelected }
	} = createAccordion({
		defaultValue: 'Description',
		multiple: true
	});
	import { createSeparator, type CreateSeparatorProps } from '@melt-ui/svelte';

	export let orientation: CreateSeparatorProps['orientation'] = 'vertical';

	const {
		elements: { root: vertical }
	} = createSeparator({
		orientation
	});

	let recipeName = 'Penne Alla Vodka';
	let recipeDescription =
		"Penne alla Vodka is a classic Italian-American pasta dish known for its creamy tomato-based sauce with a touch of vodka. This indulgent recipe combines the richness of a velvety sauce with the bite of penne pasta, creating a comforting and flavorful dish that's perfect for a cozy dinner.";
	let servingSize = 4;
	let cookingTime = 30;
	let skillLevel = 'Intermediate';

	let ingredients = [
		'16 oz (450g) penne pasta',
		'2 tablespoons olive oil',
		'1 small onion, finely chopped',
		'3 cloves garlic, minced',
		'1/2 teaspoon red pepper flakes (adjust to taste)',
		'1 cup tomato puree or crushed tomatoes',
		'1/4 cup vodka',
		'1/2 cup heavy cream',
		'1/4 cup grated Parmesan cheese',
		'Salt and pepper, to taste',
		'Fresh basil or parsley, chopped (for garnish)'
	];

	let instructions = [
		'Cook the Pasta: Bring a large pot of salted water to a boil. Add the penne pasta and cook according to the package instructions until al dente. Drain the pasta and set aside.',
		'Prepare the Sauce: In a large skillet, heat the olive oil over medium heat. Add the chopped onion and sauté until it becomes translucent, about 3-4 minutes. Stir in the minced garlic and red pepper flakes, cooking for another 1 minute until fragrant.',
		'Add Tomatoes and Vodka: Pour in the tomato puree or crushed tomatoes, and stir well to combine with the onion and garlic mixture. Let the sauce simmer for about 5 minutes, allowing the flavors to meld. Add the vodka to the sauce and let it cook for an additional 3-4 minutes, allowing the alcohol to evaporate.',
		'Create the Creamy Base: Reduce the heat to low and slowly pour in the heavy cream, stirring constantly to combine. Allow the sauce to gently simmer for about 5-7 minutes until it thickens slightly.',
		'Combine Pasta and Sauce: Add the cooked penne pasta to the skillet with the sauce. Toss the pasta to coat it evenly with the creamy vodka sauce.',
		'Finish the Dish: Stir in the grated Parmesan cheese, letting it melt into the sauce and thicken it further. Season with salt and pepper to taste.',
		'Serve: Divide the Penne alla Vodka among serving plates. Garnish with chopped fresh basil or parsley to add a burst of color and freshness.'
	];

	const items = [
		{
			id: 'description',
			title: 'DESCRIPTION',
			description: recipeDescription
		},
		{
			id: 'ingredients',
			title: 'INGREDIENTS',
			description: ingredients
		}
	];
</script>

<!-- Contains the recipe name, ingredients, description, time and serving size -->
<div class="flex flex-row h-full w-full flex-wrap">
	<div class="flex flex-col h-full w-1/2">
		<div class="grid grid-cols-3 w-full h-1/5 items-center">
			<!-- This will contain the picture and the name of the recipe -->
			<div class="container md:mx-auto w-2/3">
				<img alt="" src={picture2} class="object-cover" />
			</div>
			<h1 class="text-5xl font-serif col-span-2">{recipeName}</h1>
		</div>
		<div class="flex flex-col h-4/5 w-full">
			<div class="flex flex-col h-4/5 w-full justify-center">
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
                            bg-emerald-700 px-5 py-5 text-4xl leading-none
                            text-white transition-colors hover:bg-emerald-300 focus:!ring-0
                            focus-visible:text-magnum-800
                            i !== 0 && 'border-t border-t-neutral-300">
									{title}
								</button>
							</h2>
							{#if $isSelected(id)}
								<div
									class="content
                            overflow-hidden bg-neutral-100 text-2xl text-neutral-600"
									use:melt={$content(id)}
									transition:slide>
									<div class="px-5 py-4">
										{description}
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
					<Icon name="users-group-outline" class="h-20 w-20" />
					<p class="">
						{servingSize} Person
					</p>
				</div>
				<div class="flex flex-row items-center justify center gap-5">
					<Icon name="clock-outline" class="h-20 w-20" />
					<p class="">
						~{cookingTime} Mins
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- This contains the instructions for the recipe -->
	<div class="flex flex-col w-1/2 h-full flex-wrap items-center">
		<div use:melt={$vertical} class="h-full w-[3px] bg-emerald-700" />
		<h1 class="mt-5 text-5xl font-serif text-center">INSTRUCTIONS</h1>

		<ol class="list-decimal list-inside text-lg">
			{#each instructions as instruction}
				<li
					class=" mt-5 ml-20 box-content w-4/5 center shadow-lg shadow-emerald-500 hover:bg-zinc-500 p-3 border-4 mb-6">
					{instruction}
				</li>
			{/each}
		</ol>
	</div>
</div>
