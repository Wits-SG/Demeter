<script lang="ts">
	import PostPreview from '$lib/components/posts/post_preview.svelte';
	//@ts-ignore
	import Masonry from 'svelte-bricks';
	import { Search } from 'lucide-svelte';
	import IntersectionObserver from 'svelte-intersection-observer';

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

	const getSearch = async (pageNum: Number, searchValue: string) => {
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

<div class=" p-10 flex flex-row justify-center justify-items-center items-center gap-5">
	<input
		class="p-2 text-black h-8 w-64 min-w-fit rounded-lg bg-neutral-200 flex justify-center items-center outline-none focus:outline-2 focus:outline-emerald-500 text-lg"
		type="search"
		placeholder="search"
		name="q"
		bind:value={searchValue}
		id="search"
		on:keydown={async (event) => {
			if (event.key == 'Enter') {
				pageNumber = 0;
				items = [];
				tempRecipeList = await getSearch(pageNumber, searchValue);
				tempItems = tempRecipeList.recipes;
				itemsList = tempItems;
			}
		}} />
	<button
		class="dark:bg-neutral-700 bg-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-300 p-2 rounded-lg"
		on:click={async () => {
			pageNumber = 0;
			items = [];
			tempRecipeList = await getSearch(pageNumber, searchValue);
			tempItems = tempRecipeList.recipes;
			itemsList = tempItems;
		}}>
		<Search size={20} />
	</button>
</div>

{#if items.length != 0}
	<div class="flex justify-center h-fit w-full max-h-[70vh]">
		<div class="p-8 md:w-4/5 z-0 overflow-y-auto">
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
					tempPosts = await getSearch(pageNumber, searchValue);
					tempItems = tempPosts.recipes;
					itemsList = [...itemsList, ...tempItems];
				}}>
				<hr class="w-full border-white" bind:this={element} />
			</IntersectionObserver>
		</div>
	</div>
{/if}
