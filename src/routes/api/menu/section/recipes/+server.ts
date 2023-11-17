import { tursoClient } from '$lib/server/turso';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

/**
 * @description Add a recipe to a section
 */
export const POST = async (event: RequestEvent) => {
	const addedRecipe: { recipeID: string; menuID: string; sectionID: number } =
		await event.request.json();

	try {
		await tursoClient.execute({
			sql: 'insert into menu_recipes(menu_id,recipe_id,  section_id) values(?, ?, ?)',
			args: [addedRecipe.menuID, addedRecipe.recipeID, addedRecipe.sectionID]
		});
	} catch (e: any) {
		console.error(e);
		throw error(500, 'Error inserting recipe into menu');
	}

	return new Response('Successful');
};

/**
 * @description Delete a recipe from a section
 */
export const DELETE = async (event: RequestEvent) => {
	const removedRecipe: { recipeID: string; menuID: string; sectionID: number } =
		await event.request.json();

	try {
		await tursoClient.execute({
			sql: 'delete from menu_recipes where recipe_id = ? and menu_id = ? and section_id =?',
			args: [removedRecipe.recipeID, removedRecipe.menuID, removedRecipe.sectionID]
		});

		return new Response('Successful');
	} catch (e: any) {
		console.error(e);
		return error(500, 'Error removing recipe from section');
	}
};
