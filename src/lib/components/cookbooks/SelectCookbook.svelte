<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import { Icon } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { userInfo } from '$lib/stores/user.store';

	let userId = $userInfo.userId;
	let cookbooks: Array<{ name: string; cookbook_id: string }> = [];
	export let selectedCookbook: { name: string; cookbook_id: string } = {
		name: '',
		cookbook_id: ''
	};

	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({ forceVisible: true });

	// Execute this code when the component is loaded into the DOM
	onMount(async () => {
		const fetchResult = await fetch(`/api/cookbook?user_id=${userId}`);
		cookbooks = await fetchResult.json();
		if (cookbooks.length > 1) {
			selectedCookbook = cookbooks[0];
		}
	});
</script>

{#if cookbooks.length > 0}
	<button
		use:melt={$trigger}
		class="h-8 w-64 min-w-fit rounded-lg bg-zinc-200 flex justify-center items-center gap-5 text-lg p-2 hover:bg-zinc-400">
		<Icon name="book-outline" class="h-5 w-5 text-green-700" />
		<p class="text-zinc-900">{selectedCookbook.name}</p>
		<Icon name="angle-down-outline" class="h-4 w-4 text-zinc-900" />
	</button>

	{#if $open}
		<div
			class="bg-zinc-200 h-fit w-64 dark:text-black p-2 flex flex-col justify-center items-start rounded-lg gap-3"
			use:melt={$menu}
			transition:fly={{ duration: 150, y: -10 }}>
			{#each cookbooks as cookbook}
				<button
					class="flex flex-row justify-center items-center gap-5"
					use:melt={$item}
					on:click={() => {
						selectedCookbook = cookbook;
					}}
					><Icon name="book-outline" class=" text-green-700 h-5 w-5" />
					{cookbook.name}</button>
			{/each}
		</div>
	{/if}
{:else}
	<p class="flex flex-row w-2/3 justify-center items-center text-black">
		You don't have any cookbooks! Consider making one in Collections?
	</p>
{/if}
