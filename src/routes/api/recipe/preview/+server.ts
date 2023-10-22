import { tursoClient } from '$lib/server/turso';
import { json, error } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const recipeID = url.searchParams.get('recipe_id');

	try {
		const recipe_res = await tursoClient.execute({
			sql: 'select name, description, image_url from recipes where recipe_id = ?',
			args: [recipeID]
		});

		return json({
			recipe: {
				name: recipe_res.rows[0]['name'],
				description: recipe_res.rows[0]['description'],
				imageURL: recipe_res.rows[0]['image_url']
			}
		});
	} catch (e: any) {
		throw error(500, 'Failed to fetch recipe preview');
	}
};
