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

	//Cookbook Name
	// const cookbookName_res = await turso_client.execute({
	// 	sql: 'select * from cookbooks where cookbook_name = ?',
	// 	args: [params.cookbook_id]
	// });

	//console.log(cookbooks);

	return {
		cookbooks: cookbooks
	};
}) satisfies PageServerLoad;
