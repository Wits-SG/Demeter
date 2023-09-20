import { turso_client } from '$lib/turso';
import { json, error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export const DELETE = async (event: RequestEvent) => {
	try {
		const { cookbook_id } = await event.request.json();

		// // Check if the recipe exists in the specified cookbook
		// const cookbookExists = await turso_client.execute({
		// 	sql: 'SELECT * FROM cookbook_recipes WHERE cookbook_id = ?',
		// 	args: [cookbook_id]
		// });

		// if (cookbookExists.rows.length === 0) {
		// 	return {
		// 		status: 404, // Recipe not found in the cookbook
		// 		body: { message: 'Recipe not found in the specified cookbook.' }
		// 	};
		// }

		//Query to database to delete cookbook_id
		const deleteRecipe = await turso_client.execute({
			sql: 'delete from cookbook_recipes where cookbook_id = ?',
			args: [cookbook_id]
		});

		const deleteCookBook = await turso_client.execute({
			sql: 'DELETE FROM cookbooks where cookbook_id=?',
			args: [cookbook_id]
		});
		return new Response('Success');
	} catch (e: any) {
		console.log(e);
		throw error(400, 'Error deleting cookbook');
	}
};
