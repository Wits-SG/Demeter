import { turso_client } from '$lib/turso';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

/**
 * @description Add a recipe to a cookbook
 */
export const POST = async (event: RequestEvent) => {
	const addedRecipe: { recipeId: string; cookbookId: string } = await event.request.json();

	try {
		await turso_client.execute({
			sql: 'insert into cookbook_recipes values(?, ?)',
			args: [addedRecipe.cookbookId, addedRecipe.recipeId]
		});
	} catch (e: any) {
		return error(500, 'Error inserting recipe into cookbook');
	}

	return new Response('Successful');
};

/**
 * @description Remove recipe from a cookbook
 */
export const DELETE = async (event: RequestEvent) => {
	const removedRecipe: { recipeId: string; cookbookId: string } = await event.request.json();

	try {
		await turso_client.execute({
			sql: 'delete from cookbook_recipes where recipe_id = ? and cookbook_id = ?',
			args: [removedRecipe.recipeId, removedRecipe.cookbookId]
		});
	} catch (e: any) {
		return error(500, 'Error removing recipe from cookbook');
	}
};
