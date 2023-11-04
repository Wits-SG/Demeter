<script lang="ts">
	import { useDeviceLanguage } from 'firebase/auth';
	import { Icon } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	export let postID: string;
	let recipePreviewData: any;

	const getPreviewData = async () => {
		try {
			const recipePreview_res = await fetch(`/api/recipe/preview?post_id=${postID}`, {
				method: 'GET'
			});

			const recipe_data: JSON = await recipePreview_res.json();
			return recipe_data;
		} catch (recipePreview_err: any) {
			console.error('Failed to fetch recipe preview');
		}
	};

	let recipeID = 'NONE';
	let dishTitle = 'NONE';
	let dishImageURL =
		'https://previews.123rf.com/images/solarus/solarus2112/solarus211200026/178493166-default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available.jpg';
	let dishDescription = 'NONE';
	let userId = 'NONE';
	let userDisplayName = 'NONE';

	onMount(async () => {
		recipePreviewData = await getPreviewData();
		recipeID = recipePreviewData.recipe.recipeID;
		dishTitle = recipePreviewData.recipe.name;
		dishDescription = recipePreviewData.recipe.description;
		dishImageURL = recipePreviewData.recipe.imageURL;
		userId = recipePreviewData.user.id;
		userDisplayName = recipePreviewData.user.displayName;
	});
</script>

<a href="/recipe/{recipeID}" class="w-full">
	<div
		class="w-full h-full rounded-md shadow-md shadow-zinc-600 dark:shadow-zinc-300 overflow-hidden flex flex-col gap-1">
		<img
			class="h-full w-full md:h-full md:w-full object-cover border-b-8 border-red-500"
			src={dishImageURL}
			alt="Dish" />

		<div class="flex flex-col justify-center items-start p-4 gap-2">
			<section class="h-fit w-full flex justify-between items-center">
				<a href="/profile/{userId}" class="italic text-sm text-neutral-500"
					>{userDisplayName}</a>
				<p class="italic text-sm text-neutral-500">Recipe</p>
			</section>

			<section class="h-fit gap-2 flex flex-col justify-start items-start">
				<p
					class="flex flex-row items-center uppercase text-sm text-black dark:text-white font-semibold">
					{dishTitle}
				</p>
				<p class="line-clamp-2 text-zinc-500 dark:text-zinc-300 text-sm">
					{dishDescription}
				</p>
			</section>
		</div>
	</div>
</a>
