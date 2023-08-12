<script lang="ts">
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

<div class="w-screen h-screen bg-zinc-100 flex flex-col justify-center items-center gap-10">
	<h1 class="text-5xl font-serif no-underline">Welcome</h1>

	<div class="flex flex-col gap-3">
		<label for="email">Email</label>
		<input name="email" type="email" bind:value={email} />

		<label for="password">Password</label>
		<input name="password" type="password" bind:value={password} />
	</div>

	<section class="flex flex-col gap-1 w-1/5">
		<button
			on:click={login_press}
			class="p-5 bg-emerald-500 rounded-md w-full h-12 text-center text-white text-md flex justify-center items-center hover:bg-emerald-600"
			>Login</button>
		<a
			class="p-5 bg-emerald-500 rounded-md w-full h-12 text-center text-white text-md flex justify-center items-center hover:bg-emerald-600"
			href="/welcome">Sign Up</a>
	</section>
</div>
