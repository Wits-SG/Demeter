import { turso_client } from '$lib/turso';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

// export const GET = async ({ url }) => {

// }

/**
 * @description Add a new user to the database if they currently don't exist
 */
export const POST = async (event: RequestEvent) => {
	try {
		const data: { userId: string; pictureUrl: string; userName: string } =
			await event.request.json();

		const checkResult = await turso_client.execute({
			sql: 'SELECT * FROM users WHERE user_id = ? LIMIT 1',
			args: [data.userId]
		});

		if (checkResult.rows.length > 0) {
			// If some reconrd with this id exists

			const pronounResult = await turso_client.execute({
				sql: 'SELECT pronouns FROM user_pronouns WHERE pronoun_id = ?',
				args: [checkResult.rows[0]['pronoun_id']]
			});

			return json({
				userId: data.userId,
				pronouns: pronounResult.rows[0]['pronouns'],
				pictureUrl: data.pictureUrl,
				displayName: checkResult.rows[0]['display_name'],
				userName: data.userName,
				biography: checkResult.rows[0]['bio']
			});
		} else {
			await turso_client.execute({
				sql: 'INSERT INTO users (user_id, display_name, picture_url, pronoun_id, user_name) VALUES (?, ?, ?, 1, ?)',
				args: [data.userId, data.userName, data.pictureUrl, data.userId]
			});

			const pronounResult = await turso_client.execute({
				sql: 'SELECT pronouns FROM user_pronouns WHERE pronoun_id = ?',
				args: [checkResult.rows[0]['pronoun_id']]
			});

			return json({
				userId: data.userId,
				pronouns: pronounResult.rows[0]['pronouns'],
				pictureUrl: data.pictureUrl,
				displayName: checkResult.rows[0]['display_name'],
				userName: data.userName,
				biography: checkResult.rows[0]['bio']
			});
		}

		return new Response('Sucessful');
	} catch (e: any) {
		throw error(500, 'Failed to add new user');
	}
};
