<script lang="ts">
	import type { PageData } from './$types';
	import RecipePreview from '$lib/components/recipe_preview.svelte';
	//@ts-ignore
	import Masonry from 'svelte-bricks';
	import { Icon } from 'flowbite-svelte-icons';

	export let data: PageData;
	let items = data.recipes;
	let [minColWidth, maxColWidth, gap] = [280, 350, 30];
	let width: number;
	let height: number;
	let listView: boolean = false;
	let listIconName: String = 'list-outline';
	let gridIconName: String = 'grid-solid';
	const handleClick = () => {
		listView = !listView;
		if (listView) {
			listIconName = 'rectangle-list-outline';
			gridIconName = 'grid-outline';
		} else {
			listIconName = 'list-outline';
			gridIconName = 'grid-solid';
		}
	};
</script>

<div class="py-4 px-10 flex flex-row content-center items-center justify-end gap-4">
	<Icon name={gridIconName} class="h-4 w-4" on:click={handleClick} />
	<Icon name={listIconName} class="h-6 w-6" on:click={handleClick} />
</div>
<div class="flex justify-center h-fit w-full">
	{#if !listView}
		<div class="p-8 md:w-4/5 -z-10">
			<Masonry
				{items}
				{minColWidth}
				{maxColWidth}
				{gap}
				let:item
				bind:masonryHeight={height}
				bind:masonryWidth={width}>
				<RecipePreview recipeID={item} />
			</Masonry>
		</div>
	{:else}
		<div class="p-8 w-3/4 sm:w-3/6 md:w-2/5 lg:4/6 gap-20 flex flex-col justify-center">
			{#each items as item}
				<RecipePreview recipeID={item} />
			{/each}
		</div>
	{/if}
</div>
