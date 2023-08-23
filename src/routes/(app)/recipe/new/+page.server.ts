import type { PageServerLoad } from './$types';
import { turso_client } from '$lib/turso';

export const load = (async () => {
	const skillLevelsResult = await turso_client.execute(
		'select * from skill_levels order by skill_level_id asc'
	);
	let skillLevels: Array<string> = [];

	for (let row of skillLevelsResult.rows) {
		if (row['name'] != null) {
			skillLevels.push(row['name'] as string);
		}
	}

	return {
		skillLevels: skillLevels
	};
}) satisfies PageServerLoad;
