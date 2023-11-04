<script lang="ts">
	import { Home, BookMarked, Search, User2, Salad, SunMoon } from 'lucide-svelte';
	import type { LayoutData } from './$types';
	import AddNav from '$lib/components/navigation/add_nav.svelte';
	import ROTD from '$lib/components/recipe_of_the_day.svelte';

	import * as Avatar from '$lib/components/ui/avatar';
	import { userInfo, userSignedIn } from '$lib/stores/user.store';
	import { onMount } from 'svelte';

	export let data: LayoutData;

	$userSignedIn = data.userSignedIn;
	$userInfo.userId = data.userId ? data.userId : '';
	$userInfo.pictureUrl = data.pictureUrl ? data.pictureUrl : '';

	onMount(() => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(preferes-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});

	const darkClick = () => {
		if (localStorage.theme === 'dark' || !('theme' in localStorage)) {
			localStorage.theme = 'light';
		} else if (localStorage.theme === 'light' || !('theme' in localStorage)) {
			localStorage.theme = 'dark';
		}

		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(preferes-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};
</script>

<main class="grid grid-cols-1 grid-rows-[90px_1fr] h-full w-full overflow-hidden">
	<div
		class="row-start-1 row-span-1 sticky top-0 w-full h-full flex justify-center items-center bg-zinc-100 dark:bg-neutral-800 border-b-2 border-emerald-500 z-40 p-2">
		<nav
			class="w-full h-full flex flex-row justify-start items-center gap-3 dark:text-white text-black">
			<a
				href="/"
				class="w-16 h-16 rounded-full border-2 border-black bg-white text-black flex justify-center items-center"
				><Salad size="48" /></a>

			<a
				href="/"
				class="h-9 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300"
				><Home /> Home</a>
			{#if data.userSignedIn}
				<a
					href="/collections/cookbooks/"
					class="h-9 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300"
					><BookMarked />Collections</a>
			{/if}
			<a
				href="/search/"
				class="h-9 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300"
				><Search /> Search</a>
			{#if data.userSignedIn}
				<AddNav />
			{/if}
		</nav>

		<section
			class="w-full h-full flex flex-row justify-end items-center gap-3 dark:text-white text-black">
			<ROTD />
			<button
				on:click={darkClick}
				class="h-9 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300">
				<SunMoon />
			</button>
			{#if data.userSignedIn}
				<a href="/profile/{data.userId}/">
					<Avatar.Root>
						<Avatar.Image src={data.pictureUrl} />
						<Avatar.Fallback>
							<div
								class="w-16 h-16 rounded-full border-2 border-emerald-500 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-900 flex items-center justify-center">
								<User2 size={48} />
							</div>
						</Avatar.Fallback>
					</Avatar.Root>
				</a>
			{:else}
				<a
					href="/login/"
					class="h-9 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300"
					>Login</a>
			{/if}
		</section>
	</div>
	<div class="row-start-2 row-span-1 col-span-1"><slot /></div>
</main>
