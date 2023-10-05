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

	const cookbookRes = await turso_client.execute({
		sql: 'select name from cookbooks where cookbook_id = ?',
		args: [params.cookbook_id]
	});
	//console.log(cookbookRes.rows[0]);

	const recipes: Array<Recipe> = [];
	for (let row of recipe_name.rows) {
		recipes.push({
			id: row['recipe_id'],
			name: row['name']
		} as Recipe);
	}
	//console.log('Recipes', recipes);

	return {
		cookbook_info: {
			id: params.cookbook_id,
			name: cookbookRes.rows[0]['name']
		},

		recipes: recipes
	};
}) satisfies PageServerLoad;
