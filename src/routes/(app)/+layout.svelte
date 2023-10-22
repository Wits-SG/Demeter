<script lang="ts">
	import { Icon } from 'flowbite-svelte-icons';
	import type { LayoutData } from './$types';
	import PageNav from '$lib/components/navigation/page_nav.svelte';
	import AddNav from '$lib/components/navigation/add_nav.svelte';
	import ROTD from '$lib/components/recipe_of_the_day.svelte';

	import * as Avatar from '$lib/components/ui/avatar';
	import { userInfo, userSignedIn } from '$lib/stores/user.store';

	export let data: LayoutData;
</script>

<main class="grid grid-cols-1 grid-rows-[90px_1fr] h-full w-full overflow-x-hidden">
	<div
		class="row-start-1 row-span-1 sticky top-0 w-full h-full flex justify-center items-center bg-zinc-100 dark:bg-zinc-800 backdrop-blur-3xl z-40">
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
				<ROTD />
				<a href="/settings" class="p-1 h-fit w-fit bg-zinc-200 rounded-lg"
					><Icon name="cog-outline" class="h-6 w-6" /></a>
				<a href="/search" class="p-1 h-fit w-fit bg-zinc-200 rounded-lg"
					><Icon name="search-outline" class="h-6 w-6" /></a>
				{#if data.userSignedIn}
					<a class="h-fit w-fit" href="/profile/{data.userId}">
						<Avatar.Root>
							<Avatar.Image src={data.pictureUrl} alt="User Icon" />
							<Avatar.Fallback>
								<Icon name="user-outline" class="text-white w-10 h-10" />
							</Avatar.Fallback>
						</Avatar.Root>
					</a>
				{:else}
					<a
						href="/login"
						class="h-10 w-20 rounded-lg bg-emerald-700 flex justify-center items-center text-white"
						>Login</a>
				{/if}
			</section>
		</nav>
	</div>
	<div class="row-start-2 row-span-1 col-span-1"><slot /></div>
</main>
