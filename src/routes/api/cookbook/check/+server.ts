// Import necessary dependencies
import { turso_client } from '$lib/turso';
import type { RequestEvent } from './$types';

export const POST = async (event: RequestEvent) => {
	try {
		const { recipeId, cookbookId } = await event.request.json();

		// Query the database to check if the recipe exists in the specified cookbook
		const checkRecipeQuery = await turso_client.execute({
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
