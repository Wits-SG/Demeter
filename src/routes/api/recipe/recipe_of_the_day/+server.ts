import { turso_client } from '$lib/turso';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export const GET = async (event: RequestEvent) => {
	try {
		const recipeResult = await turso_client.execute(
			'SELECT * FROM recipes ORDER BY RANDOM() LIMIT 1'
		);

		if (recipeResult.rows.length > 0) {
			const randomRecipe = recipeResult.rows[0];

			return json({
				recipe: {
					id: randomRecipe['recipe_id'],
					name: randomRecipe['name'],
					description: randomRecipe['description'],
					servingSize: randomRecipe['serving_size'],
					cookingTime: randomRecipe['cooking_time'],
					skillLevelId: randomRecipe['skill_level_id'],
					imageUrl: randomRecipe['image_url']
				}
			});
		} else {
			throw error(404, 'No recipes found');
		}
	} catch (e: any) {
		throw error(500, 'Failed to fetch recipe');
	}
};
