<script lang="ts">
	import { userInfo, userSignedIn } from '$lib/stores/user.store';
	import type { PageData } from './$types';
	import { fb_auth } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import RecipePreview from '$lib/components/recipe_preview.svelte';
	//@ts-ignore
	import Masonry from 'svelte-bricks';
	import { Icon } from 'flowbite-svelte-icons';
	import IntersectionObserver from 'svelte-intersection-observer';
	import { onMount } from 'svelte';

	export let data: PageData;

	let itemsList: any[] = [];
	let items: any[] = new Array(0);
	//items = [];
	$: items = itemsList;
	//itemsList = data.recipes;
	let [minColWidth, maxColWidth, gap] = [280, 350, 30];
	let width: number;
	let height: number;
	let listView: boolean = false;
	let listIconName: String = 'list-outline';
	let gridIconName: String = 'grid-solid';
	let element: any;
	let intersecting;
	let pageNumber: number = 1;
	let tempRecipeList: any;
	let tempItems;

	const getMorePosts = async (pageNum: Number) => {
		try {
			let strPageNum: string = pageNum.toString();
			const recipeIDs = await fetch(`/?page_num=${strPageNum}`, {
				method: 'GET'
			});

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

			{#if data.user.userId == $userInfo.userId}
				<section>
					<a
						href="/profile/edit"
						class="w-40 h-8 rounded-md bg-emerald-300 dark:text-black p-3">
						Edit Profile
					</a>
					<button
						on:click={() => {
							fb_auth
								.signOut()
								.then(() => goto('/'))
								.catch((e) => console.error(e));
						}}
						class="w-40 h-8 rounded-md bg-emerald-300 dark:text-black">
						Logout
					</button>
				</section>
			{/if}
		</div>
	</div>
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
					tempRecipeList = await getMorePosts(pageNumber);
					tempItems = tempRecipeList.recipes;
					itemsList = [...itemsList, ...tempItems];
					pageNumber = pageNumber + 5;
				}}>
				<div bind:this={element} />
			</IntersectionObserver>
		</div>
	</div>
</div>
