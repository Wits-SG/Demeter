import { initializeApp } from 'firebase/app';
import { env } from '$env/dynamic/private';
import { browserSessionPersistence, getAuth, setPersistence } from 'firebase/auth';

const firebase_config = {
	apiKey: env.FB_API_KEY,
	authDomain: env.FB_AUTH_DOMAIN,
	projectId: env.FB_PROJECT_ID,
	storageBucket: env.FB_STORAGE_BUCKET,
	messagingSenderId: env.FB_MESSAGING_SENDER_ID,
	appId: env.FB_APP_ID
};

const fb_app = initializeApp(firebase_config, 'WEB_CLIENT');
export const fb_auth = getAuth(fb_app);
setPersistence(fb_auth, browserSessionPersistence);
