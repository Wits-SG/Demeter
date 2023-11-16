import type { PageServerLoad } from './$types';
import { tursoClient } from '$lib/server/turso';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (session) {
		try {
			const cookbooksRes = await tursoClient.execute({
				sql: 'SELECT * FROM cookbooks where user_id = ?',
				args: [session.user.userId]
			});

			const cookbooks: Array<Cookbook> = [];
			for (let row of cookbooksRes.rows) {
				cookbooks.push({
					id: row['id'],
					userID: session.user.userId,
					name: row['title'],
					description: row['description']
				} as Cookbook);
			}

			return {
				cookbooks
			};
		} catch (e: any) {
			console.error(e);
			throw error(400, 'Failed to fetch menus');
		}
	}

	return { cookbooks: [] };
};
