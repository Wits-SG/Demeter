<script lang="ts">
	import { Icon } from 'flowbite-svelte-icons';
	import PageNav from '$lib/components/navigation/page_nav.svelte';
	import AddNav from '$lib/components/navigation/add_nav.svelte';
</script>

<main class="grid grid-cols-1 grid-rows-[90px_1fr] h-full w-full overflow-x-hidden">
	<div
		class="row-start-1 row-span-1 sticky top-0 w-full h-full flex justify-center items-center bg-zinc-100 dark:bg-zinc-800 backdrop-blur-3xl">
		<nav
			class="h-full w-full flex flex-row items-center gap-2 justify-between rounded-b-md bg-zinc-500 px-5 backdrop-blur-md backdrop-opacity-5 dark:text-black">
			<section class="h-full w-full flex flex-row justify-start items-center gap-5">
				<a
					href="/"
					class="h-2/3 w-20 rounded-lg bg-emerald-500 flex justify-center items-center"
					><Icon name="atom-outline" class="text-white w-12 h-12" /></a>
				<PageNav />
				<AddNav />
			</section>

			<section class="h-full w-full flex flex-row justify-end items-center gap-5">
				<a href="/settings" class="p-1 h-fit w-fit bg-zinc-200 rounded-lg"
					><Icon name="cog-outline" class="h-6 w-6" /></a>
				<input
					class="h-8 w-64 min-w-fit rounded-lg bg-zinc-200 flex justify-center items-center p-1 outline-none focus:outline-2 focus:outline-emerald-500"
					type="search"
					placeholder="search" />
				<div class="h-16 w-16 rounded-full bg-emerald-700 flex justify-center items-center">
					<Icon name="user-outline" class="text-white w-10 h-10" />
				</div>
			</section>
		</nav>
	</div>
	<div class="row-start-2 row-span-1 col-span-1"><slot /></div>
</main>
