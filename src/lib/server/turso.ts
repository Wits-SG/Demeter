import { env } from '$env/dynamic/private';
import { createClient } from '@libsql/client';

export const tursoClient = createClient({
	url: env.TU_DB_URL,
	authToken: env.TU_DB_AUTH_TOKEN
});
