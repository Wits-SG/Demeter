<script lang="ts">
	import RecipePreview from '$lib/components/posts/recipe_preview.svelte';
	import PicturePreview from '$lib/components/posts/picture_preview.svelte';

	export let postID: string;
	export let postType: number | undefined;
</script>

{#if postType == 0}
	<RecipePreview {postID} />
{:else if postType == 1}
	<PicturePreview {postID} />
{/if}
