import { turso_client } from '$lib/turso';
import type { RequestEvent } from './$types';

///** @type {import('./$types').RequestHandler} */

export const POST = async (event: RequestEvent) => {
	const { recipeID } = await event.request.json();
	try {
		const recipe_res = await turso_client.execute({
			sql: 'select name, description from recipes where recipe_id = ?',
			args: [recipeID]
		});
		const recipeInfo = [
			String(recipe_res.rows[0]['name']),
			String(recipe_res.rows[0]['description'])
		];
		const blob = new Blob(recipeInfo);
		return new Response(blob);
	} catch (e) {
		console.log('yo im in here');
		console.error(e);
	}
};
