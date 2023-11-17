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
		await tursoClient.execute({
			sql: 'insert into menus(id, user_id, title, description) values (?, ?, ?, ?)',
			args: [
				menu.menuID,
				menu.userID !== undefined ? menu.userID : '',
				menu['name'], //using name not title because of the menu type
				menu['description']
			]
		});

		for (let section of menu.sections) {
			await tursoClient.execute({
				sql: 'insert into menu_sections(menu_id, name) values (?,?,?)',
				args: [menu.menuID, section]
			});
		}
	} catch (e: any) {
		console.error(e);
		throw error(500, 'Failed to create a new menu');
	}

	return new Response('Successful');
};

export const DELETE = async (event: RequestEvent) => {
	try {
		const { menuId } = await event.request.json();

		// Query to database to delete menu_id
		const deleteMenu = await tursoClient.execute({
			sql: 'delete from menus where id = ?',
			args: [menuId]
		});
		return new Response('Success');
	} catch (e: any) {
		throw error(400, 'Error deleting Menu!');
	}
};

export const PUT = async ({ request }) => {
	try {
		const { menuID, name, description } = await request.json();

		await tursoClient.execute({
			sql: 'UPDATE menus SET title = ?, description = ? WHERE id = ?',
			args: [name, description, menuID]
		});

		return new Response('Success');
	} catch (e: any) {
		throw error(500, 'Error updating menu');
	}
};

/**
 * @description Fetch a list of all recipes for a user
 */
export const GET = async ({ url }) => {
	try {
		const cookbookId = url.searchParams.get('cookbook_id');

		const recipeResult = await tursoClient.execute({
			sql: 'SELECT recipes.id, recipes.title FROM recipes JOIN cookbook_recipes ON cookbook_recipes.recipe_id = recipes.id WHERE cookbook_recipes.cookbook_id = ?',
			args: [cookbookId]
		});
		const returnedRecipes = [];

		for (let row of recipeResult.rows) {
			returnedRecipes.push({
				recipe_id: row['id'],
				name: row['title']
			});
		}

		return json(returnedRecipes);
	} catch (e: any) {
		throw error(500, 'Failed to fetch cookbooks');
	}
};
