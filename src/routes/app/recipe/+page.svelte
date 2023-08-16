<script lang="ts">
	import picture from '$lib/assests/pictures/penne-alla-vodka.jpg';
	import picture2 from '$lib/assests/pictures/pavs.jpg';
	import logo from '$lib/assests/pictures/logo.png';
	import { Icon } from 'flowbite-svelte-icons';

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

	let savedState = 'Save this recipe';

	function toggleSavedState() {
		if (savedState === 'Save this recipe') {
			savedState = 'Saved!';
		} else {
			savedState = 'Save this recipe';
		}
	}
</script>

<div class=" bg-zinc-100 dark:bg-zinc-800 flex flex-col justify-center items-center gap-20">
	<div class="flex flex-row justify start items-start gap-0">
		<section class="flex flex-col items-center w-1/2 gap-5">
			<section class="container md:mx-auto w-2/3">
				<img alt="" src={picture2} class="object-cover" />
			</section>

			<section class="grid grid-cols-2 items-center gap-20">
				<div class="flex flex-col items-center gap-2">
					<Icon name="message-caption-outline" class="h-14 w-14" />
					<button
						class="p-5 bg-emerald-500 rounded-full w-full h-12 text-center text-md flex justify-center items-center hover:bg-emerald-600">
						Write a review
					</button>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Icon name="heart-outline" class="h-14 w-14" />
					<button
						on:click={toggleSavedState}
						class="p-5 bg-emerald-500 rounded-full w-full h-12 text-center text-md flex justify-center items-center hover:bg-emerald-600">
						{savedState}
					</button>
				</div>
			</section>
		</section>

		<div class="flex flex-col items-start gap-10 w-1/2 h-full">
			<section class="flex flex-col items-center gap-10 w-3/4">
				<h1 class="text-6xl font-serif">{recipeName}</h1>
				<h3 class="text-3xl font-serif underline">Description</h3>
				<p class="text-lg">{recipeDescription}</p>

				<!-- *****Using padding need to change***** -->
				<section
					class="border-double border-4 border-zinc-800 dark:border-zinc-100 rounded-lg gap-10 p-2">
					<div class="grid grid-cols-3 items-center justify-center gap-40">
						<div class="flex flex-col items-center justify-center">
							<Icon name="users-group-outline" class="h-14 w-14" />
							<p class="">
								{servingSize} Person
							</p>
						</div>
						<div class="flex flex-col items-center justify center">
							<Icon name="clock-outline" class="h-14 w-14" />
							<p class="">
								~{cookingTime} Mins
							</p>
						</div>
						<div class="flex flex-col items-center justify center">
							<Icon name="arrow-up-down-outline" class="h-14 w-14" />
							<p class="">
								{skillLevel}
							</p>
						</div>
					</div>
				</section>
			</section>

			<section class="flex flex-col items-center gap-10 w-3/4">
				<h3 class="text-3xl font-serif underline">Ingredients</h3>
				<ul class="list-disc list-inside text-lg">
					{#each ingredients as ingredient}
						<li class="mb-2">{ingredient}</li>
					{/each}
				</ul>
			</section>

			<section class="flex flex-col items-center gap-10 w-3/4">
				<h3 class="text-3xl font-serif underline">Instructions</h3>
				<ol class="list-decimal list-inside text-lg">
					{#each instructions as instruction}
						<li
							class="box-content shadow-lg shadow-emerald-500 hover:bg-zinc-500 p-3 border-4 mb-6">
							{instruction}
						</li>
					{/each}
				</ol>
			</section>
		</div>
	</div>
</div>

<style>
</style>
