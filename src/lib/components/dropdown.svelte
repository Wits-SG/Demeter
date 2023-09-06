<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import { Icon } from 'flowbite-svelte-icons';

	interface Cookbook {
		name: string;
		iconName: string;
	}

	const Cookbooks: Array<Cookbook> = [{ name: 'Cookbook 1', iconName: 'book-outline' }];

	let currentCookbook: Cookbook = Cookbooks[0];

	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu({ forceVisible: true });

	export let recipeID: string = '';
	let cookbookData: any;

	const getCookbookData = async () => {
		try {
			const cookbook_res = await fetch(`/api/dropdown?recipe=${recipeID}`, { method: 'GET' });

			const cookbook_data: JSON = await cookbook_res.json();
			return cookbook_data;
		} catch (error) {
			console.log('error occured in fetch');
		}
	};

	let cookbookName = 'None';
	$: recipeID && refreshRecipe();

	const refreshRecipe = async () => {
		cookbookData = await getCookbookData();
		cookbookName = cookbookData.cookbooks.name;
	};
	console.log(cookbookName);
</script>

<button
	use:melt={$trigger}
	class="h-8 w-64 min-w-fit rounded-lg bg-zinc-200 flex justify-center items-center gap-5 text-lg p-2">
	<Icon name={currentCookbook.iconName} class="h-6 w-6 text-zinc-900" />
	<p class="text-zinc-900">{currentCookbook.name}</p>
	<Icon name="angle-down-outline" class="h-6 w-6 text-zinc-900" />
</button>

{#if $open}
	<div
		class="bg-zinc-200 h-fit w-64 dark:text-black p-2 flex flex-col justify-center items-start rounded-lg gap-3"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -10 }}>
		{#each Cookbooks as Cookbook}
			<button
				class="flex flex-row justify-center items-center gap-5"
				use:melt={$item}
				on:click={() => {
					currentCookbook = Cookbook;
					//goto(navPage.href);
				}}><Icon name={Cookbook.iconName} class="h-6 w-6" /> {Cookbook.name}</button>
		{/each}
	</div>
{/if}
