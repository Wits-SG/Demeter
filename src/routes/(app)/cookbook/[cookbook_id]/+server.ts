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

export const POST = async (event: RequestEvent) => {
	try {
		const { cookbookId } = await event.request.json();

		// Query the database to check if the recipe exists in the specified cookbook
		const checkRecipeQuery = await turso_client.execute({
			sql: 'SELECT * FROM cookbook_recipes WHERE cookbook_id = ?',
			args: [cookbookId]
		});

		if (checkRecipeQuery.rows.length > 0) {
			// Recipe exists in the cookbook
			return new Response(JSON.stringify({ exists: true }), {
				headers: { 'Content-Type': 'application/json' }
			});
		} else {
			// Recipe does not exist in the cookbook
			return new Response(JSON.stringify({ exists: false }), {
				headers: { 'Content-Type': 'application/json' }
			});
		}
	} catch (error) {
		console.error(error);
		return new Response('Error checking recipe existence', { status: 500 });
	}
};
