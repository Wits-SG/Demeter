<script lang="ts">
	import { userInfo, userSignedIn } from '$lib/stores/user.store';
	import type { PageData } from './$types';
	import { fb_auth } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import PostPreview from '$lib/components/posts/post_preview.svelte';
	//@ts-ignore
	import Masonry from 'svelte-bricks';
	import IntersectionObserver from 'svelte-intersection-observer';

	export let data: PageData;
	let itemsList: Array<{ id: string; type: number }>;
	itemsList = data.posts;
	let items: Array<{ id: string; type: number }>;
	$: items = itemsList;
	let [minColWidth, maxColWidth, gap] = [280, 350, 30];
	let width: number;
	let height: number;
	let element: any;
	let pageNumber: number = 1;
	let tempPosts: any;
	let tempItems;

	let userID = $userInfo.userId;

	const getMorePosts = async (pageNum: Number) => {
		try {
			let strPageNum: string = pageNum.toString();
			const recipeIDs = await fetch(
				`/api/user/posts?page_num=${strPageNum}&user_id=${userID}`,
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

<div class="w-full h-full flex flex-col gap-12 p-6">
	<div class="flex flex-row gap-20">
		<div class="flex flex-col items-end justify-end w-1/3 gap-10">
			<section class="w-64 h-64 rounded-full overflow-hidden">
				<img alt="" src={data.user.pictureUrl} class="w-full h-full object-cover" />
			</section>
		</div>

		<div class="flex flex-col items-start justify-start w-1/2 gap-3">
			<section>
				<p class="text-3xl">{data.user.userName}</p>
			</section>

			<section>
				<p class="font-bold text-lg">{data.user.displayName}</p>
			</section>

			<section>
				<p class="text-lg md:max-w-lg">{data.user.biography}</p>
			</section>

			<section>
				<p class="font-light text-base">{data.user.pronouns}</p>
			</section>

			{#if data.isLoggedIn}
				<form method="post" action="?/logout">
					<a
						href="/profile/edit"
						class="w-40 h-8 rounded-md bg-emerald-300 dark:text-black p-3">
						Edit Profile
					</a>
					<button class="w-40 h-8 rounded-md bg-emerald-300 dark:text-black">
						Logout
					</button>
				</form>
			{/if}
		</div>
	</div>
	<div class="flex justify-center h-fit w-full">
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
	</div>
</div>
