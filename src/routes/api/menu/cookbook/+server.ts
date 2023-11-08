import { tursoClient } from '$lib/server/turso';
import { error } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	try {
		const { cookbookId, menuId } = await request.json();

		tursoClient.execute({
			sql: 'INSERT INTO menu_cookbooks (cookbook_id, menu_id) VALUES (?, ?)',
			args: [cookbookId, menuId]
		});

		return new Response('Succesful');
	} catch {
		throw error(400, 'Something went wrong');
	}
};

export const DELETE = async ({ request }) => {
	try {
		const { cookbookId, menuId } = await request.json();

		tursoClient.execute({
			sql: 'DELETE FROM menu_cookbooks WHERE cookbook_id = ? AND menu_id = ?',
			args: [cookbookId, menuId]
		});

		return new Response('Succesful');
	} catch {
		throw error(400, 'Something went wrong');
	}
};
