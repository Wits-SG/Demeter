import type { PageServerLoad } from './$types';
import { tursoClient } from '$lib/server/turso';

export const load = (async () => {
	const skillLevelsResult = await tursoClient.execute(
		'select * from skill_levels order by id asc'
	);
	let skillLevels: Array<string> = [];

	for (let row of skillLevelsResult.rows) {
		if (row['content'] != null) {
			skillLevels.push(row['content'] as string);
		}
	}

	return {
		skillLevels: skillLevels
	};
}) satisfies PageServerLoad;
