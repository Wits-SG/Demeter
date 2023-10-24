import { fb_auth } from '$lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { RequestEvent } from './$types';

import { error, text } from '@sveltejs/kit';
