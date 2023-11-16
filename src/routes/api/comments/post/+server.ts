import { tursoClient } from '$lib/server/turso.js';
import { json, error } from '@sveltejs/kit';

// Fetch all root comments for a post
export const GET = async ({ url }) => {
	const postId = url.searchParams.get('post_id');

	try {
		// Restricting to only ten comments for now, this'll later have to be converted over to an infinite scroll
		// and pageing system
		const commentsRes = await tursoClient.execute({
			sql: 'SELECT id FROM comments WHERE post_id = ? AND root = 1 LIMIT 10',
			args: [postId]
		});

		const comments: Array<number> = [];
		for (let id of commentsRes.rows) {
			comments.push(id['id'] as number);
		}

		return json(comments);
	} catch (e: any) {
		console.error(e);
		throw error(400, 'Failed to fetch comments');
	}
};
