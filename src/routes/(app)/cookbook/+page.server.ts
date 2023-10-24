import type { PageServerLoad } from './[cookbook_id]/$types';
import { tursoClient } from '$lib/server/turso';
import { redirect, error } from '@sveltejs/kit';

export const load = (async ({ params, locals }) => {
	//Cookbook IDs
	const session = await locals.auth.validate();

	if (session) {
		try {
			//CookBooks
			const cookbook_res = await tursoClient.execute({
				sql: 'select * from cookbooks where user_id=?',
				args: [session.user.userId]
			});
			const cookbooks: Array<Cookbook> = [];
			for (let row of cookbook_res.rows) {
				cookbooks.push({
					id: row['cookbook_id'],
					name: row['name'],
					userID: row['user_id']
				} as Cookbook);
			}

			//Menus
			const menu_res = await tursoClient.execute({
				sql: 'select * from menus where user_id =?',
				args: [session.user.userId]
			});

			const menus: Array<Menu> = [];
			for (let row of menu_res.rows) {
				menus.push({
					menuID: row['menu_id'],
					name: row['name']
				} as Menu);
			}

			//console.log(cookbooks);
			return {
				userID: session.user.userId,
				cookbooks: cookbooks,
				menus: menus
			};
		} catch (e: any) {
			console.error(e);
			throw error(400, 'failed to fetch cookbooks and menus');
		}
	} else {
		throw redirect(302, '/login/');
	}
}) satisfies PageServerLoad;
