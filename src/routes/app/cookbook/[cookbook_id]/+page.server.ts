import type { PageServerLoad } from './$types';
import { turso_client } from '$lib/turso';

export const load = (async ({ params }) => {
	//Cookbook IDs
	const cookbook_res = await turso_client.execute({
		sql: 'select * from cookbooks',
		args: [params.cookbook_id]
	});

	// const cookbookIDs = [];
	// for (let row of cookbookID_res.rows) {
	// 	cookbookIDs.push(row['name']);
	// }

	//Cookbook Name
	// const cookbookName_res = await turso_client.execute({
	// 	sql: 'select * from cookbooks where cookbook_name = ?',
	// 	args: [params.cookbook_id]
	// });

	console.log(cookbook_res);

	return {
		cookbook: {
			//id: cookbookID_res.rows[0]['cookbook_id'],
			name: cookbook_res.rows[0]['cookbook_name']
		} as Cookbook
	};
}) satisfies PageServerLoad;
