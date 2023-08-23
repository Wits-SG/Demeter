import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { turso_client } from '$lib/turso';
import { v4 as uuidv4 } from 'uuid';

export const POST = async (event: RequestEvent) => {
	const recipe: Recipe = await event.request.json();
	recipe.id = uuidv4();

	const recipeInsertResult = await turso_client.execute({
		sql: 'INSERT INTO recipes VALUES(?, ?, ?, ?, ?, ?, ?)',
		args: [
			recipe.id,
			recipe.name,
			recipe.description,
			recipe.servingSize,
			recipe.cookingTime,
			recipe.imageUrl,
			recipe.skillLevel
		]
	});

	for (let instruction of recipe.instructions) {
		await turso_client.execute({
			sql: 'INSERT INTO instructions(name, recipe_id) VALUES(?,?)',
			args: [instruction, recipe.id]
		});
	}

	for (let ingredient of recipe.ingredients) {
		await turso_client.execute({
			sql: 'INSERT INTO ingredients(name, recipe_id) VALUES(?,?)',
			args: [ingredient, recipe.id]
		});
	}
};
