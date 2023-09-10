import { turso_client } from '$lib/turso';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export const DELETE = async ({ url }) => {
	const cookbookID = url.searchParams.get('cookbook_id');

	try {
		const deleteCookbook = await turso_client.execute({
			sql: 'DELETE from cookbooks WHERE cookbook_id = ?',
			args: { cookbookID }
		});

		const deleteCookbookRecipe = await turso_client.execute({
			sql: 'DELETE FROM cookbook_recipe WHERE cookbook_id = ?',
			args: { cookbookID }
		});

		return new Response('Successful');
	} catch (e) {
		console.error(e);
	}
};
