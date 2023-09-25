import { turso_client } from '$lib/turso';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import type { User } from '$lib/types/user.type';

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
			return new Response('Account already exists');
		} else {
			await turso_client.execute({
				sql: 'INSERT INTO users (user_id, display_name, picture_url, pronoun_id, user_name) VALUES (?, ?, ?, 1, ?)',
				args: [data.userId, data.userName, data.pictureUrl, data.userId]
			});
		}

		return new Response('Successful');
	} catch (e: any) {
		throw error(500, 'Failed to add new user');
	}
};

/**
 * @description Update a users information
 */
export const PUT = async (event: RequestEvent) => {
	try {
		const data: User = await event.request.json();

		const checkResult = await turso_client.execute({
			sql: 'SELECT * FROM users WHERE user_id = ? LIMIT 1',
			args: [data.userId]
		});

		if (checkResult.rows.length > 0) {
			const pronounRes = await turso_client.execute({
				sql: 'SELECT pronoun_id from user_pronouns WHERE pronoun = ? LIMIT 1',
				args: [data.pronouns]
			});

			await turso_client.execute({
				sql: 'UPDATE users SET pronoun_id = ?, picture_url = ?, display_name = ?, user_name = ?, bio = ? WHERE user_id = ?',
				args: [
					pronounRes.rows[0]['pronoun_id'],
					data.pictureUrl,
					data.displayName,
					data.userName,
					data.biography,
					data.userId
				]
			});
		} else {
			throw error(404, 'Account does not exist');
		}
	} catch (e: any) {}
};
