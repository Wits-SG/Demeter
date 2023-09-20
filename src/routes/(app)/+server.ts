import { turso_client } from '$lib/turso';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const pageNum = url.searchParams.get('page_num');

	try {
		const recipesResult = await turso_client.execute({
			sql: 'SELECT recipe_id FROM recipes WHERE recipe_id NOT IN ( SELECT recipe_id FROM recipes ASC LIMIT ? ) LIMIT 5',
			args: [pageNum]
		});

		let recipesList: Array<string> = [];

		for (let row of recipesResult.rows) {
			if (row['recipe_id'] != null) {
				recipesList.push(row['recipe_id'] as string);
			}
		}

		return json({
			recipes: recipesList
		});
	} catch (e) {
		console.error(e);
	}
};
