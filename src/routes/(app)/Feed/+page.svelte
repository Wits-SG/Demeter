<script lang="ts">
	import RecipePreview from '$lib/components/recipe_preview.svelte';
	let recipeID: Number = 1;
</script>

<div class=" h-full w-full p-10">
	<RecipePreview {recipeID} />
</div>
