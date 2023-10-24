import { tursoClient } from '$lib/server/turso';
import { error, json } from '@sveltejs/kit';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import type { RequestEvent } from './$types';

/**
 * @description Add a new menu to a user
 */
export const POST = async (event: RequestEvent) => {
	const menu: Menu = await event.request.json();

	try {
		menu.menuID = uuidv4();
		await tursoClient.execute({
			sql: 'insert into menus(menu_id, user_id, name) values (?, ?, ?)',
			args: [menu.menuID, menu.userID !== undefined ? menu.userID : '', menu['name']]
		});

		for (let section of menu.sections) {
			await tursoClient.execute({
				sql: 'insert into menu_sections(section_id, menu_id, name) values(?,?,?)',
				args: [menu.sections.indexOf(section), menu.menuID, section]
			});
		}
	} catch (e: any) {
		return error(500, 'Failed to create a new menu');
	}

	return new Response('Successful');
};

export const DELETE = async (event: RequestEvent) => {
	try {
		const { menu_id } = await event.request.json();

		// Query to database to delete menu_id
		const deleteMenu = await turso_client.execute({
			sql: 'delete from menus where menu_id = ?',
			args: [menu_id]
		});
		return new Response('Success');
	} catch (e: any) {
		throw error(400, 'Error deleting Menu!');
	}
};

/**
 * @description Fetch a list of all recipes for a user
 */
export const GET = async (event: RequestEvent) => {
	try {
		const recipeResult = await turso_client.execute('select recipe_id, name from recipes');
		const returnedRecipes = [];

		for (let row of recipeResult.rows) {
			returnedRecipes.push({
				recipe_id: row['recipe_id'],
				name: row['name']
			});
		}

		return json(returnedRecipes);
	} catch (e: any) {
		throw error(500, 'Failed to fetch cookbooks');
	}
};
