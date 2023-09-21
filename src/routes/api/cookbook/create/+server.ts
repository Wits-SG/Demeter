import { turso_client } from '$lib/turso';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

//creating a new CookBook
export const POST = async (event: RequestEvent) => {
	const addCookbook: { cookbookID: string; name: string } = await event.request.json();

	const insertCookbook = await turso_client.execute({
		sql: 'INSERT INTO cookbooks (cookbook_id, name, user_id) values(?,?, ?)',
		args: [addCookbook.cookbookID, addCookbook.name]
	});

	return new Response('Successful');
};

//Checking if a cookbook name already exists
