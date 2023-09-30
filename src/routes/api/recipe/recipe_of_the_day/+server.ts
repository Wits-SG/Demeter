import { turso_client } from '$lib/turso';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

let selectedRecipeID: any; // Store the selected recipe_id

// Function to select a random recipe from the database
async function selectRandomRecipe() {
	try {
		const recipeResult = await turso_client.execute(
			'SELECT * FROM recipes ORDER BY RANDOM() LIMIT 1'
		);

		if (recipeResult.rows.length > 0) {
			const randomRecipe = recipeResult.rows[0];
			return {
				id: randomRecipe['recipe_id'],
				name: randomRecipe['name'],
				description: randomRecipe['description'],
				servingSize: randomRecipe['serving_size'],
				cookingTime: randomRecipe['cooking_time'],
				skillLevelId: randomRecipe['skill_level_id'],
				imageUrl: randomRecipe['image_url']
			};
		} else {
			throw new Error('No recipes found');
		}
	} catch (error) {
		throw new Error('Failed to fetch recipe');
	}
}

export const GET = async (event: RequestEvent) => {
	try {
		if (!selectedRecipeID) {
			// If no recipe is selected for the day, select one and store it
			const selectedRecipe = await selectRandomRecipe();
			selectedRecipeID = selectedRecipe.id;
			return json({ recipe: selectedRecipe });
		} else {
			// Use the previously selected recipe for the day
			const recipeResult = await turso_client.execute({
				sql: 'SELECT * FROM recipes WHERE recipe_id = ?',
				args: [selectedRecipeID]
			});

			if (recipeResult.rows.length > 0) {
				const selectedRecipe = {
					id: recipeResult.rows[0]['recipe_id'],
					name: recipeResult.rows[0]['name'],
					description: recipeResult.rows[0]['description'],
					servingSize: recipeResult.rows[0]['serving_size'],
					cookingTime: recipeResult.rows[0]['cooking_time'],
					skillLevelId: recipeResult.rows[0]['skill_level_id'],
					imageUrl: recipeResult.rows[0]['image_url']
				};

				return json({ recipe: selectedRecipe });
			} else {
				throw error(404, 'Selected recipe not found');
			}
		}
	} catch (e: any) {
		throw error(500, 'Failed to fetch recipe');
	}
};
