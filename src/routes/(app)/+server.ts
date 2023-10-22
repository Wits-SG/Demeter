import { turso_client } from '$lib/turso';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const pageNum = url.searchParams.get('page_num');

	try {
		const postsResult = await turso_client.execute({
			sql: 'SELECT post_id, type FROM posts WHERE post_id NOT IN ( SELECT post_id FROM posts ORDER BY upload_date LIMIT ? ) ORDER BY upload_date LIMIT 5',
			args: [pageNum]
		});

		let postsList: Array<{ id: string; type: number }> = [];

		for (let row of postsResult.rows) {
			if (row['post_id'] != null) {
				postsList.push({ id: row['post_id'] as string, type: row['type'] as number });
			}
		}

		return json({
			posts: postsList
		});
	} catch (e) {
		console.error(e);
	}
};
