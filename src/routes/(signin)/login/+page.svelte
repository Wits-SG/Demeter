<script lang="ts">
	import { goto } from '$app/navigation';

	let email: string;
	let password: string;

	let incorrect_credentials: boolean = false;
	let unknown_error: boolean = false;

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
			} else if (login_res.status == 400) {
				incorrect_credentials = true;
			}
		} catch (login_err) {
			unknown_error = true;
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

		{#if incorrect_credentials}
			<span class="text-md bg-red-200 text-red-600 p-2 rounded-md"
				><p>Incorrect username or password. Please try again.</p></span>
		{/if}
		{#if unknown_error}
			<span class="text-md bg-red-200 text-red-600 p-2 rounded-md"
				><p>Something went wrong. Please try again later.</p></span>
		{/if}

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
