import { turso_client } from '$lib/turso';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const recipeID = url.searchParams.get('recipe_id');

	try {
		const recipe_res = await turso_client.execute({
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
	} catch (e) {
		console.error(e);
	}
};
