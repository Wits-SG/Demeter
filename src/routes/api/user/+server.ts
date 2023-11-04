import { tursoClient } from '$lib/server/turso';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import type { User } from '$lib/types/user.type';

export const GET = async ({ url }) => {
	try {
		const userId = url.searchParams.get('user_id');

		const result = await tursoClient.execute({
			sql: 'SELECT * FROM users JOIN user_pronouns ON users.pronoun_id = user_pronouns.pronoun_id WHERE id = ?',
			args: [userId]
		});

		console.log(result);

		return json({
			userId: userId,
			pictureUrl: result.rows[0]['picture_url'],
			displayName: result.rows[0]['display_name'],
			userName: result.rows[0]['user_name'],
			biography: result.rows[0]['bio'],
			pronounId: result.rows[0]['pronoun_id']
		});
	} catch (e: any) {
		console.log(e);
		throw error(500, 'Failed to fetch user information');
	}
};

/**
 * @description Add a new user to the database if they currently don't exist
 */
export const POST = async (event: RequestEvent) => {
	try {
		const data: { userId: string; pictureUrl: string; userName: string } =
			await event.request.json();

		const checkResult = await tursoClient.execute({
			sql: 'SELECT * FROM users WHERE user_id = ? LIMIT 1',
			args: [data.userId]
		});

		if (checkResult.rows.length > 0) {
			return new Response('Account already exists');
		} else {
			await tursoClient.execute({
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
		const data: {
			userId: string;
			displayName: string;
			pictureUrl: string;
			biography: string;
			pronounsId: number;
		} = await event.request.json();

		console.log(data);

		await tursoClient.execute({
			sql: 'UPDATE users SET pronoun_id = ?, picture_url = ?, display_name = ?, biography = ? WHERE id = ?',
			args: [data.pronounsId, data.pictureUrl, data.displayName, data.biography, data.userId]
		});

		return new Response('Successful');
	} catch (e: any) {
		console.log(e);
		throw error(500, e);
	}
};
