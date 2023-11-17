import { expect, test } from '@playwright/test';

test('Fetch Recipe of the Day', async ({ request }) => {
	const rotdRes = await request.get(`/api/recipe/recipe_of_the_day`);
	expect(rotdRes.ok()).toBeTruthy();

	const rotdJson = await rotdRes.json();
	expect(rotdJson).not.toBeNull();

	expect(rotdJson).toHaveProperty('recipe.id');
	expect(rotdJson).toHaveProperty('recipe.name');
	expect(rotdJson).toHaveProperty('recipe.description');
	expect(rotdJson).toHaveProperty('recipe.imageUrl');

	expect(rotdJson).toHaveProperty('user.id');
	expect(rotdJson).toHaveProperty('user.displayName');
});

test('Fetch Recipe Preview', async ({ request }) => {
	const rPreviewRes = await request.get(`/api/recipe/preview?post_id=post_recipe_id_1`);
	expect(rPreviewRes.ok()).toBeTruthy();

	const rPreviewJson = await rPreviewRes.json();
	expect(rPreviewJson).not.toBeNull();

	expect(rPreviewJson).toHaveProperty('recipe.recipeID');
	expect(rPreviewJson).toHaveProperty('recipe.name');
	expect(rPreviewJson).toHaveProperty('recipe.description');
	expect(rPreviewJson).toHaveProperty('recipe.imageURL');

	expect(rPreviewJson).toHaveProperty('user.id');
	expect(rPreviewJson).toHaveProperty('user.displayName');

	expect(rPreviewJson['recipe']['recipeID']).toEqual('recipe_id_1');
	expect(rPreviewJson['recipe']['name']).toEqual('Recipe 1');
	expect(rPreviewJson['recipe']['description']).toEqual('Test description for Recipe 1');
	expect(rPreviewJson['recipe']['imageURL']).toEqual('');

	expect(rPreviewJson['user']['id']).toEqual('user_id_1');
	expect(rPreviewJson['user']['displayName']).toEqual('User 1');
});

test('Fetch Picture Preview', async ({ request }) => {
	const pPreviewRes = await request.get(`/api/picture_post/preview?post_id=post_picture_id_1`);
	expect(pPreviewRes.ok()).toBeTruthy();

	const pPreviewJson = await pPreviewRes.json();
	expect(pPreviewJson).not.toBeNull();

	expect(pPreviewJson).toHaveProperty('picture.pictureID');
	expect(pPreviewJson).toHaveProperty('picture.name');
	expect(pPreviewJson).toHaveProperty('picture.description');
	//expect(pPreviewJson).toHaveProperty('picture.imageURL');

	expect(pPreviewJson).toHaveProperty('user.id');
	expect(pPreviewJson).toHaveProperty('user.displayName');

	expect(pPreviewJson['picture']['pictureID']).toEqual('picture_id_1');
	expect(pPreviewJson['picture']['name']).toEqual('Picture 1');
	expect(pPreviewJson['picture']['description']).toEqual('Description for Picture 1');
	//expect(pPreviewJson['picture']['imageURL']).toEqual("");

	expect(pPreviewJson['user']['id']).toEqual('user_id_1');
	expect(pPreviewJson['user']['displayName']).toEqual('User 1');
});

test('Fetch User Profile', async ({ request }) => {
	const userRes = await request.get(`/api/user?user_id=user_id_1`);
	expect(userRes.ok()).toBeTruthy();

	const userJson = await userRes.json();
	expect(userJson).not.toBeNull();

	expect(userJson).toHaveProperty('userId');
	expect(userJson).toHaveProperty('userName');
	expect(userJson).toHaveProperty('displayName');
	expect(userJson).toHaveProperty('pronounId');

	expect(userJson['userId']).toEqual('user_id_1');
	expect(userJson['displayName']).toEqual('User 1');
	expect(userJson['userName']).toEqual('username1');
	expect(userJson['pronounId']).toEqual(1);
});

test('Fetch User Profile Posts', async ({ request }) => {
	const userPostsRes = await request.get(`/api/user/posts?user_id=user_id_1&page_num=1`);
	expect(userPostsRes.ok()).toBeTruthy();

	const userPostsJson = await userPostsRes.json();
	expect(userPostsJson).not.toBeNull();

	expect(userPostsJson).toHaveProperty('posts');

	expect(userPostsJson['posts']).toBeInstanceOf(Array);
});

test('Fetch Cookbook', async ({ request }) => {
	const userPostsRes = await request.get(`/api/cookbook?user_id=user_id_1`);
	expect(userPostsRes.ok()).toBeTruthy();

	const userPostsJson = await userPostsRes.json();
	expect(userPostsJson).not.toBeNull();

	expect(userPostsJson).toBeInstanceOf(Array);
	expect(userPostsJson.length).toEqual(3);
});

test('Fetch Cookbook Recipes', async ({ request }) => {
	const userPostsRes = await request.get(`/api/cookbook/recipe?cookbook_id=cookbook_id_1`);
	expect(userPostsRes.ok()).toBeTruthy();

	const userPostsJson = await userPostsRes.json();
	expect(userPostsJson).not.toBeNull();

	expect(userPostsJson).toHaveProperty('recipeIDs');

	expect(userPostsJson['recipeIDs']).toBeInstanceOf(Array);
	expect(userPostsJson['recipeIDs'].length).toEqual(2);
});

test('Fetch Comments', async ({ request }) => {
	const commentsRes = await request.get(`/api/comments?comment_id=1`);
	expect(commentsRes.ok()).toBeTruthy();

	const commentsJson = await commentsRes.json();
	expect(commentsJson).not.toBeNull;

	expect(commentsJson).toHaveProperty('userId');
	expect(commentsJson).toHaveProperty('displayName');
	expect(commentsJson).toHaveProperty('content');
	expect(commentsJson).toHaveProperty('children');

	expect(commentsJson['userId']).toEqual('user_id_1');
	expect(commentsJson['displayName']).toEqual('User 1');
	expect(commentsJson['content']).toEqual('Example Root Comment');
	expect(commentsJson['children']).toBeInstanceOf(Array);
	expect(commentsJson['children'].length).toEqual(2);
});

test('Fetch Comments Post', async ({ request }) => {
	const userPostsRes = await request.get(`/api/comments/post?post_id=post_recipe_id_1`);
	expect(userPostsRes.ok()).toBeTruthy();

	const userPostsJson = await userPostsRes.json();
	expect(userPostsJson).not.toBeNull();

	expect(userPostsJson).toBeInstanceOf(Array);
	expect(userPostsJson.length).toEqual(2);
});
