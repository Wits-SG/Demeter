import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { turso_client } from '$lib/turso';

export const POST = async (event: RequestEvent) => {
	const picture: Picture = await event.request.json();

	const pictureInsertResult = await turso_client.execute({
		sql: 'INSERT INTO recipes VALUES(?, ?, ?, ?, ?)',
		args: [picture.id, picture.title, picture.description, picture.imageUrl]
	});

	return new Response('Successful');
};
