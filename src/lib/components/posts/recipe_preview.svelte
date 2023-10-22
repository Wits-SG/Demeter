<script lang="ts">
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
	let dishImageURL = 'NONE';
	let dishDescription = 'NONE';

	onMount(async () => {
		recipePreviewData = await getPreviewData();
		recipeID = recipePreviewData.recipe.recipeID;
		dishTitle = recipePreviewData.recipe.name;
		dishDescription = recipePreviewData.recipe.description;
		dishImageURL = recipePreviewData.recipe.imageURL;
	});
</script>

<a href="/recipe/{recipeID}" class="w-full">
	<div
		class="w-full h-full rounded-md shadow-md shadow-zinc-600 dark:shadow-zinc-300 overflow-hidden md:w-full md:h-full">
		<div class="md:flex md:flex-col">
			<img
				class="h-full w-full md:h-full md:w-full object-cover"
				src={dishImageURL}
				alt="Dish" />
			<div class="p-4 h-2/5">
				<div
					class="mb-2 flex flex-row items-center uppercase text-sm text-zinc-800 dark:text-zinc-100 font-semibold">
					<Icon name="book-outline" class="h-8 w-8 p-2" />
					{dishTitle}
				</div>
				<p class="line-clamp-3 mt-2 text-zinc-500 dark:text-zinc-300 text-sm">
					{dishDescription}
				</p>
			</div>
		</div>
	</div>
</a>
