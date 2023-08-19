import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		recipe: {
			name: 'Penne Alla Vodka',
			description: `Penne alla Vodka is a classic Italian-American pasta dish known for its creamy tomato-based sauce with a touch of vodka. This indulgent recipe combines the richness of a velvety sauce with the bite of penne pasta, creating a comforting and flavorful dish that's perfect for a cozy dinner.`,
			servingSize: 4,
			cookingTime: 30,
			skillLevel: 'Intermediate',
			instructions: [
				'Cook the Pasta: Bring a large pot of salted water to a boil. Add the penne pasta and cook according to the package instructions until al dente. Drain the pasta and set aside.',
				'Prepare the Sauce: In a large skillet, heat the olive oil over medium heat. Add the chopped onion and sauté until it becomes translucent, about 3-4 minutes. Stir in the minced garlic and red pepper flakes, cooking for another 1 minute until fragrant.',
				'Add Tomatoes and Vodka: Pour in the tomato puree or crushed tomatoes, and stir well to combine with the onion and garlic mixture. Let the sauce simmer for about 5 minutes, allowing the flavors to meld. Add the vodka to the sauce and let it cook for an additional 3-4 minutes, allowing the alcohol to evaporate.',
				'Create the Creamy Base: Reduce the heat to low and slowly pour in the heavy cream, stirring constantly to combine. Allow the sauce to gently simmer for about 5-7 minutes until it thickens slightly.',
				'Combine Pasta and Sauce: Add the cooked penne pasta to the skillet with the sauce. Toss the pasta to coat it evenly with the creamy vodka sauce.',
				'Finish the Dish: Stir in the grated Parmesan cheese, letting it melt into the sauce and thicken it further. Season with salt and pepper to taste.',
				'Serve: Divide the Penne alla Vodka among serving plates. Garnish with chopped fresh basil or parsley to add a burst of color and freshness.'
			],
			ingredients: [
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
			]
		} as Recipe
	};
}) satisfies PageServerLoad;
