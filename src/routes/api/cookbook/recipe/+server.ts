import { tursoClient } from '$lib/server/turso';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

/**
 * @description Add a recipe to a cookbook
 */
export const POST = async (event: RequestEvent) => {
	const addedRecipe: { recipeId: string; cookbookId: string } = await event.request.json();

	try {
		await tursoClient.execute({
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
		await tursoClient.execute({
			sql: 'delete from cookbook_recipes where recipe_id = ? and cookbook_id = ?',
			args: [removedRecipe.recipeId, removedRecipe.cookbookId]
		});

		return new Response('Successful');
	} catch (e: any) {
		return error(500, 'Error removing recipe from cookbook');
	}
};

/**
 * @description Get recipe from cookbook and return recipe_id
 */

export const GET = async ({ url }) => {
	const cookbookID = url.searchParams.get('cookbook_id');

	try {
		const recipeRes = await tursoClient.execute({
			sql: 'select recipe_id from cookbook_recipe where cookbook_id=?',
			args: [cookbookID]
		});

		const recipeIDs = [];
		for (let row of recipeRes.rows) {
			recipeIDs.push(row['recipe_id']);
		}
		return json({
			recipeIDs
		});
	} catch (e: any) {
		throw error(500, 'Failed to fetch recipe preview');
	}
};
