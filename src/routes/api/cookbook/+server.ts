import { turso_client } from '$lib/turso';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

/**
 * @description Create a new cookbook for a user
 */
export const POST = async (event: RequestEvent) => {
	const addCookbook: { cookbookID: string; name: string } = await event.request.json();

	const insertCookbook = await turso_client.execute({
		sql: 'INSERT INTO cookbooks (cookbook_id, name) values (?,?)',
		args: [addCookbook.cookbookID, addCookbook.name]
	});

	return new Response('Successful');
};

/**
 * @description Remove a cookbook from a users account
 */
export const DELETE = async (event: RequestEvent) => {
	try {
		const { cookbook_id } = await event.request.json();

		//Query to database to delete cookbook_id
		const deleteRecipe = await turso_client.execute({
			sql: 'delete from cookbook_recipes where cookbook_id = ?',
			args: [cookbook_id]
		});

		const deleteCookBook = await turso_client.execute({
			sql: 'DELETE FROM cookbooks where cookbook_id = ?',
			args: [cookbook_id]
		});
		return new Response('Success');
	} catch (e: any) {
		throw error(400, 'Error deleting cookbook');
	}
};
