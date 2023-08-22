<script lang="ts">
	import dishPicture from '$lib/assets/images/pavs.jpg';
	import { Icon } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	export let recipeID: Number = 1;

	const getPreviewData = async () => {
		try {
			const recipePreview_res = await fetch('src/routes/api/recipe_preview', {
				method: 'POST',
				body: JSON.stringify({
					recipeID: 1
				}),
				headers: {
					'content-type': 'application/json'
				}
			});
			console.log(recipePreview_res.json);
		} catch (recipePreview_err: any) {
			console.log('error occured in fetch');
		}
	};

	onMount(() => {
		//fetch data using recipeID here;
		getPreviewData();
	});

	let dishTitle = 'Penne Alla Vodka';
	let dishDescription =
		"Penne alla Vodka is a classic Italian-American pasta dish known for its creamy tomato-based sauce with a touch of vodka. This indulgent recipe combines the richness of a velvety sauce with the bite of penne pasta, creating a comforting and flavorful dish that's perfect for a cozy dinner.";
</script>

<a href="/recipe/{recipeID}">
	<div
		class="w-1/5 h-2/5 rounded-md shadow-md shadow-zinc-600 dark:shadow-zinc-300 overflow-hidden md:w-1/5 md:h-auto">
		<div class="md:flex md:flex-col">
			<img
				class="h-28 w-full md:h-48 md:w-full object-cover md:object-cover"
				src={dishPicture}
				alt="Dish" />
			<div class="p-4">
				<div class="mb-2 uppercase text-sm text-zinc-800 dark:text-zinc-100 font-semibold">
					{dishTitle}
					<p>{recipeID}</p>
				</div>
				<!--<div class="m-1 grid grid-cols-3 items-center justify-center gap-0.25">
				<div class="flex flex-col items-center justify-center gap-1">
					<Icon name="users-group-outline" class="h-3 w-3" />
					<p class="text-xs">4 Person</p>
				</div>
				<div class="flex flex-col items-center justify center gap-1">
					<Icon name="clock-outline" class="h-3 w-3" />
					<p class="text-xs">~30 Mins</p>
				</div>
				<div class="flex flex-col items-center justify center gap-1">
					<Icon name="arrow-up-down-outline" class="h-3 w-3" />
					<p class="text-xs">Intermediate</p>
				</div>
			</div>-->
				<p class="line-clamp-3 mt-2 text-zinc-500 dark:text-zinc-300 text-sm">
					{dishDescription}
				</p>
			</div>
		</div>
	</div>
</a>
