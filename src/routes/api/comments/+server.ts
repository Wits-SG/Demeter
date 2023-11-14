import { tursoClient } from '$lib/server/turso';
import { error, json } from '@sveltejs/kit';

// Fetch the comments information
export const GET = async ({ url }) => {
	const commentId = Number(url.searchParams.get('comment_id'));

	try {
		const commentRes = await tursoClient.execute({
			sql: 'SELECT user_id, content FROM comments WHERE comment_id = ? LIMIT 1',
			args: [commentId]
		});
		const userId = commentRes.rows[0]['user_id'];
		const content = commentRes.rows[0]['content'];

		const commentChildrenRes = await tursoClient.execute({
			sql: 'SELECT comment_id FROM comments WHERE parent_id = ?',
			args: [commentId]
		});

		let children: Array<number> = [];
		for (let child of commentChildrenRes.rows) {
			children.push(child['comment_id'] as number);
		}

		const userRes = await tursoClient.execute({
			sql: 'SELECT display_name FROM users WHERE id = ? LIMIT 1',
			args: [userId]
		});
		let displayName;
		if (userRes.rows.length != 0) {
			displayName = userRes.rows[0]['display_name'];
		} else {
			displayName = 'No User';
		}

		return json({
			userId,
			displayName,
			content,
			children
		});
	} catch {
		throw error(400, 'Failed to fetch comments');
	}
};

// Upload a new comment
export const POST = async ({ request }) => {
	try {
		const data = await request.json();

		await tursoClient.execute({
			sql: 'INSERT INTO comments (post_id, user_id, parent_id, content, root) VALUES (?, ?, ?, ?, ?)',
			args: [data.postId, data.userId, data.parentId, data.content, data.root]
		});

		const result = await tursoClient.execute(
			'SELECT MAX(comment_id) as last_id FROM comments LIMIT 1'
		);
		const newCommentId = result.rows[0]['last_id'];

		return json({
			commentId: newCommentId
		});
	} catch {
		throw error(400, 'Failed to insert new comment');
	}
};
