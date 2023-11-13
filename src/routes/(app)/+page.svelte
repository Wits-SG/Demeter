<script lang="ts">
	import type { PageData } from './$types';
	import PostPreview from '$lib/components/previews/post_preview.svelte';
	//@ts-ignore
	import Masonry from 'svelte-bricks';
	import IntersectionObserver from 'svelte-intersection-observer';

	import { LayoutList, LayoutGrid } from 'lucide-svelte';

	export let data: PageData;
	let itemsList: Array<{ id: string; type: number }>;
	itemsList = data.posts;
	let items: Array<{ id: string; type: number }>;
	$: items = itemsList;
	let [minColWidth, maxColWidth, gap] = [280, 350, 30];
	let width: number;
	let height: number;
	let listView: boolean = false;
	let element: any;
	let pageNumber: number = 10;
	let tempPosts: any;
	let tempItems;

	const getMorePosts = async (pageNum: number) => {
		try {
			let strPageNum: string = pageNum.toString();
			const postIDs = await fetch(`/?page_num=${strPageNum}`, {
				method: 'GET'
			});

			const post_ids: JSON = await postIDs.json();
			return post_ids;
		} catch (recipePreview_err: any) {
			console.error('Failed to fetch next page');
		}
	};

	let itemsDiv: HTMLDivElement;
	let gridButton: HTMLButtonElement;
	let listButton: HTMLButtonElement;
</script>

<div class="w-full min-h-full flex flex-row justify-center items-start overflow-hidden gap-5 p-5">
	<div class="w-72 flex flex-col items-start justify-center gap-4">
		<section class="w-full h-fit flex flex-row justify-evenly items-center">
			<button
				bind:this={gridButton}
				on:click={() => {
					listView = false;
					listButton.classList.remove('border-b-2');
					gridButton.classList.add('border-b-2');
					itemsDiv.classList.add('w-4/5');
					itemsDiv.classList.remove('w-2/5');
				}}
				class="flex flex-row justify-start items-center gap-3 border-b-2 border-emerald-500"
				><LayoutGrid size="32" /> Grid</button>
			<button
				bind:this={listButton}
				on:click={() => {
					listView = true;
					listButton.classList.add('border-b-2');
					gridButton.classList.remove('border-b-2');
					itemsDiv.classList.remove('w-4/5');
					itemsDiv.classList.add('w-2/5');
				}}
				class="flex flex-row justify-start items-center gap-3 border-emerald-500"
				><LayoutList size="32" /> List</button>
		</section>
	</div>

	<div class="flex flex-col justify-center items-center h-full max-h-[85vh] w-full">
		<div class="w-full px-10 z-0 overflow-y-auto flex flex-col gap-5" bind:this={itemsDiv}>
			{#if !listView}
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
			{:else}
				{#each items as item}
					<PostPreview postID={item.id} postType={item.type} />
				{/each}
			{/if}
			<!--
				The intersection observer is apart of this div. This is because this div needs to be scrollable
				else the top few posts are cut off and not visible at all (can't scroll to them)
			-->
			<IntersectionObserver
				{element}
				on:intersect={async (e) => {
					tempPosts = await getMorePosts(pageNumber);
					tempItems = tempPosts.posts;
					itemsList = [...itemsList, ...tempItems];
					pageNumber = pageNumber + 5;
				}}>
				<hr class="w-full border-white" bind:this={element} />
			</IntersectionObserver>
		</div>
	</div>
</div>
