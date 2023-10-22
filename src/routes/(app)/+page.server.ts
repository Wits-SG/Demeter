import type { PageServerLoad } from './$types';
import { tursoClient } from '$lib/server/turso';

export const load = (async () => {
	const recipesResult = await tursoClient.execute('SELECT recipe_id FROM recipes LIMIT 10');

	let recipesList: Array<string> = [];

	for (let row of recipesResult.rows) {
		if (row['recipe_id'] != null) {
			recipesList.push(row['recipe_id'] as string);
		}
	}

	return {
		recipes: recipesList
	};
}) satisfies PageServerLoad;
