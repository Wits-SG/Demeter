import { turso_client } from '$lib/turso';
import { error, json } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import type { RequestEvent } from './$types';

/**
 * @description Add a new menu to a user
 */
export const POST = async (event: RequestEvent) => {
	const menu: Menu = await event.request.json();

	try {
		menu.menuID = uuidv4();
		await turso_client.execute({
			sql: 'insert into menus(menu_id, user_id, name) values (?, ?, ?)',
			args: [menu.menuID, menu.userID !== undefined ? menu.userID : '', menu['name']]
		});

		for (let section of menu.sections) {
			await turso_client.execute({
				sql: 'insert into menu_sections(section_id, menu_id, name) values(?,?,?)',
				args: [menu.sections.indexOf(section), section, menu.menuID]
			});
		}
	} catch (e: any) {
		return error(500, 'Failed to create a new menu');
	}

	return new Response('Successful');
};
