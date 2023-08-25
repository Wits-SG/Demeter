<script lang="ts">
	import SmallRecipe from '$lib/components/small_recipe.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="flex flex-row h-full w-full justify-center gap-20">
	<div class=" mt-24 flex flex-col border-4 border-emerald-700 h-3/4 w-1/6 text-center">
		<h2 class="text-xl font-semibold text-emerald-700 mt-5">INDEX</h2>
		<div class="flex flex-col">
			{#each data.recipes as recipe}
				<a class="flex justify-center items-center" href="/cookbook/">{recipe.name}</a>
			{/each}
		</div>
	</div>

	<div
		class=" mt-24 flex flex-col border-4 border-emerald-700 h-5/6 overflow-scroll w-2/3 text-center items-stretch">
		<div class="mt-10 self-center flex flex-col border-2 border-emerald-700 h-fit w-11/12">
			<SmallRecipe />
		</div>
		<div class="mt-10 flex flex-row space-x-96 h-1/9 w-11/12 justify-between">
			<button
				class="ml-20 rounded-md border-2 w-20 h-10 border-emerald-700 text-emerald-700 text-lg font-semibold"
				>Prev</button>
			<button
				class="mr-2 rounded-md border-2 w-20 h-10 border-emerald-700 text-emerald-700 text-lg font-semibold"
				>Next</button>
		</div>
	</div>
</div>
