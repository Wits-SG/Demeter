import { fb_auth } from '$lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { RequestEvent } from './$types';

export const POST = async (event: RequestEvent) => {
	const { email, password } = await event.request.json();
	const signin_result = await signInWithEmailAndPassword(fb_auth, email, password);

	// Do things here
};
