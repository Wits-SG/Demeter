import { turso_client } from '$lib/turso';
import { json } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import type { RequestEvent } from './$types';

// POST - Creating a new Menu -> add to database

export const POST = async (event: RequestEvent) => {
	const menu: Menu = await event.request.json();

	menu.menuID = uuidv4();
	const menuCreateResult = await turso_client.execute({
		sql: 'insert into menus(menu_id, user_id, name) values (?, ?, ?)',
		args: [menu.menuID, menu.userID !== undefined ? menu.userID : '', menu['name']]
	});

	for (let section of menu.sections) {
		await turso_client.execute({
			sql: 'insert into menu_sections(section_id, menu_id, name) values(?,?,?)',
			args: [menu.sections.indexOf(section), section, menu.menuID]
		});
	}
	return new Response('Successful');
};
