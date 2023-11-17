import type { LayoutServerLoad } from './$types';
import { tursoClient } from '$lib/server/turso';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (session) {
		try {
			const result = await tursoClient.execute({
				sql: 'SELECT image_url FROM users WHERE id = ?',
				args: [session.user.userId]
			});

			return {
				userId: session.user.userId,
				pictureUrl: result.rows[0]['image_url'] as string,
				userSignedIn: true
			};
		} catch (e: any) {
			console.error(e);
		}
	}

	return {
		userSignedIn: false
	};
};
