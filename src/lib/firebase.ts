import { initializeApp } from 'firebase/app';
import {
	PUBLIC_FB_STORAGE_BUCKET,
	PUBLIC_FB_AUTH_DOMAIN,
	PUBLIC_FB_MESSAGING_SENDER_ID,
	PUBLIC_FB_API_KEY,
	PUBLIC_FB_PROJECT_ID,
	PUBLIC_FB_APP_ID
} from '$env/static/public';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

import type { User } from '$lib/types/user.type';
import { userInfo, userSignedIn } from '$lib/stores/user.store';

const firebase_config = {
	apiKey: PUBLIC_FB_API_KEY,
	authDomain: PUBLIC_FB_AUTH_DOMAIN,
	projectId: PUBLIC_FB_PROJECT_ID,
	storageBucket: PUBLIC_FB_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FB_MESSAGING_SENDER_ID,
	appId: PUBLIC_FB_APP_ID
};

const fb_app = initializeApp(firebase_config, 'WEB_CLIENT');
export const fb_auth = getAuth(fb_app);
export const fb_storage = getStorage(fb_app);

fb_auth.onAuthStateChanged(async (user) => {
	if (user == null) {
		// User logged out
		userInfo.set({
			userId: 'NONE',
			pictureUrl: 'NONE',
			userName: 'NONE'
		});
		userSignedIn.set(false);
	}

	userInfo.set({
		userId: user?.uid ? user?.uid : '',
		userName: user?.displayName ? user?.displayName : '',
		pictureUrl: user?.photoURL ? user?.photoURL : ''
	});
	userSignedIn.set(true);
});
