import { tursoClient } from '$lib/server/turso';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const session = await locals.auth.validate();

	if (!session) redirect(300, '/');

	const userCookbooksRes = await tursoClient.execute({
		sql: 'SELECT cookbook_id, name FROM cookbooks WHERE user_id = ?',
		//@ts-ignore
		args: [session.user.userId]
	});
	const userCookbooks: Array<{ id: string; name: string }> = [];
	for (let row of userCookbooksRes.rows) {
		userCookbooks.push({
			id: row['cookbook_id'] as string,
			name: row['name'] as string
		});
	}

	const menuCookbooksRes = await tursoClient.execute({
		sql: 'SELECT menu_cookbooks.cookbook_id, cookbooks.name FROM menu_cookbooks JOIN cookbooks ON menu_cookbooks.cookbook_id = cookbooks.cookbook_id WHERE menu_id = ?',
		args: [params.menu_id]
	});
	const menuCookbooks: Array<{ id: string; name: string }> = [];
	for (let row of menuCookbooksRes.rows) {
		menuCookbooks.push({
			id: row['cookbook_id'] as string,
			name: row['name'] as string
		});
	}

	const menu_name = await tursoClient.execute({
		sql: 'select name from menus where menu_id = ?',
		args: [params.menu_id]
	});

	const menu_section = await tursoClient.execute({
		sql: 'select * from menu_sections where menu_id=?',
		args: [params.menu_id]
	});
	const menu_recipe_res = await tursoClient.execute({
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

		const recipe_sections = await tursoClient.execute({
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
	//console.log(section_recipes);
	return {
		menu_info: {
			id: params.menu_id,
			name: menu_name.rows[0]['name'],
			section: sections,
			section_id: section_ids
		},
		recipe: section_recipes,
		menuCookbooks,
		userCookbooks
	};
}) satisfies PageServerLoad;
