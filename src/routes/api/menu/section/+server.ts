import { tursoClient } from '$lib/server/turso';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

/**
 * @description Create a new cookbook for a user
 */
export const POST = async (event: RequestEvent) => {
	const addSection: { sectionID: number; menuID: string; name: string } =
		await event.request.json();

	const insertCookbook = await tursoClient.execute({
		sql: 'INSERT INTO menu_sections (section_id, menu_id, name) values (?,?,?)',
		args: [addSection.sectionID, addSection.menuID, addSection.name]
	});

	return new Response('Successful');
};
