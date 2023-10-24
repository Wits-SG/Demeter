<script lang="ts">
	import PostPreview from '$lib/components/posts/post_preview.svelte';
	//@ts-ignore
	import Masonry from 'svelte-bricks';
	import { Icon } from 'flowbite-svelte-icons';
	import IntersectionObserver from 'svelte-intersection-observer';
	import { getElementByMeltId } from '@melt-ui/svelte/internal/helpers';
	import { list } from 'firebase/storage';

	let itemsList: Array<{ id: string; type: number }>;
	let items: Array<{ id: string; type: number }>;
	itemsList = [];
	$: items = itemsList;
	let [minColWidth, maxColWidth, gap] = [280, 350, 30];
	let width: number;
	let height: number;
	let element: any;
	let pageNumber: number = 0;
	let tempRecipeList: any;
	let tempPosts: any;
	let tempItems;

	let searchValue: string = '';

	const Search = async (pageNum: Number, searchValue: string) => {
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
		on:click={async () => {
			pageNumber = 0;
			items = [];
			tempRecipeList = await Search(pageNumber, searchValue);
			tempItems = tempRecipeList.recipes;
			itemsList = tempItems;
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
				<PostPreview postID={item.id} postType={item.type} />
			</Masonry>
			<IntersectionObserver
				{element}
				on:intersect={async () => {
					pageNumber = pageNumber + 5;
					tempPosts = await Search(pageNumber, searchValue);
					tempItems = tempPosts.recipes;
					itemsList = [...itemsList, ...tempItems];
				}}>
				<div bind:this={element} />
			</IntersectionObserver>
		</div>
	</div>
{/if}
