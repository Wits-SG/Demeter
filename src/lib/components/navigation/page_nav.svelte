<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { Icon } from 'flowbite-svelte-icons';

	interface NavPage {
		name: string;
		href: string;
		iconName: string;
	}

	const navPages: Array<NavPage> = [
		{ name: 'Home', href: '/', iconName: 'home-outline' },
		{ name: 'Cookbook', href: '/cookbook', iconName: 'book-outline' }
	];
	let currentNavPage: NavPage = navPages[0];

	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({ forceVisible: true });
</script>

<button
	use:melt={$trigger}
	class="h-8 w-64 min-w-fit rounded-lg bg-zinc-200 flex justify-between items-center gap-5 text-lg p-2">
	<Icon name={currentNavPage.iconName} class="h-6 w-6" />
	<p>{currentNavPage.name}</p>
	<Icon name="angle-down-outline" class="h-6 w-6" />
</button>
{#if $open}
	<div
		class="bg-zinc-200 h-fit w-64 dark:text-black p-2 flex flex-col justify-center items-start rounded-lg gap-3 z-50"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -10 }}>
		{#each navPages as navPage}
			<button
				class="flex flex-row justify-center items-center gap-5"
				use:melt={$item}
				on:click={() => {
					currentNavPage = navPage;
					goto(navPage.href);
				}}><Icon name={navPage.iconName} class="h-6 w-6" /> {navPage.name}</button>
		{/each}
	</div>
{/if}
