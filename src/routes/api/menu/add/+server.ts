import { turso_client } from '$lib/turso';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

// POST - Creating a new Menu -> add to database

export const POST = async (event: RequestEvent) => {
	const menu: Menu = await event.request.json();
};
