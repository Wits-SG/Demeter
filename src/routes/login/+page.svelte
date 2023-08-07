<script lang="ts">
	let email: string;
	let password: string;

	const login_press = () => {};
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
			class="p-5 bg-emerald-500 rounded-md w-full h-12 text-center text-white text-md flex justify-center items-center hover:bg-emerald-600"
			>Login</button>
		<a
			class="p-5 bg-emerald-500 rounded-md w-full h-12 text-center text-white text-md flex justify-center items-center hover:bg-emerald-600"
			href="/welcome">Sign Up</a>
	</section>
</div>
