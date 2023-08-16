import { fb_auth } from '$lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { RequestEvent } from './$types';

import { error, json } from '@sveltejs/kit';

export const POST = async (event: RequestEvent): Promise<Response> => {
	const { email, password } = await event.request.json();

	try {
		const signin_result = await signInWithEmailAndPassword(fb_auth, email, password);

		// Hook into turso here
		return json({
			user_id: signin_result.user.email
		});
	} catch (res_error: any) {
		throw error(400, { message: `Failed to login with error ${res_error.message}` });
	}
};
