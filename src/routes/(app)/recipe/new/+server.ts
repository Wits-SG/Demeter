import type { RequestEvent } from './$types';
import { tursoClient } from '$lib/server/turso';

export const POST = async (event: RequestEvent) => {
	const body = await event.request.json();

	const uploadDate = Math.floor(Date.now() / 1000);
	const postInsertResult = await tursoClient.execute({
		//type id for recipe is 0 -- last value
		sql: 'INSERT INTO posts(id, user_id, upload_date, likes, type) VALUES(?, ?, ?, 0, 0)',
		args: [body.postId, body.userId, uploadDate]
	});

	const recipeInsertResult = await tursoClient.execute({
		sql: 'INSERT INTO recipes(id, post_id, title, description, serving_size, cooking_time, image_url, skill_level_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
		args: [
			body.id,
			body.postId,
			body.name,
			body.description,
			body.servingSize,
			body.cookingTime,
			body.imageUrl,
			body.skillLevel
		]
	});

	for (let instruction of body.instructions) {
		await tursoClient.execute({
			sql: 'INSERT INTO instructions(content, recipe_id) VALUES(?,?)',
			args: [instruction, body.id]
		});
	}

	for (let ingredient of body.ingredients) {
		await tursoClient.execute({
			sql: 'INSERT INTO ingredients(content, recipe_id) VALUES(?,?)',
			args: [ingredient, body.id]
		});
	}

	return new Response('Successful');
};
