import type { PageServerLoad } from './$types';
import { tursoClient } from '$lib/server/turso';

export const load = (async ({ params }) => {
	// Recipes
	const recipeRes = await tursoClient.execute({
		sql: 'select * from recipes where id = ?',
		args: [params.recipe_id]
	});

	// Instructions
	const instructionRes = await tursoClient.execute({
		sql: 'select * from instructions where recipe_id = ?',
		args: [params.recipe_id]
	});

	// Skill Level
	const skillLevelRes = await tursoClient.execute({
		sql: 'select skill_levels.* from recipes left join skill_levels on skill_levels.id = recipes.skill_level_id where recipes.id = ?',
		args: [params.recipe_id]
	});

	// Ingredients
	const ingredientsRes = await tursoClient.execute({
		sql: 'select ingredients.* from recipes join ingredients on recipes.id = ingredients.recipe_id where recipes.id = ?',
		args: [params.recipe_id]
	});

	const instructions = [];
	for (let row of instructionRes.rows) {
		instructions.push(row['content']);
	}

	const ingredients = [];
	for (let row of ingredientsRes.rows) {
		ingredients.push(row['content']);
	}

	// Post ID
	const postId = recipeRes.rows[0]['post_id'];
	// User ID and Display Name
	const postRes = await tursoClient.execute({
		sql: 'select users.id, users.display_name from users join posts on users.id = posts.user_id where posts.id = ?',
		args: [postId]
	});

	return {
		user:
			postRes.rows.length > 0
				? {
						userID: postRes.rows[0]['id'],
						displayName: postRes.rows[0]['display_name']
				  }
				: { error: true },

		recipe: {
			id: params.recipe_id,
			name: recipeRes.rows[0]['title'],
			description: recipeRes.rows[0]['description'],
			servingSize: recipeRes.rows[0]['serving_size'],
			cookingTime: recipeRes.rows[0]['cooking_time'],
			imageUrl: recipeRes.rows[0]['image_url'],
			skillLevel: skillLevelRes.rows[0]['content'],
			instructions: instructions,
			ingredients: ingredients,
			postId: recipeRes.rows[0]['post_id']
		} as Recipe
	};
}) satisfies PageServerLoad;
