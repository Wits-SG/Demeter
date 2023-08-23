import type { PageServerLoad } from './$types';
import { turso_client } from '$lib/turso';

export const load = (async ({ params }) => {
	// Recipes
	const recipe_res = await turso_client.execute({
		sql: 'select * from recipes where recipe_id = ?',
		args: [params.recipe_id]
	});

	// Instructions
	const instruction_res = await turso_client.execute({
		sql: 'select * from instructions where recipe_id = ?',
		args: [params.recipe_id]
	});

	// Skill Level
	const skill_level_res = await turso_client.execute({
		sql: 'select skill_levels.* from recipes left join skill_levels on skill_levels.skill_level_id = recipes.skill_level_id where recipe_id = ?',
		args: [params.recipe_id]
	});

	//Ingredients
	const ingredients_res = await turso_client.execute({
		sql: 'select ingredients.* from recipes join ingredients on recipes.recipe_id = ingredients.recipe_id where recipes.recipe_id = ?',
		args: [params.recipe_id]
	});

	const instructions = [];
	for (let row of instruction_res.rows) {
		instructions.push(row['name']);
	}

	const ingredients = [];
	for (let row of ingredients_res.rows) {
		ingredients.push(row['name']);
	}

	console.log(ingredients);
	console.log(instructions);

	return {
		recipe: {
			name: recipe_res.rows[0]['name'],
			description: recipe_res.rows[0]['description'],
			servingSize: recipe_res.rows[0]['serving_size'],
			cookingTime: recipe_res.rows[0]['cooking_time'],
			imageUrl: recipe_res.row[0]['image_url'],
			skillLevel: skill_level_res.rows[0]['name'],
			instructions: instructions,
			ingredients: ingredients
		} as Recipe
	};
}) satisfies PageServerLoad;
