<script lang="ts">
	import type { PageData } from './$types';
	import PostPreview from '$lib/components/posts/post_preview.svelte';
	//@ts-ignore
	import Masonry from 'svelte-bricks';
	import { Icon } from 'flowbite-svelte-icons';
	import IntersectionObserver from 'svelte-intersection-observer';
	import AddNav from '$lib/components/navigation/add_nav.svelte';

	export let data: PageData;
	let itemsList: Array<{ id: string; type: number }>;
	itemsList = data.posts;
	let items: Array<{ id: string; type: number }>;
	$: items = itemsList;
	let [minColWidth, maxColWidth, gap] = [280, 350, 30];
	let width: number;
	let height: number;
	let listView: boolean = false;
	let listIconName: String = 'list-outline';
	let gridIconName: String = 'grid-solid';
	let element: any;
	let intersecting;
	let pageNumber: number = 10;
	let tempPosts: any;
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
				console.log(tempItems[i]);
				{maxColWidth}
				{gap}
				let:item
				bind:masonryHeight={height}
				bind:masonryWidth={width}>
				<PostPreview postID={item.id} postType={item.type} />
			</Masonry>
			<IntersectionObserver
				{element}
				on:intersect={async (e) => {
					tempPosts = await getMorePosts(pageNumber);
					tempItems = tempPosts.posts;
					itemsList = [...itemsList, ...tempItems];
					pageNumber = pageNumber + 5;
				}}>
				<div bind:this={element} />
			</IntersectionObserver>
		</div>
	{:else}
		<div class="p-8 w-3/4 sm:w-3/6 md:w-2/5 lg:4/6 gap-20 flex flex-col justify-center">
			{#each itemsList as item}
				<PostPreview postID={item.id} postType={item.type} />
			{/each}
			<IntersectionObserver
				{element}
				on:intersect={async (e) => {
					tempPosts = await getMorePosts(pageNumber);
					tempItems = tempPosts.posts;
					itemsList = [...itemsList, ...tempItems];
					pageNumber = pageNumber + 5;
				}}>
				<div bind:this={element} />
			</IntersectionObserver>
		</div>
	{/if}
</div>
