<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { Icon } from 'flowbite-svelte-icons';

	interface AddNav {
		name: string;
		href: string;
	}

	const addPages: Array<AddNav> = [{ name: 'Create new recipe', href: '/recipe/new' }];

	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({ forceVisible: true });
</script>

<button use:melt={$trigger} class="p-1 h-fit w-fit bg-zinc-200 rounded-lg">
	<Icon name="plus-outline" class="h-6 w-6 " />
</button>

{#if $open}
	<div
		class="bg-zinc-200 h-fit w-fit dark:text-black p-2 flex flex-col justify-center items-center rounded-lg gap-3 z-50"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -10 }}>
		{#each addPages as addPage}
			<button
				class="flex flex-row justify-center items-center gap-5"
				use:melt={$item}
				on:click={() => {
					goto(addPage.href);
				}}>{addPage.name}</button>
		{/each}
	</div>
{/if}
