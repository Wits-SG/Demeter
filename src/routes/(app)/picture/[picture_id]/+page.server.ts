import type { PageServerLoad } from './$types';
import { tursoClient } from '$lib/server/turso';

export const load = (async ({ params }) => {
	// Picture Posts

	const picture_res = await tursoClient.execute({
		sql: 'select * from pictures where picture_id = ?',
		args: [params.picture_id]
	});

	// Post ID
	const postID = picture_res.rows[0]['post_id'];
	// User ID and Display name
	const post_res = await tursoClient.execute({
		sql: 'select users.id, users.display_name from users join posts on users.id = posts.user_id where posts.post_id = ?',
		args: [postID]
	});

	return {
		user: {
			userID: post_res.rows[0]['id'],
			displayName: post_res.rows[0]['display_name']
		},
		picture: {
			//picture_id: params.picture_id,
			url: picture_res.rows[0]['url'],
			title: picture_res.rows[0]['title'],
			description: picture_res.rows[0]['description'],
			postId: postID
		} as Picture
	};
}) satisfies PageServerLoad;
