import { tursoClient } from '$lib/server/turso';
import { error, json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const recipeID = url.searchParams.get('recipe_id');

	try {
		const recipe_res = await tursoClient.execute({
			sql: 'select name, post_id, description, image_url, serving_size, cooking_time from recipes where recipe_id = ?',
			args: [recipeID]
		});

		const ingredients_res = await tursoClient.execute({
			sql: 'select name from ingredients where recipe_id = ?',
			args: [recipeID]
		});

		const ingredients = [];
		for (let row of ingredients_res.rows) {
			ingredients.push(row['name']);
		}
		const instructions_res = await tursoClient.execute({
			sql: 'select name from instructions where recipe_id = ?',
			args: [recipeID]
		});

		const instructions = [];
		for (let row of instructions_res.rows) {
			instructions.push(row['name']);
		}

		return json({
			recipe: {
				name: recipe_res.rows[0]['name'],
				post_id: recipe_res.rows[0]['post_id'],
				description: recipe_res.rows[0]['description'],
				imageURL: recipe_res.rows[0]['image_url'],
				servingSize: recipe_res.rows[0]['serving_size'],
				cookingTime: recipe_res.rows[0]['cooking_time'],
				ingredients: ingredients,
				instructions: instructions
			}
		});
	} catch (e) {
		throw error(500, 'Failed to fetch recipe');
	}
};
