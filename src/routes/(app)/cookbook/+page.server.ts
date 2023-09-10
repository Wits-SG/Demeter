import type { PageServerLoad } from './[cookbook_id]/$types';
import { turso_client } from '$lib/turso';

export const load = (async ({ params }) => {
	//Cookbook IDs
	const cookbook_res = await turso_client.execute('select * from cookbooks');

	const cookbooks: Array<Cookbook> = [];
	for (let row of cookbook_res.rows) {
		cookbooks.push({
			id: row['cookbook_id'],
			name: row['name'],
			userID: row['user_id']
		} as Cookbook);
	}

	console.log(cookbooks);
	return {
		cookbooks: cookbooks
	};
}) satisfies PageServerLoad;
