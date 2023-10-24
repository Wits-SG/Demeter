import { tursoClient } from '$lib/server/turso';
import type { Value } from '@libsql/client';
import type { RequestEvent } from './$types';
import { error, json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const pageNum: string | null = url.searchParams.get('page_num');
	const searchValue = url.searchParams.get('search_value');
	let strPageNum: string;

	if (!pageNum) {
		throw error(404, 'No page number specified');
	} else {
		strPageNum = pageNum.toString();
	}

	if (!searchValue) {
		throw error(404, 'No search terms specified');
	}

	const searchValueArr: string[] = searchValue.split(' ');
	for (let i = 0; i < searchValueArr.length; i++) {
		if (searchValueArr[i].length === 0) {
			searchValueArr.splice(i, 1);
			i = i - 1;
		}
	}

	let query: string = `SELECT posts.post_id FROM posts join recipes on recipes.post_id = posts.post_id WHERE`;

	let subQuery: string = '';
	for (let val of searchValueArr) {
		subQuery = subQuery + ` recipes.name LIKE '%${val}%' OR`;
	}
	subQuery = subQuery.substring(0, subQuery.length - 3);
	query =
		query +
		' (' +
		subQuery +
		')' +
		` AND posts.post_id NOT IN ( SELECT posts.post_id FROM posts join recipes on recipes.post_id = posts.post_id WHERE${subQuery} ORDER BY posts.upload_date LIMIT ${strPageNum}) ORDER BY posts.upload_date LIMIT 5`;

	try {
		const recipesResult = await tursoClient.execute({
			sql: query,
			args: []
		});

		let postsList: Array<{ id: string; type: number }> = [];

		for (let row of recipesResult.rows) {
			if (row['post_id'] != null) {
				postsList.push({ id: row['post_id'] as string, type: 0 });
			}
		}

		return json({
			recipes: postsList
		});
	} catch (e) {
		console.error(e);
	}
};
