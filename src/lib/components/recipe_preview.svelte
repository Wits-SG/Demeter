<script lang="ts">
	import { onMount } from 'svelte';

	export let recipeID: string;
	let recipePreviewData: any;

	const getPreviewData = async () => {
		try {
			const recipePreview_res = await fetch(`/api/recipe_preview?recipe_id=${recipeID}`, {
				method: 'GET'
			});

			const recipe_data: JSON = await recipePreview_res.json();
			//console.log(recipe_data);
			return recipe_data;
		} catch (recipePreview_err: any) {
			console.log('error occured in fetch');
		}
	};

	let dishTitle = 'NONE';
	let dishImageURL = 'NONE';
	let dishDescription = 'NONE';

	onMount(async () => {
		recipePreviewData = await getPreviewData();
		dishTitle = recipePreviewData.recipe.name;
		dishDescription = recipePreviewData.recipe.description;
		dishImageURL = recipePreviewData.recipe.imageURL;
	});
</script>

<!--md:w-1/5 md:h-auto-->
<a href="/recipe/{recipeID}" class="w-full">
	<div
		class="w-full h-full rounded-md shadow-md shadow-zinc-600 dark:shadow-zinc-300 overflow-hidden md:w-full md:h-full">
		<div class="md:flex md:flex-col">
			<img
				class="h-full w-full md:h-full md:w-full object-cover"
				src={dishImageURL}
				alt="Dish" />
			<div class="p-4 h-2/5">
				<div class="mb-2 uppercase text-sm text-zinc-800 dark:text-zinc-100 font-semibold">
					{dishTitle}
					<!--<p>{recipeID}</p>-->
				</div>
				<p class="line-clamp-3 mt-2 text-zinc-500 dark:text-zinc-300 text-sm">
					{dishDescription}
				</p>
			</div>
		</div>
	</div>
</a>
