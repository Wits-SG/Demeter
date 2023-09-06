import { turso_client } from '$lib/turso';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const recipeID = url.searchParams.get('recipe_id');

	try {
		const cookbook_res = await turso_client.execute('select * from cookbooks');

		const cookbooks_names = [];
		for (let row of cookbook_res.rows) {
			cookbooks_names.push(row['cookbook_name']);
		}

		const cookbooks_ids = [];
		for (let row of cookbook_res.rows) {
			cookbooks_ids.push(row['cookbook_id']);
		}

		return json({
			cookbooks: {
				name: cookbooks_names,
				ids: cookbooks_ids
			}
		});
	} catch (e) {
		console.error(e);
	}
};
