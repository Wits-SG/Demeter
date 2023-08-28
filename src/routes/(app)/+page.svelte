<script lang="ts">
	import type { PageData } from './$types';
	import RecipePreview from '$lib/components/recipe_preview.svelte';
	import Masonry from 'svelte-bricks';
	import { Toggle } from 'flowbite-svelte';

	export let data: PageData;
	let items = data.recipes;
	let [minColWidth, maxColWidth, gap] = [280, 350, 20];
	let width: number;
	let height: number;
	let listView: boolean = false;
	const handleClick = () => {
		listView = !listView;
	};
</script>

<!--Masonry size: <span>{width}px</span> &times; <span>{height}px</span> (w &times;h)-->
<div class="py-2 px-10 flex flex-row content-center justify-end">
	<Toggle checked={listView} on:click={handleClick}>List View</Toggle>
</div>
<div class="flex justify-center">
	{#if !listView}
		<div class="p-10 md:w-3/5">
			<Masonry
				{items}
				{minColWidth}
				{maxColWidth}
				{gap}
				let:item
				bind:masonryWidth={width}
				bind:masonryHeight={height}>
				<RecipePreview recipeID={item} />
			</Masonry>
		</div>
	{:else}
		<div class="p-10 w-3/4 sm:w-3/6 md:w-2/5 lg:4/6 gap-20 flex flex-col justify-center">
			{#each items as item}
				<RecipePreview recipeID={item} />
			{/each}
		</div>
	{/if}
</div>
