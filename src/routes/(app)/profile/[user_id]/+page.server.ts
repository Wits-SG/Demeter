import type { PageServerLoad } from './$types';
import type { User } from '$lib/types/user.type';
import { tursoClient } from '$lib/server/turso';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	try {
		const userResult = await tursoClient.execute({
			sql: 'SELECT * FROM users JOIN user_pronouns ON users.pronoun_id = user_pronouns.pronoun_id WHERE id = ? LIMIT 1',
			args: [params.user_id]
		});

		return {
			user: {
				userId: params.user_id,
				pronouns: userResult.rows[0]['pronouns'],
				pictureUrl: userResult.rows[0]['picture_url'],
				userName: userResult.rows[0]['username'],
				displayName: userResult.rows[0]['display_name'],
				biography: userResult.rows[0]['biography']
			} as User
		};
	} catch (e: any) {
		console.log(e);
		throw error(404, 'User not found');
	}
}) satisfies PageServerLoad;
