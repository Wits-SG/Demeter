import { tursoClient } from '$lib/server/turso';
import { json, error } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const pageNum = url.searchParams.get('page_num');
	const userID = url.searchParams.get('user_id');

	try {
		const postsResult = await tursoClient.execute({
			sql: 'SELECT id, type FROM posts WHERE user_id = ? AND id NOT IN ( SELECT id FROM posts WHERE user_id = ? ORDER BY upload_date LIMIT ? ) ORDER BY upload_date LIMIT 5',
			args: [userID, userID, pageNum]
		});

		let postsList: Array<{ id: string; type: number }> = [];

		for (let row of postsResult.rows) {
			if (row['post_id'] != null) {
				postsList.push({ id: row['id'] as string, type: row['type'] as number });
			}
		}

		return json({
			posts: postsList
		});
	} catch (e) {
		console.error(e);
		throw error(500, 'Failed to fetch posts');
	}
};
