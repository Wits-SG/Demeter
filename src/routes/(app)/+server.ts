import { tursoClient } from '$lib/server/turso';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const pageNum = url.searchParams.get('page_num');

	try {
		const postsResult = await tursoClient.execute({
			sql: 'SELECT id, type FROM posts WHERE id NOT IN ( SELECT id FROM posts ORDER BY upload_date LIMIT ? ) ORDER BY upload_date LIMIT 5',
			args: [pageNum]
		});

		let postsList: Array<{ id: string; type: number }> = [];

		for (let row of postsResult.rows) {
			if (row['id'] != null) {
				postsList.push({ id: row['id'] as string, type: row['type'] as number });
			}
		}

		return json({
			posts: postsList
		});
	} catch (e) {
		console.error(e);
	}
};
