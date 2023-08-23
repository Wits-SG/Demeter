<script lang="ts">
	import type { PageData } from './$types';
	import RecipePreview from '$lib/components/recipe_preview.svelte';

	export let data: PageData;
</script>

<div class="h-fit justify-center items-center flex flex-col gap-4">
	{#each data.recipes as recipe}
		<RecipePreview recipeID={recipe} />
	{/each}
</div>
