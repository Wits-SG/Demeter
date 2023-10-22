import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { tursoClient } from './turso';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: libsql(tursoClient, {
		user: 'users',
		key: 'user_key',
		session: 'user_session'
	}),
	getUserAttributes: (data) => {
		return { username: data.username };
	}
});

export type Auth = typeof auth;
