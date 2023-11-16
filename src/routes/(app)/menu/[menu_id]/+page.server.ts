import { tursoClient } from '$lib/server/turso';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const session = await locals.auth.validate();

	if (!session) redirect(300, '/');

	const userCookbooksRes = await tursoClient.execute({
		sql: 'SELECT id, title FROM cookbooks WHERE user_id = ?',
		//@ts-ignore
		args: [session.user.userId]
	});
	const userCookbooks: Array<{ id: string; name: string }> = [];
	for (let row of userCookbooksRes.rows) {
		userCookbooks.push({
			id: row['id'] as string,
			name: row['title'] as string
		});
	}

	const menuCookbooksRes = await tursoClient.execute({
		sql: 'SELECT menu_cookbooks.cookbook_id, cookbooks.title FROM menu_cookbooks JOIN cookbooks ON menu_cookbooks.cookbook_id = cookbooks.id WHERE menu_id = ?',
		args: [params.menu_id]
	});
	const menuCookbooks: Array<{ id: string; name: string }> = [];
	for (let row of menuCookbooksRes.rows) {
		menuCookbooks.push({
			id: row['id'] as string,
			name: row['title'] as string
		});
	}

	const menu_name = await tursoClient.execute({
		sql: 'select title from menus where id = ?',
		args: [params.menu_id]
	});

	const menu_section = await tursoClient.execute({
		sql: 'select * from menu_sections where menu_id=? ORDER BY id ASC',
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
		section_ids.push(row['id'] as string);
	}

	//Adding the recipes to their sections for display
	let section_recipes: Array<Array<Recipe>> = [[]];
	for (let i = 0; i < section_ids.length; i++) {
		const sectionRecipes = []; // Create a new array for each section

		const recipe_sections = await tursoClient.execute({
			sql: 'select recipes.* from menu_recipes join recipes on menu_recipes.recipe_id = recipes.id where menu_recipes.menu_id = ? AND menu_recipes.section_id =?',

			args: [params.menu_id, i]
		});

		for (let row of recipe_sections.rows) {
			//this is an issue, its adding all the recipes to the recipes array before adding to section_recipes
			sectionRecipes.push({
				id: row['id'],
				name: row['title'],
				description: row['description'],
				cookingTime: row['cooking_time']
			} as Recipe);
		}
		section_recipes[i] = sectionRecipes; //Assign the section-specific array to section_recipes
	}

	return {
		menu_info: {
			id: params.menu_id,
			name: menu_name.rows[0]['title'],
			section: sections,
			section_id: section_ids
		},
		recipe: section_recipes,
		menuCookbooks,
		userCookbooks
	};
}) satisfies PageServerLoad;
