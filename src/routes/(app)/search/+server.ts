import { tursoClient } from '$lib/server/turso';
import type { Value } from '@libsql/client';
import type { RequestEvent } from './$types';
import { error, json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const pageNum: string | null = url.searchParams.get('page_num');
	const searchValue = url.searchParams.get('search_value');
	let strPageNum: string;
	let recipesList: Array<string> = [];

	if (!pageNum) {
		throw error(404, 'No page number specified');
	} else {
		strPageNum = pageNum.toString();
	}

	if (!searchValue) {
		throw error(404, 'No search terms specified');
	}

	const searchValueArr: string[] = searchValue.split(' ');

	console.log(searchValueArr);
	console.log(strPageNum);

	let limit = 5 + pageNum;
	let strLimit = limit.toString();

	let query: string = `SELECT recipe_id FROM recipes WHERE`;
	for (let val of searchValueArr) {
		query = query + ` name LIKE '%${val}%' OR`;
	}
	query = query.substring(0, query.length - 3);
	query =
		query +
		` AND recipe_id NOT IN ( SELECT recipe_id FROM recipes ASC LIMIT ${strPageNum}) LIMIT ${strLimit}`;
	console.log(query);

	try {
		const recipesResult = await tursoClient.execute({
			sql: query,
			args: []
		});

		for (let row of recipesResult.rows) {
			if (row['recipe_id'] != null) {
				recipesList.push(row['recipe_id'] as string);
			}
		}

		return json({
			recipes: recipesList
		});
	} catch (e) {
		console.error(e);
	}
};
