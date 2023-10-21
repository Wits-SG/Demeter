import { turso_client } from '$lib/turso';
import { json, error } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const postID = url.searchParams.get('post_id');

	try {
		const recipe_res = await turso_client.execute({
			sql: 'select recipe_id, name, description, image_url from recipes where post_id = ?',
			args: [postID]
		});

		return json({
			recipe: {
				recipeID: recipe_res.rows[0]['recipe_id'],
				name: recipe_res.rows[0]['name'],
				description: recipe_res.rows[0]['description'],
				imageURL: recipe_res.rows[0]['image_url']
			}
		});
	} catch (e: any) {
		throw error(500, 'Failed to fetch recipe preview');
	}
};
