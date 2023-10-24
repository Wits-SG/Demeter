<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div
	class="bg-zinc-100 dark:bg-zinc-800 w-2/3 h-full min-w-fit -skew-x-6 -translate-x-20 border-r-8 border-emerald-500 flex flex-col justify-center items-center">
	<div class="skew-x-6 translate-x-8 flex flex-col justify-center items-center gap-5 min-w-full">
		<h1 class="font-serif text-7xl">Sign Up</h1>

		<form method="post" use:enhance class="gap-2 flex flex-col items-center justify-center">
			<span class="flex flex-col justify-center items-start">
				<label for="username">Email Address:</label>
				<input
					class="p-1 w-64 text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
					type="text"
					id="username"
					name="username" />
			</span>

			<span class="flex flex-col justify-center items-start">
				<label for="password">Enter password:</label>
				<input
					class="p-1 w-64 text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
					type="password"
					id="password"
					name="password" />
			</span>

			<div class="flex flex-col justify-center items-center gap-5">
				<button
					class="w-72 h-12 rounded-md bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-600 disabled:opacity-50"
					type="submit">Sign Up</button>
				<a
					class="text-emerald-700 dark:text-emerald-300 underline hover:text-emerald-900 dark:hover:text-emerald-100"
					href="/login">
					Already have an account?
				</a>
			</div>
		</form>
	</div>
</div>
