<script lang="ts">
	import type { PageData } from './$types';
	import RecipePreview from '$lib/components/recipe_preview.svelte';
	//@ts-ignore
	import Masonry from 'svelte-bricks';
	import { Icon } from 'flowbite-svelte-icons';
	import IntersectionObserver from 'svelte-intersection-observer';

	export let data: PageData;
	let itemsList: any[];
	itemsList = data.recipes;
	$: items = itemsList;
	//$: indices = [...Array(nItems).keys()]
	let [minColWidth, maxColWidth, gap] = [280, 350, 30];
	let width: number;
	let height: number;
	let listView: boolean = false;
	let listIconName: String = 'list-outline';
	let gridIconName: String = 'grid-solid';
	let element: any;
	let intersecting;
	let pageNumber: number = 10;
	let tempRecipeList: any;
	let tempItems;

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

	const getMorePosts = async (pageNum: Number) => {
		try {
			let strPageNum: string = pageNum.toString();
			const recipeIDs = await fetch(`/?page_num=${strPageNum}`, {
				method: 'GET'
			});

			const recipe_ids: JSON = await recipeIDs.json();
			//console.log(recipe_data);
			return recipe_ids;
		} catch (recipePreview_err: any) {
			console.log('error occured in fetch');
		}
	};
</script>

<div class="py-4 px-10 flex flex-row content-center items-center justify-end gap-4">
	<Icon name={gridIconName} class="h-4 w-4" on:click={handleClick} />
	<Icon name={listIconName} class="h-6 w-6" on:click={handleClick} />
</div>

<div class="flex justify-center h-fit w-full">
	{#if !listView}
		<div class="p-8 md:w-4/5 z-0">
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
			<IntersectionObserver
				{element}
				on:intersect={async (e) => {
					console.log('reached the bottom');
					tempRecipeList = await getMorePosts(pageNumber);
					tempItems = tempRecipeList.recipes;
					itemsList = [...itemsList, ...tempItems];
					pageNumber = pageNumber + 5;
				}}>
				<div bind:this={element} />
			</IntersectionObserver>
		</div>
	{:else}
		<div class="p-8 w-3/4 sm:w-3/6 md:w-2/5 lg:4/6 gap-20 flex flex-col justify-center">
			{#each itemsList as item}
				<RecipePreview recipeID={item} />
			{/each}
			<IntersectionObserver
				{element}
				on:intersect={async (e) => {
					console.log('reached the bottom');
					tempRecipeList = await getMorePosts(pageNumber);
					tempItems = tempRecipeList.recipes;
					itemsList = [...itemsList, ...tempItems];
					pageNumber = pageNumber + 5;
				}}>
				<div bind:this={element} />
			</IntersectionObserver>
		</div>
	{/if}
</div>
