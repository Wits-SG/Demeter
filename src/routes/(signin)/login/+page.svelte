<script lang="ts">
	import { goto } from '$app/navigation';
	import { Icon } from 'flowbite-svelte-icons';
	import {
		GoogleAuthProvider,
		browserLocalPersistence,
		setPersistence,
		signInWithEmailAndPassword,
		signInWithPopup
	} from 'firebase/auth';
	import { fb_auth } from '$lib/firebase';

	const googleProvider = new GoogleAuthProvider();

	let email: string;
	let password: string;

	let incorrectCredentials: boolean = false;
	let unknownError: boolean = false;

	const emailLoginPress = async () => {
		try {
			await setPersistence(fb_auth, browserLocalPersistence);
			await signInWithEmailAndPassword(fb_auth, email, password);
			goto('/');
		} catch (exception: any) {
			incorrectCredentials =
				exception.code == 400 &&
				(exception.message == 'INVALID_PASSWORD' || exception.message == 'INVALID_EMAIL');
			unknownError =
				exception.code != 400 ||
				exception.message != 'INVALID_PASSWORD' ||
				exception.message != 'INVALID_EMAIL';
		}
	};

	const googleLoginPress = async () => {
		try {
			await setPersistence(fb_auth, browserLocalPersistence);
			await signInWithPopup(fb_auth, googleProvider);
			goto('/');
		} catch (exception: any) {
			unknownError = true;
		}
	};
</script>

<div
	class="bg-zinc-100 dark:bg-zinc-800 w-1/3 h-screen -skew-x-6 -translate-x-20 border-r-8 border-emerald-500 flex flex-col justify-center items-center">
	<div class="skew-x-6 translate-x-8 flex flex-col justify-center items-center gap-10">
		<h1 class="font-serif text-7xl">Welcome</h1>

		<span class="flex flex-col justify-center items-start">
			<label for="email">Email Address:</label>
			<input
				class="p-1 w-64 text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
				type="email"
				bind:value={email}
				name="email" />
		</span>

		<span class="flex flex-col justify-center items-start">
			<label for="password">Password:</label>
			<input
				class="p-1 w-64 text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
				type="password"
				bind:value={password}
				name="password" />
		</span>

		{#if incorrectCredentials}
			<span class="text-md bg-red-200 text-red-600 p-2 rounded-md"
				><p>Incorrect username or password. Please try again.</p></span>
		{/if}
		{#if unknownError}
			<span class="text-md bg-red-200 text-red-600 p-2 rounded-md"
				><p>Something went wrong. Please try again later.</p></span>
		{/if}

		<div class="flex flex-col justify-center items-center gap-5">
			<a
				class="text-emerald-700 dark:text-emerald-300 underline hover:text-emerald-900 dark:hover:text-emerald-100"
				href="/forgot">
				forgot password?
			</a>

			<section class="flex flex-col justify-center items-center w-full gap-3">
				<button
					class="w-72 h-12 rounded-md bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-600"
					on:click={emailLoginPress}>
					Login
				</button>
				<button
					class="flex flex-row justify-center items-center w-72 h-8 rounded-md
                        border-emerald-500 border-2 bg-zinc-100
                        dark:bg-zinc-800 text-black dark:text-white hover:bg-emerald-50
                        dark:hover:bg-emerald-800 gap-2"
					on:click={googleLoginPress}>
					<Icon name="google-solid" class="h-5 w-5 text-zinc-600 dark:text-zinc-200" />
					Sign in with Google
				</button>
			</section>
			<a
				class="w-72 h-12 rounded-md bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-600 text-center flex justify-center items-center"
				href="/signup">
				Join
			</a>
		</div>
	</div>
</div>
