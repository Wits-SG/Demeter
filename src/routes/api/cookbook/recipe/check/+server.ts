// Import necessary dependencies
import { tursoClient } from '$lib/server/turso';
import type { RequestEvent } from './$types';

/**
 * @description Check if a recipe already exists in a cookbook
 */
export const POST = async (event: RequestEvent) => {
	try {
		const { recipeId, cookbookId } = await event.request.json();

		// Query the database to check if the recipe exists in the specified cookbook
		const checkRecipeQuery = await tursoClient.execute({
			sql: 'SELECT 1 FROM cookbook_recipes WHERE cookbook_id = ? AND recipe_id = ? LIMIT 1',
			args: [cookbookId, recipeId]
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
