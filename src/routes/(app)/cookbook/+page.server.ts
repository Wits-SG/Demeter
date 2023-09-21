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

	//Menus
	const menu_res = await turso_client.execute('select * from menus');

	const menus: Array<Menu> = [];
	for (let row of menu_res.rows) {
		menus.push({
			name: row['name']
		} as Menu);
	}

	console.log(cookbooks);
	return {
		cookbooks: cookbooks,
		menus: menus
	};
}) satisfies PageServerLoad;
