import { tursoClient } from '$lib/server/turso';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

// Function to select a random recipe from the database
async function selectRandomRecipe() {
	try {
		let recipeResult = await tursoClient.execute(
			'SELECT * FROM recipe_of_the_day ORDER BY date DESC LIMIT 1'
		);

		if (recipeResult.rows.length == 0) {
			tursoClient.execute(
				"insert into recipe_of_the_day (recipe_id, date) values ((select recipe_id from recipes order by random() limit 1), unixepoch('now'))"
			);
		}

		const recipeDate = new Date((recipeResult.rows[0]['date'] as number) * 1000).setHours(
			0,
			0,
			0,
			0
		);
		const currentDate = new Date().setHours(0, 0, 0, 0);

		if (recipeDate != currentDate) {
			tursoClient.executeMultiple(
				"delete from recipe_of_the_day; insert into recipe_of_the_day (recipe_id, date) values ((select recipe_id from recipes order by random() limit 1), unixepoch('now'))"
			);
			recipeResult = await tursoClient.execute(
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
		const recipeDetailsResult = await tursoClient.execute({
			sql: 'select name, description, image_url, post_id from recipes where recipe_id = ?',
			args: [recipeID]
		});

		if (recipeDetailsResult.rows.length > 0) {
			const selectedRecipe = recipeDetailsResult.rows[0];

			const postResult = await tursoClient.execute({
				sql: 'SELECT user_id FROM posts WHERE post_id = ? LIMIT 1',
				args: [selectedRecipe['post_id']]
			});

			const userResult = await tursoClient.execute({
				sql: 'SELECT display_name FROM users WHERE id = ? LIMIT 1',
				args: [postResult.rows[0]['user_id']]
			});

			return json({
				recipe: {
					id: recipeID,
					name: selectedRecipe.name,
					description: selectedRecipe.description,
					imageUrl: selectedRecipe.image_url
				},
				user: {
					id: postResult.rows[0]['user_id'],
					displayName: userResult.rows[0]['display_name']
				}
			});
		} else {
			throw error(404, 'No matching recipe found');
		}
	} catch (e: any) {
		console.error(e);
		throw error(500, 'Failed to fetch recipe');
	}
};
