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
	const recipes_id = [];
	for (let i = 0; i < section_ids.length; i++) {
		const sectionId = section_ids[i];
		const recipe_sections = await turso_client.execute({
			//sql: 'select recipes.* from menu_recipes join recipes on menu_recipes.recipe_id = recipes.recipe_id where menu_recipes.menu_id = ? AND menu_recipes.section_id =?',
			sql: 'select recipe_id from menu_recipes where menu_id=? AND section_id =?',
			args: [params.menu_id, sectionId]
		});

		for (let row of recipe_sections.rows) {
			recipes_id.push(row['recipe_id'] as string);
		}
	}
	//console.log(recipes_id);
	const recipes: Array<Recipe> = [];
	for (let i = 0; i < recipes_id.length; i++) {
		const recipes_info = await turso_client.execute({
			sql: 'select * from recipes where recipe_id =?',
			args: [recipes_id[i]]
		});

		for (let row of recipes_info.rows) {
			recipes.push({
				id: row['recipe_id'],
				name: row['name'],
				description: row['description'],
				cookingTime: row['cooking_time']
			} as Recipe);
		}
	}

	return {
		menu_info: {
			id: params.menu_id,
			name: menu_name.rows[0]['name'],
			section: sections,
			section_id: section_ids
		},
		recipes: recipes_id
	};
}) satisfies PageServerLoad;
