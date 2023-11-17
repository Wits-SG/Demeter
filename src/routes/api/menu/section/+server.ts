import { tursoClient } from '$lib/server/turso';
import type { RequestEvent } from './$types';

export const POST = async (event: RequestEvent) => {
	const addSection: { sectionID: number; menuID: string; name: string } =
		await event.request.json();

	await tursoClient.execute({
		sql: 'INSERT INTO menu_sections (id, menu_id, name) values (?,?,?)',
		args: [addSection.sectionID, addSection.menuID, addSection.name]
	});

	return new Response('Successful');
};
