import { turso_client } from '$lib/turso';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const menu_name = await turso_client.execute({
		sql: 'select name from menus where menu_id = ?',
		args: [params.menu_id]
	});

	const menu_section = await turso_client.execute({
		sql: 'select * from menu_sections where menu_id=?',
		args: [params.menu_id]
	});

	const sections = [];
	const section_ids: Array<string> = [];
	for (let row of menu_section.rows) {
		sections.push(row['name']);
		section_ids.push(row['section_id'] as string);
	}

	for (let i = 0; i < section_ids.length; i++) {
		const sectionID = section_ids[i];
		const recipe_name = await turso_client.execute({
			sql: 'select recipes.* from menu_recipes join recipes on menu_recipes.recipe_id = recipes.recipe_id where menu_recipes.menu_id = ? AND menu_recipes.section_id =?',
			args: [params.menu_id, sectionID]
		});
	}

	return {
		menu_info: {
			id: params.menu_id,
			name: menu_name.rows[0]['name'],
			section: sections,
			section_id: section_ids
		}
	};
}) satisfies PageServerLoad;
