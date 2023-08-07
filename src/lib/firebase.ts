import { initializeApp } from 'firebase/app';
import { env } from '$env/dynamic/private';

const firebase_config = {
	apiKey: env.FB_API_KEY,
	authDomain: env.FB_AUTH_DOMAIN,
	projectId: env.FB_PROJECT_ID,
	storageBucket: env.FB_STORAGE_BUCKET,
	messagingSenderId: env.FB_MESSAGING_SENDER_ID,
	appId: env.FB_APP_ID
};

const app = initializeApp(firebase_config);
