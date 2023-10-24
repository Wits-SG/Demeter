import { tursoClient } from '$lib/server/turso';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

/**
 * @description Fetch a list of all cookbooks for a user
 */
export const GET = async ({ url }) => {
	const userId = url.searchParams.get('user_id');
	try {
		const cookbooksResult = await tursoClient.execute({
			sql: 'select cookbook_id, name from cookbooks where user_id=?',
			args: [userId]
		});
		const returnedCookbooks = [];

		for (let row of cookbooksResult.rows) {
			returnedCookbooks.push({
				cookbook_id: row['cookbook_id'],
				name: row['name']
			});
		}

		return json(returnedCookbooks);
	} catch (e: any) {
		throw error(500, 'Failed to fetch cookbooks');
	}
};

/**
 * @description Create a new cookbook for a user
 */
export const POST = async (event: RequestEvent) => {
	const addCookbook: { cookbookID: string; name: string } = await event.request.json();

	const insertCookbook = await tursoClient.execute({
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
		const deleteRecipe = await tursoClient.execute({
			sql: 'delete from cookbook_recipes where cookbook_id = ?',
			args: [cookbook_id]
		});

		const deleteCookBook = await tursoClient.execute({
			sql: 'DELETE FROM cookbooks where cookbook_id = ?',
			args: [cookbook_id]
		});
		return new Response('Success');
	} catch (e: any) {
		throw error(400, 'Error deleting cookbook');
	}
};
