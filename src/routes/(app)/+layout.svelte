<script lang="ts">
	import TopBar from '$lib/components/top_bar.svelte';
	import { createCombobox, melt, type ComboboxFilterFunction } from '@melt-ui/svelte';
	import { Icon } from 'flowbite-svelte-icons';

	interface NavPage {
		displayName: string;
		href: string;
	}

	let navPages: Array<NavPage> = [
		{ displayName: 'Home', href: '/' },
		{ displayName: 'Explore', href: '/explore' },
		{ displayName: 'Cookbook', href: '/cookbook' }
	];

	const filterFunction: ComboboxFilterFunction<NavPage> = ({ itemValue, input }) => {
		return true;
	};

	const {
		elements: { input, item, menu },
		states: { open },
		helpers: { isSelected }
	} = createCombobox({
		filterFunction,
		forceVisible: true,
		items: navPages
	});
</script>

<main class="grid grid-cols-1 grid-rows-[90px_1fr] h-full w-full overflow-x-hidden">
	<div
		class="row-start-1 row-span-1 sticky top-0 w-full h-full flex justify-center items-center bg-zinc-100 dark:bg-zinc-800 backdrop-blur-3xl">
		<nav
			class="h-full w-full flex flex-row items-center gap-2 justify-center rounded-b-md bg-zinc-500 px-5 backdrop-blur-md backdrop-opacity-5">
			<div class="h-2/3 w-20 rounded-lg bg-emerald-500 flex justify-center items-center">
				<Icon name="swatchbook-outline" class="p-2 w-full h-full text-zinc-500" />
			</div>

			<input
				use:melt={$input}
				class="flex h-1/3 w-64 min-w-fit max-w-full items-center justify-center gap-0 rounded-md bg-zinc-300 hover:bg-zinc-200" />
			{#if $open}
				<ul use:melt={$menu}>
					{#each navPages as navPage}
						<li
							use:melt={$item({
								value: navPage.href,
								label: navPage.displayName,
								disabled: true
							})}>
							{navPage.displayName}
						</li>
					{/each}
				</ul>
			{/if}
		</nav>
	</div>
	<div class="row-start-2 row-span-1 col-span-1"><slot /></div>
</main>
