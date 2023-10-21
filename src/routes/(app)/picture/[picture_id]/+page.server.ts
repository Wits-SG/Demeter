import type { PageServerLoad } from './$types';
import { turso_client } from '$lib/turso';

export const load = (async ({ params }) => {
	// Picture Posts

	const picture_res = await turso_client.execute({
		sql: 'select * from pictures where picture_id = ?',
		args: [params.picture_id]
	});

	return {
		picture: {
			picture_id: params.picture_id,
			url: picture_res.rows[0]['url'],
			title: picture_res.rows[0]['title'],
			description: picture_res.rows[0]['description']
		} as Picture
	};
}) satisfies PageServerLoad;
