import type { PageServerLoad } from './$types';
import { tursoClient } from '$lib/server/turso';

export const load = (async ({ params }) => {
	// Picture Posts

	const pictureRes = await tursoClient.execute({
		sql: 'select * from pictures where id = ?',
		args: [params.picture_id]
	});

	// Post ID
	const postID = pictureRes.rows[0]['post_id'];
	// User ID and Display name
	const postRes = await tursoClient.execute({
		sql: 'select users.id, users.display_name from users join posts on users.id = posts.user_id where posts.id = ?',
		args: [postID]
	});

	return {
		user:
			postRes.rows.length > 0
				? {
						userID: postRes.rows[0]['id'],
						displayName: postRes.rows[0]['display_name']
				  }
				: { error: true },

		picture: {
			//picture_id: params.picture_id,
			url: pictureRes.rows[0]['image_url'],
			title: pictureRes.rows[0]['title'],
			description: pictureRes.rows[0]['description'],
			postId: postID
		} as Picture
	};
}) satisfies PageServerLoad;
