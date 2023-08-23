import { initializeApp } from 'firebase/app';
import {
	PUBLIC_FB_STORAGE_BUCKET,
	PUBLIC_FB_AUTH_DOMAIN,
	PUBLIC_FB_MESSAGING_SENDER_ID,
	PUBLIC_FB_API_KEY,
	PUBLIC_FB_PROJECT_ID,
	PUBLIC_FB_APP_ID
} from '$env/static/public';
import { browserSessionPersistence, getAuth, setPersistence } from 'firebase/auth';

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
setPersistence(fb_auth, browserSessionPersistence);
