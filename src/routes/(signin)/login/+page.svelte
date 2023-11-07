<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { XCircle } from 'lucide-svelte';
</script>

<div
	class="bg-zinc-100 dark:bg-zinc-800 w-fit px-32 h-screen -skew-x-6 -translate-x-20 border-r-8 border-emerald-500 flex flex-col justify-center items-center">
	<div class="skew-x-6 translate-x-8 flex flex-col justify-center items-center gap-10">
		<h1 class="font-serif text-7xl">Welcome</h1>

		<form method="post" use:enhance class="flex flex-col gap-5">
			<span class="flex flex-col justify-center items-start">
				<label for="username">Email Address:</label>
				<input
					class="p-1 w-72 text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
					id="username"
					type="text"
					name="username" />
			</span>

			<span class="flex flex-col justify-center items-start">
				<label for="password">Password:</label>
				<input
					class="p-1 w-72 text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
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
						class="w-72 h-12 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300"
						type="submit">
						Login
					</button>
				</section>

				<a
					class="w-72 h-12 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300"
					href="/signup">
					Join
				</a>
			</div>
		</form>

		{#if $page.status == 500}
			<span
				class="w-full px-5 py-2 h-fit border-2 rounded-md border-red-500 bg-red-300/50 dark:bg-red-700/50 flex flex-row gap-2 justify-center items-center dark:text-white text-black">
				<XCircle size={32} /> Something went wrong! Please try again.
			</span>
		{/if}
		{#if $page.status == 400}
			<span
				class="w-full px-2 py-2 h-fit border-2 rounded-md border-yellow-500 bg-yellow-300/50 dark:bg-yellow-700/50 flex flex-row gap-2 justify-center items-center dark:text-white text-black">
				<XCircle size={32} /> Incorrect username or password. Please try again!
			</span>
		{/if}
	</div>
</div>
