import { turso_client } from '$lib/turso';
import type { RequestEvent } from './$types';

export const DELETE = async (event: RequestEvent) => {
	try {
		const { recipeId, cookbook_id } = await event.request.json();

		// Check if the recipe exists in the specified cookbook
		const recipeExists = await turso_client.execute({
			sql: 'SELECT * FROM cookbook_recipes WHERE cookbook_id = ? AND recipe_id = ?',
			args: [cookbook_id, recipeId]
		});

		if (recipeExists.rows.length === 0) {
			return {
				status: 404, // Recipe not found in the cookbook
				body: { message: 'Recipe not found in the specified cookbook.' }
			};
		}

		//Query to database to delete recipe_id from specific cookbook_id
		const deleteRecipe = await turso_client.execute({
			sql: 'delete from cookbook_recipes where cookbook_id = ? and recipe_id = ?',
			args: [cookbook_id, recipeId]
		});
	} catch (error) {
		console.log(error);
		return new Response('Error deleting recipe', { status: 500 });
	}
};
