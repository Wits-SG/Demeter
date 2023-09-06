<script lang="ts">
	import { Icon } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';
	import { createSeparator, melt, type CreateSeparatorProps } from '@melt-ui/svelte';
	import { createAccordion } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';
	import SaveRecipe from '$lib/components/save_recipe.svelte';

	export let data: PageData;

	let savedState = 'Save this recipe';
	function toggleSavedState() {
		if (savedState === 'Save this recipe') {
			savedState = 'Saved!';
		} else {
			savedState = 'Save this recipe';
		}
	}

	export let orientation: CreateSeparatorProps['orientation'] = 'vertical';

	const {
		elements: { root: vertical }
	} = createSeparator({
		orientation
	});

	const {
		elements: { root: horizontal }
	} = createSeparator({
		orientation: 'horizontal',
		decorative: true
	});

	const {
		elements: { content, item, trigger, root },
		helpers: { isSelected }
	} = createAccordion({
		defaultValue: ['Ingredients'],
		multiple: true
	});

	const items = [
		{
			id: 'ingredients',
			title: 'INGREDIENTS',
			description: data.recipe.ingredients
		},
		{
			id: 'instructions',
			title: 'INSTRUCTIONS',
			description: data.recipe.instructions
		}
	];
</script>

<div
	class="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex flex-col justify-center items-center gap-20 pt-6">
	<div class="flex flex-row justify start items-start gap-1">
		<section class="flex flex-col items-center justify-center w-1/2 gap-10">
			<section class="container md:mx-auto w-2/3">
				<img alt="" src={data.recipe.imageUrl} class="object-cover rounded-xl" />
			</section>

			<section class="grid grid-cols-3 items-center justify-center gap-20">
				<div class="flex flex-col items-center justify-center gap-2">
					<Icon name="users-group-outline" class="h-7 w-7" />
					<p class="">
						{#if data.recipe.servingSize > 1}
							{data.recipe.servingSize} People
						{:else}
							{data.recipe.servingSize} Person
						{/if}
					</p>
				</div>
				<div class="flex flex-col items-center justify center gap-2">
					<Icon name="clock-outline" class="h-7 w-7" />
					<p class="">
						~ {#if data.recipe.cookingTime < 60}
							{data.recipe.cookingTime} Mins
						{:else}
							{data.recipe.cookingTime / 60} Hours
						{/if}
					</p>
				</div>
				<div class="flex flex-col items-center justify center gap-2">
					<Icon name="arrow-up-down-outline" class="h-7 w-7" />
					<p class="">
						{data.recipe.skillLevel}
					</p>
				</div>
			</section>

			<div
				use:melt={$horizontal}
				class="items-center justify-center h-[3px] w-3/5 bg-teal-600 dark:bg-teal-400" />

			<!-- <section class="grid grid-cols-2 items-center gap-20">
				<div class="flex flex-col items-center gap-2">
					<Icon name="heart-outline" class="h-14 w-14" />
					<button
						on:click={toggleSavedState}
						class="p-5 bg-emerald-500 rounded-full w-full h-12 text-center text-md flex justify-center items-center hover:bg-emerald-600">
						{savedState}
					</button>
				</div>
			</section> -->

			<div>
				<SaveRecipe />
			</div>
		</section>

		<div class="flex flex-col items-start gap-20 w-1/2">
			<section class="flex flex-col items-center gap-10 w-4/5">
				<h1 class="text-6xl font-serif sticky top-0">{data.recipe.name}</h1>
				<h3 class="text-3xl font-serif no-underline">Description</h3>
				<p class="text-lg">{data.recipe.description}</p>
			</section>

			<section class="flex flex-col h-2/3 w-5/6 justify-center items-center overflow-hidden">
				<div class="w-5/6">
					{#each items as { id, title }, i}
						<div
							use:melt={$item(id)}
							class="overflow-hidden transition-colors first:rounded-t-xl last:rounded-b-xl">
							<h2 class="flex">
								<button
									use:melt={$trigger(id)}
									class="flex flex-1 cursor-pointer items-center justify-center bg-teal-600 px-7 py-7 text-lg leading-none
										text-white transition-colors hover:bg-emerald-300 focus:!ring-0
										focus-visible:text-magnum-800
										i !== 0 && 'border-t-solid border-t-zinc-800">
									{title}
								</button>
							</h2>
							{#if $isSelected(id)}
								<div
									class="content overflow-hidden bg-zinc-200 text-md text-zinc-950 dark:bg-zinc-600 dark:text-zinc-100"
									use:melt={$content(id)}
									transition:slide>
									<div class="px-5 py-4">
										{#if title == 'INSTRUCTIONS'}
											<div>
												<ol class="list-decimal list-inside text-lg">
													{#each data.recipe.instructions as instruction}
														<li
															class="box-content text-zinc-950 bg-gray-50 hover:bg-blue-50 dark:hover:bg-zinc-400 dark:bg-zinc-800 dark:text-zinc-100 p-3 border-2 mb-6 border-teal-500 rounded-lg">
															{instruction}
														</li>
													{/each}
												</ol>
											</div>
										{:else}
											<ul class="list-none list-inside text-lg">
												{#each data.recipe.ingredients as ingredient}
													<li
														class="flex flex-row justify-start items-center mb-2 gap-4">
														<Icon
															name="check-circle-outline"
															class="h-4 w-4 text-green-500" />{ingredient}
													</li>
												{/each}
											</ul>
										{/if}
									</div>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</section>
		</div>
	</div>
</div>

<style>
</style>
