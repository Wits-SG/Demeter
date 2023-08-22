<script lang="ts">
	import { goto } from '$app/navigation';
	import { sendPasswordResetEmail } from 'firebase/auth';
	import { fb_auth } from '$lib/firebase';

	let email: string;

	let unknownError = false;

	const passwordResetPress = async () => {
		try {
			const resetRes = await sendPasswordResetEmail(fb_auth, email);
		} catch (exception: any) {
			unknownError = true;
		}
	};
</script>

<div
	class="bg-zinc-100 dark:bg-zinc-800 w-1/3 h-screen -skew-x-6 -translate-x-20 border-r-8 border-emerald-500 flex flex-col justify-center items-center">
	<div class="skew-x-6 translate-x-8 flex flex-col justify-center items-center gap-10">
		{#if unknownError}
			<span class="text-md bg-red-200 text-red-600 p-2 rounded-md"
				><p>Something went wrong. Please try again later.</p></span>
		{/if}

		<span class="flex flex-col justify-center items-start">
			<label for="email">Please enter your email address</label>
			<input
				class="p-1 w-64 text-black rounded-md focuse:outline-none focus:outline-2 focus:outline-emerald-500"
				type="email"
				bind:value={email}
				name="email" />
		</span>

		<button
			class="w-72 h-12 rounded-md bg-emerald-500 hover:bg-emerald-400 dark:hover:bg-emerald-600"
			on:click={passwordResetPress}>
			Send password reset
		</button>
	</div>
</div>
