<script lang="ts">
	import RecipePreview from '$lib/components/recipe_preview.svelte';
	//@ts-ignore
	import Masonry from 'svelte-bricks';
	import { Icon } from 'flowbite-svelte-icons';
	import IntersectionObserver from 'svelte-intersection-observer';
	import { getElementByMeltId } from '@melt-ui/svelte/internal/helpers';
	import { list } from 'firebase/storage';

	let itemsList: any[] = [];
	$: items = itemsList;
	let [minColWidth, maxColWidth, gap] = [280, 350, 30];
	let width: number;
	let height: number;
	let element: any;
	let pageNumber: number = 10;
	let tempRecipeList: any;
	let tempItems;

	let searchValue: string = '';

	const Search = async (pageNum: Number, searchValue: string, e?: any) => {
		try {
			let strPageNum: string = pageNum.toString();
			const recipeIDs = await fetch(
				`/search?search_value=${searchValue}&page_num=${strPageNum}`,
				{
					method: 'GET'
				}
			);
			const recipe_ids: JSON = await recipeIDs.json();
			return recipe_ids;
		} catch (recipePreview_err: any) {
			console.error('Failed to fetch next page');
		}
	};
</script>

<div class=" p-10 flex flex-row justify-center justify-items-center items-center">
	<input
		class="p-2 text-black h-8 w-64 min-w-fit rounded-lg bg-zinc-200 flex justify-center items-center p-1 outline-none focus:outline-2 focus:outline-emerald-500"
		type="search"
		placeholder="search"
		name="q"
		bind:value={searchValue}
		id="search" />
	<Icon
		name="search-outline"
		class="h-6 w-6 p-1"
		on:click={async (e) => {
			pageNumber = 0;
			items = [];
			tempRecipeList = await Search(pageNumber, searchValue, e);
			tempItems = tempRecipeList.recipes;
			itemsList = tempItems;
			pageNumber = pageNumber + 10;
		}} />
</div>

{#if items.length != 0}
	<div class="flex justify-center h-fit w-full">
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
					pageNumber = pageNumber + 10;
					tempRecipeList = await Search(pageNumber, searchValue, e);
					tempItems = tempRecipeList.recipes;
					for (let i = 0; i < itemsList.length; i++) {
						for (let z = 0; z < tempItems.length; z++) {
							if (itemsList[i] != tempItems[z]) {
								itemsList.push(tempItems[z]);
							}
						}
					}
				}}>
				<div bind:this={element} />
			</IntersectionObserver>
		</div>
	</div>
{/if}
