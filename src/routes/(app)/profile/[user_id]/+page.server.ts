import type { Actions, PageServerLoad } from './$types';
import type { User } from '$lib/types/user.type';
import { tursoClient } from '$lib/server/turso';
import { fail, error, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

export const load = (async ({ locals, params }) => {
	const session = await locals.auth.validate();

	let loggedIn = false;
	if (session && session.user.userId == params.user_id) {
		loggedIn = true;
	}

	try {
		const userResult = await tursoClient.execute({
			sql: 'SELECT * FROM users JOIN user_pronouns ON users.pronoun_id = user_pronouns.id WHERE users.id = ? LIMIT 1',
			args: [params.user_id]
		});

		const userPostsResult = await tursoClient.execute({
			sql: 'SELECT id, type FROM posts WHERE user_id = ? ORDER BY upload_date LIMIT 10',
			args: [params.user_id]
		});

		let postsList: Array<{ id: string; type: number }> = [];
		for (let row of userPostsResult.rows) {
			if (row['id'] != null) {
				postsList.push({ id: row['id'] as string, type: row['type'] as number });
			}
		}

		return {
			isLoggedIn: loggedIn,
			posts: postsList,
			user: {
				userId: params.user_id,
				pronouns: userResult.rows[0]['pronouns'],
				pictureUrl: userResult.rows[0]['image_url'],
				userName: userResult.rows[0]['username'],
				displayName: userResult.rows[0]['display_name'],
				biography: userResult.rows[0]['biography']
			} as User
		};
	} catch (e: any) {
		console.error(e);
		throw error(404, 'User not found');
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);

		throw redirect(302, '/');
	}
};
