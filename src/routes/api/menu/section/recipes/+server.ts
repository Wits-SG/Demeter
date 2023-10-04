import { turso_client } from '$lib/turso';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

/**
 * @description Add a recipe to a section
 */
export const POST = async (event: RequestEvent) => {
	const addedRecipe: { recipeId: string; menuId: string; sectionID: number } =
		await event.request.json();

	try {
		await turso_client.execute({
			sql: 'insert into menu_recipes(menu_id,recipe_id,  section_id) values(?, ?, ?)',
			args: [addedRecipe.menuId, addedRecipe.recipeId, addedRecipe.sectionID]
		});
	} catch (e: any) {
		return error(500, 'Error inserting recipe into menu');
	}

	return new Response('Successful');
};
