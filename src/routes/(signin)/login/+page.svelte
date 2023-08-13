<script lang="ts">
	import { slide, fade } from 'svelte/transition';
	import { quartOut } from 'svelte/easing';
	import { goto } from '$app/navigation';

	let email: string;
	let password: string;

	const login_press = async () => {
		console.log('credentials ', email, password);

		try {
			const login_res = await fetch('/login', {
				method: 'POST',
				body: JSON.stringify({
					email: email,
					password: password
				}),
				headers: {
					'content-type': 'application/json'
				}
			});

			if (login_res.ok) {
				const { user_id } = await login_res.json();

				if (user_id == email) {
					goto('/');
				}
			} else {
				//TODO: Magic
			}
		} catch (login_err) {
			console.log('failed');
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

		<div class="flex flex-col justify-center items-center gap-5">
			<a
				class="text-emerald-700 dark:text-emerald-300 underline hover:text-emerald-900 dark:hover:text-emerald-100"
				href="/forgot">
				forgot password?
			</a>
			<button
				class="w-72 h-12 rounded-md bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-600"
				on:click={login_press}>
				Login
			</button>
			<a
				class="w-72 h-12 rounded-md bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-600 text-center flex justify-center items-center"
				href="/signup">
				Join
			</a>
		</div>
	</div>
</div>
