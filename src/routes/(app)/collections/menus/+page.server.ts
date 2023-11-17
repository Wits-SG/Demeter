import type { PageServerLoad } from './$types';
import { tursoClient } from '$lib/server/turso';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (session) {
		try {
			const menusRes = await tursoClient.execute({
				sql: 'SELECT * FROM menus where user_id = ?',
				args: [session.user.userId]
			});

			const menus: Array<Menu> = [];
			for (let row of menusRes.rows) {
				menus.push({
					menuID: row['id'],
					name: row['title'],
					description: row['description'],
					sections: [] as Array<String>
				} as Menu);
				const idx = menus.length - 1;

				try {
					const sectionsRes = await tursoClient.execute({
						sql: 'SELECT id, name FROM menu_sections WHERE menu_id = ?',
						args: [row['id']]
					});

					for (let sectionRow of sectionsRes.rows) {
						if (typeof sectionRow['name'] === 'string') {
							menus[idx].sections.push(sectionRow['name']);
						}
					}
				} catch (e: any) {
					console.error(`Failed to find sections for ${row['menu_id']}`);
				}
			}

			return {
				menus
			};
		} catch (e: any) {
			console.error(e);
			throw error(400, 'Failed to fetch menus');
		}
	}

	return { menus: [] };
};
