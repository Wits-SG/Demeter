<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	// import { Icon } from 'flowbite-svelte-icons';
	import { Plus } from 'lucide-svelte';

	interface AddNav {
		name: string;
		href: string;
	}

	const addPages: Array<AddNav> = [
		{ name: 'Create new recipe', href: '/recipe/new' },
		{ name: 'Create new picture', href: '/picture/new' }
	];

	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({ forceVisible: true });
</script>

<button
	use:melt={$trigger}
	class="h-9 items-center justify-center flex flex-row gap-1 rounded-lg border-2 border-emerald-500 dark:bg-emerald-700 bg-emerald-100 p-2 dark:hover:bg-emerald-800 hover:bg-emerald-300">
	<Plus /> New Post
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
