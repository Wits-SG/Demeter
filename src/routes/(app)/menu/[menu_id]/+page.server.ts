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
	const menu_recipe_res = await turso_client.execute({
		sql: 'select * from menu_recipes where menu_id=?',
		args: [params.menu_id]
	});

	//Getting the section ids and putting into an array
	const sections = [];
	const section_ids: Array<string> = [];
	for (let row of menu_section.rows) {
		sections.push(row['name']);
		section_ids.push(row['section_id'] as string);
	}

	//Adding the recipes to their sections for display
	let section_recipes: Array<Array<Recipe>> = [[]];
	for (let i = 0; i < section_ids.length; i++) {
		const sectionRecipes = []; // Create a new array for each section

		const recipe_sections = await turso_client.execute({
			sql: 'select recipes.* from menu_recipes  join recipes on menu_recipes.recipe_id = recipes.recipe_id where menu_recipes.menu_id = ? AND menu_recipes.section_id =?',

			args: [params.menu_id, i]
		});

		for (let row of recipe_sections.rows) {
			//this is an issue, its adding all the recipes to the recipes array before adding to section_recipes
			sectionRecipes.push({
				id: row['recipe_id'],
				name: row['name'],
				description: row['description'],
				cookingTime: row['cooking_time']
			} as Recipe);
		}
		section_recipes[i] = sectionRecipes; //Assign the section-specific array to section_recipes
	}
	console.log(section_recipes);
	return {
		menu_info: {
			id: params.menu_id,
			name: menu_name.rows[0]['name'],
			section: sections,
			section_id: section_ids
		},
		recipe: section_recipes
	};
}) satisfies PageServerLoad;
