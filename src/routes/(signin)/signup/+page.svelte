<script lang="ts">
	import { slide, fade } from 'svelte/transition';
	import { quartOut } from 'svelte/easing';

	let email: String;
	let password_first: String = '';
	let password_second: String = '';

	let join_enabled: boolean = false;

	$: {
		join_enabled = !(password_first == password_second && password_first != '' && email != '');
	}

	const join_on_press = () => {
		console.log(email, password_first, password_second);
	};
</script>

<div
	class="bg-zinc-100 dark:bg-zinc-800 w-2/3 h-screen -skew-x-6 -translate-x-20 border-r-8 border-emerald-500 flex flex-col justify-center items-center">
	<div class="skew-x-6 translate-x-8 flex flex-col justify-center items-center gap-10">
		<h1 class="font-serif text-7xl">Sign Up</h1>
		<a
			class="text-emerald-700 dark:text-emerald-300 underline hover:text-emerald-900 dark:hover:text-emerald-100"
			href="/login">
			Already have an account?
		</a>
	</div>
</div>
