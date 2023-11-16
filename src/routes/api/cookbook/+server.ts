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
			sql: 'select id, title from cookbooks where user_id = ?',
			args: [userId]
		});
		const returnedCookbooks = [];

		for (let row of cookbooksResult.rows) {
			returnedCookbooks.push({
				cookbook_id: row['id'],
				name: row['title']
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
	const addCookbook: Cookbook = await event.request.json();

	const insertCookbook = await tursoClient.execute({
		sql: 'INSERT INTO cookbooks (id, title, user_id) values (?,?,?)',
		args: [addCookbook.id, addCookbook.name, addCookbook.userID]
	});

	return new Response('Successful');
};

export const PUT = async ({ request }) => {
	try {
		const { id, name, description } = await request.json();

		await tursoClient.execute({
			sql: 'UPDATE cookbooks SET title = ?, description = ? WHERE id = ?',
			args: [name, description, id]
		});

		return new Response('Success');
	} catch (e: any) {
		throw error(500, 'Failed to update cookbook');
	}
};

/**
 * @description Remove a cookbook from a users account
 */
export const DELETE = async (event: RequestEvent) => {
	try {
		const { cookbookId } = await event.request.json();

		//Query to database to delete cookbook_id
		const deleteRecipe = await tursoClient.execute({
			sql: 'delete from cookbook_recipes where cookbook_id = ?',
			args: [cookbookId]
		});

		const deleteCookBook = await tursoClient.execute({
			sql: 'DELETE FROM cookbooks where id = ?',
			args: [cookbookId]
		});
		return new Response('Success');
	} catch (e: any) {
		throw error(400, 'Error deleting cookbook');
	}
};
