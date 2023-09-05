import { turso_client } from '$lib/turso';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const recipe_res = await turso_client.execute({
		sql: 'select recipe_id from cookbook_recipes where cookbook_id = ?',
		args: [params.cookbook_id]
	});
	const recipesIDs: Array<string> = [];
	for (let row of recipe_res.rows) {
		recipesIDs.push(row['recipe_id'] as string);
	}

	const recipe_name = await turso_client.execute({
		sql: 'select recipes.* from cookbook_recipes join recipes on cookbook_recipes.recipe_id = recipes.recipe_id where cookbook_recipes.cookbook_id = ?',
		args: [params.cookbook_id]
	});

	const recipes: Array<Recipe> = [];
	for (let row of recipe_name.rows) {
		recipes.push({
			id: row['recipe_id'],
			name: row['name'],
			description: row['description'],
			servingSize: row['serving_size'],
			cookingTime: row['cooking_time'],
			imageUrl: row['image_url']
		} as Recipe);
	}
	console.log('Recipes', recipes);

	return {
		recipes: recipes
	};
}) satisfies PageServerLoad;
