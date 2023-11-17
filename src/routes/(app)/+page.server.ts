import type { PageServerLoad } from './$types';
import { tursoClient } from '$lib/server/turso';

export const load = (async () => {
	const postsResult = await tursoClient.execute(
		'SELECT id, type FROM posts ORDER BY upload_date LIMIT 10'
	);

	let postsList: Array<{ id: string; type: number }> = [];
	for (let row of postsResult.rows) {
		if (row['id'] != null) {
			postsList.push({ id: row['id'] as string, type: row['type'] as number });
		}
	}

	return {
		posts: postsList
	};
}) satisfies PageServerLoad;
