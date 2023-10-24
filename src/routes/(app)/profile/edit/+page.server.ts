import type { PageServerLoad } from './$types';
import { tursoClient } from '$lib/server/turso';

export const load = (async () => {
	const pronounsRes = await tursoClient.execute(
		'SELECT * FROM user_pronouns ORDER BY pronoun_id ASC'
	);
	let pronouns: Array<string> = [];

	for (let row of pronounsRes.rows) {
		if (row['pronouns'] != null) {
			pronouns.push(row['pronouns'] as string);
		}
	}

	return {
		pronouns
	};
}) satisfies PageServerLoad;
