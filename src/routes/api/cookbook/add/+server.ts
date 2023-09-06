import { turso_client } from '$lib/turso';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

// GET - Fetch all the cookbooks for a user
// POST - Add the specified recipe to the specified cookbook

export const GET = async () => {
	try {
		const cookbook_res = await turso_client.execute('select cookbook_id, name from cookbooks');

		const cookbooks: Array<{ name: string; cookbook_id: string }> = [];
		for (let row of cookbook_res.rows) {
			cookbooks.push({
				name: row['name'],
				cookbook_id: row['cookbook_id']
			});
		}

		return json(cookbooks);
	} catch (e) {
		console.error(e);
	}
};

export const POST = async (event: RequestEvent) => {
	const addedRecipe: { recipeId: string; cookbookId: string } = await event.request.json();

	return new Response('Successful');
};
