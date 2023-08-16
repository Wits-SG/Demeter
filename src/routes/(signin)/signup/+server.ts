import { fb_auth } from '$lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { RequestEvent } from './$types';

import { error, text } from '@sveltejs/kit';

export const POST = async (event: RequestEvent): Promise<Response> => {
	const { email, password } = await event.request.json();

	try {
		const signup_result = await createUserWithEmailAndPassword(fb_auth, email, password);

		// Hook into turso here

		return text('User created successfully');
	} catch (res_error: any) {
		throw error(400, { message: `Failed to create user with error ${res_error.message}` });
	}
};
