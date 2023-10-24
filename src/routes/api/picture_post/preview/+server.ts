import { tursoClient } from '$lib/server/turso';
import { json, error } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const postID = url.searchParams.get('post_id');

	try {
		const picture_res = await tursoClient.execute({
			sql: 'select picture_id, title, description, url from pictures where post_id = ?',
			args: [postID]
		});

		return json({
			picture: {
				pictureID: picture_res.rows[0]['picture_id'],
				name: picture_res.rows[0]['title'],
				description: picture_res.rows[0]['description'],
				imageURL: picture_res.rows[0]['url']
			}
		});
	} catch (e: any) {
		throw error(500, 'Failed to fetch picture preview');
	}
};
