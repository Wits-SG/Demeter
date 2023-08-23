<script lang="ts">
	import { Icon } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';

	export let data: PageData;

	let savedState = 'Save this recipe';
	function toggleSavedState() {
		if (savedState === 'Save this recipe') {
			savedState = 'Saved!';
		} else {
			savedState = 'Save this recipe';
		}
	}
</script>

<div class=" bg-zinc-100 dark:bg-zinc-800 flex flex-col justify-center items-center gap-20 pt-6">
	<div class="flex flex-row justify start items-start gap-0">
		<section class="flex flex-col items-center w-1/2 gap-5">
			<section class="container md:mx-auto w-2/3">
				<img alt="" src={data.recipe.imageUrl} class="object-cover" />
			</section>

			<section class="grid grid-cols-2 items-center gap-20">
				<div class="flex flex-col items-center gap-2">
					<Icon name="message-caption-outline" class="h-14 w-14" />
					<button
						class="p-5 bg-emerald-500 rounded-full w-full h-12 text-center text-md flex justify-center items-center hover:bg-emerald-600">
						Write a review
					</button>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Icon name="heart-outline" class="h-14 w-14" />
					<button
						on:click={toggleSavedState}
						class="p-5 bg-emerald-500 rounded-full w-full h-12 text-center text-md flex justify-center items-center hover:bg-emerald-600">
						{savedState}
					</button>
				</div>
			</section>
		</section>

		<div class="flex flex-col items-start gap-10 w-1/2 h-full">
			<section class="flex flex-col items-center gap-10 w-3/4">
				<h1 class="text-6xl font-serif">{data.recipe.name}</h1>
				<h3 class="text-3xl font-serif underline">Description</h3>
				<p class="text-lg">{data.recipe.description}</p>

				<!-- *****Using padding need to change***** -->

				<div class="grid grid-cols-3 items-center justify-center gap-40">
					<div class="flex flex-col items-center justify-center gap-5">
						<Icon name="users-group-outline" class="h-14 w-14" />
						<p class="">
							{#if data.recipe.servingSize > 1}
								{data.recipe.servingSize} People
							{:else}
								{data.recipe.servingSize} Person
							{/if}
						</p>
					</div>
					<div class="flex flex-col items-center justify center gap-5">
						<Icon name="clock-outline" class="h-14 w-14" />
						<p class="">
							{#if data.recipe.cookingTime < 60}
								{data.recipe.cookingTime} Mins
							{:else}
								{data.recipe.cookingTime / 60} Hours
							{/if}
						</p>
					</div>
					<div class="flex flex-col items-center justify center gap-5">
						<Icon name="arrow-up-down-outline" class="h-14 w-14" />
						<p class="">
							{data.recipe.skillLevel}
						</p>
					</div>
				</div>
			</section>

			<section class="flex flex-col items-center gap-10 w-3/4">
				<h3 class="text-3xl font-serif underline">Ingredients</h3>
				<ul class="list-disc list-inside text-lg">
					{#each data.recipe.ingredients as ingredient}
						<li class="mb-2">{ingredient}</li>
					{/each}
				</ul>
			</section>

			<section class="flex flex-col items-center gap-10 w-3/4">
				<h3 class="text-3xl font-serif underline">Instructions</h3>
				<ol class="list-decimal list-inside text-lg">
					{#each data.recipe.instructions as instruction}
						<li
							class="box-content shadow-lg shadow-emerald-500 hover:bg-zinc-500 p-3 border-4 mb-6">
							{instruction}
						</li>
					{/each}
				</ol>
			</section>
		</div>
	</div>
</div>

<style>
</style>
