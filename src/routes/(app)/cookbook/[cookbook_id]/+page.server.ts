import { tursoClient } from '$lib/server/turso';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const recipeRes = await tursoClient.execute({
		sql: 'select recipe_id from cookbook_recipes where cookbook_id = ?',
		args: [params.cookbook_id]
	});
	const recipesIDs: Array<string> = [];
	for (let row of recipeRes.rows) {
		recipesIDs.push(row['recipe_id'] as string);
	}

	const recipeName = await tursoClient.execute({
		sql: 'select recipes.* from cookbook_recipes join recipes on cookbook_recipes.recipe_id = recipes.id where cookbook_recipes.cookbook_id = ?',
		args: [params.cookbook_id]
	});

	const cookbookRes = await tursoClient.execute({
		sql: 'select title from cookbooks where id = ?',
		args: [params.cookbook_id]
	});

	const recipes: Array<Recipe> = [];
	for (let row of recipeName.rows) {
		recipes.push({
			id: row['id'],
			name: row['title']
		} as Recipe);
	}

	return {
		cookbookInfo: {
			id: params.cookbook_id,
			name: cookbookRes.rows[0]['title']
		},

		recipes: recipes
	};
}) satisfies PageServerLoad;
