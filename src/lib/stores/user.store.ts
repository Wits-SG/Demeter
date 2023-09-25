import { writable, type Writable } from 'svelte/store';
import type { User } from '$lib/types/user.type';

export const userSignedIn = writable(false);
export const userInfo: Writable<{
	userId: string;
	pictureUrl: string;
	userName: string;
}> = writable({
	userId: 'NONE',
	pictureUrl: 'NONE',
	userName: 'NONE'
});
