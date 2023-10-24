import type { RequestEvent } from './$types';
import { tursoClient } from '$lib/server/turso';

export const POST = async (event: RequestEvent) => {
	const body = await event.request.json();
	console.log(body.url);

	const pictureInsertResult = await tursoClient.execute({
		sql: 'INSERT INTO pictures(picture_id, post_id, url, title, description) VALUES(?, ?, ?, ?, ?)',
		args: [body.id, body.postId, body.url, body.title, body.description]
	});

	const uploadDate = Math.floor(Date.now() / 1000);
	const postInsertResult = await tursoClient.execute({
		//type id for picture is 1 -- last value
		sql: 'INSERT INTO posts(post_id, user_id, upload_date, likes, type) VALUES(?, ?, ?, 0, 1)',
		args: [body.postId, body.userId, uploadDate]
	});

	return new Response('Successful');
};
