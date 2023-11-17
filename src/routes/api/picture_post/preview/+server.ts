import { tursoClient } from '$lib/server/turso';
import { json, error } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const postID = url.searchParams.get('post_id');

	try {
		const pictureRes = await tursoClient.execute({
			sql: 'select id, title, description, image_url from pictures where post_id = ? LIMIT 1',
			args: [postID]
		});

		const postRes = await tursoClient.execute({
			sql: 'SELECT user_id FROM posts WHERE id = ? LIMIT 1',
			args: [postID]
		});

		const userResult = await tursoClient.execute({
			sql: 'SELECT display_name FROM users WHERE id = ? LIMIT 1',
			args: [postRes.rows[0]['user_id']]
		});

		return json({
			picture: {
				pictureID: pictureRes.rows[0]['id'],
				name: pictureRes.rows[0]['title'],
				description: pictureRes.rows[0]['description'],
				imageURL: pictureRes.rows[0]['url']
			},
			user: {
				id: postRes.rows[0]['user_id'],
				displayName: userResult.rows[0]['display_name']
			}
		});
	} catch (e: any) {
		console.error(e);

		throw error(500, 'Failed to fetch picture preview');
	}
};
