import { writable, type Writable } from 'svelte/store';
import type { User } from '$lib/types/user.type';

export const userSignedIn = writable(false);
export const userInfo: Writable<User> = writable({
	userId: 'NONE',
	pronouns: 'NONE',
	pictureUrl: 'NONE',
	userName: 'NONE',
	displayName: 'NONE',
	biography: 'NONE'
});
