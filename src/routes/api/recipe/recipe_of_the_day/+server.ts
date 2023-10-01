import { turso_client } from '$lib/turso';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

// Function to select a random recipe from the database
async function selectRandomRecipe() {
	try {
		let recipeResult = await turso_client.execute(
			'SELECT * FROM recipe_of_the_day ORDER BY date DESC LIMIT 1'
		);

		const recipeDate = new Date((recipeResult.rows[0]['date'] as number) * 1000).setHours(
			0,
			0,
			0,
			0
		);
		const currentDate = new Date().setHours(0, 0, 0, 0);

		if (recipeDate != currentDate) {
			turso_client.executeMultiple(
				"delete from recipe_of_the_day; insert into recipe_of_the_day (recipe_id, date) values ((select recipe_id from recipes order by random() limit 1), unixepoch('now'))"
			);
			recipeResult = await turso_client.execute(
				'SELECT * FROM recipe_of_the_day ORDER BY date DESC LIMIT 1'
			);
		}
		return recipeResult;
	} catch (error) {
		throw new Error('Failed to fetch date');
	}
}

export const GET = async (event: RequestEvent) => {
	try {
		const recipeResult = await selectRandomRecipe();

		// Get the selected recipe_id
		const recipeID = recipeResult.rows[0]['recipe_id'];

		// Query the database to fetch the selected recipe's details
		const recipeDetailsResult = await turso_client.execute({
			sql: 'select name, description, image_url from recipes where recipe_id = ?',
			args: [recipeID]
		});

		if (recipeDetailsResult.rows.length > 0) {
			const selectedRecipe = recipeDetailsResult.rows[0];

			return json({
				recipe: {
					id: recipeID,
					name: selectedRecipe.name,
					description: selectedRecipe.description,
					imageUrl: selectedRecipe.image_url
				}
			});
		} else {
			throw error(404, 'No matching recipe found');
		}
	} catch (e: any) {
		throw error(500, 'Failed to fetch recipe');
	}
};
