<script lang="ts">
	import picture from '$lib/assests/pictures/penne-alla-vodka.jpg';
	import logo from '$lib/assests/pictures/logo.png';
	import { Icon } from 'flowbite-svelte-icons';

	let recipeName = 'Penne Alla Vodka';
	let recipeDescription =
		'A classic Italian-American pasta dish known for its creamy tomato-based sauce with a touch of vodka.';
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
		'7. Serve: Divide the Penne alla Vodka among serving plates. Garnish with chopped fresh basil or parsley to add a burst of color and freshness.'
	];
</script>

<div class="w-screen h-screen bg-zinc-100 flex-col items-center justify-center">
	<div class="green-bar bg-emerald-500 flex items-center justify-start">
		<div class="flex justify-start items-start p-20 mx-60">
			<img alt="" src={logo} height="200" width="200" />
		</div>
	</div>

	<div class="bg-zinc-100 flex justify-start items-start p-1">
		<img alt="" class="mx-40 mt-20" src={picture} height="400" width="400" />

		<div class="flex flex-col justify-between items-center mt-20">
			<h1 class="text-6xl font-serif p-4">{recipeName}</h1>
			<h3 class="text-3xl font-serif p-4 underline">Description</h3>
			<p class="text-lg p-4">{recipeDescription}</p>

			<div class="border-2 border-slate-950 rounded-lg p-5 mt-6">
				<div class="grid grid-cols-3 gap-x-40 mt-5">
					<div class="flex flex-col items-center">
						<Icon name="users-group-outline" class="h-10 w-10" />
						<p class="pt-1">
							{servingSize} Person
						</p>
					</div>
					<div class="flex flex-col items-center">
						<Icon name="clock-outline" class="h-10 w-10" />
						<p class="pt-1">
							~{cookingTime} Minutes
						</p>
					</div>
					<div class="flex flex-col items-center">
						<Icon name="arrow-up-down-outline" class="h-10 w-10" />
						<p class="pt-1">
							{skillLevel}
						</p>
					</div>
				</div>
			</div>

			<h3 class="text-3xl font-serif pt-12 underline">Ingredients</h3>
			<ul class="list-disc list-inside text-lg mt-8">
				{#each ingredients as ingredient}
					<li class="p-1">{ingredient}</li>
				{/each}
			</ul>

			<h3 class="text-3xl font-serif pt-12 underline">Instructions</h3>
			<ol class="list-decimal list-inside text-lg mt-10">
				{#each instructions as instruction}
					<li class="p-1">{instruction}</li>
				{/each}
			</ol>
		</div>
	</div>
</div>

<style>
	.green-bar {
		height: 140px;
		width: 100%;
	}
</style>
