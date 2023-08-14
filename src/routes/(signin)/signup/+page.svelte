<script lang="ts">
	let email: string;
	let password_first: string = '';
	let password_second: string = '';

	let passwords_match: boolean = false;
	let passwords_invalid: boolean = false;
	$: passwords_match = password_first != '' && password_second != password_first;
	$: passwords_invalid = password_first.length < 8;
</script>

<div
	class="bg-zinc-100 dark:bg-zinc-800 w-2/3 h-full min-w-fit -skew-x-6 -translate-x-20 border-r-8 border-emerald-500 flex flex-col justify-center items-center">
	<div class="skew-x-6 translate-x-8 flex flex-col justify-center items-center gap-5 min-w-full">
		<h1 class="font-serif text-7xl">Sign Up</h1>

		<span class="flex flex-col justify-center items-start">
			<label for="email">Email Address:</label>
			<input
				class="p-1 w-64 text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
				type="email"
				bind:value={email}
				name="email" />
		</span>

		<span class="flex flex-col justify-center items-start">
			<label for="password_1">Enter password:</label>
			<input
				class="p-1 w-64 text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
				type="password"
				bind:value={password_first}
				name="password_1" />
		</span>

		<span class="flex flex-col justify-center items-start">
			<label for="password_2">Reenter password:</label>
			<input
				class="p-1 w-64 text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
				type="password"
				bind:value={password_second}
				name="password_2" />
		</span>

		{#if passwords_match}
			<span class="text-md bg-yellow-200 text-yellow-800 p-2 rounded-md">
				<p>Passwords don't match</p>
			</span>
		{/if}
		{#if passwords_invalid}
			<div class="text-md bg-yellow-200 text-yellow-800 p-2 rounded-md">
				<p>Passwords must meet the following requirements:</p>
				<ol class="list-disc list-inside">
					<li>Must be more than 8 characters long</li>
				</ol>
			</div>
		{/if}

		<div class="flex flex-col justify-center items-center gap-5">
			<a
				class="text-emerald-700 dark:text-emerald-300 underline hover:text-emerald-900 dark:hover:text-emerald-100"
				href="/login">
				Already have an account?
			</a>
			<button
				class="w-72 h-12 rounded-md bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-600 disabled:opacity-50"
				disabled={passwords_match && passwords_invalid}>Sign Up</button>
		</div>
	</div>
</div>
