<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	$: console.log($page.status);
	// h-9 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300
</script>

<div
	class="bg-zinc-100 dark:bg-zinc-800 w-fit px-32 h-screen -skew-x-6 -translate-x-20 border-r-8 border-emerald-500 flex flex-col justify-center items-center">
	<div class="skew-x-6 translate-x-8 flex flex-col justify-center items-center gap-10">
		<h1 class="font-serif text-7xl">Welcome</h1>

		<form method="post" use:enhance>
			<span class="flex flex-col justify-center items-start">
				<label for="username">Email Address:</label>
				<input
					class="p-1 w-64 text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
					id="username"
					type="text"
					name="username" />
			</span>

			<span class="flex flex-col justify-center items-start">
				<label for="password">Password:</label>
				<input
					class="p-1 w-64 text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
					id="password"
					type="password"
					name="password" />
			</span>

			<div class="flex flex-col justify-center items-center gap-5">
				<a
					class="text-emerald-700 dark:text-emerald-300 underline hover:text-emerald-900 dark:hover:text-emerald-100"
					href="/forgot">
					forgot password?
				</a>

				<section class="flex flex-col justify-center items-center w-full gap-3">
					<button
						class="w-72 h-12 rounded-md bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-600"
						type="submit">
						Login
					</button>
				</section>

				<a
					class="w-72 h-12 rounded-md bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-600 text-center flex justify-center items-center"
					href="/signup">
					Join
				</a>
			</div>
		</form>
	</div>
</div>
