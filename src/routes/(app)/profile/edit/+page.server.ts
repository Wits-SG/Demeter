import type { PageServerLoad } from './$types';
import { turso_client } from '$lib/turso';

export const load = (async () => {
	const pronounsRes = await turso_client.execute(
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
