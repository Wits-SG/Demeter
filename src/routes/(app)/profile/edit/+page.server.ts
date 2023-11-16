import type { PageServerLoad } from './$types';
import { tursoClient } from '$lib/server/turso';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();

	if (session) {
		const userResult = await tursoClient.execute({
			sql: 'SELECT * FROM users WHERE id = ? LIMIT 1',
			args: [session.user.userId]
		});

		const pronounsRes = await tursoClient.execute(
			'SELECT * FROM user_pronouns ORDER BY id ASC'
		);
		let pronouns: Array<string> = [];

		for (let row of pronounsRes.rows) {
			if (row['pronouns'] != null) {
				pronouns.push(row['pronouns'] as string);
			}
		}

		return {
			pronouns,
			user: {
				userId: session.user.userId,
				pronounID: userResult.rows[0]['pronoun_id'],
				pictureUrl: userResult.rows[0]['picture_url'],
				displayName: userResult.rows[0]['display_name'],
				biography: userResult.rows[0]['biography']
			}
		};
	}

	return {
		pronouns: [],
		user: {
			userId: 'none',
			pronouns: 1,
			pictureUrl:
				'https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png',
			userName: 'none',
			displayName: 'none',
			biography: 'none'
		}
	};
}) satisfies PageServerLoad;
