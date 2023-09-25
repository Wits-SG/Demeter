import type { PageServerLoad } from './$types';
import type { User } from '$lib/types/user.type';
import { turso_client } from '$lib/turso';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	try {
		const userResult = await turso_client.execute({
			sql: 'SELECT * FROM users JOIN user_pronouns ON users.pronoun_id = user_pronouns.pronoun_id WHERE user_id = ? LIMIT 1',
			args: [params.user_id]
		});

		return {
			user: {
				userId: params.user_id,
				pronouns: userResult.rows[0]['pronouns'],
				pictureUrl: userResult.rows[0]['picture_url'],
				userName: userResult.rows[0]['user_name'],
				displayName: userResult.rows[0]['display_name'],
				biography: userResult.rows[0]['biography']
			} as User
		};
	} catch (e: any) {
		console.log(e);
		throw error(404, 'User not found');
	}
}) satisfies PageServerLoad;
